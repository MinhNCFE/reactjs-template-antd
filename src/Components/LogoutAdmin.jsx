import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function LogoutAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    message.success("Logged out successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, [navigate]);

  return null;
}

export default LogoutAdmin;
