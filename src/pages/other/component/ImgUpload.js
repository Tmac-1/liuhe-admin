import React from 'react'
import { Modal,Upload,Icon,Button,message } from 'antd'
import { uploadImg } from '../../../utils/utils'

class ImgUpload extends React.Component{
    state={
        fileList:[],
        previewImage:'',
        previewVisible:false
    }
    handlePreview = file => {
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
    }
    handleRemove = (info)=>{
        const fileListCopy = [...this.state.fileList];
        fileListCopy.splice(fileListCopy.findIndex(item=>item.uid === info.uid),1)
        this.setState({
            fileList: fileListCopy
        })
    }
    handleCustomRequest = (info)=>{
        uploadImg(info).then(res=>{
            this.setState({
                fileList:this.state.fileList.concat({uid:res.name,url:`http://img.bjliuhe.net.cn/${res.name}`})
            })
        })
    }
    handleClick = ()=>{
        if(this.state.fileList.length ==0){
           message.error('请上传图片')
           return;
        }
        this.props.onCofirm(this.state.fileList[0].url)
    }
    render(){
        const { fileList,previewVisible,previewImage } = this.state;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return(
            <Modal
               title={this.props.title}
               visible={this.props.visible}
               footer={null}
               closable={false}
            >
                { this.props.type == 2 ?
                  <p>（ 建议尺寸 2560 × 970 ）</p> :
                  <p>（ 建议尺寸 350 × 135 ）</p>
                }
               <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    customRequest={this.handleCustomRequest}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    onRemove={this.handleRemove}
                >
                     {fileList.length<1 && uploadButton}
                </Upload>
                <div style={{textAlign:'right',marginTop:15}}>
                    <Button onClick={this.props.close}>取消</Button>
                    <Button 
                    type="primary" 
                    style={{marginLeft:10}} onClick={this.handleClick}>确定</Button>
                </div>
                <Modal visible={previewVisible} footer={null}  onCancel={()=>{this.setState({previewVisible:false})}}>
                   <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Modal>
        )
    }
}

export default ImgUpload;


















