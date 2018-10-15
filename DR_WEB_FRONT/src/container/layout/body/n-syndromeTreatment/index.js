import React, {Component} from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';
import Icon from 'components/dr/icon';
import SelectPatient from './selectPatient';
import Cure from './cure';
// import IllCaseSure from './illCaseSure';
// import SmartCure from './smartCure';
// import SmartCure1 from './smartCure1';
// import Finish from './finish';

const Step = Steps.Step;

export default class SyndromeTreatment extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 0, //当前步
      patientid: '', //选择的当前患者
    };
    this.stepFunc = this.stepFunc.bind(this);
  };
  stepFunc(step, patientid){
    if(patientid){
      this.setState({ current: step, patientid })
    }else{
      this.setState({ current: step })
    }
  };
  render() {
    let { current, patientid } = this.state;
    let compo = null;
    if(current == 0){
      compo = <SelectPatient onStep={this.stepFunc}/>;
    }else{
      compo = <Cure onStep={this.stepFunc} current={current} patientid={patientid}/>;
    }

    return (
      <Container>
        <Top>
          <StyledIcon type='syndrome_treatment'/>
          <Title>辨证论治</Title>
          <SpecSteps current={current}>
            <Step title="患者确认"/>
            <Step title="病情病历确认"/>
            <Step title="智能辩证"/>
            <Step title="智能论治"/>
            <Step title="完成"/>
          </SpecSteps>
        </Top>
        {compo}
      </Container>
    );
  }
}
const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  height: 50px;
  background-color: rgba(242, 242, 242, 1);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 20px;
`;
const StyledIcon = styled(Icon)`
  width: 25px;
  height: 25px;
  margin-top: 5px;
`;
const Title = styled.div`
  font-size: 20px;
  margin-left: 5px;
  width: 100px;
  color: black;
`;
const SpecSteps = styled(Steps)`
  .ant-steps-item-icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 50%;
    margin-top: 3px;
  }
  .ant-steps-item-title {
    font-size: 14px;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #0066CC;
  }
  .ant-steps-item-process > .ant-steps-item-content > .ant-steps-item-title {
    color: #0066CC;
    font-weight: 500;
  }
  .ant-steps-item-process > .ant-steps-item-content > .ant-steps-item-title:after {
    background-color: #0066CC;
  }
  .ant-steps-item-wait .ant-steps-item-icon {
    border-color: #898989;
  }
  .ant-steps-item-wait .ant-steps-item-icon .ant-steps-icon{
    color: #898989;
  }
  .ant-steps-item-wait > .ant-steps-item-content > .ant-steps-item-title {
    color: rgb(153, 153, 153);
    font-weight: 500;
  }
  .ant-steps-item-wait > .ant-steps-item-content > .ant-steps-item-title:after {
    background-color: #898989;
  }
`;
/*
@作者：姜中希
@日期：2018-10-07
@描述：辩证论治
*/
