import React from 'react';
import { Layout,Menu,Icon } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
const { Sider } = Layout;
const { SubMenu } = Menu;

@connect(state=>({
  location:state.router.location
}))
class MySider extends React.Component{
    componentDidMount(){
      const location  = this.props.location;
      console.log('location',location)
    }
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
                <Menu.Item key="1"> <Link to="/case">案例管理</Link> </Menu.Item>
                <Menu.Item key="2">文章管理</Menu.Item>
                <Menu.Item key="3">其他</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        )
    }
}

export default MySider;
