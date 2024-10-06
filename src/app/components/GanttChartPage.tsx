"use client"
import React, { useState, useEffect } from 'react';
import { Gantt, Task } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';


interface TaskData {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  startDate: string; // تاریخ شروع به صورت میلادی
  endDate: string; // تاریخ پایان به صورت میلادی
}

const GanttChartPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        // بررسی و فیلتر تسک‌های نامعتبر (بدون تاریخ شروع و پایان)
        const formattedTasks: Task[] = data.tasks
          .filter((task: TaskData) => task.startDate && task.endDate)  // حذف تسک‌های بدون تاریخ
          .map((task: TaskData) => ({
            id: String(task.id),
            name: task.title,
            start: new Date(task.startDate),  // تبدیل تاریخ شروع به میلادی
            end: new Date(task.endDate),  // تبدیل تاریخ پایان به میلادی
            type: 'task',
            progress: 50, // میزان پیشرفت (می‌توانید بر اساس نیاز تغییر دهید)
            isDisabled: false,
          }));
        setTasks(formattedTasks);  // تنظیم داده‌ها در استیت
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Gantt Chart for Tasks</h1>
      {tasks.length > 0 ? (  // اطمینان از وجود تسک‌ها
        <Gantt tasks={tasks} />
      ) : (
        <p>Loading tasks...</p>
      )}
    </div>
  );
};

export default GanttChartPage;