import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col, Radio, Select } from 'antd';
import IllHistory_present from '../../../treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_allergy from '../../../treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import OtherInspect from '../../../treatment/treatItem/writeMedicalRecords/formItem/otherInspect';
import HabitusInspect from '../../../treatment/treatItem/writeMedicalRecords/formItem/habitusInspect';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import radioSty from 'components/antd/style/radio';
import selectSty from 'components/antd/style/select';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      casetype: [], // 诊疗类型
      deptData: [], //科室数据
      docData: [], // 就诊医生数据
      YESNO: [], // 是否
      preInfo: { // 初始化数据
        hpi: '', //现病史
        allergichistory: '', // 过敏史
        temperature: '', //体温
        breath: '',
        pulse: '',
        systolicPressure: '',
        diastolicPressure: '',
        heightnum: '',
        weightnum: '',
        psycheck: '', // 其它检查
        ispregnancy: '', // 是否孕期
        isperiod: '', // 是否经期
        casetype: '',
        dept: {key: '', label: ''},
        doctor: {key: '', label: ''},
      }, //初始化诊前信息
    };
  };
  componentWillMount(){
    let preInfo = this.props.buPatientCase;
    if(JSON.stringify(preInfo) != '{}'){
      preInfo.dept = {
        key: preInfo.deptid,
        label: preInfo.deptname,
      };
      preInfo.doctor = {
        key: preInfo.doctorid,
        label: preInfo.doctorname,
      };
      this.setState({
        preInfo: preInfo
      })
    }
    this.getDictData('casetype');
    this.getDictData('YESNO');
    this.getDept();
  };
  /** [getDept 科室数据] */
  getDept() {
    let params = {
      url: 'BaDepartmentController/getList',
      server_url: config_login_url,
      data: {
        orgid: window.sessionStorage.getItem('orgid')
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let deptData = res.data;
        that.setState({ deptData }, () => {
          that.getDocData(deptData[0].deptid);
        })
      }
    };
    ajaxGetResource(params, success);
  }
  /**
   * [getDocData 获取医生数据]
   * @param  {[type]} deptid [科室 ID]
   */
  getDocData(deptid){
    let self = this;
    let params = {
      url: 'BaOrguserController/getList',
      data: {
        orgid: window.sessionStorage.getItem('orgid'),
        deptid: deptid ,
        keyword: ''
      },
    };
    function callBack(res){
      if(res.result){
        self.setState({
          docData: res.data,
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
        self.setState({ [dictNo]: arr });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    let disabled = this.props.disabled
    let { casetype, deptData, docData, preInfo, YESNO } = this.state;
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
     const formItemLayoutBehind = {
       labelCol: {
         xs: { span: 10 },
         sm: { span: 10 },
       },
       wrapperCol: {
         xs: { span: 14 },
         sm: { span: 14 },
       },
      };
    return (
      <SpecForm>
        <IllHistory_present title='现病史' disabled={disabled} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: preInfo.hpi}}/>
        <IllHistory_allergy title='过敏史' disabled={disabled} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: preInfo.allergichistory}}/>
        <HabitusInspect setFieldsValue={setFieldsValue} disabled={disabled} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{temperature: preInfo.temperature, breath: preInfo.temperature, pulse: preInfo.temperature, systolicPressure: preInfo.systolicPressure, diastolicPressure: preInfo.diastolicPressure, heightnum: preInfo.heightnum, weightnum: preInfo.weightnum}}></HabitusInspect>
        <Row>
          <Col span={8} offset={3}>
            <FormItem
              {...formItemLayoutBehind}
              colon={false}
              label="是否孕期"
              >
              {getFieldDecorator('ispregnancy', {
                initialValue: YESNO.length ? ( preInfo.ispregnancy ? preInfo.ispregnancy : YESNO[0].value ) : ''
              })(
                <SpecRadioGroup disabled={disabled}>
                {
                  YESNO.map(item => <Radio value={item.value} key={item.value}>{item.vname}</Radio>)
                }
                </SpecRadioGroup>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayoutBehind}
              colon={false}
              label="是否经期"
              >
              {getFieldDecorator('isperiod', {
                initialValue: YESNO.length ? ( preInfo.isperiod ? preInfo.isperiod : YESNO[0].value ) : ''
              })(
                <SpecRadioGroup disabled={disabled}>
                {
                  YESNO.map(item => <Radio value={item.value} key={item.value}>{item.vname}</Radio>)
                }
                </SpecRadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>
        <OtherInspect setFieldsValue={setFieldsValue} disabled={disabled} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={''}></OtherInspect>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayoutBehind}
              colon={false}
              label="就诊类型："
              >
              {getFieldDecorator('casetype', {
                rules: [{ required: true, message: '请选择患者就诊类型!' }],
                initialValue:casetype.length ? ( preInfo.casetype ? preInfo.casetype : casetype[0].value ) : ''
              })(
                <SpecRadioGroup disabled={disabled}>
                {
                  casetype.map(item => <Radio key={item.value} value={item.value}>{item.vname}</Radio>)
                }
                </SpecRadioGroup>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayoutBehind}
              colon={false}
              label="就诊科室："
              >
              {getFieldDecorator('dept', {
                rules: [{ required: true, message: '请选择就诊科室!' }],
                initialValue: deptData.length ? ( preInfo.dept.key ? preInfo.dept : { key: deptData[0].deptid, label: deptData[0].deptname } ) : {key: '', label: ''}
              })(
                <SpecSelect disabled={disabled} onChange={e => this.getDocData(e.key)} labelInValue>
                {
                  deptData.map(item => <Option key={item.deptid} value={item.deptid}>{item.deptname}</Option>)
                }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayoutBehind}
              colon={false}
              label="接诊医生："
              >
              {getFieldDecorator('doctor', {
                rules: [{ required: true, message: '请输入接诊医生姓名!' }],
                initialValue: docData.length ? ( preInfo.doctor.key ? preInfo.doctor : { key: docData[0].orgUerid, label: docData[0].realname } ) : {key: '', label: ''}
              })(
                <SpecSelect disabled={disabled} labelInValue>
                {
                  docData.map(item => <Option key={item.orgUerid} value={item.orgUerid}>{item.realname}</Option>)
                }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
        </Row>
      </SpecForm>
    );
  }
}
const SpecForm = styled(Form)`
  &&& {
    padding: 40px 40px 20px 0px;
  }
  &&& > .ant-row > div > .ant-form-item {
    margin-bottom: 8px;
  }
`;
const SpecRadioGroup = styled(RadioGroup)`
  ${radioSty.borderRadioGroup}
`;
const SpecSelect = styled(Select)`
  ${selectSty.thinArrow}
`;
const PreTreatForm = Form.create()(Index);
export default PreTreatForm;
/*
@作者：姜中希
@日期：2018-09-21
@描述：诊前信息form
*/
