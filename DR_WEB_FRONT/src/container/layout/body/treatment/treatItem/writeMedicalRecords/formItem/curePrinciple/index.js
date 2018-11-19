import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import CurePrinciplePop from './curePrinciplePop';

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
            label="治疗原则："
          >
          {getFieldDecorator('treatprinciple', {
            initialValue: initialValue,
          })(
            <CurePrinciplePop itemFieldname='treatprinciple'/>
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
