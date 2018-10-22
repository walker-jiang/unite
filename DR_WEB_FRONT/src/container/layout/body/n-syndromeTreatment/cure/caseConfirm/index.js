import React, {Component, PropTypes} from 'react'; // react核心
import styled, { ThemeProvider } from 'styled-components';
import { Form, Radio, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import CaseType from './caseType';
import PrimarySymptom from './primarySymptom';
import OtherSymptom from './illHistory';
import IllHistory_allergy from './illHistory';
import ObserveCure from './observeCure';
import FeelCure from './feelCure';
import HabitusInspect from '../../../treatment/treatItem/writeMedicalRecords/formItem/habitusInspect';
import CarefulItem from './carefulItem';
import OtherInspect from '../../../treatment/treatItem/writeMedicalRecords/formItem/otherInspect';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      initData: {
        casetype: '1', // 就诊类型
        treatprinciple: '', // 主症
        otherSymptom: '', //其它症状
        allergyHis: '', //过敏史
        inspection: '', // 望诊
        palpation: '', // 脉诊
        temperature: '', //体温
        breath: '', // 呼吸
        pulse: '', // 脉搏
        systolicPressure: '', // 收缩压
        diastolicPressure: '', // 舒张压
        heightnum: '' , // 身高
        weightnum: '', // 体重
        psycheck: '', // 其它
      },
    };
  };
  componentWillMount(){
    this.getSyndromeData(this.props.registerid);
  };
  getSyndromeData(registerid){
    let self = this;
    let params = {
      url: 'BuPatientCaseController/getData',
      server_url: config_InteLigenTreat_url + 'TCMAE/',
      data: {
        registerid: registerid
      },
    };
    function callBack(res){
      if(res.result){
        if(res.data){
          let initData = {
            casetype: res.data.casetype, // 就诊类型
            treatprinciple: res.data.pridepict, // 主症
            otherSymptom: res.data.hpi, //其它症状
            allergyHis: res.data.allergichistory, //过敏史
            inspection: res.data.inspection, // 望诊
            palpation: res.data.palpation, // 脉诊
            temperature: res.data.temperature, //体温
            breath: res.data.breath, // 呼吸
            pulse: res.data.pulse, // 脉搏
            systolicPressure: res.data.systolicPressure, // 收缩压
            diastolicPressure: res.data.diastolicPressure, // 舒张压
            heightnum: res.data.heightnum , // 身高
            weightnum: res.data.weightnum, // 体重
            psycheck: res.data.psycheck, // 其它
          };
          self.setState({ initData });
        }else{
        }
      }
    };
    ajaxGetResource(params, callBack);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // let self = this;
        // let params = {
        //   url: 'BuPatientCaseController/' + (initData.billid ? 'putData' : 'postData'),
        //   data: {},
        //   type: initData.billid ? 'put' : 'post',
        // };
        // function callBack(res){
        //   if(res.result){
        //
        //   }else{
        //     console.log('异常响应信息', res);
        //   }
        // };
        // ajaxGetResource(params, callBack);
      }
    });
  }
  render() {
    const { getFieldDecorator, setFieldsValue, getFieldsValue } = this.props.form;
    const initData = this.state.initData;
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
        <Container >
          <FormSpec>
            <CaseType getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.casetype}></CaseType>
            <PrimarySymptom setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: {}, extractionData: initData.treatprinciple}}/>
            <OtherSymptom title='其它症状' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.otherSymptom}}/>
            <IllHistory_allergy title='过敏史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.allergyHis}}/>
            <ObserveCure setFieldsValue={setFieldsValue} getFieldsValue={getFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{urlArr: [], text: initData.inspection}}></ObserveCure>
            <FeelCure setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.palpation}></FeelCure>
            <HabitusInspect setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{temperature: initData.temperature, breath: initData.breath, pulse: initData.pulse, systolicPressure: initData.systolicPressure, diastolicPressure: initData.diastolicPressure, heightnum: initData.heightnum, weightnum: initData.weightnum}}></HabitusInspect>
            <CarefulItem getFieldDecorator={getFieldDecorator} initialValue={{originData: [], extractionData: initData.allergyHis}}/>
            <OtherInspect setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.psycheck}></OtherInspect>
          </FormSpec>
          <Checkbox>忽略病情病历确认</Checkbox>
          <SureButton type="primary" onClick={() => {this.props.onStep(2)}}>智能辩证</SureButton>
          <BorderButton type="primary" onClick={() => {this.props.onStep(0)}}>返回上一步</BorderButton>
        </Container>
    )
  }
}

const Container = styled.div`
  width:100%;
  height: 100%;
  padding: 30px;
`;
const FormSpec = styled(Form)`
  border: 1px solid #CCCCCC;
  &&&.ant-form {
     padding: 20px 90px 20px 20px;
     height: calc(100% - 30px);
     overflow: scroll;
     ::-webkit-scrollbar {
       display: none;
     }
  }
  & > div > div > div > .ant-form-item{
    margin-bottom: 0px !important;
  }
`;
const Exsaple = styled.img``;
const BorderButton = styled(Button)`
  ${buttonSty.white}
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
/*
@作者：姜中希
@日期：2018-09-14
@描述：辨证论治-病情病历确认组件
*/
const CaseConfirm = Form.create()(Index);
export default CaseConfirm;
