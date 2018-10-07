import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import iconSty from 'components/antd/style/icon';
import StepArrow from 'components/dr/stepArrow';
import BoundHis from './boundHis';
import ConfirmInfo from './confirmInfo';
import ModifyPassword from './modifyPassword';
import Completed from './completed';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1, // 当前加载那个组件
    };
  }
  /**
   * [handleClick 处理子组件跳转的函数]
   * @param  {[type]} pram [跳到那个组件]
   * @return {[type]}      [void]
   */
  handleClick (pram) {
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
        return {component: <BoundHis onToggle={() => this.handleClick(2)}  />, title: '绑定HIS'};
      break;
      case 2:
        return {component: <ConfirmInfo onToggle={() => this.handleClick(3)} />, title: '个人信息确认'};
      break;
      case 3:
        return {component: <ModifyPassword onToggle={() => this.handleClick(4)} />, title: '修改密码'};
      break;
      case 4:
        return {component: <Completed onToggle={() => this.handleClick(5)} />, title: '完成'};
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
    let { status } = this.state;
    let {component, title} = this.compoShow(status);
    return (
      <Container>
        <HeaderTitle>
          <TitleLeft>初始设置
          </TitleLeft>
          <TitleRight>|  {title}</TitleRight>
          <Link to="/"><Close type="close" /></Link>
        </HeaderTitle>
        <Content>
          <Step>
            <StepArrow text='1. 绑定HIS' {...(this.getStyle(status, 1))} ></StepArrow>
            <StepArrow text='2. 个人信息确认' {...(this.getStyle(status, 2))}></StepArrow>
            <StepArrow text='3. 修改密码' {...(this.getStyle(status, 3))}></StepArrow>
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
  border: 1px solid yellow;
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
const TitleLeft = styled.span`
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
`;
const Close = styled(Icon)`
  ${iconSty.blue};
  float: right;
  margin: 5px;
`;
const Content = styled.div`
  padding: 20px 18px;
`;
const Step = styled.div`
  display: flex;
  border: 2px solid white;
  height: 41px;
  z-index: 20;
  clear: both;
`;
/*
@作者：姜中希
@日期：2018-08-06
@描述：登陆成功后，进入初始化组件
*/
