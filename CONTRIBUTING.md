# Contributing

Thank you for considering a contribution to Bulk Mail Project. Improvements should make the code safer, more reliable, accessible, and clear about what it sends.

## Before you begin

- Read the [Code of Conduct](CODE_OF_CONDUCT.md), [Security Policy](SECURITY.md), and [License](LICENSE).
- Review the [README](README.md), [Roadmap](ROADMAP.md), and relevant technical docs.
- Open an issue before a substantial feature or architectural change.
- Do not use live mailboxes, real recipient lists, or private data during development.

## Development setup

The backend and frontend are separate npm projects. Copy **.env.example** into **backend/.env** and **frontend/.env.local**, use disposable local values, and install dependencies from each directory. See [Installation](docs/installation.md).

Do not run the current send endpoint against real recipients. It has no authentication, rate limiting, recipient consent checks, unsubscribe handling, or sending limits. CORS does not secure the endpoint.

## Contribution expectations

- Keep changes focused and describe their impact.
- Validate uploaded files, workbook structure, addresses, message size, and recipient count.
- Do not log recipient lists, message bodies, credentials, or personal information.
- Keep database and mail credentials in ignored environment files or a proper secret manager; do not store real mail credentials in MongoDB.
- Add authentication, authorization, rate limits, abuse monitoring, and consent controls before enabling external sending.
- Preserve idempotent behavior and handle partial delivery failures without claiming all mail was sent.
- Record package, provider, and environment versions relevant to a change.
- Verify new assets and dependencies have compatible licenses.

## Pull requests

Include the motivation, changed services or endpoints, request validation, abuse and privacy controls, and screenshots for UI changes. State commands and manual checks performed. For email behavior, use a local mock or controlled test mailbox with addresses you own. Explain deployment and rollback steps for configuration or schema changes.
