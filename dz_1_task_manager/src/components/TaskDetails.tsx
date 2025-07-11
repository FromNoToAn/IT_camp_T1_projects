import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import type { Task } from '../data/tasks';
import { categories, statuses, priorities } from '../data/tasks';
import { useTaskContext } from './TaskContext';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTaskContext();

  const task = tasks.find(t => t.id === Number(id));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Task['category']>('Bug');
  const [status, setStatus] = useState<Task['status']>('To Do');
  const [priority, setPriority] = useState<Task['priority']>('Low');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? '');
      setCategory(task.category);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task) return <div>Задача не найдена</div>;

  const handleSave = () => {
    updateTask({
      ...task,
      title,
      description,
      category,
      status,
      priority,
    });
    navigate('/');
  };

  return (
    <Stack spacing={2} padding={2}>
      <TextField label="Заголовок" value={title} onChange={e => setTitle(e.target.value)} />
      <TextField
        label="Описание"
        value={description}
        onChange={e => setDescription(e.target.value)}
        multiline
      />

      <FormControl fullWidth>
        <InputLabel>Категория</InputLabel>
        <Select value={category} onChange={e => setCategory(e.target.value as Task['category'])} label="Категория">
          {categories.map(c => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Статус</InputLabel>
        <Select value={status} onChange={e => setStatus(e.target.value as Task['status'])} label="Статус">
          {statuses.map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Приоритет</InputLabel>
        <Select value={priority} onChange={e => setPriority(e.target.value as Task['priority'])} label="Приоритет">
          {priorities.map(p => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={handleSave} startIcon={<SaveIcon />} 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', textTransform: 'none',
          '&:hover': { backgroundColor: 'var(--back_color)'}}}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')} startIcon={<CancelIcon />} 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', textTransform: 'none',
          '&:hover': { backgroundColor: 'var(--back_color)'}}}>
          Сancel
        </Button>
      </Stack>
    </Stack>
  );
}
