import React, {Component} from 'react';
import styled from 'styled-components';
import StepArrow from 'components/dr/stepArrow';
import VerifyPhone from './verifyPhone';
import VerifySMS from './verifySMS';
import ResetPassword from './resetPassword';
import Complete from './complete';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  /**
   * [handleClick 找回密码各个步骤之间的切换函数]
   * @param  {[type]} pram [代表要跳到第几步]
   * @return {[type]}      [void]
   */
  handleClick(pram){
    this.setState({
      status: pram
    });
  };
  /**
   * [compoShow 通过状态值判断要展示那个组件]
   * @param  {[type]} status [当前组件指针]
   * @return {[type]}        [void]
   */
  compoShow(status){
    switch (status) {
      case 1:
        return {component: <VerifyPhone onToggle={this.handleClick}/>, title: '已留存手机号输入'};
      break;
      case 2:
        return {component: <VerifySMS onToggle={this.handleClick}/>, title: '短信验证'};
      break;
      case 3:
        return {component: <ResetPassword onToggle={this.handleClick}/>, title: '设置新密码'};
      break;
      case 4:
        return {component: <Complete onToggle={this.handleClick}/>, title: '完成'};
      break;
      default:
        console.log('找回密码组件替换失败，请检查分支条件');
    }
  };
  /**
   * [getStyle 当前步骤条是否应处于激活状态]
   * @param  {[type]} cur   [当前激活指针]
   * @param  {[type]} index [当前组件指针]
   * @return {[type]}       [当前步骤条样式]
   */
  getStyle(cur, index){
    let obj = {
      width: '190px',
      background: index == cur ? '#0A6ECB' : '#f2f2f2',
      color: index == cur ? '#FFFFFF' : '#1E1E1E',
      nextBG: (cur == index + 1 || (cur == 4 && index == 4)) ? '#0A6ECB' : "#f2f2f2",
      borderColor: index == 4 ? ( cur == 4 ? '#0A6ECB' : '#f2f2f2') : '#FFFFFF'
    };
    return obj;
  };
  render() {
    let status = this.state.status;
    let {component, title} = this.compoShow(status);
    return (
      <Container>
        <HeaderTitle>
          <TitleLeft>找回密码
            <TitleRight>|  {title}</TitleRight>
          </TitleLeft>
        </HeaderTitle>
        <Content>
          <Step>
            <StepArrow text='1. 已留存手机号输入' {...(this.getStyle(status, 1))} ></StepArrow>
            <StepArrow text='2. 短信验证' {...(this.getStyle(status, 2))}></StepArrow>
            <StepArrow text='3. 设置新密码' {...(this.getStyle(status, 3))}></StepArrow>
            <StepArrow text='4. 完成' {...(this.getStyle(status, 4))}></StepArrow>
          </Step>
          {component}
        </Content>
      </Container>
    );
  }
}
const Container = styled.div`
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid rgba(204, 204, 204, 1);
  width: 750px;
  height: 480px;
`;
const HeaderTitle = styled.div`
  width: 100%;
  height: 44px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  text-align: left;
  background: #fff;
  padding-left: 20px;
`;
const TitleLeft = styled.h1`
  font-weight: 400;
  font-size: 18px;
  color: #0A6ECB;
  text-align: left;
`;
const TitleRight = styled.span`
  font-weight: 400;
  font-size: 18px;
  color: #333333;
  text-align: left;
  line-height: 44px;
  padding-left: 10px;
`;
const Content = styled.div`
  padding: 20px 18px;
`;
const Step = styled.div`
  display: flex;
  height: fit-content;
  border: 2px solid white;
  clear: both;
`;
/*
@作者：马晓敏
@日期：2018-06-12
@描述：找回密码，此组件为父组件
*/
/*
@作者：姜中希
@日期：2018-08-06
@描述：找回密码代码重构，此组件为父组件
*/
