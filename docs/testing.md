# Testing and quality strategy

## Existing scripts
Frontend declares `npm run build`, `npm run lint`, and `npm run preview`. Backend's test command is a placeholder that exits with status 1. No meaningful backend test suite, runner, or coverage configuration exists.

## Baseline frontend commands
```bash
cd frontend
npm ci
npm run lint
npm run build
```

Backend dependency installation:
```bash
cd backend
npm ci
```
Installing dependencies is not a correctness test and does not prove mail delivery.

## Recommended test layers

| Layer | Coverage to add | Current status |
|---|---|---|
| Workbook parser | Missing sheet, blanks, duplicates, malformed values, size | Not implemented |
| API unit | Schema, empty list, invalid address, limits | Not implemented |
| API integration | DB failure, route startup, CORS, response semantics | Not implemented |
| Mail adapter | Mock send, transient/permanent failure, partial failure | Not implemented |
| Security | Unauthenticated calls, authorization, quotas | Not implemented |
| UI | File errors, loading, network failure, accessible status | Not implemented |
| End-to-end | Preview and controlled test send | Not implemented |

## Mail test rules
Use a mocked transport by default. Use reserved `.test` fixtures. If a real provider is required, send only to an inbox you control and keep volume minimal. Never use customer or personal lists. Verify retries cannot duplicate successful sends.

## Future acceptance checks
1. Invalid request bodies fail before sending.
2. Empty lists and malformed addresses are rejected.
3. Recipient/message limits and rate limits are enforced server-side.
4. Suppressed recipients are blocked immediately before queueing.
5. Each recipient job has an idempotent identity.
6. Partial failures are represented accurately.
7. Logs contain correlation IDs but no addresses or message bodies.
8. UI errors restore sending state and provide accessible feedback.
9. Workbook preview identifies invalid rows before submission.
10. Security-sensitive paths have regression tests.
