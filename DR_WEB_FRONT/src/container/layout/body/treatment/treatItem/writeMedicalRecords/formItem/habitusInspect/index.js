import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import Input from 'components/dr/input/basicInput';

const FormItem = Form.Item;

export default class Index extends Component {
  render() {
    const { getFieldDecorator, formItemLayout, initialValue, disabled = false} = this.props;
    return (
      <Row className='height'>
        <Col span={24}>
          <FormItem
            colon={false}
            {...formItemLayout}
            label='体格检查：'>
            <Col span={3} >
              <FormItem
                labelCol={{span: 12}}
                wrapperCol= {{span: 12}}
                colon={false}
                label="体温(T)"
              >
              {getFieldDecorator('temperature', {
                initialValue: initialValue.temperature
              })(
                <Input disabled={disabled}/>
              )}
              </FormItem>
            </Col>
            <Unit span={1}>℃</Unit>
            <Col span={3}>
              <FormItem
                labelCol={{span: 12}}
                wrapperCol= {{span: 12}}
                colon={false}
                label="呼吸(R)"
              >
              {getFieldDecorator('breath', {
                initialValue: initialValue.breath
              })(
                <Input disabled={disabled}/>
              )}
              </FormItem>
            </Col>
            <Unit>次/分</Unit>
            <Col span={3}>
              <FormItem
                labelCol={{span: 16}}
                wrapperCol= {{span: 8}}
                colon={false}
                label="脉搏(P)"
              >
              {getFieldDecorator('pulse', {
                initialValue: initialValue.pulse
              })(
                <Input disabled={disabled}/>
              )}
              </FormItem>
            </Col>
            <Unit>次/分</Unit>
            <Col span={4}>
              <FormItem
                labelCol={{span: 19}}
                wrapperCol= {{span: 5}}
                colon={false}
                label="收缩压/舒张压"
              >
              {getFieldDecorator('systolicPressure', {
                initialValue: initialValue.systolicPressure
              })(
                <Input disabled={disabled}/>
              )}
              </FormItem>
            </Col>
            <Slash>/</Slash>
            <Col span={1}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol= {{span: 16}}
                colon={false}
              >
              {getFieldDecorator('diastolicPressure', {
                initialValue: initialValue.diastolicPressure
              })(
                <Input disabled={disabled}/>
              )}
              </FormItem>
            </Col>
            <Unit>mnHg</Unit>
            <Col span={2}>
              <FormItem
                labelCol={{span: 12}}
                wrapperCol= {{span: 12}}
                colon={false}
                label="身高"
              >
              {getFieldDecorator('heightnum', {
                initialValue: initialValue.heightnum
              })(
                <Input disabled={disabled}/>
              )}
              </FormItem>
            </Col>
            <Unit>cm</Unit>
            <Col span={2}>
              <FormItem
                labelCol={{span: 12}}
                wrapperCol= {{span: 12}}
                colon={false}
                label="体重"
              >
              {getFieldDecorator('weightnum', {
                initialValue: initialValue.weightnum
              })(
                <Input disabled={disabled}/>
              )}
              </FormItem>
            </Col>
            <Unit>kg</Unit>
          </FormItem>
        </Col>
      </Row>
    );
  }
}
const Arrow= styled.img`
  cursor: pointer;
  margin-right: 5px
`;
const Slash = styled.div`
  float: left;
  padding-top: 5px;
`;
const Unit = styled.span`
  float: left;
  height: 39.9999px;
  line-height: 39.9999px;
  width: fit-content;
  margin-right: 10px;
`;
/*
@作者：姜中希
@日期：2018-09-03
@描述：诊疗单表单辩证要点诊表单项
*/
