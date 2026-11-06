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
    $command = [string]$inputData.command

    if ([string]::IsNullOrWhiteSpace($command)) {
        Write-HookResult $false "deny" "No command was supplied for validation."
        exit 0
    }

    $restricted = @(
        '(?i)\bgit\s+(add|commit|push|pull|merge|rebase|reset|checkout|switch|clean|stash|cherry-pick|tag)\b',
        '(?i)\b(bun|npm|pnpm|yarn)\s+(install|add|remove|update|upgrade|link)\b',
        '(?i)\b(npm|bun|pnpm|yarn)\s+run\s+(dev|build|start|deploy|release)\b',
        '(?i)\b(artisan\s+(migrate|db:seed)|prisma\s+migrate|prisma\s+db\s+push|drizzle-kit\s+push)\b',
        '(?i)\b(Remove-Item|Clear-Content|Format-Volume|Stop-Computer|Restart-Computer|Stop-Process)\b',
        '(?i)(^|[;&|]\s*)(del|erase|rmdir|rd|rm)\s+',
        '(?i)\b(curl|Invoke-WebRequest|Invoke-RestMethod)\b.*(-X\s*(POST|PUT|PATCH|DELETE)|-Method\s+(POST|PUT|PATCH|DELETE))',
        '(?i)\b(terraform\s+(apply|destroy)|kubectl\s+(delete|apply)|docker\s+(rm|rmi|system\s+prune))\b'
    )

    foreach ($pattern in $restricted) {
        if ($command -match $pattern) {
            if ($inputData.permissionGranted -eq $true -and
                -not [string]::IsNullOrWhiteSpace([string]$inputData.permissionScope)) {
                Write-HookResult $true "allow" "A restricted command matched and the adapter supplied an explicit permission scope." @("Matched policy pattern: $pattern", "Verify that permissionScope covers this exact operation.")
            } else {
                Write-HookResult $false "deny" "Restricted command requires explicit, current user approval." @("Matched policy pattern: $pattern", "Command: $command")
            }
            exit 0
        }
    }

    Write-HookResult $true "allow" "No restricted command pattern was detected. This is pattern screening, not a complete shell security analysis."
}
catch {
    Write-HookResult $false "deny" ("Command validation failed: " + $_.Exception.Message)
}
