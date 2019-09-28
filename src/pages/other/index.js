import React from 'react';
import styles from './index.less'
import { Upload,Icon,Modal,message } from 'antd';
import { connect } from 'dva';
import { uploadImg } from '../../utils/utils'
@connect(state=>({
    global:state.global,
    other:state.other
}))
class Other extends React.Component{
    state={
        previewVisible: false,
        previewImage: '',
        fileList: [ // 合作商家logo
        //   {
        //     uid: '-1',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   }
        ],
        fileList02:[]
    }
    handlePreview = file => {
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
    }
    handleRemove = (key,info)=>{
        const { dispatch } = this.props;
        if(key == 1){
            const fileListCopy = [...this.state.fileList];
            fileListCopy.splice(fileListCopy.findIndex(item=>item.uid === info.uid),1)
            this.setState({
                fileList: fileListCopy
            },()=>{
                dispatch({
                    type:'other/addImg',
                    payload:{
                        type:2,
                        imgUrl:this.state.fileList.map(item=>item.url).join(',')
                    }
                }).then(()=>{
                    message.success('删除成功~')
                })
            });
        }
  
    }
    handleCustomRequest = (key,info)=>{
        const { dispatch } = this.props;
        if(key == 1){
            uploadImg(info).then(res=>{
                this.setState({
                    fileList:this.state.fileList.concat({uid:res.name,url:`http://img.bjliuhe.net.cn/${res.name}`})
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
                    fileList02:this.state.fileList02.concat({uid:res.name,url:`http://img.bjliuhe.net.cn/${res.name}`})
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
        }).then(()=>{
            const { imgs } = this.props.other;
            this.setState({
                fileList:imgs.record.map((item,index)=>{
                    const obj = {}
                    obj.url = item.imgUrl
                    obj.uid = index;
                    return obj
                })
            })
        })
        dispatch({
            type:'other/getImg02',
            payload:{
                type:1
            }
        }).then(()=>{
            const { imgs02 } = this.props.other;
            this.setState({
                fileList02:imgs02.record.map((item,index)=>{
                    const obj = {}
                    obj.url = item.imgUrl
                    obj.uid = index;
                    return obj
                })
            })
        })
    }
    render(){
        const { fileList,fileList02,previewVisible,previewImage } = this.state;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return(
            <div className={styles.otherContainer}>
                <p>合作商家logo上传</p>
                <div>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        customRequest={this.handleCustomRequest.bind(this,1)}
                        accept="image/gif,image/jpeg,image/jpg,image/png"
                        onRemove={this.handleRemove.bind(this,1)}
                    >
                        {uploadButton}
                    </Upload>
                </div>
                <p>首页banner图上传（建议尺寸 2560 × 970 ）</p>
                <div>
                    <Upload
                        listType="picture-card"
                        fileList={fileList02}
                        onPreview={this.handlePreview}
                        customRequest={this.handleCustomRequest.bind(this,2)}
                        accept="image/gif,image/jpeg,image/jpg,image/png"
                        onRemove={this.handleRemove.bind(this,2)}
                    >
                        {uploadButton}
                    </Upload>
                </div>
                <Modal visible={previewVisible} footer={null}  onCancel={()=>{this.setState({previewVisible:false})}}>
                   <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

export default Other;

























