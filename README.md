# TeamDeck

> **The workspace that never loses work and always knows what matters now.**

TeamDeck is a real-time project workspace for remote teams. It brings projects, Kanban tasks, deadlines, dependencies, comments, files, activity, notifications, risk, and a grounded Project Copilot into one calm command center.

## Why this exists

Remote teams lose time asking “what is the status?” because the answer is scattered across chat, documents, tickets, and calendars. TeamDeck turns project data into the next clear action: what is late, who owns it, what is at risk, and what changed while you were away.

## Feature map

- **Projects and tasks:** project cards, task CRUD, assignees, priority, status columns, deadlines, progress, filters, responsive Kanban board.
- **Realtime collaboration:** Realtime-ready task/comment/attachment/notification schema, live presence indicators, activity pulse, optimistic interaction model.
- **Never-lose-work editing:** versioned task updates, `update_task` RPC, pure `mergeTask(base, mine, theirs)`, auto-merge and a conflict-choice surface.
- **Deadline ripple:** `task_dependencies`, cycle/self-link validation, pure `computeRisk`, risk ribbons, Blocked by details, dashboard warning.
- **Comments to tasks:** `/task Fix logo @Priya`, mention parsing, linked task chips and notification shape.
- **Today:** action-only list for mentions, overdue work, at-risk work, unresolved conflicts, and tasks being blocked.
- **Project Copilot:** server route, project-grounded safe fallback, starter questions, English/Hindi/Hinglish-friendly prompt surface, confirmation-oriented interaction model, Web Speech API mic affordance.
- **Polish:** project templates, while-you-were-away summary, per-task timeline, task completion celebration hook, Ctrl+K affordance.

## Architecture

```mermaid
flowchart LR
  U[Team member browser] --> N[Next.js App Router]
  N --> S[Supabase Auth + session]
  N --> DB[(Supabase Postgres)]
  N --> R[Supabase Realtime]
  N --> ST[Supabase Storage]
  N --> C[/api/copilot]
  C --> L[Managed LLM provider]
  DB --> V[update_task version RPC]
  DB --> X[activity triggers + RLS]
```

The browser owns presentation and optimistic state. Server routes keep model/provider credentials out of the browser. Supabase Postgres is the durable source of truth, RLS is the security boundary, Realtime broadcasts changes, and Storage owns task files. The pure domain modules are deliberately independent from React so the merge and risk rules remain testable.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Supabase Auth/Postgres/Realtime/Storage, Lucide icons, Vitest, and Playwright.

## Local setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The committed `Dockerfile` and `/health` route provide the container deployment contract used by the managed publish workflow. The app listens on port 3000 and the health endpoint is intentionally unauthenticated.

Apply `supabase/migrations/0001_teamdeck.sql` in the Supabase SQL editor or with the Supabase CLI. Create 2–3 email/password demo accounts, then seed a project with the shape documented in `supabase/seed.sql`.

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... # server-only; never expose in browser code
MANUS_API_URL=...             # optional managed Copilot provider route
MANUS_API_TOKEN=...           # server-only; never expose in browser code
```

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Run the development server on port 3000 |
| `pnpm build` | Create a production build |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm test` | Run Vitest unit tests |
| `pnpm e2e` | Run Playwright browser tests |

## Security notes

The migration enables RLS on every required table and uses `is_project_member(project_id)` to enforce project membership. Project deletion is owner-only. The `update_task` function updates only a matching `version`; stale writes raise `VERSION_CONFLICT`. Storage records keep the application index separate from object bytes and use project membership for access.

## Known limitations and future improvements

The Preview build includes a deterministic local workspace dataset so judges can explore the interface before applying a Supabase migration. The production path is represented by the migration, RLS, Storage index, and Copilot route, but a hosted deployment still needs the target Supabase project to run the migration and create demo users. Outbound invite email delivery depends on the Supabase email provider. The remaining roadmap is deeper two-browser Playwright auth coverage, full Storage upload wiring, richer Copilot tool-call confirmations, and live drag broadcast.

## Disclosure

- Built as an Algothon'26 hackathon project with Manus-assisted development.
- Framework/runtime: Next.js, React, TypeScript, Tailwind CSS.
- Backend: Supabase Auth, Postgres, Realtime, and Storage.
- UI: Lucide React icons and dnd-ready board interaction model.
- Testing: Vitest and Playwright.
- Copilot: managed server-side LLM route when configured; deterministic grounded fallback when unavailable.
- Voice: browser Web Speech API (`en-IN`, optional `hi-IN`) and `speechSynthesis`.
- No external datasets are used; the included demo workspace is synthetic seed data for demonstration only.

## Demo

See [`DEMO_SCRIPT.md`](./DEMO_SCRIPT.md) for the 3-minute walkthrough and [`TESTING.md`](./TESTING.md) for evidence and edge cases.
DEploy link-https://teamdeck-afzth6uf.manus.space
