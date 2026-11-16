# Observability and operations

## Current state
Backend uses console messages for MongoDB connection outcome, server startup, recipient list, and send-loop index. There is no health endpoint, structured logging, metrics, tracing, provider-event ingestion, or alert rules. Logging recipient arrays is a privacy risk.

## Safe logging
Future structured logs may include timestamp, severity, service, deployment revision, correlation ID, route, duration, and coarse outcome. Do not log recipient addresses, arrays, message bodies, passwords, tokens, connection strings, authorization headers, workbook contents, or unredacted provider payloads.

## Recommended metrics

| Metric | Purpose |
|---|---|
| API request count and latency | Availability and performance |
| Rejected requests by reason | Validation and abuse trends |
| Queue depth and oldest job age | Backlog detection |
| Send outcomes by category | Reliability |
| Bounce and complaint rate | Sender reputation |
| Rate-limit events | Abuse signals |
| Provider quota remaining | Capacity planning |

Metrics should be aggregated and access-restricted. Avoid labels containing addresses or personal data.

## Alerts
Define alerts for sustained API errors, database connection failures, queue backlog, provider authentication failures, unusual send volume, bounce/complaint spikes, and repeated rate-limit events. Thresholds must be based on provider limits and observed baseline, not guessed constants.

## Retention
Set explicit retention for logs, job metadata, suppression records, and provider events. Restrict and audit access. Document deletion and legal-retention requirements before accepting real recipient data.
