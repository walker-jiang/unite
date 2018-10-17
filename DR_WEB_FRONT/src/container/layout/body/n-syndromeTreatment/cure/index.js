import React, {Component, PropTypes} from 'react'; // react核心
import man from './man.png';
import women from './women.png';
import styled from 'styled-components';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import CaseConfirm from './caseConfirm';
import SmartDistinguish from './smartDistinguish';
import SmartTreatment from './smartTreatment';
import Finish from './finish';

export default class Cure extends Component {
  constructor(props){
    super(props);
    this.state = {
      baPatient: {}
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
  render() {
    let { patientname = '未知', sexDic = '男', birthday = '1992-08-21', mobile = '**********', cardno = '**********************', patienttypeDic = '未知'} = this.state.baPatient;
    let age = extractDataFromIdentityCard.getAgeFromBirthday(birthday);
    let current = this.props.current;
    let bodyComponent = null;
    if(current == 1){
      bodyComponent = <CaseConfirm onStep={(step) => {this.props.onStep(step)}}/>;
    }
    if(current == 2){
      bodyComponent = <SmartDistinguish onStep={(step) => {this.props.onStep(step)}}/>;
    }
    if(current == 3){
      bodyComponent = <SmartTreatment onStep={(step) => {this.props.onStep(step)}}/>;
    }
    if(current == 4){
      bodyComponent = <Finish onStep={(step) => {this.props.onStep(step)}}/>;
    }
    return (
        <Container >
          <Left>
            <Photo>
              <Img src={sexDic == '男' ? man : women} />
            </Photo>
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
          </Left>
          <Body>
          {bodyComponent}
          </Body>
        </Container>
    )
  }
}

const Container = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: row;
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
const Photo = styled.div`
  width: 80px;
  height: 80px;
  background-color: #169BD5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
`;
const Info = styled.div`
  margin-top: 20px;
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
const Body = styled.div`
  width: calc(100% - 200px);
  float: left;
`;
/*
@作者：姜中希
@日期：2018-10-15
@描述：辨证论治病情病历确认、智能辩证、智能论治、完成组件容器
*/
