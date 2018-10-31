
/*
此文件为全局的配置文件
*/
// 219.234.5.58:8087
// 192.168.1.146:8087
// 10.10.200.114:8087
// http://10.192.5.107:8086/
//219.234.5.58:8765
// const config_service_url = 'http://219.234.5.58:8087/'; // 后台服务地址 10.192.4.233:8088   219.234.5.58:8087
// const config_AssistBar_url = 'http://219.234.5.58:8088/'; // 测试病历书写-----易超文
// const config_CureService_url = 'http://219.234.5.58:8098/'; // 治未病后台服务地址
// const config_InteLigenTreat_url = 'http://219.234.5.58:8765/'; // 辨证论治后台服务地址
// const config_login_url = 'http://219.234.5.58:8086/'; // 登录服务地址
// const config_InteLigenTreatManagement_url = 'http://10.192.1.115:8087/'; // 辨证论治后台服务地址
// const config_local_url = 'https://www.xiaotangren.com:8443'; // 前端服务地址提供给客户端
// const config_syndromeTreatment_url = 'http://10.192.1.115:8088/';
const config_service_url = 'http://192.168.103.166:8088/'; // 后台服务地址 10.192.4.233:8088   219.234.5.58:8087
const config_AssistBar_url = 'http://192.168.103.166:8088/'; // 测试病历书写-----易超文
const config_AssistBar_urlTwo = 'http://192.168.103.166:8088/'; // 测试病历书写-----尧尧
const config_CureService_url = 'http://192.168.103.166:8098/'; // 治未病后台服务地址
const config_InteLigenTreat_url = 'http://192.168.103.166:8765/'; // 辨证论治服务地址
const config_taboo_url = 'http://192.168.103.166:8764/'; // 中药禁忌检验后台服务地址
const config_login_url = 'http://192.168.103.166:8085/'; // 登录服务地址
const config_InteLigenTreatManagement_url = 'http://192.168.103.166:8087/'; // 辨证论治后台服务地址
const config_BaiduEncyclopedia ='http://192.168.103.166:8080/';   // 百度百科查询服务地址
const config_local_url = 'http://192.168.103.166:8080'; // 前端服务地址提供给客户端
const colorData = ['#33cc00', '#ff0000', '#6cc' ] // His系统背景颜色
const pageSize = 5; // 分页时每页显示的记录数
const questionTemplate = "1" //治疗反馈题目模板类型
const systemName = '中医馆健康信息平台2.0'; // 系统名称
const release_version = 'Sinosoft Co,.Ltd.10.31.v1'; // 发布版本号
const defaultSysModuleList = [
  {
    "ctstamp": "2018-10-09 10:46:33",
    "menuid": "7",
    "menustate": "01",
    "menutype": "01",
    "modid": 7,
    "seqno": 1,
    "syModule": {
      "callurl": "http://www.xiaotangren.com:9999/index1.html",
      "ctstamp": "2018-09-10 16:32:46",
      "lastflag": 0,
      "level": 1,
      "moddesc": "ch_knowledge",
      "modid": 7,
      "modname": "中医知识库",
      "modno": "cs007",
      "modtype": "1",
      "seqno": 7,
      "superid": 0,
      "syModuleList": [],
      "syWorkList": [],
      "uctstamp": "2018-10-07 10:45:36",
      "useflag": "1",
      "user": null
    },
    "uctstamp": "2018-10-09 10:56:20",
    "useflag": "1",
    "userid": "1"
  }, {
    "ctstamp": "2018-10-09 10:46:31",
    "menuid": "5",
    "menustate": "01",
    "menutype": "01",
    "modid": 5,
    "seqno": 1,
    "syModule": {
      "callurl": "/Layout/syndromeTreatment",
      "ctstamp": "2018-09-10 16:28:43",
      "lastflag": 0,
      "level": 1,
      "moddesc": "syndrome_treatment",
      "modid": 5,
      "modname": "辩证论治",
      "modno": "cs005",
      "modtype": "1",
      "seqno": 5,
      "superid": 0,
      "syModuleList": [],
      "syWorkList": [],
      "uctstamp": "2018-10-07 10:45:36",
      "useflag": "1",
      "user": null
    },
    "uctstamp": "2018-10-09 10:56:19",
    "useflag": "1",
    "userid": "1"
  }, {
    "ctstamp": "2018-10-09 10:46:32",
    "menuid": "6",
    "menustate": "01",
    "menutype": "01",
    "modid": 6,
    "seqno": 1,
    "syModule": {
      "callurl": "/Layout/cureNotIll",
      "ctstamp": "2018-09-10 16:30:41",
      "lastflag": 0,
      "level": 1,
      "moddesc": "cure_not_ill",
      "modid": 6,
      "modname": "治未病",
      "modno": "cs006",
      "modtype": "1",
      "seqno": 6,
      "superid": 0,
      "syModuleList": [],
      "syWorkList": [],
      "uctstamp": "2018-10-07 10:45:36",
      "useflag": "1",
      "user": null
    },
    "uctstamp": "2018-10-09 10:56:20",
    "useflag": "1",
    "userid": "1"
  }
];
