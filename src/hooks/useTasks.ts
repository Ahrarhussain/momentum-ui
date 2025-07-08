
import { useState, useEffect, useCallback } from 'react';
import { Task, TaskBucket } from '@/types/Task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Auto-categorize tasks based on current time
  const categorizeTask = useCallback((task: Task): TaskBucket => {
    if (task.isCompleted) return 'completed';
    
    const now = new Date();
    const deadline = new Date(task.deadline);
    
    if (deadline < now) return 'missed';
    return 'upcoming';
  }, []);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  }, []);

  const getTasksByBucket = useCallback(() => {
    const buckets = {
      upcoming: [] as Task[],
      completed: [] as Task[],
      missed: [] as Task[]
    };

    tasks.forEach(task => {
      const bucket = categorizeTask(task);
      buckets[bucket].push(task);
    });

    return buckets;
  }, [tasks, categorizeTask]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    getTasksByBucket,
    categorizeTask
  };
};
