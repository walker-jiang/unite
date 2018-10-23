/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import doctorAdviceService from '../service/doctorAdviceService.js';
import SearchTree from './searchTree.js';

const Search = Input.Search;

export default class ContentDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      drugName:false,
      treatname:false,
      therapy:false,
      four:false,
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
      case "drugName":this.setState({drugName:!isUnfold});break;
      case "treatname":this.setState({treatname:!isUnfold});break;
      case "therapy":this.setState({therapy:!isUnfold});break;
      case "four":this.setState({four:!isUnfold});break;
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
      return "无";//空格占位
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
  getCpm = () =>{
    var self = this;
    let params = {
      imtreatprelist:JSON.stringify(this.props.item),
      bu:this.props.bu
    };
    function callBack(res){
      if(res.flag == 1){
        //alert("中药转换成功==============");
        //* 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
        self.props.changeInitData(res.data,4);
      }else{
        console.log('中药转换失败', res);
      }
    };
    doctorAdviceService.getCpm(params, callBack);
  }
  render() {
    var { isCut, isUnfoldAll, drugName, treatname, therapy, four, five, six, seven, item, unfold  } = this.state;
    return (
      <div>
        <div className="content-detail-two">
          <p onClick={()=>this.unfold("drugName",drugName)}><Icon type={drugName?"down":"right"}/>成分：</p>
          <p>{ drugName?item.drugName:this.cutOut(item.drugName) }</p>
          <p onClick={()=>this.unfold("treatname",treatname)}><Icon type={treatname?"down":"right"}/>主治：</p>
          <p>{ treatname?item.treatname:this.cutOut(item.treatname) }</p>
          <p onClick={()=>this.unfold("therapy",therapy)}><Icon type={therapy?"down":"right"}/>治则治法：</p>
          <p>{ therapy?item.therapy:this.cutOut(item.therapy) }</p>
        </div>
        <div className="content-detail-two-Button">
          <Button style={{marginTop:20}} onClick={()=>{ this.getCpm(this.props.item) }}>引入</Button>
        </div>
      </div>
    );
  }
}
