import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

function AddUser({ fetchUsers }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields()
    setOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);

        // Lấy token từ localStorage (sau khi login)
        const token = localStorage.getItem("token");

        axios
          .post("http://localhost:8080/api/admin/users", values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Tạo user thành công!");
            setOpen(false);
            form.resetFields();

            // Gọi lại list user bên ngoài
            if (fetchUsers) fetchUsers();
          })
          .catch((err) => {
            console.error(err);
            message.error("Tạo user thất bại!");
          })
          .finally(() => {
            setConfirmLoading(false);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" className="mb-2" onClick={showModal}>
        Create User
      </Button>
      <Modal
        title="Create New User"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Invalid email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password autoComplete="new-password"/>
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select placeholder="Select role">
              <Option value="ROLE_USER">User</Option>
              <Option value="ROLE_MANAGER">Manager</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddUser;
