export const categories: Category[] = [
  'Bug',
  'Feature',
  'Documentation',
  'Refactor',
  'Test'
];
export const statuses: Status[] = ['To Do', 'In Progress', 'Done'];
export const priorities: Priority[] = ['Low', 'Medium', 'High'];

export type Category =
  | 'Bug'
  | 'Feature'
  | 'Documentation'
  | 'Refactor'
  | 'Test';
export type Status = 'To Do' | 'In Progress' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High';

export type Task = {
  id: number;
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
  createdAt: string;
};
