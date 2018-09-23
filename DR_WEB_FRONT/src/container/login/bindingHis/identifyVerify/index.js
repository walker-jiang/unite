import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import inputSty from 'components/antd/style/input';
import buttonSty from 'components/antd/style/button';

const FormItem = Form.Item;

class Index extends Component {
  // 表单提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let orguserID = window.sessionStorage.getItem('userid');
        let hisID = this.props.sysid;
        let userName = values.userName;
        let password = values.password;
        let params = {
          url: 'sysBindController/hisValid',
          data: {
            orguserID: orguserID,
            hisID: hisID,
            userName: userName,
            password: password
          },
        };
        let that = this;
        function success(res) {
          if(res.result){
            // that.props.next();
          }
        };
        function error(res) {
          console.log('身份验证失败');
        };
        // getResource(params, success, error);
        that.props.next();
      }
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <div>
        <HisTitle>中科软社区HIS</HisTitle>
        <StepsForm onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入中科软社区HIS系统用户名',
              }],
            })(
              <LargeInput placeholder="请输入中科软社区HIS系统用户名" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入中科软社区HIS系统密码',
              }],
            })(
              <LargeInput placeholder="请输入中科软社区HIS系统密码" />
            )}
          </FormItem>
          <FormItem>
            <Footer>
              <SureButton type="primary" htmlType="submit">身份验证</SureButton>
              <Link to="/login/initialSetting">
                <CancelButton type="primary">取消</CancelButton>
              </Link>
            </Footer>
          </FormItem>
        </StepsForm>
      </div>
    );
  }
}
const HisTitle = styled.h2`
  font-weight: 400;
  font-size: 32px;
  text-align: left;
  color: #333333;
  margin-left: 20px;
  margin-top: 25px;
`;
const StepsForm = styled(Form)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 310px;
  width: 100%;
`;
const LargeInput = styled(Input)`
  ${inputSty.direct};
  &&&{
    width: 300px;
    height: 38px;
  }
`;
const Footer = styled.div`
  width: 400px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
  width: 120px;
`;
const CancelButton= styled(Button)`
  ${buttonSty.white};
  width: 120px;
`;
const Identify = Form.create()(Index);

export default Identify;

/*
@作者：姜中希
@日期：2018-08-09
@描述：绑定HIS系统——身份验证
*/
