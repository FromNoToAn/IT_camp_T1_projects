import { Task, Category, Status, Priority } from '../models/Task';
import { categories, statuses, priorities } from '../models/Task';

export type TaskCreatePayload = {
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
  createdAt: string;
};

export type TaskUpdatePayload = Partial<Omit<Task, 'id' | 'createdAt'>>;

/**
 * Проверяет валидность данных задачи.
 * @param data Данные для проверки
 * @param isCreate Если true — проверяем обязательные поля (для POST)
 * @returns null, если всё ок, иначе объект с ошибкой
 */

export function validateCreateTaskData(
  data: TaskCreatePayload
): { error: string } | null {
  if (!data.title || typeof data.title !== 'string') {
    return { error: 'Поле title обязательно и должно быть строкой' };
  }
  if (!data.category || !categories.includes(data.category)) {
    return {
      error: 'Поле category обязательно и должно быть допустимым значением'
    };
  }
  if (!data.status || !statuses.includes(data.status)) {
    return {
      error: 'Поле status обязательно и должно быть допустимым значением'
    };
  }
  if (!data.priority || !priorities.includes(data.priority)) {
    return {
      error: 'Поле priority обязательно и должно быть допустимым значением'
    };
  }
  if (
    !data.createdAt ||
    typeof data.createdAt !== 'string' ||
    isNaN(Date.parse(data.createdAt))
  ) {
    return {
      error:
        'Поле createdAt обязательно и должно быть валидной датой в формате строки'
    };
  }

  // Дополнительные проверки (если есть необязательные поля)
  if (data.description !== undefined && typeof data.description !== 'string') {
    return { error: 'description должно быть строкой' };
  }

  return null;
}

export function validateUpdateTaskData(
  data: TaskUpdatePayload
): { error: string } | null {
  if ('createdAt' in data) {
    return { error: 'Поле createdAt не может быть изменено' };
  }

  if (data.title !== undefined && typeof data.title !== 'string') {
    return { error: 'title должно быть строкой' };
  }
  if (data.description !== undefined && typeof data.description !== 'string') {
    return { error: 'description должно быть строкой' };
  }
  if (data.category !== undefined && !categories.includes(data.category)) {
    return { error: `Недопустимая category: ${data.category}` };
  }
  if (data.status !== undefined && !statuses.includes(data.status)) {
    return { error: `Недопустимый status: ${data.status}` };
  }
  if (data.priority !== undefined && !priorities.includes(data.priority)) {
    return { error: `Недопустимый priority: ${data.priority}` };
  }

  return null;
}