import TaskList from '../components/TaskList';
import { Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Менеджер задач
      </Typography>
      <TaskList />
    </Box>
  );
}