import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import BasicModal from 'components/dr/modal/basicModal';
import ExamineForm from './examineForm';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';

export default class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visiblePop: false,  // 控制弹框显示隐藏
    }
    this.saveForm = this.saveForm.bind(this);
  }
  // 弹框显示
  handlePopOpen () {
    this.setState({ visiblePop: true });
  };
  // 弹框关闭
  handlePopClose () {
    this.setState({ visiblePop: false });
  };
  saveForm(e){
    let  { formData, examineData } =  this.form.handleSubmit(e);
    if(formData.diagnose.originData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '诊断数据不能空'
      });
      return;
    }
    if( examineData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '检验数据不能空'
      });
      return;
    }
    if(this.props.actionType == 'add'){
      this.addExamineItem(formData, examineData);
      // console.log('formData, examineData', formData, examineData);
    }else{
      this.modifyExamineItem(formData, examineData)
    }
  };
  addExamineItem(values, examineData){
    let ordercontent = '';
    let feeall = 0;
    let self = this;

    let buOrderDtlList = new Array();   // 检验项目非医嘱套
    let buOrdmedical = { // 检验项目医嘱套
      aim: values.aim,
      miType: values.miType,
      deptcode: window.sessionStorage.getItem('deptid'), // 科室ID
      deptname: window.sessionStorage.getItem('deptid'), // 科室ID
      // diagnosecode: values.diagnose.extractionData,
      // diagnosename: values.diagnose.extractionData,
      // diagnoseno: values.diagnose.extractionData,
      doctorid: window.sessionStorage.getItem('userid'), // 用户ID
      doctorname: window.sessionStorage.getItem('username'), // 用户名
      drlevel: window.sessionStorage.getItem('post'), // 医生级别
      orgid: window.sessionStorage.getItem('orgid'), // 机构ID
    };
    let buOrdmedicalSuitList = new Array(); // 医嘱套列表
    examineData.forEach((item, index) => {
      if(item.baMedicalDtlList){ // 医嘱套
        let buOrderDtlList = new Array(); // 医嘱明细
        let feesum = 0;
        item.baMedicalDtlList.forEach((itemChild, index) => {
          feesum += itemChild.unitprice * itemChild.count;
          itemChild.itemcode = itemChild.medicalcode;
          itemChild.itemid = itemChild.medicalid;
          itemChild.itemname = itemChild.medicalname;
          itemChild.remarks = itemChild.medinsrem;
          itemChild.itemno = index;
        });
        item.feesum = feesum;
        item.buOrderDtlList = item.baMedicalDtlList;
        ordercontent += item.orderSuitname + '、';
        buOrdmedicalSuitList.push(item);
        feeall += feesum;
      }else{ // 非医嘱套
        ordercontent += item.medicalname + '、';
        feeall += item.unitprice * item.count;
        item.itemcode = item.medicalcode;
        item.itemid = item.medicalid;
        item.itemname = item.medicalname;
        item.remarks = item.medinsrem;
        item.itemno = index;
        buOrderDtlList.push(item);
      }
    })
    buOrdmedical.buOrdmedicalSuitList = buOrdmedicalSuitList;
    // 诊断主表对象
    let buDiagnosisInfo = {
      buDiagnosisList: values.diagnose.originData,
      "cardno": window.cardno,
      "deptid": window.sessionStorage.getItem('deptid'),
      "diagnosisDesc": values.diagnose.extractionData,
      "doctorid": window.sessionStorage.getItem('userid'),
      "orgid": window.sessionStorage.getItem('orgid'),
      "patientid": window.patientID,
      "patientname": window.patientName,
      "patientno": "test", // 患者编号 暂空
      "registerid":window.registerID,
      "registerno": "12312" // his挂号流水号 暂空
    };
    // // 处方对象
    // let buRecipe = {
    //   deptcode: '' , // 暂空
    //   deptname: '', // 暂空
    //   diagnosecode: '', // 暂空
    //   diagnosename: values.diagnose.extractionData, // 诊断名称
    //   diagnoseno: '', // 暂空
    //   doctorid: window.sessionStorage.getItem('userid'),
    //   doctorname: window.sessionStorage.getItem('username'), // 用户名
    //   drlevel: window.sessionStorage.getItem('post'),
    //   recipetype: values.miType,
    //   registerid: window.registerID, // 挂号ID
    //   // recipename: values.recipename, // 处方名称
    // };
    // 医嘱最终对象
    let paramsData = {
      buDiagnosisInfo: buDiagnosisInfo, // 诊断对象
      buOrderDtlList: buOrderDtlList,   // 非医嘱套数组
      buOrdmedical: buOrdmedical, // 医嘱套对象
      // buRecipe: buRecipe, // 处方
      feeall: feeall,
      ordercontent: ordercontent.substr(0, ordercontent.length-1), // 医嘱内容
      orderstate: '1',  // 缴费状态 1 未缴费
      ordertype: '1',   // 医嘱类型
      orgUserid: window.sessionStorage.getItem('userid'),
      orgid: window.sessionStorage.getItem('orgid'),
      parientid: window.patientID,  // 患者ID
      parientname: window.patientName,  // 患者姓名
      registerid: window.registerID, // 挂号ID
      orgUsername: window.sessionStorage.getItem('username'),
    }
    let params = {
      url: 'BuOrderController/postData',
      type: 'post',
      data: JSON.stringify(paramsData)
    }
    let that = this;
    function success(res) {
      that.handlePopClose();
      that.props.reloadList();
    };
    ajaxGetResource(params, success);
  };
  modifyExamineItem(values, examineData){
    let data = this.form.state.data;
    let buDiagnosisInfo = this.form.state.buDiagnosisInfo;
    // let buRecipe = this.form.state.buRecipe;
    let buOrdmedical = this.form.state.buOrdmedical;
    console.log('examineData修改', examineData);
    let ordercontent = '';
    let feeall = 0;
    let self = this;

    let buOrderDtlList = new Array();   // 检验项目非医嘱套
    buOrdmedical.aim = values.aim;
    buOrdmedical.miType = values.miType;

    let buOrdmedicalSuitList = new Array(); // 医嘱套列表
    examineData.forEach((item, index) => {
      if(item.baMedicalDtlList){ // 医嘱套
        let buOrderDtlList = new Array(); // 医嘱明细
        let feesum = 0;
        item.baMedicalDtlList.forEach((itemChild, index) => {
          feesum += itemChild.unitprice * itemChild.count;
          itemChild.itemcode = itemChild.medicalcode;
          itemChild.itemid = itemChild.medicalid;
          itemChild.itemname = itemChild.medicalname;
          itemChild.itemno = index;
        });
        item.feesum = feesum;
        item.buOrderDtlList = item.baMedicalDtlList;
        ordercontent += item.orderSuitname + '、';
        buOrdmedicalSuitList.push(item);
        feeall += feesum;
      }else{ // 非医嘱套
        ordercontent += item.medicalname + '、';
        feeall += item.unitprice * item.count;
        item.itemcode = item.medicalcode;
        item.itemid = item.medicalid;
        item.itemname = item.medicalname;
        item.itemno = index;
        buOrderDtlList.push(item);
      }
    })
    buOrdmedical.buOrdmedicalSuitList = buOrdmedicalSuitList;
    // 诊断主表对象
    buDiagnosisInfo.buDiagnosisList = values.diagnose.originData;
    buDiagnosisInfo.diagnosisDesc = values.diagnose.extractionData;
    // 处方对象
    // buRecipe.recipename = recipename;
    // buRecipe.recipetype = values.miType;
    // 最终对象
    data.buDiagnosisInfo = buDiagnosisInfo;
    data.buOrderDtlList = buOrderDtlList;
    data.buOrdmedical = buOrdmedical;
    // data.buRecipe = buRecipe;
    data.feeall = feeall;
    data.ordercontent = ordercontent.substr(0, ordercontent.length-1);
    let params = {
      url: 'BuOrderController/putData',
      type: 'put',
      data: JSON.stringify(data)
    }
    let that = this;
    function success(res) {
      console.log('保存成功')
      that.handlePopClose();
      that.props.reloadList();
    };
    ajaxGetResource(params, success);
  };
  render () {
    let { visiblePop } = this.state;
    let { actionType } = this.props;
    let title = actionType == 'add' ? '新增' : (actionType == 'modify' ? '修改' : '查看');
    return (
        <BasicModal visible={visiblePop} title={title + '检验单'} onClose={() => this.handlePopClose()}>
          <Wrap>
            <ExamineForm {...this.props} wrappedComponentRef={ref => {this.form = ref}}></ExamineForm>
            {
              actionType == 'view' ? null :
              <Footer>
                <SureButton type="primary" onClick={this.saveForm} disabled={!window.modifyPermission}>保存</SureButton>
                <CancelButton type="primary" onClick={this.handlePopClose.bind(this)}>取消</CancelButton>
              </Footer>
            }
          </Wrap>
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        </BasicModal>
    )
  }
}

const Wrap = styled.div`
  width: 857px;
  height: 548px;
  overflow: hidden;
  padding: 10px
`;
const Footer = styled.div`
  width: 837px;
  position: absolute;
  height: 56px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
/*
@作者：姜中希
@日期：2018-08-21
@描述：检验新增、修改、查看部分
*/
