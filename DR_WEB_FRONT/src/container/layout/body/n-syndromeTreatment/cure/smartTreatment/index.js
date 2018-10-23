import React, {Component} from 'react';
import styled from 'styled-components';
import { Table, Tabs, Checkbox, Button, Input } from 'antd';
import buttonSty from 'components/antd/style/button';
import TipModal from 'components/dr/modal/tip';
import Diagnose from '../../../treatment/treatItem/drAdviceManage/diagnose';
import TableGrid from './tableGrid';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import AuxiliaryDiagnosis from "roots/rightAssistBar/medicalRecordWriting/auxiliaryDiagnosis.js";
import ChHerbalMedicine from '../../../treatment/treatItem/drAdviceManage/chHerbalMedicine';
import ChPatentMedicine from '../../../treatment/treatItem/drAdviceManage/chPatentMedicine';
import SuitTechnology from '../../../treatment/treatItem/drAdviceManage/suitTechnology';
import Examination from '../../../treatment/treatItem/drAdviceManage/examination';
import Inspection from '../../../treatment/treatItem/drAdviceManage/inspection';
import WesternMedicine from '../../../treatment/treatItem/drAdviceManage/westernMedicine';
import Material from '../../../treatment/treatItem/drAdviceManage/material';
import AddHeader from '../../../treatment/treatItem/drAdviceManage/addHeader';
import re_diagnose from './re_diagnose.png';
import { getDiagnoseText } from 'commonFunc/transform';

const TabPane = Tabs.TabPane;

