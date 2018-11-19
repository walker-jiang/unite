import React, {Component} from 'react';
import styled from 'styled-components';
import { Link, Prompt } from 'react-router-dom';
import { Form, Button, Row, Col, Tabs ,Modal,Input} from 'antd';
import Loadable from 'react-loadable'; // 加载时进行模块分离
import Icon from 'components/dr/icon';
import Loading from 'components/dr/loading';
import CaseType from '../formItem/caseType';
import MainSpeech from '../formItem/mainSpeech';
import IllHistory_present from '../formItem/illHistory';
import IllHistory_allergy from '../formItem/illHistory';
import IllHistory_pasthis from '../formItem/illHistory';
import IllHistory_personhis from '../formItem/illHistory';
import IllHistory_moHis from '../formItem/illHistory';
import IllHistory_familyhis from '../formItem/illHistory';
import ObserveCure from '../formItem/observeCure';
import FeelCure from '../formItem/feelCure';
import SmellCure from '../formItem/smellCure';
import Syndrome from '../formItem/syndrome';
import OtherInspect from '../formItem/otherInspect';
import HabitusInspect from '../formItem/habitusInspect';
import Diagnose from '../formItem/diagnose';
import CurePrinciple from '../formItem/curePrinciple';
import Treatway from '../formItem/treatway';
import DocAdvice from '../formItem/docAdvice';
import CarefulItem from '../formItem/carefulItem';
import TipModal from 'components/dr/modal/tip';
import CaseIndicator from '../leftModal/caseIndicator';
import ScrollArea from 'components/scrollArea';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';
import { getDiagnoseText } from 'commonFunc/transform';
import Template from "roots/rightAssistBar/medicalRecordWriting/medicalRecordTemplate.js";
import MedicalHistory from "roots/rightAssistBar/medicalRecordWriting/medicalHistory.js";
import BiofeedbckTherpy from "roots/rightAssistBar/medicalRecordWriting/BiofeedbckTherpy.js";
import AuxiliaryDiagnosis from "roots/rightAssistBar/medicalRecordWriting/auxiliaryDiagnosis.js";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const HocWriteMedicalRecordsForm = WrappedComponent =>
class HocWriteMedicalRecordsForm extends Component {
  render() {

    return (
      <Container>

      </Container>
    );
  }
}
const Container = styled.div`
  width: 100%;
  display: flex;
`;
const SpecForm = styled(Form)`
  &&& {
    width: calc(100% - 426px);
    padding-top: 2px;
  }
  & > div > .ant-row{
    padding-left: 20px;
    padding-right: 40px;
  }
  & > div > div > div > .ant-form-item{
    margin-bottom: 0px !important;
  }
`;
const Modals = styled.div`
  border: 1px solid rgba(204, 204, 204, 1);
  width: 426px;
`;
const SpecTabs = styled(Tabs)`
  .ant-tabs-nav-container {
    font-size: 13px;
  }
  .ant-tabs-nav-container-scrolling {
    padding: 0px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin: 0px;
    padding: 12px 25px;
  }
  .ant-tabs-ink-bar {
    width: 104px !important;
  }
  &&& .ant-tabs-content {
    border-top: 1px solid #C9C9C9;
    background-color: #F2F2F2;
    padding: 0px;
  }
`;
const SaveTip = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  div {
    padding: 0px;
  }
  span {
    color: #c467da;
  }
`;
const TipIcon = styled(Icon)`
  margin-right: 10px;
  margin-top: 5px;
`;
const BorderButton = styled(Button)`
  ${buttonSty.white}
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const Saving = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: space-around
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
const SpeModal =styled(Modal)`
  width: 600px !important;
   .ant-modal-content{
     border-top-left-radius: 14px  ;
     border-top-right-radius:14px ;
     .ant-modal-header{
       background-color: #0a6ecb !important;
       font-size: 14px;
       height: 36px; !important;
       border-top-left-radius: 13px;
       border-top-right-radius:13px;
       border-bottom:none !important;
       .ant-modal-title{
         line-height:3px;
         color: #fff !important;
       }
     }
     .ant-modal-close{
       .ant-modal-close-x{
          width: 24px !important;
          height: 24px !important;
          line-height: 24px !important;
          font-size: 16px;
          border-radius: 50%;
          background-color: #6ab5e4;
          margin-top: 6px;
          margin-right: 10px;
          color: #fff;
          text-align: center;
       }
       }
   }
`;
const FormItems =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 0px 20px;
`
const Inputs=styled(Input)`
  width: 436px !important;
`
/*
@作者：姜中希
@日期：2018-06-25
@描述：书写诊疗单界面, 滚动区域仅限于tabs内容
*/
const HocWriteMedicalRecords = Form.create()(HocWriteMedicalRecordsForm);
export default HocWriteMedicalRecordsForm;
