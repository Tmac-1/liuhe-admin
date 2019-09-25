import React from 'react';
import { Modal,Upload,Form,Input, Select,Icon,Button,message  } from 'antd';
import styles from './articleModal.less'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadImg } from '../../../utils/utils';
import { connect } from 'dva'
const upload = require('../../../utils/upload.js');
const { Option } = Select;
const { TextArea } = Input;



@Form.create()
@connect(state=>({
    article:state.article
}))
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
        articleData:'<p>欢迎编辑文章!</p>'
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
            if(!err){
                const { dispatch,type,id } = this.props;
                if(this.state.fileList.length ==0){
                    message.error('请上传文章封面图');
                    return;
                }
                let params = {
                    type:values.type,
                    title:values.name,
                    summary:values.abstract,
                    coverImgUrl:this.state.fileList[0].url,
                    content:this.state.articleData
                }
                if(type == 'edit'){
                    dispatch({
                        type:'article/editNewsDeatil',
                        payload:{
                            ...params,
                            id:id
                        }
                    }).then(()=>{
                        this.props.onCancle();
                        this.props.callback()
                        this.setState({
                            fileList:[],
                            articleData:'<p>欢迎编辑文章!</p>'
                        })
                    })
                }else{
                    dispatch({
                        type:'article/addNews',
                        payload:{
                            ...params
                        }
                    }).then(()=>{
                        this.props.onCancle();
                        this.props.callback()
                        this.setState({
                            fileList:[],
                            articleData:'<p>欢迎编辑文章!</p>'
                        })
                    })
                }

            }

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
    componentDidMount(){
        const { type } = this.props;
        const { newsDetail } = this.props.article;
        console.log('newsDetail',newsDetail)
        if(type == 'edit'){
            this.props.form.setFieldsValue({
                type:newsDetail.type + '',
                name:newsDetail.title,
                abstract:newsDetail.summary
            })
            if(newsDetail.coverImgUrl){
                this.setState({
                    fileList:newsDetail.coverImgUrl.split(',').map((item,index)=>{
                        let obj={};
                        obj.url=item;
                        obj.uid=index;
                        return obj;
                    })
                })
            }
            if(newsDetail.content){
                this.setState({
                    articleData:newsDetail.content
                })
            }
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { fileList,previewVisible,previewImage,articleData } = this.state;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return(
          <Modal 
            visible={this.props.visible}
            title={this.props.type == 'add' ? "添加文章" : "修改文章"}
            footer={null}
            closable={false}
            destroyOnClose={true}
            wrapClassName={styles.articleModal}
            width={1000}
           >
             <Form onSubmit={this.handleSubmit}>
               <Form.Item label="文章类别">
                   {getFieldDecorator('type', {
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
               <Form.Item label="摘要">
                   {getFieldDecorator('abstract', {
                       rules: [{
                           required: true,
                           message: '请输入摘要',
                       },
                       ],
                   })(<TextArea rows={3} maxLength={100} placeholder="请输入标题（最多100个字）" autoComplete="off"/>)}
               </Form.Item>     
               <Form.Item label={<span> <span style={{color:"#f5222d",fontFamily:"SimSun"}}>*</span> 文章封面图片</span>}>
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
                        data={articleData}
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
                        // ckfinder={{
                        //     uploadUrl: "http://6liuhe.oss-cn-beijing.aliyuncs.com"
                        // }}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            // console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            // console.log( 'Blur.', editor,editor.getData() );
                            this.setState({
                                articleData:editor.getData()
                            })
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














