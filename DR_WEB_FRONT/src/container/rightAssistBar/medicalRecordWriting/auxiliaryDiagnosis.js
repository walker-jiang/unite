/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏----辅助诊断
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import './style/rightAssistBar.less';
import TagGroup from '../pubilcModule/tag.js';
import ADModal from './aDModal.js';
import medicalRWService from '../service/medicalRWService.js';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import zanwunerong from './style/zanwunerong.png';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    console.log("this.props.listenFormData===",this.props.listenFormData);
    this.state = {
      content:[],
      visible:false,
      syndromeName:"",//当前西医疾病数据
      tagList:["头晕","恶心","流清鼻","浑身无力","发烧"],
      isCut:true,
      seachValue:"",//搜索条件
      listenFormData:
        this.props.type == "1"
        ?
        this.props.listenFormData:
        {
          pridepict:"",
          inspection:"",
          palpation:"",
          smelling:"",
          hpi:"",
        },
    };
  };
  componentWillMount(){
    var { listenFormData } = this.state;
    this.GetAuxiliaryList(listenFormData);
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
      //Modal.warning({title:"中医诊断为空",content:"请选择一个中医诊断"});
      console.log("手动选择一个中医诊断");
      self.setState({ visible:true });
    }else if(syndromeName == ""){
      Modal.warning({title:"证候为空",content:"请选择一个证候"});
    }else{
      self.setState({ syndromeName:syndromeName },()=>{
        self.QueryDiseaseList(dName);
      });
    }
  }
  changeDate = (item) => {
    this.setState({ syndromeName:item.disname },()=>{
      this.QueryDiseaseList(item.disname);
    });
    this.closeModal();
  }
  /**
   * 获取中医疾病对象
   * @method QueryDiseaseList
   */
  QueryDiseaseList = (dName) => {
    var self = this;
    var syndromeName = this.state.syndromeName;
    var params = {
      keyword:this.repalceHtml(dName)
    }
    function callBack(res){
      if(res.result && res.data){
        if(res.data.length !=0){
          console.log("获取中医疾病对象成功==============",res.data[0]);
          self.getIllData(syndromeName,res.data[0].diseaseid,res.data[0]);
        }else{
          alert('获取中医疾病对象为空', res);
        }
      }else{
        console.log('获取中医疾病对象失败', res);
      }
    };
    medicalRWService.QueryDiseaseList(params, callBack);
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
        console.log("获取症候对象成功==============",res);
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
          if(self.props.type == "1"){ // 1代表是诊疗系统引入  2代表是辩证论治引入
            self.props.changeInitDataTwo(newItem);
          }else{
            var symptom = newItem.buDiagnosisList[0];
            var manifestation = newItem.buDiagnosisList[0].buDiagnosisDismainfList;
            console.log("symptom====",symptom);
            console.log("manifestation====",manifestation);
            self.props.changeInitDataTwo( symptom, manifestation );
          }
        }else{
          alert("获取症候对象为空，该条数据错误，请联系管理员检查数据");
        }
      }else{
        console.log('获取症候对象对象失败', res);
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
      current:1,
      pageSize:10
    }
    function callBack(res){
      if(res.flag == 1 && res.data){
        if(res.data instanceof Array){
          console.log("获取辅助诊断列表成功==============",res);
          self.setState({
            content:res.data
          })
        }
      }else{
        console.log('获取辅助诊断列表失败', res);
      }
    };
    medicalRWService.GetAuxiliaryList(params, callBack);
  }
  closeModal =() => {
    this.setState({ visible: false });
  }
  render() {
    var { content, isCut, listenFormData, visible } = this.state;
    console.log("content=======",content);
    console.log("!!visible=======",visible);
    return (
      <div>
        <ADModal
          changeDate ={this.changeDate}
          closeModal={this.closeModal}
          visible={visible}
        />
        <div className="rightAssistBar_template" style={this.props.type == "1"?{}:{width:408,height:'100%'}}>
          <div className="tab">
            <Row>
              <Col span={24}>
                <center>
                  <Search
                    style={this.props.type == "1"?{}:{width:"90%"}}
                    placeholder={this.props.type == "1"?"请输入模板名称或症状快速查询":"请输入症候和症状快速查询"}
                    onSearch={value => { this.setState({ seachValue:value },()=>{ this.GetAuxiliaryList(listenFormData) }) }}
                  />
                </center>
              </Col>
            </Row>
          </div>
          <div className="data" style={{backgroundColor:'#F2F2F2'}}>
            {
              content && content.length !=0
              ?
              content.map((item,index)=>{
                return(
                  <div className="content" key={index} style={{marginBottom:10}}>
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
                        <Col span={12}>
                          <p
                            className="content-p-three"
                            style={this.props.type == "1"?{color:'#0A6ECB'}:{color:'#0A6ECB',marginRight:20}}
                            onClick={()=>{ this.changeInitData(item.dName,item.syndromeName) }}
                          >
                            加入诊断
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div className="content-detail">
                      <TagGroup tagList={item.signName}/>
                    </div>
                  </div>
                )
              })
              :
              <center style={{marginTop:50}}><img src={zanwunerong} style={{width:160}}/><br/><br/>暂无数据</center>
            }
          </div>
        </div>
      </div>
    );
  }
}
