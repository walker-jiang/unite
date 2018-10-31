//中药

import { request, config } from 'utils'
const { SDT, api } = config;
// const { orgHerbalMedicineList } = api;

//一键自动匹配药品
export function autoMatchHerbalMedicine (data) {
  const _url = SDT + 'tcmCmdrugsOrg/autoMatchHerbalMedicine';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//获取机构中药目录
export function getOrgHerbalMedicineList (data) {
  const _url = SDT + 'tcmCmdrugsOrg/getOrgHerbalMedicineList';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}
//获取系统中药库目录
export function getCenterHerbalMedicineList (data) {
  const _url = SDT + 'tcmCmdrugsOrg/getCenterHerbalMedicineListBy';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//匹配药品关系
export function matchHerbalMedicine (data) {
  const _url = SDT + 'tcmCmdrugsOrg/matchHerbalMedicine';
  return request({
    url: _url,
    method: 'post',
    data,
  })
}

//解除药品匹配关系
export function deleteMatchHerbalMedicine (data) {
  const _url = SDT + 'tcmCmdrugsOrg/deleteMatchHerbalMedicine';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//设置权重
export function updateHerbalMedicineOrg (data) {
  const _url = SDT + 'tcmCmdrugsOrg/updateHerbalMedicineOrg';
  return request({
    url: _url,
    method: 'post',
    data,
  })
}