# Security review

## Change
- Summary:
- Author/reviewer:
- Commit:
- Affected services/routes:

## Data and trust boundaries
- Data collected/transmitted/persisted:
- External providers:
- Trust boundaries changed:

## Authentication and authorization
- [ ] Caller identity verified.
- [ ] Sender ownership enforced.
- [ ] Least privilege applied.
- [ ] Unauthorized requests fail closed.

## Input and abuse controls
- [ ] Server-side schema validation.
- [ ] File/message size limits.
- [ ] Recipient count and rate limits.
- [ ] Consent and suppression checked at send time.
- [ ] Unsubscribe behavior verified.
- [ ] Idempotency and partial failures addressed.

## Secrets and privacy
- [ ] No secrets in source, history, logs, or browser bundle.
- [ ] Managed secret store used.
- [ ] Sensitive fields redacted.
- [ ] Retention/deletion documented.
- [ ] Logs omit addresses and message content.

## Verification
- Tests:
- Manual checks:
- Dependency review:
- Residual risks:
- Decision: approve / changes required / reject
