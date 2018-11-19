import React, {Component} from 'react';
import styled from 'styled-components';
import {
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class NoLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
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
    const options = [
      {
        label: '普通模式',
        value: 'Apple'
      }, {
        label: '始终在最前端',
        value: 'Pear'
      }, {
        label: '嵌入桌面',
        value: 'Orange'
      }
    ];
    let {checked}=this.state;
    let pageDataTwo= this.props.pageDataTwo;
    return (<Container>
      <FormItems>
        <span>系统左侧菜单显示项设置：</span>
        <span>立即设置</span>
      </FormItems>
      <FormItems {...formItemLayout}>
        <span>首页默认样式设置：</span>
        {
          getFieldDecorator('homeSetting', {
            initialValue:pageDataTwo.homeSetting?Number(pageDataTwo.homeSetting):1,
          })(<Select style={{
              width: 200
            }} placeholder="Select a person" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value={0}>不显示分析图表</Option>
            <Option value={1}>显示分析图表</Option>
          </Select>)
        }
      </FormItems>
      <FormItems>
        <span>中药处方字体设置：</span>
        {
          getFieldDecorator('MedicinePrescription', {
            initialValue:pageDataTwo.MedicinePrescription?Number(pageDataTwo.MedicinePrescription):2,
          })(<Select style={{
              width: 200
            }} placeholder="Select a person" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value={0}>宋体</Option>
            <Option value={1}>华为行楷</Option>
            <Option value={2}>微软雅黑</Option>
          </Select>)
        }
      </FormItems>
      <FormItems>
        <span>中医适宜技术治疗单字体设置：</span>
        {
          getFieldDecorator('MedicineTechnology', {
            rules: [
              {
                required: false,
                message: '请选择中医适宜技术治疗单字体设置!'
              }
            ],
            initialValue:pageDataTwo.MedicineTechnology?Number(pageDataTwo.MedicineTechnology):2,
          })(<Select style={{
              width: 200
            }} placeholder="Select a person" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value={0}>宋体</Option>
            <Option value={1}>华为行楷</Option>
            <Option value={2}>微软雅黑</Option>
          </Select>)
        }
      </FormItems>
      <FormItems>
        {
          getFieldDecorator('automaticAcquisition', {
            valuePropName: 'checked',
            initialValue:pageDataTwo.automaticAcquisition?(pageDataTwo.automaticAcquisition=='01'?true:false):false,
          })(<Switch checkedChildren="开" unCheckedChildren="关"/>)
        }<span>填写中医适宜技术治疗单时，开启辅助取穴、自动获取默认操作方法;</span>
      </FormItems>
      <FormItems>
        {
          getFieldDecorator('InformationHints', {
            valuePropName: 'checked',
            initialValue:pageDataTwo.InformationHints?(pageDataTwo.InformationHints=='01'?true:false):false,
          })(<Switch checkedChildren="开" unCheckedChildren="关"/>)
        }<span>进入今日诊疗模块，对于当前正在诊疗的病人给出信息提示;</span>
      </FormItems>
      <FormItems>
        {
          getFieldDecorator('realTimePush', {
            valuePropName: 'checked',
            initialValue:pageDataTwo.realTimePush?(pageDataTwo.realTimePush=='01'?true:false):false,
          })(<Switch checkedChildren="开" unCheckedChildren="关"/>)
        }<span>书写病历时，根据病历中关键词右侧病历模板智能实时推送;</span>
      </FormItems>
      <FormItems>
        {
          getFieldDecorator('realTimePushs', {
            valuePropName: 'checked',
            initialValue:pageDataTwo.realTimePushs?(pageDataTwo.realTimePushs=='01'?true:false):true,
          })(<Switch checkedChildren="开" unCheckedChildren="关"/>)
        }<span>书写病历时，根据病历中关键词右侧病历模板智能实时推送;</span>
      </FormItems>
      <FormItems>
        {
          getFieldDecorator('displayPhotos', {
            valuePropName: 'checked',
            initialValue:pageDataTwo.displayPhotos?(pageDataTwo.displayPhotos=='01'?true:false):true,
          })(<Switch checkedChildren="开" unCheckedChildren="关"/>)
        }<span>书写病历时，鼠标停留在舌诊选择标签时，在右侧显示标准舌诊照片;</span>
      </FormItems>
      <FormItems>
        {
          getFieldDecorator('pulseDescription', {
            valuePropName: 'checked',
            initialValue:pageDataTwo.pulseDescription?(pageDataTwo.pulseDescription=='01'?true:false):true,
          })(<Switch checkedChildren="开" unCheckedChildren="关"/>)
        }<span>书写病历时，鼠标停留在脉象选择标签时，在右侧区域显示标准脉象描述;</span>
      </FormItems>
    </Container>)
  }
}
export default NoLogin
const Container = styled.div `
  height:400px;
  width:100%;
  padding: 0px 10px;
`
const FormItems = styled(FormItem)`
  height:40px;
  margin:0 !important;
  display: flex;
  align-items:center;
`
/* @作者：马奔
@日期：2018-11-14
@描述：系统选项模块第二页 */
