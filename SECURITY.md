# Security Policy

## Scope

This repository contains a browser frontend and an Express email-sending backend with MongoDB and Gmail integrations. Security reports are welcome for code, dependency, configuration, and data-exposure issues.

## Known security issues

The current **POST /sendmail** endpoint has no authentication, authorization, rate limiting, recipient limits, message validation, or consent controls. CORS only restricts browser origins; it does not stop direct HTTP clients. The endpoint can be abused to send arbitrary messages to submitted recipients.

The backend loads **email** and **pass** from the first document in MongoDB's **user** collection to configure Gmail transport. This is not a safe secret-management design. Recipient addresses are logged by the backend. There is no sender-account isolation or delivery audit.

The initial repository commit includes **backend/.env** and **frontend/src/.env** with non-placeholder values. Those values are intentionally not reproduced in this policy. The files are being removed from the current tree, but they remain accessible in the existing Git history unless that history is rewritten. Treat any credential from those files as exposed: rotate it, invalidate sessions as appropriate, and review provider access logs. Deleting a file in a later commit does not revoke a secret.

## Reporting a vulnerability

Please do not publish unpatched vulnerabilities, exploit details, mailbox credentials, or recipient data in a public issue. Use GitHub's private vulnerability reporting for this repository if enabled: [Report a vulnerability](https://github.com/Brajesh31/Bulk-Mail-Project/security/advisories/new). If unavailable, contact the maintainer through [@brajesh31](https://github.com/brajesh31) and request a private channel.

Include the affected file or dependency, conditions needed to reproduce the issue, likely impact, and a suggested mitigation. Never include real email lists, message bodies, access tokens, or passwords.

## Response

The maintainer will acknowledge a report when reasonably able, investigate the affected revision, and coordinate a fix and disclosure with the reporter. This individual project has no guaranteed response time or service-level commitment.

## Safe operation

Do not expose the current backend to the public internet or use it for real recipients. Before deployment, move credentials out of MongoDB, authenticate and authorize sending requests, enforce recipient and message limits, validate inputs, add abuse monitoring and consent/unsubscribe workflows, and protect secrets.
