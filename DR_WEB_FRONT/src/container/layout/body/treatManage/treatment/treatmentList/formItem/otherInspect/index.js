import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import Input from 'components/dr/input/basicInput';

const FormItem = Form.Item;

export default class Index extends Component {
  render() {
    const { getFieldDecorator, formItemLayout, initialValue} = this.props;
    return (
      <Row className='height'>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            colon={false}
            label="其它检查：">
            {getFieldDecorator('psycheck', {
                initialValue: initialValue
              })(<Input />)
            }
          </FormItem>
        </Col>
      </Row>
    );
  }
}
/*
@作者：姜中希
@日期：2018-09-03
@描述：诊疗单表单其它检查诊表单项
*/
