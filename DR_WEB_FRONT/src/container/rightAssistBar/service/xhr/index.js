const Tool = {};
import $ from 'jquery';
import PublicMethod from '../PublicMethod.js';
import { browserHistory } from 'react-router';
import { Modal, Message ,Button } from 'antd';
const jQuery = $;

/**
 * 发送ajax请求和服务器交互
 * @param {object} mySetting 配置ajax的配置
 */
Tool.ajax = function (mySetting) {
    var setting = {
        url: window.location.pathname, //默认ajax请求地址
        async: true, //true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
        type: 'GET', //请求的方式
        data: {}, //发给服务器的数据
        dataType: 'json',
        success: function (text) { }, //请求成功执行方法
        error: function () { } //请求失败执行方法
    };

    var aData = []; //存储数据
    var sData = ''; //拼接数据
    //属性覆盖
    for (var attr in mySetting) {
        setting[attr] = mySetting[attr];
    }
    for (var attr in setting.data) {
        aData.push(attr + '=' + filter(setting.data[attr]));
    }
    sData = aData.join('&');
    setting.type = setting.type.toUpperCase();

    var xhr = new XMLHttpRequest();
    try {
        if (setting.type == 'GET' || setting.type == 'DELETE') { //get、delete方式请求
            sData = setting.url + '?' + sData;
            xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async);
            xhr.send();
        } else { //post方式请求
            xhr.open(setting.type, setting.url, setting.async);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(sData);
        }
    } catch (e) {
        return httpEnd();
    }

    if (setting.async) {
        xhr.addEventListener('readystatechange', httpEnd, false);
    } else {
        httpEnd();
    }

    function httpEnd() {
        if (xhr.readyState == 4) {
            var head = xhr.getAllResponseHeaders();
            var response = xhr.responseText;
            //将服务器返回的数据，转换成json

            if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }
            if (xhr.status == 200) { // 请求成功
                setting.success(response, setting, xhr);
            } else { // 请求失败
                if(!xhr.withCredentials) {
                    // 重新登录
                    window.location.href = '/login';
                } else {
                    setting.error(setting, xhr);
                }
            }
        }
    }
    xhr.end = function () {
        xhr.removeEventListener('readystatechange', httpEnd, false);
    }

    function filter(str) { //特殊字符转义
        str += ''; //隐式转换
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
    }
    console.log("xhr",xhr);
    return xhr;
};

/**
 * 封装ajax put请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.put = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'PUT', //请求的方式
        data: data, //发给服务器的数据
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};

/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.post = function (type, contentType, pathname, data, async, callBack, callBackError) {
    console.log("POST地址为:",pathname);
    console.log("POST数据为:",data);
    var returnResult = {}
    //可用 fetch替换
    jQuery.ajax({
      type: type, //请求的方式
      url: pathname,//ajax请求地址
      dataType: 'JSON',//数据类型
      traditional: true, // 可以传递数组参数
      data: data,//发给服务器的数据
      async: async,//true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
      success: (res) => {
        console.log("POST返回数据:",res);
        callBack(res);
      },
      error:(res) => {
        if(typeof(res) == "function"){
          callBackError(res);
        }else{
          global.$publicMethod.Hint("提示",'info',"服务出错，请稍后重试");
        }
      }
    });
    return returnResult;
};
/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.postAddUrl = function (pathname, data, async, callBack) {
    console.log("POST地址为:",pathname);
    console.log("POST数据为:",data.BaHerbalMedicine);
    var returnResult = {}
    //可用 fetch替换
    $.ajax({
      type: 'POST', //请求的方式
      url: pathname,//ajax请求地址
      dataType: 'json',//数据类型
      contentType: 'application/json',
      data: JSON.stringify(data),//发给服务器的数据
      async: async,//true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
      success: (res) => {
        console.log("POST返回数据:",res);
        callBack(res);
      },
      error:(jqXHR, textStatus, errorThrown) => {
        if(textStatus=="timeout"){
          global.$publicMethod.Hint("提示",'info',"服务连接超时，检查网络后请重试");
        }else{
          global.$publicMethod.Hint("提示",'info',"服务出错，请稍后重试");
        }
      }
    });
    return returnResult;
};
export default Tool;
