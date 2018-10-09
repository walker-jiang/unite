import React from 'react'; // 引入了React和PropTypes
import {  Modal, Card,Form, Input, Tooltip, Icon, Cascader, Select,DatePicker, Row, Col, Checkbox, Button, AutoComplete, Layout } from 'antd';
import LoginService from '../../services/loginService';
import { Router, Route, IndexRoute, browserHistory, Link,hashHistory } from 'react-router';
const FormItem = Form.Item;
// import Header from '../../component/layout/lheader';
import logoSrc from '../login/style/logo.png'
const { Content, Footer, Sider, Header } = Layout;
class LocalizedModal extends React.Component {
  constructor(props) {
  	super(props);//后才能用this获取实例化对象
    this.state = {
       visible: false,
       confirmDirty: false
    };
  }
  componentDidMount(){
  }

  showModal = () => {
    this.setState({
      visible: true,
      myKey: Math.random()
    });
  }
  hideModal = () => {
    $history.push("/ControlPanel")
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let  searchUserParams = {
                  password : values.password,
                  confirm : values.confirm,
                  user_id : localStorage.getItem("userId"),
                  loginUserId:localStorage.getItem("userId"),
                  loginUserName:values.loginName
            };
        var res=LoginService.respassword(searchUserParams);
        if(res.result){
          this.hideModal();
        }
      }
    });
  }
handleConfirmBlur = (e) => {
  const value = e.target.value;
  this.setState({ confirmDirty: this.state.confirmDirty || !!value });
}
compareToFirstPassword = (rule, value, callback) => {
  const form = this.props.form;
  if (value && value !== form.getFieldValue('password')) {
    callback('两次密码不一致!');
  } else {
    callback();
  }
}
validateToNextPassword = (rule, value, callback) => {
  const form = this.props.form;
  if (value && this.state.confirmDirty) {
    form.validateFields(['confirm'], { force: true });
  }
  callback();
}
//校验密码输入是否过于简单
validatePassword=(rule, value, callback)=>{
  const form = this.props.form;
  var reg=/((?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-zA-Z\d#@!~%^&*]{8,16}/;
  if (!reg.test(value)) {
    if(value==""){
        callback();
    }else{
      //callback('号码必须为数字,不可以有空格等非数字字符!');
      callback('密码长度8~16位,密码组成必须包含字母/数字');
    }
  } else {
    callback();
  }
}
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md:{span:8}
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md:{span:8}
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      }
    };
    return (
      <div className="login-container">
        <Header style={{ padding: '0px', background: '#0099ff' }}>
          <div className="layout-logo">
            <Link to="/Login">
              <img className="logo" style={{marginTop:-8}} src={logoSrc} />
              <span className="logo-text" style={{color:'white',fontSize:22}}>药品上市许可持有人药品不良反应直接报告系统</span>
              <span className="china-foo"><Icon type="user" style={{fontSize:16,marginRight:5}}/></span>
            </Link>
          </div>
        </Header>
        <center>
              <Card  style={{marginTop:'10%',width:'60%'}} title={"修改密码"}>
              <Row>
                      <Form onSubmit={this.handleSubmit} style={{marginLeft:'15%'}}>
                        <FormItem
                          {...formItemLayout}
                          label="原登录密码："
                        >
                          {getFieldDecorator('loginName',{
                            rules: [
                              {required: true},
                              {validator: this.validateToNextPassword },
                              {validator: this.validatePassword,}
                            ],
                          })(
                            <Input  style={{ width: 250 }}  type="password" placeholder="请输入登录密码.."/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="新登录密码："
                        >
                          {getFieldDecorator('password',{
                            rules: [
                              {validator: this.validateToNextPassword},
                              {validator: this.validatePassword}
                            ],
                          })(
                            <Input  style={{ width: 250 }}  type="password" placeholder="请输入登录密码.."/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="再次输入新密码："
                        >
                          {getFieldDecorator('confirm', {
                            rules: [{
                              required: true, message: '密码不一致！请继续输入！',
                            }, {
                              validator: this.compareToFirstPassword,
                            }],
                          })(
                            <Input style={{ width: 250 }} type="password" placeholder="确认登录密码" onBlur={this.handleConfirmBlur} />
                          )}
                        </FormItem>
                        <center>
                          {
                            localStorage.getItem("changePw") == true
                            ?
                            null
                            :
                            <Button style={{textAlign: 'center',width: 90,marginLeft:'-15%' }} onClick={() => this.hideModal()} >返回</Button>
                          }
                          <Button style={{textAlign: 'center',width: 90,color:'#ffffff',marginLeft:30}} type="primary" htmlType="submit">提交</Button>
                        </center>
                      </Form>
              </Row>
              </Card>
        </center>
      </div>

    );
  }
}
const LocalizedModa = Form.create()(LocalizedModal);
export default LocalizedModa;
