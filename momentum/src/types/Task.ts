
export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
  createdAt: string;
}

export type TaskBucket = 'upcoming' | 'completed' | 'missed';
