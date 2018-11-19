import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import BasicModal from 'components/dr/modal/basicModal';
import MedicineForm from './medicineForm';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';

export default class ChPatentMedicine extends Component {
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
    let  { formData, medicineData } =  this.form.handleSubmit(e);
    if(formData.diagnose.originData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '诊断数据不能空'
      });
      return;
    }
    if( medicineData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '中成药、西药数据不能空'
      });
      return;
    }
    if(this.props.actionType == 'add'){
      this.addPatentMedicine(formData, medicineData);
    }else{
      this.modifyPatentMedicine(formData, medicineData)
    }
  };
  addPatentMedicine(values, medicineData){
      let medicineNameData = [];
      let feeall = 0;
      let self = this;
      // 草药对象
      medicineData.forEach((item, index) => {
        medicineNameData.push(item.itemname)
        feeall += item.unitprice * item.count;
        // item.baseUnit = item.baseUnit;
        // item.count = item.defQty;
        // item.dosage = item.defQty;
        // item.doseid = item.doseid;
        // item.miType = '';
        // item.dosename = item.dosename;
        // item.itemcode = item.medicinecode;
        // item.itemid = item.medicineid;
        // item.itemname = item.medicinename;
        // item.itemno = index;
        // item.itemtype = 0; // 中药0
        // item.unitprice = item.unitprice;
        // item.specification = item.specification;
        // item.useflag = item.useflag;
        // return item;
      })
      let prescriptionContent = medicineNameData.join('、')
      let patientId = window.patientID;
      let patientName = window.patientName;
      // 诊断主表对象
      let buDiagnosisInfo = {
        buDiagnosisList: values.diagnose.originData,
        "cardno": window.cardno,
        "deptcode": window.sessionStorage.getItem('deptid'),
        "diagnosisDesc": values.diagnosename,
        "doctorid": window.sessionStorage.getItem('userid'),
        "orgid": window.sessionStorage.getItem('orgid'),
        "patientid": window.patientID,
        "patientname": window.patientName,
        "patientno": "test", // 患者编号 暂空
        "registerid":window.registerID,
        "registerno": "12312" // his挂号流水号 暂空
      };
      // 处方对象
      let buRecipe = {
        recipetype: 1,
        diagnosename: values.diagnosename,  // 诊断名称
        registerid: window.registerID, // 挂号ID
        recipename: values.recipename, // 处方名称
      };
      // 医嘱最终对象
      let paramsData = {
        buDiagnosisInfo: buDiagnosisInfo,
        patientid: patientId,  // 患者ID
        registerid: window.registerID, // 挂号ID
        patientname: patientName,  // 患者姓名
        orgUserid: window.sessionStorage.getItem('userid'),
        orgid: window.sessionStorage.getItem('orgid'),
        feeall: feeall,
        orgUsername: window.sessionStorage.getItem('username'),
        ordertype: '4',   // 医嘱类型
        ordercontent: prescriptionContent, // 医嘱内容
        orderstate: '1',  // 缴费状态 1 未缴费
        buRecipe: buRecipe, // 处方
        buOrderDtlList: medicineData,   // 药品信息
      }
      let params = {
        url: 'BuOrderController/postData',
        type: 'post',
        data: JSON.stringify(paramsData)
      }
      if(this.props.syndrome){ // 辨证论治添加处方
        params.server_url = config_InteLigenTreat_url+'TCMAE/';
      }
      let that = this;
      function success(res) {
        that.handlePopClose();
        that.props.reloadList();
      };
      ajaxGetResource(params, success);
  };
  modifyPatentMedicine(values, medicineData){
    let buRecipe = this.form.state.buRecipe;
    let buDiagnosisInfo = this.form.state.buDiagnosisInfo;
    let data = this.form.state.data;

    let medicineNameData = [];
    let feeall = 0;
    let self = this;
    // 药品数据
    medicineData.forEach((item, index) => {
      medicineNameData.push(item.itemname)
      feeall += item.unitprice * item.count;
      // item.baseUnit = item.baseUnit;
      // item.dosage = item.defQty;
      // item.doseid = item.doseid;
      // item.miType = '';
      // item.dosename = item.dosename;
      // item.itemcode = item.medicinecode;
      // item.itemid = item.medicineid;
      // item.itemname = item.medicinename;
      // item.itemno = index;
      // item.itemtype = 0; // 中药0
      // item.unitprice = item.unitprice;
      // item.specification = item.specification;
      // item.useflag = item.useflag;
      // return item;
    })
    let prescriptionContent = medicineNameData.join('、')
    // 诊断数据
    buDiagnosisInfo.buDiagnosisList = values.diagnose.originData;
    // 处方数据
    buRecipe.diagnosename = values.diagnose.extractionData.substr(0,4);  // 诊断名称
    buRecipe.diagnosisDesc = values.diagnose.extractionData;  // 诊断描述
    buRecipe.recipename = values.recipename;   // 处方名称
    // 最终医嘱数据
    data.buDiagnosisInfo = buDiagnosisInfo; // 诊断信息
    data.buRecipe = buRecipe; // 处方信息
    data.buOrderDtlList = medicineData; // 处方信息
    data.feeall = feeall; // 总费用
    data.ordercontent = prescriptionContent;  // 医嘱内容
    let params = {
      url: 'BuOrderController/putData',
      type: 'put',
      data: JSON.stringify(data)
    }
    if(this.props.syndrome){ // 辨证论治添加处方
      params.server_url = config_InteLigenTreat_url+'TCMAE/';
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
      <BasicModal visible={visiblePop} title={title + '中成药/西药处方'} onClose={() => this.handlePopClose()}>
        <Wrap>
          <MedicineForm {...this.props} wrappedComponentRef={ref => {this.form = ref}}></MedicineForm>
          {
            actionType == 'view' ? null :
            <Footer>
              <SureButton type="primary" onClick={this.saveForm} disabled={!window.modifyPermission}>保存</SureButton>
              <CancelButton type="primary" onClick={this.handlePopClose.bind(this)}>取消</CancelButton>
            </Footer>
          }
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        </Wrap>
      </BasicModal>
    )
  }
}
const Wrap = styled.div`
  width: 857px;
  height: 498px;
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
@日期：2018-08-19
@描述：中成药/西药处方新增、修改、查看部分
*/
