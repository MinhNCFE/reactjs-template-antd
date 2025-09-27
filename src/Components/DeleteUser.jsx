import React from "react";
import { Popconfirm, message } from "antd";
import axios from "axios";

function DeleteUser({ userId, fetchUsers}) {
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        message.success("User deleted successfully");
        fetchUsers(); // callback để refresh danh sách
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to delete user");
      });
  };

  return (
    <Popconfirm
      title="Are you sure to delete this user?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <a style={{ color: "red" }}>Delete</a>
    </Popconfirm>
  );
}

export default DeleteUser;
