import React from 'react';
import styles from './index.css';
import { Layout } from 'antd';
import MySider from '../components/sider';
import MyHeader from '../components/header';
import cookies from 'js-cookie';
import router from 'umi/router';

class BasicLayout extends React.Component{
  componentDidMount(){
    // console.log(1111)
    if(!cookies.get('liuhe-token')){
      router.push('/index')
    }
  }
  render(){
    const { props } = this;
    return (
      <div className={styles.normal}>
        {
          cookies.get('liuhe-token') ? 
          <Layout style={{ minHeight: '100vh' }}>
            <MySider props={props}/>
            <Layout>
              <MyHeader/>
              {props.children}
            </Layout>
         </Layout> : 
          <> {props.children} </>  
        }
      </div>
    );
  }
}

export default BasicLayout;
