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
    console.log('wwwwwwwww',window.sessionStorage.username);
    var  div=<div></div>
    if (window.sessionStorage.username) {
      div=  <SystemUserLogin ref="SystemUserLogin" form={this.props.form}></SystemUserLogin>
    }else {
      div=<NoLogin form={this.props.form}></NoLogin>
    }
    return (
      <div>
        
      {div}
      </div>

    )
  }
}
export default Form.create()(SystemOptions)
