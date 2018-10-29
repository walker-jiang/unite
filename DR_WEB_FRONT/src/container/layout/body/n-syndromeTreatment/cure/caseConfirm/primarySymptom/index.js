import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import PrimarySymptomPop from './primarySymptomPop';

const FormItem = Form.Item;

export default class Index extends Component {
  render() {
    const { getFieldDecorator, formItemLayout, initialValue, isRequired = false} = this.props;
    return (
      <Row>
        <Col span={24}>
          <SpecFormItem
            isRequired={isRequired}
            {...formItemLayout}
            colon={false}
            label="主诉："
          >
          {getFieldDecorator('pridepict', {
            initialValue: initialValue,
          })(
            <PrimarySymptomPop />
          )}
        </SpecFormItem>
        </Col>
      </Row>
    );
  }
}
const SpecFormItem = styled(FormItem)`
  &&& .ant-form-item-label > label:before {
    display: ${props => props.isRequired ? 'inline-block' : 'none'};
    margin-right: 4px;
    content: "*";
    font-family: SimSun;
    line-height: 1;
    font-size: 14px;
    color: #f5222d;
  }
`;
/*
@作者：姜中希
@日期：2018-10-15
@描述：病情病历确认主症框
*/
