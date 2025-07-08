
import React, { useState, useEffect } from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskForm from './TaskForm';
import TaskBucket from './TaskBucket';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TaskBucket as TaskBucketType } from '@/types/Task';
import { Clock, CheckCircle, XCircle, Target } from 'lucide-react';

const TaskManager: React.FC = () => {
  const { addTask, toggleComplete, deleteTask, getTasksByBucket } = useTasks();
  const [activeTab, setActiveTab] = useState<TaskBucketType>('upcoming');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute to refresh task categorization
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const buckets = getTasksByBucket();
  const totalTasks = buckets.upcoming.length + buckets.completed.length + buckets.missed.length;

  const handleAddTask = (taskData: {
    title: string;
    description: string;
    deadline: string;
  }) => {
    addTask(taskData);
  };

  const getBucketConfig = () => ({
    upcoming: {
      title: 'Upcoming Tasks',
      emptyMessage: 'No upcoming tasks. Great job staying on top of things!',
      icon: Clock,
      color: 'text-blue-600'
    },
    completed: {
      title: 'Completed Tasks',
      emptyMessage: 'No completed tasks yet. Start checking off those tasks!',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    missed: {
      title: 'Missed Tasks',
      emptyMessage: 'No missed deadlines. Keep up the excellent work!',
      icon: XCircle,
      color: 'text-red-600'
    }
  });

  const config = getBucketConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Momentum
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            Automatically organize your tasks by deadlines
          </p>
          
          <TaskForm onSubmit={handleAddTask} />
        </div>

        <Separator className="my-8" />

        {/* Task Buckets */}
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as TaskBucketType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-md rounded-lg p-1">
            {Object.entries(config).map(([key, { title, icon: Icon, color }]) => {
              const taskCount = buckets[key as TaskBucketType].length;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center gap-2 py-3 px-4 rounded-md transition-all duration-200 font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {title}
                  <span className="ml-auto bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs data-[state=active]:bg-primary-foreground/20 data-[state=active]:text-primary-foreground">
                    {taskCount}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(config).map(([key, { title, emptyMessage }]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <TaskBucket
                title={title}
                tasks={buckets[key as TaskBucketType]}
                bucket={key as TaskBucketType}
                onToggleComplete={toggleComplete}
                onDelete={deleteTask}
                emptyMessage={emptyMessage}
                totalTasks={totalTasks}
              />
            </TabsContent>
          ))}
        </Tabs>

        <Separator className="my-12" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <CardDescription>All your tasks</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{buckets.upcoming.length}</div>
              <CardDescription>Tasks to complete</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{buckets.completed.length}</div>
              <CardDescription>Tasks finished</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Missed</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{buckets.missed.length}</div>
              <CardDescription>Overdue tasks</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
