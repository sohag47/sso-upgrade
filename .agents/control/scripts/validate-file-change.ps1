$ErrorActionPreference = "Stop"

function Read-HookInput {
    $raw = [Console]::In.ReadToEnd()
    if ([string]::IsNullOrWhiteSpace($raw)) {
        throw "Hook input is empty."
    }
    return ($raw | ConvertFrom-Json)
}

function Write-HookResult {
    param(
        [bool]$Allowed,
        [ValidateSet("allow", "deny", "review")][string]$Decision,
        [string]$Reason,
        [object[]]$Details = @()
    )
    @{
        allowed = $Allowed
        decision = $Decision
        reason = $Reason
        details = @($Details)
    } | ConvertTo-Json -Depth 10 -Compress
}

try {
    $inputData = Read-HookInput
    $path = [string]$inputData.requestedPath
    $operation = [string]$inputData.operation

    if ([string]::IsNullOrWhiteSpace($path)) {
        Write-HookResult $false "deny" "No target path was supplied."
        exit 0
    }

    if ([string]::IsNullOrWhiteSpace($operation)) {
        Write-HookResult $false "deny" "No file operation was supplied."
        exit 0
    }

    $normalized = $path.Replace("\", "/").TrimStart("./")
    $protected = @(
        '(^|/)pending-task\.md$',
        '(^|/)\.agents/task-history(/|$)',
        '(^|/)\.git(/|$)',
        '(^|/)\.env($|\.)',
        '(^|/).+\.(pem|key|p12|pfx)$'
    )

    foreach ($pattern in $protected) {
        if ($normalized -match $pattern) {
            if ($inputData.permissionGranted -ne $true -or
                [string]::IsNullOrWhiteSpace([string]$inputData.permissionScope)) {
                Write-HookResult $false "deny" "The target is protected and requires explicit user approval." @("Path: $path", "Operation: $operation")
                exit 0
            }
        }
    }

    if ($operation -in @("delete", "rename", "move")) {
        if ($inputData.permissionGranted -ne $true -or
            [string]::IsNullOrWhiteSpace([string]$inputData.permissionScope)) {
            Write-HookResult $false "deny" "Delete, rename, and move operations require explicit user approval." @("Path: $path", "Operation: $operation")
            exit 0
        }
    }

    $allowedPaths = @($inputData.allowedPaths)
    if ($allowedPaths.Count -gt 0) {
        $matched = $false
        foreach ($allowedPath in $allowedPaths) {
            $candidate = ([string]$allowedPath).Replace("\", "/").TrimEnd("/")
            if ($normalized -eq $candidate -or $normalized.StartsWith($candidate + "/")) {
                $matched = $true
                break
            }
        }

        if (-not $matched) {
            Write-HookResult $false "deny" "The requested path is outside the task's supplied allowedPaths scope." @("Path: $path")
            exit 0
        }
    } else {
        Write-HookResult $false "review" "No allowedPaths scope was supplied. The adapter or agent must confirm task relevance before editing." @("Path: $path")
        exit 0
    }

    Write-HookResult $true "allow" "The file operation passed the configured path and protection checks."
}
catch {
    Write-HookResult $false "deny" ("File validation failed: " + $_.Exception.Message)
}
