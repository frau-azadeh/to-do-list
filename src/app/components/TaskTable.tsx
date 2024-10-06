import React from 'react';
import { Task } from './TaskManager';
import TaskRow from './TaskRow';

interface TaskListProps {
  tasks: Task[];
  handleEdit: (task: Task) => void;
  handleDelete: (id: number) => void;
}

const TaskTable: React.FC<TaskListProps> = ({ tasks, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Assigned To</th>
            <th className="py-3 px-6 text-left">Start Date</th>
            <th className="py-3 px-6 text-left">End Date</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} handleEdit={handleEdit} handleDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;