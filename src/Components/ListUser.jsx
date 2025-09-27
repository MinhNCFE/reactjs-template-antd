import React, { useEffect, useState } from "react";
import { Button, Space, Switch, Table, Tag } from "antd";
import axios from "axios";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";

function ListUser() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    const token = localStorage.getItem("token"); // lấy token đã lưu khi login
    axios
      .get("http://localhost:8080/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => text || <i style={{ color: "gray" }}>N/A</i>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text || <i style={{ color: "gray" }}>N/A</i>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Switch checked={status} disabled />,
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => (
        <>
          {roles.map((role) => (
            <Tag color={role === "ROLE_ADMIN" ? "volcano" : "blue"} key={role}>
              {role.replace("ROLE_", "")}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Edit</a> */}
          <DeleteUser userId ={record.id} fetchUsers = {fetchUsers}/>
        </Space>
      ),
    },
  ];
  return (
    <>
      <AddUser fetchUsers = {fetchUsers}/>
      <Table columns={columns} dataSource={users} rowKey="id" />
    </>
  );
}

export default ListUser;
