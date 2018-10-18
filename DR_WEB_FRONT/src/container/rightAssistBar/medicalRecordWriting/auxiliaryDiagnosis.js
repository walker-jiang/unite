/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏----辅助诊断
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import './style/rightAssistBar.less';
import TagGroup from '../pubilcModule/tag.js';
import medicalRWService from '../service/medicalRWService.js';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[
        { title:"感冒 / 风寒袭表症" },
        { title:"感冒 / 风寒袭表症" },
        { title:"感冒 / 风寒袭表症" },
        { title:"感冒 / 风寒袭表症" },
      ],
      tagList:["头晕","恶心","流清鼻","浑身无力","发烧"],
      isCut:true,
      seachValue:"",//搜索条件
      listenFormData:this.props.listenFormData,
    };
  };
  componentWillMount(){
    var { listenFormData } = this.state;
    this.GetAuxiliaryList(listenFormData);
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps.listenFormData",nextProps.listenFormData);
    this.GetAuxiliaryList(nextProps.listenFormData);
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
  changeInitData = (dName,syndromeName) =>{
    var self = this;
    console.log("item========",dName);
    if(dName == ""){
      Modal.warning({title:"中医诊断为空",content:"请选择一个中医诊断"});
    }else if(syndromeName == ""){
      Modal.warning({title:"证候为空",content:"请选择一个证候"});
    }else{
      var params = {
        keyword:this.repalceHtml(dName)
      }
      function callBack(res){
        if(res.result && res.data){
          console.log("获取中医疾病对象成功==============",res.data[0]);
          self.getIllData(syndromeName,res.data[0].diseaseid,res.data[0]);
        }else{
          console.log('获取中医疾病对象失败', res);
        }
      };
      medicalRWService.QueryDiseaseList(params, callBack);
    }
  }
  /** [getIllData 获取疾病数据] */
  getIllData(keyword, symptomId, item){
    let self = this;
    let params = {
      url: 'BaDiseaseManifController/getList',
      data: {
        keyword: keyword,
        diseaseid: symptomId,
      },
    };
    function callBack(res){
      if(res.result){
        console.log("获取西医疾病对象成功==============",res);
        var newArray = [];
        if(res.data.length != 0 ){
          res.data[0]['key'] = res.data[0].diseaseid;
          newArray.push(res.data[0])
          item['buDiagnosisDismainfList'] = newArray;//buDiagnosisList
          item['diagnosisName'] = item.disname;
          item['diagnosisCode'] = item.discode;
          item['diaid'] = "";
          item['diagnosisWay'] = 1;//中医
          item['key'] = item.discode;//诊疗系统循环用
          item['status'] = 2;
          var buDiagnosisList = [];
          buDiagnosisList.push(item);
          var newItem = {};
          newItem['buDiagnosisList'] = buDiagnosisList;
          console.log("最终的对象为========",newItem);
          self.props.changeInitDataTwo(newItem);
        }else{
          alert("中医疾病对象获取成功，获取西医疾病对象为空");
        }
      }else{
        console.log('获取西医疾病对象失败', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  GetAuxiliaryList = (listenFormData) =>{
    var self= this;
    var params = {
      pridepict:listenFormData.pridepict, //主诉
      inspection:listenFormData.inspection, //望诊
      palpation:listenFormData.palpation,//切诊
      smelling:listenFormData.smelling, //闻诊
      hpi:listenFormData.hpi,  //现病史
      content:self.state.seachValue,
      page:1,
      size:10
    }
    function callBack(res){
      if(res.flag == 1 && res.data){
        console.log("获取辅助诊断列表成功==============",res);
        self.setState({
          content:res.data
        })
      }else{
        console.log('获取辅助诊断列表失败', res);
      }
    };
    medicalRWService.GetAuxiliaryList(params, callBack);
  }

  render() {
    var { content, isCut, listenFormData } = this.state;
    return (
      <div className="rightAssistBar_template">
        <div className="tab">
          <Row>
            <Col span={23} offset={1}>
              <Search
                placeholder="请输入模板名称或症状快速查询"
                onSearch={value => { this.setState({ seachValue:value },()=>{ this.GetAuxiliaryList(listenFormData) }) }}
              />
            </Col>
          </Row>
        </div>
        <div className="data">
          {
            content.map((item,index)=>{
              console.log("item.signName",item.signName);
              return(
                <div className="content" key={index}>
                  <div className="content-title">
                    <Row>
                      <Col span={12}>
                        <p className="content-p">
                          •
                          <span dangerouslySetInnerHTML = {{ __html:item.dName }}></span>
                          /
                          <span dangerouslySetInnerHTML = {{ __html:item.syndromeName }}></span>
                        </p>
                      </Col>
                      <Col span={12}><p className="content-p-three" onClick={()=>{ this.changeInitData(item.dName,item.syndromeName) }}>加入诊断</p></Col>
                    </Row>
                  </div>
                  <div className="content-detail">
                    <TagGroup tagList={item.signName}/>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
