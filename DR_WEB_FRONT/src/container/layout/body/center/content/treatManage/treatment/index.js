import React, {Component} from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';
import TreatmentList from './treatmentList';
import DrAdviceManage from './drAdviceManage';

const TabPane = Tabs.TabPane;

export default class Treatment extends Component {
  constructor(props){
    super(props);
  };
  render() {
    return (
      <SpecTabs defaultActiveKey="1" tabPosition='left' animated={false}>
        <TabPane tab="✍️书写诊疗单" key="1">
          <TreatmentList onChange={this.props.onChange}/>
        </TabPane>
        <TabPane tab="✍️医嘱管理" key="2">
          <DrAdviceManage />
        </TabPane>
      </SpecTabs>
    );
  }
}
const SpecTabs = styled(Tabs)`
  & > .ant-tabs-bar > .ant-tabs-nav-container{
    font-weight: 400;
    width: 31px;
  }
  & > .ant-tabs-bar > .ant-tabs-nav-container > .ant-tabs-nav-wrap > .ant-tabs-nav-scroll{
    overflow: visible !important;
    word-wrap: break-word !important;
    white-space: normal;
  }
  & > .ant-tabs-bar > .ant-tabs-nav-container > .ant-tabs-nav-wrap > .ant-tabs-nav-scroll > .ant-tabs-nav > .ant-tabs-ink-bar{
    display: none !important;
  }
  & > .ant-tabs-bar > .ant-tabs-nav-container > .ant-tabs-nav-wrap > .ant-tabs-nav-scroll > .ant-tabs-nav > .ant-tabs-tab {
    text-align: center !important;
    padding: 8px 5px !important;
    background-color: rgba(242, 242, 242, 1);
    color: #33CC00;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  & > .ant-tabs-bar > .ant-tabs-nav-container > .ant-tabs-nav-wrap > .ant-tabs-nav-scroll > .ant-tabs-nav > .ant-tabs-tab:hover {
    background-color: rgba(242, 242, 242, 1);
    color: #33CC00;
  }
  & > .ant-tabs-bar > .ant-tabs-nav-container > .ant-tabs-nav-wrap > .ant-tabs-nav-scroll > .ant-tabs-nav > .ant-tabs-tab-active {
    background-color: rgba(51, 204, 0, 1);
    color: #FFFFFF;
  }
  & > .ant-tabs-bar > .ant-tabs-nav-container > .ant-tabs-nav-wrap > .ant-tabs-nav-scroll > .ant-tabs-nav > .ant-tabs-tab-active:hover {
    background-color: rgba(51, 204, 0, 1);
    color: #FFFFFF;
  }
  /*右侧内容*/
  & > .ant-tabs-content {
    border-left: 2px solid  #FFFFFF !important;
    border-image: linear-gradient(rgba(51, 204, 0, 1),#FFFFFF) 2;
    border-top: 0px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    padding: 0px !important;
  }
`;
/*
@作者：姜中希
@日期：2018-06-25
@描述：诊疗容器（书写诊疗单、医嘱管理）
*/
