//病历模板

import { request, config } from 'utils';
import getResource from 'commonFunc/ajaxGetResource';
import axios from 'axios';
const { templateManagement, api } = config;

//根据所给参数查询模板
export function getList(data) {
  const _url = templateManagement + 'BuTempletManageController/getList';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//根据所给参数查询模板
export function getDataByTemmanageId(data) {
  const _url = templateManagement + 'BuTempletManageController/getData';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//保存模板分类
export function postData(data) {
  const _url = templateManagement + 'BuTempletManageController/postData';
  return request({
    url: _url,
    method: 'post',
    data,
  })
}

//更新模板分类
export function putData(data) {
  const _url = templateManagement + 'BuTempletManageController/putData';
  return request({
    url: _url,
    method: 'put',
    data,
  })
}

//删除模板分类
export const delData = 'BuTempletManageController/delData';
// export function delData(data) {
//   const _url = templateManagement + 'BuTempletManageController/delData';
//   return request({
//     url: _url,
//     method: 'delete',
//     data,
//   })
// }

//给一个服务地址
export const serverUrl = templateManagement;


//新建模板本身
export function createBLTmpData() {
  return 'BuPatientCaseTempletController/postData';
}


//更新模板本身
export function putBLTmpData() {
  return 'BuPatientCaseTempletController/putData';
}

//删除模板本身
export const delBLTmpData = 'BuPatientCaseTempletController/delData';
// export function delBLTmpData(data) {
//   const _url = templateManagement + 'BuPatientCaseTempletController/delData';
//   return request({
//     url: _url,
//     method: 'get',
//     data,
//   })
// }

//根据temmanageid查询病历模板数据
export function getBLData(data) {
  const _url = templateManagement + 'BuPatientCaseTempletController/getData';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}


/*
@作者：杨腊梅
@日期：2018-10-22
@描述：病历模板与医嘱模板请求
*/