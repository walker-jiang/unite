import React, {Component} from 'react';
import styled from 'styled-components';
import Icon from 'components/dr/icon';
import SelectPatient from './selectPatient';
import Cure from './cure';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class SyndromeTreatment extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 0, //当前步
      registerid: '', //选择的当前患者
    };
    this.stepFunc = this.stepFunc.bind(this);
  };
  componentWillReceiveProps(){
    self.setState({ current: 0 })
  };
  getCaseData(){};
  getSyndromeData(registerid){
    let self = this;
    let params = {
      url: 'BuPatientCaseController/getData',
      server_url: config_InteLigenTreat_url + 'TCMAE/',
      data: {
        registerid: registerid
      },
    };
    function callBack(res){
      if(res.result){
        if(res.data){
          self.setState({ current: 3, registerid })
        }else{
          self.setState({ current: 1, registerid })
        }
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  stepFunc(step, registerid){
    if(registerid){
      this.getSyndromeData(registerid);
    }else{
      this.setState({ current: step })
    }
  };
  render() {
    let { current, registerid } = this.state;
    let compo = null;
    if(current == 0){
      compo = <SelectPatient onStep={this.stepFunc}/>;
    }else{
      compo = <Cure onStep={this.stepFunc} current={current} registerid={registerid}/>;
    }

    return (
      <Container>
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

/*
@作者：姜中希
@日期：2018-10-07
@描述：辩证论治
*/
