$ErrorActionPreference = "Continue"

$root = [string](git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($root)) {
    $root = (Get-Location).Path
} else {
    $root = $root.Trim()
}

$taskPath = Join-Path $root "pending-task.md"
if (-not (Test-Path -LiteralPath $taskPath -PathType Leaf)) {
    exit 0
}

$message = @"
Before reporting a development task complete:
- Check every acceptance criterion in pending-task.md.
- Review the complete Git diff and ensure changes are task-related.
- Report verification commands only if actually executed, with their real results.
- Disclose failures, unverified behavior, and incomplete requirements.
- Provide the required commit message, but do not commit or push.
- Archive the exact original task file only when the task is genuinely complete.
- Do not modify or replace pending-task.md without explicit user approval.
This hook is a reminder; it does not independently prove that the task is complete.
"@

@{
    systemMessage = $message
} | ConvertTo-Json -Depth 5 -Compress
