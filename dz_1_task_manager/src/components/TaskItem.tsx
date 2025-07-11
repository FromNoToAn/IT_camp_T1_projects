import { Card, CardContent, Typography, Chip, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../data/tasks';

import '../index.css';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%'}}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        {task.description && <Typography>{task.description}</Typography>}

        <Stack direction="row" spacing={1} marginY={1} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 1,}}>
          <Chip label={task.category} color="primary" />
          <Chip label={task.status} color="secondary" />
          <Chip label={task.priority} color="success" />
          <Button variant="contained" startIcon={<EditIcon />} 
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', textTransform: 'none',
            '&:hover': { backgroundColor: 'var(--back_color)'}}} 
            onClick={() => navigate(`/task/${task.id}`)}>
            Edit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}