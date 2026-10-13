# Deployment

## Current status

Do not deploy the current mail endpoint publicly. It accepts unauthenticated requests to send arbitrary message text to arbitrary submitted addresses, with no recipient limits, message limits, rate limiting, authorization, consent checks, unsubscribe handling, abuse detection, or delivery tracking. CORS is not an authorization boundary.

The backend loads Gmail credentials from the first MongoDB document in a **user** collection. This is not an appropriate secret store. The repository's initial commit also contains non-placeholder environment values. Those values have been removed from the current tree, but remain available in Git history unless it is rewritten. Rotate affected credentials and inspect provider access logs before any deployment.

## Work required before public use

1. Revoke and rotate the MongoDB credential and any other secrets committed in repository history.
2. Move mail credentials to a managed server-side secret store; remove them from application database records.
3. Require authentication and authorization for every send request.
4. Enforce recipient consent, suppression lists, unsubscribe behavior, recipient and message limits, and rate limits.
5. Validate request shape and all recipient addresses on the backend.
6. Add abuse monitoring, safe logging, and a delivery/partial-failure model.
7. Configure production CORS to the exact frontend origin, while retaining server-side authentication.
8. Store provider credentials in deployment secrets, never in source or frontend variables.
9. Review applicable email, privacy, anti-spam, and provider requirements before use.

## Separate build and runtime processes

Only after those safeguards are implemented, deploy the frontend and backend as separate services:

- Build the frontend from **frontend/** using **npm ci** and **npm run build**. Vite writes static output to **frontend/dist/**.
- Run the backend from **backend/** with a managed Node.js runtime. The current server uses fixed port **3000** and has no production start script.
- Set **VITE_APP_BASE_URL** when building the frontend and **DATABASE_URL** plus **FRONTEND_URL** in the backend runtime environment.
- Configure HTTPS, provider-specific secret storage, health monitoring, log retention, and a rollback plan.

The current implementation has not been validated for production deployment.
