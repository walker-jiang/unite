import React, {Component} from 'react';
import styled from 'styled-components';
import { Radio, Form, Row, Col} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class Index extends Component {
  componentDidMount(){
    // this.radio.focus(); // 初始化radio获取焦点
  };
  render() {
    const { getFieldDecorator, formItemLayout, initialValue} = this.props;
    return (
      <SpecRow>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            colon={false}
            label="就诊类型："
          >
          {getFieldDecorator('casetype', {
            initialValue: initialValue // initialValue == '1' && '1' || initialValue == '2'  && '2' || '0'
          })(
            <RadioGroup>
              <Radio value='1' onClick={(e)=>{this.props.changeTabs(1)}} ref={(ref)=>{this.radio = ref}}>初诊</Radio>
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
  .ant-form-item {
    margin-bottom: 4px;
  }
`;
/*
@作者：姜中希
@日期：2018-09-04
@描述：病情病历确认界面就诊类型组件
*/
