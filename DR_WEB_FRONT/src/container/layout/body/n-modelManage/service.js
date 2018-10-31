//病历模板

import { request, config } from 'utils'
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

//保存模板
export function postData(data) {
  const _url = templateManagement + 'BuTempletManageController/getList';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}













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