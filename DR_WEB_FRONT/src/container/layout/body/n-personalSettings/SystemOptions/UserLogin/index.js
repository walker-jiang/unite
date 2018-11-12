import React, {Component} from 'react';
import { Form,Collapse,Input,Button,Select,Switch,InputNumber,Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
import "./style.less"
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;
class SystemUserLogin extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        num:null,
        page:1,
        long:0,
        checked:true,
      };
  }
  componentDidMount=()=>{
    var oDiv =document.getElementById("content")
    var aDIv =oDiv.getElementsByTagName("li")
    console.log("aDIv",aDIv);
    this.setState({num:aDIv.length})

  }
  isModify=()=>{
    this.setState({checked:false})
  }
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
  last=()=>{
    console.log("上一个");
var page=this.state.page
    if (page>1) {
      this.setState({page:page-1,long:0},()=>{
        console.log("shjad",this.state.long);
      })
    }
  }
  next=()=>{
    console.log("下一个");

    var page=this.state.page
    var oDiv =document.getElementById("content")
    var aDIv =oDiv.getElementsByTagName("li")
    var oLi=aDIv[0].offsetWidth
    if (page<this.state.num) {
      this.setState({page:page+1,long:-oLi})
    }
  }
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
  this.setState({checked:true})
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
           <div style={{overflow:"hidden",position:"relative",height:"425px"}}>
             <ul className="content" style={{left:this.state.long}}  id="content">

               <li style={{padding:"16px"}}>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>开机时自动启动;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>关闭主控浮窗时最小化至系统托盘，不退出系统;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>点击主控浮窗中菜单项时，主控浮窗操作窗体自动隐;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>当点击主控浮窗中菜单时，健康信息平台左侧功能区自动隐藏;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}
                   <span>焦点离开主控浮窗</span>

                   <span style={{display:" inlineBlock",width:"100px"}}>{getFieldDecorator('userName3', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(<InputNumber disabled={this.state.checked}></InputNumber>)}</span>
                   <span>
                     秒后自动隐藏主控浮窗操作窗体;
                   </span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>当关闭健康信息平台功能窗体后 , 自动显示主控浮窗操作窗;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>当关闭健康信息平台功能窗体后 , 健康信息平台右侧功能区自动隐藏；</span>
                 </FormItem>
                 <FormItem>
                   <span>主控浮窗显示模式：</span>{getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <CheckboxGroup disabled={this.state.checked} options={options} onChange={this.onChange} />
                   )}
                 </FormItem>
                 <FormItem>
                   <span>主控浮窗透明度调整：</span>{getFieldDecorator('userName4', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                  <InputNumber disabled={this.state.checked}></InputNumber>
                   )}
                 </FormItem>

               </li>
               <li style={{padding:"16px"}}>
                 <FormItem>
                   <span>系统左侧菜单显示项设置：</span>
                  <span>立即设置</span>
                 </FormItem>
                 <FormItem>
                   <span>首页默认样式设置：</span>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                     <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                   )}
                 </FormItem>
                 <FormItem>
                   <span>中药处方字体设置：</span>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                     <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                   )}
                 </FormItem>
                 <FormItem>
                   <span>中医适宜技术治疗单字体设置：</span>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                     <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                   )}
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>填写中医适宜技术治疗单时，开启辅助取穴、自动获取默认操作方法;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>进入今日诊疗模块，对于当前正在诊疗的病人给出信息提示;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>书写病历时，根据病历中关键词右侧病历模板智能实时推送;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>书写病历时，根据病历中关键词右侧病历模板智能实时推送;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>书写病历时，鼠标停留在舌诊选择标签时，在右侧显示标准舌诊照片;</span>
                 </FormItem>
                 <FormItem>
                   {getFieldDecorator('userName2', {
                   rules: [{ required: false, message: 'Please input your username!' }],
                   })(
                   <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                   )}<span>书写病历时，鼠标停留在脉象选择标签时，在右侧区域显示标准脉象描述;</span>
                 </FormItem>
               </li>
             </ul>
           </div>
                  <div style={{width:"100%",borderTop:"1px solid #ccc",padding:"20px 0 0 10%",display:`${this.state.checked?"none":"block"}`}}>
                    <div className="button" >
                      <Button htmlType="submit">保存</Button>
                      <Button onClick={this.handleStatus}>取消</Button>
                    </div>
                    <div className="yema">
                      <span>{this.state.page}/{this.state.num}</span><span onClick={this.last} style={{cursor:'pointer'}}>上一页</span><span onClick={this.next} style={{cursor:'pointer'}}>下一页</span>
                    </div>
                  </div>
         </Form>
      </div>

    )
  }
}
export default SystemUserLogin
