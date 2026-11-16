# Email safety and responsible sending

> **Do not use the current endpoint to send to real recipients.** It accepts arbitrary message text and recipient values without authentication, consent checks, recipient limits, or rate limits.

## Required safeguards before real sending

### Permission
- Record how and when each recipient opted in, including purpose and scope.
- Workbook inclusion or possession of an address is not permission.
- Check consent at send time.
- Do not use scraped, purchased, or unrelated lists without a separate legal and policy review.

### Suppression and unsubscribe
- Maintain a suppression list for unsubscribed, bounced, complained, and blocked recipients.
- Process unsubscribe requests promptly.
- Check suppression immediately before queueing.
- Never re-add a suppressed address merely because it appears in a later workbook.

### Sender identity and content
- Identify the sender truthfully.
- Use meaningful, non-deceptive content.
- Do not impersonate a person or organization.
- Do not conceal sender identity or use misleading links.
- Review links and attachments before sending.

### Abuse and volume
- Authenticate and authorize every caller.
- Enforce per-user, per-campaign, per-domain, and global quotas.
- Rate-limit and detect unusual patterns.
- Use a queue with bounded concurrency and retries.
- Pause sending when provider errors or complaints cross approved thresholds.

### Delivery semantics
- Distinguish API acceptance from provider submission and inbox delivery.
- Process bounces and complaints.
- Avoid retries for permanent failures.
- Report partial outcomes honestly.
- Retain only data needed for support and compliance.

## Current implementation gaps

The code accepts arbitrary `bulkEmail` values, has no count/message limit, sends sequentially in the HTTP request, uses a hard-coded sender address, loads mailbox credentials from MongoDB, logs recipient arrays, and has no consent/suppression/unsubscribe/bounce model. The response is a boolean.

## Safe development

Use mocked transport by default, reserved `.test` addresses, and only an inbox you own for manual provider checks. Never paste real contact lists or message content into logs, issues, screenshots, or docs.

## Release gate

No sending capability should ship until authentication, authorization, validation, consent, suppression, unsubscribe, rate limits, sender verification, safe logs, monitoring, and provider-policy review are verified.
