import React, {Component} from 'react';
import { Form,Collapse,Input,Button,Select,Switch,InputNumber,Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
import "./style.less"
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;
class NoLogin extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        num:null,
        page:1,
        long:0,
      };
  }
  // componentDidMount=()=>{
  //   var oDiv =document.getElementById("content")
  //   var aDIv =oDiv.getElementsByTagName("li")
  //   console.log("aDIv",aDIv);
  //   this.setState({num:aDIv.length})
  //
  // }
  handleSubmit=(e)=>{
      e.preventDefault();
    console.log("e",e);
    this.props.form.validateFields((err, values) => {
     console.log('Received values of form: ', values);
   });
  }
  onChange=(value)=>{
  console.log("ca",value);
  }
  // last=()=>{
  //   console.log("上一个");
// var page=this.state.page
//     if (page>1) {
//       this.setState({page:page-1,long:0},()=>{
//         console.log("shjad",this.state.long);
//       })
//     }
//   }
//   next=()=>{
//     console.log("下一个");
//
//     var page=this.state.page
//     var oDiv =document.getElementById("content")
//     var aDIv =oDiv.getElementsByTagName("li")
//     var oLi=aDIv[0].offsetWidth
//     if (page<this.state.num) {
//       this.setState({page:page+1,long:-oLi})
//     }
//   }
handleChange(value) {
  console.log(`selected ${value}`);
}

handleBlur() {
  console.log('blur');
}

handleFocus() {
  console.log('focus');
}
handleStatus=()=>{
  this.props.handleStatus([]);
}
  render() {
          const { getFieldDecorator } = this.props.form;
          const formItemLayout = {
           labelCol: {
             xs: { span: 24 },
             sm: { span: 4 },
           },
           wrapperCol: {
             xs: { span: 24 },
             sm: { span: 20 },
           },
         };
         const options = [
            { label: '普通模式', value: 'Apple' },
            { label: '始终在最前端', value: 'Pear' },
            { label: '嵌入桌面', value: 'Orange' },
          ];
    return (
      <div className="PersonalInformationSettings SystemOptions" style={{marginLeft:"20px"}}>
         <Form onSubmit={this.handleSubmit} className="login-form">
         <div style={{padding:"16px"}}>

                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>开机时自动启动;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>关闭主控浮窗时最小化至系统托盘，不退出系统;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>点击主控浮窗中菜单项时，主控浮窗操作窗体自动隐;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}
                   <span>焦点离开主控浮窗</span>

                   <span style={{display:" inlineBlock",width:"100px"}}>{getFieldDecorator('userName3', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(<InputNumber></InputNumber>)}</span>
                   <span>
                     秒后自动隐藏主控浮窗操作窗体;
                   </span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>当关闭健康信息平台功能窗体后 , 自动显示主控浮窗操作窗;</span>
                 </FormItem>
                 <FormItem>
                   <span>主控浮窗显示模式：</span>{getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <CheckboxGroup options={options} onChange={this.onChange} />
                   )}
                 </FormItem>
                 <FormItem>
                   <span>主控浮窗透明度调整：</span>{getFieldDecorator('userName4', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                  <InputNumber></InputNumber>
                   )}
                 </FormItem>



           </div>
                  <div style={{width:"100%",borderTop:"1px solid #ccc",padding:"20px 0 0 10%"}}>
                    <div className="button" >
                      <Button htmlType="submit">保存</Button>
                      <Button onClick={this.handleStatus}>取消</Button>
                    </div>
                  </div>
         </Form>
      </div>

    )
  }
}
export default NoLogin
