# Universal AI Agent Control System

## Purpose

This directory contains vendor-neutral policies, PowerShell validation scripts, and a shared input schema for AI coding agents working in this project.

The control layer is shared. Each AI tool needs its own adapter because hook events, input payloads, and decision formats differ between tools.

## Structure

```text
control/
├── README.md
├── policies/
│   ├── task-policy.md
│   ├── command-policy.md
│   ├── file-policy.md
│   ├── permission-policy.md
│   └── completion-policy.md
├── scripts/
│   ├── validate-task.ps1
│   ├── validate-command.ps1
│   ├── validate-file-change.ps1
│   ├── validate-permission.ps1
│   └── validate-completion.ps1
└── schemas/
    └── hook-input.schema.json
```

## Responsibilities

### Policies

Policies define the expected behavior. They are the source of truth for agent instructions, but they are not an operating-system security boundary.

### Scripts

Scripts validate one concern at a time. They read one JSON object from standard input and emit one JSON result to standard output.

Common result shape:

```json
{
  "allowed": false,
  "decision": "deny",
  "reason": "A concise explanation",
  "details": []
}
```

`decision` is `allow`, `deny`, or `review`. A tool-specific adapter must translate this result into the native hook response expected by that tool.

### Schema

`schemas/hook-input.schema.json` describes the common input contract. Adapters should normalize native event payloads into this structure before calling a script.

## Integration contract

1. Identify the native hook event and tool payload.
2. Normalize relevant data to the shared input schema.
3. Invoke the appropriate script and pass the JSON input through standard input.
4. Parse the script's JSON result.
5. Translate `allowed` / `decision` into the native hook response.
6. Fail closed for restricted operations if permission cannot be established.

Do not pass a native hook payload directly to a shared script unless it conforms to the schema.

## Security limitations

- A script can only validate information supplied to it. It cannot independently prove that a user approved an operation unless the adapter has a trustworthy approval signal.
- A prompt, Markdown policy, or hook is not a replacement for OS permissions, sandboxing, or network controls.
- Command matching is conservative pattern-based screening, not a complete shell parser. Shell aliases, encoded commands, scripts, indirect execution, and alternate tools may bypass simple patterns.
- File validation cannot reliably determine semantic task scope from arbitrary prose. Adapters should supply the active task's allowed paths where practical.
- Never log secrets, access tokens, credentials, or complete environment contents.

## Development rules

- Keep scripts compatible with Windows PowerShell 5.1 unless the project explicitly standardizes on PowerShell 7.
- Scripts must not modify project files, install packages, run commands from the input, or perform destructive actions.
- Emit machine-readable JSON only on standard output. Send diagnostics to standard error if needed.
- Use explicit, auditable rules. Do not silently treat missing permission data as approval.
- Test scripts independently before connecting them to an AI tool.

## Suggested integration order

1. Review and approve the policies.
2. Validate the schema and scripts with allow/deny test cases.
3. Integrate Codex using its documented hook contract.
4. Test the adapter with real hook payloads.
5. Add other tool adapters separately.
6. Review sandbox and permission settings in each AI tool.
