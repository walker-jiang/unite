import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import getResource from 'commonFunc/ajaxGetResource';
import Icon from 'components/dr/icon';
import TipModal from 'components/dr/modal/tip';
import verification from './verification.png';
import refresh from './refresh.png';
import buttonSty from 'components/antd/style/button';
import organization from '../img/organization.png';
import YSearchInput from '../../../../component/BZLZM/YSearchInput.js';

// import SuitTechnology from '../../../layout/body/treatment/treatItem/drAdviceManage/suitTechnology/index.js';

const FormItem = Form.Item;
const formItemLayout = {
  wrapperCol: { span: 24 },
};
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '', // 验证码base64图片
      code: '', // 验证码
      istrue: false, //是否点击
      rememberPass: window.localStorage.getItem('rememberPass'), // 记住密码，需要从本地读取上次保存状态，没有为字符串false
      autoLogin: window.localStorage.getItem('autoLogin'), // 自动登录，需要从本地读取上次保存状态，没有为字符串false
      username: '', // 用户名
      password: '', // 密码
    };
    this.ignoreLogin = this.ignoreLogin.bind(this);
  }
  componentWillMount() {
    this.verifyAutoLogin();
    this.getVerificationCode();
  }
  componentDidMount() {
    if (window.setDefaultMenu) { // 加载完登陆组件后通知客户端默认菜单
      defaultSysModuleList.forEach(item => {
        if (item.syModule.modid != 7 || item.syModule.modid != 10) {
          // http://www.xiaotangren.com:9999
          item.syModule.callurl = config_local_url + item.syModule.callurl;
        }
      });
      window.setDefaultMenu(JSON.stringify(defaultSysModuleList));
    }
  };
  // 校验是否进行自动登陆 和 初始化用户名、密码
  verifyAutoLogin() {
    let autoLogin = window.localStorage.getItem('autoLogin');
    let rememberPass = window.localStorage.getItem('rememberPass');
    let username = window.localStorage.getItem('username');
    let password = window.localStorage.getItem('password');
    if (autoLogin == 'true') { // 自动登陆
      let paramsData = {
        username: username,
        password: password,
        code: 1,
        verificationCode: '',
      };
      this.loginAction(paramsData);
    }
    if (rememberPass == 'true') { // 记住密码，初始化输入框
      this.setState({
        username: username,
        password: password,
      });
    };
  };
  //获取验证码
  getVerificationCode() {
    let that = this;
    let params = {
      type: 'GET',
      server_url: config_login_url,
      url: 'verificationCodeController/getVerificationCode',
      data: {}
    };
    function success(res) {
      that.setState({
        verificationCode: res.data.verificationCode,
        code: res.data.code
      })
    };
    getResource(params, success);
  }
  // 点击登录，校验输入项，获取输入项
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ istrue: true });
        let code = this.state.code;
        let paramsData = {
          orgid: values.orgid.value,
          username: values.userName,
          password: values.password,
          code: code,
          verificationCode: values.verificationCode,
        };
        this.loginAction(paramsData);
      }
    });
  }
  /** [loginAction 调用登录服务] */
  loginAction(paramsData) {
    let orgid = 10000;
    paramsData.orgid = orgid;
    let that = this;
    let params = {
      url: 'loginController/login',
      server_url: config_login_url,
      type: 'post',
      data: JSON.stringify(paramsData)
    }
    function success(res) {
      if (res.result) {
        console.log(res.data);
        // 选择要跳转的路由
        let path = '/login/initialSetting';
        // 将当前用户的信息保存供其它组件用
        window.sessionStorage.setItem('username', res.data.realname); // 用户名
        window.sessionStorage.setItem('deptid', res.data.deptcode); // 科室ID
        window.sessionStorage.setItem('deptidDic', res.data.deptcodeDic); // 科室ID
        window.sessionStorage.setItem('orgid', res.data.orgid); // 机构ID
        window.sessionStorage.setItem('userid', res.data.orgUserid); // 用户ID
        window.sessionStorage.setItem('post', res.data.post); // 医生级别
        window.sessionStorage.setItem('postDic', res.data.postDic); // 医生级别
        window.sessionStorage.setItem('token', res.data.serviceToken); // 医生级别
        window.sessionStorage.setItem('selsetd', 'home'); //默认显示首页
        if (res.data.initcomplete != '0') { // 跳过初始化组件
          path = '/layout';
          // console.log('res.data.quickMenu.leftMenuList', JSON.stringify(res.data.quickMenu.leftMenuList));
          if (window.setMenu) { // 通知客户端当前登录用户的菜单
            console.log('JSON.stringify(res.data.rightMenuList)', JSON.stringify(res.data.rightMenuList));
            let rightSysModuleList = res.data.quickMenu.rightMenuList;
            rightSysModuleList.forEach(item => {
              if (item.syModule.callurl.indexOf('http') != 0) {
                // console.log('右侧数据第一次',item)
                item.syModule.callurl = config_local_url + item.syModule.callurl;
              }
            });
            // console.log('右侧数据',rightSysModuleList)
            window.setMenu(JSON.stringify(rightSysModuleList));
            console.log('res', res.data);
          }
          that.setUserInfo(res.data.deptcode, res.data.orgid, res.data.orgUserid, res.data.post, res.data.realname, res.data.photo);
        }
        that.props.history.push(path); // 跳转到初始化设置组件
      } else {
        that.setState({ istrue: false })
        that.tipModal.showModal({
          content: '请核对输入是否正确，如果重试问题依然存在，请跟系统管理员联系~',
          stressContent: res.desc
        });
      }
      if (res.data) {
        let { rememberPass, autoLogin } = that.state;
        if (rememberPass || autoLogin) { // 记住密码和自动登陆都需要保存用户名、密码
          window.localStorage.setItem('username', paramsData.username);
          window.localStorage.setItem('password', paramsData.password);
        }
        window.localStorage.setItem('rememberPass', rememberPass);
        window.localStorage.setItem('autoLogin', autoLogin);
      }
    };
    getResource(params, success);
  };
  setUserInfo(deptcode, orgid, userid, post, username, photo) {
    let obj = {
      userid: userid,
      orgid: orgid,
      deptcode: deptcode,
      post: post,
      username: username,
      photo: photo ? photo : ''
    };
    if (window.loginSystem) { // 客户端存在
      // console.log('监测到客户端loginSystem方法');
      window.loginSystem(JSON.stringify(obj));
    }
    parent.postMessage(JSON.stringify(obj), '*');

  };
  /* 记住密码 */
  rememberPass(checked) {
    this.setState({ rememberPass: '' + checked });
  }
  /* 自动登录 */
  autoLogin(checked){
    this.setState({ autoLogin: '' + checked,rememberPass: '' + checked  });
  };
  /** [ignoreLogin 忽略登录] */
  ignoreLogin() {
    console.log('进入忽略登录');
    if (window.skipLogin) {
      window.skipLogin();
    } else {
      parent.postMessage(false, '*')
      this.props.history.push('/layout'); // 跳转到初始化设置组件
    }
    }
    /**
     * [emitEmpty 输入框的清空事件]
     * @param  {[type]} num [1用户名 2密码]
     * @return {[type]}     [undefined]
     */
    emitEmpty=(num)=>{
      var this_=this;
      if(num==1){
        this.props.form.setFields({['userName']:{value: ''}})
        this_.setState({username:''})
      }else if(num==2){
        this.props.form.setFields({['password']:{value: ''}})
        this_.setState({password:''})
    }
   };
   /**
    * [setdata description]
    * @param  {[type]} e   [当前输入框的值]
    * @param  {[type]} num [1用户名 2密码]
    * @return {[type]}     [undefined]
    */
   setdata=(e,num)=>{
     var this_=this;
     if(num==1){
        this_.setState({username:e.target.value})
     }else if(num==2){
        this_.setState({password:e.target.value})
     }
   }
   /**
    * [sanchu 输入框失去焦点 X号消失]
    * @param  {[type]} num [1用户名 2密码]
    * @return {[type]}     [description]
    */
   sanchu=(num)=>{
      var this_=this;
       if(num==1){
          this_.setState({username:''})
       }else if(num==2){
          this_.setState({password:''})
       }
   }
  render() {
    const { username, password, verificationCode, rememberPass, autoLogin, istrue } = this.state;
    const { getFieldDecorator } = this.props.form;
    let openProps = {
      actionType: 'add',
      orderid: '',
      reloadList: () => { },
      buOrderDtlList: [],
    };
    const suffixuse = username ? <Icon type='login-empty' onClick={()=>this.emitEmpty(1)} /> : null;
    const suffixpass = password ? <Icon type='login-empty' onClick={()=>this.emitEmpty(2)} /> : null;
    return (
      <FormLogin onSubmit={this.handleSubmit} ref={ref => { this.testForm = ref }}>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('orgid', {
            initialValue: { value: "请输入机构", item: [] },
            rules: [{
              required: true,
              message: '请输入机构',
            }],
          })(<YSearchInput
            allowClear={true}
            searchLength={2}
            placeholder="请输入机构"
            style={{ 'width': '264px', 'height': '34px', 'marginBottom': '20px' }}
            remoteService={getResource}
            paramData={{
              url: 'BaOrganizationController/getList',
              server_url: config_orgSelect_url,
              type: 'get',
            }}
            fieldKey='orgid'
            fieldName='orgname' />)}
        </FormItem>
        <PrefixSelect>
          <SelectIcon src={organization} fill='#808080' />
          <SelectBread>|</SelectBread>
        </PrefixSelect>
        <FormItem>
          {getFieldDecorator('userName', {
            initialValue: username,
            rules: [{ required: true, message: '请输入用户名!' }],
            validateTrigger:'onBlur',
          })(
            <CustomInput autoFocus = 'autofocus' suffix={suffixuse} onChange={(e)=>this.setdata(e,1)} onBlur={()=>this.sanchu(1)} prefix={<Prefix><Icon type='user' fill='#808080'/><Bread>|</Bread></Prefix>}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: password,
            rules: [{ required: true, message: '请输入登录密码!' },{min:6,message:'密码为6-20位非中文字符'},{max:20,message:'密码为6-20位非中文字符'}],
            validateTrigger:'onBlur',
          })(
            <CustomInput suffix={suffixpass} onChange={(e)=>this.setdata(e,2)} onBlur={()=>this.sanchu(2)}prefix={<Prefix><Icon type='lock' fill='#808080'/><Bread>|</Bread></Prefix>} type="password"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('verificationCode', {
            rules: [{ required: true, message: '请输入右侧验证码!' }],
            validateTrigger:'onBlur',
          })(
            <CustomInput prefix={<Prefix><Icon type='emi' fill='#808080' /><Bread>|</Bread></Prefix>} placeholder="请输入右侧验证码" />
          )}
          <ValidateCode alt="" src={verificationCode} />
          <IconReload onClick={this.getVerificationCode.bind(this)} >
            <img alt="" src={refresh} />
          </IconReload>
        </FormItem>
        <FormItem>
          <Checkbox
            className='small'
            checked={rememberPass == 'true'}
            disabled={this.state.autoLogin=='true'}
            onChange={(e)=>{this.rememberPass(e.target.checked)}}>
            <CheckboxText >记住密码</CheckboxText>
          </Checkbox>
          <Checkbox
            className='small'
            checked={autoLogin == 'true'}
            onChange={(e) => { this.autoLogin(e.target.checked) }}>
            <CheckboxText>下次自动登录</CheckboxText>
          </Checkbox>
          <RetakeLink to="/login/getPassword">🔑找回密码</RetakeLink>
          {
            // <RetakeLink to="/login/getPassword">🔑找回密码</RetakeLink>
          }
          {
            istrue ? <LoginAction type="primary" htmlType="submit"><Loading type='loadings' />正在登录</LoginAction> : <LoginAction type="primary" htmlType="submit">立即登录</LoginAction>
          }
          <CancelAction type="primary" onClick={this.ignoreLogin}>忽略，稍后登录</CancelAction>
        </FormItem>
        <TipModal ref={ref => { this.tipModal = ref }}></TipModal>
      </FormLogin>
    );
  }
}
const FormLogin = styled(Form)`
  &&& {
    float: right;
    margin-left: 20px;
    margin-right: 20px;
    padding-top: 20px;
    width: 308px;
    height: 334px;
    border: 1px solid #cccccc;
  }
  &&& .ant-input-affix-wrapper {
    height: 34px;
  }
  &&& .ant-form-item{
    margin-bottom: 20px;
  }
  &&& .ant-form-item-control {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: -10px;
    line-height: normal;
    width: 264px;
    height:34px;
  }
  &&& .ant-form-item-with-help {
    margin-bottom: 20px;
  }
  &&& .ant-form-explain, .ant-form-extra{
    margin-top: -4px;
    font-size: 12px;
  }
  &&& .ant-checkbox-inner{
    width: 13px;
    height: 13px;
  }
  &&& .ant-checkbox{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  &&& .ant-checkbox-wrapper{
    margin-top: 5px;
    margin-bottom: 0px;
  }
`;
const Prefix = styled.div`
  display: flex;
  align-items: center;
`;
const Bread = styled.div`
  margin: 10px;
  padding-bottom: 4px;
  font-size: 13px;
  color: #99B2D8;
`;
const SpecSelect = styled(Select)`
  &&&.ant-select .ant-select-selection-selected-value {
    padding-left: 41px;
    border-radius: 0px;
}
&&&.ant-select-selection--single {
  height: 40px;
  position: relative;
  cursor: pointer;
}
`;
const PrefixSelect = styled.div`
  position: absolute;
  top: 0px;
`;
const SelectBread = styled.div`
  margin-left:58px;
  margin-top: -18px;
  padding-bottom: 4px;
  font-size: 13px;
  color: #99B2D8;
`;
const SelectIcon = styled.img`
   margin-left:33px;
   margin-top: 62px;
   width:16px;
`;
/* 将输入框的输入开始位置往后调*/
const CustomInput = styled(Input)`
  &&& > .ant-input {
    width: 264px;
    height:34px;
    padding-left: 50px;
    border-radius: 0px;
    color: #000000;
  }
`;
const ValidateCode = styled.img`
  position: absolute;
<<<<<<< HEAD
	top:-9px;
	right: 30px;
	width: 82px;
	height: 36px;
=======
  top: -7px;
  right: 27px;
  width: 61px;
  height: 33px;
>>>>>>> n-develop
	background: #a6ae99;
	color: #333;
	font-size: 20px;
	font-weight: 900;
	line-height: 36px;
  text-align: center;
  z-index: 5;
`;
const IconReload = styled.i`
  position: absolute;
  top: 0;
  right: 3px;
  cursor: pointer;
  z-index:1;
`;

