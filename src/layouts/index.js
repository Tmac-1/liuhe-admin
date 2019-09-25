import styles from './index.css';
import { Layout } from 'antd';
import MySider from '../components/sider';
import MyHeader from '../components/header';
import cookies from 'js-cookie'


function BasicLayout(props) {
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

export default BasicLayout;
