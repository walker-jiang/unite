import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'antd';
import iconSty from 'components/antd/style/icon';
import LoginForm from './loginForm';
import heart from './img/heart.png';
import tip from './img/tip.png';
import curePic from './img/curePic.png';
import logo from './img/logo.jpg';

export default class Login extends Component {
  /** [onClose 右上角关闭按钮触发的函数] */
  onClose() {
    if(bundleMode == 'CS'){
      window.closeBrowser();
    }else{
      window.top.loginInfo();
      console.log('非客户端模式无法关闭当前窗体');
    }
  }
  componentDidMount(){
    console.log('是否离开2');
  };
  render() {
    return (
      <LoginWrapper>
        <Left>
          <span>{systemName} |
            <Stress>登录</Stress>
          </span>
          <BigPic src={curePic} />
          <div>
            <LoginLogoPic src={logo} />
            <LoginLogoTxt>
              <TxtChinese>中科软科技</TxtChinese>
              <TxtEnglish>Sinosoft Co,.Ltd.1.0</TxtEnglish>
            </LoginLogoTxt>
          </div>
        </Left>
        <Right>
          <LoginTitlePic>
            <BreakHeart src={heart} />
            <PicWrite src={tip} />
          </LoginTitlePic>
          <LoginForm/>
        </Right>
        <Close type='close' onClick={this.onClose.bind(this)} />
      </LoginWrapper>
    );
  }
}
const LoginWrapper = styled.div`
  width: 750px;
  height: 480px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #cccccc;
  padding: 25px 30px;
  display: flex;
`;
const Left = styled.div`
  float: left;
  font-size: 22px;
  color: #333333;
  display: flex;
  flex-direction: column;
`;
const Stress = styled.span`
  color: #999999;
  margin-left: 5px;
`;
const BigPic = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Right = styled.div`
  padding: 2px 0px 2px 30px;
  position: relative;
`;
const Close = styled(Icon)`
  ${iconSty.blue}
  float: right;
  margin-top: -15px;
  margin-right: -15px;
`;
const LoginTitlePic = styled.p`
  float: left;
  display: flex;
  align-items: center;
`;
const BreakHeart = styled.img`
  width: 24px;
  height: 22px;
`;
const PicWrite = styled.img`
  width: 244px;
  height: 32px;
`;
const LoginLogoPic = styled.img`
  float: left;
  width: 60px;
  height: 52px;
`;
const LoginLogoTxt = styled.div`
  float: left;
  padding-left: 10px;
`;
const TxtChinese = styled.h3`
  font-weight: 400;
  font-size: 20px;
  color: #666666;
`;
const TxtEnglish = styled.h4`
  font-weight: 400;
  font-size: 13px;
  color: #666666;
`;
/*
@作者：马晓敏
@日期：2018-06-21
@描述：登录页面
*/
/*
@作者：姜中希
@日期：2018-08-06
@描述：登录页面代码重构
*/
