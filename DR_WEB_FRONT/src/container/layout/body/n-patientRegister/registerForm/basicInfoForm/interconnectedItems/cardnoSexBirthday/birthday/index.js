import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Form, Col, Row, DatePicker } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { today } from 'commonFunc/defaultData';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import radioSty from 'components/antd/style/radio';
import Input from 'components/dr/input/basicInput';
import datePickerSty from 'components/antd/style/datePicker';

const FormItem = Form.Item;

export default class Sex extends Component {
  constructor(props){
    super(props);
    this.changeDate = this.changeDate.bind(this);
  };
  /**
   * [changeDate 日期选择器日期改变的监听函数]
   * @param  {[type]} moment     [带格式的日期对象]
   * @param  {[type]} dateString [日期字符串]
   * @return {[type]}            [undefined]
   */
  changeDate(moment, dateString){
    let patientInfo = this.state.patientInfo;
    patientInfo['birthday'] = moment.format('YYYY-MM-DD');
  };
  render() {
    let { formItemLayout, getFieldDecorator, disabled } = this.props.commontProps;
    let initialValue = this.props.initialValue;
    let age = extractDataFromIdentityCard.getAgeFromBirthday(initialValue);
    return (
      <SpecSpecFormItem
        {...formItemLayout}
        colon={false}
        label="生日/年龄："
        >
        {getFieldDecorator('birthday', {
          initialValue: moment(initialValue, 'YYYY-MM-DD')
        })(
          <SpecDatePicker disabled onChange={this.changeDate} disabled allowClear={false}/>
        )}
        <SpecSpecInput placeholder='年龄' disabled value={age} onChange={() => {}}/>
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
const SpecSpecInput = styled(Input)`
  width: 50px;
  margin-left: 20px;
  margin-top: -4px;
`;
/*
@作者：姜中希
@日期：2018-10-31
@描述：患者信息证件号，生日，年龄联动组件-生日
*/
