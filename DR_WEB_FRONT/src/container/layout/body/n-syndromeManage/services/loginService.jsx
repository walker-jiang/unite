import Xhr from './xhr/index';
import Config from '../Config/index';
import { hashHistory } from 'react-router';
import { Message  } from 'antd';
import { Simulation } from './SimulationService';
/**
 * 封装ajax请求
 * @param {any}
 */

class LoginService {

    /**
     * 登录界面
     * @param {username} 用户名
     * @param {password} 密码
     * @return {登录信息}
     */
    goLogin(params) {
      window.sessionStorage.setItem('username', "付国霖"); // 用户名
      window.sessionStorage.setItem('deptid', "1101"); // 科室ID
      window.sessionStorage.setItem('orgid', "10000"); // 机构ID
      window.sessionStorage.setItem('userid', "2"); // 用户ID
      window.sessionStorage.setItem('post', "1"); // 医生级别
      //正式就替换下面的
      // window.sessionStorage.getItem('username'); // 用户名
      // window.sessionStorage.getItem('deptid'); // 科室ID
      // window.sessionStorage.getItem('orgid'); // 机构ID
      // window.sessionStorage.getItem('userid'); // 用户ID
      // window.sessionStorage.getItem('post'); // 医生级别
    }

}

// 实例化再导出
export default new LoginService();
