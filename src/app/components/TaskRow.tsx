import React from 'react';
import { Task } from './TaskManager';

interface TaskRowProps {
  task: Task;
  handleEdit: (task: Task) => void;
  handleDelete: (id: number) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, handleEdit, handleDelete }) => {
  return (
    <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">{task.title}</td>
      <td className="py-3 px-6 text-left whitespace-nowrap">{task.description}</td>
      <td className="py-3 px-6 text-left whitespace-nowrap">{task.status}</td>
      <td className="py-3 px-6 text-left whitespace-nowrap">{task.assignedTo}</td>
      <td className="py-3 px-6 text-left whitespace-nowrap">{task.startDate}</td>
      <td className="py-3 px-6 text-left whitespace-nowrap">{task.endDate}</td>
      <td className="py-3 px-6 text-center">
        <button onClick={() => handleEdit(task)} className="text-blue-500 hover:underline mr-3">
          Edit
        </button>
        <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:underline">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
