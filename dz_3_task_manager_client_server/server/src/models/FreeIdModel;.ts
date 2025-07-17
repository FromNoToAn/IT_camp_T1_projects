import mongoose from 'mongoose';

/**
 * Mongoose-схема для хранения свободных id
 * @typedef {Object} FreeIdModel
 * @property {number} id - Свободный id задачи
 */
const freeIdSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }
});

export const FreeIdModel = mongoose.model('FreeId', freeIdSchema);