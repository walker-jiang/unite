/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import doctorAdviceService from '../service/doctorAdviceService.js';

class ContentDetailFiveItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      isUnfoldAll:false,//是否展开全部
    };
  };
  unfoldAll = (isUnfoldAll) => {
    this.setState({isUnfoldAll:!isUnfoldAll})
  }
  addPrescription = (item) => {
    console.log("item===============",item);
    var self = this;
    //JSON.stringify(JSON.parse(this.props.bu).buPatientCase)
    if(this.props.bu){
      let params = {
        "tzVnCmtreatment":JSON.stringify(item.tzVnCmtreatment),
        "sinomedicineList":JSON.stringify(item.sinomedicineList),
        "bu":this.props.bu
      };
      function callBack(res){
        if(res.result && res.result){
          //* 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
          self.props.changeInitData(res.data,3);
        }else{
          alert('名医医案转换失败', res);
        }
      };
      doctorAdviceService.addPrescription(params, callBack);
    }else{
      alert("病历信息为空，请检查数据项");
    }
  }
  render() {
    var { isUnfoldAll } = this.state;
    const { content } = this.props;
    console.log("@@@@@@@@@@@@",content);
    return (
      <div>
      <span className="content-detail-five-Button-p" onClick={()=>{ this.unfoldAll(isUnfoldAll) }}>
        展开病案<Icon type={isUnfoldAll?"down":"double-left"} theme="outlined" />
      </span>
      {
        isUnfoldAll
        ?
        <div>
          <hr className="hr1"/>
          <p>&nbsp;</p>
          {
            content.map((item,index)=>{
              return(
                  <div key={index}>
                    <p><Icon type="right"/>病案信息{index+1}：</p>
                    <p>&nbsp;</p>
                    <p>患者:</p>
                    <p>{item.tzMedicalcaseDetail.patientname} / {item.tzMedicalcaseDetail.patientsex == 0?"男":"女"} / {item.tzMedicalcaseDetail.patientage}岁</p>
                    <p>中医诊断：</p>
                    <p>{item.tzMedicalcaseDetail.chinesediagnosis}
                      <span style={{color: '#0066CC',fontWeight: 700}}>&nbsp;&nbsp;&nbsp;西医诊断：</span>
                      {item.tzMedicalcaseDetail.westerndiagnosis == null ?"无":item.tzMedicalcaseDetail.westerndiagnosis}
                    </p>
                    <p>诊次信息（共{item.visitsnumList.length}次）：</p>
                    <p>&nbsp;</p>
                    {
                      item.visitsnumList.map((j,k)=>{
                        var desc = "";
                        j.symptomsignList.forEach((a,b)=>{
                          if(desc = ""){
                            desc = a.symptom;
                          }else{
                            desc = desc+";"+a.symptom;
                          }
                        })
                        return(
                          <div className="content-detail-Five-div" key={k}>
                            <p><Icon style={{fontSize:14,marginRight:5}} type="right-circle" theme="outlined" />{j.tzVisitsnum.visitsnum == 1?"初诊":"复诊"}：</p>
                            <p>{desc}</p>
                            <div style={{marginLeft:55}}>
                              {
                                j.cmtreatmentList.map((a,b)=>{
                                  var sinomedicinedesc = "";
                                  a.sinomedicineList.forEach((c,d)=>{
                                    if(sinomedicinedesc == ""){
                                      sinomedicinedesc = c.medicinename+c.dose+c.doseunit;
                                    }else{
                                      sinomedicinedesc = sinomedicinedesc+","+c.medicinename+c.dose+c.doseunit;
                                    }
                                  })
                                  return(
                                    <div key={b}>
                                      <p>{b+1}.中药处方：</p>
                                      <p>{sinomedicinedesc}</p>
                                      <p style={{marginLeft:10}}>
                                        用法/频次/付数：{a.usagemethod == null?"无":a.usagemethod}
                                        /{a.frequency == null?"无":a.frequency}
                                        /{a.counum == null?"无":a.counum}
                                      </p>
                                      <Button
                                        style={{float:'right',marginRight:10,height:20,lineHeight:1,marginTop:1}}
                                        onClick={()=>{ this.addPrescription(a) }}
                                      >
                                        引入
                                      </Button>
                                    </div>
                                  )
                                })
                              }
                            </div>
                            <hr className="hr2"/>
                          </div>
                        )
                      })
                    }
                  </div>
              )
            })
          }
        </div>
        :
        null
      }
      </div>

    );
  }
}


export default class ContentDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      one:false,
      name:false,
      three:false,
      company:false,
      five:false,
      six:false,
      item:this.props.item,
      unfold:this.props.unfold,
      isCut:true,
      isUnfoldAll:false,//是否展开全部
    };
  };
  componentWillMount(){

  }
  cut = (isCut) =>{
    console.log("isCut",isCut);
    this.setState({isCut})
  }
  unfold = (number,isUnfold) =>{
    switch (number) {
      case "one":this.setState({one:!isUnfold});break;
      case "name":this.setState({name:!isUnfold});break;
      case "three":this.setState({three:!isUnfold});break;
      case "company":this.setState({company:!isUnfold});break;
      case "five":this.setState({five:!isUnfold});break;
      case "six":this.setState({six:!isUnfold});break;
      default:this.setState({seven:!isUnfold});break;
    }
  }
  unfoldAll = (isUnfoldAll) => {
    this.setState({isUnfoldAll:!isUnfoldAll})
  }
  cutOut = (value) =>{
    //console.log("value=======",value);
    if(value == "" || value == null || JSON.stringify(value) == "undefined" ){
      return " ";//空格占位
    }else{
      if(value.length > 24){
        return value.substr(0,24)+"...";
      }else{
        return value;
      }
    }
  }
  pullDown = (unfold) =>{
    console.log("pullDown====================",unfold);
    this.setState({unfold:!unfold});
  }
  render() {
    var { isCut, isUnfoldAll, one, name, company, five, six, seven, item, unfold  } = this.state;
    var isauthor;
    var oldIsauthor = item.tm_DetailAndDoctor.doctorList[0].isauthor;
    console.log("oldIsauthor",oldIsauthor);
    if(oldIsauthor != null && typeof(oldIsauthor) == "undefined"){
      if(oldIsauthor == 0){
        isauthor = "是";
      }else{
        isauthor = "否";
      }
    }else{
      isauthor = "未知";
    }
    console.log("##############",item);
    return (
      <div>
        <div className="content-detail-two">
          <p onClick={()=>this.unfold("one",one)}><Icon type={one?"down":"right"}/>名医信息</p>
          <p>&nbsp;</p>
          <p onClick={()=>this.unfold("name",name)}><Icon type={name?"down":"right"}/>名医姓名：</p>
          <p>{ name?item.tm_DetailAndDoctor.doctorList[0].name:this.cutOut(item.tm_DetailAndDoctor.doctorList[0].name) }   |   医生是否作者：{isauthor}</p>
          <p onClick={()=>this.unfold("company",company)}><Icon type={company?"down":"right"}/>所在单位：</p>
          <p>{ company?item.tm_DetailAndDoctor.doctorList[0].company:this.cutOut(item.tm_DetailAndDoctor.doctorList[0].company) }</p>
          <ContentDetailFiveItem
            bu={this.props.bu}
            content={item.tm_DetailAndDoctor.detailList}
            item={this.props.item}
            changeInitData={this.props.changeInitData}
          />
        </div>
      </div>
    );
  }
}
