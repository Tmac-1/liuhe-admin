import React from 'react';
import { Layout,Menu,Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;


class MySider extends React.Component{
    render(){
        return (
            <Sider>
            <Menu theme="dark" defaultSelectedKeys={['1']}  defaultOpenKeys={['1']} mode="inline">
              <SubMenu
                key="1"
                title={
                  <span>
                    <Icon type="desktop" />
                    <span>博文管理</span>
                  </span>
                }
              >
                <Menu.Item key="3">案例管理</Menu.Item>
                <Menu.Item key="4">文章管理</Menu.Item>
                <Menu.Item key="5">其他</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        )
    }
}

export default MySider;
