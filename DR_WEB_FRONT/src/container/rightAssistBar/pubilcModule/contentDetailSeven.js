/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
//import './style/rightAssistBar.less';
import SearchTree from './searchTree.js';
const Search = Input.Search;

class ContentOne extends Component {
  constructor(props){
    super(props);
    this.state = {
       isUnfold:false
    }
  }
  // pridepict
  cutOut = (value) =>{
    if(value == "" || value == null){
      return " ";//空格占位
    }else{
      if(value.length > 24){
        return value.substr(0,24)+"...";
      }else{
        return value;
      }
    }
  }
  unfold = (isUnfold) =>{
    this.setState({isUnfold:!this.state.isUnfold});
  }
  render(){
    var value = this.props.oneItem.value;
    var name = this.props.oneItem.name;
    console.log("value=======",value);
    var { isUnfold } = this.state;
    return (
      <div>
      {
        value == "" || value == null
        ?
        null
        :
        <div>
          {
            value.map((item,index)=>{
              return(
                  <p key={index} style={{marginLeft:12}} className="odd" onClick={()=>this.unfold("isUnfold",isUnfold)}>
                    <p style={{fontWeight:700,float:'left'}} onClick={()=>{ this.props.changeInitData(item) }}>{name}{index+1}：</p>
                    <p className="even">{ isUnfold?item.ordercontent:this.cutOut(item.ordercontent) }</p>
                  </p>
              )
            })
          }

        </div>
      }
      </div>
    )
  }
}


class ContentTwo extends Component {
  constructor(props){
    super(props);
    this.state = {
       isUnfold:true
    }
  }
  unfold = (isUnfold) =>{
    this.setState({isUnfold:!this.state.isUnfold});
  }
  render(){
    var { oneItem } = this.props;
    var { isUnfold } = this.state;
    return (
      <div>
        {
          oneItem.value.length == 0?null
          :
          <Icon type={isUnfold?"down":"right"}
            style={{float:'left',marginLeft:-10,color:'#0066CC',fontWeight: 700}}
            onClick={()=>{ this.unfold(isUnfold) }}
          />
        }
        <p className="odd" onClick={()=>{ this.unfold(isUnfold) }}>{oneItem.name}：{oneItem.value.length == 0?"无":null}</p>
        {
          isUnfold
          ?
          <ContentOne oneItem={oneItem} changeInitData={this.props.changeInitData}/>
          :
          null
        }
      </div>
    )
  }
}

class ContentDetailSeven extends Component {
  constructor(props){
    super(props);
    this.state = {
      pridepict:false,
      item:this.props.item,
      unfold:this.props.unfold,
      OneUnfold:false,
      isCut:true,
      isUnfoldAll:false,//是否展开全部
    };
  };
  cut = (isCut) =>{
    console.log("isCut",isCut);
    this.setState({isCut})
  }
  unfoldAll = (isUnfoldAll) => {
    this.setState({isUnfoldAll:!isUnfoldAll})
  }
  pullDown = (unfold) =>{
    console.log("pullDown====================",unfold);
    this.setState({unfold:!unfold});
  }
  render() {
    var { isCut, isUnfoldAll, pridepict, item, unfold, OneUnfold  } = this.state;
    var { item } = this.props;
    console.log("item=====",item);
    return (
      <div>
        <div className="content-icon" style={{marginTop:-52}}>
          <Icon type={unfold?"up":"down"} onClick={()=>{ this.pullDown(unfold) }}/>
        </div>
        {
          !unfold
          ?
          null
          :
          (
            isUnfoldAll
            ?
            <div className="content-detail">
              {
                item.map((item,index)=>{
                  return(
                    <ContentTwo oneItem={item} key={index} changeInitData={this.props.changeInitData}/>
                  )
                })
              }
              <p className="queryDetail" onClick={()=>this.unfoldAll(isUnfoldAll)}>查看详细<Icon type={isUnfoldAll?"down":"double-left"} theme="outlined" /></p>
            </div>
            :
            <div className="content-detail">
              {
                item.length>3
                ?
                item.slice(0,3).map((item,index)=>{
                  return(
                    <ContentTwo oneItem={item} key={index} changeInitData={this.props.changeInitData}/>
                  )
                })
                :
                item.map((item,index)=>{
                  return(
                    <ContentTwo oneItem={item} key={index} changeInitData={this.props.changeInitData}/>
                  )
                })
              }
              <p className="queryDetail" onClick={()=>this.unfoldAll(isUnfoldAll)}>查看详细<Icon type={isUnfoldAll?"down":"double-left"} theme="outlined" /></p>
            </div>
          )
        }
      </div>
    );
  }
}
module.exports = ContentDetailSeven;
