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
    }
    if(validateResult){
      let birthday = extractDataFromIdentityCard.getBirthdayFromIdCard(value);
      let sex = extractDataFromIdentityCard.getSexFromIdCard(value);
      this.props.commontProps.setFieldsValue({ birthday: moment(birthday, 'YYYY-MM-DD'), sex: sex});
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
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
              <SpecInput placeholder='请输入患者证件号码' />
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
