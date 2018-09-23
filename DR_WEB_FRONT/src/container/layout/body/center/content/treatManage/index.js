import React, {Component} from 'react';
import ReactDom from "react-dom"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Button, Breadcrumb, Icon, Row, Col, Tabs} from 'antd'
import styled from 'styled-components';
import Treatment from "./treatment"
import DiseasePreventTreat from './diseasePreventTreat';
// import Electronic from "./tabButton/second/electronic.js"
import Electronic from "./tabButton/electronicMedicalRecords"
import Agency from "./tabButton/three/agency.js"
import Appointment from "./tabButton/four/appointment.js"
import ApplicationForm from "./tabButton/five/applicationForm.js"
import Header from './header';

const TabPane = Tabs.TabPane;

export default class TreatManage extends Component {
  constructor(props){
    super(props);
    this.state = {
      curTab: '1', // 当前展示的是第几个标签页
    };
    this.changeTab = this.changeTab.bind(this);
  };
   changeTab(e){ // tabs切换事件
     this.setState({
       curTab: e
     });
   };
  render() {
    console.log('this.props.manage', this.props);
    let {curTab} = this.state;
    return (
      <Container>
        <Header toggle={this.props.toggle}></Header>
          <Body>
            <MiddleLine></MiddleLine>
            <TabsCus type="card" activeKey={curTab} onChange={this.changeTab}>
              <TabPane tab={<TabButton>✍️诊疗</TabButton>} key="1">
                <Treatment onChange={this.changeTab} />
              </TabPane>
              <TabPane tab={<ElectronicButton>📃电子病历</ElectronicButton>} key="2">
                <Electronic />
              </TabPane>
              <TabPane tab={<AgencyButton>📝代开业务</AgencyButton>} key="3">
                <Agency/>
              </TabPane>
              <TabPane tab={<AppointmentButton>📈预约挂号</AppointmentButton>} key="4">
                <Appointment/>
              </TabPane>
              <TabPane tab={<ApplicationButton>📋入院申请单</ApplicationButton>} key="5">
                <ApplicationForm/>
              </TabPane>
              <TabPane tab={<CureButton>🔍治未病</CureButton>} key="6">
                <DiseasePreventTreat />
              </TabPane>
            </TabsCus>
          </Body>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 100%;
`;
const Body = styled.div`
& > .ant-tabs-card .ant-tabs-content {
  background: #fff;
  padding: 16px;
  padding-bottom: 0px !important;
  padding-top: 0px;
}
& > .ant-tabs-card .ant-tabs-bar,
& > .ant-tabs-card > .ant-tabs-bar > .ant-tabs-nav-container > .ant-tabs-nav-wrap > .ant-tabs-nav-scroll > .ant-tabs-nav > .ant-tabs-tab-active {
	border-color: #fff;
  margin: 0px !important;
}
& > .ant-tabs.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
	border: none;
	background: none;
	margin-left: -1%;
}
  padding-top: 3px;
`;
const MiddleLine = styled.div`
  height: 1px;
  background: #CCCCCC;
  position: relative;
  bottom: -20px
`;
const TabButton = styled(Button).attrs({
  type: 'ghost',
  id: "tabStyle"
})`
  && {
    color: #0a6ecb ;
    background-color: rgba(242, 242, 242, 1);
    border-color: rgba(242, 242, 242, 1);
    width: 102px;
    height: 29px;
    :hover {
      background-color: rgba(242, 242, 242, 1);
      border-color: rgba(242, 242, 242, 1);
    }
  }
  border-radius: 20px !important;
`;
const TabsCus = styled(Tabs)`
  .ant-tabs-tab-active #tabStyle {
    color: rgba(242, 242, 242, 1) !important;
    background-color: #0a6ecb;
    border-color: #0a6ecb;
    width: 102px;
    height: 29px;
  }
`;
const TreatmentButton = TabButton;
const ElectronicButton = TabButton.extend`
  margin-left: -17%
`;
const AgencyButton = TabButton.extend`
  margin-left: -35%
`;
const AppointmentButton = TabButton.extend`
  margin-left: -52%
`;
const ApplicationButton = TabButton.extend`
  margin-left: -70%
`;
const CureButton = TabButton.extend`
  margin-left: -87%
`;
/*
@作者：姜中希
@日期：2018-06-05
@描述：诊疗管理容器
*/
/*
@作者：王崇琨
@日期：2018-06-22
@描述：布局，包含头部导航，主要内容
*/
