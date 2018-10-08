import { Modal } from 'antd';
import jQuery from 'jquery';

function getResource(params , success, error ){
  const { type = 'get', dataType = 'JSON',contentType = 'application/json;charset=UTF-8', async = true, server_url = config_service_url, processData = true} = params;
  jQuery.ajax({
    type: type,
    url: server_url + params.url,
    processData: processData,
    dataType: dataType,
    contentType: contentType,
    traditional: true, // 可以传递数组参数
    data : params.data,
    async : async,
    // timeout: 2000, // 请求超时时间
    success: success,
    error : error
  });
}
function error(res){
  if(window.modal == undefined || window.modal == null){ // 避免同时出现多个网络异常弹框的请求
    window.modal = Modal.error({
      title: '网络异常，请您检查网络连接情况！',
      onOk: ()=>{
        window.modal = null
      }
    });
  }
};
export default getResource;
/*
@作者：姜中希
@日期：2018-06-06
@描述：ajax函数的封装，在需要的地方引入即可,提供部分默认值
*/
