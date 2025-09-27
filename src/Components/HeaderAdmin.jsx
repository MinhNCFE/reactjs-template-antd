import React from 'react'
import { Layout, Menu} from "antd";
const { Header} = Layout;

function HeaderAdmin() {
  return (
    <>
    <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
    </>
  )
}

export default HeaderAdmin