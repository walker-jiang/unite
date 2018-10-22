import deepClone from './deepClone';
/**
 * [getDiagnoseText 从诊断 明细表 对象中提取诊断文本]
 * @param  {[type]} data [诊断对象]
 * @return {[type]}      [void]
 */
function getDiagnoseText(originData = []){
  // console.log('originData文本转化' ,originData);
  let data = deepClone(originData); // 深克隆一份对象
  let chinaMedicine = '中医诊断：';
  let westMedicine = '西医诊断：';
  data.forEach((item, index)=>{ // 遍历诊断明细
    let diagnoseChiane = '';
    let diagnoseWest = '';
    if(item.diagnosisWay == 0){ //西医诊断
      diagnoseWest = item.dianame;
    }else{
      diagnoseChiane = item.disname; // 中医病症
      let minifest = ''; // 病侯
      if(!item.buDiagnosisDismainfList){
        return;
      }
      item.buDiagnosisDismainfList.forEach((itemChildChile, indexChildChild) => { // 病侯
        minifest += itemChildChile.manifname + '，'
      });
      if(minifest){
        minifest = '（' + minifest.substr(0, minifest.length - 1) + '）';
        diagnoseChiane += minifest;
      }
    }
    chinaMedicine += (diagnoseChiane?(diagnoseChiane + '，'):diagnoseChiane);
    westMedicine += (diagnoseWest?(diagnoseWest + ','):diagnoseWest);
  });
  let tittle = '';
  if(chinaMedicine.length > 5){
    tittle = chinaMedicine.substr(0, chinaMedicine.length-1);
  }
  if(westMedicine.length > 5){
    tittle += '；';
    tittle += westMedicine.substr(0, westMedicine.length-2);
  }
  return tittle;
};
/**
 * [getDiagnoseDataSource 从诊断\历史诊断 明细表 中提取诊断表格数据源]
 * @param  {Array}  [originData=[]] [description]
 * @param  {String} [type='now']    [历史诊断还是当前诊断]
 * @return {[type]}                 [void]
 */
function getDiagnoseDataSource(originData = [], type = 'now'){
  let data = deepClone(originData); // 深克隆一份对象
  let diagnoseHisData = new Array();
  data.forEach((item, index)=>{ //诊断明细
    if(item.buDiagnosisDismainfList && item.buDiagnosisDismainfList.length > 0){
      item.buDiagnosisDismainfList.forEach((itemNext, indexNext) => {
        let itemChild = {};
        itemChild.key = diagnoseHisData.length; // 加唯一key值
        itemChild.order = diagnoseHisData.length + 1;
        itemChild.diagnosisName = item.diagnosisName + '/' + itemNext.manifname;
        itemChild.diagnosisCode = itemNext.manifcode;
        itemChild.manifCode = item.diagnosisCode;
        itemChild.diagnosisWay = item.diagnosisWay;
        itemChild.diagnosisType = '-';
        itemChild.doubtDiaTypeDic = '-';
        itemChild.mainDiaTypeDic = '-';
        itemChild.utstamp = item.utstamp;
        itemChild.type = '症候';
        itemChild.doctorname = type == 'now' ? window.sessionStorage.getItem('username') : item.doctorname;

        diagnoseHisData.push(itemChild);
      });
    }else{
      item.key = diagnoseHisData.length; // 加唯一key值
      item.order = diagnoseHisData.length + 1;
      item.doctorname = type == 'now' ? window.sessionStorage.getItem('username') : item.doctorname;
      diagnoseHisData.push(item);
    }
  });
  return diagnoseHisData;
};
/*
@作者：姜中希
@日期：2018-08-10
@描述：从对象中提取文本
*/
/**
 * [combinedAddFormData 将检验、检查、西医、材料表单项转为后台服务所需的表单数据]
 * @param  {[type]} values   [表单数据]
 * @param  {[type]} itemData [项目数据（检验项、检查项、西医项、材料项）]
 * @return {[type]}          [格式化后的JOSN]
 */
