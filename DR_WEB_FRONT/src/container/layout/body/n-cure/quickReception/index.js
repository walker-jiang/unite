import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Form, Row, Col, Radio, Select, DatePicker  } from 'antd';
import PopModal from 'components/popout/basePop';
import QuickAddName from './quickAddName';
import Input from 'components/dr/input/basicInput';
import selectSty from 'components/antd/style/select';
import calendar from '-!file-loader!components/dr/icon/icons/calendar.svg';
import buttonSty from 'components/antd/style/button';
import radioSty from 'components/antd/style/radio';
import datePickerSty from 'components/antd/style/datePicker';
import moment from 'moment';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      patientInfo: {
        patientname: '',
        sex: 1,
        mobile: '',
        patienttype: 1,
        cardtype: 1,
        cardno: '',
        birthday: '1992-08-21',
        casetype: 1,
      }, //患者数据
      defaultDept: {}, // 默认科室
      defaultDoc: {}, //默认医生
      pationtype: [], // 患者类型
      cardtype: [], //卡类型
      sex: [], // 性别
      casetype: [], //就诊类型
      deptData: [], //科室数据
      docData: [], // 就诊医生数据
    };
    this.quickReceive = this.quickReceive.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addPatientData = this.addPatientData.bind(this);
    this.changeDate = this.changeDate.bind(this);
  };
  componentWillMount(){
    this.getDictData('sex');
    this.getDictData('pationtype');
    this.getDictData('cardtype');
    this.getDictData('casetype');
    this.getDept();
  };
  /** [getDept 科室数据] */
  getDept() {
    let params = {
      url: 'BaDepartmentController/getList',
      server_url: config_login_url,
      data: {
        keyword: '',
        orgid: window.sessionStorage.getItem('orgid')
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let deptData = res.data;
        let defaultDept = {};
        let deptname = '';
        deptData.forEach(item => {
          if(item.deptid == window.sessionStorage.getItem('deptid')){
            deptname = item.deptname;
          }
        });
        defaultDept = {
          key: window.sessionStorage.getItem('deptid'),
          label: deptname
        }
        that.setState({ deptData, defaultDept }, () => {
          that.getDocData('init', window.sessionStorage.getItem('deptid'));
        })
      }
    };
    ajaxGetResource(params, success);
  }
  /**
   * [getDocData 获取医生数据]
   * @param  {[type]} param [改变项的form ID]
   * @param  {[type]} value [改变项的 form value]
   * @return {[type]}       [undefin]
   */
  getDocData(param, value){
    let self = this;
    let params = {
      url: 'BaOrguserController/getList',
      data: {
        orgid: window.sessionStorage.getItem('orgid'),
        deptcode: window.sessionStorage.getItem('deptid'),
        keyword: ''
      },
    };
    function callBack(res){
      if(res.result){
        let defaultDoc = {
          key: window.sessionStorage.getItem('userid'),
          label: window.sessionStorage.getItem('username')
        };
        self.setState({
          docData: res.data,
          defaultDoc
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [getDictData 表单字典数据]
   * @param  {[type]} dictNo [字典类型]
   * @return {[type]}        [undefined]
   */
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
        let patientInfo = self.state.patientInfo;
        patientInfo[dictNo] = arr.length ? arr[0].value : '';
        self.setState({ [dictNo]: arr, patientInfo });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  quickReceive(){
    this.setState({ visible: true });
  };
  closeModal(){
    this.setState({ visible: false });
  };
  addPatientData(patientInfo){
    this.props.form.setFieldsValue({'patientname': patientInfo.patientname});
    this.setState({ patientInfo });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let self = this;
        values.birthday =values['birthday'].format('YYYY-MM-DD HH:mm:ss');
        let patientInfo = this.state.patientInfo;
        let {dept, doctor, ...others} = values;
        others.ctsorgid = window.sessionStorage.getItem('orgid');
        let paramData = {
          baPatient: others,
          regUserid: window.sessionStorage.getItem('userid'),
          regUsername: window.sessionStorage.getItem('username'),
          orgid: window.sessionStorage.getItem('orgid'),
          deptid: dept.key,
          regTypeid: doctor ? 1 : 2,
          deptname: dept.label,
          patienttype: values.patienttype,
          recDoctorid: doctor.key,
          recDoctorname:  doctor.label
        };
        let params = {
          url: 'BuRegisterController/quickRecive',
          data: JSON.stringify(Object.assign(patientInfo,paramData)),
          type: 'post',
        };
        function callBack(res){
          if(res.result){
            let path = {
              pathname: '/layout/treatment/' + res.data.patientid,
            };
            window.registerID = res.data.registerid;
            // 跳转到诊疗界面
            self.props.history.push(path);
          }else{
            console.log('异常响应信息', res);
          }
        };
        ajaxGetResource(params, callBack);
      }
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  changeDate(moment, dateString){
    let patientInfo = this.state.patientInfo;
    patientInfo['birthday'] = moment.format('YYYY-MM-DD');
    this.setState({ patientInfo });
  };
  render() {
    let { visible, patientInfo, pationtype, cardtype, casetype, sex, deptData, docData, defaultDept, defaultDoc } = this.state;
    const { getFieldDecorator } = this.props.form;
    let date = new Date();
    const age = date.getFullYear() - parseInt(patientInfo.birthday.substr(0,4));
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };

    return (
      <Container>
        <RegisterButton onClick={this.quickReceive}>快速接诊</RegisterButton>
        <PopModal visible={visible} title='快速接诊' onClose={this.closeModal}>
          <SpecForm onSubmit={this.handleSubmit} onClick={() => {this.quickAddName.hideResult()}} className='not-draggable'>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="患者姓名："
                  >
                  {getFieldDecorator('patientname', {
                    rules: [{ required: true, message: '请输入患者姓名!' }],
                    initialValue: patientInfo.patientname
                  })(
                    <QuickAddName ref={ref => {this.quickAddName = ref} } placeholder='请选择患者信息' getQuickData = {this.addPatientData}/>
                  )}
                </FormItem>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="性别："
                  >
                  {getFieldDecorator('sex', {
                    rules: [{ required: true, message: '请输入患者性别!' }],
                    initialValue: patientInfo.sex
                  })(
                    <SpecRadioGroup>
                    {
                      sex.map(item => <Radio value={item.value} key={item.value}>{item.vname}</Radio>)
                    }
                    </SpecRadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="移动电话："
                  >
                  {getFieldDecorator('mobile', {
                    rules: [{ required: true, message: '请输入患者移动电话!' }],
                    initialValue: patientInfo.mobile
                  })(
                    <Input placeholder='请输入患者移动电话' />
                  )}
                </FormItem>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="患者类型："
                  >
                  {getFieldDecorator('patienttype', {
                    rules: [{ required: true, message: '请输入患者类型!' }],
                    initialValue: patientInfo.patienttype
                  })(
                    <SpecSelect>
                    {
                      pationtype.map(item => <Option key={item.value} value={item.value}>{item.vname}</Option>)
                    }
                    </SpecSelect>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="证件类型："
                  >
                  {getFieldDecorator('cardtype', {
                    rules: [{ required: true, message: '请输入证件类型!' }],
                    initialValue: patientInfo.cardtype
                  })(
                    <SpecSelect>
                    {
                      cardtype.map(item => <Option key={item.value} value={item.value}>{item.vname}</Option>)
                    }
                    </SpecSelect>
                  )}
                </FormItem>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="证件号码："
                  >
                  {getFieldDecorator('cardno', {
                    rules: [{ required: true, message: '请输入证件号码!' }],
                    initialValue: patientInfo.cardno
                  })(<Input placeholder='请输入患者证件号码' />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <SpecFormItem
                  {...formItemLayout}
                  colon={false}
                  label="生日/年龄："
                  >
                  {getFieldDecorator('birthday', {
                    rules: [{ type: 'object', required: true, message: '请输入选择生日!' }],
                    initialValue: moment(patientInfo.birthday, 'YYYY-MM-DD')
                  })(
                    <SpecDatePicker onChange={this.changeDate} allowClear={false}/>
                  )}
                  <SpecInput placeholder='年龄' value={age} onChange={() => {}}/>
                </SpecFormItem>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="就诊类型："
                  >
                  {getFieldDecorator('casetype', {
                    rules: [{ required: true, message: '请选择患者就诊类型!' }],
                    initialValue: casetype.length ? casetype[0].value : ''
                  })(
                    <SpecRadioGroup>
                    {
                      casetype.map(item => <Radio key={item.value} value={item.value}>{item.vname}</Radio>)
                    }
                    </SpecRadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="就诊科室："
                  >
                  {getFieldDecorator('dept', {
                    rules: [{ required: true, message: '请选择就诊科室!' }],
                    initialValue: defaultDept
                  })(
                    <SpecSelect onChange={e => this.getDocData('dept', e.key)} labelInValue disabled>
                    {
                      deptData.map(item => <Option key={item.deptid} value={item.deptid}>{item.deptname}</Option>)
                    }
                    </SpecSelect>
                  )}
                </FormItem>
                </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="接诊医生："
                  >
                  {getFieldDecorator('doctor', {
                    rules: [{ required: true, message: '请输入接诊医生姓名!' }],
                    initialValue: defaultDoc
                  })(
                    <SpecSelect labelInValue disabled>
                    {
                      docData.map(item => <Option key={item.orgUerid} value={item.orgUerid}>{item.realname}</Option>)
                    }
                    </SpecSelect>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Footer>
              <SureButton type="primary"  htmlType="submit">接诊</SureButton>
              <CancelButton type="primary" onClick={this.handleReset}>清空</CancelButton>
            </Footer>
          </SpecForm>
        </PopModal>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
`;
const RegisterButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const SpecForm= styled(Form)`
  width: 600px;
  &&& > div > div > .ant-form-item {
    margin-bottom: 10px;
  }
`;
const SpecRadioGroup = styled(RadioGroup)`
  ${radioSty.borderRadioGroup}
`;
const SpecDatePicker = styled(DatePicker)`
  ${datePickerSty.bottomBorder}
`;
const SpecFormItem = styled(FormItem)`
  .ant-form-item-children{
    display: flex;
    align-items: flex-start;
  }
`;
const SpecInput = styled(Input)`
  width: 50px;
  margin-left: 20px;
  margin-top: -4px;
`;
const SpecSelect = styled(Select)`
  ${selectSty.thinArrow}
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
const Footer = styled.div`
  width: 600px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center
`;
/*
@作者：姜中希
@日期：2018-09-12
@描述：今日诊疗
*/
const QuickReception = Form.create()(Index);
export default withRouter(QuickReception);
