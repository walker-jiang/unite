/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import './style/rightAssistBar.less';
import SearchTree from '../pubilcModule/searchTree.js';
import ContentDetail from '../pubilcModule/contentDetail.js';
import medicalRWService from '../service/medicalRWService.js';
const Search = Input.Search;

export default class MedicalRecordTemplate extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      isCut:true,
      unfold:false,
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
    this.queryTable(searchValue, page, size, nextProps);
  }
  queryTable = (content, page, size, listenFormData) =>{
    var self = this;
    console.log("开始获取table列表==========");
    let params = {
      page:page,
      size:size,
      personid:window.sessionStorage.getItem('userid'),
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
            { name:"模板级别",value:item.temlevel },
            { name:"主诉",value:item.pridepict },
            { name:"望诊",value:item.inspection },
            { name:"闻诊",value:item.smelling },
            { name:"切诊",value:item.palpation },
            { name:"体温",value:item.temperature },
            { name:"呼吸",value:item.breath },
            { name:"脉搏",value:item.pulse },
            { name:"收缩压",value:item.systolicPressure },
            { name:"舒张压",value:item.diastolicPressure },
            { name:"身高",value:item.heightnum },
            { name:"体重",value:item.weightnum },
            { name:"诊断",value:item.diagnosisDesc },
            { name:"现病史",value:item.hpi },
            { name:"过敏史",value:item.allergichistory },
            { name:"既往史",value:item.pasthistory },
            { name:"个人史",value:item.personhistory },
            { name:"月经婚育史",value:item.moHistory },
            { name:"家族史",value:item.familyhistory },
            { name:"辩证要点",value:item.syndrome },
            { name:"其他检查",value:item.psycheck },
            { name:"治疗原则",value:item.treatprinciple },
            { name:"治疗方法",value:item.treatway },
            { name:"医生建议",value:item.suggession }
          ];
          content.push({
            data:newItem,
            temname:item.temname,
            temlevelDic:item.temlevelDic,
            initData:item
          });
        })
        self.setState({ content });
        self.queryTree();//获取树状图
      }else{
        console.log('获取table列表失败', res);
      }
    };
    medicalRWService.QueryTable(params, callBack);
  }
  queryTree = () =>{
    var self = this;
    console.log("开始获取树状图==========");
    let params = {
      patientid:window.sessionStorage.getItem('userid'),
    };
    function callBack(res){
      if(res.result && res.data){
        console.log("获取树状图成功==============",res);
        self.setState({ dataSource:res.data })
      }else{
        console.log('获取树状图成功失败', res);
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
    console.log("str@@@@@@@@@@@@@@@@@@",str);
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
    console.log("item",item);
    var newItem={}
    var key;
    for(key in item){
      newItem[key] = this.repalceHtml(item[key])
    }
    newItem['buDiagnosisInfo'] = {};//暂无信息
    this.props.changeInitData(newItem);
  }
  cut = (isCut) =>{
    console.log("isCut",isCut);
    this.setState({isCut})
  }
  unfold = (unfold) =>{
    this.setState({unfold:!unfold});
  }
  render() {
    var { content, isCut, unfold, searchValue, page, size, listenFormData, dataSource } = this.state;

    return (
      <div class="rightAssistBar_template">
        <div class="tab">
          <Row>
            <Col span={4}>
              <Icon type="bars" onClick={()=>{ this.cut(true) }}/>
              <Icon type="bars" onClick={()=>{ this.cut(false) }}/>
            </Col>
            <Col span={20}>
              <Search
                placeholder="请输入模板名称或症状快速查询"
                onSearch={value => { this.queryTable(value, page, size, listenFormData) }}
              />
            </Col>
          </Row>
        </div>
        <div class="data">
          {
            isCut
            ?
            content.map((item,index)=>{
              console.log("--------------------------------------",item);
              return(
                <div class="content">
                  <div class="content-title">
                    <Row>
                      <Col span={12}><p class="content-p"><div dangerouslySetInnerHTML = {{ __html:item.temname }}></div></p></Col>
                      <Col span={4}><p class="content-p-two">• {item.temlevelDic}</p></Col>
                      <Col span={8}>
                        <Button onClick={()=>{ this.changeInitData(item.initData) }}>引入模板</Button>
                        <Divider type="vertical" />
                      </Col>
                    </Row>
                  </div>
                  <ContentDetail item={item.data} unfold={unfold}/>
                </div>
              )
            })
            :
            <div><SearchTree dataSource={dataSource}/></div>
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
