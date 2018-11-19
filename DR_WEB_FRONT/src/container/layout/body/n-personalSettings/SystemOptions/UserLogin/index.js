import React, {Component} from 'react';
import {
  Form,
  Collapse,
  Input,
  Button,
  Select,
  Radio ,
  Switch,
  InputNumber,
} from 'antd';
import styled from 'styled-components';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;
const Option = Select.Option;
class SystemUserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
  }
  componentDidMount = () => {

  }
  componentWillReceiveProps(nextProps) {
    this.setState({checked: nextProps.checked})
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 4
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 20
        }
      }
    };
    let pagedataOne= this.props.pagedataOne;
    return (
      <Container>
        <FormItems>
          {
            getFieldDecorator('autoStart', {
              valuePropName: 'checked',
              initialValue:pagedataOne.autoStart?(pagedataOne.autoStart=='01'?true:false):true,
            })(<Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关"/>)
          }<span>开机时自动启动;</span>
        </FormItems>
        <FormItems>
          {
            getFieldDecorator('systemTray', {
              valuePropName: 'checked',
              initialValue:pagedataOne.systemTray?(pagedataOne.systemTray=='01'?true:false):true,
            })(<Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" />)
          }<span>关闭主控浮窗时最小化至系统托盘，不退出系统;</span>
        </FormItems>
        <FormItems>
          {
            getFieldDecorator('automaticFloats', {
              valuePropName: 'checked',
              initialValue:pagedataOne.automaticFloats?(pagedataOne.automaticFloats=='01'?true:false):true,
            })(<Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" />)
          }<span>点击主控浮窗中菜单项时，主控浮窗操作窗体自动隐藏;</span>
        </FormItems>
          <FormItems>
          {
            getFieldDecorator('automaticLeft', {
              valuePropName: 'checked',
              initialValue:pagedataOne.automaticLeft?(pagedataOne.automaticLeft=='01'?true:false):true,
            })(<Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" />)
          }<span>当点击主控浮窗中菜单时，健康信息平台左侧功能区自动隐藏;</span>
        </FormItems>
          <FormItems>
          {
            getFieldDecorator('automaticFocus', {
              valuePropName: 'checked',
              initialValue:pagedataOne.automaticFocus?(pagedataOne.automaticFocus=='01'?true:false):true,
            })(<Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关"/>)
          }
          <span>焦点离开主控浮窗</span>

          <span style={{
              display: " inlineBlock",
              width: "100px"
            }}>{
              getFieldDecorator('automaticFocusValue', {
                rules: [
                  {
                    required: false,
                    message: 'Please input your username!'
                  }
                ],
                initialValue:2
              })(<InputNumbers min={0} max={30} disabled={this.state.checked} ></InputNumbers>)
            }</span>
          <span>
            秒后自动隐藏主控浮窗操作窗体;
          </span>
        </FormItems>
        <FormItems>
          {
            getFieldDecorator('autoDisplay', {
              valuePropName: 'checked',
              initialValue:pagedataOne.autoDisplay?(pagedataOne.autoDisplay=='01'?true:false):true,
            })(<Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" />)
          }<span>当关闭健康信息平台功能窗体后 , 自动显示主控浮窗操作窗;</span>
        </FormItems>
          <FormItems>
          {
            getFieldDecorator('automaticRight', {
              valuePropName: 'checked',
              initialValue:pagedataOne.automaticRight?(pagedataOne.automaticRight=='01'?true:false):true,
            })(<Switch disabled={this.state.checked} checkedChildren="开" unCheckedChildren="关" />)
          }<span>当关闭健康信息平台功能窗体后 , 健康信息平台右侧功能区自动隐藏；</span>
        </FormItems>
        <FormItems>
          <span>主控浮窗显示模式：</span>{
            getFieldDecorator('displayMode', {
              initialValue:pagedataOne.displayMode?Number(pagedataOne.displayMode):1
            })(<RadioGroup>
                <Radio value={1}>普通模式</Radio>
                <Radio value={2}>始终在最前端</Radio>
                <Radio value={3}>嵌入桌面</Radio>
              </RadioGroup>)
          }
        </FormItems>
        <FormItems>
          <span>主控浮窗透明度调整：</span>{
            getFieldDecorator('transparency', {
              initialValue:pagedataOne.transparency?pagedataOne.transparency:90
            })(<InputNumbers min={0} max={100} disabled={this.state.checked} formatter={value => `${value}%`} parser={value => value.replace('%', '')} />)
          }
        </FormItems>
      </Container>
      )
  }
}
export default SystemUserLogin

const Container=styled.div`
  height:400px;
  width:100%;
  padding: 0px 20px;
`
const FormItems=styled(FormItem)`
  height:40px;
  margin:0 !important;
  display: flex;
  align-items:center;
`
const InputNumbers=styled(InputNumber)`
`
/* @作者：马奔
@日期：2018-11-14
@描述：系统选项模块第一页 */