function combinedAddFormData(values, itemData, type){
  let ordercontent = '';
  let feeall = 0;
  let self = this;

  let buOrderDtlList = new Array();   // 非医嘱套项目
  let buOrdmedical = { // 医嘱套项目
    aim: values.aim,
    miType: values.miType,
    deptcode: window.sessionStorage.getItem('deptid'), // 科室ID
    deptname: window.sessionStorage.getItem('deptid'), // 科室ID
    doctorid: window.sessionStorage.getItem('userid'), // 用户ID
    doctorname: window.sessionStorage.getItem('username'), // 用户名
    drlevel: window.sessionStorage.getItem('post'), // 医生级别
    orgid: window.sessionStorage.getItem('orgid'), // 机构ID
  };
  let buOrdmedicalSuitList = new Array(); // 医嘱套列表
  let spbody = [];
  itemData.forEach((item, index) => {
    if(item.buOrderDtlList){ // 医嘱套
      ordercontent += item.orderSuitname + '、';
      buOrdmedicalSuitList.push(item); // 将非医嘱套项目存入非医嘱套数组
      feeall += item.feesum;
      if(item.buOrderDtlList.buImtreatprelistStAcupoints){
        let spbody = [];
        item.buOrderDtlList.buImtreatprelistStAcupoints.forEach((itemChildChild) => {
          spbody.push(itemChildChild.acupointName);
        });
        item.spbody = spbody.join('、');
      }
    }else{ // 非医嘱套
      ordercontent += item.itemname + '、';
      feeall += item.unitprice * item.count;
      buOrderDtlList.push(item); // 将医嘱套项目存入医嘱套数组
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
    "patientname": window.patientName, // ***************
    "patientno": "test", // 患者编号 暂空
    "registerid":window.registerID,
    "registerno": "12312" // his挂号流水号 暂空
  };
  // 医嘱最终对象
  let paramsData = {
    buDiagnosisInfo: buDiagnosisInfo, // 诊断对象
    buOrderDtlList: buOrderDtlList, // 非医嘱套数组
    buOrdmedical: buOrdmedical, // 医嘱套对象
    feeall: feeall,
    ordercontent: ordercontent.substr(0, ordercontent.length-1), // 医嘱内容
    orderstate: '1',  // 缴费状态 1 未缴费
    ordertype: type,   // 医嘱类型
    orgUserid: window.sessionStorage.getItem('userid'),
    orgid: window.sessionStorage.getItem('orgid'),
    parientid: window.patientID,  // 患者ID
    parientname: window.patientName,  // 患者姓名
    registerid: window.registerID, // 挂号ID
    orgUsername: window.sessionStorage.getItem('username'),
  }
  return paramsData;
};
/**
 * [combinedModifyFormData 将检验、检查、西医、材料表单项转为修改后台服务所需的表单数据]
 * @param  {[type]}  values          [表单数据]
 * @param  {[type]}  itemData        [项目数据（检验项、检查项、西医项、材料项）]
 * @param  {[type]}  data            [修改前查询的原始的医嘱数据]
 * @param  {Boolean} buDiagnosisInfo [修改前查询的原始的诊断]
 * @param  {[type]}  buOrdmedical    [修改前查询的原始的医嘱套对象]
 * @return {[type]}                  [格式化后的JOSN]
 */
function combinedModifyFormData(values, itemData, data, buDiagnosisInfo, buOrdmedical){
  let ordercontent = '';
  let feeall = 0;
  let self = this;

  let buOrderDtlList = new Array();   // 检验项目非医嘱套
  buOrdmedical.aim = values.aim;
  buOrdmedical.miType = values.miType;

  let buOrdmedicalSuitList = new Array(); // 医嘱套列表
  itemData.forEach((item, index) => {
    if(item.buOrderDtlList){ // 医嘱套
      ordercontent += item.orderSuitname + '、';
      buOrdmedicalSuitList.push(item);
      item.buOrderDtlList.forEach((itemChild) => {
        feeall += itemChild.unitprice * itemChild.count;
      });
    }else{ // 非医嘱套
      ordercontent += item.itemname + '、';
      feeall += item.unitprice * item.count;
      buOrderDtlList.push(item);
    }
  })
  buOrdmedical.buOrdmedicalSuitList = buOrdmedicalSuitList;
  // 诊断主表对象
  buDiagnosisInfo.buDiagnosisList = values.diagnose.originData;
  buDiagnosisInfo.diagnosisDesc = values.diagnose.extractionData;
  // 最终对象
  data.buDiagnosisInfo = buDiagnosisInfo;
  data.buOrderDtlList = buOrderDtlList;
  data.buOrdmedical = buOrdmedical;
  data.feeall = feeall;
  data.ordercontent = ordercontent.substr(0, ordercontent.length-1);
  return data;
};
/**
 * [converItemToNeeded 将从后台查出来的检验、检查、西医、材料项目转为后台接收需要的格式]
 * @param  {[type]} Item [查询出的项目]
 * * @param  {[type]} ItemArray [所有已添加项目数组]
 * @return {[type]}      [格式化后的项目]
 */
function converItemToNeeded(Item, ItemArray){
  // 将检验项目转化为表单需要的数据格式
  if(Item.baMedicalDtlList){ // 医嘱套
    let feesum = 0;
    Item.baMedicalDtlList.forEach((itemChild, index) => { // 医嘱明细
      feesum += itemChild.unitprice * itemChild.count;
      itemChild.itemcode = itemChild.medicalcode;
      itemChild.itemid = itemChild.medicalid;
      itemChild.itemname = itemChild.medicalname;
      itemChild.remarks = itemChild.medinsrem;
      itemChild.itemno = index;
      delete itemChild.medicalcode;
      delete itemChild.medicalid;
      delete itemChild.medicalname;
      delete itemChild.medinsrem;
    });
    Item.feesum = feesum;
    Item.buOrderDtlList = Item.baMedicalDtlList;
    delete Item.baMedicalDtlList;
  }else{ // 非医嘱套
    Item.itemcode = Item.medicalcode;
    Item.itemid = Item.medicalid;
    Item.itemname = Item.medicalname;
    Item.remarks = Item.medinsrem;
    Item.itemno = ItemArray.length;
    delete Item.medicalcode;
    delete Item.medicalid;
    delete Item.medicalname;
    delete Item.medinsrem;
  }
  return Item;
};
/**
 * [converItemToNeededCN 将从后台查出来的中药、中草药项目转为后台接收需要的格式]
 * @param  {[type]} Item [查询出的项目]
 * * @param  {[type]} ItemArray [所有已添加项目数组]
 * @return {[type]}      [格式化后的项目]
 */
function converItemToNeededCN(Item, ItemArray, type){
  Item.count = Item.defQty;
  Item.dosage = Item.defQty;
  Item.miType = '';
  Item.usageid = Item.baUsage ? Item.baUsage.usageid : 9; // 从用法对象转换成字符串用法ID
  Item.usagename = Item.baUsage ? Item.baUsage.usagename : '无'; // 从用法对象转换成字符串用法名称
  // Item.freqid = values.frequency.key;
  // Item.freqname = values.frequency.label;
  Item.itemcode = Item.medicinecode;
  Item.itemid = Item.medicineid;
  Item.itemname = Item.medicinename;
  Item.itemno = ItemArray.length;
  Item.itemtype = type; // 中药0
  // delete Item.defQty;
  delete Item.medicinecode;
  delete Item.medicineid;
  delete Item.medicinename;
  return Item;
};
export { getDiagnoseText, getDiagnoseDataSource, combinedAddFormData, combinedModifyFormData, converItemToNeeded, converItemToNeededCN };
