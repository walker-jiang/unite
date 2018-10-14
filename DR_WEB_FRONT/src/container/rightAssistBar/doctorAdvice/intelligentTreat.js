/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs,   } from 'antd';
import AppropriateTechnology from './content/appropriateTechnology.js';
import ChineseMedicine from './content/chineseMedicine.js';
import Prescription from './content/prescription.js';
import Consilia from './content/consilia.js';
import getResource from 'commonFunc/ajaxGetResource';
import './style/doctorAdvice.less';
const TabPane = Tabs.TabPane;
import doctorAdviceService from '../service/doctorAdviceService.js';

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 1,
      bu:{}
    };
  };
  componentWillMount(){
    this.queryBu();//获取诊疗信息------辩证论证入参
  }
  ages = (str) => {
    console.log("str===",str);
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(r==null)return false;
    var d=new Date(r[1],r[3]-1,r[4]);
    if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){
      var Y = new Date().getFullYear();
      return (Y-r[1]);
    }
    return 0;//"输入的日期格式错误！"
  }
  queryBu = () =>{
    let params = {
      type: 'GET',
      async : true,
      url: 'BuPatientCaseController/getData',
      contentType: '',
      data:{
        registerid:window.registerID
      }
    };
    let self = this;
    function success(res){
      console.log('获取挂号信息成功',res);
      self.setState({
        //bu: res.data
        bu:JSON.stringify({
        	"allergichistory": "青霉素过敏；",
        	"billid": "201836311344430101",
        	"breath": 1,
        	"buDiagnosisInfo": {
        		"buDiagnosisList": [{
        			"buDiagnosisDismainfList": [],
        			"cmDiagnosisType": null,
        			"codetype": "",
        			"ctstamp": "2018-09-11 17:42:31",
        			"diacode": "",
        			"diadesc": "",
        			"diagnosisCode": "BNW010",
        			"diagnosisName": "痛经",
        			"diagnosisNo": null,
        			"diagnosisType": null,
        			"diagnosisWay": 1,
        			"diagnosisid": "201836658951267153",
        			"diaid": null,
        			"dianame": "",
        			"discode": "BNW010",
        			"disdesc": "痛经",
        			"diseaseid": 18,
        			"disname": "痛经",
        			"doubtDiaType": "",
        			"mainDiaType": "",
        			"registerid": "201832424728142114",
        			"seqno": 4,
        			"useflag": "1",
        			"utstamp": "2018-09-11 17:42:31",
        			"diagnosisWayDic": "中医"
        		}, {
        			"buDiagnosisDismainfList": [],
        			"cmDiagnosisType": null,
        			"codetype": "",
        			"ctstamp": "2018-09-11 17:42:31",
        			"diacode": "",
        			"diadesc": "",
        			"diagnosisCode": "BNW010",
        			"diagnosisName": "痛经",
        			"diagnosisNo": null,
        			"diagnosisType": null,
        			"diagnosisWay": 1,
        			"diagnosisid": "201836658951268154",
        			"diaid": null,
        			"dianame": "",
        			"discode": "BNW010",
        			"disdesc": "痛经",
        			"diseaseid": 18,
        			"disname": "痛经",
        			"doubtDiaType": "",
        			"mainDiaType": "",
        			"registerid": "201832424728142114",
        			"seqno": 4,
        			"useflag": "1",
        			"utstamp": "2018-09-11 17:42:31",
        			"diagnosisWayDic": "中医"
        		}, {
        			"buDiagnosisDismainfList": [],
        			"cmDiagnosisType": null,
        			"codetype": "",
        			"ctstamp": "2018-09-11 17:42:31",
        			"diacode": "",
        			"diadesc": "",
        			"diagnosisCode": "BNW010",
        			"diagnosisName": "痛经",
        			"diagnosisNo": null,
        			"diagnosisType": null,
        			"diagnosisWay": 1,
        			"diagnosisid": "201836658951268155",
        			"diaid": null,
        			"dianame": "",
        			"discode": "BNW010",
        			"disdesc": "痛经",
        			"diseaseid": 18,
        			"disname": "痛经",
        			"doubtDiaType": "",
        			"mainDiaType": "",
        			"registerid": "201832424728142114",
        			"seqno": 4,
        			"useflag": "1",
        			"utstamp": "2018-09-11 17:42:31",
        			"diagnosisWayDic": "中医"
        		}, {
        			"buDiagnosisDismainfList": [],
        			"cmDiagnosisType": null,
        			"codetype": "",
        			"ctstamp": "2018-09-11 17:42:31",
        			"diacode": "",
        			"diadesc": "",
        			"diagnosisCode": "BNW010",
        			"diagnosisName": "胃痛",
        			"diagnosisNo": null,
        			"diagnosisType": null,
        			"diagnosisWay": 1,
        			"diagnosisid": "201836658951268156",
        			"diaid": null,
        			"dianame": "",
        			"discode": "BNW010",
        			"disdesc": "胃痛",
        			"diseaseid": 18,
        			"disname": "胃痛",
        			"doubtDiaType": "",
        			"mainDiaType": "",
        			"registerid": "201832424728142114",
        			"seqno": 4,
        			"useflag": "1",
        			"utstamp": "2018-09-11 17:42:31",
        			"diagnosisWayDic": "中医"
        		}, {
        			"buDiagnosisDismainfList": [],
        			"cmDiagnosisType": null,
        			"codetype": "",
        			"ctstamp": "2018-09-11 17:42:31",
        			"diacode": "",
        			"diadesc": "",
        			"diagnosisCode": "BNW010",
        			"diagnosisName": "中暑",
        			"diagnosisNo": null,
        			"diagnosisType": null,
        			"diagnosisWay": 1,
        			"diagnosisid": "201836658951268157",
        			"diaid": null,
        			"dianame": "",
        			"discode": "BNW010",
        			"disdesc": "中暑",
        			"diseaseid": 18,
        			"disname": "中暑",
        			"doubtDiaType": "",
        			"mainDiaType": "",
        			"registerid": "201832424728142114",
        			"seqno": 4,
        			"useflag": "1",
        			"utstamp": "2018-09-11 17:42:31",
        			"diagnosisWayDic": "中医"
        		}, {
        			"buDiagnosisDismainfList": [],
        			"cmDiagnosisType": null,
        			"codetype": "",
        			"ctstamp": "2018-09-11 17:42:31",
        			"diacode": "",
        			"diadesc": "",
        			"diagnosisCode": "BNW010",
        			"diagnosisName": "痤疮",
        			"diagnosisNo": null,
        			"diagnosisType": null,
        			"diagnosisWay": 1,
        			"diagnosisid": "201836658951268158",
        			"diaid": null,
        			"dianame": "",
        			"discode": "BNW010",
        			"disdesc": "痤疮",
        			"diseaseid": 18,
        			"disname": "痤疮",
        			"doubtDiaType": "",
        			"mainDiaType": "",
        			"registerid": "201832424728142114",
        			"seqno": 4,
        			"useflag": "1",
        			"utstamp": "2018-09-11 17:42:31",
        			"diagnosisWayDic": "中医"
        		}, {
        			"buDiagnosisDismainfList": [{
        				"ctstamp": "2018-09-11 17:42:31",
        				"diagnosisid": "201836658951268160",
        				"diseaseid": 18,
        				"id": "201836658951268161",
        				"manifcode": "ZBXM10",
        				"manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
        				"manifid": 29,
        				"manifname": "暑湿伤表证",
        				"registerid": "201832424728142114",
        				"useflag": "1",
        				"utstamp": "2018-09-11 17:42:31"
        			}],
        			"cmDiagnosisType": null,
        			"codetype": "",
        			"ctstamp": "2018-09-11 17:42:31",
        			"diacode": "",
        			"diadesc": "",
        			"diagnosisCode": "BNW010",
        			"diagnosisName": "感冒",
        			"diagnosisNo": null,
        			"diagnosisType": null,
        			"diagnosisWay": 1,
        			"diagnosisid": "201836658951268160",
        			"diaid": null,
        			"dianame": "",
        			"discode": "BNW010",
        			"disdesc": "感冒",
        			"diseaseid": 18,
        			"disname": "感冒",
        			"doubtDiaType": "",
        			"mainDiaType": "",
        			"registerid": "201832424728142114",
        			"seqno": 4,
        			"useflag": "1",
        			"utstamp": "2018-09-11 17:42:31",
        			"diagnosisWayDic": "中医"
        		}, {
        			"buDiagnosisDismainfList": [{
        				"ctstamp": "2018-09-11 17:42:31",
        				"diagnosisid": "201836658951268162",
        				"diseaseid": 16,
        				"id": "201836658951268163",
        				"manifcode": "ZLTH11",
        				"manifdesc": "心悸，自汗，神倦嗜卧，心胸憋闷疼痛，形寒肢冷，面色苍白",
        				"manifid": 33,
        				"manifname": "心阳虚证",
        				"registerid": "201832424728142114",
        				"useflag": "1",
        				"utstamp": "2018-09-11 17:42:31"
        			}],
        			"cmDiagnosisType": null,
        			"codetype": "",
        			"ctstamp": "2018-09-11 17:42:31",
        			"diacode": "",
        			"diadesc": "",
        			"diagnosisCode": "BNV020",
        			"diagnosisName": "虚劳",
        			"diagnosisNo": null,
        			"diagnosisType": null,
        			"diagnosisWay": 1,
        			"diagnosisid": "201836658951268162",
        			"diaid": null,
        			"dianame": "",
        			"discode": "BNV020",
        			"disdesc": "虚劳",
        			"diseaseid": 16,
        			"disname": "虚劳",
        			"doubtDiaType": "",
        			"mainDiaType": "",
        			"registerid": "201832424728142114",
        			"seqno": 3,
        			"useflag": "1",
        			"utstamp": "2018-09-11 17:42:31",
        			"diagnosisWayDic": "中医"
        		}, {
        			"buDiagnosisDismainfList": [{
        				"ctstamp": "2018-09-11 17:42:31",
        				"diagnosisid": "201836658951268164",
        				"diseaseid": 5,
        				"id": "201836658951268165",
        				"manifcode": "ZBFH52",
        				"manifdesc": "口渴多饮，口舌干燥，尿频量多，烦热多汗，舌边尖红，苔薄黄，脉洪数",
        				"manifid": 21,
        				"manifname": "肺热津伤证",
        				"registerid": "201832424728142114",
        				"useflag": "1",
        				"utstamp": "2018-09-11 17:42:31"
        			}],
        			"cmDiagnosisType": null,
        			"codetype": "",
        			"ctstamp": "2018-09-11 17:42:31",
        			"diacode": "",
        			"diadesc": "",
        			"diagnosisCode": "BNV060",
        			"diagnosisName": "消渴",
        			"diagnosisNo": null,
        			"diagnosisType": null,
        			"diagnosisWay": 1,
        			"diagnosisid": "201836658951268164",
        			"diaid": null,
        			"dianame": "",
        			"discode": "BNV060",
        			"disdesc": "消渴",
        			"diseaseid": 5,
        			"disname": "消渴",
        			"doubtDiaType": "",
        			"mainDiaType": "",
        			"registerid": "201832424728142114",
        			"seqno": 2,
        			"useflag": "1",
        			"utstamp": "2018-09-11 17:42:31",
        			"diagnosisWayDic": "中医"
        		}],
        		"cardno": "220652199801020016",
        		"ctstamp": "2018-09-11 14:53:12",
        		"deptid": 1,
        		"diagnosisDesc": "诊断描述",
        		"doctorid": "1",
        		"doctorname": "",
        		"id": "201834407742964422",
        		"orgid": "10000",
        		"patientid": "201832424728142113",
        		"patientname": "姜鹏",
        		"patientno": "test",
        		"registerid": "201832424728142114",
        		"registerno": "12312",
        		"useflag": "1",
        		"utstamp": "2018-09-11 17:42:31"
        	},
        	"buTargetChooseList": [],
        	"casetype": "1",
        	"chfingerprint": "",
        	"ctstamp": null,
        	"deptid": 1,
        	"diastolicPressure": null,
        	"doctorid": "1",
        	"doctorname": "李四",
        	"familyhistory": "高血压；",
        	"heightnum": 1,
        	"hpi": "脂肪肝、胃溃疡；",
        	"inspection": "舌苔（胖大、体胖有齿痕、瘦小）",
        	"moHistory": "终止妊娠；",
        	"orgid": "10000",
        	"palpation": "左脉象（沉）；右脉象（滑）",
        	"pasthistory": "胰腺引流手术；",
        	"personhistory": "胃穿孔手术；",
        	"pridepict": "四肢无力、恶心、腹泻(持续时间：1天)；咳嗽、有痰、呼吸困难(持续时间：2天)；",
        	"psycheck": "123",
        	"pulse": 1,
        	"registerid": "201832424728142114",
        	"smelling": "web123",
        	"suggession": "1321",
        	"syndrome": "辨证要点3；",
        	"systolicPressure": 1,
        	"temperature": 1,
        	"treatprinciple": "简接补泻；",
        	"treatway": "",
        	"useflag": "1",
        	"utstamp": "2018-09-11 17:42:31",
        	"weightnum": 1
        })
      },()=>{
        self.searchList(self.state.bu);
      })
    };
    function error(res){
        console.log('获取挂号信息失败');
    };
    getResource(params, success, error);
  }
  searchList = (bu) =>{
    var self = this;
    //var params = bu;
    //this.state.bu
    let params = {
      bu:JSON.stringify({
        "allergichistory": "青霉素过敏；",
        "billid": "201836311344430101",
        "breath": 1,
        "buDiagnosisInfo": {
          "buDiagnosisList": [{
            "buDiagnosisDismainfList": [],
            "cmDiagnosisType": null,
            "codetype": "",
            "ctstamp": "2018-09-11 17:42:31",
            "diacode": "",
            "diadesc": "",
            "diagnosisCode": "BNW010",
            "diagnosisName": "痛经",
            "diagnosisNo": null,
            "diagnosisType": null,
            "diagnosisWay": 1,
            "diagnosisid": "201836658951267153",
            "diaid": null,
            "dianame": "",
            "discode": "BNW010",
            "disdesc": "痛经",
            "diseaseid": 18,
            "disname": "痛经",
            "doubtDiaType": "",
            "mainDiaType": "",
            "registerid": "201832424728142114",
            "seqno": 4,
            "useflag": "1",
            "utstamp": "2018-09-11 17:42:31",
            "diagnosisWayDic": "中医"
          }, {
            "buDiagnosisDismainfList": [],
            "cmDiagnosisType": null,
            "codetype": "",
            "ctstamp": "2018-09-11 17:42:31",
            "diacode": "",
            "diadesc": "",
            "diagnosisCode": "BNW010",
            "diagnosisName": "痛经",
            "diagnosisNo": null,
            "diagnosisType": null,
            "diagnosisWay": 1,
            "diagnosisid": "201836658951268154",
            "diaid": null,
            "dianame": "",
            "discode": "BNW010",
            "disdesc": "痛经",
            "diseaseid": 18,
            "disname": "痛经",
            "doubtDiaType": "",
            "mainDiaType": "",
            "registerid": "201832424728142114",
            "seqno": 4,
            "useflag": "1",
            "utstamp": "2018-09-11 17:42:31",
            "diagnosisWayDic": "中医"
          }, {
            "buDiagnosisDismainfList": [],
            "cmDiagnosisType": null,
            "codetype": "",
            "ctstamp": "2018-09-11 17:42:31",
            "diacode": "",
            "diadesc": "",
            "diagnosisCode": "BNW010",
            "diagnosisName": "痛经",
            "diagnosisNo": null,
            "diagnosisType": null,
            "diagnosisWay": 1,
            "diagnosisid": "201836658951268155",
            "diaid": null,
            "dianame": "",
            "discode": "BNW010",
            "disdesc": "痛经",
            "diseaseid": 18,
            "disname": "痛经",
            "doubtDiaType": "",
            "mainDiaType": "",
            "registerid": "201832424728142114",
            "seqno": 4,
            "useflag": "1",
            "utstamp": "2018-09-11 17:42:31",
            "diagnosisWayDic": "中医"
          }, {
            "buDiagnosisDismainfList": [],
            "cmDiagnosisType": null,
            "codetype": "",
            "ctstamp": "2018-09-11 17:42:31",
            "diacode": "",
            "diadesc": "",
            "diagnosisCode": "BNW010",
            "diagnosisName": "胃痛",
            "diagnosisNo": null,
            "diagnosisType": null,
            "diagnosisWay": 1,
            "diagnosisid": "201836658951268156",
            "diaid": null,
            "dianame": "",
            "discode": "BNW010",
            "disdesc": "胃痛",
            "diseaseid": 18,
            "disname": "胃痛",
            "doubtDiaType": "",
            "mainDiaType": "",
            "registerid": "201832424728142114",
            "seqno": 4,
            "useflag": "1",
            "utstamp": "2018-09-11 17:42:31",
            "diagnosisWayDic": "中医"
          }, {
            "buDiagnosisDismainfList": [],
            "cmDiagnosisType": null,
            "codetype": "",
            "ctstamp": "2018-09-11 17:42:31",
            "diacode": "",
            "diadesc": "",
            "diagnosisCode": "BNW010",
            "diagnosisName": "中暑",
            "diagnosisNo": null,
            "diagnosisType": null,
            "diagnosisWay": 1,
            "diagnosisid": "201836658951268157",
            "diaid": null,
            "dianame": "",
            "discode": "BNW010",
            "disdesc": "中暑",
            "diseaseid": 18,
            "disname": "中暑",
            "doubtDiaType": "",
            "mainDiaType": "",
            "registerid": "201832424728142114",
            "seqno": 4,
            "useflag": "1",
            "utstamp": "2018-09-11 17:42:31",
            "diagnosisWayDic": "中医"
          }, {
            "buDiagnosisDismainfList": [],
            "cmDiagnosisType": null,
            "codetype": "",
            "ctstamp": "2018-09-11 17:42:31",
            "diacode": "",
            "diadesc": "",
            "diagnosisCode": "BNW010",
            "diagnosisName": "痤疮",
            "diagnosisNo": null,
            "diagnosisType": null,
            "diagnosisWay": 1,
            "diagnosisid": "201836658951268158",
            "diaid": null,
            "dianame": "",
            "discode": "BNW010",
            "disdesc": "痤疮",
            "diseaseid": 18,
            "disname": "痤疮",
            "doubtDiaType": "",
            "mainDiaType": "",
            "registerid": "201832424728142114",
            "seqno": 4,
            "useflag": "1",
            "utstamp": "2018-09-11 17:42:31",
            "diagnosisWayDic": "中医"
          }, {
            "buDiagnosisDismainfList": [{
              "ctstamp": "2018-09-11 17:42:31",
              "diagnosisid": "201836658951268160",
              "diseaseid": 18,
              "id": "201836658951268161",
              "manifcode": "ZBXM10",
              "manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
              "manifid": 29,
              "manifname": "暑湿伤表证",
              "registerid": "201832424728142114",
              "useflag": "1",
              "utstamp": "2018-09-11 17:42:31"
            }],
            "cmDiagnosisType": null,
            "codetype": "",
            "ctstamp": "2018-09-11 17:42:31",
            "diacode": "",
            "diadesc": "",
            "diagnosisCode": "BNW010",
            "diagnosisName": "感冒",
            "diagnosisNo": null,
            "diagnosisType": null,
            "diagnosisWay": 1,
            "diagnosisid": "201836658951268160",
            "diaid": null,
            "dianame": "",
            "discode": "BNW010",
            "disdesc": "感冒",
            "diseaseid": 18,
            "disname": "感冒",
            "doubtDiaType": "",
            "mainDiaType": "",
            "registerid": "201832424728142114",
            "seqno": 4,
            "useflag": "1",
            "utstamp": "2018-09-11 17:42:31",
            "diagnosisWayDic": "中医"
          }, {
            "buDiagnosisDismainfList": [{
              "ctstamp": "2018-09-11 17:42:31",
              "diagnosisid": "201836658951268162",
              "diseaseid": 16,
              "id": "201836658951268163",
              "manifcode": "ZLTH11",
              "manifdesc": "心悸，自汗，神倦嗜卧，心胸憋闷疼痛，形寒肢冷，面色苍白",
              "manifid": 33,
              "manifname": "心阳虚证",
              "registerid": "201832424728142114",
              "useflag": "1",
              "utstamp": "2018-09-11 17:42:31"
            }],
            "cmDiagnosisType": null,
            "codetype": "",
            "ctstamp": "2018-09-11 17:42:31",
            "diacode": "",
            "diadesc": "",
            "diagnosisCode": "BNV020",
            "diagnosisName": "虚劳",
            "diagnosisNo": null,
            "diagnosisType": null,
            "diagnosisWay": 1,
            "diagnosisid": "201836658951268162",
            "diaid": null,
            "dianame": "",
            "discode": "BNV020",
            "disdesc": "虚劳",
            "diseaseid": 16,
            "disname": "虚劳",
            "doubtDiaType": "",
            "mainDiaType": "",
            "registerid": "201832424728142114",
            "seqno": 3,
            "useflag": "1",
            "utstamp": "2018-09-11 17:42:31",
            "diagnosisWayDic": "中医"
          }, {
            "buDiagnosisDismainfList": [{
              "ctstamp": "2018-09-11 17:42:31",
              "diagnosisid": "201836658951268164",
              "diseaseid": 5,
              "id": "201836658951268165",
              "manifcode": "ZBFH52",
              "manifdesc": "口渴多饮，口舌干燥，尿频量多，烦热多汗，舌边尖红，苔薄黄，脉洪数",
              "manifid": 21,
              "manifname": "肺热津伤证",
              "registerid": "201832424728142114",
              "useflag": "1",
              "utstamp": "2018-09-11 17:42:31"
            }],
            "cmDiagnosisType": null,
            "codetype": "",
            "ctstamp": "2018-09-11 17:42:31",
            "diacode": "",
            "diadesc": "",
            "diagnosisCode": "BNV060",
            "diagnosisName": "消渴",
            "diagnosisNo": null,
            "diagnosisType": null,
            "diagnosisWay": 1,
            "diagnosisid": "201836658951268164",
            "diaid": null,
            "dianame": "",
            "discode": "BNV060",
            "disdesc": "消渴",
            "diseaseid": 5,
            "disname": "消渴",
            "doubtDiaType": "",
            "mainDiaType": "",
            "registerid": "201832424728142114",
            "seqno": 2,
            "useflag": "1",
            "utstamp": "2018-09-11 17:42:31",
            "diagnosisWayDic": "中医"
          }],
          "cardno": "220652199801020016",
          "ctstamp": "2018-09-11 14:53:12",
          "deptid": 1,
          "diagnosisDesc": "诊断描述",
          "doctorid": "1",
          "doctorname": "",
          "id": "201834407742964422",
          "orgid": "10000",
          "patientid": "201832424728142113",
          "patientname": "姜鹏",
          "patientno": "test",
          "registerid": "201832424728142114",
          "registerno": "12312",
          "useflag": "1",
          "utstamp": "2018-09-11 17:42:31"
        },
        "buTargetChooseList": [],
        "casetype": "1",
        "chfingerprint": "",
        "ctstamp": null,
        "deptid": 1,
        "diastolicPressure": null,
        "doctorid": "1",
        "doctorname": "李四",
        "familyhistory": "高血压；",
        "heightnum": 1,
        "hpi": "脂肪肝、胃溃疡；",
        "inspection": "舌苔（胖大、体胖有齿痕、瘦小）",
        "moHistory": "终止妊娠；",
        "orgid": "10000",
        "palpation": "左脉象（沉）；右脉象（滑）",
        "pasthistory": "胰腺引流手术；",
        "personhistory": "胃穿孔手术；",
        "pridepict": "四肢无力、恶心、腹泻(持续时间：1天)；咳嗽、有痰、呼吸困难(持续时间：2天)；",
        "psycheck": "123",
        "pulse": 1,
        "registerid": "201832424728142114",
        "smelling": "web123",
        "suggession": "1321",
        "syndrome": "辨证要点3；",
        "systolicPressure": 1,
        "temperature": 1,
        "treatprinciple": "简接补泻；",
        "treatway": "",
        "useflag": "1",
        "utstamp": "2018-09-11 17:42:31",
        "weightnum": 1
      }),
      sex:window.sex,
      age:self.ages(window.birthday.substr(0,10)).toString(),
      pageSize:"10",//分页长度
      cmdrugPage:"1",//处方页数
      cpmPage:"1",//中成药页数
      stPage:"1",//适宜技术页数
      mcPage:"1",//适宜技术页数
    };
    function callBack(res){
      if(res.flag == 1){
        console.log("获取辨证论治成功==============",res);
        self.setState({ dataSource:res.data });
      }else{
        console.log('获取辨证论治异常响应信息', res);
      }
    };
    doctorAdviceService.ImtreatprelistGetList(params, callBack);
  }
  callback(key) {
    console.log(key);
  }
  /**
   * 左右联动（和书写诊疗单）
   * @method changeInitData
   * @param  {[type]}       item [表单内容]
   * 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
   */
  changeInitData = (item) =>{
    console.log("左右联动=============",item);
    //数据组装
    var buDiagnosisInfo = item.buDiagnosisInfo;
    buDiagnosisInfo['buDiagnosisDismainfList'] = buDiagnosisInfo.buDiagnosisList;
    if(item.buRecipe != null){
      var recipename = item.buRecipe.recipename;
    }
    var params = {
      herbalData:item.baHerbalMedicines,
      recipename:recipename,
      remark:"",
      treatway:"",
      countnum:"",
      freq:"",
      buDiagnosisList:buDiagnosisInfo,
    }
    console.log("数据组装后=============",params);
    this.props.modelData(item,3);
  }
  render() {
    var { dataSource, bu } = this.state;
    console.log("dataSource========",typeof(dataSource) == "undefined");
    return (
      <div className="intelligentTreat">
      {
        typeof(dataSource) == "undefined"
        ?
        null
        :
        <div className="intelligentTreat_Tabs">
          <Tabs onChange={this.callback} tabBarGutter={12} type="card" >
            <TabPane tab="方剂" key="1"><Prescription dataSource={dataSource.clist} bu={bu} changeInitData={this.changeInitData}/></TabPane>
            <TabPane tab="中成药" key="2"><ChineseMedicine dataSource={dataSource.plist} bu={bu} changeInitData={this.changeInitData}/></TabPane>
            <TabPane tab="中医适宜技术" key="3"><AppropriateTechnology dataSource={dataSource.slist} bu={bu} changeInitData={this.changeInitData}/></TabPane>
            <TabPane tab="名医医案" key="4"><Consilia dataSource={dataSource.mlist} bu={bu} changeInitData={this.changeInitData}/></TabPane>
          </Tabs>
        </div>
      }
      </div>
    );
  }
}
