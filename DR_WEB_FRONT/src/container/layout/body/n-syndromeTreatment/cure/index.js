import React, {Component, PropTypes} from 'react'; // react核心
import { Steps } from 'antd';
import header from './header.png';
import re_select from './re_select.png';
import styled from 'styled-components';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import CaseConfirm from './caseConfirm';
import SmartDistinguish from './smartDistinguish';
import SmartTreatment from './smartTreatment';
import Finish from './finish';
import Icon from 'components/dr/icon';
const Step = Steps.Step;

export default class Cure extends Component {
  constructor(props){
    super(props);
    this.state = {
      baPatient: {},
      caseBasicInfo: null, // 基本病历信息不包括诊断
    };
  };
  componentWillMount(){
    this.getRegisterInfo(this.props.registerid);
  };
  /**
   * [getRegisterInfo getRegisterInfo]
   * @param  {[type]} registerid [挂号ID]
   * @return {[type]}            [undefined]
   */
  getRegisterInfo(registerid){
    let self = this;
    let params = {
      url: 'BuRegisterController/getData',
      data: {
        registerid: registerid,
      },
    };
    function callBack(res){
      if(res.result){
        let { baPatient } = res.data;
        self.setState({ baPatient });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  componentWillReceiveProps(nextProps){
    if(nextProps.current == 2 && this.caseConfirm){
      this.caseConfirm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.setState({ caseBasicInfo: values });
        }
      });
    }
  };
  render() {
    let { patientname = '未知', sexDic = '男', birthday = '1992-08-21', mobile = '**********', cardno = '**********************', patienttypeDic = '未知'} = this.state.baPatient;
    let age = extractDataFromIdentityCard.getAgeFromBirthday(birthday);
    let caseBasicInfo = this.state.caseBasicInfo;
    let current = this.props.current;
    let bodyComponent = null;
    if(current == 1){
      bodyComponent = <CaseConfirm onStep={(step) => {this.props.onStep(step)}} ref={ ref => { this.caseConfirm = ref }}/>;
    }
    if(current == 2){
      bodyComponent = <SmartDistinguish onStep={(step) => {this.props.onStep(step)}} caseBasicInfo={caseBasicInfo} registerid={this.props.registerid} baPatient={ this.state.baPatient}/>;
    }
    if(current == 3){
      bodyComponent = <SmartTreatment onStep={(step) => {this.props.onStep(step)}} registerid={this.props.registerid}/>;
    }
    if(current == 4){
      bodyComponent = <Finish onStep={(step) => {this.props.onStep(step)}} registerid={this.props.registerid}/>;
    }
    return (
        <Container >
          <Top>
            <StyledIcon type='syndrome_treatment'/>
            <Title>辨证论治</Title>
            <SpecSteps current={current - 1}>
              <Step title="病情病历确认"/>
              <Step title="智能辩证"/>
              <Step title="智能论治"/>
              <Step title="完成"/>
            </SpecSteps>
          </Top>
          <Content>
            <Left>
              <DocInfo>
                <Img src={header} />
                <TextInfo>
                    <span>王琰龙</span>
                    <span>副主任医师</span>
                </TextInfo>
              </DocInfo>
              <Info>
                <Label>患者姓名 :</Label>
                <Value>{patientname}</Value>
              </Info>
              <Info>
                <Label>性别 :</Label>
                <Value>{sexDic}</Value>
              </Info>
              <Info>
                <Label>年龄 :</Label>
                <Value>{age}</Value>
              </Info>
              <Info>
                <Label>移动电话 :</Label>
                <Value>{mobile}</Value>
              </Info>
              <Info>
                <Label>身份证号 :</Label>
                <Value>{cardno}</Value>
              </Info>
              <Info>
                <Label>医保类型 :</Label>
                <Value>{patienttypeDic}</Value>
              </Info>
              <ActionButton>
                <img src={re_select} />
                <Value>重选患者</Value>
              </ActionButton>
            </Left>
            <Body>
            {bodyComponent}
            </Body>
          </Content>
        </Container>
    )
  }
}

const Container = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  height: 50px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.349019607843137);
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
  &&& {
    width: 800px;
  }
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
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const Left = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid transparent;
  border-image: linear-gradient( to bottom, #1273CD , white) 100 30;
  padding-top: 40px;
`;
const DocInfo = styled.div`
  width: 162px;
  height: 80px;
  color: #16B4E7;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 30px;
  border-bottom: 1px solid #CCCCCC;
`;
const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Img = styled.img`
`;
const Info = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Label = styled.div`
  color: #333333;
  width: 50%;
  text-align: right;
`;
const Value = styled.div`
  width: 50%;
  color: #16B4E7;
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ActionButton = Info.extend`
  width: 60%;
  padding: 5px 0px;
  border-top: 1px solid #CCCCCC;
  border-bottom: 1px solid #CCCCCC;
`;
const Body = styled.div`
  width: calc(100% - 200px);
  float: left;
`;
/*
@作者：姜中希
@日期：2018-10-15
@描述：辨证论治智能辩证、智能论治、完成组件容器
*/
