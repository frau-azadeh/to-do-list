"use client";

import React, { useState } from "react";

import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Input, List, Row, Space } from "antd";

import { useTodos } from "@/context/TodoContext";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const toggleTodo = () => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  };

  const deleteTodo = () => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  };

  const saveEditedTodo = () => {
    if (editedText.trim() === "") {
      alert("متن وظیفه نمی‌تواند خالی باشد.");
      return;
    }
    dispatch({ type: "EDIT_TODO", payload: { id, text: editedText } });
    setIsEditing(false);
  };

  return (
    <List.Item>
      <Row
        gutter={[16, 16]}
        align="middle"
        justify="space-between"
        style={{
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginBottom: "10px",
        }}
      >
        <Col
          xs={24}
          sm={18}
          md={18}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Checkbox
            checked={completed}
            onChange={toggleTodo}
            style={{ marginRight: "10px" }}
          />
          {isEditing ? (
            <Input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              style={{ width: "100%" }}
            />
          ) : (
            <span
              style={{
                textDecoration: completed ? "line-through" : "none",
                color: completed ? "#aaa" : "#000",
                flexGrow: 1,
              }}
            >
              {text}
            </span>
          )}
        </Col>

        <Col xs={24} sm={6} md={6} style={{ textAlign: "right" }}>
          <Space>
            {isEditing ? (
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={saveEditedTodo}
                style={{ backgroundColor: "green", borderColor: "green" }}
              />
            ) : (
              <Button
                type="default"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
              />
            )}
            <Button
              type="default"
              danger
              icon={<DeleteOutlined />}
              onClick={deleteTodo}
            />
          </Space>
        </Col>
      </Row>
    </List.Item>
  );
};

export default TodoItem;
