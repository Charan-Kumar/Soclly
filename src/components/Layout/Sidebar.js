import React from 'react'
import {  Menu, Layout } from 'antd';
import{ HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useEthers } from '@usedapp/core'

export default function Sidebar() {
  const { Sider } = Layout;
  const {  deactivate } = useEthers();
  const logOut = () => {
    deactivate()
  }

  return (
    <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => logOut()}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
