export type Category = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
export type Status = 'To Do' | 'In Progress' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High';

export const categories: Category[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
export const statuses: Status[] = ['To Do', 'In Progress', 'Done'];
export const priorities: Priority[] = ['Low', 'Medium', 'High'];

export type Task = {
  id: number;
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
};

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Починить это приложение',
    description: 'Проблемы с роутером',
    category: 'Bug',
    status: 'Done',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Реализовать добавление задач',
    category: 'Documentation',
    status: 'To Do',
    priority: 'Low',
  },
  {
    id: 3,
    title: 'Добавить фильтр',
    category: 'Documentation',
    status: 'Done',
    priority: 'Medium',
  },
  {
    id: 4,
    title: 'Адаптировать дизайн',
    description: 'ПК и телефон',
    category: 'Feature',
    status: 'In Progress',
    priority: 'Medium',
  },
];
