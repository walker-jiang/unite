import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Form, Col, Row } from 'antd';
import Input from 'components/dr/input/basicInput';
import moment from 'moment';
import 'moment/locale/zh-cn';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';

const FormItem = Form.Item;

export default class Cardno extends Component {
  /**
   * [validateCardno 身份证校验]
   * @param  {[type]}   rule     [校验规则]
   * @param  {[type]}   value    [当前值]
   * @param  {Function} callback [回调]
   * @return {[type]}            [undefined]
   */
  validateCardno = (rule, value, callback) => {
    if(this.props.commontProps.getFieldValue('cardtype') == '01'){ // 身份证号校验
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      let validateResult = true;
      if(value.trim() == ''){ // 非空校验
        validateResult = false;
        callback('请输入证件号码！');
      }
      if(reg.test(value) === false) // 格式校验
      {
        validateResult = false;
        callback('请输入有效证件号！');
      }else{
        if(value.length == 18){ // 对18位身份证进一步校验
          if(typeof(this.isCardID(value)) == 'string'){
            callback(this.isCardID(value));
          }
        }
      }
      ;
      if(validateResult){
        let birthday = extractDataFromIdentityCard.getBirthdayFromIdCard(value);
        let sex = extractDataFromIdentityCard.getSexFromIdCard(value);
        this.props.commontProps.setFieldsValue({ birthday: moment(birthday, 'YYYY-MM-DD'), sex: sex});
      }
    }else{
      if(value.trim() == ''){ // 非空校验
        callback('请输入证件号码！');
      }
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }
  isCardID(sId){
    var iSum=0 ;
    var info="" ;
    if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
    sId=sId.replace(/x$/i,"a");
    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} ;
    if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";
    let sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
    var d=new Date(sBirthday.replace(/-/g,"/")) ;
    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
    for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
    if(iSum%11!=1) return "你输入的身份证号非法";
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return true;
  }
  render() {
    let { formItemLayout, getFieldDecorator, disabled } = this.props.commontProps;
    const initialValue = this.props.initialValue;
    return (
      <RequiredFormItem
        {...formItemLayout}
        colon={false}
        label="证件号码："
        >
          {getFieldDecorator('cardno', {
            rules: [{ validator: this.validateCardno }],
            initialValue: initialValue })
            (
              <SpecInput placeholder='请输入患者证件号码' disabled={disabled}/>
            )
          }
      </RequiredFormItem>
    )
  }
}
const RequiredFormItem = styled(FormItem)`
  &&& .ant-form-item-label > label:before {
    display: inline-block;
    margin-right: 4px;
    content: "*";
    font-family: SimSun;
    line-height: 1;
    font-size: 14px;
    color: #f5222d;
  }
`;
const SpecInput = styled(Input)`
  line-height: 25px;
`;
/*
@作者：姜中希
@日期：2018-10-31
@描述：患者信息证件号，生日，年龄联动组件-证件号码
*/
