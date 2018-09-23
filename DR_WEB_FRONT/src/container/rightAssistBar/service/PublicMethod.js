const PublicMethod = {};
import $ from 'jquery';
import { Modal } from 'antd';
import { hashHistory } from 'react-router';

  PublicMethod.GetUUID = () => {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  };

  //将字符串转化成dom对象;string转换为xml
  PublicMethod.StringToXml = (xmlString) => {
      var xmlDoc;
      if (typeof xmlString == "string") {
          //FF
          if (document.implementation.createDocument) {
              var parser = new DOMParser();
              xmlDoc = parser.parseFromString(xmlString, "text/xml");
          } else if (window.ActiveXObject) {
              xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
              xmlDoc.async = false;
              xmlDoc.loadXML(xmlString);
          }
      }
      else {
          xmlDoc = xmlString;
      }
      return xmlDoc;
  };
  //xml转换为string
  PublicMethod.XmlToString = (xmlDoc) => {
      if (window.ActiveXObject) {
          return xmlDoc.xml;  //IE
      } else {
          return (new XMLSerializer()).serializeToString(xmlDoc);  //FF
      }
  };
  /*
  *提示
  *@ result {Boolean} 结构
  *@ content {string} 描述
  *@ return void
  */
  PublicMethod.Hint = (title,result,content) =>{
    console.log("result {}",result);
    if(result == true){
      Modal.success({
        title:title,
        content,
        okText: '确定',
      });
    }else if(result == false){
      Modal.error({
        title:title,
        content,
        okText: '确定',
      });
    }else{
      Modal.info({
        title:title,
        content,
        okText: '确定',
      });
    }
  };
  /*
  *随机颜色
  */
  PublicMethod.randomColor = () =>{
    var colorList=['#FC6B94','#FC946B','#0099FF','#FF9900','#4AB41E','#FF6600','#1f9baa','#0080ff','#219167',]
    var value = Math.floor(Math.random()*9);
    return colorList[value];
  }
//module.exports = CallModule;//导出模块——调用组件
global.$publicMethod = PublicMethod;
export { PublicMethod };
