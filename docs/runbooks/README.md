# 🧯 Operational runbooks

These procedures support local development and incident handling. They do not mean the current application is production-ready.

- [Local demo](local-demo.md): run both npm projects with disposable data.
- [Credential rotation](credential-rotation.md): respond to a leaked database or mail credential.
- [Incident response](incident-response.md): contain unexpected sending or data exposure.

**Operating rule:** if unauthorized sending is suspected, stop the backend and revoke affected provider credentials first. Do not leave the service running during investigation. Never publish recipient data or secrets in issues.
