import mongoose from 'mongoose';

/**
 * Mongoose-схема для задачи
 * @typedef {Object} TaskModel
 * @property {number} id - Уникальный идентификатор
 * @property {string} title - Название задачи
 * @property {string} [description] - Описание задачи
 * @property {string} category - Категория
 * @property {string} status - Статус
 * @property {string} priority - Приоритет
 * @property {string} createdAt - Дата создания (ISO)
 */
const taskSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  createdAt: { type: String, required: true }
});

export const TaskModel = mongoose.model('Task', taskSchema);