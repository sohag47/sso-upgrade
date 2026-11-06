$ErrorActionPreference = "Continue"

$root = (git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or -not $root) {
    $root = (Get-Location).Path
} else {
    $root = $root.Trim()
}

$taskPath = Join-Path $root "pending-task.md"

$message = @"
For a development request:
1. Read the complete root pending-task.md first.
2. Confirm it describes the requested active task.
3. Read AGENTS.md, the execution policy, and only relevant indexed guidance.
4. Do not implement if the task file is missing, empty, or unrelated; ask the user to clarify or authorize an update.
For non-development questions, answer normally without starting implementation.
"@

if (-not (Test-Path -LiteralPath $taskPath -PathType Leaf)) {
    $message += "`nWARNING: Root pending-task.md was not found. Do not begin development implementation."
}

@{
    systemMessage = $message
} | ConvertTo-Json -Depth 5 -Compress
