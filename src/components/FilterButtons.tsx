import React from "react";

import { Button, Col, Row, Typography } from "antd";

interface FilterButtonsProps {
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "completed" | "pending">
  >;
  filter: "all" | "completed" | "pending";
  remainingTasks: number;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  setFilter,
  filter,
  remainingTasks,
}) => {
  const { Text } = Typography;

  return (
    <div style={{ margin: "20px 0" }}>
      <Text
        strong
        style={{ display: "block", textAlign: "center", marginBottom: "16px" }}
      >
        تعداد وظایف باقی‌مانده: {remainingTasks}
      </Text>
      <Row gutter={[4, 4]} justify="center">
        <Col xs={24} sm={8}>
          <Button
            type="default"
            block
            style={{
              backgroundColor: filter === "all" ? "#0000FF" : "transparent",
              color: filter === "all" ? "#FFFFFF" : "#000",
              borderColor: filter === "all" ? "#0000FF" : "#d9d9d9",
            }}
            onClick={() => setFilter("all")}
          >
            همه
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            type="default"
            block
            style={{
              backgroundColor:
                filter === "completed" ? "#059669" : "transparent",
              color: filter === "completed" ? "#FFFFFF" : "#000",
              borderColor: filter === "completed" ? "#00FF00" : "#d9d9d9",
            }}
            onClick={() => setFilter("completed")}
          >
            انجام‌شده
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            type="default"
            block
            style={{
              backgroundColor: filter === "pending" ? "#FF0000" : "transparent",
              color: filter === "pending" ? "#FFFFFF" : "#000",
              borderColor: filter === "pending" ? "#FF0000" : "#d9d9d9",
            }}
            onClick={() => setFilter("pending")}
          >
            انجام‌نشده
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterButtons;
