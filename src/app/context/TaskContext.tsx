"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// مدل Task
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
}

// تایپ برای کانتکست
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  deleteTask: (id: number) => void;
  startEditing: (task: Task) => void;
  editTask: (id: number, updatedTask: Omit<Task, 'id'>) => void;
  newTask: Omit<Task, 'id'>;
  setNewTask: React.Dispatch<React.SetStateAction<Omit<Task, 'id'>>>;
  editingTask: Task | null;
}

// ایجاد کانتکست
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider کانتکست
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: '',
    assignedTo: ''
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // تابع برای دریافت تسک‌ها از API
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Error fetching tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // افزودن تسک جدید
  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        console.error('Error adding task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // حذف تسک
  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } else {
        console.error('Error deleting task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // ویرایش تسک
  const startEditing = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      assignedTo: task.assignedTo,
    });
  };

  const editTask = async (id: number, updatedTask: Omit<Task, 'id'>) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedTask }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
        setEditingTask(null);
      } else {
        console.error('Error editing task');
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        startEditing,
        editTask,
        newTask,
        setNewTask,
        editingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// هوک برای استفاده از کانتکست
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};