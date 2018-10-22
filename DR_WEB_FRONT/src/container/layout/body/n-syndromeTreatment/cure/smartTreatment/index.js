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
      buOrderDtlList: {}, // 打开添加弹框时初始化的数据
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
    // let dataSource = [{
		// 	"buDiagnosisInfo": null,
		// 	"buOrderDtlList": [],
		// 	"buOrdmedical": null,
		// 	"buRecipe": null,
		// 	"ctstamp": "2018-10-16 14:32:45",
		// 	"execDepaid": null,
		// 	"feeall": 15.5,
		// 	"ordercontent": "磷酸酶测定",
		// 	"orderid": "201839671565541105",
		// 	"orderno": "",
		// 	"orderstate": "6",
		// 	"ordertype": 1,
		// 	"orgUserid": "2",
		// 	"orgUsername": "姜中希",
		// 	"orgid": "14",
		// 	"parientid": "201839655147820209",
		// 	"parientname": "李锐通",
		// 	"printnum": 0,
		// 	"printstate": "02",
		// 	"registerid": "201839655147863211",
		// 	"submitstate": "01",
		// 	"useflag": "1",
		// 	"utstamp": "2018-10-16 15:01:22",
		// 	"orderstateDic": "未提交",
		// 	"ordertypeDic": "检验",
		// 	"printstateDic": "未打印"
		// }, {
		// 	"buDiagnosisInfo": null,
		// 	"buOrderDtlList": [],
		// 	"buOrdmedical": null,
		// 	"buRecipe": null,
		// 	"ctstamp": "2018-10-16 14:32:45",
		// 	"execDepaid": null,
		// 	"feeall": 15.5,
		// 	"ordercontent": "磷酸酶测定",
		// 	"orderid": "201839671565541105",
		// 	"orderno": "",
		// 	"orderstate": "6",
		// 	"ordertype": 1,
		// 	"orgUserid": "2",
		// 	"orgUsername": "姜中希",
		// 	"orgid": "14",
		// 	"parientid": "201839655147820209",
		// 	"parientname": "李锐通",
		// 	"printnum": 0,
		// 	"printstate": "02",
		// 	"registerid": "201839655147863211",
		// 	"submitstate": "01",
		// 	"useflag": "1",
		// 	"utstamp": "2018-10-16 15:01:22",
		// 	"orderstateDic": "未提交",
		// 	"ordertypeDic": "检验",
		// 	"printstateDic": "未打印"
		// }, {
		// 	"buDiagnosisInfo": null,
		// 	"buOrderDtlList": [],
		// 	"buOrdmedical": null,
		// 	"buRecipe": null,
		// 	"ctstamp": "2018-10-16 14:32:45",
		// 	"execDepaid": null,
		// 	"feeall": 15.5,
		// 	"ordercontent": "磷酸酶测定",
		// 	"orderid": "201839671565541105",
		// 	"orderno": "",
		// 	"orderstate": "6",
		// 	"ordertype": 1,
		// 	"orgUserid": "2",
		// 	"orgUsername": "姜中希",
		// 	"orgid": "14",
		// 	"parientid": "201839655147820209",
		// 	"parientname": "李锐通",
		// 	"printnum": 0,
		// 	"printstate": "02",
		// 	"registerid": "201839655147863211",
		// 	"submitstate": "01",
		// 	"useflag": "1",
		// 	"utstamp": "2018-10-16 15:01:22",
		// 	"orderstateDic": "未提交",
		// 	"ordertypeDic": "检验",
		// 	"printstateDic": "未打印"
		// }, {
		// 	"buDiagnosisInfo": null,
		// 	"buOrderDtlList": [],
		// 	"buOrdmedical": null,
		// 	"buRecipe": null,
		// 	"ctstamp": "2018-10-16 14:32:45",
		// 	"execDepaid": null,
		// 	"feeall": 15.5,
		// 	"ordercontent": "磷酸酶测定",
		// 	"orderid": "201839671565541105",
		// 	"orderno": "",
		// 	"orderstate": "6",
		// 	"ordertype": 1,
		// 	"orgUserid": "2",
		// 	"orgUsername": "姜中希",
		// 	"orgid": "14",
		// 	"parientid": "201839655147820209",
		// 	"parientname": "李锐通",
		// 	"printnum": 0,
		// 	"printstate": "02",
		// 	"registerid": "201839655147863211",
		// 	"submitstate": "01",
		// 	"useflag": "1",
		// 	"utstamp": "2018-10-16 15:01:22",
		// 	"orderstateDic": "未提交",
		// 	"ordertypeDic": "检验",
		// 	"printstateDic": "未打印"
		// }];
    // this.setState({ dataSource });
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
  actionManager(actionType, record, buOrderDtlList = {}){
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
    let { dataSource, actionType, orderid, buOrderDtlList, buDiagnosisList } = this.state;
//     buOrderDtlList = {
// 	"buOrderDtlList": [{
// 		"baseUnit": "02",
// 		"conversion": "02",
// 		"count": 1.0,
// 		"ctstamp": "2018-07-12 17:50:27",
// 		"deptid": "0",
// 		"deptname": "02",
// 		"dosage": "02",
// 		"doseid": 0,
// 		"dosename": "02",
// 		"feeout": 0.0,
// 		"feesum": 0.0,
// 		"feesumType": "02",
// 		"feesumin": 0.0,
// 		"freqid": 0,
// 		"freqname": "02",
// 		"hiscode": "02",
// 		"hisname": "02",
// 		"itemcode": "02",
// 		"itemid": 1,
// 		"itemname": "02",
// 		"itemno": 0,
// 		"itemtype": 0,
// 		"miType": "1",
// 		"orderid": "201831389027636137",
// 		"packageUnit": 0,
// 		"packaging": "02",
// 		"paytype": "02",
// 		"preferentialfee": 0.0,
// 		"preferentialscale": 0.0,
// 		"recipeno": "02",
// 		"remarks": "02",
// 		"spbody": "02",
// 		"specification": "02",
// 		"suitid": null,
// 		"takedays": 0,
// 		"uniqueid": "201831389027636138",
// 		"unitprice": 2.0,
// 		"usageid": 0,
// 		"usagename": "02",
// 		"useflag": "1",
// 		"utstamp": "2018-07-12 17:50:27"
// 	}],
// 	"buOrdmedical": {
// 		"aim": "02",
//     "miType": '1',
// 		"buOrdmedicalSuitList": [{
// 			"baseUnit": "02",
// 			"buOrderDtlList": [{
// 				"baseUnit": "02",
// 				"conversion": "02",
// 				"count": 1.0,
// 				"ctstamp": "2018-07-12 17:50:27",
// 				"deptid": "0",
// 				"deptname": "02",
// 				"dosage": "02",
// 				"doseid": 0,
// 				"dosename": "02",
// 				"feeout": 0.0,
// 				"feesum": 0.0,
// 				"feesumType": "02",
// 				"feesumin": 0.0,
// 				"freqid": 0,
// 				"freqname": "02",
// 				"hiscode": "02",
// 				"hisname": "02",
// 				"itemcode": "02",
// 				"itemid": 3,
// 				"itemname": "02",
// 				"itemno": 0,
// 				"itemtype": 0,
// 				"miType": "1",
// 				"orderid": "201831389027636137",
// 				"packageUnit": 0,
// 				"packaging": "02",
// 				"paytype": "02",
// 				"preferentialfee": 0.0,
// 				"preferentialscale": 0.0,
// 				"recipeno": "02",
// 				"remarks": "02",
// 				"spbody": "02",
// 				"specification": "02",
// 				"suitid": "201831389027636141",
// 				"takedays": 0,
// 				"uniqueid": "201831389027636142",
// 				"unitprice": 2.0,
// 				"usageid": 0,
// 				"usagename": "02",
// 				"useflag": "1",
// 				"utstamp": "2018-07-12 17:50:27"
// 			}],
// 			"count": 1,
// 			"ctstamp": "2018-07-12 17:50:27",
// 			"feesum": 0.0,
// 			"orderSuitcode": "02",
// 			"orderSuitid": 0,
// 			"orderSuitname": "02",
// 			"ordmedicalid": "201831389027636140",
// 			"seqno": 0,
// 			"specification": "02",
// 			"suitid": "201831389027636141",
// 			"useflag": "1",
// 			"utstamp": "2018-07-12 17:50:27"
// 		}],
// 		"ctstamp": "2018-07-12 17:50:27",
// 		"deptcode": "02",
// 		"deptname": "02",
// 		"diagnosecode": "02",
// 		"diagnosename": "02",
// 		"diagnoseno": "02",
// 		"doctorid": "02",
// 		"doctorname": "02",
// 		"drlevel": "02",
// 		"hissectionname": "02",
// 		"medicalrecord": "02",
// 		"orderid": "201831389027636137",
// 		"ordmedicalid": "201831389027636140",
// 		"orgid": "0",
// 		"remarks": "02",
// 		"seqno": 0,
// 		"useflag": "1",
// 		"utstamp": "2018-07-12 17:50:27"
// 	},
// 	"buRecipe": {
// 		"ctstamp": "2018-07-12 17:50:27",
// 		"deptcode": "02",
// 		"deptname": "02",
// 		"diagnosecode": "02",
// 		"diagnosename": "02",
// 		"diagnoseno": "02",
// 		"doctorid": "02",
// 		"doctorname": "02",
// 		"doseid": 0,
// 		"dosename": "02",
// 		"drlevel": "02",
// 		"freqid": 0,
// 		"freqname": "02",
// 		"hissectionname": "02",
// 		"medicalrecord": "02",
// 		"orderid": "201831389027636137",
// 		"personid": "02",
// 		"recipedate": "2018-07-12 17:34:36",
// 		"recipeid": "201831389027636139",
// 		"recipeno": "02",
// 		"recipetype": "02",
// 		"registerid": "2",
// 		"remark": "02",
// 		"usageid": 0,
// 		"usagename": "02",
// 		"useflag": "1",
// 		"utstamp": "2018-07-12 17:50:27"
// 	},
// 	"ctstamp": "2018-07-12 17:50:27",
// 	"execDepaid": "0",
// 	"feeall": 0.0,
// 	"ordercontent": "02",
// 	"orderid": "201831389027636137",
// 	"orderno": "02",
// 	"orderstate": "1",
// 	"ordertype": 1,
// 	"orgUserid": "0",
// 	"orgid": "0",
// 	"parientid": "0",
// 	"parientname": "02",
// 	"registerid": "2",
// 	"useflag": "1",
// 	"utstamp": "2018-07-12 17:50:27"
// };
    let openProps = {
      actionType: actionType,
      orderid: orderid,
      reloadList: () => { this.getOrderData() },
      buOrderDtlList: buOrderDtlList,
      syndrome: true
    };
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
            <TableGrid dataSource={dataSource} operate={this.actionManager}/>
          </Content>
          <ActionButton>
            <Checkbox>同步到患者医嘱</Checkbox>
            <SureButton type="primary" onClick={() => {this.props.onStep(3)}}>完成</SureButton>
            <BorderButton type="primary" onClick={() => {this.props.onStep(1)}}>返回上一步</BorderButton>
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
  &&&.ant-input {
    border-bottom: 1px solid rgba(215, 215, 215, 1);
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
