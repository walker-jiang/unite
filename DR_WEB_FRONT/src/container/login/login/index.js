import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'antd';
import iconSty from 'components/antd/style/icon';
import LoginForm from './loginForm';
import heart from './img/heart.png';
import doctor from './img/doctor.png';
import tip from './img/tip.png';
import curePic from './img/curePic.png';
import logo from './img/logo.jpg';

export default class Login extends Component {
  render() {
    return (
      <LoginWrapper>
        <Left>
          <TxtTitle>{systemName}
          </TxtTitle>
          <BigPic src={curePic} />
          <div>
            <LoginLogoPic src={logo} />
            <LoginLogoTxt>
              <TxtChinese>中科软科技</TxtChinese>
              <TxtEnglish>{release_version}</TxtEnglish>
            </LoginLogoTxt>
          </div>
        </Left>
        <Right>
          <LoginTitlePic>
            <BreakHeart src={doctor} />
            <TxtDoctor>医生登录</TxtDoctor>
            <Bread>|</Bread>
            <PicWrite src={tip} />
          </LoginTitlePic>
          <LoginForm />
        </Right>
      </LoginWrapper>
    );
  }
}
const LoginWrapper = styled.div`
  width: 660px;
  height: 428px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #cccccc;
  padding: 20px 30px;
  display: flex;
  z-index: 2;
`;
const Left = styled.div`
  float: left;
  height: 400px;
  font-size: 20px;
  color: #333333;
  display: flex;
  flex-direction: column;
`;
const TxtTitle = styled.span`
  font-weight: bold;
`;
const TxtDoctor = styled.span`
  width: 93px;
  height: 30px;
  color: #5B5B5B;
  font-size:20px;
`;
const Bread = styled.span`
  font-size:23px;
`;
const Stress = styled.span`
  color: #999999;
  margin-left: 5px;
`;
const BigPic = styled.img`
  width:273px;
  height:273px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Right = styled.div`
  padding: 2px 0px 2px -30px;
  position: relative;
`;
const Close = styled(Icon)`
  ${iconSty.blue}
  float: right;
  margin-top: -20px;
  margin-left: -15px;
`;
const LoginTitlePic = styled.p`
  float: left;
  display: flex;
  margin-left: 25px;
  align-items: center;
  height:20px;
`;
const BreakHeart = styled.img`
  width: 34px;
  height: 29px;
`;
const PicWrite = styled.img`
  width: 175px;
  height: 30px;
`;
const LoginLogoPic = styled.img`
  float: left;
  width: 60px;
  height: 52px;
  margin-top:-15px;
`;
const LoginLogoTxt = styled.div`
  float: left;
  padding-left: 10px;
  margin-top:-15px;
`;
const TxtChinese = styled.h3`
  font-weight: 350;
  font-size: 20px;
  color: #666666;
  margin-bottom: 0px;
`;
const TxtEnglish = styled.h4`
  font-weight: 400;
  font-size: 15px;
  color: #666666;
  margin-top: -10;
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
