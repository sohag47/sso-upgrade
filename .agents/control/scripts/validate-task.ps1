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
    $taskFile = if ($inputData.taskFile) { [string]$inputData.taskFile } else { "pending-task.md" }
    $taskPath = Join-Path (Get-Location).Path $taskFile

    if (-not (Test-Path -LiteralPath $taskPath -PathType Leaf)) {
        Write-HookResult $false "deny" "The active task file '$taskFile' does not exist. Ask the user to create or authorize it."
        exit 0
    }

    $content = Get-Content -LiteralPath $taskPath -Raw
    if ([string]::IsNullOrWhiteSpace($content)) {
        Write-HookResult $false "deny" "The active task file is empty."
        exit 0
    }

    $hasTaskId = $content -match '(?im)^\s*(#+\s*)?(Task\s*ID|ID)\s*[:#-]\s*\S+|^\s*#+\s*TASK-\d+'
    $hasAcceptance = $content -match '(?im)acceptance criteria|acceptance|যাচাইয়ের শর্ত|গ্রহণযোগ্যতার শর্ত'

    $details = @()
    if (-not $hasTaskId) { $details += "Task ID was not clearly found." }
    if (-not $hasAcceptance) { $details += "Acceptance criteria heading or phrase was not found." }

    if ($details.Count -gt 0) {
        Write-HookResult $false "review" "The task file exists but needs review before implementation." $details
        exit 0
    }

    Write-HookResult $true "allow" "The active task file exists and contains a task identifier and acceptance criteria."
}
catch {
    Write-HookResult $false "deny" ("Task validation failed: " + $_.Exception.Message)
}
