# Credential rotation runbook

## Trigger
Use this when a database string, mailbox credential, token, or other secret appears in a commit, log, screenshot, issue, or shared artifact.

## Containment
1. Identify the affected provider without copying the secret into an issue.
2. Revoke or rotate the credential at the provider.
3. Invalidate sessions or application passwords where supported.
4. Review database/provider access logs.
5. Stop the application if it may still use the compromised value.
6. Replace deployment secrets through the hosting secret manager.
7. Verify the old credential no longer works.

## Repository cleanup
Remove the value from the current tree and replace examples with placeholders. Confirm environment files are ignored. Review branches, tags, forks, artifacts, and CI logs. Consider history rewriting only after assessing clones, forks, and collaborators. History rewriting does not replace credential rotation.

## Recovery
Create a least-privilege replacement, store it only in an approved secret store, restart the service, perform a controlled connectivity check, and record rotation time without recording the secret.

## Project-specific note
Earlier repository history included non-placeholder environment values. Treat them as exposed even though the files are absent from the current tree. Rotate affected credentials and inspect provider access logs.
