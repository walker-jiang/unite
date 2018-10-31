import React, {Component} from 'react';
import { Form, Row, Col, Input } from 'antd';

const FormItem = Form.Item;

export default class TmpName extends Component {
  render() {
    const { getFieldDecorator, formItemLayout, initialValue, disabled = false} = this.props;
    return (
      <Row>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            colon={false}
            className='height'
            label="模板名称"
          >
          {getFieldDecorator('temname', {
            initialValue: initialValue
          })(
            <Input disabled={disabled}/>
          )}
          </FormItem>
        </Col>
      </Row>
    );
  }
}
/*
@作者：杨腊梅
@日期：2018-10-22
@描述：病历模板名称
*/