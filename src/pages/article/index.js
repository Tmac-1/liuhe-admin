import React from 'react';
import styles from './index.less';
import { Button,Modal,Table } from 'antd';

const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  
class ArticleManage extends React.Component{
    render(){
        const columns = [
            {
              title: '文章名',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: '上传时间',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                   <Button type="primary" style={{marginRight:10}}>编辑</Button>
                   <Button type="danger">删除</Button>
                </span>
              ),
            },
         ];
        return(
            <div className={styles.articleContainer}>
                <Button type="primary">添加文章</Button>
                <div style={{paddingTop:30}}>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}

export default ArticleManage;


















