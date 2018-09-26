/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----历史模板
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import './style/rightAssistBar.less';
import ContentDetail from '../pubilcModule/contentDetail.js';
import medicalRWService from '../service/medicalRWService.js';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      unfold:false
    };
  };
  componentDidMount(){
    this.searchList();
  }
  searchList = (content) =>{
    var self = this;
    let params = {
      patientid:"201837451711775113",
    };
    function callBack(res){
      if(res.result && res.data){
        console.log("获取历史病历成功==============",res);
        var data = res.data;
        var content = [];
        data.forEach((item,index)=>{
          var newItem = [ //主键 billid
            { name:"主诉",value:item.pridepict },
            { name:"现病史",value:item.hpi },
            { name:"既往史",value:item.pasthistory },
            { name:"过敏史",value:item.allergichistory },
            { name:"个人史",value:item.personhistory },
            { name:"月经婚育史",value:item.moHistory },
            { name:"家庭史",value:item.familyhistory },
            { name:"体温",value:item.temperature },
            { name:"脉搏",value:item.pulse },
            { name:"呼吸",value:item.breath },
            { name:"收缩压",value:item.systolicPressure },
            { name:"舒张压",value:item.diastolicPressure },
            { name:"望诊",value:item.inspection },
            { name:"闻诊",value:item.smelling },
            { name:"切诊",value:item.palpation },
            { name:"辩证要点",value:item.syndrome },
            { name:"其他检查",value:item.psycheck },
            { name:"医生建议",value:item.suggession },
            { name:"治疗原则",value:item.treatprinciple },
            { name:"身高",value:item.heightnum },
            { name:"体重",value:item.weightnum },
            { name:"儿童指纹描述",value:item.chfingerprint },
            { name:"治疗方法",value:item.treatway },
            { name:"主视图路径",value:item.facephoto },
            { name:"侧视图路径",value:item.sidephoto }
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
        console.log("==================",content);
        self.setState({ content });
      }else{
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
    console.log("item",item);
    var newItem={}
    var key;
    for(key in item){
      newItem[key] = this.repalceHtml(item[key])
    }
    newItem['buDiagnosisInfo'] = {};//暂无信息
    this.props.changeInitData(newItem);
  }
  render() {
    var { content, unfold } = this.state;
    return (
      <div class="rightAssistBar_medicalHistory">
        <div class="medicalHistory_data">
          <p class="data_p">共<span>2</span>次病历记录</p>
          {
            content.map((item,index)=>{
              return(
                <div class="medicalHistory_content" key={index}>
                  <div class="medicalHistory_content-title">
                    <Row>
                      <Col span={16}>
                        <p class="content-p">
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
                  <ContentDetail item={item.data}/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