export default class SmartDistinguish extends Component {
  constructor(props){
    super(props);
    this.state = {
      buDiagnosisList: [],
      dataSource: [],
      actionType: '', // 打开弹框的目的（添加，查看，修改，删除）
      orderid: '', // 修改、查看、删除时的医嘱ID
      attachOrder: {}, // 打开添加弹框时初始化的数据
    };
    this.actionManager = this.actionManager.bind(this);
    this.getOrderData = this.getOrderData.bind(this);
  };
  /** [getOrderData 获取医嘱数据] */
  getOrderData(){
    let registerid = this.props.registerid;
    let self = this;
    let params = {
      url: 'BuOrderController/getBuOrderByRegisterId',
      server_url: config_InteLigenTreat_url+'TCMAE/',
      data: {
        registerid: registerid,
      },
    };
    function callBack(res){
      if(res.result){
        let dataSource = res.data;
        self.setState({ dataSource });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getDiagnoseData 组件初始化获取加载诊断数据] */
  getDiagnoseData(){
    let self = this;
    let params = {
      url: 'BuDiagnosisInfoController/getData',
      server_url: config_InteLigenTreat_url+'TCMAE/',
      data: {
        registerid: this.props.registerid
      },
    };
    function callBack(res){
      if(res.result && res.data){ // 获取当前诊断明细数据
        let { buDiagnosisList, ...buDiagnosisInfo } = res.data;
        self.setState({
          buDiagnosisList: buDiagnosisList,
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  componentWillMount(){
    this.getOrderData();
    this.getDiagnoseData();
  };
  /**
   * [onDelete 删除医嘱信息]
   * @param  {[type]} orderid [医嘱ID]
   * @return {[type]}        [void]
   */
  onDelete (orderid) {
    let params = {
      url: 'BuOrderController/delData',
      server_url: config_InteLigenTreat_url+'TCMAE/',
      type: 'delete',
      data: orderid,
    };
    let that = this;
    function success(res) {
      that.getOrderData();
    };
    ajaxGetResource(params, success);
  }
  /**
   * [actionManager 动作管理函数，添加、删除、修改、查看]
   * @param  {[type]} actionType [动作类型，添加、删除、修改、查看]
   * @param  {[type]} orderid    [携带数据(包含操作目标)]
   * @return {[type]}            [void]
   */
  actionManager(actionType, record, attachOrder = {}){
    console.log('height: 575px;', record);
    let that = this;
    if(actionType == 'delete'){ // 删除操作
      that.onDelete(record.orderid)
      return;
    }
    else{ // 添加、修改、查看操作
      that.setState({
        actionType: actionType, // modify、view、add
        orderid: record.orderid, // 当前医嘱ID
        attachOrder: attachOrder, //
      }, ()=>{
        // console.log('医嘱对象', record.ordertype);
        switch (record.ordertype) {
          case 1: // 检验
            that.examination.handlePopOpen();
          break;
          case 2: // 检查
            that.inspection.handlePopOpen();
          break;
          case 3: // 草药
            that.chHerbalMedicine.handlePopOpen();
          break;
          case 4: // 中成药、西药
            that.chPatentMedicine.handlePopOpen();
          break;
          case 5: // 中医适宜技术
            that.suitTechnology.handlePopOpen();
          break;
          case 6: // 西医治疗
            that.westernMedicine.handlePopOpen();
          break;
          case 7: // 材料
            that.material.handlePopOpen();
          break;
          default:
            console.log('未找到该类型医嘱');
        }
      });
    }
  };
  render() {
    let { dataSource, actionType, orderid, buDiagnosisList, attachOrder } = this.state;
    let openProps = {
      actionType: actionType,
      orderid: orderid,
      reloadList: () => { this.getOrderData() },
      attachOrder: attachOrder,
      syndrome: true
    };
    let girdProps = {
      dataSource: dataSource,
      operate: this.actionManager
    };
    console.log(!!this.props.readonly);
    if(!!this.props.readonly){
      girdProps.view = true;
    }else{
      girdProps.view = true;
      girdProps.modify = true;
      girdProps.del = true;
    }
    return (
      <Container>
        <Left>
          <Content>
            <ReadableDiagnose>
              <Label>诊断：</Label>
              <SpecInput defaultValue={getDiagnoseText(buDiagnosisList)} disabled/>
              <ReDiagnose onClick={() => {this.props.onStep(1)}}><img src={re_diagnose}/>重新辩证</ReDiagnose>
            </ReadableDiagnose>
            <AddHeader operate={this.actionManager}></AddHeader>
            <TableGrid {...girdProps}/>
          </Content>
          <ActionButton readonly={this.props.readonly}>
            <Checkbox>同步到患者医嘱</Checkbox>
            <SureButton type="primary" onClick={() => {this.props.onStep(4)}}>完成</SureButton>
            <BorderButton type="primary" onClick={() => {this.props.onStep(2)}}>返回上一步</BorderButton>
          </ActionButton>
        </Left>
        <Examination {...openProps} ref={ref => this.examination = ref} />
        <ChHerbalMedicine {...openProps} ref={ref => {this.chHerbalMedicine = ref}}/>
        <ChPatentMedicine {...openProps} ref={ref => {this.chPatentMedicine = ref}}/>
        <SuitTechnology {...openProps} ref={ref => {this.suitTechnology = ref}}/>
        <Inspection {...openProps} ref={ref => this.inspection = ref}/>
        <WesternMedicine {...openProps} ref={ref => this.westernMedicine = ref}/>
        <Material {...openProps} ref={ref => this.material = ref} />
        <Right>
          <SpecTabs key='1' defaultActiveKey='1' animated={false}>
            <TabPane tab="智能论治" key="1">
              {
                <AuxiliaryDiagnosis changeInitDataTwo={this.changeInitDataTwo} listenFormData={{}}/>
              }
            </TabPane>
          </SpecTabs>
        </Right>
      </Container>
    );
  }
}
const Container = styled.div`
  display: flex;
  height: 100%;
`;
const Left = styled.div`
  flex-grow: 1;
  padding: 20px;
  border-right: 1px solid #CCCCCC;
`;
const Content = styled.div`
  height: calc(100% - 60px);
`;
const Right = styled.div`
  width: 422px;
  border-top: 1px solid #CCCCCC;
`;
const ReadableDiagnose = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.div`
  width: 60px;
  white-space: nowrap;
`;
const ReDiagnose = styled.div`
  cursor: pointer;
  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #0066CC;
`;
const SpecInput = styled(Input)`
  &&&.ant-input-disabled {
    background-color: transparent;
  }
  &&&.ant-input {
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    border-radius: 0px;
    border-top: none;
    border-left: none;
    line-height: 25px;
    color: black;
    border-right: none;
    font-size: 12px;
    width: 100%;
    margin-left: 15px;
    margin-top: 1px;
  }
  &&&.ant-input:focus {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    outline: none
  }
`;
const SpecTabs = styled(Tabs)`
  .ant-tabs-nav-container {
    font-size: 13px;
    background: #F2F2F2;
  }
  .ant-tabs-bar {
    border-bottom: 2px solid #7f54d4;
  }
  .ant-tabs-nav-container-scrolling {
    padding: 0px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin: 0px;
    padding: 12px 25px;
  }
  .ant-tabs-ink-bar {
    width: 104px !important;
    height: 1px;
    background-color: #0A6ECB;
  }
  &&& .ant-tabs-content {
    border-top: 1px solid #C9C9C9;
    background-color: #F2F2F2;
    padding: 0px;
    margin-top: -17px;
  }
`;
const ActionButton = styled.div`
  border-top: 1px solid #CCCCCC;
  margin-top: 40px;
  display: ${props => props.readonly ? 'none' : 'block'}
`;
const BorderButton = styled(Button)`
  ${buttonSty.white}
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
/*
@作者：姜中希
@日期：2018-10=16
@描述：智能辩证组件
*/
