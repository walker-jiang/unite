import React, {Component} from 'react';
import { Form,Collapse,Input,Button,Select,Modal ,message } from 'antd';
import "./style.less"
// import Ajax from '../../../../rightAssistBar/service/xhr/index';
import Ajax from 'commonFunc/ajaxGetResource';
import Icons from 'components/dr/icon';
import styled from 'styled-components';

const FormItem = Form.Item;
const Panel = Collapse.Panel;
class ChangePassword extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        checked:true,
        realname:props.prop,
        ifshow:false,
      };
  }
  isModify=()=>{
    this.setState({checked:true})
    this.setState({checked:false})
  }
  /** [isshowed 保存成功提示框] */
 isshowed =() =>{
   let _this =this;
   this.setState({ifshow:true},()=>{
     function tishi(){
       _this.setState({ifshow:false})
       _this.props.handleStatus([]);
     }
     setTimeout(tishi,1000)
   }
   )
 }
  handleSubmit=(e)=>{
    let that =this;
    // console.log("e11111",this.props.form);
    this.props.form.validateFields((err, values) => {
      // console.log('values',values,err);

      // var reg = /^[A-z0-9]{6,20}$/
      // var valo = reg.test(values.password)
      // var valn = reg.test(values.newPassword)
      // var valrn = reg.test(values.rnewpwd)
      // if(valn && valo && valrn){
        // if(values.newPassword != values.password){
        // console.log('config_service_url',config_service_url);
          if(values.newPassword == values.rnewpwd){
            var date = {
              newPassword:values.newPassword,
              orgUserid:window.sessionStorage.getItem('userid'),
              password:values.password,
              realname:that.state.realname,
            }
            console.log(date);
            let params = {
              url: 'BaOrguserController/changePassword',
              type: 'put',
              data: JSON.stringify(date),
              server_url:config_login_url,
            }
            function success(res) {
              console.log('resres11111',res);
              if(res.desc == '成功' && res.code == 200){
                that.isshowed();
              }else{
                window.modal = Modal.error({
                  title: '请求失败，修改密码不成功！',
                  onOk: ()=>{
                    window.modal = null
                  }
                });
              }
            };
            Ajax(params, success);

          }else{
            window.modal = Modal.error({
              title: '两次新密码不一致',
              onOk: ()=>{
                window.modal = null
              }
            });
          }
        // }else{
          // alert('新密码与原始密码重复')
        // }
      // }
      // else if (!valn) {
      //   alert('请输入6-20位数组或数字与大小写字母组合的新密码')
      // }else if (!valo){
      //   alert('请输入6-20位数组或数字与大小写字母组合的原始密码')
      // }else if (!valrn) {
      //   alert('请再次输入6-20位数组或数字与大小写字母组合的新密码')
      // }


      if (!err) {

        const data = new URLSearchParams(values);
        // console.log('data',data);
        }
    })
  }
  //取消
  setStatus=()=>{
    this.setState({checked:true});
    this.props.handleStatus([]);
  }
  render() {
          const { getFieldDecorator } = this.props.form;
          const formItemLayout = {
           labelCol: {
             xs: { span: 24 },
             sm: { span: 5 },
           },
           wrapperCol: {
             xs: { span: 24 },
             sm: { span: 19 },
           },
         };
    return (
      <div className="PersonalInformationSettings">
         <Form className="login-form">
            <div style={{overflow:"hidden"}}>
                 <div style={{width:"55%",marginLeft:"10px",float:"left",paddingRight:"2%"}}>
                    <FormItem
                    {...formItemLayout}
                      label="原始密码："
                    >
                       {getFieldDecorator('password', {
                         rules: [{ required: false, message: 'Please input your username!' },{pattern:/^[A-z0-9]{6,20}$/, message: '请输入6-20位数字或数字与大小写字母组合的原始密码'}],
                       })(
                         <Input id='opwd'
                           disabled={this.state.checked}
                           placeholder="请输入原始密码" type="password" />
                       )}
                     </FormItem>
                     <FormItem
                     {...formItemLayout}
                       label="新密码 ："
                     >
                        {getFieldDecorator('newPassword', {
                          rules: [{ required: false, message: 'Please input your username!' },{pattern:/^[A-z0-9]{6,20}$/, message: '请输入6-20位数字或数字与大小写字母组合的新密码'}],
                        })(
                          <Input disabled={this.state.checked} placeholder="请输入新密码" type="password" />
                        )}
                      </FormItem>
                        <FormItem
                        {...formItemLayout}
                          label="确认新密码："
                        >
                           {getFieldDecorator('rnewpwd', {
                             rules: [{ required: false, message: 'Please input your username!' },{pattern:/^[A-z0-9]{6,20}$/, message: '请再次输入6-20位数字或数字与大小写字母组合的新密码'}],
                           })(
                             <Input disabled={this.state.checked} placeholder="请再次输入新密码" type="password" />
                           )}
                         </FormItem>

                  </div>
              </div>
            <div className="button" style={{width:"100%",borderTop:"1px solid #ccc",padding:"20px 0 0 10%",display:`${this.state.checked?"none":"block"}`}}>
              <Button onClick={this.handleSubmit} htmlType="submit">保存</Button>
              <Button onClick={this.setStatus}>取消</Button>
            </div>
         </Form>
      </div>

    )
  }
}
const Successupdata =styled.div`
 display:inline-block;
  width:100px;
  height:20px;
`
const IconOne = styled(Icons)`
  height:20px;
  width:20px;
  margin-right:4px;
`
export default Form.create()(ChangePassword)
