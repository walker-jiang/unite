import React, {Component} from 'react';
import styled from 'styled-components';
import { Radio, Form, Row, Col} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class Index extends Component {
  componentDidMount(){
    this.radio.focus(); // 初始化radio获取焦点
  };
  render() {
    const { getFieldDecorator, formItemLayout, initialValue} = this.props;
    return (
      <SpecRow>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            colon={false}
            label="初复诊："
          >
          {getFieldDecorator('casetype', {
            initialValue:initialValue == '1' && '1' || initialValue == '2'  && '2' || '0'
          })(
            <RadioGroup>
              <Radio value='1' onClick={(e)=>{this.props.changeTabs(1)}} autoFocus={true} ref={(ref)=>{this.radio = ref}}>初诊</Radio>
              <Radio value='2' onClick={(e)=>{this.props.changeTabs(2)}}>复诊</Radio>
            </RadioGroup>
          )}
          </FormItem>
        </Col>
      </SpecRow>
    );
  }
}
const SpecRow = styled(Row)`
  border-bottom: 1px solid #D7D7D7;
  border-top: 1px solid #D7D7D7;
  margin-bottom: 15px;
  .ant-form-item {
    margin-bottom: 4px;
  }
`;
/*
@作者：姜中希
@日期：2018-09-04
@描述：书写诊疗单界面初复诊表单项
*/
