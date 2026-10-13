# Troubleshooting

## The browser shows a CORS error

Confirm the frontend's exact origin and set **FRONTEND_URL** in **backend/.env** to match it, including scheme and port. Vite commonly runs on **http://localhost:5173**; the backend default is **http://localhost:3000**. Restart the backend after changing its environment file.

A CORS error does not prove the endpoint is protected. Direct clients can still call an unauthenticated server.

## The frontend calls localhost:3000 unexpectedly

The code falls back to **http://localhost:3000** when **VITE_APP_BASE_URL** is missing. Put the variable in **frontend/.env.local** or another Vite-supported env file at the frontend project root, then restart Vite. The tracked **frontend/src/.env** is not in Vite's default env directory.

## The backend connects but /sendmail is missing

At startup the backend reads the first document from MongoDB's **user** collection and registers the endpoint inside that lookup callback. Check that MongoDB is reachable and that the expected collection contains a document with the fields the backend reads. Do not use real mailbox credentials to troubleshoot this prototype.

## The server returns false or email is not sent

Check backend process output and the configured Gmail transporter. The current response is only a boolean and does not identify which recipient failed. The loop is sequential and a failure can stop later sends. The code has no partial-delivery report or retry queue.

Use an isolated account and test address that you control. Do not paste connection strings, mailbox passwords, recipient lists, or message bodies into public issues.

## Excel addresses are missing

The frontend reads a worksheet named exactly **Sheet1** and takes values from its first column (column **A**). Check the workbook sheet name and column. The UI does not validate workbook shape or filter blank and invalid rows.

## A send request remains in the sending state

The frontend does not handle rejected Axios requests. Check that the backend is running and the configured API base URL is correct. A network failure may leave the current loading state active until the page is reloaded.

## Should I deploy to debug?

No. The endpoint lacks authentication, rate limits, validation, recipient consent controls, and safe secret handling. Debug only with local services and addresses you own. See [Security](../SECURITY.md).

## Where can I report another issue?

Use [Support](../SUPPORT.md). Report suspected vulnerabilities privately as described in [Security](../SECURITY.md).
