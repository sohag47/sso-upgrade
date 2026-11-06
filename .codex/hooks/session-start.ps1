$ErrorActionPreference = "Stop"

$root = (git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or -not $root) {
    $root = (Get-Location).Path
} else {
    $root = $root.Trim()
}

$required = @(
    "AGENTS.md",
    "SKILLS_INDEX.md",
    "pending-task.md",
    ".agents/instructions/execution.instructions.md",
    ".agents/control/README.md"
)

$missing = @(
    $required | Where-Object {
        -not (Test-Path -LiteralPath (Join-Path $root $_) -PathType Leaf)
    }
)

$context = @"
PROJECT CONTROL RULES:
- For every development task or continuation, read the complete root pending-task.md before implementation.
- Then read AGENTS.md and .agents/instructions/execution.instructions.md.
- Read SKILLS_INDEX.md and load only relevant existing guidance files.
- Use .agents/control/policies as the shared policy source.
- Use shared validators in .agents/control/scripts when the relevant normalized input is available.
- Never commit or push. Never perform restricted operations without explicit, current user approval.
- Do not delete, replace, or modify pending-task.md or task history without explicit user approval.
- Review the diff and report only verification commands actually executed.
"@

if ($missing.Count -gt 0) {
    $context += "`nMISSING REQUIRED FILES: $($missing -join ', '). Do not assume their contents."
}

@{
    hookSpecificOutput = @{
        hookEventName = "SessionStart"
        additionalContext = $context
    }
} | ConvertTo-Json -Depth 6 -Compress
