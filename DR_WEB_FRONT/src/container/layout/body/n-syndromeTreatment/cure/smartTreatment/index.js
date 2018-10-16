import React, {Component} from 'react';
import styled from 'styled-components';
import { Table, Tabs, Checkbox, Button } from 'antd';
import buttonSty from 'components/antd/style/button';
import TipModal from 'components/dr/modal/tip';
import Diagnose from '../../../treatment/treatItem/drAdviceManage/diagnose';
import TableGrid from './tableGrid';
// import AuxiliaryDiagnosis from "roots/rightAssistBar/medicalRecordWriting/auxiliaryDiagnosis.js";

const TabPane = Tabs.TabPane;

export default class SmartDistinguish extends Component {
  constructor(props){
    super(props);
    this.state = {
      diagnoseText: '',
      dataSource: [],
    };
    this.diagnoseUpdate = this.diagnoseUpdate.bind(this);
    this.actionManager = this.actionManager.bind(this);
  };
  componentWillMount(){
    let dataSource = [{
			"buDiagnosisInfo": null,
			"buOrderDtlList": [],
			"buOrdmedical": null,
			"buRecipe": null,
			"ctstamp": "2018-10-16 14:32:45",
			"execDepaid": null,
			"feeall": 15.5,
			"ordercontent": "磷酸酶测定",
			"orderid": "201839671565541105",
			"orderno": "",
			"orderstate": "6",
			"ordertype": 1,
			"orgUserid": "2",
			"orgUsername": "姜中希",
			"orgid": "14",
			"parientid": "201839655147820209",
			"parientname": "李锐通",
			"printnum": 0,
			"printstate": "02",
			"registerid": "201839655147863211",
			"submitstate": "01",
			"useflag": "1",
			"utstamp": "2018-10-16 15:01:22",
			"orderstateDic": "未提交",
			"ordertypeDic": "检验",
			"printstateDic": "未打印"
		}, {
			"buDiagnosisInfo": null,
			"buOrderDtlList": [],
			"buOrdmedical": null,
			"buRecipe": null,
			"ctstamp": "2018-10-16 14:32:45",
			"execDepaid": null,
			"feeall": 15.5,
			"ordercontent": "磷酸酶测定",
			"orderid": "201839671565541105",
			"orderno": "",
			"orderstate": "6",
			"ordertype": 1,
			"orgUserid": "2",
			"orgUsername": "姜中希",
			"orgid": "14",
			"parientid": "201839655147820209",
			"parientname": "李锐通",
			"printnum": 0,
			"printstate": "02",
			"registerid": "201839655147863211",
			"submitstate": "01",
			"useflag": "1",
			"utstamp": "2018-10-16 15:01:22",
			"orderstateDic": "未提交",
			"ordertypeDic": "检验",
			"printstateDic": "未打印"
		}, {
			"buDiagnosisInfo": null,
			"buOrderDtlList": [],
			"buOrdmedical": null,
			"buRecipe": null,
			"ctstamp": "2018-10-16 14:32:45",
			"execDepaid": null,
			"feeall": 15.5,
			"ordercontent": "磷酸酶测定",
			"orderid": "201839671565541105",
			"orderno": "",
			"orderstate": "6",
			"ordertype": 1,
			"orgUserid": "2",
			"orgUsername": "姜中希",
			"orgid": "14",
			"parientid": "201839655147820209",
			"parientname": "李锐通",
			"printnum": 0,
			"printstate": "02",
			"registerid": "201839655147863211",
			"submitstate": "01",
			"useflag": "1",
			"utstamp": "2018-10-16 15:01:22",
			"orderstateDic": "未提交",
			"ordertypeDic": "检验",
			"printstateDic": "未打印"
		}, {
			"buDiagnosisInfo": null,
			"buOrderDtlList": [],
			"buOrdmedical": null,
			"buRecipe": null,
			"ctstamp": "2018-10-16 14:32:45",
			"execDepaid": null,
			"feeall": 15.5,
			"ordercontent": "磷酸酶测定",
			"orderid": "201839671565541105",
			"orderno": "",
			"orderstate": "6",
			"ordertype": 1,
			"orgUserid": "2",
			"orgUsername": "姜中希",
			"orgid": "14",
			"parientid": "201839655147820209",
			"parientname": "李锐通",
			"printnum": 0,
			"printstate": "02",
			"registerid": "201839655147863211",
			"submitstate": "01",
			"useflag": "1",
			"utstamp": "2018-10-16 15:01:22",
			"orderstateDic": "未提交",
			"ordertypeDic": "检验",
			"printstateDic": "未打印"
		}];
    this.setState({ dataSource });
  };
  /**
   * [diagnoseUpdate 诊断更新后的诊断组合文本]
   * @param  {[type]} diagnoseText [文本内容]
   * @return {[type]}              [undefined]
   */
  diagnoseUpdate(diagnoseText){
    this.setState({ diagnoseText });
  };
  /**
   * [actionManager 动作管理函数，添加、删除、修改、查看]
   * @param  {[type]} actionType [动作类型，添加、删除、修改、查看]
   * @param  {[type]} orderid    [携带数据(包含操作目标)]
   * @return {[type]}            [void]
   */
  actionManager(actionType, record, buOrderDtlList = []){
    console.log("2222222222222222",JSON.stringify(buOrderDtlList));
    let that = this;
    if(actionType == 'delete'){ // 删除操作
      that.onDelete(record.orderid)
      return;
    }
    else{ // 添加、修改、查看操作
      that.setState({
        actionType: actionType, // modify、view、add
        orderid: record.orderid, // 当前医嘱ID
        buOrderDtlList: buOrderDtlList, //
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
    let dataSource = this.state.dataSource;
    return (
      <Container>
        <Left>
          <Diagnose diagnoseUpdate={this.diagnoseUpdate}/>
          <TableGrid dataSource={dataSource} operate={this.actionManager}/>
          <ActionButton>
            <Checkbox>同步到患者医嘱</Checkbox>
            <SureButton type="primary" onClick={() => {this.props.onStep(3)}}>完成</SureButton>
            <BorderButton type="primary" onClick={() => {this.props.onStep(1)}}>返回上一步</BorderButton>
          </ActionButton>
        </Left>
        <Right>
          <SpecTabs key='1' defaultActiveKey='1' animated={false}>
            <TabPane tab="智能论治" key="1">
              {
                // <AuxiliaryDiagnosis changeInitDataTwo={this.changeInitDataTwo} listenFormData={{}}/>
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
`;
const Left = styled.div`
  flex-grow: 1;
  padding: 20px;
  border-right: 1px solid #CCCCCC;
`;
const Right = styled.div`
  width: 422px;
  border-top: 1px solid #CCCCCC;
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
