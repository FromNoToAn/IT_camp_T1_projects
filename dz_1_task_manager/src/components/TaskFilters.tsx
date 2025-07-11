import { Stack, FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@mui/material';
import { useTaskContext } from './TaskContext';
import { categories, statuses, priorities } from '../data/tasks';

export default function TaskFilters() {
  const { filters, setFilters } = useTaskContext();

  const handleChange = (key: 'category' | 'status' | 'priority', value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} padding={2}>
          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              value={filters.category}
              label="Категория"
              onChange={e => handleChange('category', e.target.value)}
            >
              <MenuItem value="All">Все</MenuItem>
              {categories.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select
              value={filters.status}
              label="Статус"
              onChange={e => handleChange('status', e.target.value)}
            >
              <MenuItem value="All">Все</MenuItem>
              {statuses.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Приоритет</InputLabel>
            <Select
              value={filters.priority}
              label="Приоритет"
              onChange={e => handleChange('priority', e.target.value)}
            >
              <MenuItem value="All">Все</MenuItem>
              {priorities.map(p => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
}
