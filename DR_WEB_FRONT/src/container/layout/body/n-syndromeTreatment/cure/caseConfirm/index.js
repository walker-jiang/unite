import React, {Component, PropTypes} from 'react'; // react核心
import styled, { ThemeProvider } from 'styled-components';
import { Form, Radio, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';
import CaseType from './caseType';
import PrimarySymptom from './primarySymptom';
import OtherSymptom from './illHistory';
import IllHistory_allergy from './illHistory';
import ObserveCure from '../../../treatment/treatItem/writeMedicalRecords/formItem/observeCure';
import FeelCure from '../../../treatment/treatItem/writeMedicalRecords/formItem/feelCure';
import HabitusInspect from '../../../treatment/treatItem/writeMedicalRecords/formItem/habitusInspect';
import CarefulItem from './carefulItem';
import OtherInspect from '../../../treatment/treatItem/writeMedicalRecords/formItem/otherInspect';
const FormItem = Form.Item;

class CaseConfirm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRequired: true,
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
        isperiod: '', // 经期
        ispregnancy: '', //孕期
        gestationalWeeks: 1, // 怀孕月数
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hidePopComponent = this.hidePopComponent.bind(this);
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
            isperiod: res.data.isperiod, // 经期
            ispregnancy: res.data.ispregnancy, //孕期
            gestationalWeeks: res.data.gestationalWeeks, // 怀孕月数
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
        let isRequired = this.state.isRequired;
        if( isRequired ){
          if((typeof(values.pridepict) == 'object' && !values.pridepict.extractionData) || (typeof(values.pridepict) == 'string' && !values.pridepict)){
            this.tipModal.showModal({
              content: '主诉不能为空',
            });
            return;
          }

          if(typeof(values.hpi) == 'object' && !values.hpi.extractionData || typeof(values.hpi) == 'string' && !values.hpi){
            this.tipModal.showModal({
              content: '现病史不能为空',
            });
            return;
          }
        }
        this.props.onStep(2);
      }
    });
  }
  /**
   * [hidePopComponent 收起望诊、切诊弹框]
   * @param  {[type]} e    [事件源]
   * @param  {[type]} type [可以通过这个参数控制关闭哪一个]
   * @return {[type]}      [undefined]
   */
  hidePopComponent(e, type){
    if(type){
      if(type == 'feelCure'){
        this.fellCure.expand(e, false);
      }else{
        this.observeCure.expand(e, false);
      }
    }else{
      this.observeCure.expand(e, false);
      this.fellCure.expand(e, false);
    }
  };
  render() {
    const { getFieldDecorator, setFieldsValue, getFieldsValue } = this.props.form;
    const initData = this.state.initData;
    const isRequired = this.state.isRequired;
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
        <Container onClick={this.hidePopComponent}>
          <FormSpec onSubmit={this.handleSubmit}>
            <CaseType getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.casetype}></CaseType>
            <PrimarySymptom setFieldsValue={setFieldsValue} isRequired={isRequired} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: {}, extractionData: initData.treatprinciple}}/>
            <OtherSymptom title='现病史' isRequired={isRequired} getFieldDecorator={getFieldDecorator} isRequired={isRequired}  formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.otherSymptom}}/>
            <IllHistory_allergy title='过敏史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.allergyHis}}/>
            <ObserveCure camera={false} ref={ ref => { this.observeCure = ref }} hideFeelCure={this.hidePopComponent} setFieldsValue={setFieldsValue} getFieldsValue={getFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{urlArr: [], text: initData.inspection}}></ObserveCure>
            <FeelCure ref={ ref => { this.fellCure = ref }} hideObseverCure={this.hidePopComponent} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.palpation}></FeelCure>
            <HabitusInspect setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{temperature: initData.temperature, breath: initData.breath, pulse: initData.pulse, systolicPressure: initData.systolicPressure, diastolicPressure: initData.diastolicPressure, heightnum: initData.heightnum, weightnum: initData.weightnum}}></HabitusInspect>
            <CarefulItem getFieldDecorator={getFieldDecorator} initialValue={{ isperiod: initData.isperiod, ispregnancy: initData.ispregnancy, gestationalWeeks: initData.gestationalWeeks}}/>
            <OtherInspect setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.psycheck}></OtherInspect>
          </FormSpec>
          <SpecCheckbox readOnly={this.props.readOnly} onChange={() => { this.setState({ isRequired: !isRequired }) }}>忽略病情病历确认</SpecCheckbox>
          <SureButton type="primary" onClick={this.handleSubmit} readonly={this.props.readonly}>智能辩证</SureButton>
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
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
const SpecCheckbox = styled(Checkbox)`
  &&& {
    float: left;
    margin: 10px 0px;
    display: ${props => props.readOnly ? 'none' : 'block'};
  }
`;
const BorderButton = styled(Button)`
  ${buttonSty.white};
  &&& {
    display: ${props => props.readOnly ? 'none' : 'block'};
  }
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const SureButton = styled(Button)`
  float: left;
  ${buttonSty.semicircle};
  &&& {
    display: ${props => props.readOnly ? 'none' : 'block'};
  }
`;
/*
@作者：姜中希
@日期：2018-09-14
@描述：辨证论治-病情病历确认组件
*/
const CaseConfirmWrapper = Form.create()(CaseConfirm);
export default CaseConfirmWrapper;
