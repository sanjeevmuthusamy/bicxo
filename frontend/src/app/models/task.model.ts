export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId: string;
}

export interface BoardColumn {
  title: TaskStatus;
  tasks: Task[];
}
