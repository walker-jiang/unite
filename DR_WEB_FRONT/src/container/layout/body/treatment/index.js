import React, {Component} from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import Icon from 'components/dr/icon';
import buttonSty from 'components/antd/style/button';
import PatientDetailInfo from './treatItem/patientDetailInfo';
import WriteMedicalRecords from './treatItem/writeMedicalRecords';
import DrAdviceManage from './treatItem/drAdviceManage';
import DiseasePreventTreat from './treatItem/diseasePreventTreat';
import PatientList from './patientList';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      treatTab: 0,
      patienttypeDic: '',
      sexDic: '',
      age: 0,
      visible: false, // 患者列表是否可见
    };
  };
  componentWillMount(){
    this.getUserInfo();
  };
  componentWillReceiveProps(){
    this.getUserInfo();
  };
  getUserInfo(){
    let self = this;
    let params = {
      url: 'BaPatientController/getData',
      data: {
        id: this.props.match.params.id,
      },
    };
    function callBack(res){
      if(res.result){
        let date = new Date();
        window.cardno = res.data.cardno;
        window.cardtype = res.data.cardtype;
        window.birthday = res.data.birthday;
        window.sex = res.data.sex;
        window.patientName = res.data.patientname;
        window.patientID = res.data.patientid;
        self.setState({
          patienttypeDic: res.data.patienttypeDic,
          sexDic: res.data.sexDic,
          age: date.getFullYear() - parseInt(res.data.birthday.substr(0, 4)),
          visible: false
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [toggleTabs tab页切换函数]
   * @param  {[type]} curTab [当前页]
   * @return {[type]}        [undefined]
   */
  toggleTabs(curTab){
    this.setState({
      treatTab: curTab
    });
  };
  render() {
    let { treatTab, patienttypeDic, sexDic, age, visible } = this.state;
    let curTabComponet = null;
    if(treatTab == 0){
      curTabComponet = <PatientDetailInfo />
    }else if(treatTab == 1){
      curTabComponet = <WriteMedicalRecords />
    }else if(treatTab == 2){
      curTabComponet = <DrAdviceManage />
    }else if(treatTab == 3){
      curTabComponet = <DiseasePreventTreat />
    }
    return (
      <Container>
        <Header>
          <PatientInfo>
            {window.patientName} / {sexDic} / {age}岁 / {patienttypeDic}
          </PatientInfo>
          <TreatStatus>
            <span>• 诊疗中</span>
            <DownIcon type='down' onClick={() => {this.setState({ visible: !visible })}}></DownIcon>
          </TreatStatus>
          <RegisterButton>完成诊疗</RegisterButton>
          <SpecTabs>
            <TabPane activeTab={treatTab} _key={0} onClick={(e) => this.toggleTabs(0)}>患者信息</TabPane>
            <TabPane activeTab={treatTab} _key={1} onClick={(e) => this.toggleTabs(1)}>书写病历</TabPane>
            <TabPane activeTab={treatTab} _key={2} onClick={(e) => this.toggleTabs(2)}>医嘱管理</TabPane>
            <TabPane activeTab={treatTab} _key={3} onClick={(e) => this.toggleTabs(3)}>治未病</TabPane>
          </SpecTabs>
        </Header>
        <Content>
          <PatientList visible={visible}/>
        {curTabComponet}
        </Content>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const Header = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: rgba(242, 242, 242, 1);
  padding: 0px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 1px 1px 5px;
`;
const PatientInfo = styled.div`
  color: #0A6ECB;
  font-size: 14px;
  font-weight: 409;
  padding-right: 17px;
  border-right: 1px solid  #0A6ECB;
`;
const TreatStatus = styled.div`
  color: #0A6ECB;
  font-size: 14px;
  width: 163px;
  padding: 3px 0px;
  margin-right: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-right: 1px solid #797979;
`;
const DownIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  margin-top: 5px;
`;
const RegisterButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const SpecTabs = styled.div`
  margin: 20px;
  font-size: 13px;
  display: flex;
  align-items: center;
  width: fit-content;
`;
const TabPane = styled.div`
  word-wrap: normal;
  white-space: nowrap;
  padding: 5px 15px;
  margin: 0px 10px;
  cursor: pointer;
  border-bottom: ${props => props.activeTab == props._key ? '2px solid #5959e0': 'none'} ;
`;
const Content = styled.div`
  width: 100%;
  position: relative;
`;
/*
@作者：姜中希
@日期：2018-09-23
@描述：诊疗容器包括患者信息，书写病历，医嘱管理，治未病
*/