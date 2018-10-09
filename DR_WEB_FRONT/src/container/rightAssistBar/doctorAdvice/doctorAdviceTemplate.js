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
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      isCut:true,
      unfold:false,
      searchValue:"",
    };
  };
  componentWillMount(){
    this.searchList("");
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
      diagnose:diagnose,
      temlevelDic:temlevelDic,
      initData:data
    };
    console.log("==================",content);
    return content;
  }

  searchList = (content) =>{
    var self = this;
    let params = {
      "personid":window.patientID,
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
  cut = (isCut) =>{
    console.log("isCut",isCut);
    this.setState({isCut})
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
      orderid:item.orderid,
    };
    function callBack(res){
      if(res.result && res.data){
        console.log("获取历史病历详情成功==============",res.data);
        var record = {
          ordertype:item.ordertype,
          orderid:item.orderid,
        }
        self.props.actionManager("modify",record);
      }else{
        console.log('获取历史病历详情异常响应信息', res);
      }
    };
    doctorAdviceService.GetData(params, callBack);
  }
  render() {
    var { content, isCut, unfold } = this.state;
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
                onSearch={value => { this.searchList(value) }}
              />
            </Col>
          </Row>
        </div>
        <div class="data">
          {
            isCut
            ?
            (
              content.length == 0?
              null
              :
              content.map((item,index)=>{
                return(
                  <div class="content" key={index}>
                    <div class="content-title">
                      <Row>
                        <Col span={12}><p class="content-p">{item.diagnose}</p></Col>
                        <Col span={4}><p class="content-p-two">• {item.temlevelDic}</p></Col>
                        <Col span={8}>
                          <Button onClick={()=>{ this.importTem(item) }}>引入模板</Button>
                          <Divider type="vertical" />
                        </Col>
                      </Row>
                    </div>
                    <ContentDetailSeven changeInitData ={this.changeInitData} item={item.data} unfold={unfold}/>
                  </div>
                )
              })
            )
            :
            <div><SearchTree/></div>
          }
        </div>
      </div>
    );
  }
}
