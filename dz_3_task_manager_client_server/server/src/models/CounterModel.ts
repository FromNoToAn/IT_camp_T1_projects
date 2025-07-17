import mongoose from 'mongoose';

/**
 * Mongoose-схема для счетчика id
 * @typedef {Object} CounterModel
 * @property {string} _id - Название счетчика (например, 'taskId')
 * @property {number} seq - Текущее значение
 */
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // название счётчика, например 'taskId'
  seq: { type: Number, default: 0 }
});

export const CounterModel = mongoose.model('Counter', counterSchema);