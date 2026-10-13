# Database and credential handling

## MongoDB use

The backend connects to MongoDB through Mongoose using **DATABASE_URL**. It defines a Mongoose model with email and password fields mapped to a collection named **user**. At startup, it fetches all documents from that collection and uses the first document's **email** and **pass** values to configure Nodemailer's Gmail transport.

There is no schema migration, seed script, validation layer, credential rotation process, or secret-management integration. The backend may fail to register **/sendmail** if the database read fails or the collection has no document.

## Data stored and sent

The checked-in backend uses MongoDB for sender mailbox credentials. The frontend parses the workbook in memory and submits message text and the recipient array to the backend. The code does not write campaigns, recipient lists, message records, delivery statuses, or audit events to a database.

## Credential exposure

A non-placeholder MongoDB connection value was committed in **backend/.env** in the initial Git history. Its value is not repeated here. Treat it as compromised: rotate the MongoDB credential and inspect access logs. The file is removed from the current tree, but remains visible in prior commits unless repository history is rewritten.

Mailbox credentials stored in the **user** collection are also an unsafe pattern. Do not use real mailbox credentials or valuable recipient data with this prototype. Use a secret manager and a server-side least-privilege account after the application is redesigned.

## Recommended future model

A production mail application would need a documented account and sender ownership model, consent/suppression records, job records, per-recipient delivery status, retention and deletion rules, indexes, transaction/queue behavior, and access controls. This repository does not implement those capabilities.
