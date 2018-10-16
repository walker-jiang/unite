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
      };
  }
  componentDidMount=()=>{
    var oDiv =document.getElementById("content")
    var aDIv =oDiv.getElementsByTagName("li")
    console.log("aDIv",aDIv);
    this.setState({num:aDIv.length})

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
           </div>
                  <div style={{width:"100%",borderTop:"1px solid #ccc",padding:"20px 0 0 10%"}}>
                    <div className="button" >
                      <Button htmlType="submit">保存</Button>
                      <Button>取消</Button>
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
