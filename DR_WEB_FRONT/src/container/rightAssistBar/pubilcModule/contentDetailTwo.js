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
  getcmdrugs = () =>{
    var self = this;
    let params = {
      imtreatprelist:JSON.stringify(this.props.item),
      bu:this.props.bu
    };
    function callBack(res){
      if(res.flag == 1){
        alert("草药转换成功==============");
        self.setState({ dataSource:res.data });
      }else{
        console.log('草药转换失败', res);
      }
    };
    doctorAdviceService.getcmdrugs(params, callBack);
  }
  render() {
    var { isUnfoldAll } = this.state;
    const { content } = this.props;
    console.log("临证加减为========",content);
    return (
      <div>
      <div class="content-detail-two-Button">
        <Button onClick={()=>{ this.getcmdrugs(this.props.item) }}>引入</Button>
      </div>
      <span class="content-detail-two-Button-p" onClick={()=>{ this.unfoldAll(isUnfoldAll) }}>
        收起<Icon type={isUnfoldAll?"down":"double-left"} theme="outlined" />
      </span>
      <hr/>
      {
        isUnfoldAll
        ?
        content.map((item,index)=>{
          return(
            <div class="content-detail-two-div" key={index}>
              <p>{index+1}.病情：</p>
              <p>{item.severity}</p>
              <p>加减药：</p>
              <p>{item.drugNamesList}</p>
              <hr class="hr2"/>
            </div>
          )
        })
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
    var { isCut, isUnfoldAll, drugName, treatname, therapy, four, buImlistEntities, item, unfold  } = this.state;
    //console.log("this.props.item====",this.props.item);
    return (
      <div>
        <div class="content-detail-two">
          <p onClick={()=>this.unfold("drugName",drugName)}><Icon type={drugName?"down":"right"}/>主方：</p>
          <p>{ drugName?item.drugName:this.cutOut(item.drugName) }</p>
          <p onClick={()=>this.unfold("treatname",treatname)}><Icon type={treatname?"down":"right"}/>主治：</p>
          <p>{ treatname?item.treatname:this.cutOut(item.treatname) }</p>
          <p onClick={()=>this.unfold("therapy",therapy)}><Icon type={therapy?"down":"right"}/>治则治法：</p>
          <p>{ therapy?item.therapy:this.cutOut(item.therapy) }</p>
          {/*
            <p onClick={()=>this.unfold("four",four)}><Icon type={four?"down":"right"}/>用法/频次：</p>
            <p>{ four?item.four:this.cutOut(item.four) }</p>
          */}
          <p onClick={()=>this.unfold("buImlistEntities",buImlistEntities)}><Icon type={buImlistEntities?"down":"right"}/> 临证加减（+/-）：</p>
          {
            item.priors == "1"
            ?
            <ContentDetailTwoItem item={item} bu={this.props.bu} content={item.buImlistEntities}/>
            :
            <p style={{fontSize:12}}>无</p>
          }
        </div>
      </div>
    );
  }
}
