import React, {Component} from 'react';
import styled from 'styled-components';
import Icon from 'components/dr/icon';
import SelectPatient from './selectPatient';
import Cure from './cure';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import SyndromeDetail from './syndromeDetail';

export default class SyndromeTreatment extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 0, //当前步
    };
    this.stepFunc = this.stepFunc.bind(this);
    window.getRegisterPatientFromHis = () => this.getRegisterPatientFromHis();
  };
  componentWillMount(){
    this.getRegisterPatientFromHis();
  };
  /** [getRegisterPatientFromHis 调用his查询患者信息的服务] */
  getRegisterPatientFromHis(){
    // alert('正在向his请求患者信息。。。');
    // 成功得到患者信息后获取该患者的病历信息
    // this.getSyndromeData();
    // 失败的话再次请求
  };
  componentWillReceiveProps(){
    this.setState({ current: 0 })
  };
  getCaseData(){};
  getSyndromeData(){
    let self = this;
    let params = {
      url: 'BuPatientCaseController/getData',
      server_url: config_InteLigenTreat_url + 'TCMAE/',
      data: {
        registerid: window.registerID
      },
    };
    function callBack(res){
      if(res.result){
        window.modifyPermission = 1; // 医嘱书写权限0只读 1 可写
        if(res.data){
          self.setState({ current: 3 })
        }else{
          self.setState({ current: 1 })
        }
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [stepFunc 组件跳转函数]
   * @param  {[type]} step       [跳转到那一步]
   * @param  {[type]} registerid [选择患者后需要返回挂号ID]
   * @return {[type]}            [undefined]
   */
  stepFunc(step, registerid){
    if(registerid){ // 选择患者后返回该患者的挂号ID
      window.registerID = registerid;
      this.getSyndromeData(registerid);
    }else{
      this.setState({ current: step })
    }
  };
  render() {
    let { current } = this.state;
    let compo = null;
    if(current == 0){
      compo = <SelectPatient onStep={this.stepFunc}/>;
    }else if(current == -1){ // 辨证论治详情
      compo = <SyndromeDetail/>
    }else{
      compo = <Cure onStep={this.stepFunc} current={current} />;
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
  display: flex;
  flex-direction: column;
`;

/*
@作者：姜中希
@日期：2018-10-07
@描述：辩证论治
*/
