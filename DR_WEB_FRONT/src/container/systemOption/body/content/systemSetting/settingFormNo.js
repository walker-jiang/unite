import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Input, Radio, Row, Col, Form, Button, Switch } from 'antd';
import PlusMinus from 'components/dr/PlusMinus';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      dept: [], // 科室数据
      duty: [], //职务登记数据
    };
  };
  /** [handleSubmit form表单提交触发的] */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let self = this;
        let params = {
          url: 'BuRegisterController/postData',
          data: {},
          type: 'post',
        };
        function callBack(res){
          if(res.result){
            Modal.success({
              title: '用户登记成功',
            });
            self.props.onOK(res.data.patientid, res.data.registerid, res.data.patientname);
          }else{
            console.log('异常响应信息', res);
          }
        };
        // ajaxGetResource(params, callBack);
      }
    });
  }
  getDictData(dictNo){
    let self = this;
    let params = {
      url: 'BaDatadictController/getData',
      data: {
        dictNo: dictNo
      },
    };
    function callBack(res){
      if(res.result){
        let arr = res.data.baDatadictDetailList;
        self.setState({[dictNo]: arr});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  handleReset = () => {
    this.props.form.resetFields();
  }
  componentWillMount(){
    let dept = [{
      code: '1',
      value: '消化科'
    }];
    let duty = [{
      code: '1',
      value: '演员'
    }];
    this.setState({ dept, duty });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    let { dept, duty } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 3 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 21 },
        sm: { span: 21 },
      },
     };
    return (
      <Form onSubmit={this.handleSubmit} className='not-draggable'>
        <Row>
          <Col span={2} offset={2}>
            <FormItem
              className='heightSetting'
              colon={false}
              {...formItemLayout}
              label=" "
            >
              {getFieldDecorator('switch', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Switch />
              )}
            </FormItem>
          </Col>
          <Col span={20}>开机时自动启动；</Col>
        </Row>
        <Row>
          <Col span={2} offset={2}>
            <FormItem
              className='heightSetting'
              colon={false}
              {...formItemLayout}
              label=" "
            >
              {getFieldDecorator('switch1', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Switch />
              )}
            </FormItem>
          </Col>
          <Col span={20}>关闭主控浮窗时最小化至系统托盘，不退出系统；</Col>
        </Row>
        <Row>
          <Col span={2} offset={2}>
            <FormItem
              className='heightSetting'
              colon={false}
              {...formItemLayout}
              label=" "
            >
              {getFieldDecorator('switch1', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Switch />
              )}
            </FormItem>
          </Col>
          <Col span={20}>点击主控浮窗中菜单项时，主控浮窗操作窗体自动隐藏；</Col>
        </Row>
        <Row>
          <Col span={2} offset={2}>
            <FormItem
              className='heightSetting'
              colon={false}
              {...formItemLayout}
              label=" "
            >
              {getFieldDecorator('switch1', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Switch />
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            焦点离开主控浮窗
          </Col>
          <Col span={4}>
            <FormItem
              className='heightSetting'
              colon={false}
            >
              {getFieldDecorator('input', {
                initialValue: 1
              })(
                <PlusMinus/>
              )}
            </FormItem>
          </Col>
          <Col span={10}>
            秒后自动隐藏主控浮窗操作窗体；
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={2}>
            <FormItem
              className='heightSetting'
              colon={false}
              {...formItemLayout}
              label=" "
            >
              {getFieldDecorator('switch1', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Switch />
              )}
            </FormItem>
          </Col>
          <Col span={20}>当关闭健康信息平台功能窗体后 , 自动显示主控浮窗操作窗体；</Col>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <FormItem
              className='heightSettingRadioGruop heightSetting'
              colon={false}
              labelCol={{span: 5}}
              wrapperCol={{span: 19}}
              label="主控浮窗显示模式："
            >
              {getFieldDecorator('switch1', {
                valuePropName: 'checked',
                initialValue: '1'
              })(
                <RadioGroup >
                  <Radio value='1'>普通模式</Radio>
                  <Radio value={2}>始终在最前端</Radio>
                  <Radio value={3}>嵌入桌面</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <FormItem
              className='heightSettingRadioGruop heightSetting'
              colon={false}
              labelCol={{span: 5}}
              wrapperCol={{span: 19}}
              label="主控浮窗透明度调整："
            >
              {getFieldDecorator('cusINput ', {
                initialValue: 0
              })(
                <PlusMinus type='percent'/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Footer>
          <SureButton type="primary" htmlType="submit" onClick={this.handleOK}>保存</SureButton>
          <CancelButton type="primary" onClick={this.handleReset}>取消</CancelButton>
        </Footer>
      </Form>
    )
  }
}
const Container = styled.div`
  width: 520px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
  font-size: 14px;
`;
const RowLine = styled(Row)`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95px;
  margin-top: 20px;
  border-top: 1px solid #E6E6E6;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
/*
@作者：姜中希
@日期：2018-07-29
@描述：系统设置用户没有登录时保存表单组件
*/
const SettingFormNo = Form.create()(Index);
export default SettingFormNo;
