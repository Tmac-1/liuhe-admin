import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import cookies from 'js-cookie';
import  router from 'umi/router'

class MyHeader extends React.Component{
    exit = ()=>{
        cookies.remove("liuhe-token")
        router.push('/')
    }
    render(){
        const menu = (
            <Menu>
              <Menu.Item onClick={this.exit}>
                 退出登录  
              </Menu.Item>
            </Menu>
        );
        return(
            <div style={{textAlign:'right',height:52,background:'#001529'}}>
                <Dropdown overlay={menu}>
                <a  href="#" style={{color:'#fff',paddingTop:15,paddingRight:30,display:'inline-block'}}>
                  已登录<Icon type="down" style={{paddingLeft:4}}/>
                </a>
               </Dropdown>
            </div>
        )
    }
}

export default MyHeader;