const Loading = styled(Icon)`
 animation: spin 2s linear infinite;
 position:relative;
 left:55px;
 top: 3px;
 width: 20px;
 height: 20px;
 @keyframes spin {
         0%   {
             -webkit-transform: rotate(0deg);
             -ms-transform: rotate(0deg);
             transform: rotate(0deg);
         }
         100% {
             -webkit-transform: rotate(360deg);
             -ms-transform: rotate(360deg);
             transform: rotate(360deg);
         }
     }

`;
const ActionButton = css`
  &&& {
    height: 35px;
    width: 264px;
    margin-top: 10px;
    margin-bottom:0px;
    margin-left:0px;
  }
`;
const LoginAction = styled(Button)`
  line-height: 2 !important;
  ${buttonSty.semicircle}
  ${ActionButton}
`;
const CancelAction = styled(Button)`
  ${buttonSty.white}
  ${ActionButton}
  &&& {
    border: 1px solid #0A6ECB;
  }
`;
const CheckboxText = styled.span`
  font-size:12px;
  margin-top: 5px;
  color: #999999;
`;
const RetakeLink = styled(Link)`
  float: right;
  color: #0A6ECB;
  font-size: 13px;
  margin-bottom: 10px;
`;
const LoginFormWrapper = Form.create()(LoginForm);
export default withRouter(LoginFormWrapper);
/*
@作者：马晓敏
@日期：2018-07-31
@描述：登录表单页面
*/
/*
@作者：姜中希
@日期：2018-08-06
@描述：登录表单页面代码重构
*/
