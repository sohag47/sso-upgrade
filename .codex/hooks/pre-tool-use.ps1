$ErrorActionPreference = "Stop"

function Invoke-SharedValidator {
    param(
        [Parameter(Mandatory = $true)][string]$ScriptPath,
        [Parameter(Mandatory = $true)][object]$Payload
    )

    if (-not (Test-Path -LiteralPath $ScriptPath -PathType Leaf)) {
        throw "Shared validator not found: $ScriptPath"
    }

    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = "powershell.exe"
    $psi.Arguments = '-NoProfile -ExecutionPolicy Bypass -File "' + $ScriptPath + '"'
    $psi.UseShellExecute = $false
    $psi.RedirectStandardInput = $true
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.CreateNoWindow = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $psi
    [void]$process.Start()

    $json = $Payload | ConvertTo-Json -Depth 20 -Compress
    $process.StandardInput.Write($json)
    $process.StandardInput.Close()

    $stdout = $process.StandardOutput.ReadToEnd()
    $stderr = $process.StandardError.ReadToEnd()
    $process.WaitForExit()

    if ($process.ExitCode -ne 0 -or [string]::IsNullOrWhiteSpace($stdout)) {
        throw "Validator failed. $stderr"
    }

    return ($stdout | ConvertFrom-Json)
}

function Write-Deny {
    param([string]$Reason)
    @{
        hookSpecificOutput = @{
            hookEventName = "PreToolUse"
            permissionDecision = "deny"
            permissionDecisionReason = $Reason
        }
    } | ConvertTo-Json -Depth 8 -Compress
}

try {
    $raw = [Console]::In.ReadToEnd()
    $event = $raw | ConvertFrom-Json

    $root = [string]$event.cwd
    if ([string]::IsNullOrWhiteSpace($root)) {
        $root = (Get-Location).Path
    }

    $control = Join-Path $root ".agents/control/scripts"
    $toolName = [string]$event.tool_name
    $toolInput = $event.tool_input
    $command = ""
    $path = ""
    $operation = ""

    if ($toolName -eq "Bash") {
        $command = [string]$toolInput.command
        $payload = @{
            event = "pre_tool_use"
            toolName = $toolName
            toolInput = $toolInput
            command = $command
            permissionGranted = $false
        }
        $result = Invoke-SharedValidator (Join-Path $control "validate-command.ps1") $payload

        if ($result.decision -ne "allow") {
            Write-Deny ([string]$result.reason)
            exit 0
        }
    }
    elseif ($toolName -match '^(apply_patch|Edit|Write)$') {
        if ($toolInput.file_path) {
            $path = [string]$toolInput.file_path
        } elseif ($toolInput.path) {
            $path = [string]$toolInput.path
        } elseif ($toolInput.filePath) {
            $path = [string]$toolInput.filePath
        }

        if ([string]::IsNullOrWhiteSpace($path)) {
            Write-Deny "Could not determine the target file path. Review the tool request before allowing it."
            exit 0
        }

        $operation = "modify"
        if (-not (Test-Path -LiteralPath $path)) {
            $operation = "create"
        }

        $taskContent = ""
        $taskFile = Join-Path $root "pending-task.md"
        if (Test-Path -LiteralPath $taskFile) {
            $taskContent = Get-Content -LiteralPath $taskFile -Raw
        }

        $allowedPaths = @()
        foreach ($line in ($taskContent -split "`r?`n")) {
            if ($line -match '^\s*[-*]\s+`?([A-Za-z0-9_./\\-]+\.[A-Za-z0-9_-]+)`?\s*$') {
                $allowedPaths += $Matches[1].Replace("\", "/")
            }
        }

        $payload = @{
            event = "pre_tool_use"
            toolName = $toolName
            toolInput = $toolInput
            requestedPath = $path
            operation = $operation
            allowedPaths = $allowedPaths
            permissionGranted = $false
        }

        $result = Invoke-SharedValidator (Join-Path $control "validate-file-change.ps1") $payload

        if ($result.decision -eq "deny") {
            Write-Deny ([string]$result.reason)
            exit 0
        }

        if ($result.decision -eq "review") {
            @{
                hookSpecificOutput = @{
                    hookEventName = "PreToolUse"
                    permissionDecision = "ask"
                    permissionDecisionReason = [string]$result.reason
                }
            } | ConvertTo-Json -Depth 8 -Compress
            exit 0
        }
    }

    exit 0
}
catch {
    Write-Deny ("Pre-tool validation failed closed: " + $_.Exception.Message)
    exit 0
}
