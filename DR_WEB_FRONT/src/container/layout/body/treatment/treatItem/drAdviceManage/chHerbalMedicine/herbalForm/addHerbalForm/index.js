import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Button, Input, Select, } from 'antd';
import BasePop from 'components/popout/basePop';
import QuickAddHerb from './quickAddHerb';
import getResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';

const Option = Select.Option;
const FormItem = Form.Item;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePop: false,
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handlePopClose = this.handlePopClose.bind(this);
  }
  // 点击加号添加草药
  handleAddClick () {
    this.setState({
      visiblePop: true
    })
  }
  // 关闭添加草药弹框
  handlePopClose () {
    this.setState({
      visiblePop: false
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    let { visiblePop } = this.state;
    return (
      <BasePop visible={visiblePop} title='' onClose={() => this.handlePopClose()}>
        <PopWrap>
          <SpecForm className='not-draggable'>
            <FormItem
              {...formItemLayout}
              label="草药">
              {getFieldDecorator('section', {
              })(
                <Select initialValue="1" >
                  <Option value="1">金银花</Option>
                  <Option value="2">连翘</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="剂量"
            >
              {getFieldDecorator('realName', {
              })(
                <Input type="user" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="特殊用法"
            >
            {getFieldDecorator('section', {
            })(
              <Select initialValue="1" >
                <Option value="1">先煎</Option>
                <Option value="2">泡服</Option>
              </Select>
            )}
            </FormItem>
            <Footer>
              <SureButton type="primary" >确认</SureButton>
              <CancelButton type="primary" onClick={this.handlePopClose}>取消</CancelButton>
            </Footer>
          </SpecForm>
        </PopWrap>
      </BasePop>
    )
  }
}
const PopWrap = styled.div`
  overflow: hidden;
  width: 100%;
  height: 280px;
  background: #f2f2f2;
`;
const SpecForm = styled(Form)`
  &&& {
    width: 590px;
    background: #f2f2f2;
    margin: 30px 0;
  }
`;
const Footer = styled.div`
  width: 558px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
  width: 120px;
`;
const CancelButton= styled(Button)`
  ${buttonSty.white};
  width: 120px;
`;
const AddHerbalForm = Form.create()(Index);
export default AddHerbalForm;

/*
@作者：马晓敏
@日期：2018-07-05
@描述：显示方式——方块儿排列
*/
