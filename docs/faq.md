# Frequently asked questions

## What does this project do?

A React/Vite page reads recipient addresses from column A of a worksheet named **Sheet1**, accepts message text, and posts both to an Express backend. The backend sends one Gmail message per submitted address using Nodemailer.

## Where do I run npm commands?

Run backend commands in **backend/** and frontend commands in **frontend/**. There is no root npm workspace. The backend currently starts with **node index.js**; the frontend starts with **npm run dev**.

## What environment files does it use?

The backend reads **DATABASE_URL** and **FRONTEND_URL** from **backend/.env**. The Vite frontend reads **VITE_APP_BASE_URL** from an env file in **frontend/**, such as **frontend/.env.local**. Vite exposes **VITE_** values in browser code. The tracked **frontend/src/.env** is misplaced and is being removed.

## Is it safe to send a real mailing list?

No. The endpoint has no authentication, rate limits, recipient limits, consent checks, unsubscribe handling, or abuse monitoring. Use only test addresses you own while developing.

## Where are the Gmail credentials stored?

The current backend reads **email** and **pass** from the first document in MongoDB's **user** collection. There is no secret manager. Do not store or use real mailbox credentials with this design.

## Does the app track delivery?

No. The backend returns a boolean and has no queue, per-recipient status, delivery webhook, retry system, or audit log. It also logs the recipient list.

## Why are environment credentials being rotated?

The initial Git commit includes non-placeholder values in environment files. Removing them from the current tree does not remove them from earlier commits. Treat any credentials there as exposed and rotate them.

## What is the license?

Original project code and documentation use MIT, with Brajesh Kumar as copyright holder. Third-party packages and framework assets have separate license terms.
