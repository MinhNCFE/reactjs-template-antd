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

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Manage", "sub1", <DesktopOutlined />, [
    getItem("User", "2"),
    getItem("Product", "3"),
  ]),
  getItem("Logout", "4", <LogoutOutlined />),
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <h2>Home page</h2>;
      case "2":
        return <ListUser />;
      case "3":
        return <ListProduct />;
      default:
        return <h2>Chọn menu</h2>;
    }
  };

  if(selectedKey === "4") return <LogoutAdmin />;
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
