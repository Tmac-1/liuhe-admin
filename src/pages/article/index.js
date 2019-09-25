import React from 'react';
import styles from './index.less';
import { Button,Table,Tabs} from 'antd';
import ArticleModal from './components/articleModal';
import { connect } from 'dva';
import moment from 'moment'
const { TabPane } = Tabs;


@connect(state=>({
  article:state.article,
  loading:state.loading
}))
class ArticleManage extends React.Component{
    state = {
      articleModalVisible:false,
      current:1,
      type:'add',
      articleId:''
    }
    handleTabChange = (key)=>{
      console.log(key)
    }
    handlePageChange = (current)=>{
      this.setState({
        current
      },()=>{
        this.loadData()
      })
    }
    handleCallback= ()=>{
      this.setState({
        current:1
      },()=>{
        this.loadData()
      })
    }
    handleEditNews = (id)=>{
      const { dispatch } = this.props;
      dispatch({
        type:"article/getNewsDeatil",
        payload:{
          id
        }
      }).then(()=>{
        this.setState({
          type:'edit',
          articleModalVisible:true,
          articleId:id
        })
      })
    }
    loadData = ()=>{
      const { current } = this.state;
      const { dispatch } = this.props;
      dispatch({
        type:'article/getNewsList',
        payload:{
          page:~~current-1
        }
      })
    }
    componentDidMount(){
      this.loadData()
    }
    render(){
        const columns = [
            {
              title: '文章标题',
              dataIndex: 'title',
              key: 'title',
              render:(text,record) => <span style={{color:'#1890ff'}}>{record.title}</span>,
            },
            {
              title: '文章类别',
              dataIndex: 'type',
              key: 'type',
              render: type => <span>{type == 1 ? '六合动态' : '最新咨询'}</span>,
            },
            {
              title: '上传时间',
              dataIndex: 'modifyTime',
              key: 'modifyTime',
              render:modifyTime =><span>{moment(modifyTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                   <Button type="primary" style={{marginRight:10}} onClick={this.handleEditNews.bind(this,record.id)}>编辑</Button>
                   <Button type="danger">删除</Button>
                </span>
              ),
            },
         ];
         const { articleModalVisible,current,type,articleId } = this.state;
         const { newsList } = this.props.article;
         const { loading } = this.props;
        return(
            <div className={styles.articleContainer}>
            {
              articleModalVisible && 
              <ArticleModal  
                id={articleId}
                visible={articleModalVisible}
                onCancle={()=>{this.setState({articleModalVisible:false})}}
                callback={this.handleCallback}
                type={type}
              />
            }
                <Button 
                onClick={()=>{this.setState({articleModalVisible:true})}}
                type="primary" 
                >添加文章</Button>
                <div style={{marginTop:15}}>
                   <Table 
                   rowKey="id"
                   columns={columns} 
                   dataSource={newsList.record} 
                   loading={loading.effects['article/getNewsList']} 
                   pagination={{
                     total: newsList.totalPage, //数据总数量
                     defaultPageSize: 10, //默认显示几条一页
                     showSizeChanger: false,  //是否显示可以设置几条一页的选项
                     onChange:this.handlePageChange,
                     current:current,
                     showTotal: function () {  //设置显示一共几条数据
                         return '共 ' + newsList.totalPage + ' 条数据';
                     }
                 }}
                   />
                </div>
                  {/* <Tabs defaultActiveKey="1" onChange={this.handleTabChange} style={{paddingTop:15}}>
                    <TabPane tab="六合动态" key="1">
                        <Table columns={columns} dataSource={data} />
                    </TabPane>
                    <TabPane tab="最新咨询" key="2">
                        <Table columns={columns} dataSource={data} />
                    </TabPane>
                 </Tabs> */}
            </div>
        )
    }
}

export default ArticleManage;


















