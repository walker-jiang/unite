import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import BasicModal from 'components/dr/modal/basicModal';
import HerbalForm from './herbalForm';
import buttonSty from 'components/antd/style/button';
import TipModal from 'components/dr/modal/tip';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
const confirm = Modal.confirm;

export default class ChHerbalMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePop: false,  // 控制弹框显示隐藏
      initData: '', //是否初始化数据、修改查看需要，其余不需要
      //baHerbalMedicines: [],//辨证论治-中草药
    };
    this.submit = this.submit.bind(this);
  }
  // 弹框显示
  handlePopOpen () {
    // // 数据初始化
    let that = this;
    if(that.props.actionType == 'add'){
      that.setState({
        visiblePop: true,
        initData: false
      });
    }else{
      that.setState({
        visiblePop: true,
        initData: true
      });
    }
  };
  // 弹框关闭
  handlePopClose () {
    this.setState({ visiblePop: false });
  };
  // 点击确定按钮触发提交操作
  submit(e){
    let { formData, herbalData } = this.form.handleSubmit(e); /// 获取表单数据、草药数据集
    if(formData.diagnose.originData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '诊断数据不能空'
      });
      return;
    }
    if( herbalData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '草药数据不能空'
      });
      return;
    }
    let promise = this.checkTaboo(herbalData); // 紧急项目监测
    promise.then((res) => {
      console.log('继续保存', res);
      if(this.props.actionType == 'add'){
        this.addHerbalData(formData, herbalData);
      }else{ // 修改保存
        this.mmodifyHerbalData(formData, herbalData);
      }
    }, (res) => {
      console.log('点击查看', res);
      this.form.refreshHerbalData(res);
    });
    // console.log('表单数据', formData);
    // console.log('草药数据', herbalData);
  };
  addHerbalData(values, herbalData){
    let nameArr = [];
    let price = 0;
    let self = this;
    let medicineArr = herbalData.filter((item, index) => {
      nameArr.push(item.itemname);
      price += item.unitprice * (item.count);
    })
    let prescriptionContent = nameArr.join('、')
    let patientId = window.patientID;
    let patientName = window.patientName;

    let freqname = values.frequency;
    let usagename = values.treatMethods;
    let buDiagnosisInfo = {
      buDiagnosisList: values.diagnose.originData,
      "cardno": window.cardno,
      "deptid": window.sessionStorage.getItem('deptid'),
      "diagnosisDesc": values.diagnosename,
      "doctorid": window.sessionStorage.getItem('userid'),
      "doctorname": window.sessionStorage.getItem('username'),
      "orgid": window.sessionStorage.getItem('orgid'),
      "patientid": window.patientID,
      "patientname": window.patientName,
      "patientno": "test", // 患者编号 暂空
      "registerid":window.registerID,
      "registerno": "12312" // his挂号流水号 暂空
    };

    let paramsData = {
      buDiagnosisInfo: buDiagnosisInfo,
      patientid: patientId,  // 患者ID
      registerid: window.registerID, // 挂号ID
      patientname: patientName,  // 患者姓名
      orgUserid: window.sessionStorage.getItem('userid'),
      orgid: window.sessionStorage.getItem('orgid'),
      feeall: price * values.doseNum,
      orgUsername: window.sessionStorage.getItem('username'),
      ordertype: '3',   // 医嘱类型
      ordercontent: prescriptionContent, // 医嘱内容
      orderstate: '1',  // 缴费状态 1 未缴费
      buRecipe: { // 表单数据
        recipetype: 1,
        registerid: window.registerID, // 挂号ID
        freqname: values.frequency.label,   // 频次
        freqid: values.frequency.key, // 频次
        recipename: values.recipename, // 处方名称
        treatway: values.treatMethods,   // 治疗方法
        countnum: values.doseNum, //付数
        remark: typeof(values.remark) == 'string' ? values.remark : values.remark.extractionData, // 嘱托
      },
      buOrderDtlList: herbalData,   // 药品信息
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
      console.log('保存成功')
      that.handlePopClose();
      that.props.reloadList();
    };
    ajaxGetResource(params, success);
  };
  checkTaboo(herbalData){
    let caseData = this.getCaseData();
    let paramsData = {
      bu: caseData,
      BaHerbalMedicines: herbalData,
      age: extractDataFromIdentityCard.getAgeFromBirthday(window.birthday),
      sex: window.sex,
      orgCode: window.sessionStorage.getItem('orgid')
    };
    let params = {
      url: 'Taboo/matchBy',
      server_url: config_taboo_url,
      async: false,
      type: 'post',
      data: JSON.stringify(paramsData)
    }
    let that = this;
    let promise = null;
    // function success(res) {
    //   if(res.result){
    //     let carefulArr = []; // 慎用项
    //     let tabooArr = []; // 禁忌项
    //     res.data.forEach(item => {
    //       if(item.careful){
    //         carefulArr.push(item.careful);
    //       }
    //       if(item.taboo){
    //         tabooArr.push(item.taboo);
    //       }
    //     });
    //     if(carefulArr.length || tabooArr.length){ // 弹框提示
    //       let title = [];
    //       if(carefulArr.length){
    //         title.push(<p>慎用项目：{carefulArr.join('、')}</p>);
    //       }
    //       if(tabooArr.length){
    //         title.push(<p>禁忌项目：{tabooArr.join('、')}</p>);
    //       }
    //       promise = new Promise((resolve, reject) => {
    //         confirm({
    //           title: title.map(item => item),
    //           iconType: 'exclamation-circle',
    //           okText: '继续保存',
    //           cancelText: '查看',
    //           onOk() { // 继续保存
    //             resolve(herbalData);
    //           },
    //           onCancel() { // 查看禁忌
    //             herbalData.map(herbalItem => {
    //               res.data.forEach(itemcTaboo => {
    //                 if(itemcTaboo.itemid == herbalItem.itemid){
    //                   herbalItem.careful = itemcTaboo.careful;
    //                   herbalItem.taboo = itemcTaboo.taboo;
    //                 }
    //               })
    //               return herbalItem;
    //             });
    //             reject(herbalData);
    //           },
    //         });
    //       });
    //     }else{
    //       promise = new Promise((resolve, reject) => {
    //         resolve(herbalData);
    //       });
    //     }
    //   }
    // };
    function success(res) {
      if(res.result){
        if(res.data['taboo'] && res.data['taboo'].length>0){ // 弹框提示
          let title = [];
          title.push(<p>{res.data['taboo'].join(',')}</p>);
          promise = new Promise((resolve, reject) => {
            confirm({
              title: title.map(item => item),
              iconType: 'exclamation-circle',
              okText: '继续保存',
              cancelText: '查看',
              onOk() { // 继续保存
                resolve(herbalData);
              },
              onCancel() { // 查看禁忌
                herbalData.map(herbalItem => {
                  res.data['buOrderDtls'].forEach(itemcTaboo => {
                    if(itemcTaboo.itemid == herbalItem.itemid){
                      herbalItem.careful = itemcTaboo.careful;
                      herbalItem.taboo = itemcTaboo.taboo;
                    }
                  })
                  return herbalItem;
                });
                reject(herbalData);
              },
            });
          });
        }else{
          promise = new Promise((resolve, reject) => {
            resolve(herbalData);
          });
        }
      }
    };
    ajaxGetResource(params, success);
    return promise;
  };
  /** [getCaseData 初始化病历数据] */
  getCaseData(){
    let self = this;
    let caseData = {};
    let params = {
      url: 'BuPatientCaseController/getData',
      async: false,
      data: {
        registerid: window.registerID
      },
    };
    if(this.props.syndrome){ // 辨证论治添加处方
      params.server_url = config_InteLigenTreat_url+'TCMAE/';
    }
    function callBack(res){
      if(res.result && res.data){
        caseData = res.data
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
    return caseData;
  };
  mmodifyHerbalData(values, herbalData){
    let buRecipe = this.form.state.buRecipe;
    let buDiagnosisInfo = this.form.state.buDiagnosisInfo;
    let data = this.form.state.data;

    let nameArr = [];
    let price = 0;
    let self = this;
    // 药品数据
    // console.log('herbalData', herbalData);
    let medicineArr = herbalData.forEach((item, index) => {
      nameArr.push(item.itemname)
      price += item.unitprice * (item.count);
    })
    let prescriptionContent = nameArr.join('、')
    // 诊断数据
    buDiagnosisInfo.buDiagnosisList = values.diagnose.originData;
    // 处方数据
    buRecipe.diagnosename = values.diagnose.extractionData.substr(0,4);  // 诊断名称
    buRecipe.diagnosisDesc = values.diagnose.extractionData;  // 诊断描述
    buRecipe.freqname = values.frequency.label;   // 频次
    buRecipe.freqid = values.frequency.key;   // 频次
    buRecipe.recipename = values.recipename;   // 处方名称
    buRecipe.usagename = values.treatMethods;   // 治疗方法
    buRecipe.remark = values.doseNum;   // 治疗方法
    // 最终医嘱数据
    data.buDiagnosisInfo = buDiagnosisInfo; // 诊断信息
    data.buRecipe = buRecipe; // 处方信息
    data.buOrderDtlList = herbalData; // 处方信息
    data.feeall = price * values.doseNum; // 总费用
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
      that.handlePopClose();
      that.props.reloadList();
    };
    ajaxGetResource(params, success);
  };
  render () {
    let { visiblePop , initData } = this.state;
    let { actionType } = this.props;
    let title = actionType == 'add' ? '新增' : (actionType == 'modify' ? '修改' : '查看');
    return (
      <SpecBasicModal visible={visiblePop} title={title + '中药处方'} onClose={() => this.handlePopClose()}>
        <HerbalForm
          wrappedComponentRef={ref => {this.form = ref}}
          initData={initData}
          {...this.props}>
        </HerbalForm>
        {
          this.props.actionType == 'view' ? null :
          <Footer>
            <SureButton type="primary" onClick={this.submit} disabled={!window.modifyPermission}>保存</SureButton>
            <Gray type="primary" onClick={()=>{this.handlePopClose()}}>取消</Gray>
          </Footer>
        }
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </SpecBasicModal>
    )
  }
}
const SpecBasicModal = styled(BasicModal)`
  color: rgb(178, 20, 20);
  background: rgba(253, 252, 247, 1);
  font-family: 'YaHei Consolas Hybrid';
  & > div{
    padding: 0px 20px;
  }
  .header {
    height: 55px;
  }
`;
const Footer = styled.div`
  width: 100%;
  bottom: 0px;
  margin-top: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SureButton = styled(Button)`
  background-color: rgb(178, 20, 20) !important;
  ${buttonSty.semicircle}
`;
const Gray = styled(Button)`
  color: rgb(178, 20, 20) !important;
  ${buttonSty.gray}
`;
/*
@作者：马晓敏
@日期：2018-06-29
@描述：新增中草药处方部分
*/
