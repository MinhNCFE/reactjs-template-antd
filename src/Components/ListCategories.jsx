import React, { useEffect, useState } from "react";
import { Table, Switch, message } from "antd";
import axios from "axios";

function ListCategories() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err);
        message.error("Failed to load categories");
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Switch checked={status} disabled />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={categories}
      rowKey="id"
      bordered
    />
  );
}

export default ListCategories;
