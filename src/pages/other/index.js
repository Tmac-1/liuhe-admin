import React from 'react';
import styles from './index.less'
import { Upload,Icon,Modal } from 'antd';
import { connect } from 'dva';


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
            name: 'image.png',
            status: 'done',
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
        console.log(111)
        dispatch({
            type:'global/test'
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
                        accept="image/gif,image/jpeg,image/jpg,image/png"
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

























