import type { Dependency, Task } from './types';

export type RiskReason = 'due-soon' | 'overdue-dependency' | 'dependency-due-late';
export type Risk = { taskId: string; reasons: RiskReason[]; blockingTaskIds: string[] };

const dayMs = 86_400_000;
function dateValue(date: string) { return new Date(`${date}T12:00:00`).getTime(); }

export function computeRisk(tasks: Task[], deps: Dependency[], today: string): Risk[] {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const dueToday = dateValue(today);
  const results: Risk[] = [];
  for (const task of tasks) {
    if (task.status === 'done') continue;
    const reasons: RiskReason[] = [];
    const taskDue = dateValue(task.dueDate);
    if (task.status === 'todo' && taskDue >= dueToday && taskDue - dueToday <= 2 * dayMs) reasons.push('due-soon');
    const taskDeps = deps.filter((dep) => dep.taskId === task.id);
    const blockingTaskIds: string[] = [];
    for (const dep of taskDeps) {
      const source = byId.get(dep.dependsOnId);
      if (!source || source.status === 'done') continue;
      if (dateValue(source.dueDate) < dueToday) { reasons.push('overdue-dependency'); blockingTaskIds.push(source.id); }
      else if (dateValue(source.dueDate) >= taskDue) { reasons.push('dependency-due-late'); blockingTaskIds.push(source.id); }
    }
    if (reasons.length) results.push({ taskId: task.id, reasons: Array.from(new Set(reasons)), blockingTaskIds });
  }
  return results;
}

export function wouldCreateCycle(taskId: string, dependsOnId: string, deps: Dependency[]): boolean {
  if (taskId === dependsOnId) return true;
  const adjacency = new Map<string, string[]>();
  deps.forEach(({ taskId: from, dependsOnId: to }) => adjacency.set(from, [...(adjacency.get(from) ?? []), to]));
  adjacency.set(taskId, [...(adjacency.get(taskId) ?? []), dependsOnId]);
  const seen = new Set<string>();
  const visit = (node: string): boolean => { if (node === taskId) return true; if (seen.has(node)) return false; seen.add(node); return (adjacency.get(node) ?? []).some(visit); };
  return visit(dependsOnId);
}
