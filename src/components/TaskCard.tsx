
import React from 'react';
import { Task, TaskBucket } from '@/types/Task';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Check, X, Clock, CheckCircle, XCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  bucket: TaskBucket;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  bucket, 
  onToggleComplete, 
  onDelete 
}) => {
  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const getBucketStyles = () => {
    switch (bucket) {
      case 'upcoming':
        return {
          cardBg: 'border-blue-200 bg-blue-50',
          badgeVariant: 'default' as const,
          icon: Clock,
          iconColor: 'text-blue-600'
        };
      case 'completed':
        return {
          cardBg: 'border-green-200 bg-green-50',
          badgeVariant: 'secondary' as const,
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'missed':
        return {
          cardBg: 'border-red-200 bg-red-50',
          badgeVariant: 'destructive' as const,
          icon: XCircle,
          iconColor: 'text-red-600'
        };
    }
  };

  const styles = getBucketStyles();
  const IconComponent = styles.icon;

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${styles.cardBg} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <IconComponent className={`h-4 w-4 ${styles.iconColor}`} />
              <h3 className={`font-bold text-lg text-gray-800 ${
                task.isCompleted ? 'line-through opacity-75' : ''
              }`}>
                {task.title}
              </h3>
            </div>
            <Badge variant={styles.badgeVariant} className="text-xs">
              {bucket.charAt(0).toUpperCase() + bucket.slice(1)}
            </Badge>
          </div>
          
          <div className="flex gap-2 ml-4">
            {bucket !== 'completed' && (
              <Button
                onClick={() => onToggleComplete(task.id)}
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                title="Mark as complete"
              >
                <Check size={16} />
              </Button>
            )}
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  className="p-2 rounded-full"
                  title="Delete task"
                >
                  <X size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{task.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(task.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {task.description && (
          <p className="text-sm mb-3 text-gray-600">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-gray-700">
            {formatDeadline(task.deadline)}
          </span>
          <span className="text-gray-500">
            {new Date(task.deadline).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
