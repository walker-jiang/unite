//适宜技术匹配

import { request, config } from 'utils'
const { SDT, api } = config;
// const { orgHerbalMedicineList } = api;

//一键自动匹配药品
export function autoMatchSTechnology (data) {
  const _url = SDT + 'tcmSTechnologyOrg/autoMatchSTechnology';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//获取机构中药目录
export function getOrgSTechnologyList (data) {
  const _url = SDT + 'tcmSTechnologyOrg/getOrgSTechnologyList';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}
//获取系统中药库目录
export function getCenterSTechnologyList (data) {
  const _url = SDT + 'tcmSTechnologyOrg/getCenterSTechnologyListBy';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//匹配药品关系
export function matchSTechnology (data) {
  const _url = SDT + 'tcmSTechnologyOrg/matchSTechnology';
  return request({
    url: _url,
    method: 'post',
    data,
  })
}

//解除药品匹配关系
export function deleteMatchSTechnology (data) {
  const _url = SDT + 'tcmSTechnologyOrg/deleteMatchSTechnology';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//设置权重
export function updateSTechnologyOrg (data) {
  const _url = SDT + 'tcmSTechnologyOrg/updateSTechnologyOrg';
  return request({
    url: _url,
    method: 'post',
    data,
  })
}