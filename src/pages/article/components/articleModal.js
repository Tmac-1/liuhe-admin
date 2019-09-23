import React from 'react';
import { Modal,Upload,Form,Input, Select,Icon,Button  } from 'antd';
import styles from './articleModal.less'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadImg } from '../../../utils/utils'
const upload = require('../../../utils/upload.js');

const { Option } = Select;



@Form.create()
class ArticleModal extends React.Component{
    state={
        previewVisible: false,
        previewImage: '',
        fileList: [
        //   {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   }
        ],
    }
    handleCustomRequest = (info)=>{
        uploadImg(info).then(res=>{
            this.setState({
                fileList:this.state.fileList.concat({uid:res.name,url:`http://img.bjliuhe.net.cn/${res.name}`})
            })
        })
    }
    handleSubmit =  (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

        })
    }
    handleRemove = (info)=>{
        const fileListCopy = [...this.state.fileList];
        fileListCopy.splice(fileListCopy.findIndex(item=>item.uid === info.uid),1)
        this.setState({
            fileList: fileListCopy
        });
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
            width={1000}
           >
             <Form onSubmit={this.handleSubmit}>
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
                        customRequest={this.handleCustomRequest}
                        onRemove={this.handleRemove}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
               </Form.Item>
               <Form.Item style={{marginBottom:15}}>
                <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
                        config={{
                            heading: {
                                options: [
                                    { model: 'paragraph', title: 'p', class: 'ck-heading_paragraph' },
                                    { model: 'heading1', view: 'h1', title: 'h1', class: 'ck-heading_heading1' },
                                    { model: 'heading2', view: 'h2', title: 'h2', class: 'ck-heading_heading2' },
                                    { model: 'heading3', view: 'h3', title: 'h3', class: 'ck-heading_heading3' },
                                    { model: 'heading4', view: 'h4', title: 'h4', class: 'ck-heading_heading4' },
                                    { model: 'heading5', view: 'h5', title: 'h5', class: 'ck-heading_heading5' }
                                ]
                            },
                            language: 'zh-cn',
                            extraPlugins: [ upload.MyCustomUploadAdapterPlugin ],
                        }}
                        ckfinder={{
                            uploadUrl: "http://6liuhe.oss-cn-beijing.aliyuncs.com"
                        }}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor,editor.getData() );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
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














