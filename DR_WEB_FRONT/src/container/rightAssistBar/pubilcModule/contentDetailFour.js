/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';

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
      <div style={{paddingBottom:-25}}>
        <div className="content-detail-two-Button">
          <Button onClick={()=>{ this.props.getSt(this.props.item) }}>引入</Button>
        </div>
        <span className="content-detail-two-Button-p" onClick={()=>{ this.unfoldAll(isUnfoldAll) }}>
          收起<Icon type={isUnfoldAll?"down":"double-left"} theme="outlined" />
        </span>
        <hr/>
        {
          isUnfoldAll
          ?
          content.map((item,index)=>{
            return(
              <div className="content-detail-two-div" key={index}>
                <p>{index+1}.病情：</p>
                <p>{item.symptom}</p>
                <p>加减药：</p>
                <p>{item.info}</p>
                <hr className="hr2"/>
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
      one:false,
      treatname:false,
      attention:false,
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
      case "one":this.setState({one:!isUnfold});break;
      case "treatname":this.setState({treatname:!isUnfold});break;
      case "attention":this.setState({attention:!isUnfold});break;
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
  cutOutTwo = (value) =>{
    //console.log("value=======",value);
    if(value == "" || value == null || JSON.stringify(value) == "undefined" ){
      return "无";//空格占位
    }else{
      if(value.length > 18){
        return value.substr(0,18)+"...";
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
    var { isCut, isUnfoldAll, one, treatname, attention, four, five, six, seven, item, unfold  } = this.state;
    return (
      <div>
        <div className="content-detail-two" style={{paddingBottom:25}}>
          <p onClick={()=>this.unfold("one",one)}><Icon type={one?"down":"right"}/>取穴/部位：</p>
          <p>{ one?(item.one == ""?"无":item.one):this.cutOut(item.one) }</p>
          <p onClick={()=>this.unfold("treatname",treatname)}><Icon type={treatname?"down":"right"}/>主治：</p>
          <p>{ treatname?(item.treatname == ""?"无":item.treatname):this.cutOut(item.treatname) }</p>
          <p onClick={()=>this.unfold("attention",attention)}><Icon type={attention?"down":"right"}/>操作方法：</p>
          <p>{ attention?(item.attention == ""?"无":item.attention):this.cutOutTwo(item.attention) }</p>
          <p onClick={()=>this.unfold("five",five)}><Icon type={five?"down":"right"}/> 临证加减（+/-）：</p>
          {
            item.priors == "1"
            ?
            <ContentDetailTwoItem getSt ={this.props.getSt} item={item} bu={this.props.bu} content={item.buMatchingAcupoints}/>
            :
            <div style={{fontSize:12}}>
              <p style={{color:'#333333',fontWeight:500}}>无</p>
              <div className="content-detail-two-Button">
                <Button onClick={()=>{ this.props.getSt(item) }}>引入</Button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
