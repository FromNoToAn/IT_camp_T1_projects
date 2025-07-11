import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Task, Category, Status, Priority } from '../data/tasks';
import { tasks as initialTasks } from '../data/tasks';


interface Filters {
  category: Category | 'All';
  status: Status | 'All';
  priority: Priority | 'All';
}

const defaultFilters: Filters = {
  category: 'All',
  status: 'All',
  priority: 'All',
};

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  updateTask: (updatedTask: Task) => void;

  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}


const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used inside TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const updateTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.category !== 'All' && task.category !== filters.category) return false;
    if (filters.status !== 'All' && task.status !== filters.status) return false;
    if (filters.priority !== 'All' && task.priority !== filters.priority) return false;
    return true;
  });

  return (
    <TaskContext.Provider value={{ tasks, filteredTasks, updateTask, filters, setFilters }}>
      {children}
    </TaskContext.Provider>
  );
}
