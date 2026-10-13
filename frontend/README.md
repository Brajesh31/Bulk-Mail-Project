# Bulk Mail frontend

This directory contains the React/Vite browser app. The repository root has the canonical project guide and documentation:

- [Project overview and setup](../README.md)
- [Installation](../docs/installation.md)
- [API behavior](../docs/api.md)
- [Security policy](../SECURITY.md)

Run **npm ci** and **npm run dev** from this directory. Put **VITE_APP_BASE_URL** in a Vite environment file at this directory's root, such as **.env.local**; do not put it under **src/**.

The frontend sends messages and recipient lists to the backend. The current endpoint is unauthenticated and has no recipient limits or abuse controls. Use only test addresses you own; do not send real mail with this prototype.
