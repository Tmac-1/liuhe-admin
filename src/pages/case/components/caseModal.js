import React from 'react'
import { Modal,Upload,Form,Input, Select,Icon,Button,message } from 'antd'
import  styles  from './caseModal.less';
import { connect } from 'dva';
import { uploadImg } from '../../../utils/utils'
const { TextArea } = Input;
const { Option } = Select;


@Form.create()
@connect(state=>({
    case:state.case
}))
class CaseModal extends React.Component{
    state = {
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
        fileList02: [ ],
      };
    handlePreview = file => {
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
    };
    handleCancelModal = ()=>{
        this.props.onCancle()
    }
     handleSubmit =  (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            if(this.state.fileList02.length == 0){
                message.error('案例首页背景图')
                return;
            }
            if(this.state.fileList.length == 0){
                message.error('请上传案例图片')
                return;
            }
            let params = {
                type:values.caseType,
                title:values.name,
                customerName:values.clientName,
                serviceContent:values.serviceItem,
                description:values.desc,
                colorMode:values.color,
                image:this.state.fileList.map(item=>item.url).join(','),
                coverImage:this.state.fileList02.map(item=>item.url).join(',')
            }
             dispatch({
                type:'case/addCase',
                paylaod:params
            }).then(()=>{
                this.props.onCancle()
                this.setState({
                    fileList:[],
                    fileList02:[]
                })
            })
          }
        });
    }
    handleCustomRequest = (key,info)=>{
        uploadImg(info).then(res=>{
            if(key==1){
                this.setState({
                    fileList:this.state.fileList.concat({uid:res.name,url:`http://img.bjliuhe.net.cn/${res.name}`})
                })
            }
            if(key==2){
                this.setState({
                    fileList02:this.state.fileList02.concat({uid:res.name,url:`http://img.bjliuhe.net.cn/${res.name}`})
                })
            }
        })
    }
    handleRemove = (key,info)=>{
        if(key == 1){
            const fileListCopy = [...this.state.fileList];
            fileListCopy.splice(fileListCopy.findIndex(item=>item.uid === info.uid),1)
            this.setState({
                fileList: fileListCopy
            });
        }else if( key ==  2 ){
            const fileListCopy = [...this.state.fileList02];
            fileListCopy.splice(fileListCopy.findIndex(item=>item.uid === info.uid),1)
            this.setState({
                fileList02: fileListCopy
            });
        }
    
    }
    componentDidMount(){
        // console.log('componentDidMount')
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { fileList,fileList02,previewVisible,previewImage } = this.state;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return(
            <Modal
              visible={this.props.visible}
              title="添加案例"
              footer={null}
              closable={false}
              destroyOnClose={true}
              wrapClassName={styles.caseModal}
            >
                <Form  onSubmit={this.handleSubmit}>
                     <Form.Item label="案例类别">
                        {getFieldDecorator('caseType', {
                            rules: [{
                                required: true,
                                message: '请选择案例类别',
                            },
                            ],
                        })(<Select placeholder="请选择案例类别" style={{width:200}}>
                              <Option value="1"> logo/VI设计 </Option>
                              <Option value="2"> 画册设计 </Option>
                              <Option value="3"> 包装设计 </Option>
                              <Option value="4"> 文化墙设计 </Option>
                              <Option value="5"> 线上与宣传 </Option>
                           </Select>)}
                    </Form.Item>
                    <Form.Item label="案例名称">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: '请输入案例名称',
                            },
                            ],
                        })(<Input maxLength={30} placeholder="请输入案例名称（最多30个字）" autoComplete="off"/>)}
                    </Form.Item>
                    <Form.Item label="客户名称">
                        {getFieldDecorator('clientName', {
                            rules: [{
                                required: true,
                                message: '请输入客户名称',
                            },
                            ],
                        })(<Input maxLength={20} placeholder="请输入客户名称（最多20个字）" autoComplete="off"/>)}
                    </Form.Item>
                    <Form.Item label="服务内容">
                        {getFieldDecorator('serviceItem', {
                            rules: [{
                                required: true,
                                message: '请输入服务内容',
                            },
                            ],
                        })(<Input maxLength={30} placeholder="请输入服务内容（最多30个字）" autoComplete="off"/>)}
                    </Form.Item>
                    <Form.Item label="简介">
                        {getFieldDecorator('desc', {
                            rules: [{
                                required: true,
                                message: '请输入简介',
                            },
                            ],
                        })(<TextArea maxLength={200} placeholder="请输入服务内容（最多200个字）" autoComplete="off" rows="6"/>)}
                    </Form.Item>
                    <Form.Item label="颜色模式">
                        {getFieldDecorator('color', {
                            rules: [{
                                required: true,
                                message: '选择颜色模式',
                            },
                            ],
                        })(<Select placeholder="请选择颜色模式" style={{width:200}}>
                              <Option value="1"> 灰白 </Option>
                              <Option value="2"> 黑白 </Option>
                          </Select>)}
                    </Form.Item>
                    <Form.Item label={<span> <span style={{color:"#f5222d",fontFamily:"SimSun"}}>*</span> 案例首页背景图</span>}>
                          <Upload
                            listType="picture-card"
                            fileList={fileList02}
                            onPreview={this.handlePreview}
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                            customRequest={this.handleCustomRequest.bind(this,2)}
                            onRemove={this.handleRemove.bind(this,2)}
                          >
                              {fileList.length >= 1 ? null : uploadButton}
                          </Upload>
                    </Form.Item>
                    <Form.Item label={<span> <span style={{color:"#f5222d",fontFamily:"SimSun"}}>*</span> 案例图片</span>}>
                          <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                            customRequest={this.handleCustomRequest.bind(this,1)}
                            onRemove={this.handleRemove.bind(this,1)}
                          >
                              {fileList.length >= 15 ? null : uploadButton}
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
                <Modal visible={previewVisible} footer={null} onCancel={()=>{this.setState({previewVisible:false})}}>
                   <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Modal>
        )
    }
}

export default CaseModal;












