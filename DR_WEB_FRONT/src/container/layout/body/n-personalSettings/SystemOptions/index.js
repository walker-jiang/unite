import React, {Component} from 'react';
import { Form,Collapse,Input,Button,Select,Switch,InputNumber,Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
import SystemUserLogin from "./UserLogin"
import NoLogin from "./NoLogin"
import SysLogin from "./SysLogin"
import "./style.less"
const FormItem = Form.Item;
const Panel = Collapse.Panel;
class SystemOptions extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
      };
  }
  isModify=()=>{
    this.refs.SystemUserLogin.isModify()
  }
  render() {
    return (
      <div>
        <SystemUserLogin ref="SystemUserLogin" form={this.props.form}></SystemUserLogin>
        {/**<NoLogin form={this.props.form}></NoLogin>
      <SysLogin form={this.props.form}></SysLogin>**/}
      </div>

    )
  }
}
export default Form.create()(SystemOptions)
