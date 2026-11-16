# Excel workbook input contract

## Current parser behavior

`frontend/src/App.jsx` reads the selected file with FileReader, parses it with SheetJS, looks up a worksheet named exactly `Sheet1`, calls `sheet_to_json(..., { header: "A" })`, and maps each row's `A` property into `bulkEmail`. No formal workbook schema or validation layer exists.

## Expected shape

Use one address per row in column A of a worksheet named `Sheet1`.

| Cell | Example | Meaning |
|---|---|---|
| A1 | `person.one@example.test` | First value |
| A2 | `person.two@example.test` | Second value |
| A3 | `person.three@example.test` | Third value |

A header such as `Email` in A1 is not automatically skipped and may be treated as a recipient value.

## Current gaps

| Condition | Current handling | Risk |
|---|---|---|
| Missing `Sheet1` | No explicit guard | Runtime exception |
| Empty workbook | No explicit guard | Empty/invalid list |
| Blank cells | No filtering | Empty values included |
| Header row | Not detected | Header treated as address |
| Invalid address | Not validated | Provider rejection |
| Duplicate | Not deduplicated | Repeated message |
| Large workbook | No size/count cap | Memory/request pressure |
| Unsupported/corrupt file | No robust error path | Parse failure |
| Formula cells | No formula policy | Unexpected cached values |
| Multiple sheets | Only `Sheet1` read | Other sheets ignored |

## Recommended validation pipeline (not implemented)

1. Enforce file-size and format limits.
2. Parse within an error boundary.
3. Verify the expected sheet exists.
4. Normalize whitespace and skip empty rows.
5. Apply an explicit header policy.
6. Validate addresses on the server.
7. Deduplicate using a documented rule.
8. Enforce a strict recipient cap.
9. Preview valid and invalid rows before submission.
10. Check consent and suppression immediately before queueing.

## Privacy

Workbooks may contain personal data. Never attach real lists to issues, PRs, screenshots, fixtures, or logs. Use reserved `.test` addresses in docs and tests. Define retention and deletion before accepting real lists.

## Suggested tests

Valid single/multiple rows, empty workbook, missing sheet, header row, blank cells, whitespace, duplicate casing, malformed values, oversized file, unsupported extension, corrupt workbook, and formulas in column A.
