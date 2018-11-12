/*
 * 全局配置文件
*/
module.exports = {
    config_service_url: 'http://219.234.5.58:8087/', // 后台服务地址
    // templateManagement: 'http://192.168.103.190:8087/',    //模板管理 ylm
    templateManagement: 'http://10.192.4.28:8088/',    //模板管理 ylm
    config_CureService_url : 'http://219.234.5.58:8098/', // 治未病后台服务地址
    config_InteLigenTreat_url : 'http://219.234.5.58:8765/', // 辨证论治后台服务地址
    config_login_url : 'http://219.234.5.58:8086/', // 辨证论治后台服务地址 不是辨证论治 有待修改 update
    SDT : 'http://119.61.64.104:8124/bzlz3/', // 辨证论治管理后台服务地址 ylm
    config_local_url : 'http://www.xiaotangren.com:9999', // 前端服务地址提供给客户端
    systemName : '中医馆健康信息平台2.0', // 系统名称
    colorData : ['#33cc00', '#ff0000', '#6cc' ], // His系统背景颜色
    pageSize : 5, // 分页时每页显示的记录数
    bundleMode : 'BS', // CS 客户端模式，BS 浏览器模式
    questionTemplate : "1", //治疗反馈题目模板类型
    menus: [
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
    ],
    api: {
    }
}
