import TaskDetails from '../components/TaskDetails';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function TaskPage() {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Редактирование задачи
      </Typography>
      <Card sx={{ margin: 2 }}>
        <CardContent>
          <TaskDetails />
        </CardContent>
      </Card>
    </Box>
  );
}
