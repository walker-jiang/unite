import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Icon, Button, Row, Col, Tabs } from 'antd';
import Loading from 'components/dr/loading';
import CaseType from './formItem/caseType';
import MainSpeech from './formItem/mainSpeech';
import IllHistory_present from './formItem/illHistory';
import IllHistory_allergy from './formItem/illHistory';
import IllHistory_pasthis from './formItem/illHistory';
import IllHistory_personhis from './formItem/illHistory';
import IllHistory_moHis from './formItem/illHistory';
import IllHistory_familyhis from './formItem/illHistory';
import ObserveCure from './formItem/observeCure';
import FeelCure from './formItem/feelCure';
import SmellCure from './formItem/smellCure';
import Syndrome from './formItem/syndrome';
import OtherInspect from './formItem/otherInspect';
import HabitusInspect from './formItem/habitusInspect';
import Diagnose from './formItem/diagnose';
import CurePrinciple from './formItem/curePrinciple';
import DocAdvice from './formItem/docAdvice';
import CaseIndicator from './leftModal/caseIndicator';
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

const TabPane = Tabs.TabPane;
const bodyHeight = document.body.clientHeight;
const FormItem = Form.Item;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      saved: 0, //是否点击保存按钮, 0未保存 1 保存中 2 保存成功
      tabIndex: 1, // 当前tab
      caseItems: [], // 病历指标项
      initData: {
        "allergichistory": '',//过敏史
        "billid": '',
        "breath": '',//呼吸
        "buDiagnosisInfo": {},//诊断
        "buTargetChooseList": [],
        "casetype": '',
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
    this.changeCaseItem = this.changeCaseItem.bind(this);
    this.changeTabs = this.changeTabs.bind(this);
  };
  /** [getIndicator 获取病历指标项目] */
  getIndicator(){
    let self = this;
    let params = {
      url: 'BaTargetController/getPerList',
      data: {
        orgid: window.sessionStorage.getItem('orgid'),
        deptid: window.sessionStorage.getItem('deptid'),
        doctorid: window.sessionStorage.getItem('userid'),
        targettype: '01'
      },
    };
    function callBack(res){
      if(res.result){
        let caseItems = res.data;
        self.setState({caseItems});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getCaseData 初始化病历数据] */
  getCaseData(){
    let self = this;
    let params = {
      url: 'BuPatientCaseController/getData',
      data: {
        registerid: window.registerID
      },
    };
    function callBack(res){
      if(res.result && res.data){
        let initData = res.data;
        self.setState({ initData });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  componentWillMount(){
    this.getIndicator();
    this.getCaseData();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let { caseItems, initData } = this.state;
        let selectedItems = new Array();
        caseItems.forEach((item) => {
          if(item.isChoose == '01'){
            let selectedItem = {
              chooselevel: '03', // 指标类型 个人
              deptid: window.sessionStorage.getItem('deptid'),
              doctorid: window.sessionStorage.getItem('userid'),
              orgid: window.sessionStorage.getItem('orgid'),
              targetid: item.targetid,
              targettype: '01', //病历指标
            };
            selectedItems.push(selectedItem);
          }
        });
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
          casetype: values.casetype1,
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
        function callBack(res){
          if(res.result){
            setTimeout(function(){
              self.setState({
                saved: 2,
              }, ()=>{
                setTimeout(function(){
                  self.setState({
                    saved: 0,
                  });
                }, 1000);
              });
            },2000);
          }else{
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
  getString(obj = ''){
    return obj.extractionData || obj.extractionData == '' ? obj.extractionData : obj;
  };
  /**
   * [changeCaseItem 改变病历指标项目]
   * @param  {[type]} itemType [项目类型]
   * @param  {[type]} status   [更改状态]
   * @return {[type]}          [undefined]
   */
  changeCaseItem(itemType, status){
    let caseItems = this.state.caseItems;
    console.log('改变指标项', caseItems);
    caseItems.forEach((item) => {
      if(item.targetid == itemType){
        item.isChoose = status ? '01' : '02';
      }
    });
    this.setState({ caseItems });
  };
  /**
   * [changeTabs 改变右侧病历指标栏目]
   * @param  {[type]} index [当前tabs]
   * @return {[type]}       [undefined]
   */
  changeTabs(index){
    this.setState({
      tabIndex: index
    });
  };
  /**
   * [changeTabs 左右联动]
   * @param  {[type]} initData
   */
  changeInitData = (initData) =>{
    console.log('initData', initData);
    this.setState({initData})
  }
  /**
   * [changeTabs 左右联动]
   * @param  {[type]} initData
   */
  changeInitDataTwo = (buDiagnosisInfo) =>{
    var initData = this.state.initData;
    initData['buDiagnosisInfo'] = buDiagnosisInfo;
    this.setState({initData});
  }
  render() {
    let { saved, caseItems, tabIndex, initData } = this.state;
    const { getFieldDecorator, setFieldsValue, getFieldsValue } = this.props.form;
    let { pridepict = '', hpi = '', inspection = '', palpation = '', smelling = '' } = getFieldsValue();
    let listenFormData =  {
      pridepict: this.getString(pridepict),
      hpi: this.getString(hpi),
      inspection: this.getString(inspection),
      palpation: this.getString(palpation),
      smelling: this.getString(smelling),
    };
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
     if(initData.facephoto != '' && initData.facephoto){
       tongueUrls.push(initData.facephoto);
     }
     if(initData.sidephoto != '' && initData.sidephoto){
       tongueUrls.push(initData.sidephoto);
     }
    return (
      <Container>
        <SpecForm onSubmit={this.handleSubmit} >
          <ScrollArea height={140}>
          {
            caseItems.map((item, index) => {
              if(item.targetid == 1 && item.isChoose == '01'){
                return <CaseType key={index} changeTabs={this.changeTabs} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.casetype}></CaseType>
              }
              if(item.targetid == 2 && item.isChoose == '01'){
                return <MainSpeech key={index} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.pridepict}}/>
              }
              if(item.targetid == 3 && item.isChoose == '01'){
                return <IllHistory_present key={index} title='现病史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.hpi}}/>
              }
              if(item.targetid == 4 && item.isChoose == '01'){
                return <IllHistory_allergy key={index} title='过敏史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.allergichistory}}/>
              }
              if(item.targetid == 5 && item.isChoose == '01'){
                return <IllHistory_pasthis key={index} title='既往史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.pasthistory}}/>
              }
              if(item.targetid == 6 && item.isChoose == '01'){
                return <IllHistory_personhis key={index} title='个人史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.personhistory}}/>
              }
              if(item.targetid == 7 && item.isChoose == '01'){
                return <IllHistory_moHis key={index} title='月经婚育史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.moHistory}}/>
              }
              if(item.targetid == 8 && item.isChoose == '01'){
                return <IllHistory_familyhis key={index} title='家族史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: [], extractionData: initData.familyhistory}}/>
              }
              if(item.targetid == 9 && item.isChoose == '01'){
                return <ObserveCure key={index} setFieldsValue={setFieldsValue} getFieldsValue={getFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{urlArr: tongueUrls, text: initData.inspection}}></ObserveCure>
              }
              if(item.targetid == 10 && item.isChoose == '01'){
                return <FeelCure key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.palpation}></FeelCure>
              }
              if(item.targetid == 11 && item.isChoose == '01'){ // 小儿脉象
              }
              if(item.targetid == 12 && item.isChoose == '01'){
                return <SmellCure key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.smelling}></SmellCure>
              }
              if(item.targetid == 13 && item.isChoose == '01'){
                return <Syndrome key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: {}, extractionData: initData.syndrome}}></Syndrome>
              }
              if(item.targetid == 14 && item.isChoose == '01'){
                return <HabitusInspect key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{temperature: initData.temperature, breath: initData.breath, pulse: initData.pulse, systolicPressure: initData.systolicPressure, diastolicPressure: initData.diastolicPressure, heightnum: initData.heightnum, weightnum: initData.weightnum}}></HabitusInspect>
              }
              if(item.targetid == 15 && item.isChoose == '01'){
                return <OtherInspect key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.psycheck}></OtherInspect>
              }
              if(item.targetid == 16 && item.isChoose == '01'){
                return <Diagnose key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: initData.buDiagnosisInfo && JSON.stringify(initData.buDiagnosisInfo) != '{}' ? initData.buDiagnosisInfo.buDiagnosisList : [], extractionData: getDiagnoseText(initData.buDiagnosisInfo && JSON.stringify(initData.buDiagnosisInfo) != '{}'  ? initData.buDiagnosisInfo.buDiagnosisList : [])}}></Diagnose>
              }
              if(item.targetid == 17 && item.isChoose == '01'){
                return <CurePrinciple key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{originData: {}, extractionData: initData.treatprinciple}}></CurePrinciple>
              }
              if(item.targetid == 18 && item.isChoose == '01'){
                return <DocAdvice key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.suggession}></DocAdvice>
              }
            })
          }
          {
            !caseItems.length ? null :
            <Row>
              <Col span={14}>
                <SureButton type="primary" htmlType="submit" disabled={!window.modifyPermission}>保存</SureButton>
                <BorderButton type="primary" onClick={this.handleReset}>打印</BorderButton>
                <BorderButton type="primary" onClick={this.handleReset}>另存成模板</BorderButton>
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
                      <Success type="check-circle"/>
                      <span>诊疗单保存成功</span>
                    </SaveTip>
                  )
                }
              </Saving>
            </Row>
          }
          </ScrollArea>
        </SpecForm>
        <Modal>
        {
          tabIndex == 1 ?
          (
            <SpecTabs key='1' defaultActiveKey='1' animated={false}>
              <TabPane tab="病历模板" key="1">
                <Template changeInitData={this.changeInitData} listenFormData={listenFormData}/>
              </TabPane>
              <TabPane tab="历史病历" key="2">
                <MedicalHistory changeInitData={this.changeInitData}/>
              </TabPane>
              <TabPane tab="辅助诊断" key="3">
                <AuxiliaryDiagnosis changeInitDataTwo={this.changeInitDataTwo} listenFormData={listenFormData}/>
              </TabPane>
              <TabPane tab="病历指标" key="4">
                <CaseIndicator changeCaseItem={this.changeCaseItem} caseItems={caseItems}></CaseIndicator>
              </TabPane>
            </SpecTabs>
          ) :
          (
            <SpecTabs key='2' defaultActiveKey='2'animated={false}>
              <TabPane tab="历史病历" key="1">
                <MedicalHistory/>
              </TabPane>
              <TabPane tab="治疗反馈" key="2">
                <BiofeedbckTherpy/>
              </TabPane>
              <TabPane tab="病历模板" key="3">
                <Template changeInitData={this.changeInitData} listenFormData={listenFormData}/>
              </TabPane>
              <TabPane tab="病历指标" key="4">
                <CaseIndicator changeCaseItem={this.changeCaseItem} caseItems={caseItems}></CaseIndicator>
              </TabPane>
            </SpecTabs>
          )
        }
        </Modal>
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
const Success = styled(Icon)`
  margin-right: 10px;
  &::before {
    color: #e6981e;
  }
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
/*
@作者：姜中希
@日期：2018-06-25
@描述：书写诊疗单界面, 滚动区域仅限于tabs内容
*/
const TreatmentList = Form.create()(Index);
export default TreatmentList;
