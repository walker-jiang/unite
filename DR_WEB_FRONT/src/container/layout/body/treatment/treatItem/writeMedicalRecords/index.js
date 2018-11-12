import React, {Component} from 'react';
import styled from 'styled-components';
import { Link, Prompt } from 'react-router-dom';
import { Form, Button, Row, Col, Tabs ,Modal,Input} from 'antd';
import Loadable from 'react-loadable'; // 加载时进行模块分离
import Icon from 'components/dr/icon';
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
import CarefulItem from './formItem/carefulItem';
import TipModal from 'components/dr/modal/tip';
import CaseIndicator from './leftModal/caseIndicator';
import ScrollArea from 'components/scrollArea';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';
import { getDiagnoseText } from 'commonFunc/transform';
// import Template from "roots/rightAssistBar/medicalRecordWriting/medicalRecordTemplate.js";
// import MedicalHistory from "roots/rightAssistBar/medicalRecordWriting/medicalHistory.js";
// import BiofeedbckTherpy from "roots/rightAssistBar/medicalRecordWriting/BiofeedbckTherpy.js";
// import AuxiliaryDiagnosis from "roots/rightAssistBar/medicalRecordWriting/auxiliaryDiagnosis.js";

const loadingComponent = () => (<div>Loading...</div>);
const Template = Loadable({
  loader: () => import('roots/rightAssistBar/medicalRecordWriting/medicalRecordTemplate.js'),
  loading: loadingComponent,
});
const MedicalHistory = Loadable({
  loader: () => import('roots/rightAssistBar/medicalRecordWriting/medicalHistory.js'),
  loading: loadingComponent,
});const BiofeedbckTherpy = Loadable({
  loader: () => import('roots/rightAssistBar/medicalRecordWriting/BiofeedbckTherpy.js'),
  loading: loadingComponent,
});const AuxiliaryDiagnosis = Loadable({
  loader: () => import('roots/rightAssistBar/medicalRecordWriting/auxiliaryDiagnosis.js'),
  loading: loadingComponent,
});

const TabPane = Tabs.TabPane;
const bodyHeight = document.body.clientHeight;
const FormItem = Form.Item;

