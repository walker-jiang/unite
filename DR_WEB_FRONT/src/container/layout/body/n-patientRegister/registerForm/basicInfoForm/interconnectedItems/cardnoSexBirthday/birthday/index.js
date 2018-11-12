import React, {Componentn, PureComponent  } from 'react'; // react核心
import styled from 'styled-components';
import { Form, Col, Row, DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { today } from 'commonFunc/defaultData';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import radioSty from 'components/antd/style/radio';
import Input from 'components/dr/input/basicInput';
import datePickerSty from 'components/antd/style/datePicker';

const FormItem = Form.Item;

export default class Birthday extends PureComponent  {
  render() {
    let { formItemLayout, getFieldDecorator, disabled, getFieldValue } = this.props.commontProps;
    let initialValue = this.props.initialValue;
    let age = '';
    if(getFieldValue('birthday')){
      age = extractDataFromIdentityCard.getAgeFromBirthday(getFieldValue('birthday') ? getFieldValue('birthday').format('YYYY-MM-DD') : '');
    }else{
      if(initialValue){
        age = extractDataFromIdentityCard.getAgeFromBirthday(initialValue ? initialValue : '');
      }
    }
    return (
      <SpecSpecFormItem
        {...formItemLayout}
        colon={false}
        label="生日/年龄："
        >
        {getFieldDecorator('birthday', {
          rules: [{ required: true, message: '请选择患者生日!' }],
          initialValue: initialValue ? moment(initialValue, 'YYYY-MM-DD') : ''
        })(
          <SpecDatePicker locale={locale} allowClear disabled={getFieldValue('cardtype') == '01'}/>
        )}
        <InputWithLine placeholder='年龄' disabled value={age} onChange={() => {}} />
      </SpecSpecFormItem>
    )
  }
}
const SpecSpecFormItem = styled(FormItem)`
  .ant-form-item-children{
    display: flex;
    align-items: flex-start;
  }
`;
const SpecDatePicker = styled(DatePicker)`
  ${datePickerSty.bottomBorder}
`;
const InputWithLine = styled.input.attrs({
  type: 'text',
  autoComplete: 'off',
  placeholder: props => props.placeholder
})`
  border-bottom: 1px solid rgba(215, 215, 215, 1);
  border-top: none;
  &&& {
    width: 75px !important;
  }
  margin-left: 20px;
  margin-top: 6px;
  border-left: none;
  line-height: 25px;
  color: black;
  border-right: none;
  background: transparent;
  font-size: 12px;
  word-break: break-all;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:focus {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    word-break: break-all;
    outline: none
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
/*
@作者：姜中希
@日期：2018-10-31
@描述：患者信息证件号，生日，年龄联动组件-生日
*/
