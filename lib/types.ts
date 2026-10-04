export type Status = 'todo' | 'in_progress' | 'review' | 'done';
export type Priority = 1 | 2 | 3;

export type Member = { id: string; name: string; initials: string; role: 'owner' | 'member'; color: string; online?: boolean };
export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assigneeId: string;
  dueDate: string;
  position: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  blockedBy?: string[];
  conflict?: boolean;
  commentCount?: number;
};
export type Dependency = { taskId: string; dependsOnId: string };
export type Comment = { id: string; taskId: string; authorId: string; body: string; createdAt: string; linkedTaskId?: string };
export type Activity = { id: string; taskId?: string; actorId: string; action: string; meta?: string; createdAt: string };
export type Project = { id: string; name: string; description: string; color: string; createdAt: string };

export const statusLabels: Record<Status, string> = { todo: 'To do', in_progress: 'In progress', review: 'Review', done: 'Done' };
export const statusOrder: Status[] = ['todo', 'in_progress', 'review', 'done'];
