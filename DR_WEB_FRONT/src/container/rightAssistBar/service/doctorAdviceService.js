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
     * 病历书写单----病历模板（和搜索）-----易超文
     */
    QueryTable(params,callBack){
        if(testData){
          return Simulation.GetList();
        }else{
          Xhr.postAddUrl(config_AssistBar_url+'/template/query/index/all', params, false, callBack);
        }
    }

}

// 实例化再导出
export default new DoctorAdviceService();
