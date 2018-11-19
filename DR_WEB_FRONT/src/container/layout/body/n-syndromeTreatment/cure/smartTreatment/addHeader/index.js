import React, { Component } from 'react';
import styled from 'styled-components';
import inspection from './imgs/none_focus/inspection.png';
import inspection_hover from './imgs/hover/inspection.png';
import examine from './imgs/none_focus/examine.png';
import examine_hover from './imgs/hover/examine.png';
import ch_medicine from './imgs/none_focus/ch_medicine.png';
import ch_medicine_hover from './imgs/hover/ch_medicine.png';
import west_medicine from './imgs/none_focus/west_medicine.png';
import west_medicine_hover from './imgs/hover/west_medicine.png';
import suit_tech from './imgs/none_focus/suit_tech.png';
import suit_tech_hover from './imgs/hover/suit_tech.png';
import west_cure from './imgs/none_focus/west_cure.png';
import west_cure_hover from './imgs/hover/west_cure.png';
import material from './imgs/none_focus/material.png';
import material_hover from './imgs/hover/material.png';
import add from './imgs/none_focus/add.png';
import add_hover from './imgs/hover/add.png';

export default class Index extends Component {
  /** [herbalSampleData 中药数据项] */
  herbalSampleData(){
    return {
    	"buOrderDtlList": [{
    		"baseUnit": "1",
    		"conversion": "",
    		"count": 10.0,
    		"ctstamp": "2018-10-23 01:16:58",
    		"deptid": null,
    		"deptname": "",
    		"dosage": "10",
    		"doseid": 1,
    		"dosename": "",
    		"feeout": null,
    		"feesum": null,
    		"feesumType": "",
    		"feesumin": null,
    		"freqid": null,
    		"freqname": "",
    		"hiscode": "",
    		"hisname": "",
    		"itemcode": "1",
    		"itemid": 1,
    		"itemname": "金银花",
    		"itemno": 0,
    		"itemtype": 0,
    		"miType": "",
    		"orderid": "201840228597537324",
    		"packageUnit": null,
    		"packaging": "",
    		"paytype": "",
    		"preferentialfee": null,
    		"preferentialscale": null,
    		"recipeno": "",
    		"remarks": "",
    		"spbody": "",
    		"specification": "",
    		"suitid": null,
    		"takedays": null,
    		"uniqueid": "201840228618451332",
    		"unitprice": 20.0,
    		"usageid": 9,
    		"usagename": "无",
    		"useflag": "1",
    		"utstamp": "2018-10-23 01:16:58",
    		"baseUnitDic": "克"
    	}, {
    		"baseUnit": "1",
    		"conversion": "",
    		"count": 10.0,
    		"ctstamp": "2018-10-23 01:16:58",
    		"deptid": null,
    		"deptname": "",
    		"dosage": "10",
    		"doseid": 4,
    		"dosename": "",
    		"feeout": null,
    		"feesum": null,
    		"feesumType": "",
    		"feesumin": null,
    		"freqid": null,
    		"freqname": "",
    		"hiscode": "",
    		"hisname": "",
    		"itemcode": "4",
    		"itemid": 4,
    		"itemname": "当归",
    		"itemno": 1,
    		"itemtype": 0,
    		"miType": "",
    		"orderid": "201840228597537324",
    		"packageUnit": null,
    		"packaging": "",
    		"paytype": "",
    		"preferentialfee": null,
    		"preferentialscale": null,
    		"recipeno": "",
    		"remarks": "",
    		"spbody": "",
    		"specification": "",
    		"suitid": null,
    		"takedays": null,
    		"uniqueid": "201840228618451333",
    		"unitprice": 20.0,
    		"usageid": 9,
    		"usagename": "无",
    		"useflag": "1",
    		"utstamp": "2018-10-23 01:16:58",
    		"baseUnitDic": "克"
    	}],
    	"buOrdmedical": null,
    	"buRecipe": {
    		"countnum": 3,
    		"ctstamp": "2018-10-23 01:16:37",
    		"deptcode": "",
    		"deptname": "",
    		"diagnosecode": "",
    		"diagnosename": "中医诊断",
    		"diagnoseno": "",
    		"doctorid": "",
    		"doctorname": "",
    		"doseid": null,
    		"dosename": "",
    		"drlevel": "",
    		"freqid": 2,
    		"freqname": "每日两次",
    		"hissectionname": "",
    		"medicalrecord": "",
    		"orderid": "201840228597537324",
    		"personid": "",
    		"recipedate": null,
    		"recipeid": "201840228597537326",
    		"recipename": "tst",
    		"recipeno": "",
    		"recipetype": "1",
    		"registerid": "201840228459121300",
    		"remark": "3",
    		"treatway": "test",
    		"usageid": null,
    		"usagename": "test",
    		"useflag": "1",
    		"utstamp": "2018-10-23 01:16:58",
    		"recipetypeDic": "医保外"
    	},
    	"ctstamp": "2018-10-23 01:16:37",
    	"execDepaid": null,
    	"feeall": 120.0,
    	"ordercontent": "金银花、当归",
    	"orderid": "201840228597537324",
    	"orderno": "",
    	"orderstate": "6",
    	"ordertype": 3,
    	"orgUserid": "2",
    	"orgUsername": "姜中希",
    	"orgid": "10000",
    	"patientid": "201837493347470136",
    	"patientname": "李明明",
    	"printnum": 0,
    	"printstate": "02",
    	"registerid": "201840228459121300",
    	"submitstate": "01",
    	"useflag": "1",
    	"utstamp": "2018-10-23 01:16:58",
    	"orderstateDic": "未提交",
    	"ordertypeDic": "中药处方",
    	"printstateDic": "未打印"
    }
  };
  /** [suitTechSampleData 适宜技术数据项] */
  suitTechSampleData(){
     return {
      	"buDiagnosisInfo": {
      		"buDiagnosisList": [{
      			"buDiagnosisSyndromeList": [{
      				"ctstamp": "2018-10-23 02:26:56",
      				"diagnosisid": "201840232816106454",
      				"diseaseid": 191,
      				"id": "201840232816106455",
      				"manifcode": "ZBHR21",
      				"manifdesc": "喘促气急，咳嗽痰鸣，咯痰黏稠色黄，胸闷，鼻塞喷嚏，流清涕，或恶寒发热，面赤口渴，夜卧不安，大便干结，",
      				"manifid": 32,
      				"manifname": "外寒内热",
      				"registerid": "201840228459121300",
      				"useflag": "1",
      				"utstamp": "2018-10-23 02:26:56"
      			}],
      			"cmDiagnosisType": null,
      			"codetype": "",
      			"ctstamp": "2018-10-23 02:26:56",
      			"diacode": "",
      			"diadesc": "",
      			"diagnosisCode": "BNF050",
      			"diagnosisName": "哮喘",
      			"diagnosisNo": null,
      			"diagnosisType": null,
      			"diagnosisWay": 1,
      			"diagnosisid": "201840232816106454",
      			"diaid": null,
      			"dianame": "",
      			"discode": "BNF050",
      			"disdesc": "哮喘",
      			"diseaseid": 191,
      			"disname": "哮喘",
      			"doubtDiaType": "",
      			"mainDiaType": "",
      			"registerid": "201840228459121300",
      			"seqno": 5,
      			"useflag": "1",
      			"utstamp": "2018-10-23 02:26:56",
      			"diagnosisWayDic": "中医"
      		}],
      		"cardno": "210430195008052809",
      		"ctstamp": "2018-10-23 02:26:56",
      		"deptid": 3,
      		"diagnosisDesc": "中医诊断：哮喘（外寒内热）",
      		"doctorid": "2",
      		"doctorname": "",
      		"id": "201840228522253302",
      		"orgid": "10000",
      		"patientid": "201837493347470136",
      		"patientname": "李明明",
      		"patientno": "test",
      		"registerid": "201840228459121300",
      		"registerno": "12312",
      		"useflag": "1",
      		"utstamp": "2018-10-23 02:26:56"
      	},
      	"buOrderDtlList": [],
      	"buOrdmedical": {
      		"aim": "234",
      		"buOrdmedicalSuitList": [{
      			"baseUnit": "5",
      			"buOrderDtlList": [{
      				"baseUnit": "5",
      				"conversion": "",
      				"count": 1.0,
      				"ctstamp": "2018-10-23 02:26:56",
      				"deptid": 1,
      				"deptname": "内科",
      				"dosage": "",
      				"doseid": null,
      				"dosename": "",
      				"feeout": null,
      				"feesum": null,
      				"feesumType": "",
      				"feesumin": null,
      				"freqid": null,
      				"freqname": "",
      				"hiscode": "",
      				"hisname": "",
      				"itemcode": "19",
      				"itemid": 19,
      				"itemname": "碘酒",
      				"itemno": 0,
      				"itemtype": null,
      				"miType": "1",
      				"orderid": "201840232816106446",
      				"packageUnit": null,
      				"packaging": "",
      				"paytype": "",
      				"preferentialfee": null,
      				"preferentialscale": null,
      				"recipeno": "",
      				"remarks": "无",
      				"spbody": "无",
      				"specification": "规格",
      				"suitid": "201840232816106448",
      				"takedays": null,
      				"uniqueid": "201840232816106449",
      				"unitprice": 15.5,
      				"usageid": null,
      				"usagename": "",
      				"useflag": "1",
      				"utstamp": "2018-10-23 02:26:56",
      				"miTypeDic": "医保外",
      				"baseUnitDic": "项"
      			}, {
      				"baseUnit": "5",
      				"conversion": "",
      				"count": 1.0,
      				"ctstamp": "2018-10-23 02:26:56",
      				"deptid": 1,
      				"deptname": "内科",
      				"dosage": "",
      				"doseid": null,
      				"dosename": "",
      				"feeout": null,
      				"feesum": null,
      				"feesumType": "",
      				"feesumin": null,
      				"freqid": null,
      				"freqname": "",
      				"hiscode": "",
      				"hisname": "",
      				"itemcode": "18",
      				"itemid": 18,
      				"itemname": "药棉",
      				"itemno": 1,
      				"itemtype": null,
      				"miType": "1",
      				"orderid": "201840232816106446",
      				"packageUnit": null,
      				"packaging": "",
      				"paytype": "",
      				"preferentialfee": null,
      				"preferentialscale": null,
      				"recipeno": "",
      				"remarks": "无",
      				"spbody": "无",
      				"specification": "规格",
      				"suitid": "201840232816106448",
      				"takedays": null,
      				"uniqueid": "201840232816106450",
      				"unitprice": 15.5,
      				"usageid": null,
      				"usagename": "",
      				"useflag": "1",
      				"utstamp": "2018-10-23 02:26:56",
      				"miTypeDic": "医保外",
      				"baseUnitDic": "项"
      			}],
      			"count": 1,
      			"ctstamp": "2018-10-23 02:26:56",
      			"feesum": 31.0,
      			"orderSuitcode": "xdz",
      			"orderSuitid": 13,
      			"orderSuitname": "消毒装",
      			"ordmedicalid": "201840232816106447",
      			"seqno": 1,
      			"specification": "规格",
      			"suitid": "201840232816106448",
      			"useflag": "1",
      			"utstamp": "2018-10-23 02:26:56"
      		}],
      		"ctstamp": "2018-10-23 02:26:56",
      		"deptcode": "3",
      		"deptname": "3",
      		"diagnosecode": "",
      		"diagnosename": "",
      		"diagnoseno": "",
      		"doctorid": "2",
      		"doctorname": "姜中希",
      		"drlevel": "1",
      		"hissectionname": "",
      		"medicalrecord": "",
      		"miType": "0",
      		"orderid": "201840232816106446",
      		"ordmedicalid": "201840232816106447",
      		"orgid": "10000",
      		"remarks": "",
      		"seqno": null,
      		"useflag": "1",
      		"utstamp": "2018-10-23 02:26:56",
      		"miTypeDic": "医保外"
      	},
      	"buRecipe": null,
      	"ctstamp": "2018-10-23 02:26:56",
      	"execDepaid": null,
      	"feeall": 31.0,
      	"ordercontent": "消毒装",
      	"orderid": "201840232816106446",
      	"orderno": "",
      	"orderstate": "6",
      	"ordertype": 5,
      	"orgUserid": "2",
      	"orgUsername": "姜中希",
      	"orgid": "10000",
      	"patientid": "201837493347470136",
      	"patientname": "李明明",
      	"printnum": 0,
      	"printstate": "02",
      	"registerid": "201840228459121300",
      	"submitstate": "01",
      	"useflag": "1",
      	"utstamp": "2018-10-23 02:26:56",
      	"orderstateDic": "未提交",
      	"ordertypeDic": "中医适宜技术",
      	"printstateDic": "未打印"
      }
  };
  /** [chPatentMedicineSampleData 中成药数据项] */
  chPatentMedicineSampleData(){
    return {
    	"buDiagnosisInfo": {
    		"buDiagnosisList": [{
    			"buDiagnosisSyndromeList": [{
    				"ctstamp": "2018-10-23 03:02:53",
    				"diagnosisid": "201840234973861497",
    				"diseaseid": 191,
    				"id": "201840234973861498",
    				"manifcode": "ZBHR21",
    				"manifdesc": "喘促气急，咳嗽痰鸣，咯痰黏稠色黄，胸闷，鼻塞喷嚏，流清涕，或恶寒发热，面赤口渴，夜卧不安，大便干结，",
    				"manifid": 32,
    				"manifname": "外寒内热",
    				"registerid": "201840228459121300",
    				"useflag": "1",
    				"utstamp": "2018-10-23 03:02:53"
    			}],
    			"cmDiagnosisType": null,
    			"codetype": "",
    			"ctstamp": "2018-10-23 03:02:53",
    			"diacode": "",
    			"diadesc": "",
    			"diagnosisCode": "BNF050",
    			"diagnosisName": "哮喘",
    			"diagnosisNo": null,
    			"diagnosisType": null,
    			"diagnosisWay": 1,
    			"diagnosisid": "201840234973861497",
    			"diaid": null,
    			"dianame": "",
    			"discode": "BNF050",
    			"disdesc": "哮喘",
    			"diseaseid": 191,
    			"disname": "哮喘",
    			"doubtDiaType": "",
    			"mainDiaType": "",
    			"registerid": "201840228459121300",
    			"seqno": 5,
    			"useflag": "1",
    			"utstamp": "2018-10-23 03:02:53",
    			"diagnosisWayDic": "中医"
    		}],
    		"cardno": "210430195008052809",
    		"ctstamp": "2018-10-23 03:01:02",
    		"deptid": 3,
    		"diagnosisDesc": "中医诊断：哮喘（外寒内热）",
    		"doctorid": "2",
    		"doctorname": "",
    		"id": "201840228522253302",
    		"orgid": "10000",
    		"patientid": "201837493347470136",
    		"patientname": "李明明",
    		"patientno": "test",
    		"registerid": "201840228459121300",
    		"registerno": "12312",
    		"useflag": "1",
    		"utstamp": "2018-10-23 03:02:53"
    	},
    	"buOrderDtlList": [{
    		"baseUnit": "2",
    		"conversion": "",
    		"count": 1.0,
    		"ctstamp": "2018-10-23 03:02:53",
    		"deptid": null,
    		"deptname": "",
    		"dosage": "1",
    		"doseid": 1,
    		"dosename": "3",
    		"feeout": null,
    		"feesum": null,
    		"feesumType": "",
    		"feesumin": null,
    		"freqid": 2,
    		"freqname": "",
    		"hiscode": "",
    		"hisname": "",
    		"itemcode": "5",
    		"itemid": 5,
    		"itemname": "杏仁止咳糖浆",
    		"itemno": 0,
    		"itemtype": 0,
    		"miType": "",
    		"orderid": "201840234862416485",
    		"packageUnit": 1,
    		"packaging": "",
    		"paytype": "",
    		"preferentialfee": null,
    		"preferentialscale": null,
    		"recipeno": "",
    		"remarks": "",

    		"spbody": "",
    		"specification": "1g",
    		"suitid": null,
    		"takedays": null,
    		"uniqueid": "201840234973861496",
    		"unitprice": 1.0,
    		"usageid": 7,
    		"usagename": "饭后半小时温开水送服",
    		"useflag": "1",
    		"utstamp": "2018-10-23 03:02:53",
    		"baseUnitDic": "钱"
    	}],
    	"buOrdmedical": null,
    	"buRecipe": {
    		"countnum": null,
    		"ctstamp": "2018-10-23 03:01:02",
    		"deptcode": "",
    		"deptname": "",
    		"diagnosecode": "",
    		"diagnosename": "中医诊断",
    		"diagnoseno": "",
    		"doctorid": "",
    		"doctorname": "",
    		"doseid": null,
    		"dosename": "",
    		"drlevel": "",
    		"freqid": null,
    		"freqname": "",
    		"hissectionname": "",
    		"medicalrecord": "",
    		"orderid": "201840234862416485",
    		"personid": "",
    		"recipedate": null,
    		"recipeid": "201840234862416487",
    		"recipename": "qwe",
    		"recipeno": "",
    		"recipetype": "1",
    		"registerid": "201840228459121300",
    		"remark": "",
    		"treatway": "",
    		"usageid": null,
    		"usagename": "",
    		"useflag": "1",
    		"utstamp": "2018-10-23 03:02:53",
    		"recipetypeDic": "医保外"
    	},
    	"ctstamp": "2018-10-23 03:01:02",
    	"execDepaid": null,
    	"feeall": 1.0,
    	"ordercontent": "杏仁止咳糖浆",
    	"orderid": "201840234862416485",
    	"orderno": "",
    	"orderstate": "6",
    	"ordertype": 4,
    	"orgUserid": "2",
    	"orgUsername": "姜中希",
    	"orgid": "10000",
    	"patientid": "201837493347470136",
    	"patientname": "李明明",
    	"printnum": 0,
    	"printstate": "02",
    	"registerid": "201840228459121300",
    	"submitstate": "01",
    	"useflag": "1",
    	"utstamp": "2018-10-23 03:02:53",
    	"orderstateDic": "未提交",
    	"ordertypeDic": "中成药/西药",
    	"printstateDic": "未打印"
    }
  };
  actionType(ordertype){
    this.props.operate('add', {orderid: '', ordertype: ordertype}, {});
  };
  render () {
    return (
      <Container>
        <AddQuickly>
          <Icon src={add} hover={add_hover}/>快速添加：
        </AddQuickly>
        <AddList>
          <ListItem onClick={() => { this.actionType(3) }} >
            <Icon src={ch_medicine} hover={ch_medicine_hover}/>中药
          </ListItem>
          <Line>|</Line>
          <ListItem onClick={() => { this.actionType(4) }} >
            <Icon src={west_medicine} hover={west_medicine_hover}/>中成药
          </ListItem>
          <Line>|</Line>
          <ListItem onClick={() => { this.actionType(5) }} >
            <Icon src={suit_tech} hover={suit_tech_hover}/>中医适宜技术
          </ListItem>
        </AddList>
      </Container>
    )
  }
}
const Container = styled.div`
  overflow: hidden;
  margin-top: 12px;
`;
const AddQuickly = styled.div`
  cursor: pointer;
  float: left;
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 10px;
  margin-right: 16px;
`;
const AddList = styled.ul`
  float: left;
  overflow: hidden;
  font-size: 12px;
  color: #999999;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  float: left;
  list-style: none;
  color: #333;
  cursor: pointer;
`;
const Icon = styled.div`
  background: url(${props => props.src});
  background-size: 100% 100%;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  &:hover {
    background: url(${props => props.hover});
    background-size: 100% 100%;
  }
`;
const Line = styled.i`
  display: inline-block;
  float: left;
  margin: 0px 10px;
  color: #999999
`;
const ListItemIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-top: -2px;
`;
/*
@作者：姜中希
@日期：2018-08-28
@描述：医嘱快速添加入口组件
*/
