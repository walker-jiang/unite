/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----历史模板
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal, Spin, Pagination } from 'antd';
import './style/rightAssistBar.less';
import ContentDetail from '../pubilcModule/contentDetail.js';
import medicalRWService from '../service/medicalRWService.js';
import zanwunerong from './style/zanwunerong.png';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      total:0,
      isQuery:false,
      pageSize:10,
      unfold:false
    };
  };
  componentDidMount(){
    this.searchList(1);
  }
  searchList = (current) =>{
    var self = this;
    let params = {
      patientid:window.patientID,//"201837451711775113",
    };
    function callBack(res){
      if(res.result && res.data){
        console.log("获取历史病历成功==============",res);
        var data = res.data.records;
        var content = [];
        data.forEach((item,index)=>{
          var newItem = [ //主键 billid
            { name:"主诉",value:item.pridepict,nameDesc:"pridepict" },
            { name:"现病史",value:item.hpi,nameDesc:"hpi" },
            { name:"既往史",value:item.pasthistory,nameDesc:"pasthistory" },
            { name:"过敏史",value:item.allergichistory,nameDesc:"allergichistory" },
            { name:"个人史",value:item.personhistory,nameDesc:"personhistory" },
            { name:"月经婚育史",value:item.moHistory,nameDesc:"moHistory" },
            { name:"家庭史",value:item.familyhistory,nameDesc:"familyhistory" },
            { name:"体温",value:item.temperature,nameDesc:"temperature" },
            { name:"脉搏",value:item.pulse,nameDesc:"pulse" },
            { name:"呼吸",value:item.breath,nameDesc:"breath" },
            { name:"收缩压",value:item.systolicPressure,nameDesc:"systolicPressure" },
            { name:"舒张压",value:item.diastolicPressure,nameDesc:"diastolicPressure" },
            { name:"望诊",value:item.inspection,nameDesc:"inspection" },
            { name:"闻诊",value:item.smelling,nameDesc:"smelling" },
            { name:"切诊",value:item.palpation,nameDesc:"palpation" },
            { name:"辩证要点",value:item.syndrome,nameDesc:"syndrome" },
            { name:"其他检查",value:item.psycheck,nameDesc:"psycheck" },
            { name:"医生建议",value:item.suggession,nameDesc:"suggession" },
            { name:"治疗原则",value:item.treatprinciple,nameDesc:"treatprinciple" },
            { name:"身高",value:item.heightnum,nameDesc:"heightnum" },
            { name:"体重",value:item.weightnum,nameDesc:"weightnum" },
            { name:"儿童指纹描述",value:item.chfingerprint,nameDesc:"chfingerprint" },
            { name:"治疗方法",value:item.treatway,nameDesc:"treatway" },
            { name:"主视图路径",value:item.facephoto,nameDesc:"facephoto" },
            { name:"侧视图路径",value:item.sidephoto,nameDesc:"sidephoto" },
          ];
          content.push({
            data:newItem,
            orgid:item.orgid,//机构Id
            ctstamp:item.ctstamp,//创建时间戳
            doctorname:item.doctorname,//医生姓名
            casetype:item.casetype,//初复诊（0：初诊；1复诊）
            diagnosisDesc:item.buDiagnosisInfo.diagnosisDesc,//诊断描述
            initData:item,//原数据
          });
        })
        console.log("==================#{#{#{}}}",content);
        self.setState({ content:content,total:res.data.total,isQuery:true });
      }else{
        self.setState({ isQuery:true });
        console.log('获取历史病历异常响应信息', res);
      }
    };
    medicalRWService.GetList(params, callBack);
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
    console.log("左右联动item=",item);
    var newItem={}
    var key;
    for(key in item){
      if(key == "ctstamp" || key == "utstamp"){
        newItem[key] = item[key];
      }else{
        newItem[key] = this.repalceHtml(item[key])
      }
    }
    newItem['buDiagnosisInfo'] = {};//暂无信息
    console.log("newItem=",newItem);
    this.props.changeInitData(newItem);
  }
  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>上一页</a>;
    } if (type === 'next') {
      return <a>下一页</a>;
    }
    return originalElement;
  }
  onChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({ isQuery:false },()=>{
      setTimeout(()=>{
        this.searchList(current);
      },100);
    });
  }
  render() {
    var { content, unfold, total, isQuery, pageSize } = this.state;
    console.log("totaltotaltotaltotal",typeof(total) == "undefined");
    return (
      <div className="rightAssistBar_medicalHistory">
        <div className="medicalHistory_data">
          <p className="data_p">共<span>{content.length}</span>次病历记录</p>
          {
            content.length != 0
            ?
            (
              isQuery
              ?
              <div>
                {
                  content.map((item,index)=>{
                    return(
                      <div className="medicalHistory_content" key={index}>
                        <div className="medicalHistory_content-title">
                          <Row>
                            <Col span={16}>
                              <p className="content-p">
                                {item.ctstamp.substr(0,11)} | {item.orgid} | 医师：{item.doctorname} | <span>{item.casetype == 0?"初诊":"复诊"}</span>
                              </p>
                            </Col>
                            <Col span={8}>
                              <Button  onClick={()=>{ this.changeInitData(item.initData) }}>引入病历</Button>
                              <Divider type="vertical" />
                            </Col>
                          </Row>
                          <Row><Col span={24}><p>诊断：{item.diagnosisDesc}</p></Col></Row>
                        </div>
                        <ContentDetail item={item.data} changeInitData={this.changeInitData}/>
                      </div>
                    )
                  })
                }
                {
                  typeof(total) == "undefined" || total <= 10
                  ?
                  <center style={{marginBottom:10,marginTop:10}}>-------已经到底了-------</center>
                  :
                  <center style={content.length<5?{position:'absolute',bottom:10}:{marginBottom:10}}>
                      <Pagination current={parseInt(pageSize)} total={total} onChange={this.onChange} itemRender={this.itemRender} />
                  </center>
                }
              </div>
              :
              <center style={{marginTop:50}}><div className="example"><Spin/>&nbsp;&nbsp;&nbsp;正在加载中,请稍后...</div></center>
            )
            :
            (
              isQuery
              ?
              <center style={{marginTop:50}}><img src={zanwunerong} style={{width:160}}/><br/>暂无数据</center>
              :
              <center style={{marginTop:50}}><div className="example"><Spin/>&nbsp;&nbsp;&nbsp;正在加载中,请稍后...</div></center>
            )
          }
        </div>
      </div>
    );
  }
}
