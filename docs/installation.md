# Installation

## Requirements

- Node.js 20 or newer and npm.
- MongoDB running locally or an isolated development database.
- A browser and two terminals.
- A controlled development sender account only if exercising email behavior. Do not use a real mailbox credential with this prototype.

The frontend and backend are separate npm projects with separate lockfiles.

## Configure local environment

From the repository root, copy the example file:

PowerShell:

    Copy-Item .env.example backend/.env
    Copy-Item .env.example frontend/.env.local

macOS or Linux:

    cp .env.example backend/.env
    cp .env.example frontend/.env.local

Edit **backend/.env** with a local or disposable MongoDB URL and the exact Vite browser origin, usually **http://localhost:5173**. Edit **frontend/.env.local** with the backend API base, usually **http://localhost:3000**.

Vite reads environment files from its project root (**frontend/**), not **frontend/src/**. The tracked **frontend/src/.env** file is in the wrong location for Vite's default environment loading and is being removed. Vite's **VITE_** variables are included in browser code, so use that prefix only for public values such as the API base URL.

## Install and start the backend

In one terminal:

    cd backend
    npm ci
    node index.js

The backend listens on fixed port **3000**. Its package has no start script. The existing **test** script is a placeholder that exits with an error.

The backend expects a MongoDB document in a collection named **user**, with **email** and **pass** fields for the Gmail transporter. There is no seed script or safe secret-management flow. Do not insert a real mailbox password into MongoDB for this prototype.

## Install and start the frontend

In a second terminal:

    cd frontend
    npm ci
    npm run dev

Vite prints the local URL, usually **http://localhost:5173**. The browser sends requests to **VITE_APP_BASE_URL** or the fallback **http://localhost:3000**.

## Try the interface safely

Use a fake workbook containing a **Sheet1** worksheet with test addresses that you control, and a non-sensitive message. The current backend has no authentication or recipient limits; do not expose it to the internet or send to other people.
