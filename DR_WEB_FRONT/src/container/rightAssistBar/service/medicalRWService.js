import Xhr from './xhr/index';
import { Message  } from 'antd';
import { Simulation } from './simulationService';
import getResource from '../../../util/commonFunction/ajaxGetResource';
/**
 * 封装ajax请求-----病历书写单
 * @param {any}
 */
const testData = false;
class MedicalRWService {

    /**
     * 病历书写单----病历模板（和搜索）-----易超文
     */
    QueryTable(params,callBack){
      //config_service_url
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.postAddUrl(config_service_url+'template/query/index/all', params, false, callBack);
        }
    }
    /**
     * 病历书写单-----病例模板（获取树状图）-----金野
     */
    QueryTree(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('GET','application/json', config_service_url+'BuTempletManageController/getList', params, true, callBack);
        }
    }
    /**
     * 病历书写单-----病例模板（获取树状图详情）-----金野
     */
    QueryTreeDetail(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('GET','application/json', config_service_url+'BuPatientCaseTempletController/getData', params, true, callBack);
        }
    }

    /**
     * 病历书写单/医嘱模板-----历史病例-----金野
     */
    GetList(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('GET','application/x-www-form-urlencoded;charset=utf-8',config_service_url+'BuPatientCaseController/getPatient', params, false, callBack);
        }
    }

    /**
     * 病历书写单/治疗反馈-----答题-----尧尧  "typeid": 1
     */
    queryAnswer(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.postAddUrl(config_service_url+'BuTreatfeedbackController/getList', params, false, callBack);
        }
    }

    /**
     * 病历书写单/治疗反馈-----统计图----尧尧  billid:201837522770543143
     */
    getChart(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.postAddUrl(config_service_url+'BuTreatfeedbackController/getChart', params, false, callBack);
        }
    }

    /**
     * 病历书写单/辅助诊断列表---------孙磊
     */
    GetAuxiliaryList(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post(
            'post',
            'application/x-www-form-urlencoded;charset=utf-8',
            config_InteLigenTreat_url+'TCMAE/diagnose/get/index',
            "content="+JSON.stringify(params),
            false,
            callBack
          );
        }
    }

    /**
     * 病历书写单/加入诊断获取疾病对象--------金野
     */
    QueryDiseaseList(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('GET','application/json',config_service_url+'BaDiseaseController/getList', params, false, callBack);
        }
    }

}

// 实例化再导出
export default new MedicalRWService();
