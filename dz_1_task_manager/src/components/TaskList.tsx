import Grid from '@mui/material/Grid';
import TaskItem from './TaskItem';
import { useTaskContext } from './TaskContext';
import TaskFilters from './TaskFilters';

export default function TaskList() {

  const { filteredTasks } = useTaskContext();

  return (
    <>
      <TaskFilters />
      <Grid container spacing={2} sx={{ px: 2, py: 0 }}>
        {filteredTasks.map(task => (
          <Grid size={{ xs: 12, md: 6}} key={task.id}>
            <TaskItem task={task} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}