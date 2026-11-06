$ErrorActionPreference = "Continue"

try {
    $raw = [Console]::In.ReadToEnd()
    $event = $raw | ConvertFrom-Json

    $root = [string]$event.cwd
    if ([string]::IsNullOrWhiteSpace($root)) {
        $root = (Get-Location).Path
    }

    $toolName = [string]$event.tool_name
    if ($toolName -notmatch '^(Bash|apply_patch|Edit|Write)$') {
        exit 0
    }

    $git = Get-Command git -ErrorAction SilentlyContinue
    if (-not $git) {
        exit 0
    }

    $diffOutput = git -C $root diff --check 2>&1
    $diffCode = $LASTEXITCODE
    $statusOutput = git -C $root status --short 2>&1

    $notes = @()
    if ($diffCode -ne 0) {
        $notes += "git diff --check reported an issue: $($diffOutput -join ' ')"
    }
    if ($statusOutput) {
        $notes += "Review changed files and confirm they are within pending-task.md scope: $($statusOutput -join ', ')"
    }

    if ($notes.Count -gt 0) {
        @{
            systemMessage = ($notes -join "`n")
        } | ConvertTo-Json -Depth 5 -Compress
    }
}
catch {
    @{
        systemMessage = "Post-tool review hook could not complete: $($_.Exception.Message)"
    } | ConvertTo-Json -Depth 5 -Compress
}
