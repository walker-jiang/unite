//中成药
import { request, config } from 'utils'
const { SDT, api } = config;
// const { orgHerbalMedicineList } = api;

//一键自动匹配药品
export function autoMatchMedicine (data) {
  const _url = SDT + 'tcmCPatentmedicineOrg/autoMatchMedicine';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//获取机构中成药目录
export function getOrgMedicineList (data) {
  const _url = SDT + 'tcmCPatentmedicineOrg/getOrgMedicineList';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}
//获取系统中成药库目录
export function getCenterMedicineList (data) {
  const _url = SDT + 'tcmCPatentmedicineOrg/getCenterMedicineListBy';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//匹配药品关系
export function matchMedicine (data) {
  const _url = SDT + 'tcmCPatentmedicineOrg/matchMedicine';
  return request({
    url: _url,
    method: 'post',
    data,
  })
}

//解除药品匹配关系
export function deleteMatchMedicine (data) {
  const _url = SDT + 'tcmCPatentmedicineOrg/deleteMatchMedicine';
  return request({
    url: _url,
    method: 'get',
    data,
  })
}

//设置权重
export function updateMedicineOrg (data) {
  const _url = SDT + 'tcmCPatentmedicineOrg/updateMedicineOrg';
  return request({
    url: _url,
    method: 'post',
    data,
  })
}