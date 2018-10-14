import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Form, Row, Col, Radio, Select, DatePicker  } from 'antd';
import PopModal from 'components/popout/basePop';
import QuickAddName from './quickAddName';
import TipModal from 'components/dr/modal/tip';
import Input from 'components/dr/input/basicInput';
import selectSty from 'components/antd/style/select';
import calendar from '-!file-loader!components/dr/icon/icons/calendar.svg';
import buttonSty from 'components/antd/style/button';
import radioSty from 'components/antd/style/radio';
import datePickerSty from 'components/antd/style/datePicker';
import moment from 'moment';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
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
        patienttype: '01',
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
    this.handleSubmit = this.handleSubmit.bind(this);
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
        deptid: 2,
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
   * [getDictList 获取字典列表]
   * @param  {[type]} DictTypeList [字典项数组]
   * @return {[type]}              [undefined]
   */
  getDictList(DictTypeList){
    let self = this;
    let params = {
      url: 'BaDatadictController/getListData',
      data: {
        dictNoList: DictTypeList
      },
    };
    function callBack(res){
      if(res.result){
        let dictListObj = {};
        let patientInfo = self.state.patientInfo;
        res.data.forEach(item => {
          dictListObj[item.dictno.toLowerCase()] = item.baDatadictDetailList;
          patientInfo[item.dictno.toLowerCase()] = item.baDatadictDetailList.length ? item.baDatadictDetailList[0].value : '';
        });
        self.setState({...dictListObj, patientInfo});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  quickReceive(){
    this.getDictList(['sex', 'pationtype', 'cardtype', 'casetype']);
    this.getDept();
    let patientInfo = {
      patientname: '',
      sex: 1,
      mobile: '',
      patienttype: '01',
      cardtype: 1,
      cardno: '',
      birthday: '1992-08-21',
      casetype: 1,
    };
    this.setState({ visible: true, patientInfo });
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
        Object.assign(patientInfo, others);
        let paramData = {
          baPatient: patientInfo,
          regUserid: window.sessionStorage.getItem('userid'),
          regUsername: window.sessionStorage.getItem('username'),
          orgid: window.sessionStorage.getItem('orgid'),
          deptid: dept.key,
          patientid: patientInfo.patientid,
          regTypeid: doctor ? 1 : 2,
          deptname: dept.label,
          patienttype: values.patienttype,
          recDoctorid: doctor.key,
          recDoctorname:  doctor.label
        };
        let params = {
          url: 'BuRegisterController/quickRecive',
          data: JSON.stringify(paramData),
          type: 'post',
        };
        function callBack(res){
          if(res.result){
            const { getFieldValue } = self.props.form
            let path = {
              pathname: '/layout/treatment',
            };
            window.casetype = getFieldValue('casetype');
            window.registerID = res.data.registerid;
            window.patientID = res.data.patientid;
            // 跳转到诊疗界面
            self.props.history.push(path);
          }else{
            self.tipModal.showModal({
              content: '已存在该患者挂号信息',
              stressContent: res.desc
            });
            console.log('异常响应信息', res);
          }
        };
        console.log('params', params);
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
  validateCardno = (rule, value, callback) => {
        const { getFieldValue, setFieldsInitialValue } = this.props.form
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        let validateResult = true;
        if(value.trim() == ''){ // 非空校验
          validateResult = false;
          callback('请输入身份证！');
        }
        if(reg.test(value) === false) // 格式校验
        {
          validateResult = false;
          callback('身份证输入不合法！');
        }
        if(validateResult){
          let birthday = extractDataFromIdentityCard.getBirthdayFromIdCard(value);
          let sex = extractDataFromIdentityCard.getSexFromIdCard(value);
          let patientInfo = this.state.patientInfo;
          patientInfo.birthday = birthday;
          patientInfo.sex = sex;
          this.setState({ patientInfo });
        }
        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback()
 }
  render() {
    let { visible, patientInfo, pationtype, cardtype, casetype, sex, deptData, docData, defaultDept, defaultDoc } = this.state;
    const { getFieldDecorator } = this.props.form;
    let age = extractDataFromIdentityCard.getAgeFromBirthday(patientInfo.birthday);
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
                    <SpecRadioGroup disabled>
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
                    rules: [{ required: true, message: '请输入正确格式的移动电话!', pattern: /^1(3|4|5|7|8)\d{9}$/ }],
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
                    rules: [{
                        validator: this.validateCardno
                      }], initialValue: patientInfo.cardno })(<Input placeholder='请输入患者证件号码' />)}
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
                    <SpecDatePicker disabled onChange={this.changeDate} allowClear={false}/>
                  )}
                  <SpecInput placeholder='年龄' disabled value={age} onChange={() => {}}/>
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
            <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
            <Footer>
              <SureButton type="primary" onClick={this.handleSubmit}>接诊</SureButton>
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
