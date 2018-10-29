import React, {Component} from 'react';
import { Form,Collapse,Input,Button,Select  } from 'antd';
import "./style.less"
const FormItem = Form.Item;
const Panel = Collapse.Panel;
import Ajax from 'commonFunc/ajaxGetResource';
class SystemVersion extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        checked:true
      };
  }
  componentWillMount(){
    console.log('windowwwwww',window.sessionStorage,window.localStorage);
  }
  handleSubmit=(e,values)=>{
    console.log("e",e);
    console.log('formsds',this.props.form.validateFields);
    this.props.form.validateFields((ee,val)=>{
      console.log('valvalval',val,e);
      //系统版本请求传参
      // var date = {
      //   newPassword:values.password,
      //   orgUerid:window.sessionStorage.getItem('userid'),
      //   password:values.password
      // }
      let params = {
        url: 'SyVersionController/getVerNo',
        type: 'post',
        // data: JSON.stringify(date),
        server_url:config_login_url,
        data:verid
      }
      let that = this;
      function success(res) {
        console.log('更新版本resres11111',res);
        if(res.desc == '成功' && res.code == 200){
          window.modal = Modal.success({
            title: '版本更新成功！',
            onOk: ()=>{
              window.modal = null
            }
          });
        }else{
          window.modal = Modal.error({
            title: '请求失败，版本更新不成功！',
            onOk: ()=>{
              window.modal = null
            }
          });
        }
      };
      Ajax(params, success);

    })
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
         <Form onSubmit={this.handleSubmit} className="login-form">
            <div style={{overflow:"hidden"}}>
                 <div style={{width:"55%",float:"left",paddingRight:"2%"}}>
                    <FormItem
                    {...formItemLayout}
                      label="服务器端版本号 ："
                    >
                       {getFieldDecorator('userName', {
                         rules: [{ required: false, message: 'Please input your username!' }],
                       })(
                         <Input disabled={this.state.checked}  placeholder="请输入" />
                       )}
                     </FormItem>
                     <FormItem
                     {...formItemLayout}
                       label="本地客户端版本 ："
                     >
                        {getFieldDecorator('userName', {
                          rules: [{ required: false, message: 'Please input your username!' }],
                        })(
                          <Input disabled={this.state.checked}  placeholder="请输入" />
                        )}
                        <Button style={{position:"absolute",left:"101%",marginTop:"5px",height:"32px",borderRadius:"16px",background:"#0A6ECB",color:"#fff"}} htmlType="submit">更新版本</Button>

                      </FormItem>

                  </div>

              </div>
         </Form>
      </div>

    )
  }
}
export default Form.create()(SystemVersion)
