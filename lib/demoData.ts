import type { Activity, Comment, Dependency, Member, Project, Task } from './types';

export const members: Member[] = [
  { id: 'priya', name: 'Priya Nair', initials: 'PN', role: 'owner', color: '#C8F169', online: true },
  { id: 'rahul', name: 'Rahul Mehta', initials: 'RM', role: 'member', color: '#9BA7FF', online: true },
  { id: 'sana', name: 'Sana Iqbal', initials: 'SI', role: 'member', color: '#FF8364', online: false },
  { id: 'arjun', name: 'Arjun Rao', initials: 'AR', role: 'member', color: '#F4C95D', online: true }
];
export const projects: Project[] = [
  { id: 'orbit', name: 'Project Orbit', description: 'Ship the new collaboration layer for Algothon.', color: '#C8F169', createdAt: '2026-09-18' },
  { id: 'atlas', name: 'Atlas launch', description: 'A crisp launch plan for the next product chapter.', color: '#9BA7FF', createdAt: '2026-09-11' },
  { id: 'studio', name: 'Studio systems', description: 'Internal workflows, templates and team rituals.', color: '#FF8364', createdAt: '2026-09-05' }
];
export const tasks: Task[] = [
  { id: 't1', projectId: 'orbit', title: 'Finalize onboarding flow', description: 'Resolve the final copy and handoff states before demo day.', status: 'in_progress', priority: 1, assigneeId: 'priya', dueDate: '2026-10-06', position: 1, version: 7, createdAt: '2026-09-20', updatedAt: '2026-10-03', commentCount: 4 },
  { id: 't2', projectId: 'orbit', title: 'Update logo lockup', description: 'Tighten the signal notch and export the favicon set.', status: 'todo', priority: 2, assigneeId: 'rahul', dueDate: '2026-10-04', position: 2, version: 3, createdAt: '2026-09-21', updatedAt: '2026-10-02', commentCount: 2 },
  { id: 't3', projectId: 'orbit', title: 'Write demo narrative', description: 'A three-minute story that makes the never-lose-work moment land.', status: 'review', priority: 2, assigneeId: 'sana', dueDate: '2026-10-05', position: 1, version: 4, createdAt: '2026-09-22', updatedAt: '2026-10-03', commentCount: 3 },
  { id: 't4', projectId: 'orbit', title: 'Realtime conflict test', description: 'Prove separate field edits merge and same-field edits ask for a choice.', status: 'done', priority: 1, assigneeId: 'arjun', dueDate: '2026-10-01', position: 1, version: 9, createdAt: '2026-09-19', updatedAt: '2026-10-02', commentCount: 6 },
  { id: 't5', projectId: 'orbit', title: 'Seed the Supabase project', description: 'Run the migration and invite the demo accounts.', status: 'todo', priority: 3, assigneeId: 'arjun', dueDate: '2026-10-08', position: 3, version: 2, createdAt: '2026-09-25', updatedAt: '2026-10-02', commentCount: 1 },
  { id: 't6', projectId: 'orbit', title: 'Polish dashboard signal strip', description: 'Make risk, workload and presence visible in one glance.', status: 'in_progress', priority: 2, assigneeId: 'priya', dueDate: '2026-10-07', position: 2, version: 5, createdAt: '2026-09-26', updatedAt: '2026-10-03', commentCount: 5 },
  { id: 't7', projectId: 'orbit', title: 'Record voice walkthrough', description: 'Capture a short Hindi/Hinglish voice prompt for the Copilot demo.', status: 'todo', priority: 3, assigneeId: 'sana', dueDate: '2026-10-10', position: 4, version: 1, createdAt: '2026-09-28', updatedAt: '2026-10-01', commentCount: 0 },
  { id: 't8', projectId: 'orbit', title: 'Publish README architecture', description: 'Add the Mermaid diagram and disclosure section.', status: 'done', priority: 2, assigneeId: 'rahul', dueDate: '2026-09-30', position: 2, version: 2, createdAt: '2026-09-20', updatedAt: '2026-10-01', commentCount: 2 }
];
export const dependencies: Dependency[] = [{ taskId: 't1', dependsOnId: 't2' }, { taskId: 't3', dependsOnId: 't1' }, { taskId: 't6', dependsOnId: 't3' }];
export const comments: Comment[] = [
  { id: 'c1', taskId: 't1', authorId: 'rahul', body: 'The edge state is looking much cleaner. @Priya can you confirm the copy?', createdAt: '2026-10-03T09:12:00Z' },
  { id: 'c2', taskId: 't2', authorId: 'priya', body: '/task QA the favicon exports @Arjun', createdAt: '2026-10-03T10:12:00Z', linkedTaskId: 't5' },
  { id: 'c3', taskId: 't3', authorId: 'sana', body: 'I added the merge moment to the opening beat.', createdAt: '2026-10-02T14:40:00Z' }
];
export const activities: Activity[] = [
  { id: 'a1', taskId: 't1', actorId: 'rahul', action: 'commented', meta: 'Mentioned Priya', createdAt: '2026-10-03T09:12:00Z' },
  { id: 'a2', taskId: 't3', actorId: 'sana', action: 'moved to Review', createdAt: '2026-10-03T08:44:00Z' },
  { id: 'a3', taskId: 't4', actorId: 'arjun', action: 'completed task', createdAt: '2026-10-02T17:18:00Z' },
  { id: 'a4', taskId: 't6', actorId: 'priya', action: 'changed due date', meta: 'Oct 7', createdAt: '2026-10-02T11:08:00Z' }
];
