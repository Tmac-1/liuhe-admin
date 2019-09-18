import React from 'react';
import { Modal,Upload,Form,Input, Select,Icon,Button  } from 'antd';
import styles from './articleModal.less'
const { Option } = Select


@Form.create()
class ArticleModal extends React.Component{
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
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const { fileList,previewVisible,previewImage } = this.state;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return(
          <Modal 
            visible={this.props.visible}
            title="添加文章"
            footer={null}
            closable={false}
            destroyOnClose={true}
            wrapClassName={styles.articleModal}
           >
             <Form>
               <Form.Item label="文章类别">
                   {getFieldDecorator('name', {
                       rules: [{
                           required: true,
                           message: '请选择文章类别',
                       },
                       ],
                   })(<Select placeholder="请选择文章类别" style={{width:200}}>
                          <Option value="1">六合动态</Option>
                          <Option value="2">最新咨询</Option>
                      </Select>)}
               </Form.Item>    
               <Form.Item label="标题">
                   {getFieldDecorator('name', {
                       rules: [{
                           required: true,
                           message: '请输入标题',
                       },
                       ],
                   })(<Input maxLength={30} placeholder="请输入标题（最多30个字）" autoComplete="off"/>)}
               </Form.Item>    
               <Form.Item label={<span> <span style={{color:"#f5222d",fontFamily:"SimSun"}}>*</span> 文章图片</span>}>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        accept="image/gif,image/jpeg,image/jpg,image/png"
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
               </Form.Item>
               <Form.Item style={{textAlign:'right'}}>
                    <Button 
                        onClick={()=>{this.props.onCancle()}}
                        style={{marginRight:15}}>
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
             </Form>   
             <Modal visible={previewVisible} footer={null}  onCancel={()=>{this.setState({previewVisible:false})}}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
             </Modal>
           </Modal>
        )
    }
}

export default ArticleModal;














