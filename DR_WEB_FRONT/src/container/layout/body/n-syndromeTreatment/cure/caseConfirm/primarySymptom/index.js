import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import PrimarySymptomPop from './primarySymptomPop';

const FormItem = Form.Item;

export default class Index extends Component {
  render() {
    const { getFieldDecorator, formItemLayout, initialValue} = this.props;
    return (
      <Row>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            colon={false}
            label="主症："
          >
          {getFieldDecorator('pridepict', {
            initialValue: initialValue,
          })(
            <PrimarySymptomPop />
          )}
          </FormItem>
        </Col>
      </Row>
    );
  }
}
const SpecRow = styled(Row)`
  .ant-form-item {
    margin-bottom: 10px;
  }
`;
/*
@作者：姜中希
@日期：2018-10-15
@描述：病情病历确认主症框
*/
