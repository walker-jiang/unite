/* @作者：马奔
@日期：2018-10-24
@描述：用户 添加/修改 模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Input,  Select, Button,Switch  } from 'antd';
import StyButton from 'components/antd/style/button';

const FormItem = Form.Item;
 class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: '-1' //this.props.id
    };
  }
  /** [handleSubmit 表单提交事件] */
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let {id}=this.state;
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
    return(
      <Container>
      <Header>
          <span style={{color:'#000',margin:'0px 5px'}}>▶</span>
          <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(2,2)}>用户设置</span>
          <span style={{color:'#000',margin:'0px 5px'}}> ＞ </span>
          <span>{id=='-1'?'添加用户':'修改用户'}</span>
      </Header>
      <Body>
        <Form onSubmit={this.handleSubmit} >
          <FormItems {...formItemLayout} label="用户名" >
                   {getFieldDecorator('username', {
                    initialValue: '',
                     rules: [{
                       required: true, message: '请输入用户名!',
                     }],
                   })(
                     <Inputs />
                   )}
          </FormItems>
          <FormItems {...formItemLayout} label="真实姓名" >
                   {getFieldDecorator('realname', {
                     rules: [{
                       required: true, message: '请输入真实姓名!',
                     }],
                   })(
                     <Inputs />
                   )}
          </FormItems>
          <FormItems {...formItemLayout} label="所在科室" >
                   {getFieldDecorator('department', {
                     rules: [{
                       required: true, message: '请输入真实姓名!',
                     }],
                   })(
                     <Selects />
                   )}
          </FormItems>
          <FormItems {...formItemLayout} label="职称" >
                   {getFieldDecorator('title', {
                     rules: [{
                       required: true, message: '请输入职称!',
                     }],
                   })(
                     <Selects />
                   )}
          </FormItems>
          <FormItems {...formItemLayout} label="角色" >
                   {getFieldDecorator('roles', {
                     rules: [{
                       required: true, message: '请输入角色!',
                     }],
                   })(
                     <Selects />
                   )}
          </FormItems>
          <FormItems {...formItemLayout} label="手机号" >
                   {getFieldDecorator('phonenumber', {
                     rules: [{
                       required: true, message: '请输入手机号!',
                     }],
                   })(
                     <Inputs placeholder="请输入联系人手机号"/>
                   )}
          </FormItems>
          <FormItems {...formItemLayout} label="E-mail">
               {getFieldDecorator('email', {
                 rules: [{
                   type: 'email', message: '请填写正确的电子邮件!',
                 }, {
                   required: true, message: '请输入电子邮件!',
                 }],
               })(
                <Inputs placeholder="请输入联系人邮箱"/>
               )}
           </FormItems>
          <FormItems {...formItemLayout} label="初始密码"  >
                {getFieldDecorator('password')(
                  <Inputs placeholder="666666"/>
                )}
          </FormItems>
          <FormItems {...formItemLayout} label="首次登录需要修改密码"  >
                {getFieldDecorator('ismodify')(
                 <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
                )}
          </FormItems>
          <FormItems {...formItemLayout} label="备注"  >
                {getFieldDecorator('Remarks')(
                  <textarea  style={{width:'54%'}}/>
                )}
          </FormItems>
          <FormItems {...formItemLayout} label="是否启用"  >
                {getFieldDecorator('ismodify')(
                 <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
                )}
          </FormItems>
          <Line></Line>
          <center >
            <SureButton htmlType="submit">保存</SureButton>
            <CancelButton onClick={this.handleCancel}>取消</CancelButton>
          </center>
        </Form>
      </Body>
    </Container>
  )
  }
}
const Container = styled.div `
  width:100%;
  overflow: hidden;
  height: calc(100vh - 50px);
`;
const Header = styled.div `
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: rgb(242,242,242);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.349019607843137);
`;
const Body =styled.div`
  width: 100%;
  margin-top: 10px;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  height: calc(100vh - 100px);
  position: relative;
`
 const FormItems=styled(FormItem)`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 0px 20%;
   .ant-form-item-label > label{
      color:rgb(51, 51, 51) !important;
      font-size: 14px !important;
   }
 `
const Inputs =styled(Input)`
  border:0 !important;
  border-bottom:1px solid #ccc !important;
  width: 54% !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 0px !important;
`
const Selects =styled(Select)`
  border-bottom:1px solid #ccc !important;
  width: 54% !important;
  .ant-select-selection{
    border:0 !important;
    outline: none !important;
    box-shadow: none !important;
  }
  .ant-select-arrow{
    color: #666666 !important;
  }
`
const Line = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 1px;
  background-color: #666;
  margin-bottom: 20px;
`
const SureButton = styled(Button)`
  ${StyButton.semicircle}
`;
const CancelButton = styled(Button)`
  ${StyButton.gray}
`;
const WrappedRegistrationForm = Form.create()(Index);

export default WrappedRegistrationForm ;
