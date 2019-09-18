import React from 'react'
import { Modal,Upload,Form,Input, Select,Icon,Button } from 'antd'
import  styles  from './caseModal.less';
const { TextArea } = Input;
const { Option } = Select;

@Form.create()
class CaseModal extends React.Component{
    state = {
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
    componentDidMount(){
        console.log('componentDidMount')
    }
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
              title="添加案例"
              footer={null}
              closable={false}
              destroyOnClose={true}
              wrapClassName={styles.caseModal}
            >
                <Form>
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
                    <Form.Item label={<span> <span style={{color:"#f5222d",fontFamily:"SimSun"}}>*</span> 案例图片</span>}>
                          <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            accept="image/gif,image/jpeg,image/jpg,image/png"
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












