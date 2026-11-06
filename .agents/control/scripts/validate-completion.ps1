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
    $problems = @()

    if ($inputData.acceptanceCriteriaMet -ne $true) {
        $problems += "Acceptance criteria are not confirmed as met."
    }

    if ($inputData.verificationExecuted -ne $true) {
        $problems += "No verification execution is confirmed."
    }

    $results = @($inputData.verificationResults)
    if ($results.Count -eq 0) {
        $problems += "No verification results were supplied."
    } else {
        foreach ($result in $results) {
            if ($result -is [System.Collections.IDictionary]) {
                if ($result.status -ne "passed") {
                    $problems += "A verification result is not marked passed."
                    break
                }
            } elseif ($result.status -ne "passed") {
                $problems += "A verification result is not marked passed."
                break
            }
        }
    }

    if ($problems.Count -gt 0) {
        Write-HookResult $false "review" "Completion cannot be confirmed." $problems
        exit 0
    }

    Write-HookResult $true "allow" "Completion checks passed based on the supplied evidence. The agent must still provide the required completion report."
}
catch {
    Write-HookResult $false "deny" ("Completion validation failed: " + $_.Exception.Message)
}
