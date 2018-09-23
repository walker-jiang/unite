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
/**
 * [getDiagnoseDataSource 从诊断信息 主表 中获取历史诊断表格的数据源]
 * @param  {Array}  [data=[]] [description]
 * @return {[type]}           [description]
 */
// function getDiagnoseHisDataSource(data = []){
//   console.log('历史data', data);
//   let diagnoseHisData = new Array();
//   data.forEach((item, index)=>{
//     item.status = 0; // 0表示全部未选中
//     item.order = index +1;
//     item.buDiagnosisList.forEach((itemChild, indexChild)=>{ //诊断明细
//       let binghou = '';
//       itemChild.buDiagnosisDismainfList.forEach((itemNext, indexNext)=>{
//         binghou += itemNext.manifname + '、';
//       });
//       binghou = binghou.substr(0, binghou.length - 1);
//       let newprop = {
//         doctorid: item.doctorid,
//         key: index + '' + indexChild,
//         status: 0,
//         order: index + indexChild +1,
//         diagnosisName: itemChild.diagnosisName + '/' + binghou
//       }
//       diagnoseHisData.push(Object.assign(itemChild, newprop));
//     });
//   });
//   return diagnoseHisData;
// };
export { getDiagnoseText, getDiagnoseDataSource };
/*
@作者：姜中希
@日期：2018-08-10
@描述：针对输入框组件从对象中提取数据
*/
