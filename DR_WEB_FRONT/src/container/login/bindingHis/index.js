import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Button, Steps, message } from 'antd';
import IdentifyVerify from './identifyVerify';
import BindVerify from './bindVerify';
import iconSty from 'components/antd/style/icon';

const Step = Steps.Step;

class Binding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0, // 当前加载那个组件（身份验证绑定确认）
    };
    this.next = this.next.bind(this);
  }
  // 点击立即验证后改变步骤条状态，验证成功后跳转到立即绑定组件
  next() {
    let current = this.state.current;
    current++;
    this.setState({ current });
  }
  render () {
    const { current } = this.state;
    const steps = [{
      title: '身份验证',
      headerTitle: <span> 请输入<Stress>中科软社区HIS</Stress>用户名和密码进行身份验证</span>,
      content: <IdentifyVerify sysid = {this.props.location.state.sysid} next={this.next}/>
    }, {
      title: '绑定确认',
      headerTitle: <span> 绑定确认</span>,
      content: <BindVerify />
    }];
    return (
      <Container>
        <HeaderTitle>
          <TitleLeft>绑定HIS
          </TitleLeft>
          <TitleRight>|  {steps[current].headerTitle}</TitleRight>
          <Link to="/"><Close type="close" /></Link>
        </HeaderTitle>
        <SpecSteps current={current}>
          {steps.map((item, index)=> <BorderStep status={current>=index ? 'process' : 'wait'} key={item.title} title={item.title} />)}
        </SpecSteps>
        <StepsContent>{steps[current].content}</StepsContent>
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
const Stress = styled.i`
  color: #33cc00;
`;
const SpecSteps = styled(Steps)`
  &.ant-steps {
  	margin: 10px 0;
  	margin-left: 20px;
  }
  .ant-steps-item-title {
    font-size: 12px;
  }
  .ant-steps-item-title:after {
      background: #0a6ecb !important;
  }
  .ant-steps-item-process .ant-steps-item-icon {
  	background: #0a6ecb;
  	border-color: #0a6ecb;
  }
  &.ant-steps-label-horizontal {
  	width: 50%;
  	color: #0A6ECB;
  }
`;
const Close = styled(Icon)`
  ${iconSty.blue};
  float: right;
  margin: 5px;
`;
const BorderStep = styled(Step)`
  &.ant-steps-item-wait .ant-steps-item-icon {
    border: 2px solid rgba(0, 0, 0, 0.25);
  };
  position: relative;
	float: left;
	width: 25%;
	height: 36px;
	overflow: hidden;
`;
const StepsContent = styled.div`
  border-top: 1px solid #fff;
`;
export default Binding;

/*
@作者：姜中希
@日期：2018-08-09
@描述：绑定HIS系统父组件
*/
