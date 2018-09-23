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
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.postAddUrl('/template/query/index/all', params, false, callBack);
        }
    }
    /**
     * 病历书写单-----病例模板（获取树状图）-----金野
     */
    QueryTree(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('BuPatientCaseController/getPatient', params, true, callBack);
        }
    }
    /**
     * 病历书写单/医嘱模板-----历史病例-----金野
     */
    GetList(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.post('BuTempletManageController/getList', params, false, callBack);
        }
    }



}

// 实例化再导出
export default new MedicalRWService();
