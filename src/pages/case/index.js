import React from 'react';
import styles from './index.less';
import { Button,Modal,Table } from 'antd';
import CaseModal from './components/caseModal'

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
  
class CaseManage extends React.Component{
    state={
      caseModalVisible:false
    }
    render(){
        const { caseModalVisible } = this.state;
        const columns = [
            {
              title: '案例名称',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: '客户名称',
              dataIndex: 'age',
              key: 'age',
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
            <div className={styles.caseContainer}>
                <CaseModal
                   visible={caseModalVisible}
                   onCancle={()=>{this.setState({caseModalVisible:false})}}
                /> 
                <Button 
                 onClick={()=>{this.setState({caseModalVisible:true})}}
                 type="primary">
                   添加案例
                </Button>
                <div style={{paddingTop:30}}>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}

export default CaseManage;


