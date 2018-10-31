import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Form, Col, Row } from 'antd';

const FormItem = Form.Item;

export default class Province extends Component {
  render() {
    let { formItemLayout, getFieldDecorator, disabled } = this.props.commontProps;
    const initialValue = this.props.initialValue;
    const province = this.props.province;
    return (
      <SpecFormItem
        labelCol={{span: 8}}
        wrapperCol={{span: 14}}
        colon={false}
        label="住址："
        >
          {getFieldDecorator('province', {
            initialValue: initialValue
          })(
            <SpecSelect labelInValue onChange={this.changeProvinceSelector} disabled={disabled}  onFocus={() => {this.patientName.hidePopTable()}}>
            {
              province.map((item, index)=>
                <Option key={index} value={item.provid}>{item.provname}</Option>
              )
            }
            </SpecSelect>
          )}
      </SpecFormItem>
    )
  }
}
const SpecFormItem = styled(FormItem)`
  &&& {
    margin-bottom: 8px;
  }
`;
/*
@作者：姜中希
@日期：2018-10-31
@描述：患者信息省市县联动-省份
*/
