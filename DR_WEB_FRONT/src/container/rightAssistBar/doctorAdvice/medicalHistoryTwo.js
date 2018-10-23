/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----历史模板
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import './style/doctorAdvice.less';
import ContentDetailSeven from '../pubilcModule/contentDetailSeven.js';
import doctorAdviceService from '../service/doctorAdviceService.js';
import zanwunerong from './style/zanwunerong.png';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      content : {},
      unfold:false
    };
  };
  componentWillMount(){
    this.searchList();
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
    var orgid = data[0].orgid;
    var ctstamp = data[0].ctstamp.substr(0,11);
    var org_username = data[0].org_username;
    var casetype = data[0].casetype;
    if(data[0].buDiagnosisInfo == null){
      var diagnosisDesc = "暂无数据";
    }else{
      var diagnosisDesc = data[0].buDiagnosisInfo.diagnosisDesc;
    }
    console.log("============@@@",data);
    var checkout=[];
    var examine=[];
    var chineseMedicine=[];
    var chinesePatentMedicine=[];
    var appropriateTechnology=[];
    var westernMedicine=[];
    var materials=[];;
    data.forEach((item,index)=>{
      console.log("item.ordertype=======",item.ordertype);
      //医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-材料
      switch (item.ordertype) {
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
      orgid:orgid,
      ctstamp:ctstamp,
      org_username:org_username,
      casetype:casetype,
      diagnosisDesc:diagnosisDesc,
      initData:data
    };
    console.log("==================",content);
    return content;
  }

  searchList = (content) =>{
    var self = this;
    let params = {
      patientid:window.patientID,
      registerid:window.registerID,//201837501200516148
    };
    function callBack(res){
      if(res.result && res.data){
        console.log("获取历史病历成功==============",res);
        var arr = [];
        res.data.forEach((item,index)=>{
          if(item.length != 0 ){
            arr.push(self.analysisData(item));
          }
        })
        self.setState({
          content:arr
        })
      }else{
        console.log('获取历史病历异常响应信息', res);
      }
    };
    doctorAdviceService.GetList(params, callBack);
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
        console.log("medicalHistoryTwo获取历史病历详情成功==============",res.data);
        var record = {
          ordertype:item.ordertype,
          orderid:item.orderid,
        }
        console.log("record===",record);
        self.props.actionManager("modify",record);
      }else{
        console.log('获取历史病历详情异常响应信息', res);
      }
    };
    doctorAdviceService.ImportList(params, callBack);
  }
  /**
   * 引入全部病历
   * @method changeAllInitData
   * @param  {[type]}       item [表单内容]
   */
  changeAllInitData = (item) =>{
    console.log("item====",item);
    var self = this;
    var orderidList = [];
    item.initData.forEach((item,index)=>{
      orderidList.push(item.orderid);
    })
    let params = {
      orderidList:orderidList,//医嘱id集合  //201837501200516147
      registerid:window.registerID,//当前挂号id 201837501200516148
    };
    function callBack(res){
      if(res.result){
        console.log("历史病历导入成功==============",res);
        self.props.getData();
      }else{
        console.log('历史病历导入异常响应信息', res);
      }
    };
    doctorAdviceService.ImportList(params, callBack);
  }
  render() {
    var { content, unfold } = this.state;
    console.log("content=======",content);
    console.log("content.data.length",content.data);
    return (
      <div className="rightAssistBar_medicalHistory">
        <div className="medicalHistory_data">
          <p className="data_p">共<span>{content.length}</span>次病历记录</p>
          {
            content.length != 0
            ?
            content.map((item,index)=>{
              //console.log("item.ctstamp==",item);
              return(
                <div className="medicalHistory_content" key={index}>
                  <div className="medicalHistory_content-title">
                    <Row>
                      <Col span={16}>
                        <p className="content-p">
                          {item.ctstamp} | {item.orgid} | 医师：{item.org_username} |  <span>{item.casetype == 0?"初诊":"复诊"}</span>
                        </p>
                      </Col>
                      <Col span={8}>
                        <Button  onClick={()=>{ this.changeAllInitData(item) }}>引入病历</Button>
                        <Divider type="vertical" />
                      </Col>
                    </Row>
                    <Row><Col span={24}><p>诊断：{item.diagnosisDesc}</p></Col></Row>
                  </div>
                  <ContentDetailSeven
                    changeInitData ={this.changeInitData}
                    item ={item.data}
                  />
                </div>
              )
            })
            :
            <center style={{marginTop:50}}><img src={zanwunerong}/><br/>暂无数据，该病人没有历史病历</center>
          }
        </div>
      </div>
    );
  }
}
