import React from "react";
import { Button, Popconfirm, message } from "antd";
import axios from "axios";

function DeleteUser({ userId, fetchUsers, disabled }) {
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
      <Button danger disabled={disabled}>
        Delete
      </Button>
    </Popconfirm>
  );
}

export default DeleteUser;
