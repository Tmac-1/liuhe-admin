import React from 'react';
import styles from './index.less'
import { Upload,Icon,Modal } from 'antd';
import { connect } from 'dva';
import { uploadImg } from '../../utils/utils'
@connect(state=>({
    global:state.global
}))
class Other extends React.Component{
    state={
        previewVisible: false,
        previewImage: '',
        fileList: [
          {
            uid: '-1',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }
        ],
    }
    handlePreview = file => {
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
    }
    handleTest = () =>{
        const { dispatch } = this.props;
        dispatch({
            type:'global/test'
        })
    }
    handleRemove = (info)=>{
        const fileListCopy = [...this.state.fileList];
        fileListCopy.splice(fileListCopy.findIndex(item=>item.uid === info.uid),1)
        this.setState({
            fileList: fileListCopy
        });
    }
    handleCustomRequest = (info)=>{
        uploadImg(info).then(res=>{
            this.setState({
                fileList:this.state.fileList.concat({uid:res.name,url:`http://img.bjliuhe.net.cn/${res.name}`})
            })
        })
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
            <div className={styles.otherContainer}>
                <button onClick={this.handleTest}>test</button>
                <p>合作商家logo上传</p>
                <div>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        customRequest={this.handleCustomRequest}
                        accept="image/gif,image/jpeg,image/jpg,image/png"
                        onRemove={this.handleRemove}
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

























