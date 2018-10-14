/*
此文件为全局的配置文件
*/
// 219.234.5.58:8087
// 192.168.1.146:8087
// 10.10.200.114:8087
// http://10.192.5.107:8086/
//219.234.5.58:8765
const config_service_url = 'http://219.234.5.58:8087/'; // 后台服务地址 10.192.4.233:8088   219.234.5.58:8087
const config_AssistBar_url = 'http://219.234.5.58:8088/'; // 测试病历书写-----易超文
const config_AssistBar_urlTwo = 'http://219.234.5.58:8088/'; // 测试病历书写-----尧尧
const config_CureService_url = 'http://219.234.5.58:8098/'; // 治未病后台服务地址
const config_InteLigenTreat_url = 'http://219.234.5.58:8765/'; // 辨证论治后台服务地址
const config_login_url = 'http://219.234.5.58:8086/'; // 辨证论治后台服务地址
const config_InteLigenTreatManagement_url = 'http://10.192.1.115:8087/'; // 辨证论治后台服务地址
const config_local_url = 'https://www.xiaotangren.com:8443'; // 前端服务地址提供给客户端
const systemName = '中医馆健康信息平台2.0'; // 系统名称
const colorData = ['#33cc00', '#ff0000', '#6cc' ] // His系统背景颜色
const pageSize = 5; // 分页时每页显示的记录数
const bundleMode = 'BS'; // CS 客户端模式，BS 浏览器模式
const questionTemplate = "1" //治疗反馈题目模板类型
window.menus = [
  {key:"首页",show:true, id: 'home'},
  {key:"患者登记",show:true, id: 'registration'},
  {key:"今日诊疗",show:true, id: 'tideyDiagnosis'},
  {key:"病历中心",show:true, id: 'medicalCenter'},
  {key:"辨证论治",show:true, id: 'differentiation'},
  {key:"治未病",show:true, id: 'cureNotIll'},
  {key:"中医知识库",show:true, id: 'medicine'},
  {key:"个人设置",show:true, id: 'personalSettings'},
  {key:"系统管理",show:true, id: 'systemManagement'},
  {key:"辨证论治管理",show:true, id: 'patientReferral'},
  {key:"治疗记录",show:true, id: 'medicalRecords'},
  {key:"患者档案",show:true, id: 'patientRecords'},
];
