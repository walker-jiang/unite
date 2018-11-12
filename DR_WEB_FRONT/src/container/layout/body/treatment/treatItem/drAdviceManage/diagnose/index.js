import React, { Component } from 'react';
import styled from 'styled-components';
import { Form } from 'antd';
import Diagnose from '../chHerbalMedicine/herbalForm/diagnose';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';
import { getDiagnoseText } from 'commonFunc/transform';

const FormItem = Form.Item;

class DiagnoseModify extends Component {
  constructor (props) {
    super(props);
    this.state = {
      buDiagnosisInfo: {}, // 诊断主信息对象
      // 初始化数据
      buDiagnosisList: [], // 诊断明细信息
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /** [getDiagnoseData 组件初始化获取加载诊断数据] */
  getDiagnoseData(){
    let self = this;
    let params = {
      url: 'BuDiagnosisInfoController/getData',
      data: {
        registerid: window.registerID
      },
    };
    function callBack(res){
      if(res.result && res.data){ // 获取当前诊断明细数据
        let { buDiagnosisList, ...buDiagnosisInfo } = res.data;
        if(window.searchITList){ // 和右侧栏智能论治联动
          window.searchITList();
        }
        self.setState({
          buDiagnosisList: buDiagnosisList,
          buDiagnosisInfo: buDiagnosisInfo
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  componentWillMount(){
    this.getDiagnoseData();
  };
  /** [handleSubmit 提交表单数据] */
  handleSubmit(formValue){
    let buDiagnosisInfo = this.state.buDiagnosisInfo;
    if(JSON.stringify(buDiagnosisInfo) == '{}'){
        buDiagnosisInfo.buDiagnosisList = formValue.originData;
        buDiagnosisInfo.cardno = window.cardno;
        buDiagnosisInfo.deptcode = window.sessionStorage.getItem('deptid');
        buDiagnosisInfo.diagnosisDesc = formValue.originData ? formValue.originData.extractionData : '';
        buDiagnosisInfo.doctorname = window.sessionStorage.getItem('username');
        buDiagnosisInfo.doctorid = window.sessionStorage.getItem('userid');
        buDiagnosisInfo.orgid = window.sessionStorage.getItem('orgid');
        buDiagnosisInfo.patientid = window.patientID;
        buDiagnosisInfo.patientname = window.patientName;
        buDiagnosisInfo.patientno = "test";
        buDiagnosisInfo.registerid = window.registerID;
        buDiagnosisInfo.registerno = "12312";
    }else{
      buDiagnosisInfo.buDiagnosisList = formValue.originData;
      buDiagnosisInfo.doctorname = window.sessionStorage.getItem('username');
      buDiagnosisInfo.doctorid = window.sessionStorage.getItem('userid');
    }
    let params = {
      url: 'BuDiagnosisInfoController/postData',
      type: 'POST',
      data: JSON.stringify(buDiagnosisInfo)
    }
    let that = this;
    function success(res) {
      if(window.searchITList){ // 和右侧栏智能论治联动
        // window.searchITList();
      }
      that.getDiagnoseData();
      that.props.diagnoseUpdate(formValue.extractionData)
    };
    ajaxGetResource(params, success);
  }
  // /** [getIndicator 获取病历指标项目] */
  // getIndicator(){
  //   let self = this;
  //   let caseItems = [];
  //   let params = {
  //     url: 'BaTargetController/getPerList',
  //     async: false,
  //     data: {
  //       orgid: window.sessionStorage.getItem('orgid'),
  //       deptcode: window.sessionStorage.getItem('deptid'),
  //       doctorid: window.sessionStorage.getItem('userid'),
  //       targettype: '01'
  //     },
  //   };
  //   function callBack(res){
  //     if(res.result){
  //       caseItems = res.data;
  //     }else{
  //       console.log('异常响应信息', res);
  //     }
  //   };
  //   ajaxGetResource(params, callBack);
  //   return caseItems;
  // };
  // modelCaseData(formValue){
  //   let caseItems = this.getIndicator();
  //   let selectedItems = new Array();
  //   caseItems.forEach((item) => {
  //     if(item.isChoose == '01'){
  //       let selectedItem = {
  //         chooselevel: '03', // 指标类型 个人
  //         deptid: window.sessionStorage.getItem('deptid'),
  //         doctorid: window.sessionStorage.getItem('userid'),
  //         orgid: window.sessionStorage.getItem('orgid'),
  //         targetid: item.targetid,
  //         targettype: '01', //病历指标
  //       };
  //       selectedItems.push(selectedItem);
  //     }
  //   });
  //   let buDiagnosisInfo = {};
  //   buDiagnosisInfo.buDiagnosisList = formValue.originData;
  //   buDiagnosisInfo.cardno = window.cardno;
  //   buDiagnosisInfo.deptid = window.sessionStorage.getItem('deptid');
  //   buDiagnosisInfo.diagnosisDesc = formValue.originData ? formValue.originData.extractionData : '';
  //   buDiagnosisInfo.doctorname = window.sessionStorage.getItem('username');
  //   buDiagnosisInfo.doctorid = window.sessionStorage.getItem('userid');
  //   buDiagnosisInfo.orgid = window.sessionStorage.getItem('orgid');
  //   buDiagnosisInfo.patientid = window.patientID;
  //   buDiagnosisInfo.patientname = window.patientName;
  //   buDiagnosisInfo.patientno = "test";
  //   buDiagnosisInfo.registerid = window.registerID;
  //   buDiagnosisInfo.registerno = "12312";
  //   let finalObj = {
  //     casetype: '',
  //     allergichistory: '',
  //     breath: '',
  //     buDiagnosisInfo: buDiagnosisInfo,
  //     deptid: window.sessionStorage.getItem('deptid'),
  //     diastolicPressure: '',
  //     doctorid: window.sessionStorage.getItem('userid'),
  //     doctorname: window.sessionStorage.getItem('username'),
  //     familyhistory: '',
  //     hpi: '',
  //     inspection: '',
  //     moHistory: '',
  //     orgid: window.sessionStorage.getItem('orgid'),
  //     palpation: '',
  //     pasthistory: '',
  //     personhistory: '',
  //     pridepict: '',
  //     pulse: '',
  //     registerid: window.registerID,
  //     smelling: '',
  //     suggession: '',
  //     syndrome: '',
  //     systolicPressure: '',
  //     temperature: '',
  //     treatprinciple: '',
  //     heightnum: '',
  //     weightnum: '',
  //     psycheck: '',
  //     buTargetChooseList: selectedItems,
  //     facephoto: '',
  //     sidephoto: '',
  //     isperiod: '',
  //     ispregnancy: '',
  //     gestationalWeeks: 1,
  //   };
  //   return finalObj;
  // };
  render () {
    let { buDiagnosisList } = this.state;
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    // let { diagnose = '' } = getFieldsValue();

    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 21 },
        sm: { span: 21 },
      },
      className: 'height',
      colon: false
    };
    return (
      <SpecForm className='not-draggable'>
          <SpecFormItem
            {...formItemLayout}
            label="诊断：">
          {getFieldDecorator('diagnose', {
            initialValue: {originData: buDiagnosisList, extractionData: getDiagnoseText(buDiagnosisList)}
          })(
            <Diagnose onChange={this.handleSubmit}/>
          )}
          </SpecFormItem>
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </SpecForm>
    )
  }
}
const SpecForm = styled(Form)`
  flex-grow: 1;
  .ant-row {
    margin-top: -10px;
    margin-left: -10px;
  }
`;
const SpecFormItem = styled(FormItem)`
  &&& > .ant-form-item-label {
    width: 60px;
  }
`;
const DiagnoseModifyWrapper = Form.create()(DiagnoseModify);
export default DiagnoseModifyWrapper;
/*
@作者：姜中希
@日期：2018-08-28
@描述：独立的诊断表单组件
*/
