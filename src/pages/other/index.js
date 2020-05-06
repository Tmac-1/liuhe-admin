import React from 'react';
import styles from './index.less'
import { Upload,Icon,Modal,message,Table,Button } from 'antd';
import { connect } from 'dva';
import { uploadImg } from '../../utils/utils';
import ImgUpload from './component/ImgUpload';
import moment from 'moment'

@connect(state=>({
    global:state.global,
    other:state.other
}))
class Other extends React.Component{
    state={
        previewVisible: false,
        previewImage: '',
        modalVisible:false,
        title:'合作商家',
        type:1, // 1 合作商家 2 banner图
    }
    handleConfirm = (url)=>{
        const { type } = this.state;
        const { dispatch } = this.props
        dispatch({
            type:'other/addImg',
            payload:{
                type:type == 1 ? 2 : 1,
                imgUrl:url
            }
        }).then(()=>{
            message.success('添加成功~');
            if(type == 1){
                dispatch({
                    type:'other/getImg',
                    payload:{
                        type:2
                    }
                })
            }else{
                dispatch({
                    type:'other/getImg02',
                    payload:{
                        type:1
                    }
                })
            }
            this.setState({
                modalVisible:false
            })
        })
    }
    handleDelete = (id)=>{
        const { dispatch } = this.props;
        const { type } = this.state;
        dispatch({
            type:'other/deleteImg',
            payload:{
                id
            }
        }).then(()=>{
            dispatch({
                type:'other/getImg',
                payload:{
                    type:2
                }
            })
            dispatch({
                type:'other/getImg02',
                payload:{
                    type:1
                }
            })
        })
    }
    handlePreview = url => {
        this.setState({
          previewImage: url ,
          previewVisible: true,
        });
    }

    handleCustomRequest = (key,info)=>{
        const { dispatch } = this.props;
        if(key == 1){
            uploadImg(info).then(res=>{
                this.setState({
                    fileList:this.state.fileList.concat({uid:res.name,url:`https://6liuhe.oss-cn-beijing.aliyuncs.com/${res.name}`})
                },()=>{
                    dispatch({
                        type:'other/addImg',
                        payload:{
                            type:2,
                            imgUrl:this.state.fileList.map(item=>item.url).join(',')
                        }
                    }).then(()=>{
                        message.success('添加成功~')
                    })
                })
            })
        }
        if(key == 2){
            uploadImg(info).then(res=>{
                this.setState({
                    fileList02:this.state.fileList02.concat({uid:res.name,url:`https://6liuhe.oss-cn-beijing.aliyuncs.com/${res.name}`})
                },()=>{
                    dispatch({
                        type:'other/addImg02',
                        payload:{
                            type:1,
                            imgUrl:this.state.fileList02.map(item=>item.url).join(',')
                        }
                    }).then(()=>{
                        message.success('添加成功~')
                    })
                })
            })
        }
    }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type:'other/getImg',
            payload:{
                type:2
            }
        })
        dispatch({
            type:'other/getImg02',
            payload:{
                type:1
            }
        })
    }
    render(){
        const { previewVisible,previewImage,modalVisible,title,type } = this.state;
        const { dispatch } = this.props;
        const { imgs,imgs02 } = this.props.other;
        const columns = [
            {
              title: '图片缩略图',
              dataIndex: 'title',
              key: 'title',
              render:(text,record) => <img 
              onClick={this.handlePreview.bind(this,record.imgUrl)}
              src={record.imgUrl} 
              style={{color:'#1890ff',width:40,cursor:'pointer'}}></img>,
            },
            {
              title: '类别',
              dataIndex: 'modifyTime',
              key: 'modifyTime',
              render:modifyTime =><span> {"合作商家logo"}  </span>
            },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                   <Button type="danger" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
                </span>
              ),
            },
         ];
         const columns02 = [
            {
              title: '图片缩略图',
              dataIndex: 'title',
              key: 'title',
              render:(text,record) => <img 
              onClick={this.handlePreview.bind(this,record.imgUrl)}
              src={record.imgUrl} 
              style={{color:'#1890ff',width:40,cursor:'pointer'}}></img>,
            },
            {
              title: '类别',
              dataIndex: 'modifyTime',
              key: 'modifyTime',
              render:modifyTime =><span> {"banner图"}  </span>
            },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                   <Button type="danger" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
                </span>
              ),
            },
         ];
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return(
            <div className={styles.otherContainer}>
                {
                    modalVisible && 
                    <ImgUpload
                        visible={modalVisible}
                        title={title}
                        dispatch={dispatch}
                        onCofirm={this.handleConfirm}
                        type={type}
                        close={()=>{this.setState({modalVisible:false})}}
                    />
                }
                <p><Button type="primary" onClick={()=>{
                    this.setState({
                        type:1,
                        modalVisible:true,
                        title:'合作商家'
                    })
                }}> 上传合作商家 </Button> </p>
                <Table
                  columns={columns}
                  rowKey="id"
                  dataSource={imgs.record}
                  pagination={false}
                />
               <p style={{marginTop:20}}><Button type="primary" onClick={()=>{
                    this.setState({
                        type:2,
                        modalVisible:true,
                        title:'banner图'
                    })
                }}> 上传banner图 </Button> （建议尺寸 2560 × 970 ） </p>
                <div>
                <Table
                  columns={columns02}
                  rowKey="id"
                  dataSource={imgs02.record}
                  pagination={false}
                />
                </div>
                <Modal visible={previewVisible} footer={null}  onCancel={()=>{this.setState({previewVisible:false})}}>
                   <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

export default Other;

























