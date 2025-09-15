"use client";

import React from "react";

import { Button, Col, Form, Input, Row, Select } from "antd";

import { useTodos } from "@/context/TodoContext";

const { Option } = Select;

const TodoForm: React.FC = () => {
  const [form] = Form.useForm();
  const { dispatch } = useTodos();

  const onFinish = (values: {
    task: string;
    priority: "low" | "medium" | "high";
  }) => {
    dispatch({
      type: "ADD_TODO",
      payload: { text: values.task, priority: values.priority },
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ marginBottom: "20px" }}
    >
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="task"
            rules={[{ required: true, message: "لطفاً وظیفه‌ای وارد کنید!" }]}
          >
            <Input placeholder="اضافه کردن وظیفه جدید" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="priority"
            rules={[
              { required: true, message: "لطفاً اولویت را انتخاب کنید!" },
            ]}
          >
            <Select placeholder="اولویت">
              <Option value="low">کم</Option>
              <Option value="medium">متوسط</Option>
              <Option value="high">زیاد</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#0000FF", borderColor: "#0000FF" }}
            >
              افزودن
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TodoForm;
