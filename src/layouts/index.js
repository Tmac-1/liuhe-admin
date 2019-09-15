import styles from './index.css';
import { Layout } from 'antd';
import MySider from '../components/sider';

const { Header } = Layout;

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <Layout style={{ minHeight: '100vh' }}>
          <MySider/>
          <Layout>
              <Header>
                12312
              </Header>
          </Layout>
      </Layout>
      {/* <h1 className={styles.title}>Yay! Welcome to umi!</h1> */}
      {/* {props.children} */}
    </div>
  );
}

export default BasicLayout;