class WriteMedicalRecords extends Component {
  constructor(props){
    super(props);
    this.state = {
      saved: 0, //是否点击保存按钮, 0未保存 1 保存中 2 保存成功
      tabIndex: '', // 当前tab
      caseItems: [], // 病历指标项
      temname:'',
      initData: {
        "allergichistory": '',//过敏史
        "billid": '',
        "breath": '',//呼吸
        "buDiagnosisInfo": {},//诊断
        "buTargetChooseList": [],
        "casetype": '',
        "chfingerprint": '',
        "deptcode": '',
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
        "isperiod": '', // 经期
        "ispregnancy": '', //孕期
        gestationalWeeks: 1, // 怀孕月数
      }, // 修改前的初始化数据
      finalObj:'',
    };
    this.changeCaseItem = this.changeCaseItem.bind(this);
    this.changeTabs = this.changeTabs.bind(this);
    this.hidePopComponent = this.hidePopComponent.bind(this);
  };
  /** [getIndicator 获取病历指标项目] */
  getIndicator(){
    let self = this;
    let params = {
      url: 'BaTargetController/getPerList',
      data: {
        orgid: window.sessionStorage.getItem('orgid'),
        deptcode: window.sessionStorage.getItem('deptid'),
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
        registerid: window.registerID,
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
        console.log('diagnose', values.diagnose);
        if((typeof(values.diagnose) == 'object' && !values.diagnose.extractionData) || (typeof(values.diagnose) == 'string' && !values.diagnose)){
          this.tipModal.showModal({
            content: '诊断不能为空',
          });
          return;
        }
        let { caseItems, initData } = this.state;
        let selectedItems = new Array();
        caseItems.forEach((item) => {
          if(item.isChoose == '01'){
            let selectedItem = {
              chooselevel: '03', // 指标类型 个人
              deptcode: window.sessionStorage.getItem('deptid'),
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
        buDiagnosisInfo.deptcode = window.sessionStorage.getItem('deptid');
        buDiagnosisInfo.diagnosisDesc = "诊断描述";
        buDiagnosisInfo.doctorname = window.sessionStorage.getItem('username');
        buDiagnosisInfo.doctorid = window.sessionStorage.getItem('userid');
        buDiagnosisInfo.orgid = window.sessionStorage.getItem('orgid');
        buDiagnosisInfo.patientid = window.patientID;
        buDiagnosisInfo.patientname = window.patientName;
        buDiagnosisInfo.patientno = "test";
        buDiagnosisInfo.registerid = window.registerID;
        buDiagnosisInfo.registerno = "12312";
        let finalObj = {
          casetype: values.casetype,
          allergichistory: this.getString(values.allergichistory),
          breath: values.breath,
          buDiagnosisInfo: buDiagnosisInfo,
          deptcode: window.sessionStorage.getItem('deptid'),
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
          sidephoto: values.inspectionPicture[1],
          isperiod: values.isperiod,
          ispregnancy: values.ispregnancy,
          gestationalWeeks: values.gestationalWeeks,
        };
        Object.assign(initData, finalObj);
        let self = this;
        this.setState({
          saved: 1,
          finalObj:finalObj
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
            setTimeout(function(){
              self.setState({
                saved: 3,
              }, ()=>{
                setTimeout(function(){
                  self.setState({
                    saved: 0,
                  });
                }, 1000);
              });
            },2000);
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
  changeInitData = (param) =>{
    // console.log("左右联动initData",param);
    // console.log("this.state.initData",this.state.initData);
    // var initData = this.state.initData;
    // var key;
    // for(key in param){
    //   if(key in initData){
    //     initData[key] = param[key];
    //   }
    // }
    // console.log("修改后的",initData);
    this.props.form.setFieldsValue(param);
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
  /** [showModal 展示对话框] */
  showModal = () => {
   // this.getbuTempletManageList();
   this.setState({
     visible: true,
   });
 }
/** [handleOk 关闭对话框] */
 handleOk = (e) => {
   console.log(e);
   this.setState({
     visible: false,
   });
 }
/** [handleCancel 关闭对话框] */
 handleCancel = (e) => {
   console.log(e);
   this.setState({
     visible: false,
   });
 }
 /** [postModal 拿到模板列表的数据/拿到我的模板的详情] */
 // getbuTempletManageList=()=>{
 //   let params = {
 //     url: 'BuTempletManageController/getList',
 //     data: {
 //          personid:window.sessionStorage.getItem('userid'),
 //          orgid:window.sessionStorage.getItem('orgid'),
 //          temtype:'0'
 //     },
 //     type: 'get',
 //   };
 //   function callBack(res){
 //     if(res.result){
 //       console.log('模板列表数据',res)
 //     }else{
 //       console.log('异常响应信息', res);
 //     }
 //   };
 //   ajaxGetResource(params, callBack);
 // }
 /** [postModal 添加诊疗模板信息] */
 postModal=()=>{
  let data={
    "allergichistory": "1",
    "billid": 0,
    "breath": 0,
    "buDiagnosisInfoTemplet": {
        "buDiagnosisTempletList": [
            {
                "buDiagnosisDismainfTempletList": [
                    {
                      "ctstamp": "2018-10-22T03:36:17.854Z",
                      "diagnosisid": 0,
                      "diseaseid": 0,
                      "id": 0,
                      "manifcode": "1",
                      "manifdesc": "1",
                      "manifid": 0,
                      "manifname": "1",
                      "registerid": window.registerID,
                      "useflag": "1",
                      "utstamp": "2018-10-22T03:36:17.854Z"
                    }
                ],
                "cmDiagnosisType": 0,
                "codetype": "1",
                "ctstamp": "2018-10-22T03:36:17.854Z",
                "diagnosisCode": 0,
                "diagnosisName": "1",
                "diagnosisNo": 0,
                "diagnosisType": 0,
                "diagnosisWay": 0,
                "diagnosisid": 0,
                "discode": "1",
                "disdesc": "1",
                "diseaseid": 0,
                "disname": "1",
                "doubtDiaType": "1",
                "mainDiaType": "1",
                "registerid":window.registerID,
                "seqno": 0,
                "temmanageid": 0,
                "useflag": "1",
                "utstamp": "2018-10-22T03:36:17.855Z"
            }
        ],
        "cardno": "1",
        "ctstamp": "2018-10-22T03:36:17.855Z",
        "deptcode": 0,
        "diagnosisDesc": "1",
        "doctorid": 0,
        "doctorname": "1",
        "id": 0,
        "orgid": window.sessionStorage.getItem('orgid'),
        "patientid":   window.sessionStorage.getItem('userid'),
        "patientname":  window.sessionStorage.getItem('username'),
        "patientno": "1",
        "registerid": 0,
        "registerno": "1",
        "temmanageid": 0,
        "useflag": "1",
        "utstamp": "2018-10-22T03:36:17.855Z"
    },
    "buTempletManage": {
        "buTempletManageList": [  {}   ],
        "cityid": 0,
        "createuserName": window.sessionStorage.getItem('username'),
        "creatuserid":  window.sessionStorage.getItem('userid'),
        "ctstamp": "2018-10-22T03:36:17.855Z",
        "diseaseid": 0,
        "distid": 0,
        "isleaf": "1",
        "isperson": "01",
        "orgid":window.sessionStorage.getItem('orgid'),
        "parentid": 7,
        "parentids": "1",
        "personid": 0,
        "pinyin": "1",
        "provid": 0,
        "remarks": "1",
        "temcode": "1",
        "temdes": "1",
        "temlevel": "1",
        "temlevelDic": "1",
        "temmanageid": 0,
        "temname": this.state.temname,
        "temtype": "0",
        "useflag": "1",
        "utstamp": "2018-10-22T03:36:17.855Z",
        "weight": 0
    },
    "casetype": this.state.finalObj.casetype,
    "chfingerprint": this.state.initData.chfingerprint,
    "ctstamp": "2018-10-22T03:36:17.855Z",
    "deptcode": window.sessionStorage.getItem('deptid'),
    "diastolicPressure": this.state.finalObj.diastolicPressure,
    "doctorid":  window.sessionStorage.getItem('userid'),
    "doctorname":  window.sessionStorage.getItem('username'),
    "facephoto": "1",
    "familyhistory":this.state.finalObj.familyhistory,
    "gestationalWeeks": 0,
    "heightnum":this.state.finalObj.heightnum,
    "hpi":this.state.finalObj.hpi,
    "inspection": "02",
    "isperiod": "02",
    "ispregnancy": this.state.finalObj.inspection,
    "moHistory": this.state.finalObj.moHistory,
    "orgid":window.sessionStorage.getItem('orgid'),
    "palpation": this.state.finalObj.palpation,
    "pasthistory": this.state.finalObj.pasthistory,
    "personhistory": this.state.finalObj.personhistory,
    "pridepict": this.state.finalObj.pridepict,
    "psycheck":  this.state.finalObj.psycheck,
    "pulse":  this.state.finalObj.pulse,
    "registerid": window.registerID,
    "sidephoto": this.state.finalObj.sidephoto,
    "smelling":this.state.finalObj.smelling,
    "suggession":this.state.finalObj.suggession,
    "syndrome":this.state.finalObj.syndrome,
    "systolicPressure": this.state.finalObj.systolicPressure,
    "temperature": this.state.finalObj.temperature,
    "treatprinciple":  this.state.finalObj.treatprinciple,
    "treatway": this.state.initData.treatway,
    "useflag": "1",
    "utstamp": "2018-10-22T03:36:17.855Z",
    "weightnum": this.state.finalObj.weightnum,
  }
  // console.log( JSON.stringify(data));
   let params = {
     url: "BuPatientCaseTempletController/postData",
     data: JSON.stringify(data),
     type: 'post' ,
   };
   function callBack(res){
     if(res.result){
      console.log('ok111111111111111');
     }else{
       console.log('异常响应信息', res);
     }
   };
   ajaxGetResource(params, callBack);
   this. handleCancel();
 }
 /** [onChange 获取弹出层中输入框的数据] */
 onChange=(e)=>{
   this.setState({temname:e.target.value})
 }
  render() {
    let { saved, caseItems, tabIndex, initData } = this.state;
    const { getFieldDecorator, setFieldsValue, getFieldsValue, isFieldsTouched } = this.props.form;
    let isEdit = isFieldsTouched();
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
      <Container onClick={this.hidePopComponent}>
        <SpecForm onSubmit={this.handleSubmit} onKeyDown={(e) => e.keyCode == 13 ? false : null}>
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
                return <ObserveCure ref={ ref => { this.observeCure = ref }} hideFeelCure={this.hidePopComponent} key={index} setFieldsValue={setFieldsValue} getFieldsValue={getFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{urlArr: tongueUrls, text: initData.inspection}}></ObserveCure>
              }
              if(item.targetid == 10 && item.isChoose == '01'){
                return <FeelCure ref={ ref => { this.fellCure = ref }} hideObseverCure={this.hidePopComponent} key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.palpation}></FeelCure>
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
          }{
            caseItems.map((item, index) => {
              if(item.targetid == 11 && item.isChoose == '01'){ // 小儿脉象
                return <CarefulItem key={index} setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ isperiod: initData.isperiod, ispregnancy: initData.ispregnancy, gestationalWeeks: initData.gestationalWeeks}}></CarefulItem>
              }
            })
          }
          {
            !caseItems.length ? null :
            <Row>
              <Col span={14}>
                <SureButton type="primary" htmlType="submit" disabled={!window.modifyPermission}>保存</SureButton>
                <BorderButton type="primary" onClick={this.handleReset}>打印</BorderButton>
                <BorderButton type="primary" onClick={this.showModal}>另存成模板</BorderButton>
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
                      <TipIcon type={saved == 2 ? 'success' : 'fail'}/>
                      <span>诊疗单保存{saved == 2 ? '成功' : '失败'}</span>
                    </SaveTip>
                  )
                }
              </Saving>
            </Row>
          }
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
          </ScrollArea>
        </SpecForm>
        <Modals>
        {
          tabIndex == '1' ?
          (
            <SpecTabs key='1' defaultActiveKey='1' animated={false}>
              <TabPane tab="病历模板" key="1">
                <Template changeInitData={this.changeInitData} listenFormData={listenFormData}/>
              </TabPane>
              <TabPane tab="历史病历" key="2">
                <MedicalHistory changeInitData={this.changeInitData}/>
              </TabPane>
              <TabPane tab="辅助诊断" key="3">
                <AuxiliaryDiagnosis type={1} changeInitDataTwo={this.changeInitDataTwo} listenFormData={listenFormData}/>
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
        </Modals>
        <SpeModal title="添加病例模板" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={false}>
           <FormItems>
             <span style={{marginRight:"5px"}}>模板目录 :</span>
           <Inputs value={"病例模板>我的模板"} disabled={true}/>
           </FormItems>
           <FormItems>
             <span style={{marginRight:"5px"}}>模板名称 :</span>
           <Inputs onChange={this.onChange}/>
           </FormItems>
           <FormItems>
             <SureButton htmlType="submit" onClick={this.postModal}>保存</SureButton>
            <CancelButton onClick={this.handleCancel}>取消</CancelButton>
           </FormItems>

        </SpeModal>
        <Prompt
          when={isEdit}
          message="离开会丢失未保存的数据，确定离开?"
        />
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
const WrapperWriteMedicalRecords = Form.create()(WriteMedicalRecords);
export default WrapperWriteMedicalRecords;
