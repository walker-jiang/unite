import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Radio } from 'antd';
import styled, { css } from 'styled-components';
import getResource from 'commonFunc/ajaxGetResource';
import titleIcon from '../login/img/titleIcon.png';
import logo from '../login/login/img/logo.png';
import logoPic from './logo.png';

const RadioGroup = Radio.Group;
class Index extends Component {
    handleClick() {
        this.props.history.push("./login");
    };
    constructor() {
        super()
        this.state = {
            isClick: 1
        }
    }
    handleRidioChange(e) {
        console.log(e.target.value);
        this.setState({
            isClick: e.target.value
        })
    }
    render() {
        return (
            <div>
                <Title >
                    <TitleIcon src={titleIcon}></TitleIcon>
                    <WebTitle>中医健康信息服务平台</WebTitle >
                    <Bread>|</Bread>
                    <Tip>下载中心</Tip>
                    <Tips>想通过web直接登录？</Tips>
                    <LoginNow onClick={this.handleClick.bind(this)}>立即登陆</LoginNow>
                </Title>
                <Window>
                    <Choose>
                        <Navigation>
                            下载中心
                        </Navigation>
                        <Navigation>>中医健康信息服务平台客户端v1.0</Navigation>
                    </Choose>
                    <Picture>
                        <LogoPic src={logoPic}></LogoPic>
                    </Picture>

                    <Content>
                        <AppTitle>中医健康信息服务平台客户端v1.0</AppTitle>
                        <AppVersion>最新版本：V1.0.1 </AppVersion>
                        <AppVersion>软件大小：52.78MB</AppVersion>
                        <AppVersion>更新时间：2018-09-13</AppVersion>
                        <VersionType>
                            <span>版本类型：</span>
                            <RadioGroup defaultValue='1' onChange={this.handleRidioChange.bind(this)}>
                                <Radio value='1'>Windows XP（32位）</Radio>
                                <Radio value='2'>Windows XP（64位）</Radio>
                                <Radio value='3'>Windows 7及以上（32位）</Radio>
                                <Radio value='4'>Windows 7及以上（64位）</Radio>
                            </RadioGroup>
                        </VersionType>
                        <Reminder>温馨提示：请根据您的电脑操作系统选择相应的版本类型下载，否则可能会无法正常运行~</Reminder>
                        <Download>立即下载</Download>
                        <Introduce>
                            <IntroduceTitle>软件介绍：</IntroduceTitle>
                            <div>
                                <Message>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中医健康信息服务平台客户端v1.0版本是以最佳中医诊疗体验为目标而开发的客户端辅助工具，在客户端中，内置了基于谷歌Chromium引擎浏览器，使平台系统更加灵活、稳定、兼容性强、安全性强、可维护性强。定制的UI浏览器，功能及界面操作针对性更强，医学风格明显。内置专业化浏览器使各模块之间衔接更加流畅、反应更加迅速。浏览器跟客户端悬浮窗、web系统功能无缝衔接，使得病历及医嘱模板信息查询更加便捷，打印医嘱单和病历时更少出错。
                                </Message>
                            </div>
                            <div>
                                <Message>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当用户检索到需要的信息时可通过右键菜单快速添加至“我的收藏”中，使用户更加方便地收集学习资料。诊疗数据免于被第三方获取，保证了数据的安全性。系统结构合理，可靠性高，维护人员理解、改正、改动和改进该软件较容易，可维护性强。
                                </Message>
                            </div>
                            <div>
                                <Message>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;同时，使用客户端工具可以完成一键快速登录，也可以保存登录信息，开机直接进入系统，通过客户端提供的智能识方功能，可以在知识库查询中，自动识别处方文本，一键加入患者处方或医生医嘱模板中，使中医诊疗过程更加方便快捷；
                                </Message>
                            </div>
                        </Introduce>
                    </Content>
                </Window>
                <Company>
                    <LoginLogoPic src={logo} />
                    <LoginLogoTxt>
                        <TxtChinese>中科软科技</TxtChinese>
                        <TxtEnglish>{release_version}</TxtEnglish>
                    </LoginLogoTxt>
                    <CompanyTips>Copyright © 2017&nbsp;&nbsp;中科软科技股份有限公司</CompanyTips>
                </Company>
            </div>

        )
    }
}
const Title = styled.div`
  background-color:#000000;
  height:50px;
`;
const TitleIcon = styled.img`
  position:absolute;
  left:77px;
  height:30px;
  margin-top:8px;
`;
const WebTitle = styled.span`
  color:#FFFFFF;
  font-size:28px;
  font-weight:bold;
  position:absolute;
  left:116px;
  margin-top:8px;
`;
const Bread = styled.span`
    left:400px;
    position:absolute;
    color: #FFFFFF;
    font-size:30px;
    left:420px;
    margin-top:5px;
`
const Tip = styled.span`
    color: #FFFFFF;
    font-size:23px;
    position:absolute;
    left:440px;
    margin-top:14px;
`;
const Tips = styled.span`
  position:absolute;
  right:180px;
  top: 16px;
  color:#CCCCCC;
`;
const LoginNow = styled.button`
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
`;
const Choose = styled.div`
    height: 40px;
    background-color:#F0F0F0;
    padding-top: 10px;
    padding-left: 85px;
`;
const Navigation = styled.span`
    color: #0000E3;
    margin-left: 5px;
`;
const Company = styled.div`
  background-color:#F0F0F0;
  margin-top:0px;
  height:60px;
  width:100%;
  position:absolute;
  bottom:0;
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
const CompanyTips = styled.span`
  position:absolute;
  font-size:15px;
  right:80px;
  color:#6C6C6C;
  margin-top:25px;
`;
const Window = styled.div`
    width:100%;
    height:auto;
    position:absolute;
    top:50px;
    bottom:60px;
`;
const LogoPic = styled.img`
    margin-left: 100px;
    margin-top: 20px;
    width:92px;
    height: 90px;
`;
const Picture = styled.div`
    width:150px;
    height: 150px;
`;
const Content = styled.div`
    margin-top: 27px;
    margin-left: 110px;
    margin-top: -120px;

`;
const AppTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    margin-left: 130px;
    margin-top: -130px;
`;
const AppVersion = styled.div`
    font-size: 15px;
    color: #3C3C3C;
    margin-left: 130px;
    margin-bottom: 5px;
`;
const VersionType = styled.div`
    .ant-radio-wrapper > span {
    font-size: 15px;
    color: #46A3FF;
    width: 20px;
    height: 20px;
    background-color: ##3C3C3C;
    }
    span.ant-radio + * {
        padding-left: 8px;
        padding-right: 8px;
    }
    margin-left: 130px;
    font-size: 15px;
    color: #3C3C3C;
    margin-bottom: 5px;
`;
const Reminder = styled.p`
    color: #FF0000;
    margin-left: 130px;
`;
const Download = styled.button`
    position:absolute;
    background-color:#0072E3;
    border:0px;
    border-radius: 15px;
    color:#FFFFFF;
    margin-left: 130px;
    margin-top: 0px;
    width: 80px;
    height: 24px;
    padding-bottom:5px;
`;
const Introduce = styled.div`
    margin-top: 55px;
    margin-left: 130px;
    width: 1056px;
    color: #3C3C3C;
`;
const IntroduceTitle = styled.div`
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const Message = styled.span`
    font-size: 8px;
    line-height:2em;
`;

export default withRouter(Index);