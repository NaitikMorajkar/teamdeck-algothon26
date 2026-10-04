# TeamDeck · 3-minute demo script

**0:00 — Frame the problem.** Open TeamDeck on Project Orbit. “Remote teams do not need another disconnected tool. They need one place that knows what matters now.” Point to the signal strip: progress, overdue, risk, and collaborators live.

**0:20 — Show the board.** Create a new task, assign it to Rahul, set a deadline, and move it across To do, In progress, Review, and Done. Explain that optimistic state gives instant feedback while Supabase Realtime mirrors changes to the second signed-in user.

**0:55 — Turn a comment into work.** Open Update logo lockup. Type `/task QA the favicon exports @Arjun`. Show the linked task chip and the mention notification. Attach a file and point to the membership-protected Storage record.

**1:20 — Prove work is never lost.** Open the task in two browser contexts. Make a different-field edit in each: TeamDeck auto-merges and says “Merged with Rahul’s changes.” Make the same field differ: the side-by-side conflict dialog asks the user to choose. “No silent overwrite.”

**1:50 — Show deadline ripple.** Mark the logo dependency overdue. Cards turn At risk. Open Dashboard and show: “Delay in Update logo lockup puts 3 tasks at risk.” Open the task’s Blocked by detail.

**2:10 — Open Today.** Show the action-only page: mention, at-risk task, unresolved edit, blocking work, and changed deadline. “Today is not another dashboard. It is the five things that need a decision.”

**2:30 — Ask Copilot.** Open the Copilot panel and ask “What is late?” or “Who is overloaded?” It answers from project data, cites the relevant task, and unknown facts return the explicit not-found message. Tap the mic affordance to show the Web Speech API transcript path.

**2:50 — Close on architecture.** End on Dashboard, then README architecture: Next.js → Supabase Auth/Postgres/Realtime/Storage → server-side Copilot. “TeamDeck keeps the work, the context, and the next action together.”
