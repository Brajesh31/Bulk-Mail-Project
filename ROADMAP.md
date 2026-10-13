# Roadmap

This roadmap lists possible work and does not promise a delivery schedule.

## Current baseline

The project has a React/Vite page that reads column A from an Excel workbook's **Sheet1**, collects a message, and posts the result to a single Express **/sendmail** endpoint. The backend obtains Gmail credentials from the first MongoDB document in the **user** collection and sends one message to each supplied address.

The endpoint is unauthenticated, has no recipient or message limits, and lacks consent, unsubscribe, abuse prevention, and delivery tracking. Environment values were committed in the original repository history.

## Priority 1: contain exposure and abuse

- Rotate any credentials from the tracked environment files and review provider access logs.
- Remove secrets from reachable Git history only through a coordinated history rewrite; communicate the force-push impact to existing clones.
- Move mail credentials from MongoDB into a server-side secret manager or protected environment.
- Require authenticated, authorized requests and constrain which sender identities may be used.
- Add recipient count, message size, request size, and rate limits.
- Validate recipients and workbook data, add consent and unsubscribe controls, and establish abuse monitoring.
- Avoid logging email addresses and message content.

## Priority 2: reliable sending

- Validate file type, size, sheet presence, column values, and address format in the frontend and backend.
- Handle partial delivery results and network failures accurately.
- Use a queue or provider-supported bulk mechanism with delivery status, retry, and idempotency behavior.
- Add health checks, safe diagnostics, and operational documentation.
- Make service ports and frontend origin explicit configuration.

## Priority 3: maintainable project

- Add backend and frontend start scripts and a documented local database setup.
- Add automated validation for request schema, CORS configuration, and error handling.
- Update the generic Vite starter metadata to match the app.
- Add an example workbook containing fake addresses only.

## Proposing work

Open an issue describing user need, abuse and privacy considerations, acceptance criteria, and validation. Security and consent requirements take priority over additional sending features.
