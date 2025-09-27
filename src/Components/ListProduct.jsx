import React, { useEffect, useState } from "react";
import { Table, Tag, Switch, Space, Button, message } from "antd";
import axios from "axios";

function ListProduct() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        message.error("Failed to load products");
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      render: (price) => <b>${price.toFixed(2)}</b>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (cat) => <Tag color="blue">{cat}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Switch checked={status} disabled />,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space>
          {/* <Button type="link">Edit</Button> */}
          <Button danger type="link">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      rowKey="id"
      bordered
      title={() => "Product List"}
    />
  );
}

export default ListProduct;
