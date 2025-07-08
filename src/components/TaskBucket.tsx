
import React from 'react';
import { Task, TaskBucket as TaskBucketType } from '@/types/Task';
import TaskCard from './TaskCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface TaskBucketProps {
  title: string;
  tasks: Task[];
  bucket: TaskBucketType;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  emptyMessage: string;
  totalTasks: number;
}

const TaskBucket: React.FC<TaskBucketProps> = ({
  title,
  tasks,
  bucket,
  onToggleComplete,
  onDelete,
  emptyMessage,
  totalTasks
}) => {
  const getBucketIcon = () => {
    switch (bucket) {
      case 'upcoming':
        return Clock;
      case 'completed':
        return CheckCircle;
      case 'missed':
        return XCircle;
    }
  };

  const getBucketColor = () => {
    switch (bucket) {
      case 'upcoming':
        return 'text-blue-600';
      case 'completed':
        return 'text-green-600';
      case 'missed':
        return 'text-red-600';
    }
  };

  const getProgressValue = () => {
    if (totalTasks === 0) return 0;
    return (tasks.length / totalTasks) * 100;
  };

  const IconComponent = getBucketIcon();
  const colorClass = getBucketColor();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <IconComponent className={`h-6 w-6 ${colorClass}`} />
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <Badge variant="outline" className="text-sm font-semibold">
            {tasks.length}
          </Badge>
        </div>
        
        {totalTasks > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{Math.round(getProgressValue())}%</span>
            <Progress value={getProgressValue()} className="w-20" />
          </div>
        )}
      </div>

      {tasks.length === 0 ? (
        <Alert>
          <IconComponent className={`h-4 w-4 ${colorClass}`} />
          <AlertDescription className="text-base">
            {emptyMessage}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              bucket={bucket}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskBucket;
