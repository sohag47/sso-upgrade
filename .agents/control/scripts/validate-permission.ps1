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
    $operation = [string]$inputData.operation
    $command = [string]$inputData.command
    $path = [string]$inputData.requestedPath

    $sensitiveOperations = @(
        "delete", "rename", "move", "install", "deploy",
        "database_write", "execute"
    )

    $needsApproval = $operation -in $sensitiveOperations

    if ($command -match '(?i)\bgit\s+(add|commit|push|pull|merge|rebase|reset|checkout|switch|clean|stash)\b') {
        $needsApproval = $true
    }

    if ($needsApproval -and
        ($inputData.permissionGranted -ne $true -or
         [string]::IsNullOrWhiteSpace([string]$inputData.permissionScope))) {
        Write-HookResult $false "deny" "This operation requires explicit, current, scope-specific user approval." @("Operation: $operation", "Path: $path", "Command: $command")
        exit 0
    }

    if ($needsApproval) {
        Write-HookResult $true "allow" "The adapter supplied an explicit permission signal and scope. Confirm the scope matches the requested operation."
        exit 0
    }

    Write-HookResult $true "allow" "No permission-gated operation was identified by this validator."
}
catch {
    Write-HookResult $false "deny" ("Permission validation failed: " + $_.Exception.Message)
}
