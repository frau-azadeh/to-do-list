"use client";
import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  progress: number;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [assignedFilter, setAssignedFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // دریافت تسک‌ها از API
  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
      });
  }, []);

  // فیلتر کردن تسک‌ها
  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((task) => (assignedFilter.length === 0 ? true : assignedFilter.includes(task.assignedTo)))
    .filter((task) => (statusFilter.length === 0 ? true : statusFilter.includes(task.status)));

  // محاسبه تسک‌های صفحه فعلی
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // تغییر صفحه
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredTasks.length / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Task List</h1>

      {/* جستجو و فیلتر */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title"
          className="border p-2 w-full mb-2"
        />
        <select
          onChange={(e) => setAssignedFilter([e.target.value])}
          className="border p-2 w-full mb-2"
        >
          <option value="">Filter by Assigned To</option>
          {Array.from(new Set(tasks.map((task) => task.assignedTo))).map((assignedTo) => (
            <option key={assignedTo} value={assignedTo}>
              {assignedTo}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setStatusFilter([e.target.value])}
          className="border p-2 w-full mb-2"
        >
          <option value="">Filter by Status</option>
          {Array.from(new Set(tasks.map((task) => task.status))).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* لیست تسک‌ها */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Assigned To</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {currentTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{task.title}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{task.description}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{task.status}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{task.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredTasks.length / tasksPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
          disabled={currentPage === Math.ceil(filteredTasks.length / tasksPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;