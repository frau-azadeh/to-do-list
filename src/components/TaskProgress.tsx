"use client";

import React from "react";

import { Progress } from "antd";

import { useTodos } from "@/context/TodoContext";

const TaskProgress: React.FC = () => {
  const { state } = useTodos();

  const totalTasks = state.todos.length;
  const completedTasks = state.todos.filter((todo) => todo.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <h3>درصد پیشرفت وظایف</h3>
      <Progress type="circle" percent={Math.round(progress)} />
    </div>
  );
};

export default TaskProgress;
