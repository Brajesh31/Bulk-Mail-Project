# Development

## Run the two apps

Open two terminals from the repository root. In the first, enter **backend/**, install with **npm ci**, and start the server with **node index.js**. In the second, enter **frontend/**, install with **npm ci**, and run **npm run dev**. Set the backend's **FRONTEND_URL** to the exact browser origin printed by Vite.

Copy the root environment template to **backend/.env** and **frontend/.env.local**. Do not commit filled files. Vite reads environment files at the frontend project root; **frontend/src/.env** is not the expected location.

## Frontend workflow

The page is in **frontend/src/App.jsx**. It accepts a file through a browser file input, reads the first selected file as a workbook, takes **Sheet1**, and maps column **A** into an array. The textarea supplies the message. Axios sends the data to **/sendmail**.

The current UI does not validate file extension, MIME type, size, sheet presence, address syntax, duplicates, blank cells, recipient count, or message size. A failed Axios request has no rejection handler, so the interface may remain in a sending state. Validate data on both client and server, but treat server validation as authoritative.

## Backend workflow

The backend is a single **backend/index.js** file. It loads **DATABASE_URL** with dotenv, connects to MongoDB, reads the first document from collection **user**, and builds a Gmail Nodemailer transport from its **email** and **pass** fields. It registers **POST /sendmail** after this lookup and starts an Express listener on port 3000.

The endpoint iterates submitted addresses sequentially. It has no authenticated caller identity, body schema, count or size limits, safe queue, idempotency, partial-failure response, or rate limit. It also logs the recipient list. Do not use live recipients while developing.

## Safe development expectations

- Use only addresses and sender accounts that you own and control.
- Never commit credentials, messages, recipient lists, or database dumps.
- Do not use CORS as authentication; direct clients can call the endpoint.
- Keep privacy, consent, unsubscribe, suppression, and abuse prevention in scope for any sending feature.
- Do not add tracking pixels or analytics without documenting the data collected.
- Preserve useful error information without logging secrets or personal data.
- Verify new assets and dependencies have compatible licenses.
- Record commands and manual checks actually performed.

## Tooling

The frontend declares Vite build, lint, and preview scripts. The backend has no start or build script and only a placeholder test script. No working automated tests are configured in the repository.
