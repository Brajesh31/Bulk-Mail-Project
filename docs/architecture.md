# Architecture

## Repository layout

This is a two-process application with separate npm projects:

- **frontend/** — React 18 single-page app, built and served by Vite 6.
- **backend/** — Express 4 server, MongoDB access through Mongoose, and Nodemailer Gmail transport.
- **frontend/src/App.jsx** — workbook selection, message input, recipient preview count, and Axios request.
- **backend/index.js** — MongoDB connection, sender credential lookup, CORS setup, **POST /sendmail**, and port 3000 listener.

There is no root npm workspace or root package manifest.

## Current request flow

    Browser
      |-- selects workbook and enters message
      |-- parses Sheet1, column A using xlsx
      |-- POST /sendmail { msg, bulkEmail }
                                  |
                                  v
                  Express backend on port 3000
                       |-- loads first user Mongo document
                       |-- obtains Gmail sender/password
                       |-- sends one message per recipient
                                  |
                                  v
                                 Gmail

The browser calls the URL in **VITE_APP_BASE_URL**, falling back to **http://localhost:3000**. Express allows the origin in **FRONTEND_URL**, falling back to **http://localhost:3000**. Vite's default development origin is usually **http://localhost:5173**, so set **FRONTEND_URL** to the exact frontend origin during local development.

## Frontend behavior

The React page uses FileReader and SheetJS to parse a selected workbook. It reads only a sheet named **Sheet1** and maps column **A** into the recipient array. It does not currently validate file type, file size, sheet existence, address format, blank rows, duplicate recipients, recipient consent, or recipient count. It posts message text and the entire parsed array to the backend.

## Backend behavior

The Express server connects to MongoDB using **DATABASE_URL**, then queries a collection named **user** for all documents and uses the first document's **email** and **pass** to configure Nodemailer for Gmail. It exposes **POST /sendmail** and loops through submitted recipients sequentially. The sender address is also hard-coded in the backend.

The endpoint has no authentication, authorization, request validation, rate limit, queue, per-recipient status, or unsubscribe mechanism. CORS constrains some browser requests but does not authenticate direct HTTP callers.

## Persistence and external services

MongoDB is used for sender credentials only in the checked-in code. The app does not persist recipient lists, message records, delivery logs, or campaigns. Gmail is the outbound mail provider. The workbook is parsed in the browser and posted to the backend.

## Security boundary

The current design is a learning prototype. Do not connect it to real mailbox credentials or public recipient lists. The endpoint's network exposure allows unauthorized send attempts, and the MongoDB credential values committed in the initial history must be rotated. See [Security](../SECURITY.md) and [Deployment](deployment.md).
