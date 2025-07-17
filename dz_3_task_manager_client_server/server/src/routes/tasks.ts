import { Router } from 'express';

import { TaskModel } from '../models/TaskModel';
import { CounterModel } from '../models/CounterModel';
import { FreeIdModel } from '../models/FreeIdModel;';

import { validateCreateTaskData, validateUpdateTaskData  } from '../controllers/validate';

const router = Router();

// Локалка была
// let tasks: Task[] = [];
// let currentId = 1;


// Функция получения следующего id, учитывая свободные id
async function getNextId(): Promise<number> {
  // Пытаемся взять минимальный свободный id из FreeId
  const freeIdDoc = await FreeIdModel.findOne().sort({ id: 1 });
  if (freeIdDoc) {
    // Удаляем его из коллекции свободных id
    await FreeIdModel.deleteOne({ _id: freeIdDoc._id });
    return freeIdDoc.id;
  }
  // Если свободных id нет — берем новый из счетчика
  const ret = await CounterModel.findByIdAndUpdate(
    'taskId',
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return ret!.seq;
}

/**
 * Получить все задачи
 */
router.get('/', async (req, res) => {
  try {
    const { title, createdAt } = req.query;
    const filter: any = {};

    if (title)
    {
      // Поиск по подстроке в названии (регистронезависимо)
      filter.title = { $regex: title, $options: 'i' };
    }
    if (createdAt)
    {
      // Точное совпадение даты создания
      filter.createdAt = createdAt;
    }

    const tasks = await TaskModel.find(filter);
    res.json(tasks);
  } catch {
    res.status(500).json({ error: 'Ошибка при получении задач' });
  }
});

/**
 * Получить задачу по ID
 */
router.get('/:id', async (req, res) => {
  const idNum = Number(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: 'Неверный ID' });

  try {
    const task = await TaskModel.findOne({ id: idNum });
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
  } catch {
    res.status(500).json({ error: 'Ошибка при получении задачи' });
  }
});

/**
 * Создать задачу
 */
router.post('/', async (req, res) => {
  const error = validateCreateTaskData(req.body);
  if (error) return res.status(400).json(error);

  try {
    const nextId = await getNextId();

    const newTask = new TaskModel({
      id: nextId,
      ...req.body
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при сохранении задачи' });
  }
});

/**
 * Обновить задачу
 */
router.patch('/:id', async (req, res) => {
  const idNum = Number(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: 'Неверный ID' });

  const error = validateUpdateTaskData(req.body);
  if (error) return res.status(400).json(error);

  try {
    const task = await TaskModel.findOneAndUpdate({ id: idNum }, req.body, { new: true });
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
  } catch {
    res.status(500).json({ error: 'Ошибка при обновлении задачи' });
  }
});

/**
 * Удалить задачу
 */
router.delete('/:id', async (req, res) => {
  const idNum = Number(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: 'Неверный ID' });

  try {
    const task = await TaskModel.findOneAndDelete({ id: idNum });
    if (!task) return res.status(404).send('Task not found');

    // Добавляем освободившийся id в FreeId
    const freeId = new FreeIdModel({ id: idNum });
    await freeId.save();

    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Ошибка при удалении задачи' });
  }
});

export default router;
