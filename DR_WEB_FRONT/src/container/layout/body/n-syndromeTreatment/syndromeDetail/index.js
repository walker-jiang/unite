import React, {Component, PropTypes} from 'react'; // react核心
import { withRouter } from 'react-router-dom';
import header from './header.png';
import re_select from './re_select.png';
import step_one from './step_one.png';
import step_two from './step_two.png';
import step_three from './step_three.png';
import styled from 'styled-components';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import CaseConfirm from '../cure/caseConfirm';
import SmartDistinguish from '../cure/smartDistinguish';
import SmartTreatment from '../cure/smartTreatment';
import Icon from 'components/dr/icon';

class Cure extends Component {
  constructor(props){
    super(props);
    this.state = {
      baPatient: {},
      caseBasicInfo: null, // 基本病历信息不包括诊断
      current: 1
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
        window.cardno = res.data.baPatient.cardno;
        window.cardtype = res.data.baPatient.cardtype;
        window.birthday = res.data.baPatient.birthday;
        window.sex = res.data.baPatient.sex;
        window.patientName = res.data.baPatient.patientname;
        window.patientID = res.data.baPatient.patientid;
        window.registerID = registerid;
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
  toggle(step){
    this.setState({
      current: step
    });
  };
  render() {
    let { patientname = '未知', sexDic = '男', birthday = '1992-08-21', mobile = '**********', cardno = '**********************', patienttypeDic = '未知'} = this.state.baPatient;
    let age = extractDataFromIdentityCard.getAgeFromBirthday(birthday);
    let caseBasicInfo = this.state.caseBasicInfo;
    let current = this.state.current;
    let bodyComponent = null;
    if(current == 1){
      bodyComponent = <CaseConfirm onStep={(step) => {}} registerid={this.props.registerid}  readonly={true}/>;
    }
    if(current == 2){
      bodyComponent = <SmartDistinguish onStep={(step) => {}} registerid={this.props.registerid}  readonly={true}/>;
    }
    if(current == 3){
      bodyComponent = <SmartTreatment onStep={(step) => {}} registerid={this.props.registerid}  readonly={true}/>;
    }
    return (
        <Container >
          <Top>
            <StyledIcon type='syndrome_treatment'/>
            <Title>辨证论治</Title>
            <Line height='20px'></Line>
            <Step active={current == 1} onClick={() => {this.toggle(1)}}><Sign src={step_one}/>病情病历信息</Step>
            <Line height='15px'></Line>
            <Step active={current == 2} onClick={() => {this.toggle(2)}}><Sign src={step_two}/>智能辩证结果</Step>
            <Line height='15px'></Line>
            <Step active={current == 3} onClick={() => {this.toggle(3)}}><Sign src={step_three}/>智能论治结果</Step>
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
                <Label>医保类型 :</Label>
                <Value>{patienttypeDic}</Value>
              </Info>
              <ActionButton onClick={() => { this.props.history.push('/Layout/syndromeTreatment')}}>
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
const Line = styled.div`
  background-color: #999999;
  width: 1px;
  height: ${props => props.height}
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
const Step = styled.div`
  cursor: pointer;
  width: 110px;
  height: 40px;
  line-height: 40px;
  color: rgb(0, 102, 204);
  border-bottom: ${props => props.active ? '2px solid #0066CC' : 'none'};
  margin: 0px 13px;
`;
const Sign = styled.img`
  margin-right: 10px;
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
  margin-top: 16px;
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
  cursor: pointer;
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
export default withRouter(Cure);
