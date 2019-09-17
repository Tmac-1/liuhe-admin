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
    state={
      defaultSelectedKeys:1
    }
    handleMeunClick = (key)=>{
      // console.log(key)
      this.setState({
        defaultSelectedKeys:key.key
      })
    }
    componentDidMount(){
      const location  = this.props.location;
      console.log('location',location)
      let key = 2;
      switch(location.pathname){
         case '/case':
           key = 1;
           break;
         case '/article':
           key = 2;
           break;
         default :
           key =1;
           break;
      }
      console.log('key',key)
      this.setState({
          defaultSelectedKeys:key
      })
      
    }
    render(){
        const { defaultSelectedKeys } = this.state
        return (
            <Sider>
            <Menu theme="dark" 
                  onClick={this.handleMeunClick}
                  defaultSelectedKeys={['1']} 
                  selectedKeys={[String(defaultSelectedKeys)]}  
                  defaultOpenKeys={['1']} mode="inline">
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
                <Menu.Item key="2"> <Link to="/article">文章管理</Link></Menu.Item>
                <Menu.Item key="3">其他</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        )
    }
}

export default MySider;
