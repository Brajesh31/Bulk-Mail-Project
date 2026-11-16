# Incident response runbook

## Covered events
Unexpected sending, mailbox/database credential compromise, recipient/message exposure, provider restriction, complaint/bounce spike, or API abuse.

## Severity guide

| Severity | Example | Immediate action |
|---|---|---|
| Critical | Confirmed unauthorized sending or active credential compromise | Stop service and revoke credentials |
| High | Recipient data exposed or sustained abuse | Restrict access and assess scope |
| Medium | Provider failures or suspicious request spikes | Pause sending and investigate |
| Low | Local issue with synthetic data | Record and resolve normally |

## Response sequence
1. **Contain:** stop backend or disable route at network layer.
2. **Revoke:** rotate affected database and mailbox credentials.
3. **Preserve:** retain relevant logs securely without exporting raw recipient lists unnecessarily.
4. **Assess:** determine systems, time window, data types, and provider activity.
5. **Notify:** follow provider, organizational, and legal notification requirements.
6. **Recover:** restore only after remediation and credential rotation.
7. **Review:** document root cause, controls, and follow-up owners.

Do not paste passwords, tokens, message bodies, or recipient lists into GitHub issues. Close the incident only after credentials are invalidated, access is contained, impact assessed, remediation verified, and follow-up work assigned.
