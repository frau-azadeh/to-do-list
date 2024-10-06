import React from 'react';
import { Task } from './TaskManager';

interface TaskFormProps {
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  handleSubmit: () => void;
  editingTask: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ newTask, setNewTask, handleSubmit, editingTask }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Task Title"
        className="border p-2 mr-2 mb-2 w-full sm:w-auto"
      />
      <input
        type="text"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        placeholder="Task Description"
        className="border p-2 mr-2 mb-2 w-full sm:w-auto"
      />
      <input
        type="text"
        value={newTask.status}
        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        placeholder="Task Status"
        className="border p-2 mr-2 mb-2 w-full sm:w-auto"
      />
      <input
        type="text"
        value={newTask.assignedTo}
        onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
        placeholder="Assigned To"
        className="border p-2 mr-2 mb-2 w-full sm:w-auto"
      />
      <input
        type="date"
        value={newTask.startDate}
        onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
        placeholder="Start Date"
        className="border p-2 mr-2 mb-2 w-full sm:w-auto"
      />
      <input
        type="date"
        value={newTask.endDate}
        onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
        placeholder="End Date"
        className="border p-2 mr-2 mb-2 w-full sm:w-auto"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 mb-2 w-full sm:w-auto">
        {editingTask ? 'Edit Task' : 'Add Task'}
      </button>
    </div>
  );
};

export default TaskForm;