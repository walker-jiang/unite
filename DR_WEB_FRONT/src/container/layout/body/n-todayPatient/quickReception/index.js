import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Form, Row, Col, Radio, Select  } from 'antd';
import PopModal from 'components/popout/basePop';
import TipModal from 'components/dr/modal/tip';
import Input from 'components/dr/input/basicInput';
import selectSty from 'components/antd/style/select';
import buttonSty from 'components/antd/style/button';
import radioSty from 'components/antd/style/radio';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import Cardno from '../../n-patientRegister/registerForm/basicInfoForm/interconnectedItems/cardnoSexBirthday/cardno';
import Sex from '../../n-patientRegister/registerForm/basicInfoForm/interconnectedItems/cardnoSexBirthday/sex';
import Birthday from '../../n-patientRegister/registerForm/basicInfoForm/interconnectedItems/cardnoSexBirthday/birthday';
import PatientName from '../../n-patientRegister/registerForm/basicInfoForm/interconnectedItems/patientName';
import DeptDoctor from '../../n-patientRegister/registerForm/basicInfoForm/interconnectedItems/deptDoctor';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class QuickReception extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      patientInfo: {
        patientname: '',
        sex: '',
        mobile: '',
        patienttype: '',
        cardtype: '',
        cardno: '',
        birthday: '',
        casetype: '',
      }, //患者数据
      defaultDept: {key: window.sessionStorage.getItem('deptid'), label: window.sessionStorage.getItem('deptidDic')}, // 默认科室
      defaultDoc: {key: window.sessionStorage.getItem('userid'), label: window.sessionStorage.getItem('username')}, //默认医生
      pationtype: [], // 患者类型
      cardtype: [], //卡类型
      sex: [], // 性别
      casetype: [], //就诊类型
    };
    this.quickReceive = this.quickReceive.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        res.data.forEach(item => {
          dictListObj[item.dictno.toLowerCase()] = item.baDatadictDetailList;
        });
        self.setState({...dictListObj});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  quickReceive(){
    this.getDictList(['sex', 'pationtype', 'cardtype', 'casetype']);
    let patientInfo = {
      patientname: '',
      sex: '',
      mobile: '',
      patienttype: '',
      cardtype: '',
      cardno: '',
      birthday: '',
      casetype: '',
    };
    this.setState({ visible: true, patientInfo });
  };
  closeModal(){
    this.setState({ visible: false });
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
          deptcode: dept.key,
          patientid: patientInfo.patientid,
          regTypeid: doctor ? 1 : 2,
          deptname: dept.label,
          patienttype: values.patienttype,
          recDoctorid: doctor.key,
          recDoctorname:  doctor.label,
          regDoctorid: doctor.key,
          regDoctorname: doctor.label,
          casetype: values.casetype
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
            // window.casetype_global = getFieldValue('casetype');
            window.registerID = res.data.registerid;
            window.modifyPermission = 1; // 治疗书写权限0只读 1 可写
            window.patientID = res.data.patientid;
            // 跳转到诊疗界面
            self.props.history.push(path);
          }else{
            self.tipModal.showModal({
              content: '',
              stressContent: res.desc
            });
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
  render() {
    let { visible, patientInfo, pationtype, cardtype, casetype, sex, defaultDept, defaultDoc } = this.state;
    const { getFieldDecorator, setFieldsValue, getFieldValue } = this.props.form;
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
    let commontProps = { formItemLayout, getFieldDecorator, setFieldsValue, getFieldValue, disabled: false };
    return (
      <Container>
        <RegisterButton onClick={this.quickReceive}>快速接诊</RegisterButton>
        <PopModal fixed_left={1} visible={visible} title='快速接诊' onClose={this.closeModal}>
          <SpecForm onSubmit={this.handleSubmit} onClick={() => {this.patientName.hidePopTable()}} className='not-draggable'>
            <HideFormItem
              label="患者ID（隐藏）"
              >
              {getFieldDecorator('patientid', {
                initialValue: patientInfo.patientid
              })(
                <SpecInput/>
              )}
            </HideFormItem>
            <Row>
              <Col span={12}>
                <PatientName commontProps={commontProps} ref={ ref => { this.patientName = ref }} initialValue={patientInfo.patientname}/>
              </Col>
              <Col span={12}>
                <Sex commontProps={commontProps} sex={sex} initialValue={patientInfo.sex}/>
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
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="患者类型："
                  >
                  {getFieldDecorator('patienttype', {
                    rules: [{ required: true, message: '请输入患者类型!' }],
                    initialValue: patientInfo.patienttype
                  })(
                    <SpecSelect allowClear onFocus={() => {this.patientName.hidePopTable()}}>
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
                    <SpecSelect allowClear onFocus={() => {this.patientName.hidePopTable()}}>
                    {
                      cardtype.map(item => <Option key={item.value} value={item.value}>{item.vname}</Option>)
                    }
                    </SpecSelect>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <Cardno commontProps={commontProps} initialValue={patientInfo.cardno}/>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Birthday commontProps={commontProps} initialValue={patientInfo.birthday}/>
              </Col>
              <Col span={12}>
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
            <DeptDoctor commontProps={Object.assign({...commontProps}, {disabled: true})} onFocus={() => {this.patientName.hidePopTable()}} initialValue={{ dept: defaultDept, doctor: defaultDoc}} percentage={12}/>
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
  ${buttonSty.semicircle};
  &&& {
    padding: 2px 22px;
  }
`;
const SpecForm= styled(Form)`
  width: 600px;
  &&& {
    padding-right: 30px;
  }
  &&& > div > div > .ant-form-item {
    margin-bottom: 10px;
  }
`;
const HideFormItem = styled(FormItem)`
  &&& {
    display: none;
  }
`;
const SpecRadioGroup = styled(RadioGroup)`
  ${radioSty.borderRadioGroup}
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
  ${buttonSty.semicircle};
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
const QuickReceptionWrapper = Form.create()(QuickReception);
export default withRouter(QuickReceptionWrapper);
