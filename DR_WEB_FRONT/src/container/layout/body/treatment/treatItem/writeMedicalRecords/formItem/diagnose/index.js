import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import DiagnosePop from '../../../drAdviceManage/chHerbalMedicine/herbalForm/diagnose';
import { getDiagnoseText } from 'commonFunc/transform';


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
            label="诊断："
          >
          {getFieldDecorator('diagnose', {
            initialValue: initialValue,
            rules: [{
               required: true,
               message: '请输入诊断信息',
             }],
          })(
            <DiagnosePop icon_right='-20px'/>
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
@描述：诊疗单表单诊断诊表单项
*/
