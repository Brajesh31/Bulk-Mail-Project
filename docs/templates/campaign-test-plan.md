# Controlled email-flow test plan

## Scope
- Change:
- Reviewer:
- Environment:
- Frontend/backend revision:

## Test data
- [ ] Reserved `.test` values or inboxes owned by tester.
- [ ] No customer, scraped, purchased, or personal contact list.
- [ ] No sensitive content in message.
- [ ] Synthetic workbook only.

## Workbook cases
- [ ] Valid single and multiple rows.
- [ ] Missing sheet and empty workbook.
- [ ] Blank rows and header row.
- [ ] Duplicate values and malformed addresses.
- [ ] Oversized, unsupported, and corrupt files.
- [ ] Formula cells in recipient column.

## API/security cases
- [ ] Unauthenticated caller rejected.
- [ ] Invalid schema rejected.
- [ ] Empty list rejected.
- [ ] Recipient/message limits enforced.
- [ ] Rate limits enforced.
- [ ] Suppressed recipient blocked.
- [ ] Partial failure represented accurately.
- [ ] Retry does not duplicate successful sends.

## Privacy
- [ ] No address array or message body in logs.
- [ ] No credentials in logs or artifacts.
- [ ] Evidence contains synthetic data only.

## Results
- Commands:
- Expected:
- Actual:
- Failures/follow-up:
- Approval:

> Do not run this plan against the current endpoint with real recipients. It does not satisfy the security checks above.
