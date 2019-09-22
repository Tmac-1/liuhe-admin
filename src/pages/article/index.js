import React from 'react';
import styles from './index.less';
import { Button,Table,Tabs} from 'antd';
import ArticleModal from './components/articleModal';
const { TabPane } = Tabs;

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
    state = {
      articleModalVisible:false
    }
    handleTabChange = (key)=>{
      console.log(key)
    }
    render(){
        const columns = [
            {
              title: '文章标题',
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
         const { articleModalVisible } = this.state
        return(
            <div className={styles.articleContainer}>
            {
              articleModalVisible && 
              <ArticleModal  
                visible={articleModalVisible}
                onCancle={()=>{this.setState({articleModalVisible:false})}}
              />
            }

                <Button 
                onClick={()=>{this.setState({articleModalVisible:true})}}
                type="primary" 
                >添加文章</Button>
                  <Tabs defaultActiveKey="1" onChange={this.handleTabChange} style={{paddingTop:15}}>
                    <TabPane tab="六合动态" key="1">
                        <Table columns={columns} dataSource={data} />
                    </TabPane>
                    <TabPane tab="最新咨询" key="2">
                        <Table columns={columns} dataSource={data} />
                    </TabPane>
                 </Tabs>
            </div>
        )
    }
}

export default ArticleManage;


















