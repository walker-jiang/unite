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
    var { content } = this.props;
    console.log("content=====!!",content);
    console.log("临证加减为========",content instanceof Array);
    if(content instanceof Array){}else{
      var newArr = [];
      newArr.push(content);
      content = newArr;
    }
    console.log("content=====数组",content);
    return (
      <div style={{paddingBottom:-20}}>
        <div className="content-detail-two-Button">
          <Button style={{marginTop:isUnfoldAll?-58:-45}} onClick={()=>{ this.props.getSt(this.props.item) }}>引入</Button>
        </div>
        <span className="content-detail-two-Button-p" style={{marginTop:isUnfoldAll?-28:-22,marginRight:5}} onClick={()=>{ this.unfoldAll(isUnfoldAll) }}>
          {
            isUnfoldAll
            ?
            <span>收起<Icon type={"down"} theme="outlined"/></span>
            :
            <span>展开<Icon type={"double-left"} theme="outlined" /></span>
          }
        </span>
        { isUnfoldAll?<hr/>:null }
        {
          isUnfoldAll
          ?
          <div>
            <Row style={{fontSize:12,fontWeight:700,color:'#0A6ECB',marginLeft:4,marginBottom:2,marginTop:-5}}><Icon type={"right"}/>临证加减（+/-）：</Row>
            <div>
              {
                content.map((item,index)=>{
                  return(
                    <div className="content-detail-two-div" key={index}>
                      <p>{index+1}.病情：</p>
                      <p>{item.symptom?item.symptom:"无"}</p>
                      <Row>
                        <Col span={20}>
                          <p>加减药：</p>
                          <p>{item.info?item.info:"无"}</p>
                        </Col>
                        <Col span={4}>
                          <Button style={{marginTop:-5}} onClick={()=>{ this.props.getStOne(this.props.item,item) }}>引入</Button>
                        </Col>
                      </Row>
                      <hr className="hr2"/>
                    </div>
                  )
                })
              }
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
        <div className="content-detail-two" style={{paddingBottom:item.priors == "1"?5:5}}>
          <p onClick={()=>this.unfold("one",one)}>
            {item.one && item.one.length>18?<p style={{marginLeft:3}}><Icon type={one?"down":"right"}/>取穴/部位：</p>:<p style={{marginLeft:15}}>取穴/部位：</p>}
          </p>
          <p>{ one?(item.one == ""?"无":item.one):this.cutOut(item.one) }</p>
          <p onClick={()=>this.unfold("treatname",treatname)}>
            {item.treatname && item.treatname.length>18?<p style={{marginLeft:3}}><Icon type={treatname?"down":"right"}/>主治：</p>:<p style={{marginLeft:15}}>主治：</p>}
          </p>
          <p>{ treatname?(item.treatname == ""?"无":item.treatname):this.cutOut(item.treatname) }</p>
          <p onClick={()=>this.unfold("attention",attention)}>
            {item.attention && item.attention.length>18?<p style={{marginLeft:3}}><Icon type={attention?"down":"right"}/>操作方法：</p>:<p style={{marginLeft:15}}>操作方法：</p>}
          </p>
          <p style={{marginRight:64}}>{ attention?(item.attention == ""?"无":item.attention):this.cutOutTwo(item.attention) }</p>
          {
            item.priors == "1"
            ?
            <ContentDetailTwoItem getStOne={this.props.getStOne} getSt ={this.props.getSt} item={item} bu={this.props.bu} content={item.buMatchingAcupoints}/>
            :
            <div style={{fontSize:12}}>
              <div className="content-detail-two-Button" style={{marginTop:-24,marginRight:10}}>
                <Button onClick={()=>{ this.props.getSt(item) }}>引入</Button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
