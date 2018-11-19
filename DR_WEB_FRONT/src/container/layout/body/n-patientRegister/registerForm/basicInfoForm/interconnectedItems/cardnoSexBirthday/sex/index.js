import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Form, Col, Row, Radio } from 'antd';
import radioSty from 'components/antd/style/radio';
import Input from 'components/dr/input/basicInput';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class Sex extends Component {
  render() {
    let { formItemLayout, getFieldDecorator, disabled, getFieldValue } = this.props.commontProps;
    const sex = this.props.sex;
    const initialValue = this.props.initialValue;
    return (
      <FormItem
        {...formItemLayout}
        colon={false}
        label="性别："
        >
        {getFieldDecorator('sex', {
          rules: [{ required: true, message: '请选择患者性别!' }],
          initialValue: initialValue
        })(
          <SpecRadioGroup disabled={disabled}>
          {
            sex.map(item => <Radio value={item.value} key={item.value}>{item.vname}</Radio>)
          }
          </SpecRadioGroup>
        )}
      </FormItem>
    )
  }
}
const SpecRadioGroup = styled(RadioGroup)`
  ${radioSty.borderRadioGroup}
`;
/*
@作者：姜中希
@日期：2018-10-31
@描述：患者信息证件号，生日，年龄联动组件-性别
*/
