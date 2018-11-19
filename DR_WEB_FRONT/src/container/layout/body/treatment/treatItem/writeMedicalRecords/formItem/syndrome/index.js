import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import SyndromePop from './syndromePop';

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
            label="辩证要点："
          >
          {getFieldDecorator('syndrome', {
            initialValue: initialValue
          })(
            <SyndromePop itemFieldname='syndrome'/>
          )}
          </FormItem>
        </Col>
      </Row>
    );
  }
}
/*
@作者：姜中希
@日期：2018-09-03
@描述：诊疗单表单辩证要点诊表单项
*/
