/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import doctorAdviceService from '../service/doctorAdviceService.js';

class ContentDetailTwoItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      isUnfoldAll:false,//是否展开全部
    };
  };
  unfoldAll = (isUnfoldAll) => {
    this.setState({isUnfoldAll:!isUnfoldAll})
  }
  render() {
    var { isUnfoldAll } = this.state;
    const { content } = this.props;
    console.log("临证加减为========",content);
    return (
      <div style={{marginBottom:-18}}>
        <div className="content-detail-two-Button" style={{marginRight:10}}>
          <Button onClick={()=>{ this.props.getcmdrugs(this.props.item) }}>引入</Button>
        </div>
        <span className="content-detail-two-Button-p" onClick={()=>{ this.unfoldAll(isUnfoldAll) }} style={{marginRight:10}}>
          {
            isUnfoldAll
            ?
            <span>收起<Icon type={"down"} theme="outlined" /></span>
            :
            <span>展开<Icon type={"double-left"} theme="outlined" /></span>
          }
        </span>
        <hr/>
        {
          isUnfoldAll
          ?
          <div>
            <Row style={{fontSize:12,fontWeight:700,color:'#0A6ECB',marginLeft:4,marginBottom:2,marginTop:-5}}><Icon type={"right"}/>临证加减（+/-）：</Row>
            <div>
              {content.map((item,index)=>{
                return(
                  <div className="content-detail-two-div" key={index}>
                    <p>{index+1}.病情：</p>
                    <p>{item.severity?item.severity:"无"}</p>
                    <Row>
                      <Col span={20}>
                        <p style={{marginLeft:10}}>加减药：</p>
                        <p>{item.drugNamesList?item.drugNamesList:"无"}</p>
                      </Col>
                      <Col span={4}>
                        <Button style={{marginTop:-5}} onClick={()=>{ this.props.getcmdrugsOne(item) }}>引入</Button>
                      </Col>
                    </Row>
                    <hr className="hr2"/>
                  </div>
                )
              })}
            </div>
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
      drugName:false,
      freqname:false,
      treatname:false,
      therapy:false,
      four:false,
      buImlistEntities:false,
      item:this.props.item,
      unfold:this.props.unfold,
      isCut:true,
      isUnfoldAll:false,//是否展开全部
    };
  };
  cut = (isCut) =>{
    console.log("isCut",isCut);
    this.setState({isCut})
  }
  unfold = (number,isUnfold) =>{
    switch (number) {
      case "drugName":this.setState({drugName:!isUnfold});break;
      case "freqname":this.setState({freqname:!isUnfold});break;
      case "treatname":this.setState({treatname:!isUnfold});break;
      case "therapy":this.setState({therapy:!isUnfold});break;
      case "buImlistEntities":this.setState({buImlistEntities:!isUnfold});break;
      default:this.setState({four:!isUnfold});break;
    }
  }
  unfoldAll = (isUnfoldAll) => {
    this.setState({isUnfoldAll:!isUnfoldAll})
  }
  cutOut = (value) =>{
    //console.log("value=======",value);
    if(value == "" || value == null || JSON.stringify(value) == "undefined" ){
      return "无";//空格占位
    }else{
      if(value.length > 35){
        return value.substr(0,35)+"...";
      }else{
        return value;
      }
    }
  }
  pullDown = (unfold) =>{
    console.log("pullDown====================",unfold);
    this.setState({unfold:!unfold});
  }
  getcmdrugs = () =>{
    var self = this;
    var item = self.props.item;
    item['buImlistEntities'] = [];
    let params = {
      imtreatprelist:JSON.stringify(item),
      bu:self.props.bu
    };
    function callBack(res){
      if(res.flag == 1){
        //alert("草药转换成功==============");
        //* 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
        self.props.changeInitData(res.data,3);
      }else{
        console.log('草药转换失败', res);
      }
    };
    doctorAdviceService.getcmdrugs(params, callBack);
  }
  getcmdrugsOne = (getcmdrugsOne) => {
    var self = this;
    var item = self.props.item;
    console.log("self.props.item=========",self.props.item);
    console.log("getcmdrugsOne=========",getcmdrugsOne);
    //数组组装
    if(item){
      var newArr = [];
      newArr.push(getcmdrugsOne);
      item['buImlistEntities'] = newArr;
      let params = {
        imtreatprelist:JSON.stringify(item),
        bu:self.props.bu
      };
      function callBack(res){
        if(res.flag == 1){
          //alert("草药转换成功==============");
          //* 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
          self.props.changeInitData(res.data,3);
        }else{
          console.log('草药转换失败', res);
        }
      };
      doctorAdviceService.getcmdrugs(params, callBack);
    }
  }
  render() {
    var { isCut, isUnfoldAll, drugName, treatname, therapy, freqname, buImlistEntities, item, unfold  } = this.state;
    console.log("this.props.item====",item.baUsage);
    return (
      <div>
        <div className="content-detail-two" style={{paddingBottom:item.priors == "1"?10:5}}>
          <p onClick={()=>this.unfold("drugName",drugName)}>
            {item.drugName.length>35?<p><Icon type={drugName?"down":"right"}/>主方：</p>:<p style={{marginLeft:15}}>主方：</p>}
          </p>
          <p>{ drugName?(item.drugName == ""?"无":item.drugName):this.cutOut(item.drugName) }</p>
          <p onClick={()=>this.unfold("treatname",treatname)}>
            {
              item.treatname.length>35
              ?
              <p><Icon type={treatname?"down":"right"}/>主治：</p>
              :
              <p style={{marginLeft:15}}>主治：</p>
            }
          </p>
          <p>{ treatname?(item.treatname == ""?"无":item.treatname):this.cutOut(item.treatname) }</p>
          <p onClick={()=>this.unfold("therapy",therapy)}>
            {item.therapy.length>25?<p><Icon type={therapy?"down":"right"}/>治则治法：</p>:<p style={{marginLeft:15}}>治则治法：</p>}
          </p>
          <p>{ therapy?(item.therapy == ""?"无":item.therapy):this.cutOut(item.therapy) }</p>
          <p onClick={()=>this.unfold("freqname",freqname)}>
            {item.freqname && item.freqname.length>25?<p><Icon type={freqname?"down":"right"}/>用法/频次：</p>:<p style={{marginLeft:15}}>用法/频次：</p>}
          </p>
          <p>{item.baUsage?item.baUsage.usagename:"无"}/{item.freqname?item.freqname:"无"}</p>
          {
            item.priors == "1"
            ?
            <ContentDetailTwoItem
              item={item}
              bu={this.props.bu}
              content={item.buImlistEntities}
              changeInitData={this.props.changeInitData}
              getcmdrugs = {this.getcmdrugs}
              getcmdrugsOne = {this.getcmdrugsOne}
            />
            :
            <div style={{fontSize:12}}>
              <div className="content-detail-two-Button" style={{marginTop:-24,marginRight:10}}>
                <Button onClick={()=>{ this.getcmdrugs(item) }}>引入</Button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
