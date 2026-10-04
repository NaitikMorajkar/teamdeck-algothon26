import { describe, expect, it } from 'vitest';
import { computeRisk } from '@/lib/computeRisk';
import { mergeTask } from '@/lib/mergeTask';
import { parseMentions, parseTaskCommand } from '@/lib/taskCommands';
import type { Task } from '@/lib/types';

const base: Task = { id: 't', projectId: 'p', title: 'Base title', description: 'Base description', status: 'todo', priority: 2, assigneeId: 'a', dueDate: '2026-10-10', position: 1, version: 1, createdAt: '2026-10-01', updatedAt: '2026-10-01' };

describe('mergeTask', () => {
  it('keeps only my change', () => expect(mergeTask(base, { ...base, title: 'Mine' }, base).merged.title).toBe('Mine'));
  it('keeps only their change', () => expect(mergeTask(base, base, { ...base, description: 'Theirs' }).merged.description).toBe('Theirs'));
  it('merges different fields', () => { const result = mergeTask(base, { ...base, title: 'Mine' }, { ...base, priority: 1 }); expect(result.conflicts).toHaveLength(0); expect(result.merged.title).toBe('Mine'); expect(result.merged.priority).toBe(1); });
  it('accepts the same value from both editors', () => expect(mergeTask(base, { ...base, title: 'Shared' }, { ...base, title: 'Shared' }).conflicts).toHaveLength(0));
  it('returns a real conflict for different same-field edits', () => expect(mergeTask(base, { ...base, title: 'Mine' }, { ...base, title: 'Theirs' }).conflicts[0].field).toBe('title'));
  it('handles cleared fields as values', () => expect(mergeTask(base, { ...base, description: '' }, base).merged.description).toBe(''));
});

describe('computeRisk', () => {
  it('marks a todo due within two days', () => { const task = { ...base, dueDate: '2026-10-05' }; expect(computeRisk([task], [], '2026-10-04')[0].reasons).toContain('due-soon'); });
  it('marks an overdue dependency', () => { const source: Task = { ...base, id: 'source', status: 'in_progress', dueDate: '2026-10-01' }; const task: Task = { ...base, id: 'downstream', dueDate: '2026-10-12' }; expect(computeRisk([source, task], [{ taskId: task.id, dependsOnId: source.id }], '2026-10-04')[0].reasons).toContain('overdue-dependency'); });
  it('does not mark a healthy task with no dependencies', () => { const task: Task = { ...base, status: 'in_progress', dueDate: '2026-10-12' }; expect(computeRisk([task], [], '2026-10-04')).toHaveLength(0); });
  it('marks a chained dependency when the source deadline is late', () => { const a: Task = { ...base, id: 'a', status: 'in_progress', dueDate: '2026-10-06' }; const b: Task = { ...base, id: 'b', dueDate: '2026-10-05' }; expect(computeRisk([a, b], [{ taskId: b.id, dependsOnId: a.id }], '2026-10-04')[0].blockingTaskIds).toContain('a'); });
});

describe('comment commands', () => {
  it('parses task commands and assignees', () => expect(parseTaskCommand('/task Fix logo @Priya')).toEqual({ title: 'Fix logo', assigneeName: 'Priya' }));
  it('parses unique mentions', () => expect(parseMentions('@Priya please review @Priya @Rahul')).toEqual(['Priya', 'Rahul']));
});
