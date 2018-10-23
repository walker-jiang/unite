/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏----病历模板
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal, Spin } from 'antd';
import './style/rightAssistBar.less';
import SearchTree from '../pubilcModule/searchTree.js';
import ContentDetail from '../pubilcModule/contentDetail.js';
import medicalRWService from '../service/medicalRWService.js';
import doctorAdviceService from '../service/doctorAdviceService.js';
import pingpu1 from './style/pingpu1.png';
import zanwunerong from './style/zanwunerong.png';
import pingpu2 from './style/pingpu2.png';
import shuzhuang1 from './style/shuzhuang1.png';
import shuzhuang2 from './style/shuzhuang2.png';
const Search = Input.Search;

export default class MedicalRecordTemplate extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      isCut:true,
      unfold:true,
      pingpu:true,
      shuzhuang:false,
      isQuery:false,
      searchValue:"",
      page:1,
      size:10,
      listenFormData:{
        pridepict:"", //主诉
        inspection:"", //望诊
        palpation:"",//切诊
        smelling:"", //闻诊
        hpi:"",  //现病史
      }
    };
  };
  componentWillMount(){
    console.log("componentWillMount====this.props.item1111",this.props.item);
    var { searchValue, page, size, listenFormData } = this.state;
    this.queryTable(searchValue, page, size, listenFormData);//获取table列表
  }
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps====this.props.item",nextProps.listenFormData);
    this.setState({
      listenFormData:this.props.listenFormData
    })
    var { searchValue, page, size } = this.state;
    this.queryTable(searchValue, page, size, nextProps.listenFormData);
  }
  queryTable = (content, page, size, listenFormData) =>{
    var self = this;
    console.log("开始获取table列表==========");
    let params = {
      page:page,
      size:size,
      personid:window.sessionStorage.getItem('userid'),//window.patientID
      orgid: window.sessionStorage.getItem('orgid'),
      diseaseid: window.sessionStorage.getItem('deptid'),
      content:content,
      pridepict:listenFormData.pridepict, //主诉
      inspection:listenFormData.inspection, //望诊
      palpation:listenFormData.palpation, //切诊
      smelling:listenFormData.smelling, //闻诊
      hpi:listenFormData.hpi,  //现病史
    }
    function callBack(res){
      if(res.result && res.data){
        console.log("获取table列表成功==============",res);
        var data = res.data;
        var content = [];
        data.forEach((item,index)=>{
          var newItem = [
            { name:"模板级别",value:item.temlevel,nameDesc:"temlevel" },
            { name:"主诉",value:item.pridepict,nameDesc:"pridepict" },
            { name:"望诊",value:item.inspection,nameDesc:"inspection" },
            { name:"闻诊",value:item.smelling,nameDesc:"smelling" },
            { name:"切诊",value:item.palpation,nameDesc:"palpation" },
            { name:"体温",value:item.temperature,nameDesc:"temperature" },
            { name:"呼吸",value:item.breath,nameDesc:"breath" },
            { name:"脉搏",value:item.pulse,nameDesc:"pulse" },
            { name:"收缩压",value:item.systolicPressure,nameDesc:"systolicPressure" },
            { name:"舒张压",value:item.diastolicPressure,nameDesc:"diastolicPressure" },
            { name:"身高",value:item.heightnum,nameDesc:"heightnum" },
            { name:"体重",value:item.weightnum,nameDesc:"weightnum" },
            { name:"诊断",value:item.diagnosisDesc,nameDesc:"diagnosisDesc" },
            { name:"现病史",value:item.hpi,nameDesc:"hpi" },
            { name:"过敏史",value:item.allergichistory,nameDesc:"allergichistory" },
            { name:"既往史",value:item.pasthistory,nameDesc:"pasthistory" },
            { name:"个人史",value:item.personhistory,nameDesc:"personhistory" },
            { name:"月经婚育史",value:item.moHistory,nameDesc:"moHistory" },
            { name:"家族史",value:item.familyhistory,nameDesc:"familyhistory" },
            { name:"辩证要点",value:item.syndrome,nameDesc:"syndrome" },
            { name:"其他检查",value:item.psycheck,nameDesc:"psycheck" },
            { name:"治疗原则",value:item.treatprinciple,nameDesc:"treatprinciple" },
            { name:"治疗方法",value:item.treatway,nameDesc:"treatway" },
            { name:"医生建议",value:item.suggession,nameDesc:"suggession" }
          ];
          content.push({
            data:newItem,
            temname:item.temname,
            temlevelDic:item.temlevelDic == ""?"未知模板":item.temlevelDic,
            initData:item
          });
        })
        self.setState({ content:content,isQuery:true });
        self.queryTree();//获取树状图
      }else{
        console.log('获取table列表失败', res);
        self.setState({ isQuery:true });
      }
    };
    medicalRWService.QueryTable(params, callBack);
  }
  queryTree = () =>{
    var self = this;
    console.log("开始获取树状图==========");
    let params = {
      temtype:0,//模板类型 0代表病历模板 1代表医嘱模板
      personid:window.sessionStorage.getItem('userid'),
      orgid:window.sessionStorage.getItem('orgid')
    };
    function callBack(res){
      if(res.result && res.data){
        console.log("获取树状图成功==============",res);
        self.setState({ dataSource:res.data })
      }else{
        console.log('获取树状图失败', res);
      }
    };
    medicalRWService.QueryTree(params, callBack);
  }
  /**
   * 加载更多
   * @method pagination
   * @param  {[type]}   搜索内容 [description]
   * @param  {[type]}   页数        [description]
   * @param  {[type]}   每页条数        [description]
   * @return {[type]}               [description]
   */
  pagination = (searchValue, page, size) => {
    var { searchValue, page, size, listenFormData } = this.state;
    this.queryTable(searchValue, page++, size, listenFormData)
  }
  /**
   * 替换html中的标签，得到html标签中的文字
   * @method repalceHtml
   * @param  {[type]}    str [description]
   * @return {[type]}        [description]
   */
  repalceHtml = (str) =>{
    //console.log("str@@@@@@@@@@@@@@@@@@",str);
  	if(str && str != ""){
      var dd=str.toString().replace(/<\/?.+?>/g,"");
    	var dds=dd.replace(/ /g,"");//dds为得到后的内容
    	return dds;
    }else{
      return str;
    }
  }
  /**
   * 左右联动（和书写诊疗单）
   * @method changeInitData
   * @param  {[type]}       item [表单内容]
   */
  changeInitData = (item) =>{
    console.log("左右联动item",item);
    var newItem={}
    var key;
    for(key in item){
      newItem[key] = this.repalceHtml(item[key])
    }
    newItem['buDiagnosisInfo'] = {};//暂无信息
    this.props.changeInitData(newItem);
  }
  cut = (isCut,type) =>{
    console.log("isCut",isCut);
    if(type == "pingpu"){
      var pingpu = true;
      var shuzhuang = false;
    }else{
      var pingpu = false;
      var shuzhuang = true;
    }
    this.setState({isCut, pingpu, shuzhuang});
  }
  unfold = (unfold) =>{
    this.setState({unfold:!unfold});
  }
  TreeChangeInitData = (temmanageid) =>{
    var self = this;
    console.log("开始获取树状图详情==========");
    let params = {
      temmanageid:temmanageid
    };
    function callBack(res){
      if(res.result && res.data){
        console.log("获取树状图成功详情==============",res);
        self.props.changeInitData(res.data);
      }else{
        console.log('获取树状图详情失败', res);
      }
    };
    medicalRWService.QueryTreeDetail(params, callBack);
  }
  render() {
    var { isQuery, content, isCut, unfold, searchValue, page, size, listenFormData, dataSource, pingpu, shuzhuang } = this.state;
    console.log("=========================",content);
    return (
      <div className="rightAssistBar_template">
        <div className="tab">
          <Row>
            <Col span={4}>
              <Row>
                <Col span={11}>
                  <img className="anticon-bars" src={pingpu?pingpu2:pingpu1}onClick={()=>{ this.cut(true,"pingpu") }}/>
                </Col>
                <Col span={11}>
                  <img className="anticon-bars" src={shuzhuang?shuzhuang1:shuzhuang2} onClick={()=>{ this.cut(false,"shuzhuang") }}/>
                </Col>
              </Row>
            </Col>
            <Col span={20}>
              <Search
                placeholder="请输入模板名称或症状快速查询"
                onSearch={value => {
                  this.setState({searchValue:value},()=>{ console.log("searchValue!!@@@",searchValue); });
                  this.queryTable(value, page, size, listenFormData)
                }}
              />
            </Col>
          </Row>
        </div>
        <div className="data" style={{backgroundColor:'#F2F2F2'}}>
          {
            isCut
            ?
            (
              content.length != 0
              ?
              content.map((item,index)=>{
                //console.log("--------------------------------------",item);
                return(
                  <div className="content" style={{marginBottom:10}}>
                    <div className="content-title">
                      <Row>
                        <Col span={12}><p className="content-p"><div dangerouslySetInnerHTML = {{ __html:item.temname }}></div></p></Col>
                        <Col span={4}><p className="content-p-two">• {item.temlevelDic}</p></Col>
                        <Col span={8}>
                          <Button onClick={()=>{ this.changeInitData(item.initData) }}>引入模板</Button>
                          <Divider type="vertical" />
                        </Col>
                      </Row>
                    </div>
                    <ContentDetail item={item.data} unfold={unfold} changeInitData={this.changeInitData}/>
                  </div>
                )
              })
              :
              (
                isQuery
                ?
                <center style={{marginTop:50}}><img src={zanwunerong}/><br/>暂无数据，请输入诊断信息后方可查询</center>
                :
                <center style={{marginTop:50}}><div className="example"><Spin/>正在加载中,请稍后...</div></center>
              )
            )
            :
            <div>
              <SearchTree
                dataSource={dataSource}
                searchValue={searchValue}
                TreeChangeInitData={this.TreeChangeInitData}
              />
            </div>
          }
          {
            content.length>10
            ?
            <p className="pagination" onClick={()=>{ this.pagination(searchValue, page, size) }}>点击加载更多...</p>
            :
            null
          }
        </div>
      </div>
    );
  }
}
