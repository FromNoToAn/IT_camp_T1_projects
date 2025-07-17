import mongoose from 'mongoose';

const freeIdSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }
});

export const FreeIdModel = mongoose.model('FreeId', freeIdSchema);