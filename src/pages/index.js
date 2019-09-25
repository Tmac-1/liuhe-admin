import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less';
import logo from '../assets/logo.png';
import router from 'umi/router';
import cookies from 'js-cookie'

@Form.create()
class Login extends React.Component{
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(values.username == 'admin' && values.password == 'liuhe123456'){
          router.push('/case');
          cookies.set('liuhe-token','123456')
        }
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginContainer}>
         <div className={styles.header}> 
             <img src={logo} alt="logo"/>
             <span> 六合创意 </span>  
         </div>
         <div className={styles.formContainer}>
         <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" style={{width:"100%"}}>
            登录
        </Button>
        </Form.Item>
      </Form>
         </div>
      </div>
    )
  }
}

export default Login;

