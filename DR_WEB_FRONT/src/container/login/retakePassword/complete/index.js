import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Button  } from 'antd';
import buttonSty from 'components/antd/style/button';
import finishIcon from './finish-icon.png';

export default class Index extends Component {
  render() {
    return (
      <div>
        <Content>
          <GetBackWrap>
            <FinishPicWrap>
              <FinishPic src={finishIcon} />
            </FinishPicWrap>
            <FinishWrite >
              <GetBackTip>新密码设置成功，密码已找回</GetBackTip>
              <RemeberTip>• 请您牢记新密码，可直接点击下方按钮登录</RemeberTip>
            </FinishWrite>
          </GetBackWrap>
        </Content>
        <Footer>
          <Link to="/">
            <LoginAction type="primary">立即登录</LoginAction>
          </Link>
        </Footer>
      </div>
    );
  }
}
const Content = styled.div`
  height: 295px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const GetBackWrap = styled.div`
  overflow: hidden;
  margin-left: 150px;
`;
const FinishPicWrap = styled.div`
  float: left;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #0A6ECB;
  text-align: center;
`;
const FinishPic = styled.img`
  width: 58px;
  margin-top: 20px;
`;
const FinishWrite = styled.div`
  float: left;
  margin-left: 20px;
`;
const GetBackTip = styled.div`
  font-size: 21px;
  color: #333333;
  margin-top: 20px;
`;
const RemeberTip = styled.p`
  margin-top: 10px;
`;
const Footer = styled.div`
  width: 708px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #FFFFFF;
`;
const LoginAction = styled(Button)`
  ${buttonSty.semicircle}
`;
/*
@作者：姜中希
@日期：2018-08-06
@描述：找回密码最后一步
*/
