import mongoose from 'mongoose';

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