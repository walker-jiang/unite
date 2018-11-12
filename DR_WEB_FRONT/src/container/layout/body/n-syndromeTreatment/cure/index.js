import React, {Component, PropTypes} from 'react'; // react核心
import { withRouter } from 'react-router-dom';
import { Steps } from 'antd';
import styled from 'styled-components';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import CaseConfirm from './caseConfirm';
import SmartDistinguish from './smartDistinguish';
import SmartTreatment from './smartTreatment';
import Finish from './finish';
import Left from './left';
import Icon from 'components/dr/icon';
const Step = Steps.Step;

class Cure extends Component {
  constructor(props){
    super(props);
    this.state = {
      baPatient: {},
      caseBasicInfo: null, // 基本病历信息不包括诊断
    };
  };
  componentWillMount(){
    this.getRegisterInfo(window.registerID);
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
      bodyComponent = <SmartDistinguish onStep={(step) => {this.props.onStep(step)}} caseBasicInfo={caseBasicInfo} baPatient={ this.state.baPatient}/>;
    }
    if(current == 3){
      bodyComponent = <SmartTreatment onStep={(step) => {this.props.onStep(step)}}/>;
    }
    if(current == 4){
      bodyComponent = <Finish onStep={(step) => {this.props.onStep(step)}}/>;
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
  height: calc(100% - 50px);
  display: flex;
`;
const Body = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  float: left;
`;
/*
@作者：姜中希
@日期：2018-10-15
@描述：辨证论治智能辩证、智能论治、完成组件容器
*/
export default withRouter(Cure);
