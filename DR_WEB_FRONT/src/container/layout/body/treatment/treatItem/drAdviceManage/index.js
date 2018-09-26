import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Pagination, Tabs } from 'antd';
import getResource from 'commonFunc/ajaxGetResource';
import ScrollArea from 'components/scrollArea';
import AdvicePrint from './advicePrint';
import PreviewPrint from './advicePrint/previewPrint/index.js';
import ChHerbalMedicine from './chHerbalMedicine';
import ChPatentMedicine from './chPatentMedicine';
import SuitTechnology from './suitTechnology';
import Examination from './Examination';
import Inspection from './Inspection';
import WesternMedicine from './WesternMedicine';
import Material from './Material';
import InteligentTreat from './InteligentTreat';
import TableIcon from 'components/dr/icon/icons/table';
import ListIcon from 'components/dr/icon/icons/list';
import Diagnose from './diagnose';
import TableGrid from './tableGrid';
import TableList from './tableList';
import AddHeader from './addHeader';
import dashed from './imgs/dashed.png';
import buttonSty from 'components/antd/style/button';
import MedicalHistoryTwo from "../../../../../rightAssistBar/doctorAdvice/MedicalHistoryTwo.js";
import DoctorAdviceTemplate from "../../../../../rightAssistBar/doctorAdvice/doctorAdviceTemplate.js";
import IntelligentTreat from "../../../../../rightAssistBar/doctorAdvice/intelligentTreat.js";
const TabPane = Tabs.TabPane;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderType: [], // 医嘱类型
      dataSource: [], // 表格数据源
      treatcode: {}, // 挂号编号
      tatalRecords: 0, // 医嘱分页总条数
      currentPage: 1, // 当前页
      actionType: '', // modify、view、add
      orderid: '', // 当前医嘱ID
      showWay: 'table', // 展示形式
      buOrderDtlList: [], // 辨证论治数据
    };
    this.actionManager = this.actionManager.bind(this);
    this.getData = this.getData.bind(this);
    this.submit = this.submit.bind(this);
    this.modelData = this.modelData.bind(this);
  }
  componentWillMount(){
    this.getData();
  }
  componentReceiveProps(){
    this.getData();
  };
  componentDidMount(){
    let herbalData = window.herbalData;
    if(herbalData){
      herbalData = JSON.parse(herbalData);
      herbalData.forEach((item) => {
        item.usageid = item.baUsage ? item.baUsage.usageid : 9; // 从用法对象转换成字符串用法ID
        item.usagename = item.baUsage ? item.baUsage.usagename : '无'; // 从用法对象转换成字符串用法名称
      });
      this.modelData({herbalData: herbalData}, 3);
    }
  };
  /**
   * [getData 获取医嘱列表信息]
   * @param  {Number} [nextPage=1] [下一页默认值1]
   * @return {[type]}              [description]
   */
  getData (nextPage = 1){
    let registerid = window.registerID;
    let params = {
      url: 'BuOrderController/getList',
      data: {
        registerid: window.registerID,
        page: nextPage,
        pageSize: 8
      }
    };
    let that = this;
    function success(res) {
      if(res.result && res.data){
        let dataSource = res.data.records.map((item, index)=>{
          item.key = index; // 加唯一key值
          item.checkState = false ;
          return item
        });
        let tatalRecords = res.data.total;
        let currentPage = nextPage;
        that.setState({dataSource, tatalRecords, currentPage});
      }else{
        that.setState({dataSource: [], tatalRecords: 0});
      }
    };
    getResource(params, success);
  }
  /**
   * [onDelete 删除医嘱信息]
   * @param  {[type]} orderid [医嘱ID]
   * @return {[type]}        [void]
   */
  onDelete (orderid) {
    let params = {
      url: 'BuOrderController/delData',
      type: 'delete',
      data: orderid,
    };
    let that = this;
    function success(res) {
      that.getData();
    };
    getResource(params, success);
  }
  // 打印
  onType (record) {}
  inteligentTreatClick= () =>{
    this.handleInteligenceClick();
  }
  // 中医辨证论治弹框显示
  handleInteligenceClick = () => {
    let params = {
      type: 'GET',
      async : true,
      url: 'BuPatientCaseController/getData',
      contentType: '',
      data:{
        registerid:window.registerID
      }
    };
    let that = this;
    function success(res){
      that.setState({
        treatcode: res.data
      },function(){
        let bu = this.state.treatcode;
        window.bu = bu;
        if(bu != ""){
          this.inteligentTreat.handlePopOpen()
        } else {
          alert('请先保存诊疗')
        }
      })
    };
    function error(res){
        console.log('获取挂号Id失败');
    };
    getResource(params, success, error);
  }
  // 中医辨证论治弹框关闭
  visiblePopInteligence () {
    this.inteligentTreat.handlePopClose()
  }
  //辨证论治组件“添加医嘱”按钮显示中药
  loadClick (buOrderDtlList,type) {
    if (type == 1) {
      this.actionManager('add', {orderid:'', ordertype: 3}, buOrderDtlList)
    } else if (type == 2) {
      this.actionManager('add', {orderid:'', ordertype: 4}, buOrderDtlList)
    } else if (type == 3) {
      this.suitTechnology.handlePopOpen(buOrderDtlList,type)
    }
  }
  // 初始化模板数据打开添加弹框
  modelData(buOrderDtlList, ordertype){
    this.actionManager('add', {orderid:'', ordertype: ordertype}, buOrderDtlList)
  };
  previewClick (printData) {
    this.previewPrint.handlePopOpen(printData)
  }
  /**
   * [actionManager 动作管理函数，添加、删除、修改、查看]
   * @param  {[type]} actionType [动作类型，添加、删除、修改、查看]
   * @param  {[type]} orderid    [携带数据(包含操作目标)]
   * @return {[type]}            [void]
   */
  actionManager(actionType, record, buOrderDtlList = []){
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
          case 6: // 材料
            that.westernMedicine.handlePopOpen();
          break;
          case 7: // 西医治疗
            that.material.handlePopOpen();
          break;
          default:
            console.log('未找到该类型医嘱');
        }
      });
    }
  };
  /**
   * [checkChange 选择复选框事件函数]
   * @param  {[type]} actionType [选择类型，全选、全不选、选中未提交项、选中未打印项]
   * @return {[type]}            [description]
   */
  checkChange(actionType){
    let dataSource = this.state.dataSource;
    switch(actionType){
      case 'all': // 全选
        dataSource.forEach((item) => {
          item.checkState = true;
        });
        break;
      case 'none': // 全不选
        dataSource.forEach((item) => {
          item.checkState = false;
        });
        break;
      case 'uncommitted': // 选中未提交项
        dataSource.forEach((item) => {
          if(item.orderstate == '6'){
            item.checkState = true;
          }
        });
        break;
      case 'noPrint': // 选中未打印项
        dataSource.forEach((item) => {
          if(item.printstate == '02'){
            item.checkState = true;
          }
        });
        break;
    }
    this.setState({ dataSource });
  };
  /** [submit 将未提交的医嘱项提交] */
  submit(){
    let dataSource = this.state.dataSource;
    let checkedOrderID = [];
    dataSource.forEach((item) => {
      if(item.checkState){
        checkedOrderID.push(item.orderid);
      }
    });
    let data = {
      orderidsList: checkedOrderID
    }
    let params = {
      url: 'BuOrderController/submit',
      type: 'put',
      data: JSON.stringify(checkedOrderID)
    };
    let that = this;
    function success(res) {
      if(res.result){
        that.getData();
      }
    };
    getResource(params, success);
  };
  //打印
  handlePrintClick () {
    this.advicePrint.handlePopOpen();
    this.setState({ test: true });
  }
  /** [examinSampleData 检验数据项 1] */
  examinSampleData(){
    return {
    	examineData: [
      { // 医嘱套
      	"baMedicalDtlList": [
        {
      		"aim": "医疗服务目标",
      		"baseUnit": "5",
      		"count": 1,
      		"ctstamp": "2018-07-08 16:06:30",
      		"deptid": 1,
      		"deptname": "内科",
      		"medicalTypeid": 4,
      		"medicalcode": "4",
      		"medicaldesc": "针管",
      		"medicalid": 4,
      		"medicalname": "一次性针管",
      		"medinslevel": "1",
      		"medinsrem": "无",
      		"miType": "1",
      		"orgid": "1",
      		"seqno": 4,
      		"spbody": "",
      		"specification": "规格",
      		"unitprice": 15.5,
      		"useflag": "1",
      		"utstamp": "2018-08-22 14:02:04",
      		"medinslevelDic": "未知的字典",
      		"baseUnitDic": "项"
      	}, {
      		"aim": "医疗服务目标",
      		"baseUnit": "5",
      		"count": 1,
      		"ctstamp": "2018-07-09 15:56:50",
      		"deptid": 1,
      		"deptname": "内科",
      		"medicalTypeid": 1,
      		"medicalcode": "xxb",
      		"medicaldesc": "血小板",
      		"medicalid": 3,
      		"medicalname": "血白细胞测定",
      		"medinslevel": "1",
      		"medinsrem": "无",
      		"miType": "1",
      		"orgid": "1",
      		"seqno": 3,
      		"spbody": "全血",
      		"specification": "规格",
      		"unitprice": 15.5,
      		"useflag": "1",
      		"utstamp": "2018-08-22 14:02:04",
      		"medinslevelDic": "未知的字典",
      		"baseUnitDic": "项"
      	}, {
      		"aim": "医疗服务目标",
      		"baseUnit": "5",
      		"count": 1,
      		"ctstamp": "2018-07-08 16:06:15",
      		"deptid": 1,
      		"deptname": "内科",
      		"medicalTypeid": 1,
      		"medicalcode": "bxb",
      		"medicaldesc": "白细胞",
      		"medicalid": 2,
      		"medicalname": "血小板测定",
      		"medinslevel": "1",
      		"medinsrem": "无",
      		"miType": "1",
      		"orgid": "1",
      		"seqno": 2,
      		"spbody": "全血",
      		"specification": "规格",
      		"unitprice": 15.5,
      		"useflag": "1",
      		"utstamp": "2018-08-22 14:02:04",
      		"medinslevelDic": "未知的字典",
      		"baseUnitDic": "项"
      	}, {
      		"aim": "医疗服务目标",
      		"baseUnit": "5",
      		"count": 1,
      		"ctstamp": "2018-07-08 16:05:54",
      		"deptid": 1,
      		"deptname": "内科",
      		"medicalTypeid": 1,
      		"medicalcode": "hxb",
      		"medicaldesc": "红细胞",
      		"medicalid": 1,
      		"medicalname": "血红蛋白测定",
      		"medinslevel": "1",
      		"medinsrem": "无",
      		"miType": "1",
      		"orgid": "1",
      		"seqno": 1,
      		"spbody": "全血",
      		"specification": "规格",
      		"unitprice": 15.5,
      		"useflag": "1",
      		"utstamp": "2018-08-22 14:02:04",
      		"medinslevelDic": "未知的字典",
      		"baseUnitDic": "项"
      	}
      ],
      	"baseUnit": "5",
      	"count": 1,
      	"ctstamp": "2018-07-09 11:12:24",
      	"depaid": "1",
      	"deptname": "检验科",
      	"execDepaid": "1",
      	"feesum": 50,
      	"islock": "1",
      	"medicaldesc": "医疗服务描述",
      	"medinslevel": "1",
      	"medinsrem": "无",
      	"miType": "0",
      	"orderSuitcode": "xcg",
      	"orderSuitid": 1,
      	"orderSuitname": "血常规",
      	"orgid": "1",
      	"osSortid": "1",
      	"osTypeid": 1,
      	"pinyin": "xuechanggui",
      	"printmode": "0",
      	"seqno": 1,
      	"spbody": "血液",
      	"specification": "规格",
      	"useflag": "1",
      	"utstamp": "2018-08-21 10:55:01",
      	"medinslevelDic": "未知的字典",
      	"baseUnitDic": "项",
      	"key": 12,
      	"status": 2
      },
      { // 非医嘱套
    		aim: "医疗服务目标",
    		baseUnit: "5",
    		baseUnitDic: "项",
    		count: 1,
    		ctstamp: "2018-07-08 16:08:20",
    		deptid: 1,
    		deptname: "内科",
    		key: 0,
    		medicalTypeid: 1,
    		medicalcode: "14",
    		medicaldesc: "胶原",
    		medicalid: 14,
    		medicalname: "胶原测定",
    		medinslevel: "1",
    		medinslevelDic: "未知的字典",
    		medinsrem: "无",
    		miType: "0",
    		orgid: "1",
    		seqno: 14,
    		spbody: "全血",
    		specification: "规格",
    		status: 0,
    		unitprice: 15.5,
    		useflag: "1",
    		utstamp: "2018-08-22 14:02:05"
    	}],
    	aim: 'jiang',
    	miType: '0', // 0 医保内， 1医保外
    	"buDiagnosisList": [{
  				"buDiagnosisDismainfList": [{
  					"ctstamp": "2018-09-22 10:55:46",
  					"diagnosisid": "201837584946816406",
  					"diseaseid": 18,
  					"id": "201837584946816407",
  					"manifcode": "ZBXM10",
  					"manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
  					"manifid": 29,
  					"manifname": "暑湿伤表证",
  					"registerid": "201837493347470156",
  					"useflag": "1",
  					"utstamp": "2018-09-22 10:55:46"
  				}],
  				"cmDiagnosisType": null,
  				"codetype": "",
  				"ctstamp": "2018-09-22 10:55:46",
  				"diacode": "",
  				"diadesc": "",
  				"diagnosisCode": "BNW010",
  				"diagnosisName": "感冒",
  				"diagnosisNo": null,
  				"diagnosisType": null,
  				"diagnosisWay": 1,
  				"diagnosisid": "201837584946816406",
  				"diaid": null,
  				"dianame": "",
  				"discode": "BNW010",
  				"disdesc": "感冒",
  				"diseaseid": 18,
  				"disname": "感冒",
  				"doubtDiaType": "",
  				"mainDiaType": "",
  				"registerid": "201837493347470156",
  				"seqno": 4,
  				"useflag": "1",
  				"utstamp": "2018-09-22 10:55:46",
  				"diagnosisWayDic": "中医"
  			}],
      }
  };
  /** [inspectionSampleData 检查数据项 2] */
  inspectionSampleData(){
    return {
    	inspectionData: [
      { // 非医嘱套
      	"aim": "医疗服务目标",
      	"baseUnit": "5",
      	"count": 1,
      	"ctstamp": "2018-07-27 16:58:25",
      	"deptid": 1,
      	"deptname": "内科",
      	"medicalTypeid": 2,
      	"medicalcode": "26",
      	"medicaldesc": "CT",
      	"medicalid": 26,
      	"medicalname": "CT",
      	"medinslevel": "1",
      	"medinsrem": "无",
      	"miType": "1",
      	"orgid": "1",
      	"seqno": 26,
      	"spbody": "",
      	"specification": "规格",
      	"unitprice": 200,
      	"useflag": "1",
      	"utstamp": "2018-08-22 14:02:05",
      	"medinslevelDic": "未知的字典",
      	"baseUnitDic": "项",
      	"key": 0,
      	"status": 0
      },
      { // 医嘱套
      	"baMedicalDtlList": [{
      		"aim": "医疗服务目标",
      		"baseUnit": "5",
      		"count": 1,
      		"ctstamp": "2018-07-08 16:09:33",
      		"deptid": 1,
      		"deptname": "内科",
      		"medicalTypeid": 2,
      		"medicalcode": "16",
      		"medicaldesc": "成像",
      		"medicalid": 16,
      		"medicalname": "B超",
      		"medinslevel": "1",
      		"medinsrem": "无",
      		"miType": "1",
      		"orgid": "1",
      		"seqno": 16,
      		"spbody": "腹部",
      		"specification": "规格",
      		"unitprice": 15.5,
      		"useflag": "1",
      		"utstamp": "2018-08-22 14:02:05",
      		"medinslevelDic": "未知的字典",
      		"baseUnitDic": "项"
      	}, {
      		"aim": "医疗服务目标",
      		"baseUnit": "5",
      		"count": 1,
      		"ctstamp": "2018-07-08 16:08:26",
      		"deptid": 1,
      		"deptname": "内科",
      		"medicalTypeid": 2,
      		"medicalcode": "15",
      		"medicaldesc": "成像",
      		"medicalid": 15,
      		"medicalname": "彩超",
      		"medinslevel": "1",
      		"medinsrem": "无",
      		"miType": "1",
      		"orgid": "1",
      		"seqno": 15,
      		"spbody": "腹部",
      		"specification": "规格",
      		"unitprice": 15.5,
      		"useflag": "1",
      		"utstamp": "2018-08-22 14:02:05",
      		"medinslevelDic": "未知的字典",
      		"baseUnitDic": "项"
      	}],
      	"baseUnit": "5",
      	"count": 1,
      	"ctstamp": "2018-07-09 11:02:42",
      	"depaid": "1",
      	"deptname": "检验科",
      	"execDepaid": "1",
      	"feesum": 50,
      	"islock": "1",
      	"medicaldesc": "医疗服务描述",
      	"medinslevel": "1",
      	"medinsrem": "无",
      	"miType": "0",
      	"orderSuitcode": "cj",
      	"orderSuitid": 4,
      	"orderSuitname": "产检",
      	"orgid": "1",
      	"osSortid": "2",
      	"osTypeid": 2,
      	"pinyin": "chanjian",
      	"printmode": "0",
      	"seqno": 1,
      	"spbody": "子宫",
      	"specification": "规格",
      	"useflag": "1",
      	"utstamp": "2018-08-21 10:55:01",
      	"medinslevelDic": "未知的字典",
      	"baseUnitDic": "项",
      	"key": 4,
      	"status": 2
      }
    ],
    	aim: 'jiang',
    	miType: '0', // 0 医保内， 1医保外
    	"buDiagnosisList": [{
  				"buDiagnosisDismainfList": [{
  					"ctstamp": "2018-09-22 10:55:46",
  					"diagnosisid": "201837584946816406",
  					"diseaseid": 18,
  					"id": "201837584946816407",
  					"manifcode": "ZBXM10",
  					"manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
  					"manifid": 29,
  					"manifname": "暑湿伤表证",
  					"registerid": "201837493347470156",
  					"useflag": "1",
  					"utstamp": "2018-09-22 10:55:46"
  				}],
  				"cmDiagnosisType": null,
  				"codetype": "",
  				"ctstamp": "2018-09-22 10:55:46",
  				"diacode": "",
  				"diadesc": "",
  				"diagnosisCode": "BNW010",
  				"diagnosisName": "感冒",
  				"diagnosisNo": null,
  				"diagnosisType": null,
  				"diagnosisWay": 1,
  				"diagnosisid": "201837584946816406",
  				"diaid": null,
  				"dianame": "",
  				"discode": "BNW010",
  				"disdesc": "感冒",
  				"diseaseid": 18,
  				"disname": "感冒",
  				"doubtDiaType": "",
  				"mainDiaType": "",
  				"registerid": "201837493347470156",
  				"seqno": 4,
  				"useflag": "1",
  				"utstamp": "2018-09-22 10:55:46",
  				"diagnosisWayDic": "中医"
  			}],
      }
  };
  /** [WestSampleData 西医治疗数据项] 6*/
  WestSampleData(){
    return {
    	WestMedicineData: [
        { // 医嘱套
        	"baMedicalDtlList": [{
        		"aim": "医疗服务目标",
        		"baseUnit": "5",
        		"count": 1,
        		"ctstamp": "2018-07-08 16:06:30",
        		"deptid": 1,
        		"deptname": "内科",
        		"medicalTypeid": 4,
        		"medicalcode": "4",
        		"medicaldesc": "针管",
        		"medicalid": 4,
        		"medicalname": "一次性针管",
        		"medinslevel": "1",
        		"medinsrem": "无",
        		"miType": "1",
        		"orgid": "1",
        		"seqno": 4,
        		"spbody": "",
        		"specification": "规格",
        		"unitprice": 15.5,
        		"useflag": "1",
        		"utstamp": "2018-08-22 14:02:04",
        		"medinslevelDic": "未知的字典",
        		"baseUnitDic": "项"
        	}, {
        		"aim": "医疗服务目标",
        		"baseUnit": "5",
        		"count": 1,
        		"ctstamp": "2018-07-09 15:56:50",
        		"deptid": 1,
        		"deptname": "内科",
        		"medicalTypeid": 1,
        		"medicalcode": "xxb",
        		"medicaldesc": "血小板",
        		"medicalid": 3,
        		"medicalname": "血白细胞测定",
        		"medinslevel": "1",
        		"medinsrem": "无",
        		"miType": "1",
        		"orgid": "1",
        		"seqno": 3,
        		"spbody": "全血",
        		"specification": "规格",
        		"unitprice": 15.5,
        		"useflag": "1",
        		"utstamp": "2018-08-22 14:02:04",
        		"medinslevelDic": "未知的字典",
        		"baseUnitDic": "项"
        	}, {
        		"aim": "医疗服务目标",
        		"baseUnit": "5",
        		"count": 1,
        		"ctstamp": "2018-07-08 16:06:15",
        		"deptid": 1,
        		"deptname": "内科",
        		"medicalTypeid": 1,
        		"medicalcode": "bxb",
        		"medicaldesc": "白细胞",
        		"medicalid": 2,
        		"medicalname": "血小板测定",
        		"medinslevel": "1",
        		"medinsrem": "无",
        		"miType": "1",
        		"orgid": "1",
        		"seqno": 2,
        		"spbody": "全血",
        		"specification": "规格",
        		"unitprice": 15.5,
        		"useflag": "1",
        		"utstamp": "2018-08-22 14:02:04",
        		"medinslevelDic": "未知的字典",
        		"baseUnitDic": "项"
        	}, {
        		"aim": "医疗服务目标",
        		"baseUnit": "5",
        		"count": 1,
        		"ctstamp": "2018-07-08 16:05:54",
        		"deptid": 1,
        		"deptname": "内科",
        		"medicalTypeid": 1,
        		"medicalcode": "hxb",
        		"medicaldesc": "红细胞",
        		"medicalid": 1,
        		"medicalname": "血红蛋白测定",
        		"medinslevel": "1",
        		"medinsrem": "无",
        		"miType": "1",
        		"orgid": "1",
        		"seqno": 1,
        		"spbody": "全血",
        		"specification": "规格",
        		"unitprice": 15.5,
        		"useflag": "1",
        		"utstamp": "2018-08-22 14:02:04",
        		"medinslevelDic": "未知的字典",
        		"baseUnitDic": "项"
        	}],
        	"baseUnit": "5",
        	"count": 1,
        	"ctstamp": "2018-07-09 11:12:24",
        	"depaid": "1",
        	"deptname": "检验科",
        	"execDepaid": "1",
        	"feesum": 50,
        	"islock": "1",
        	"medicaldesc": "医疗服务描述",
        	"medinslevel": "1",
        	"medinsrem": "无",
        	"miType": "0",
        	"orderSuitcode": "xcg",
        	"orderSuitid": 1,
        	"orderSuitname": "血常规",
        	"orgid": "1",
        	"osSortid": "1",
        	"osTypeid": 1,
        	"pinyin": "xuechanggui",
        	"printmode": "0",
        	"seqno": 1,
        	"spbody": "血液",
        	"specification": "规格",
        	"useflag": "1",
        	"utstamp": "2018-08-21 10:55:01",
        	"medinslevelDic": "未知的字典",
        	"baseUnitDic": "项",
        	"key": 0,
        	"status": 2
        }
      ],
      aim: 'jiang',
    	miType: '0', // 0 医保内， 1医保外
    	"buDiagnosisList": [{
  				"buDiagnosisDismainfList": [{
  					"ctstamp": "2018-09-22 10:55:46",
  					"diagnosisid": "201837584946816406",
  					"diseaseid": 18,
  					"id": "201837584946816407",
  					"manifcode": "ZBXM10",
  					"manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
  					"manifid": 29,
  					"manifname": "暑湿伤表证",
  					"registerid": "201837493347470156",
  					"useflag": "1",
  					"utstamp": "2018-09-22 10:55:46"
  				}],
  				"cmDiagnosisType": null,
  				"codetype": "",
  				"ctstamp": "2018-09-22 10:55:46",
  				"diacode": "",
  				"diadesc": "",
  				"diagnosisCode": "BNW010",
  				"diagnosisName": "感冒",
  				"diagnosisNo": null,
  				"diagnosisType": null,
  				"diagnosisWay": 1,
  				"diagnosisid": "201837584946816406",
  				"diaid": null,
  				"dianame": "",
  				"discode": "BNW010",
  				"disdesc": "感冒",
  				"diseaseid": 18,
  				"disname": "感冒",
  				"doubtDiaType": "",
  				"mainDiaType": "",
  				"registerid": "201837493347470156",
  				"seqno": 4,
  				"useflag": "1",
  				"utstamp": "2018-09-22 10:55:46",
  				"diagnosisWayDic": "中医"
  			}],
      }
  };
  /** [materialSampleData 材料数据项] 7*/
  materialSampleData(){
    return {
    	MaterialData: [
        {
        	"baMedicalDtlList": [{
        		"aim": "医疗服务目标",
        		"baseUnit": "5",
        		"count": 1,
        		"ctstamp": "2018-07-08 16:09:33",
        		"deptid": 1,
        		"deptname": "内科",
        		"medicalTypeid": 2,
        		"medicalcode": "16",
        		"medicaldesc": "成像",
        		"medicalid": 16,
        		"medicalname": "B超",
        		"medinslevel": "1",
        		"medinsrem": "无",
        		"miType": "1",
        		"orgid": "1",
        		"seqno": 16,
        		"spbody": "腹部",
        		"specification": "规格",
        		"unitprice": 15.5,
        		"useflag": "1",
        		"utstamp": "2018-08-22 14:02:05",
        		"medinslevelDic": "未知的字典",
        		"baseUnitDic": "项"
        	}, {
        		"aim": "医疗服务目标",
        		"baseUnit": "5",
        		"count": 1,
        		"ctstamp": "2018-07-08 16:08:26",
        		"deptid": 1,
        		"deptname": "内科",
        		"medicalTypeid": 2,
        		"medicalcode": "15",
        		"medicaldesc": "成像",
        		"medicalid": 15,
        		"medicalname": "彩超",
        		"medinslevel": "1",
        		"medinsrem": "无",
        		"miType": "1",
        		"orgid": "1",
        		"seqno": 15,
        		"spbody": "腹部",
        		"specification": "规格",
        		"unitprice": 15.5,
        		"useflag": "1",
        		"utstamp": "2018-08-22 14:02:05",
        		"medinslevelDic": "未知的字典",
        		"baseUnitDic": "项"
        	}],
        	"baseUnit": "5",
        	"count": 1,
        	"ctstamp": "2018-07-09 11:02:43",
        	"depaid": "1",
        	"deptname": "检验科",
        	"execDepaid": "1",
        	"feesum": 50,
        	"islock": "1",
        	"medicaldesc": "医疗服务描述",
        	"medinslevel": "1",
        	"medinsrem": "无",
        	"miType": "0",
        	"orderSuitcode": "nkqj",
        	"orderSuitid": 6,
        	"orderSuitname": "男科全检",
        	"orgid": "1",
        	"osSortid": "2",
        	"osTypeid": 2,
        	"pinyin": "nankequanjian",
        	"printmode": "0",
        	"seqno": 1,
        	"spbody": "内外生殖器",
        	"specification": "规格",
        	"useflag": "1",
        	"utstamp": "2018-08-21 10:55:02",
        	"medinslevelDic": "未知的字典",
        	"baseUnitDic": "项",
        	"key": 0,
        	"status": 0
        }
      ],
      aim: 'jiang',
    	miType: '0', // 0 医保内， 1医保外
    	"buDiagnosisList": [{
  				"buDiagnosisDismainfList": [{
  					"ctstamp": "2018-09-22 10:55:46",
  					"diagnosisid": "201837584946816406",
  					"diseaseid": 18,
  					"id": "201837584946816407",
  					"manifcode": "ZBXM10",
  					"manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
  					"manifid": 29,
  					"manifname": "暑湿伤表证",
  					"registerid": "201837493347470156",
  					"useflag": "1",
  					"utstamp": "2018-09-22 10:55:46"
  				}],
  				"cmDiagnosisType": null,
  				"codetype": "",
  				"ctstamp": "2018-09-22 10:55:46",
  				"diacode": "",
  				"diadesc": "",
  				"diagnosisCode": "BNW010",
  				"diagnosisName": "感冒",
  				"diagnosisNo": null,
  				"diagnosisType": null,
  				"diagnosisWay": 1,
  				"diagnosisid": "201837584946816406",
  				"diaid": null,
  				"dianame": "",
  				"discode": "BNW010",
  				"disdesc": "感冒",
  				"diseaseid": 18,
  				"disname": "感冒",
  				"doubtDiaType": "",
  				"mainDiaType": "",
  				"registerid": "201837493347470156",
  				"seqno": 4,
  				"useflag": "1",
  				"utstamp": "2018-09-22 10:55:46",
  				"diagnosisWayDic": "中医"
  			}],
      }
  };
  /** [herbalSampleData 中药数据项] */
  herbalSampleData(){
    return {
    	herbalData: [
        {
        	"baUsage": {
        		"ctstamp": "2018-07-05 14:52:40",
        		"orgid": "3",
        		"pinyin": "xianjian",
        		"seqno": 1,
        		"usagecode": 3,
        		"usagedesc": "先煎",
        		"usageid": 3,
        		"usagename": "先煎",
        		"useflag": "1",
        		"utstamp": "2018-07-16 17:18:40",
        		"utype": 2
        	},
        	"baseUnit": 1,
        	"ctstamp": "2018-08-28 10:07:45",
        	"defQty": 10,
        	"doseid": 7,
        	"dosename": "",
        	"freqname": "",
        	"hmSortid": 2,
        	"manufacturer": "1",
        	"manuid": "12",
        	"mediUnit": 1,
        	"medicinecode": 1117,
        	"medicineid": "1117",
        	"medicinename": "鸡矢藤",
        	"medinslevel": "01",
        	"medinsrem": "无",
        	"orgid": "1",
        	"otherPinyin": "test",
        	"pinyin": "test",
        	"remarks": "",
        	"seqno": 1,
        	"specialUsageid": 3,
        	"specification": "",
        	"suppid": "1",
        	"supplier": "1",
        	"unitprice": 1123,
        	"useflag": "1",
        	"utstamp": "2018-08-28 10:07:45",
        	"medinslevelDic": "一级",
        	"baseUnitDic": "克",
        	"key": 0,
        	"status": 0,
        	"usageid": 3,
        	"usagename": "先煎",
        	"exist": 1
        }
      ],
      recipename: '处方名称', // 处方名称
      remark: '嘱托', // 嘱托
      treatway: '开水煮', // 治疗方法
      countnum: 3, // 付数
      freq: {key: '1', label: '每日一次'}, // 频次
    	"buDiagnosisList": [{
  				"buDiagnosisDismainfList": [{
  					"ctstamp": "2018-09-22 10:55:46",
  					"diagnosisid": "201837584946816406",
  					"diseaseid": 18,
  					"id": "201837584946816407",
  					"manifcode": "ZBXM10",
  					"manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
  					"manifid": 29,
  					"manifname": "暑湿伤表证",
  					"registerid": "201837493347470156",
  					"useflag": "1",
  					"utstamp": "2018-09-22 10:55:46"
  				}],
  				"cmDiagnosisType": null,
  				"codetype": "",
  				"ctstamp": "2018-09-22 10:55:46",
  				"diacode": "",
  				"diadesc": "",
  				"diagnosisCode": "BNW010",
  				"diagnosisName": "感冒",
  				"diagnosisNo": null,
  				"diagnosisType": null,
  				"diagnosisWay": 1,
  				"diagnosisid": "201837584946816406",
  				"diaid": null,
  				"dianame": "",
  				"discode": "BNW010",
  				"disdesc": "感冒",
  				"diseaseid": 18,
  				"disname": "感冒",
  				"doubtDiaType": "",
  				"mainDiaType": "",
  				"registerid": "201837493347470156",
  				"seqno": 4,
  				"useflag": "1",
  				"utstamp": "2018-09-22 10:55:46",
  				"diagnosisWayDic": "中医"
  			}],
      }
  };
  render() {
    let { dataSource, tatalRecords, currentPage, actionType, orderid, buOrderDtlList , showWay } = this.state;
    let that = this;
    let selectedRows = dataSource.filter((item) => item.checkState);
    let pagination = {
      simple: true,
      total: tatalRecords, // 总的记录数
      defaultCurrent: currentPage, // 当前页
      current: currentPage, // 当前页
      pageSize: 8, // 每页记录数
      itemRender: (current, type, originalElement)=>{
        if (type === 'prev') {
          return <a>上页</a>;
        } if (type === 'next') {
          return <a>下页</a>;
        }if(type == 'page'){
          return <a className='test'>{current}</a>
        }
        return originalElement;
      },
      onChange:(nextPage, pageSize) => {
        that.getData(nextPage);
      },
    };
    let openProps = {
      actionType: actionType,
      orderid: orderid,
      reloadList: this.getData,
      buOrderDtlList: buOrderDtlList,
      selectedRows: selectedRows
    };
    return (
      <div>
        <List>
          <SpecScrollArea height={160}>
            <AddHeader operate={this.actionManager}></AddHeader>
            <DataShow>
              <Header>
                <Toggle>
                  <SpecTableIcon showWay={showWay} onClick={() => {this.setState({ showWay: 'table'})}}/>
                  <SpecListIcon showWay={showWay} onClick={() => {this.setState({ showWay: 'list'})}}/>
                </Toggle>
                <Diagnose />
                <AddRight>
                  <AutoTreat onClick={this.modelData}>👁辨证论治</AutoTreat>
                </AddRight>
              </Header>
              {
                showWay == 'list' ?
                <TableList dataSource={dataSource} operate={this.actionManager}/>
                :
                <TableGrid dataSource={dataSource} operate={this.actionManager}/>
              }
            </DataShow>
            <Fill showWay={showWay}></Fill>
            <Examination {...openProps} ref={ref => this.examination = ref} />
            <ChHerbalMedicine {...openProps} ref={ref => {this.chHerbalMedicine = ref}} />
            <AdvicePrint {...openProps} previewClick={this.previewClick.bind(this)} ref={ref => {this.advicePrint = ref}} />
            <PreviewPrint {...openProps} ref={ref => {this.previewPrint = ref}} />
            <ChPatentMedicine {...openProps} ref={ref => {this.chPatentMedicine = ref}} />
            <SuitTechnology {...openProps} ref={ref => {this.suitTechnology = ref}} />
            <Inspection {...openProps} ref={ref => this.inspection = ref} />
            <WesternMedicine {...openProps} ref={ref => this.westernMedicine = ref} />
            <Material {...openProps} ref={ref => this.material = ref} />
            {
              // <ChHerbalMedicineInteligentTreat wrappedComponentRef={ref => {this.chHerbalMedicineInteligentTreat = ref}} reloadList = {this.getData} />
            }
            <InteligentTreat loadClick={this.loadClick.bind(this)} visiblePopInteligence={this.visiblePopInteligence} ref={ref => this.inteligentTreat = ref} reloadList = {this.getData} />
          </SpecScrollArea>
          <Footer>
            <CheckAction>
              <CheckAll onClick={() => {this.checkChange('all')}}>全选</CheckAll>
              <CheckNone onClick={() => {this.checkChange('none')}}>全不选</CheckNone>
              <CheckUncommitted onClick={() => {this.checkChange('uncommitted')}}>选中未提交项</CheckUncommitted>
              <CheckNoPrint onClick={() => {this.checkChange('noPrint')}}>选中未打印项</CheckNoPrint>
              <SimplePagination {...pagination}></SimplePagination>
            </CheckAction>
            <div>
              <SureButton type="primary" onClick={this.submit} disabled={!window.modifyPermission}>提交</SureButton>
              <BorderButton type="primary" onClick={() => {this.handlePrintClick()}}>打印</BorderButton>
              <BorderButton type="primary">另存成模板</BorderButton>
            </div>
          </Footer>
        </List>
        <Modal>
          <SpecTabs key='1' defaultActiveKey='1' animated={false}>
            <TabPane tab="智能论治" key="1">
              <IntelligentTreat/>
            </TabPane>
            <TabPane tab="历史模板" key="2">
              <MedicalHistoryTwo/>
            </TabPane>
            <TabPane tab="医嘱模板" key="3">
              <DoctorAdviceTemplate/>
            </TabPane>
          </SpecTabs>
        </Modal>
      </div>

    )
  }
}
const SpecScrollArea = styled(ScrollArea)`
  display: flex;
  flex-direction: column;
`;
const List = styled.div`
  width: 70%;
  float: left;
`;
const Modal = styled.div`
  border: 1px solid rgba(204, 204, 204, 1);
  width: 410px;
  position:absolute;
  right:0px;
  top:0px;
`;
const AddRight = styled.div`
  float: right;
  font-size: 12px;
`;
const AutoTreat = styled.p`
  float: left;
  color: #FF0000;
  cursor: pointer
`;
const DataShow = styled.div`
  padding: 13px;
  padding-bottom: 0px;
  border-top: 1px solid #E1E1E1;
`;
const SpecTabs = styled(Tabs)`
  .ant-tabs-nav-container {
    font-size: 13px;
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
  }
  &&& .ant-tabs-content {
    border-top: 1px solid #C9C9C9;
    background-color: #F2F2F2;
    padding: 0px;
  }
`;
const Fill = styled.div`
  margin: 13px;
  margin-top: 0px;
  background-image: url(${props => props.showWay == 'list' ? dashed : 'none'});
  flex-grow: 1;
`;
const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;
const Toggle = styled.div`
  border-right: 1px solid #999999;
  height: fit-content;
  z-index: 2px;
  margin-right: 10px;
`;
const SpecTableIcon = styled(TableIcon)`
  background: ${props => props.showWay == 'table' ? 'rgba(10, 110, 203, 1)' : '#999999'};
`;
const SpecListIcon = styled(ListIcon)`
  > div{
    background-color: ${props => props.showWay == 'list' ? 'rgba(10, 110, 203, 1)' : '#999999'};
  }
  border-color: ${props => props.showWay == 'list' ? 'rgba(10, 110, 203, 1)' : '#999999'};
  margin:0px 10px;
`;
const BorderButton = styled(Button)`
  ${buttonSty.white}
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const CheckAction = styled.div`
  color: #0A6ECB;
  font-size: 12px;
  display: flex;
