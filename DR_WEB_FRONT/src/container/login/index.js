import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable'; // 加载时进行模块分离
import BackgroundPic from './img/backgroundPic.png';
import titleIcon from './img/titleIcon.png';
import logo from './login/img/logo.png';

const sectionStyle = {
  backgroundImage: `url(${BackgroundPic})`
};
const loadingComponent = () => (<div>Loading...</div>);
const Login = Loadable({
  loader: () => import('./login'),
  loading: loadingComponent,
});
const BindingHis = Loadable({
  loader: () => import('./bindingHis'),
  loading: loadingComponent,
});
const RetakePassword = Loadable({
  loader: () => import('./retakePassword'),
  loading: loadingComponent,
});
const InitialSetting = Loadable({
  loader: () => import('./initialSetting'),
  loading: loadingComponent,
});
export default class Index extends Component {
  handleClick() {
    this.props.history.push("./download");
  };
  render() {
    return (
      <Body >
        <Title >
          <TitleIcon src={titleIcon}></TitleIcon>
          <WebTitle>中医馆健康信息平台</WebTitle >
          <Tips>还没有下载客户端？客户端工具提供了更多更便捷服务~</Tips>
          <Download onClick={this.handleClick.bind(this)}>立即下载</Download>
        </Title>
        <Window style={sectionStyle}>
          <Switch >
            <Route path='/login' component={Login} exact></Route>
            <Route path='/login/initialSetting' component={InitialSetting} exact></Route>
            {
              // <Route path='/login/getPassword' component={RetakePassword} exact></Route>
            }
            <Route path='/login/bindingHis/:id' component={BindingHis} exact></Route>
          </Switch>
        </Window>
        <Company>
          <LoginLogoPic src={logo} />
          <LoginLogoTxt>
            <TxtChinese>中科软科技</TxtChinese>
            <TxtEnglish>{release_version}</TxtEnglish>
          </LoginLogoTxt>
          <CompanyTips>Copyright © 2017&nbsp;&nbsp;中科软科技股份有限公司</CompanyTips>
        </Company>
      </Body>


    );
  }
}
const Body = styled.div`
  width: 100%;
  height:auto;
  overflow-y :auto;
`;
const Title = styled.div`
  background-color:#000000;
  height:50px;
  width: 100%;
  position:absolute;
  top:0;
`
const TitleIcon = styled.img`
  position:absolute;
  left:77px;
  height:30px;
  margin-top:8px;
`
const WebTitle = styled.span`
  color:#FFFFFF;
  font-size:28px;
  font-weight:bold;
  position:absolute;
  left:116px;
 
  margin-top:8px;
`
const Tips = styled.span`
  position:absolute;
  left: 840px;
  top: 16px;
  color:#CCCCCC;
`
const Download = styled.button`
  position:absolute;
  background-color:#0072E3;
  border:0px;
  border-radius: 15px;
  color:#FFFFFF;
  left: 1199px;
  top: 13px;
  width: 80px;
  height: 24px;
  padding-bottom:5px;
`
const Company = styled.div`
  background-color:#F0F0F0;
  width:100%;
  height:60px; 
  position:absolute;
  bottom:0;
`;
const CompanyTips = styled.span`
  position:absolute;
  font-size:15px;
  right:80px;
  color:#6C6C6C;
  margin-top:25px;
`;
const LoginLogoPic = styled.img`
  float: left;
  margin-left:77px
  height: 48px;
  margin-top:5px;
`;
const LoginLogoTxt = styled.div`
  float: left;
  padding-left: 10px;
  margin-top:5px;
`;
const TxtChinese = styled.h3`
  font-weight: 350;
  font-size: 20px;
  margin-bottom:0px;
  color: #272727;
`;
const TxtEnglish = styled.h4`
  font-weight: 400;
  font-size: 15px;
  color: #272727;
`;
/* 将登录窗总是在窗体中间*/
const Window = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:auto;
  position:absolute;
  top:50px;
  bottom:60px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
/*
@作者：姜中希
@日期：2018-08-05
@描述：登录所涉及的组件（登录i、找回密码、绑定、初始化设置）路由容器
*/
