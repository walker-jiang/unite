import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Button, Form, Input } from 'antd';
import getResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';
import inputSty from 'components/antd/style/input';

const FormItem = Form.Item;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  /**
   * [validateToNextPassword 再次输入密码回调]
   * @param  {[type]}   rule     [校验规则]
   * @param  {[type]}   value    [输入值]
   * @param  {Function} callback [校验回调]
   * @return {[type]}            [void]
   */
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  /**
   * [compareToFirstPassword 密码校验函数]
   * @param  {[type]}   rule     [校验规则]
   * @param  {[type]}   value    [输入值]
   * @param  {Function} callback [校验回调]
   * @return {[type]}            [void]
   */
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致，请重试');
    } else {
      callback();
    }
  }
  handleClick() {
    this.props.form.validateFields((err, values) => {
      let paramsData = {
        orgUerId: window.sessionStorage.getItem('userid'),
        newPassword: values.password
      };
      if (!err) {
        let params = {
          url: 'BaOrguserController/updatePassword',
          type: 'post',
          server_url: config_login_url,
          data: JSON.stringify(paramsData),
        }
        let that = this;
        function success(res) {
          that.props.onToggle();
        };
        getResource(params, success);
      }
    });
    //this.props.onToggle();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div>
        <PassTip>
          <PassTipIcon type="check-circle" />
          为了您的账户安全，请为账户设置新密码:
        </PassTip>
        <SpecForm>
          <SpecFormItem
            {...formItemLayout}
            label="设置新密码">
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '请输入新密码',
                pattern: /^[A-Za-z0-9]{6,20}$/
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <SpecInput type="password" placeholder="请输入新密码" />
            )}
          </SpecFormItem>
          <SpecFormItem
            {...formItemLayout}
            label="再输一次">
            {getFieldDecorator('confirm', {
              rules: [{
                required: true,
                message: '请再输入一次密码',
                pattern: /^[A-Za-z0-9]{6,20}$/
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <SpecInput type="password" placeholder="请再输入一次新密码" />
            )}
          </SpecFormItem>
        </SpecForm>
        <WarmTip>❤️温馨提示：这是中医馆健康信息平台密码，不是设置HIS系统登录密码，请您知悉；</WarmTip>
        <Footer>
          <SureButton type="primary" onClick={this.handleClick} >完成设置</SureButton>
          <Link to="/">
            <CancelButton type="primary">取消</CancelButton>
          </Link>
        </Footer>
      </div>
    );
  }
}
const PassTip = styled.div`
  font-size: 14px;
  text-align: left;
  color: #333333;
  margin: 30px 0px;
`;
const PassTipIcon = styled(Icon)`
  color: #33cc00;
  font-size: 16px;
  margin-right: 9px;
`;
const SpecForm = styled(Form)`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SpecFormItem = styled(FormItem)`
  .ant-form-item-required:before {
    display: none;
  }
`;
const SpecInput = styled(Input)`
  ${inputSty.direct}
  &.ant-input {
    width: 248px;
  }
`;
const WarmTip = styled.p`
  font-size: 13px;
  color: #0A6ECB;
  margin-top: 30px;
`;
const Footer = styled.div`
  width: 708px;
  padding-top: 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #FFFFFF;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
  width: 120px;
`;
const CancelButton= styled(Button)`
  ${buttonSty.white};
  width: 120px;
`;

const SetPassword = Form.create()(Index);

export default SetPassword;
/*
@作者：姜中希
@日期：2018-08-09
@描述：初始化设置 设置密码组件
*/
