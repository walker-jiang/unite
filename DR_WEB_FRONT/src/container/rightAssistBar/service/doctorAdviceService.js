import Xhr from './xhr/index';
import { Message  } from 'antd';
import { Simulation } from './simulationService';
/**
 * 封装ajax请求-----病历书写单
 * @param {any}
 */
const testData = false;
class DoctorAdviceService {

    /**
     * 医嘱模板-----历史病例-----金野
     */
    GetList(params,callBack){
        //config_service_url
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('GET','application/x-www-form-urlencoded;charset=utf-8','http://10.192.4.28:8088/BuOrderController/getBuOrderHistory', params, false, callBack);
        }
    }

    /**
     * 医嘱模板-----获取医嘱单详细信息-----金野
     */
    GetData(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('GET','application/x-www-form-urlencoded;charset=utf-8',config_service_url+'BuOrderController/getData', params, false, callBack);
        }
    }

    /**
     * 医嘱模板-----获取医嘱模板列表----易超文
     */
    Medicalordertemplate(params,callBack){
      //
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.postAddUrl(config_service_url+'medicalordertemplate/query/index/all', params, false, callBack);
        }
    }

    /**
     * 医嘱模板-----导入患者历史医嘱列表-----金野
     */
    ImportList(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('get','application/x-www-form-urlencoded;charset=utf-8',config_service_url+'BuOrderController/importList', params, false, callBack);
        }
    }
    /**
     * 辩证论证列表获取-----获取证侯对应治法列表-----孙磊
     */
    ImtreatprelistGetList(params,callBack,callBackError){
        //config_InteLigenTreat_url+
        if(testData){
          return Simulation.ImtreatprelistGetList(callBack);
        }else{
          Xhr.post(
            'get',
            'application/x-www-form-urlencoded;charset=utf-8',
            config_InteLigenTreat_url+'TCMAE/api/Imtreatprelist/GetImtreatList',
            params,
            false,
            callBack,
            callBackError
          );
        }
    }
    /**
     * 草药引入
     */
    getcmdrugs(params,callBack){
        //config_InteLigenTreat_url
        if(testData){
          return Simulation.getcmdrugs(callBack);
        }else{
          Xhr.post(
            'get',
            'application/x-www-form-urlencoded;charset=utf-8',
            config_InteLigenTreat_url+'TCMAE/api/scheme/getcmdrugs',
            params,
            false,
            callBack
          );
        }
    }
    /**
     * 中成药引入
     */
    getCpm(params,callBack){
        //config_InteLigenTreat_url
        if(testData){
          return Simulation.getCpm(callBack);
        }else{
          Xhr.post(
            'get',
            'application/x-www-form-urlencoded;charset=utf-8',
            config_InteLigenTreat_url+'/TCMAE/api/scheme/getCpm',
            params,
            false,
            callBack
          );
        }
    }
    /**
     * 适宜技术引入
     */
    getSt(params,callBack){
        //callBack(Simulation.ImtreatprelistGetList())
        if(testData){
          return Simulation.getSt(callBack);
        }else{
          Xhr.post(
            'get',
            'application/x-www-form-urlencoded;charset=utf-8',
            config_InteLigenTreat_url+'TCMAE/api/scheme/getSt',
            params,
            false,
            callBack
          );
        }
    }
    /**
     * 适宜技术引入-----选择中医适宜技术治疗项/治疗明细-----易超文
     */
    getStQueryTable(params,callBack){
      //config_service_url
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post(
            'get',
            'application/json;charset=utf-8',
            config_service_url+'BaMedicalDtlController/getDtlWithOrderSuit',
            params,
            false,
            callBack
          );
        }
    }
    /**
     * 医嘱模板引入
     */
    importTem(params,callBack){
        //callBack(Simulation.ImtreatprelistGetList())
        if(testData){
          return Simulation.getSt(callBack);
        }else{
          //config_service_url
          Xhr.post(
            'get',
            'application/x-www-form-urlencoded;charset=utf-8',
            config_service_url+'/BuOrderController/importTem',
            params,
            false,
            callBack
          );
        }
    }
    /**
     * 名医医案引入
     */
    addPrescription(params,callBack){
        //config_InteLigenTreat_url+
        if(testData){
          return Simulation.getSt(callBack);
        }else{
          Xhr.post(
            'get',
            'application/x-www-form-urlencoded;charset=utf-8',
            config_InteLigenTreat_url+'TCMAE/medicalCase/addPrescription',
            params,
            false,
            callBack
          );
        }
    }
    /**
     * 医嘱模板----病例模板（获取树状图详情）-----金野
     */
    QueryTreeDetail(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('GET','application/json', config_service_url+'BuOrderTempletController/getData', params, true, callBack);
        }
    }
}

// 实例化再导出
export default new DoctorAdviceService();
