import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskPage from './pages/TaskPage';
import { TaskProvider } from './components/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskPage />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;

