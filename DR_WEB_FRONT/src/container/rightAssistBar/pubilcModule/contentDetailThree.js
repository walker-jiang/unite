/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import doctorAdviceService from '../service/doctorAdviceService.js';
import TipModal from 'components/dr/modal/tip';
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
      if(value.length > 26){
        return value.substr(0,26)+"...";
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
        //alert("中成药转换成功==============");
        //* 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
        self.props.changeInitData(res.data,4);
      }else{
        self.tipModal.showModal({
          content: '中成药引入失败'
        });
      }
    };
    doctorAdviceService.getCpm(params, callBack);
  }
  render() {
    var { isCut, isUnfoldAll, drugName, treatname, therapy, four, five, six, seven, item, unfold  } = this.state;
    return (
      <div>
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        <div className="content-detail-two">
          <div>
            <span onClick={()=>this.unfold("drugName",drugName)} className="left">
              {item.drugName && item.drugName.length>26?<span style={{fontWeight:600,marginLeft:3}}><Icon type={drugName?"down":"right"}/>成分：</span>:<span style={{fontWeight:600,marginLeft:15}}>成分：</span>}
            </span>
            <span className="right">{ drugName?item.drugName:this.cutOut(item.drugName) }</span>
          </div>
          <div>
            <span onClick={()=>this.unfold("treatname",treatname)} className="left">
              {item.treatname && item.treatname.length>26?<span style={{fontWeight:600,marginLeft:3}}><Icon type={treatname?"down":"right"}/>主治：</span>:<span style={{fontWeight:600,marginLeft:15}}>主治：</span>}
            </span>
            <span className="right">{ treatname?item.treatname:this.cutOut(item.treatname) }</span>
          </div>
          <div>
            <span onClick={()=>this.unfold("therapy",therapy)} className="left">
              {item.therapy && item.therapy.length>26?<span style={{fontWeight:600,marginLeft:3}}><Icon type={therapy?"down":"right"}/>治则治法：</span>:<span style={{fontWeight:600,marginLeft:15}}>治则治法：</span>}
            </span>
            <span className="right">{ therapy?item.therapy:this.cutOut(item.therapy) }</span>
          </div>
        </div>
        <div className="content-detail-two-Button">
          <Button style={{marginTop:20}} onClick={()=>{ this.getCpm(this.props.item) }}>引入</Button>
        </div>
      </div>
    );
  }
}
