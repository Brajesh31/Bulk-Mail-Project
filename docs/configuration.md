# Configuration reference

Copy root `.env.example` to `backend/.env` and `frontend/.env.local`. Never commit populated files. Vite reads environment files from the frontend project root, not `frontend/src/`.

| Variable | Consumer | Purpose | Secret? |
|---|---|---|---|
| `DATABASE_URL` | Backend | MongoDB connection string | Yes |
| `FRONTEND_URL` | Backend | Exact browser origin allowed by CORS | No |
| `VITE_APP_BASE_URL` | Frontend | API base URL compiled into browser assets | Public |

## DATABASE_URL
Mongoose uses this connection string. Use a disposable local database. The current app reads mail credentials from a MongoDB `user` collection. This is not an acceptable production secret store.

## FRONTEND_URL
Express uses this value for CORS. Code fallback is `http://localhost:3000`; Vite commonly serves at `http://localhost:5173`. Configure the exact frontend origin. CORS is not authentication.

## VITE_APP_BASE_URL
Axios uses this value in browser code. Every `VITE_` variable is visible in built frontend assets. Never put passwords, database credentials, API tokens, or mailbox secrets here.

## Ports
Backend listens on fixed port `3000` and does not read `PORT`. Vite uses its project configuration/default development port.

## Secret checklist
- [ ] Real env files are ignored.
- [ ] Tracked examples contain placeholders only.
- [ ] Production secrets live in a hosting secret manager.
- [ ] Exposed credentials are rotated, not merely deleted.
- [ ] Frontend variables contain no private values.
- [ ] Access follows least privilege.
- [ ] Rotation and incident procedures are documented.
