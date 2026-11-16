# Local demo runbook

## Purpose
Run the current prototype locally for code review. This is not a production deployment procedure.

## Preconditions
- Use a disposable MongoDB database.
- Use placeholder values wherever possible.
- Do not import real contact lists.
- Do not expose port 3000 publicly.
- If testing mail, use an account and inbox you own.

## Procedure
1. Clone the repository.
2. Copy `.env.example` to `backend/.env` and `frontend/.env.local`.
3. Set `DATABASE_URL` to a disposable local database.
4. Set `FRONTEND_URL` to the exact Vite origin.
5. Run `npm ci` and `node index.js` inside `backend/`.
6. In another terminal, run `npm ci` and `npm run dev` inside `frontend/`.
7. Open the Vite URL printed in the terminal.
8. Use synthetic workbook data only.

## Shutdown
Stop both processes with Ctrl+C. Remove temporary records and dispose of the database if it contained sensitive test values. Do not keep mailbox passwords in MongoDB after a demo.
