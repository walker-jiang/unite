import React, {Component} from 'react';
import { Form,Collapse,Input,Modal,Button,Select  } from 'antd';
import "./style.less"
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;

import Ajax from 'commonFunc/ajaxGetResource';
class SystemVersion extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        checked:true
      };
  }
  componentDidMount(){
    if(this.props.vername.split('ZYG')[1] == this.props.cusVerson){
      var btnverson = document.getElementById('btnverson');
      btnverson.style.cssText='disabled:true';
    };
    // console.log('windowwwwww',window.sessionStorage,window.localStorage);
    this.props.form.setFieldsValue({
      "vername":this.props.vername,//服务器端版本号
      "localverName":this.props.cusVerson,//本地客户端版本号
    })
  }
  //弹框
  showConfirm=(confirm) => {
    confirm
  }
  handleSubmit=(e,values)=>{
    e.stopPropagation;
    e.preventDefault;
    //检测当前版本跟本地客户端版本 是否一致
    console.log('split(3)',this.props.vername.split('ZYG'));
    if(this.props.cusVerson !== ''){
      if(this.props.vername.split('ZYG')[1] !== this.props.cusVerson){
        //彈框
        confirm({
          title: '您想要更新系统版本吗',
          cancelText:'取消',
          okText:'确定',
          onOk() {
            window.updateClient();//更新版本
          },
          onCancel() {},
        });
        this.showConfirm(confirm)
      }
    }else{
      confirm({
        title: '获取版本失败',
        okText:'确定',
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        }
      });
      this.showConfirm(confirm)
    }
  }
  isModify=()=>{
    this.setState({checked:false})
  }
  render() {
          const { getFieldDecorator } = this.props.form;
          const formItemLayout = {
           labelCol: {
             xs: { span: 24 },
             sm: { span: 12 },
           },
           wrapperCol: {
             xs: { span: 24 },
             sm: { span: 12 },
           },
         };
    return (
      <div className="PersonalInformationSettings">
         <Form className="login-form">
            <div style={{overflow:"hidden"}}>
                 <div style={{width:"55%",float:"left",paddingRight:"2%"}}>
                    <FormItem
                    {...formItemLayout}
                      label="服务器端版本号 ："
                    >
                       {getFieldDecorator('vername' , {
                         rules: [{ required: false, message: 'Please input your username!' }],
                       })(
                         <Input disabled={this.state.checked}  placeholder='版本号未获取'/>
                       )}
                     </FormItem>
                     <FormItem
                     {...formItemLayout}
                       label="本地客户端版本 ："
                     >
                        {getFieldDecorator('localverName', {
                          rules: [{ required: false, message: 'Please input your username!' }],
                        })(
                          <Input disabled={this.state.checked}  placeholder="版本号未获取" />
                        )}
                        <Button
                          id='btnverson'
                          onClick={this.handleSubmit} style={{position:"absolute",left:"101%",marginTop:"5px",marginLeft:"5px",height:"32px",borderRadius:"16px",background:"#0A6ECB",color:"#fff"}} htmlType="submit">更新版本</Button>
                      </FormItem>
                  </div>
              </div>
         </Form>
      </div>
    )
  }
}
export default Form.create()(SystemVersion)
