import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Input, Row, Col, Form, Button, Switch } from 'antd';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const FormItem = Form.Item;
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
        values.birthday = values.birthday.format('YYYY-MM-DD')
        values.addrHome = values.provinceid.label + values.cityid.label + values.areaid.label;
        values.provinceid = values.provinceid.key;
        values.cityid = values.cityid.key;
        values.areaid = values.areaid.key;
        // console.log(values.birthday);
        let paramData = {
          baPatient: values,
          orgid: window.sessionStorage.getItem('orgid'),
          deptid: window.sessionStorage.getItem('deptid'),
          post: window.sessionStorage.getItem('post'),
          userid: window.sessionStorage.getItem('userid'),
          username: window.sessionStorage.getItem('username'),
          careCardno: values.careCardno
        };
        let self = this;
        let params = {
          url: 'BuRegisterController/postData',
          data: JSON.stringify(paramData),
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
        ajaxGetResource(params, callBack);
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
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
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
                initialValue: false
              })(
                <Switch />
              )}
            </FormItem>
          </Col>
          <Col span={20}>启动系统时为自动登录；</Col>
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
          <Col span={20}>主控浮窗置顶显示；</Col>
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
          <Col span={20}>点击主控浮窗中菜单项时，主控浮窗自动收缩成小条；</Col>
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
          <Col span={20}>当关闭健康信息平台主窗体后 , 自动显示主控浮窗；</Col>
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
          <Col span={20}>在进行诊疗相关业务操作时，自动隐藏诊疗管理浮窗；</Col>
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
          <Col span={20}>诊疗管理中，鼠标移入左侧边框的箭头区域时，患者列表向右滑出；</Col>
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
          <Col span={20}>诊疗时，对于复诊患者提示医生查看历史病历</Col>
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
          <Col span={20}>保存诊疗单时，开启智能推方信息提示；</Col>
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
@描述：系统设置保存表单组件
*/
const SettingForm = Form.create()(Index);
export default SettingForm;
