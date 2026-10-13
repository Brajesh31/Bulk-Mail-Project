# API

## Endpoint

The backend defines one project-owned endpoint.

| Method | Path | Request | Response |
| --- | --- | --- | --- |
| **POST** | **/sendmail** | JSON object with **msg** (message text) and **bulkEmail** (array of addresses). | Boolean **true** after the send loop completes, or **false** if the send promise rejects. |

The backend sends one Gmail message per recipient using the same subject and text. It has no per-recipient result, queue ID, delivery status, retry contract, or structured error response. The current implementation does not validate the request shape or cap the message or recipient count.

## CORS

Express allows the origin configured by **FRONTEND_URL**, defaulting to **http://localhost:3000**, and enables credentials. Vite's development server typically uses **http://localhost:5173**. Set the exact frontend origin during local work. CORS is enforced by browsers and does not authenticate requests or stop command-line clients.

## Request example

    POST /sendmail
    Content-Type: application/json

    {
      "msg": "A message for recipients who have opted in.",
      "bulkEmail": ["person@example.test"]
    }

Use only test addresses you own. The production-looking values above are illustrative and not sent by this documentation.

## Security and privacy

The endpoint is unauthenticated and can be called directly. It accepts arbitrary recipients and message content, and the backend logs the submitted recipient list. Do not expose it publicly. Before adding or changing an endpoint, require authentication, validate and limit input, enforce recipient consent, avoid sensitive logs, and return accurate partial-delivery status.
