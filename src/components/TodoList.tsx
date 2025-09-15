"use client";

import React, { useState } from "react";

import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, List, Space, Tag } from "antd";

import { useTodos } from "@/context/TodoContext";

interface TodoListProps {
  filter: "all" | "completed" | "pending";
}

const TodoList: React.FC<TodoListProps> = ({ filter }) => {
  const { state, dispatch } = useTodos();
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggingIndex === null) return;

    const reorderedTodos = [...state.todos];
    const [draggedItem] = reorderedTodos.splice(draggingIndex, 1);
    reorderedTodos.splice(index, 0, draggedItem);

    dispatch({ type: "REORDER_TODOS", payload: { todos: reorderedTodos } });
    setDraggingIndex(null);
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (!editText.trim()) {
      alert("متن نمی‌تواند خالی باشد.");
      return;
    }
    dispatch({
      type: "EDIT_TODO",
      payload: { id: editingId!, text: editText },
    });
    setEditingId(null);
    setEditText("");
  };

  const filteredTodos = state.todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const getPriorityTagColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "orange";
      case "high":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <div
      style={{
        background: "#f9f9f9",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <List
        dataSource={filteredTodos}
        renderItem={(todo, index) => (
          <div
            key={`${todo.id}-${index}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            style={{
              background: draggingIndex === index ? "#e6f7ff" : "#fff",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "grab",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#aaa" : "#000",
                flexGrow: 1,
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{
                  marginRight: "10px",
                  color: todo.completed ? "#047857" : "inherit", // تغییر رنگ به سبز در صورت تیک خوردن
                }}
              />
              {editingId === todo.id ? (
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ width: "100%" }}
                />
              ) : (
                <span>
                  {todo.text}{" "}
                  <Tag color={getPriorityTagColor(todo.priority)}>
                    {todo.priority === "low"
                      ? "کم"
                      : todo.priority === "medium"
                        ? "متوسط"
                        : "زیاد"}
                  </Tag>
                </span>
              )}
            </div>
            <Space>
              {editingId === todo.id ? (
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={saveEdit}
                  style={{ background: "green", borderColor: "green" }}
                />
              ) : (
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => startEditing(todo.id, todo.text)}
                />
              )}
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteTodo(todo.id)}
              />
            </Space>
          </div>
        )}
      />
    </div>
  );
};

export default TodoList;
