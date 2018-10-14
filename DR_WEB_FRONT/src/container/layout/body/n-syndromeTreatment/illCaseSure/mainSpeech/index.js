import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import MainSpeechPop from './mainSpeechPop';

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
            className='height'
            label="主症："
          >
          {getFieldDecorator('pridepict', {
            initialValue: initialValue
          })(
            <MainSpeechPop title='主症'/>
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
@描述：诊疗单表单患者主诉表单项
*/
