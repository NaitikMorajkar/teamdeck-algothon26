import type { Task } from './types';

export type MergeConflict = { field: keyof Task; base: unknown; mine: unknown; theirs: unknown };
export type MergeResult = { merged: Task; conflicts: MergeConflict[]; autoMergedFields: (keyof Task)[] };

const mergeableFields: (keyof Task)[] = ['title', 'description', 'status', 'priority', 'assigneeId', 'dueDate'];

export function mergeTask(base: Task, mine: Task, theirs: Task): MergeResult {
  const merged = { ...theirs };
  const conflicts: MergeConflict[] = [];
  const autoMergedFields: (keyof Task)[] = [];
  for (const field of mergeableFields) {
    const b = base[field]; const m = mine[field]; const t = theirs[field];
    const mineChanged = m !== b; const theirsChanged = t !== b;
    if (mineChanged && !theirsChanged) { merged[field] = m as never; autoMergedFields.push(field); }
    else if (mineChanged && theirsChanged && m === t) { merged[field] = m as never; autoMergedFields.push(field); }
    else if (mineChanged && theirsChanged && m !== t) conflicts.push({ field, base: b, mine: m, theirs: t });
  }
  return { merged, conflicts, autoMergedFields };
}
