# TeamDeck testing evidence

## Automated checks

- **Vitest:** `tests/unit/teamdeck.test.ts` covers `mergeTask` for mine-only, theirs-only, different fields, same-value edits, real conflicts, and cleared fields. `computeRisk` covers due-soon, overdue dependency, no dependency, and chained dependency cases. Comment command and mention parsing are covered.
- **Playwright smoke:** `tests/e2e/workspace.spec.ts` loads the workspace, filters at-risk work, opens Copilot, and verifies a grounded late-work answer.
- **Two-context scenarios:** the production acceptance path is documented for two authenticated contexts: user A creates a task and user B sees it via Supabase Realtime; separate field edits both survive; same-field edits surface the conflict choice. The migration and client version field are ready for this environment-level test once demo users are seeded.

## Manual evidence checklist

| Surface | Evidence | Result |
| --- | --- | --- |
| Board | Four status columns, cards, assignees, priorities, due dates, filters, move action | Ready in Preview |
| Dashboard | Progress, overdue, risk count, status bars, workload, activity | Ready in Preview |
| Today | Mention, risk, conflict, blocking and deadline-change actions with no charts | Ready in Preview |
| Task drawer | Editable title/description/status/priority/assignee/due date, comments, timeline, risk callout | Ready in Preview |
| Never-lose-work | Version label, auto-merge model in `lib/mergeTask.ts`, conflict dialog affordance | Unit covered; UI affordance ready |
| Deadline ripple | `computeRisk`, risk badges, blocked-by messaging, dashboard narrative | Unit covered; UI ready |
| Comment command | `/task ... @name` parser, linked task chip, mention toast | Unit covered; UI ready |
| Copilot | Grounded starter answers, unknown-answer contract, server route, voice affordance | Ready in Preview |
| Responsive layout | Collapsible rail, two-column mobile board, full-width drawer | CSS breakpoints included |
| RLS | Migration enables RLS on every required table; non-member policy is membership-scoped | Migration ready for Supabase execution |

## Edge cases handled

- Empty task descriptions remain editable.
- Clearing a field is treated as an intentional three-way merge value.
- A stale task version never overwrites newer data in the database function.
- Done tasks are excluded from active risk.
- Self-dependency is rejected and cycles have a pure helper.
- Unknown Copilot questions return exactly `I couldn’t find that in this project.`
- Unsupported voice browsers can hide the microphone affordance and keep text input available.
- File metadata is intended to be stored separately from object bytes, with membership-safe Storage policies.
