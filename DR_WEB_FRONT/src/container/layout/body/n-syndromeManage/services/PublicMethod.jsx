const PublicMethod = {};
import $ from 'jquery';
import { Modal } from 'antd';
import { hashHistory } from 'react-router';
global.$IsStaticPage = 0 ;// 0是测试  1是正式
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
      //获取当前时间 YYYY + MM + DD + HH + mm + ss;
      PublicMethod.formatTime = (xmlDoc) => {
          const myDate = new Date();
          const YYYY = myDate.getFullYear();
          let MM = myDate.getMonth()+1;       // 获取当前月份(0-11,0代表1月)
          MM = (MM > 9 ? '' : '0') + MM;
          let DD = myDate.getDate();
          DD = (DD > 9 ? '' : '0') + DD;
          let HH = myDate.getHours();       // 获取当前小时数(0-23)
          HH = (HH > 9 ? '' : '0') + HH;
          let mm = myDate.getMinutes();     // 获取当前分钟数(0-59)
          mm = (mm > 9 ? '' : '0') + mm;
          let ss = myDate.getSeconds();     // 获取当前秒数(0-59)
          ss = (ss > 9 ? '' : '0') + ss;
          const theDate = YYYY + MM + DD + HH + mm + ss;
          return theDate;
      };
      PublicMethod.formatDate = (Time) => {
        if(Time == "" || Time == undefined){
          return false;
        }
        console.log("准备格式化的时间为 {}",Time);
        return Time.substring(0,4)+"-"+Time.substring(4,6)+"-"+Time.substring(6,8)+
        " "+Time.substring(8,10)+":"+Time.substring(10,12)+":"+Time.substring(12,14);
      },



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

      PublicMethod.birthDateChange = (date, dateString) =>{
        console.log("date, dateString",date, dateString)
        if (date==null){
            return {age:0,ageUill:"天"}
        }else{
          var returnAge;
          var strBirthdayArr=dateString.split("-");
          var birthYear = strBirthdayArr[0];
          var birthMonth = strBirthdayArr[1];
          var birthDay = strBirthdayArr[2];
          var d = new Date();
          var nowYear = d.getFullYear();
          var nowMonth = d.getMonth() + 1;
          var nowDay = d.getDate();
          var time=Date.parse(d);
          var lasttime=Date.parse(dateString);
          var day=parseInt((time-lasttime)/(1000*60*60*24));
          var str = dateString;
         var d1 = new Date(str);
         var m = Math.abs((d.getFullYear()-d1.getFullYear())*12+d.getMonth()-d1.getMonth());
         console.log("%s和当前日期相差%d年%d月11111111",str,m/12>>0,m%12);
         var year = m/12>>0
         var month = m%12
          if (day<31) {
            returnAge = day                                                     //输出天
            return {age:day,ageUill:"天"};
          }else if (year ==0 && month < 12) {
              returnAge = month;
              return {age:month,ageUill:"月"};
          }
          else{                                                                 //输出岁
            if(nowYear == birthYear){   //同年

              if (nowMonth != birthMonth) {
                  var dayDiff = nowDay - birthDay;//日之差
                  if(dayDiff < 0)
                  {
                      returnAge = monthDiff - 1;
                  }
                  else
                  {
                    var monthDiff = nowMonth - birthMonth;//月之差
                      returnAge = monthDiff ;
                        return {age:month,ageUill:"月"}
                  }
              }else {
                 if (nowDay==birthDay) {
                    returnAge =  monthDiff - 1;
                 }else {
                   returnAge= nowMonth - birthMonth
                 }
              }

            }
            else {                                      //不同年
                var ageDiff = nowYear - birthYear ; //年之差
                if(ageDiff > 0){
                    if(nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay;//日之差
                        if(dayDiff < 0)
                        {
                            returnAge = ageDiff - 1;
                        }
                        else
                        {
                            returnAge = ageDiff ;
                        }
                    }
                    else
                    {
                        var monthDiff = nowMonth - birthMonth;//月之差
                        if(monthDiff < 0)
                        {
                            returnAge = ageDiff - 1;

                        }
                        else
                        {
                            returnAge = ageDiff ;
                        }
                    }
                }
                else
                {
                    returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                }
            }
            return {age:returnAge,ageUill:"岁"}
          }

      }
      //参数为 长度基数  ，例如：
      // 8 character ID (base=2)
      // uuid(8, 2) // "01001010"
      // 8 character ID (base=10)
      // uuid(8, 10) // "47473046"
      // 8 character ID (base=16)
      // uuid(8, 16) // "098F4D35"
      PublicMethod.Get32UUID = (len, radix) => {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
           // Compact form
           for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
           // rfc4122, version 4 form
           var r;

           // rfc4122 requires these characters
           uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
           uuid[14] = '4';

           // Fill in random data. At i==19 set the high bits of clock sequence as
           // per rfc4122, sec. 4.1.5
           for (i = 0; i < 36; i++) {
              if (!uuid[i]) {
                 r = 0 | Math.random()*16;
                 uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
              }
           }
        }

        return uuid.join('');
      }

      PublicMethod.randomColor = () =>{
        var colorList=['#FC6B94','#FC946B','#0099FF','#FF9900','#4AB41E','#FF6600','#1f9baa','#0080ff','#219167',]
        var value = Math.floor(Math.random()*9);
        return colorList[value];
      }
  }
//module.exports = CallModule;//导出模块——调用组件
global.$publicMethod = PublicMethod;
export { PublicMethod };
