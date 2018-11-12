import React, {Component, PropTypes} from 'react'; // react核心
import { withRouter } from 'react-router-dom';
import step_one from './step_one.png';
import step_two from './step_two.png';
import step_three from './step_three.png';
import styled from 'styled-components';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import CaseConfirm from '../cure/caseConfirm';
import SmartDistinguish from '../cure/smartDistinguish';
import SmartTreatment from '../cure/smartTreatment';
import Left from '../cure/left';
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
    this.getRegisterInfo();
  };
  /**
   * [getRegisterInfo getRegisterInfo]
   * @return {[type]}            [undefined]
   */
  getRegisterInfo(){
    let self = this;
    let params = {
      url: 'BuRegisterController/getData',
      data: {
        registerid: window.registerID,
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
      bodyComponent = <CaseConfirm onStep={(step) => {}} readOnly={true}/>;
    }
    if(current == 2){
      bodyComponent = <SmartDistinguish onStep={(step) => {}} readOnly={true}/>;
    }
    if(current == 3){
      bodyComponent = <SmartTreatment onStep={(step) => {}} readOnly={true}/>;
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
            <Left />
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
