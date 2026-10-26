# Bulk Mail Project

This repository contains a small React/Vite frontend and an Express/Mongoose backend for sending a text message to email addresses read from an Excel workbook. The frontend expects a workbook sheet named **Sheet1** and reads addresses from column **A**. The backend exposes **POST /sendmail** on port 3000 and uses Nodemailer with Gmail.

## Security warning

**This prototype is not safe for public or production use. Do not use it to send messages to real recipients or store real mailbox credentials in its current form.**

The send endpoint has no authentication, authorization, rate limit, recipient limit, or request validation. A caller can submit arbitrary message text and recipient addresses. CORS is not an access-control or anti-abuse mechanism. Mailbox credentials are loaded from the first document in a MongoDB collection, the endpoint logs recipient lists, and the frontend does not handle network failures robustly.

The initial repository history contains two environment files with non-placeholder values. They have been removed from the current tree, but ordinary deletion does not erase earlier commits. Treat any credentials in those files as exposed: rotate the MongoDB credential and any other secrets, and review provider access logs. See [Security](SECURITY.md).

## Repository layout

- **backend/** — Express server, MongoDB connection, and Gmail/Nodemailer transport.
- **frontend/** — React single-page app, Vite config, and Excel parsing.
- **backend/index.js** — defines **POST /sendmail**, loads sender credentials from MongoDB, and listens on port 3000.
- **frontend/src/App.jsx** — message input, workbook parsing, recipient count, and request to the backend.
- **.env.example** — safe variable-name template. Copy it into each app directory for local setup.
- **docs/** — architecture, installation, development, deployment, API, database, troubleshooting, and FAQ guides.

The repository root has no npm workspace or root package manifest. Install and run each application from its own directory.

## Local setup

Requirements: Node.js and npm, a local or disposable MongoDB database, and a Gmail account configured only for controlled development. The backend expects a MongoDB document in a collection named **user** with **email** and **pass** fields; there is no seed script or credential-management flow. Do not put real mailbox credentials into this prototype.

Copy the environment template:

PowerShell:

    Copy-Item .env.example backend/.env
    Copy-Item .env.example frontend/.env.local

macOS or Linux:

    cp .env.example backend/.env
    cp .env.example frontend/.env.local

Fill in development-only values. The backend reads **DATABASE_URL** and **FRONTEND_URL**. The Vite app reads **VITE_APP_BASE_URL** from a frontend-root environment file. The previously tracked frontend file was under **frontend/src/**, which is not Vite's default environment directory; use **frontend/.env.local**.

Start the backend in one terminal:

    cd backend
    npm ci
    node index.js

Start the frontend in another terminal:

    cd frontend
    npm ci
    npm run dev

Open the local Vite URL printed in the terminal, usually **http://localhost:5173**. Set **FRONTEND_URL** to that exact origin so the backend CORS configuration matches. The backend listens on fixed port **3000**.

## Current request format

The frontend posts JSON to **/sendmail**:

- **msg** — message text.
- **bulkEmail** — array of recipient addresses parsed from **Sheet1**, column **A**, in the selected workbook.

The backend iterates the array and sends one Gmail message per recipient. It returns a boolean response. There is no queue, delivery status tracking, consent check, unsubscribe management, or supported guarantee of delivery. Do not send unsolicited mail.

## Documentation

- [Architecture](docs/architecture.md)
- [Installation](docs/installation.md)
- [Development](docs/development.md)
- [Deployment and safety requirements](docs/deployment.md)
- [API](docs/api.md)
- [Database and credentials](docs/database.md)
- [Troubleshooting](docs/troubleshooting.md)
- [FAQ](docs/faq.md)
- [Contributing](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [Support](SUPPORT.md)
- [Roadmap](ROADMAP.md)

## License

Original project code and documentation are licensed under MIT; see [LICENSE](LICENSE). Third-party packages and bundled framework assets remain under their respective licenses.

## Maintainer

Brajesh Kumar — GitHub [@brajesh31](https://github.com/brajesh31).

Last updated: 2026-10-26 10:01 UTC
