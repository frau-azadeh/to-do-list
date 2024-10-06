import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  endDate: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: 0,  // مقدار id پیش‌فرض
    title: '',
    description: '',
    status: '',
    assignedTo: '',
    progress: 0,
    startDate: '',
    endDate: '',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // دریافت تسک‌ها از API
  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleSubmit = () => {
    if (editingTask) {
      // برای ویرایش تسک
      fetch(`/api/tasks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTask, id: editingTask.id }),  // id در هنگام ویرایش
      })
        .then((response) => response.json())
        .then((updatedTask) => {
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
          );
          setEditingTask(null);
          setNewTask({ id: 0, title: '', description: '', status: '', assignedTo: '', progress: 0, startDate: '', endDate: '' });
        });
    } else {
      // برای اضافه کردن تسک جدید
      fetch(`/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((newTaskData) => {
          setTasks([...tasks, newTaskData]);
          setNewTask({ id: 0, title: '', description: '', status: '', assignedTo: '', progress: 0, startDate: '', endDate: '' });
        });
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setNewTask(task);  // تنظیم id هنگام ویرایش
  };

  const handleDelete = (id: number) => {
    fetch(`/api/tasks`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>

      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
        editingTask={editingTask}
      />

      <TaskTable
        tasks={tasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default TaskManager;