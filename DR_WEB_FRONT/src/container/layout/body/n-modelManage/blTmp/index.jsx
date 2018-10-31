import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Icon, Button, Row, Col, Tabs } from 'antd';
import Loading from 'components/dr/loading';
import TmpName from '../TmpName';
import MainSpeech from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/mainSpeech';
import IllHistory_present from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_allergy from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_pasthis from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_personhis from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_moHis from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_familyhis from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import ObserveCure from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/observeCure';
import FeelCure from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/feelCure';
import SmellCure from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/smellCure';
import Syndrome from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/syndrome';
import OtherInspect from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/otherInspect';
import HabitusInspect from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/habitusInspect';
import Diagnose from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/diagnose';
import CurePrinciple from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/curePrinciple';
import DocAdvice from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/docAdvice';
import CaseIndicator from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/leftModal/caseIndicator';
import ScrollArea from 'components/scrollArea';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';
import { getDiagnoseText } from 'commonFunc/transform';
import Template from "roots/rightAssistBar/medicalRecordWriting/medicalRecordTemplate.js";
import MedicalHistory from "roots/rightAssistBar/medicalRecordWriting/medicalHistory.js";
import BiofeedbckTherpy from "roots/rightAssistBar/medicalRecordWriting/BiofeedbckTherpy.js";
import AuxiliaryDiagnosis from "roots/rightAssistBar/medicalRecordWriting/auxiliaryDiagnosis.js";
import DoctorAdviceTemplate from "roots/rightAssistBar/doctorAdvice/doctorAdviceTemplate.js";
import IntelligentTreat from "roots/rightAssistBar/doctorAdvice/intelligentTreat.js";

import { getBLData } from '../service';

const TabPane = Tabs.TabPane;
const bodyHeight = document.body.clientHeight;
const FormItem = Form.Item;

class BLTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: 0, //是否点击保存按钮, 0未保存 1 保存中 2 保存成功
      tabIndex: 1, // 当前tab
      initData: {
        "allergichistory": '',//过敏史
        "billid": '',
        "breath": '',//呼吸
        "buDiagnosisInfo": {},//诊断
        "buTargetChooseList": [],
        "chfingerprint": '',
        "deptid": '',
        "diastolicPressure": '',//舒张压
        "doctorid": '',
        "doctorname": '',
        "familyhistory": '',//家族史
        "heightnum": '',//身高
        "hpi": '',//现病史
        "inspection": '',//望诊
        "facephoto": '', // 舌头图片
        "sidephoto": '', // 舌头图片
        "moHistory": '',//月经婚育史
        "orgid": '',
        "palpation": '',//切诊
        "pasthistory": '',//既往史
        "personhistory": '',//个人史
        "pridepict": '',//主诉
        "psycheck": '',//其他检查
        "pulse": '',//脉搏
        "registerid": '',
        "smelling": '',//闻诊
        "suggession": '',//医生建议
        "syndrome": '',//辩证要点
        "systolicPressure": '',//收缩压
        "temperature": '',//体温
        "treatprinciple": '',//治疗原则
        "treatway": '',//治疗方法
        "weightnum": '',//体重
      }, // 修改前的初始化数据
    };
  };
  /** [getCaseData 初始化病历数据] */
  getCaseData = () => {
    const { paramData } = this.props;
    if(getBLData) {
      getBLData(paramData? paramData: {}).then((data) => {
        this.setState({initData: data.data});
      });
    }
  };
  componentWillMount() {
    this.getCaseData();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let { caseItems, initData } = this.state;
        let selectedItems = new Array();
        let buDiagnosisInfo = initData.buDiagnosisInfo ? initData.buDiagnosisInfo : {};
        buDiagnosisInfo.buDiagnosisList = values.diagnose.originData;
        buDiagnosisInfo.cardno = window.cardno;
        buDiagnosisInfo.deptid = window.sessionStorage.getItem('deptid');
        buDiagnosisInfo.diagnosisDesc = "诊断描述";
        buDiagnosisInfo.doctorid = window.sessionStorage.getItem('userid');
        buDiagnosisInfo.orgid = window.sessionStorage.getItem('orgid');
        buDiagnosisInfo.patientid = window.patientID;
        buDiagnosisInfo.patientname = window.patientName;
        buDiagnosisInfo.patientno = "test";
        buDiagnosisInfo.registerid = window.registerID;
        buDiagnosisInfo.registerno = "12312";
        let finalObj = {
          allergichistory: this.getString(values.allergichistory),
          breath: values.breath,
          buDiagnosisInfo: buDiagnosisInfo,
          deptid: window.sessionStorage.getItem('deptid'),
          diastolicPressure: values.diastolicPressure,
          doctorid: window.sessionStorage.getItem('userid'),
          doctorname: window.sessionStorage.getItem('username'),
          familyhistory: this.getString(values.familyhistory),
          hpi: this.getString(values.hpi),
          inspection: this.getString(values.inspection),
          moHistory: this.getString(values.moHistory),
          orgid: window.sessionStorage.getItem('orgid'),
          palpation: this.getString(values.palpation),
          pasthistory: this.getString(values.pasthistory),
          personhistory: this.getString(values.personhistory),
          pridepict: this.getString(values.pridepict),
          pulse: values.pulse,
          registerid: window.registerID,
          smelling: values.smelling,
          suggession: values.suggession,
          syndrome: this.getString(values.syndrome),
          systolicPressure: values.systolicPressure,
          temperature: values.temperature,
          treatprinciple: this.getString(values.treatprinciple),
          heightnum: values.heightnum,
          weightnum: values.weightnum,
          psycheck: values.psycheck,
          buTargetChooseList: selectedItems,
          facephoto: values.inspectionPicture[0],
          sidephoto: values.inspectionPicture[1]
        };
        Object.assign(initData, finalObj);
        let self = this;
        this.setState({
          saved: 1
        });
        let params = {
          url: 'BuPatientCaseController/' + (initData.billid ? 'putData' : 'postData'),
          data: JSON.stringify(initData),
          type: initData.billid ? 'put' : 'post',
        };
        function callBack(res) {
          if (res.result) {
            setTimeout(function () {
              self.setState({
                saved: 2,
              }, () => {
                setTimeout(function () {
                  self.setState({
                    saved: 0,
                  });
                }, 1000);
              });
            }, 2000);
          } else {
            console.log('异常响应信息', res);
          }
        };
        ajaxGetResource(params, callBack);
      }
    });
  }
  /**
   * [getString 获取form表单项中对象中的文本]
   * @param  {String} [obj=''] [表单对象]
   * @return {[type]}          [最终文本]
   */
  getString(obj = '') {
    return obj.extractionData || obj.extractionData == '' ? obj.extractionData : obj;
  };

  render() {
    const { newTmp } = this.props;
    let { saved, caseItems, tabIndex, initData } = this.state;
    const { getFieldDecorator, setFieldsValue, getFieldsValue } = this.props.form;
    let { pridepict = '', hpi = '', inspection = '', palpation = '', smelling = '' } = getFieldsValue();
    // let listenFormData = {
    //   pridepict: this.getString(pridepict),
    //   hpi: this.getString(hpi),
    //   inspection: this.getString(inspection),
    //   palpation: this.getString(palpation),
    //   smelling: this.getString(smelling),
    // };
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
    // 患者本人舌头图片
    let tongueUrls = [];
    if (initData.facephoto != '' && initData.facephoto) {
      tongueUrls.push(initData.facephoto);
    }
    if (initData.sidephoto != '' && initData.sidephoto) {
      tongueUrls.push(initData.sidephoto);
    }
    return (
      <Container>
        <Header><Title><ArrowIcon type='right_arrow'/>病历模板/新增病历模板</Title></Header>
        <Content>
          <SpecForm onSubmit={this.handleSubmit} >
            <ScrollArea height={140}>
              <TmpName getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} />
              <MainSpeech getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.pridepict }} />
              <IllHistory_present title='现病史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.hpi }} />
              <IllHistory_allergy title='过敏史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.allergichistory }} />
              <IllHistory_pasthis title='既往史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.pasthistory }} />
              <IllHistory_personhis title='个人史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.personhistory }} />
              <IllHistory_moHis title='月经婚育史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.moHistory }} />
              <IllHistory_familyhis title='家族史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.familyhistory }} />
              <ObserveCure setFieldsValue={setFieldsValue} getFieldsValue={getFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ urlArr: tongueUrls, text: initData.inspection }}></ObserveCure>
              <FeelCure setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.palpation}></FeelCure>
              <SmellCure setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.smelling}></SmellCure>
              <Syndrome setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: {}, extractionData: initData.syndrome }}></Syndrome>
              <HabitusInspect setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ temperature: initData.temperature, breath: initData.breath, pulse: initData.pulse, systolicPressure: initData.systolicPressure, diastolicPressure: initData.diastolicPressure, heightnum: initData.heightnum, weightnum: initData.weightnum }}></HabitusInspect>
              <OtherInspect setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.psycheck}></OtherInspect>
              <Diagnose setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: initData.buDiagnosisInfo && JSON.stringify(initData.buDiagnosisInfo) != '{}' ? initData.buDiagnosisInfo.buDiagnosisList : [], extractionData: getDiagnoseText(initData.buDiagnosisInfo && JSON.stringify(initData.buDiagnosisInfo) != '{}' ? initData.buDiagnosisInfo.buDiagnosisList : []) }}></Diagnose>
              <CurePrinciple setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: {}, extractionData: initData.treatprinciple }}></CurePrinciple>
              <DocAdvice setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.suggession}></DocAdvice>
              <Row>
                <Col span={14}>
                  <SureButton type="primary" htmlType="submit" disabled={!window.modifyPermission}>保存</SureButton>
                  {/* <BorderButton type="primary" onClick={this.handleReset}>打印</BorderButton> */}
                  <BorderButton type="primary" onClick={this.handleReset}>保存模板</BorderButton>
                  <Button onClick={() => newTmp('fl')}>返回</Button>
                </Col>
                <Saving span={10}>
                  {
                    saved == 0 ? null :
                      (
                        saved == 1 ?
                          <SaveTip>
                            <Loading loading={true}><span>正在保存诊疗单数据，请稍后</span></Loading>
                          </SaveTip>
                          :
                          <SaveTip>
                            <Success type="check-circle" />
                            <span>诊疗单保存成功</span>
                          </SaveTip>
                      )
                  }
                </Saving>
              </Row>
            </ScrollArea>
          </SpecForm>
        </Content>
      </Container >
    );
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(242, 242, 242, 1);
  padding: 0px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 1px 1px 5px;
`;
const Title = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const ArrowIcon = styled(Icon)`
  height: 32px;
  width: 18px;
  margin-top: 5px;
`;
const Content = styled.div`
  width: 100%;
  position: relative;
`;
const SpecForm = styled(Form) `
  &&& {
    width: calc(100% - 426px);
  }
  & > div > .ant-row{
    padding-left: 20px;
    padding-right: 40px;
  }
  & > div > div > div > .ant-form-item{
    margin-bottom: 0px !important;
  }
`;
const Modal = styled.div`
  border: 1px solid rgba(204, 204, 204, 1);
  width: 426px;
`;
const SpecTabs = styled(Tabs) `
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
const Success = styled(Icon) `
  margin-right: 10px;
  &::before {
    color: #e6981e;
  }
`;
const BorderButton = styled(Button) `
  ${buttonSty.white}
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const Saving = styled(Col) `
  display: flex;
  align-items: center;
  justify-content: space-around
`;
const SureButton = styled(Button) `
  ${buttonSty.semicircle}
`;

const TreatmentList = Form.create()(BLTmp);
export default TreatmentList;
