/**
 * Категория задачи
 * @typedef {('Bug'|'Feature'|'Documentation'|'Refactor'|'Test')} Category
 */
export const categories: Category[] = [
  'Bug',
  'Feature',
  'Documentation',
  'Refactor',
  'Test'
];
/**
 * Статус задачи
 * @typedef {('To Do'|'In Progress'|'Done')} Status
 */
export const statuses: Status[] = ['To Do', 'In Progress', 'Done'];
/**
 * Приоритет задачи
 * @typedef {('Low'|'Medium'|'High')} Priority
 */
export const priorities: Priority[] = ['Low', 'Medium', 'High'];

export type Category =
  | 'Bug'
  | 'Feature'
  | 'Documentation'
  | 'Refactor'
  | 'Test';
export type Status = 'To Do' | 'In Progress' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High';

/**
 * Описывает задачу в системе
 * @typedef {Object} Task
 * @property {number} id - Уникальный идентификатор
 * @property {string} title - Название задачи
 * @property {string} [description] - Описание задачи
 * @property {Category} category - Категория
 * @property {Status} status - Статус
 * @property {Priority} priority - Приоритет
 * @property {string} createdAt - Дата создания (ISO)
 */
export type Task = {
  id: number;
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
  createdAt: string;
};
