# Product overview

Bulk Mail Project demonstrates a browser-to-server workflow: enter plain-text content, import recipient values from an Excel workbook, submit them to an API, and attempt one send per address through Gmail. It is a learning prototype, not a secure mail service, CRM, campaign manager, or compliant marketing platform.

## Current journey
1. Open the React page served by Vite.
2. Enter message text and select a workbook.
3. FileReader and SheetJS parse it.
4. Frontend reads `Sheet1`, column `A`.
5. UI displays the extracted array length.
6. Axios posts `{ msg, bulkEmail }`.
7. Express loops through values and calls Nodemailer.
8. UI displays an alert based on a boolean response.

## Actors

| Actor/system | Responsibility | Trust boundary |
|---|---|---|
| Browser user | Supplies message and workbook | Unauthenticated |
| React frontend | Parses workbook and submits data | Client-controlled |
| Express API | Accepts send request | No caller identity validation |
| MongoDB | Stores sender credential document | Sensitive store, unsafe current use |
| Gmail | Outbound provider | External system |
| Recipient | Receives or filters mail | Outside application control |

## Implemented scope
Single-page React UI, browser workbook parsing, plain-text input, recipient count, one `POST /sendmail` endpoint, MongoDB credential lookup, sequential Nodemailer sends.

## Not implemented
Registration, authentication, roles, campaign history, scheduling, consent records, suppression, unsubscribe, templates, attachments, queueing, retries, idempotency, bounce/complaint processing, delivery receipts, analytics, or tenant isolation.

## Future principles
- Permission before sending. Workbook inclusion is not consent.
- Enforce limits and validation on the server.
- Report accepted, queued, submitted, bounced, and delivered states accurately.
- Minimize collection, retention, and exposure of personal data.
- Authenticate callers, authorize senders, rate-limit, and monitor abuse.
- Make all controls and status messages keyboard and assistive-technology accessible.

## Production release criteria
Do not label a release production-ready until security review verifies authentication, authorization, validation, consent, suppression, unsubscribe, recipient/rate limits, managed secrets, safe logs, bounded queue processing, accurate partial-failure reporting, monitoring, recovery, and provider-policy compliance.