`;
const CheckAll = styled.span`
  cursor: pointer;
`;
const CheckNone = styled.span`
  cursor: pointer;
  padding: 0px 11px;
  border-right: 1px solid #797979;
`;
const CheckUncommitted = styled.span`
  cursor: pointer;
  padding: 0px 11px;
`;
const CheckNoPrint = styled.span`
  padding-right: 11px;
  margin-right: 11px;
  cursor: pointer;
  border-right: 1px solid #797979;
`;
const SimplePagination = styled(Pagination)`
  &&& {
    margin-left: 30px;
    margin-top: -3px;
  }
  .ant-pagination-prev a, .ant-pagination-next a, .ant-pagination-simple-pager {
    color: #0A6ECB;
    font-size: 12px;
  }
  &&& .ant-pagination-simple-pager > input{
    border: none;
    background-color: transparent;
    padding: 0px;
    margin-right: 0px;
    text-align: right;
    width: 30px;
  }
  &&& .ant-pagination-simple-pager {
    height: 22px;
    margin-left: 30px;
  }
  &&& .ant-pagination-simple-pager > .ant-pagination-slash{
    margin: 0px;
    color: #0A6ECB;
  }
  &&& .ant-pagination-next {
    margin-left: -90px;
    color: #0A6ECB;
  }
  &&& .ant-pagination-prev {
    margin-left: -40px;
  }
`;
const Footer = styled.div`
  border-top: 1px solid #85B7E5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
/*
@作者：马晓敏
@日期：2018-06-26
@描述：医嘱管理页面
*/
