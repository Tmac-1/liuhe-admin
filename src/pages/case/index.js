import React from 'react';
import styles from './index.less';
import { Button,Table } from 'antd';
import CaseModal from './components/caseModal';
import { connect } from 'dva';
import moment from 'moment';
  
@connect(state=>({
  case:state.case,
  loading:state.loading
}))
class CaseManage extends React.Component{
    state={
      testcount:0,
      caseModalVisible:false,
      caseId:'',
      type:'add',
      current:1
    }
    getCaseList = (page=0)=>{
      const { dispatch } = this.props;
      dispatch({
        type:'case/getCaseList',
        paylaod:{
          page
        }
      })
    }
    editCase = (id)=>{
        const { dispatch } = this.props;
        dispatch({
           type:'case/getCaseDetail',
           paylaod:{
             id
           }
        }).then(()=>{
          this.setState({
            type:'edit',
            caseModalVisible:true,
            caseId:id
          })
        })
    }
    deleteCase = (id)=>{
      const { dispatch } = this.props;
      dispatch({
        type:'case/deleteCase',
        payload:{
          id
        }
      })
    }
    handleCallback=()=>{
      if(this.state.type == 'edit'){
          this.getCaseList(this.state.current-1)
      }else{
        this.setState({
          current:1
        },()=>{
         this.handlePageChange(this.state.current)
        })
      }

    }
    handlePageChange =(current)=>{
      this.setState({
        current
      })
      this.getCaseList(current-1)
    }
    componentDidMount(){
      this.getCaseList()
      this.setState((prevState)=>{
        console.log('----->',prevState.testcount)
        return {
          testcount:prevState.testcount+1
        }
      })
      this.setState((prevState)=>{
        console.log('----->',prevState.testcount)
        return {
          testcount:prevState.testcount+1
        }
      })
      // this.setState({
      //     testcount:this.state.testcount + 1
      // })
      // this.setState({
      //     testcount:this.state.testcount + 1
      // })
    }
    handleTest = ()=>{
      console.log(this.state.testcount)
      this.setState((prevState)=>({
          testcount:prevState.testcount+1
      }))
   }
    render(){
        const { caseModalVisible,type,caseId,current } = this.state;
        const { caseList } = this.props.case;
        const { loading } = this.props;
        // console.log('caseList',caseList)
        const columns = [
            {
              title: '案例名称',
              dataIndex: 'title',
              key: 'title',
              render: (text,record) => <span style={{color:'#1890ff'}}>{record.title}</span>,
            },
            {
              title: '案例分类',
              dataIndex: 'type',
              key: 'type',
              render: (text,record) => <span>{record.type == 1 ? 'logo/VI设计' : record.type == 2 ? '画册设计' : 
               record.type == 3 ? '包装设计' : record.typ  == 4 ? '文化墙设计' : '线上与宣传'
              }</span>,
            },
            {
              title: '客户名称',
              dataIndex: 'customerName',
              key: 'customerName',
              render: (text,record) => <span>{record.customerName}</span>,
            },
            {
              title: '更新时间',
              dataIndex: 'modifyTime',
              key: 'modifyTime',
              render: (text,record) => <span>{moment(record.modifyTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                   <Button type="primary" style={{marginRight:10}} onClick={this.editCase.bind(this,record.id)}>编辑</Button>
                   <Button type="danger" onClick={this.deleteCase.bind(this,record.id)}>删除</Button>
                </span>
              ),
            },
         ];
        return(
            <div className={styles.caseContainer}>
                <Button onClick={this.handleTest}>点击</Button>
            {
              caseModalVisible && 
              <CaseModal
                caseId={caseId}
                type={type}
                visible={caseModalVisible}
                onCancle={()=>{this.setState({caseModalVisible:false})}}
                callback={this.handleCallback}
              /> 
            }
                <Button 
                 onClick={()=>{this.setState({caseModalVisible:true,type:'add'})}}
                 type="primary">
                   添加案例
                </Button>
                <div style={{paddingTop:30}}>
                    <Table 
                    rowKey="id"
                    columns={columns} 
                    dataSource={caseList.record}
                    loading={loading.effects['case/getCaseList']} 
                    pagination={{
                      total: caseList.totalPage, //数据总数量
                      defaultPageSize: 10, //默认显示几条一页
                      showSizeChanger: false,  //是否显示可以设置几条一页的选项
                      onChange:this.handlePageChange,
                      current:current,
                      showTotal: function () {  //设置显示一共几条数据
                          return '共 ' + caseList.totalPage + ' 条数据';
                      }
                  }}
                    />
                </div>
            </div>
        )
    }
}

export default CaseManage;


