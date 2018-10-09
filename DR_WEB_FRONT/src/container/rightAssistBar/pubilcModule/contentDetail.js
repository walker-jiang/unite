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
    var name = this.props.oneItem.name;
    var value = this.props.oneItem.value;
    var { isUnfold } = this.state;
    return (
      <div>
      {
        value == "" || value == null
        ?
        null
        :
        <div>
          <p className="odd" onClick={()=>this.unfold("isUnfold",isUnfold)}>
            {
              value.length > 24
              ?
              <Icon type={isUnfold?"down":"right"} style={{float:'left',marginLeft:-15}}/>
              :
              null
            }
            <p style={{fontWeight:700,float:'left'}}>{name}：</p>
            <p className="even">{ isUnfold?value:this.cutOut(value) }</p>
          </p>
        </div>
      }
      </div>
    )
  }
}

class ContentDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      pridepict:false,
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
  unfoldAll = (isUnfoldAll) => {
    this.setState({isUnfoldAll:!isUnfoldAll})
  }
  pullDown = (unfold) =>{
    console.log("pullDown====================",unfold);
    this.setState({unfold:!unfold});
  }
  render() {
    var { isCut, isUnfoldAll, pridepict, item, unfold  } = this.state;
    console.log("item@@@@@@@",item);
    return (
      <div>
        <div className="content-icon">
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
                    <ContentOne oneItem={item} key={index}/>
                  )
                })
              }
              <p className="queryDetail" onClick={()=>this.unfoldAll(isUnfoldAll)}>查看详细<Icon type={isUnfoldAll?"down":"double-left"} theme="outlined" /></p>
            </div>
            :
            <div className="content-detail">
              {
                item.slice(0,6).map((item,index)=>{
                  return(
                    <ContentOne oneItem={item}/>
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
module.exports = ContentDetail;
