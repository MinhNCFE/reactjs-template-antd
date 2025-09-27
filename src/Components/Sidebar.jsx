import {
  DesktopOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import ListUser from "./ListUser";
import ListProduct from "./ListProduct";
import LoginAdmin from "./LoginAdmin";
import ListCategories from "./ListCategories";

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const isAdmin = roles.includes("ROLE_ADMIN");
  const isManager = roles.includes("ROLE_MANAGER");

  const items = [
    getItem("Home", "1", <HomeOutlined />),
    ...(isAdmin
      ? [
          getItem("Manage", "sub1", <DesktopOutlined />, [
            getItem("User", "2"),
            getItem("Product", "3"),
            getItem("Categories", "4"),
          ]),
        ]
      : []),
    ...(isManager
      ? [
          getItem("Manage", "sub1", <DesktopOutlined />, [
            getItem("Categories", "4"),
          ]),
        ]
      : []),
    getItem("Logout", "5", <LogoutOutlined />),
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <h2>Home page</h2>;
      case "2":
        return <ListUser />;
      case "3":
        return <ListProduct />;
      case "4":
        return <ListCategories />;
      default:
        return <h2>Chọn menu</h2>;
    }
  };

  if (selectedKey === "5") return <LogoutAdmin />;
  return (
    <>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={({ key }) => setSelectedKey(key)}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
            style={{ margin: "16px 0" }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "colorBgContainer",
              borderRadius: "borderRadiusLG",
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Sidebar;
