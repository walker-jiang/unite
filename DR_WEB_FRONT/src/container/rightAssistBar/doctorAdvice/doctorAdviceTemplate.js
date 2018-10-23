/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏------医嘱-----医嘱模板
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import '../medicalRecordWriting/style/rightAssistBar.less';
import SearchTree from '../pubilcModule/searchTree.js';
import ContentDetailSeven from '../pubilcModule/contentDetailSeven.js';
import doctorAdviceService from '../service/doctorAdviceService.js';
import medicalRWService from '../service/medicalRWService.js';
import pingpu1 from './style/pingpu1.png';
import pingpu2 from './style/pingpu2.png';
import shuzhuang1 from './style/shuzhuang1.png';
import shuzhuang2 from './style/shuzhuang2.png';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      isCut:true,
      pingpu:true,
      shuzhuang:false,
      unfold:false,
      searchValue:"",
    };
  };
  componentWillMount(){
    this.searchList("");
    this.queryTree();
  }
  /**
   * 数据解析
   * @method analysisData
   * @param  {[type]}     data [description]
   * @return {Boolean}         [description]
   */
  analysisData = (data) => {
    var content = {};
    console.log("data[0]=========",data[0]);
    //debugger;
    var diagnose = data.diagnose;
    var temlevelDic = data.temlevelDic;
    console.log("============@@@",data);
    var checkout=[];
    var examine=[];
    var chineseMedicine=[];
    var chinesePatentMedicine=[];
    var appropriateTechnology=[];
    var westernMedicine=[];
    var materials=[];;
    data.recipeList.forEach((item,index)=>{
      item['ordercontent'] = item.recipeContent;
      console.log("item.ordertype=======",item.ordertype);
      //医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-材料
      switch (parseInt(item.ordertype)) {
        case 1: checkout.push(item);break;
        case 2: examine.push(item);break;
        case 3: chineseMedicine.push(item);break;
        case 4: chinesePatentMedicine.push(item);break;
        case 5: appropriateTechnology.push(item);break;
        case 6: westernMedicine.push(item);break;
        default: materials.push(item);break;
      }
    });
    var newItem = [
      { name:"检验",value:checkout },
      { name:"检查",value:examine },
      { name:"中药",value:chineseMedicine },
      { name:"中成药",value:chinesePatentMedicine },
      { name:"适宜技术",value:appropriateTechnology },
      { name:"西药",value:westernMedicine },
      { name:"材料",value:materials },
    ];
    content={
      data:newItem,
      temname:data.temname,
      diagnose:diagnose,
      temlevelDic:temlevelDic == ""?"未知模板":temlevelDic,
      initData:data
    };
    console.log("==================",content);
    return content;
  }

  searchList = (content) =>{
    var self = this;
    let params = {
      "personid":window.sessionStorage.getItem('userid'),
      "orgid":parseInt(sessionStorage.getItem("orgid")),
      "diseaseid":parseInt(sessionStorage.getItem("deptid")),
      "content":content,
      "diagnose":"",
      "page":1,
      "size":10,
    };
    function callBack(res){
      if(res.result && res.data){
        console.log("获取病历模板成功==============",res);
        var arr = [];
        res.data.forEach((item,index)=>{
          arr.push(self.analysisData(item));
        })
        self.setState({
          content:arr
        })
      }else{
        console.log('获取病历模板异常响应信息', res);
      }
    };
    doctorAdviceService.Medicalordertemplate(params, callBack);
  }
  cut = (isCut, type) =>{
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
  importTem = (item) => {
    var self = this;
    var orderidList = [];
    item.initData.recipeList.forEach((item,index)=>{
      orderidList.push(item.orderid);
    })
    console.log("orderidList=",orderidList);
    console.log("window.registerID=",window.registerID);
    let params = {
      orderidList:orderidList,//医嘱id集合  //201837501200516147
      registerid:window.registerID,//当前挂号id 201837501200516148
    };
    function callBack(res){
      if(res.result){
        console.log("引入医嘱模板成功==============",res);
        self.props.getData();
      }else{
        console.log('引入医嘱模板失败', res);
      }
    };
    doctorAdviceService.importTem(params, callBack);
  }
  /**
   * 左右联动（和书写诊疗单）
   * @method changeInitData
   * @param  {[type]}       item [表单内容]
   */
  changeInitData = (item) =>{
    var self = this;
    let params = {
      orderidList:item.orderid,//医嘱id集合  //201837501200516147
      registerid:window.registerID,//当前挂号id 201837501200516148
    };
    function callBack(res){
      if(res.result){
        console.log("获取历史病历详情成功==============",res.data);
        var record = {
          ordertype:parseInt(item.ordertype),
          orderid:item.orderid,
        }
        console.log("record===",record);
        self.props.actionManager("modify",record);
      }else{
        console.log('获取历史病历详情异常响应信息', res);
      }
    };
    doctorAdviceService.importTem(params, callBack);
  }
  queryTree = () =>{
    var self = this;
    console.log("开始获取树状图==========");
    let params = {
      temtype:1,//模板类型 0代表病历模板 1代表医嘱模板
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
  TreeChangeInitData = (temmanageid) =>{
    var self = this;
    console.log("开始获取医嘱树状图详情==========");
    let params = {
      temmanageid:temmanageid
    };
    function callBack(res){
      if(res.result && res.data){
        console.log("获取医嘱树状图成功详情==============",res);
        var recipeList = [];
        if(res.data.buOrderTempletList.length == 0){
          alert("该条数据没有查到orderid，无法添加，请检查数据库");
          return;
        }
        res.data.buOrderTempletList.forEach((item,index)=>{
          recipeList.push({orderid:item.orderid})
        })
        var item = {
          initData:{
            recipeList:recipeList
          }
        }
        self.importTem(item);//引入模板
      }else{
        console.log('获取医嘱树状图详情失败', res);
        alert(`获取医嘱树状图详情失败,temmanageid为${temmanageid},请检查数据库`);
      }
    };
    doctorAdviceService.QueryTreeDetail(params, callBack);
  }
  render() {
    var { content, isCut, unfold, pingpu, shuzhuang, dataSource, searchValue } = this.state;
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
                onSearch={value => { this.searchList(value) }}
              />
            </Col>
          </Row>
        </div>
        <div className="data" style={{backgroundColor:'#F2F2F2'}}>
          {
            isCut
            ?
            (
              content.length == 0?
              null
              :
              content.map((item,index)=>{
                return(
                  <div className="content" key={index} style={{marginBottom:20}}>
                    <div className="content-title" style={{height:50,marginBottom:10}}>
                      <Row>
                        <Col span={12}><p className="content-p"><span style={{fontWeight:700}} dangerouslySetInnerHTML = {{ __html:item.temname }}></span></p></Col>
                        <Col span={4}><p className="content-p-two">• {item.temlevelDic}</p></Col>
                        <Col span={8}>
                          <Button onClick={()=>{ this.importTem(item) }}>引入模板</Button>
                          <Divider type="vertical" />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>诊断:{item.diagnose}</Col>
                      </Row>
                    </div>
                    <ContentDetailSeven changeInitData ={this.changeInitData} item={item.data} unfold={unfold}/>
                  </div>
                )
              })
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
        </div>
      </div>
    );
  }
}
