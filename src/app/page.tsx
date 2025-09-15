"use client";

import React, { useState } from "react";

import { Layout } from "antd";

import FilterButtons from "@/components/FilterButtons";
import TaskProgress from "@/components/TaskProgress";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

import { useTodos } from "../context/TodoContext";

const { Header, Content, Footer } = Layout;

const Dashboard: React.FC = () => {
  const { state } = useTodos();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const remainingTasks = state.todos.filter((todo) => !todo.completed).length;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#374151",
          color: "#fff",
          display: "flex",
          justifyContent: "center", // متن وسط قرار می‌گیرد
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <h1 style={{ color: "#fff", margin: 0, textAlign: "center" }}>
          مدیریت وظایف
        </h1>
      </Header>
      <Content
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#fff7ed",
        }}
      >
        <div
          style={{
            padding: 24,
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <TodoForm />
          <TaskProgress />
          <FilterButtons
            setFilter={setFilter}
            filter={filter}
            remainingTasks={remainingTasks}
          />
          <TodoList filter={filter} />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          background: "#27272a",
          color: "#fff",
        }}
      >
        To-Do App © Created by Azadeh Sharifi Soltani
      </Footer>
    </Layout>
  );
};

export default Dashboard;
