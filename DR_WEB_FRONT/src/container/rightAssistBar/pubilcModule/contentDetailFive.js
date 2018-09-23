/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
//import './style/rightAssistBar.less';
import SearchTree from './searchTree.js';
import ContentDetailFiveItem from './contentDetailFiveItem.js';

const Search = Input.Search;

export default class ContentDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      one:false,
      two:false,
      three:false,
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
      case "two":this.setState({two:!isUnfold});break;
      case "three":this.setState({three:!isUnfold});break;
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
    if(value.length > 24){
      return value.substr(0,24)+"...";
    }else{
      return value;
    }
  }
  pullDown = (unfold) =>{
    console.log("pullDown====================",unfold);
    this.setState({unfold:!unfold});
  }
  render() {
    var { isCut, isUnfoldAll, one, two, three, four, five, six, seven, item, unfold  } = this.state;
    return (
      <div>
        <div class="content-detail-two">
          <p onClick={()=>this.unfold("one",one)}><Icon type={one?"down":"right"}/>名医信息</p>
          <p>&nbsp;</p>
          <p onClick={()=>this.unfold("two",two)}><Icon type={two?"down":"right"}/>名医姓名：</p>
          <p>{ two?item.two:this.cutOut(item.two) }</p>
          <p onClick={()=>this.unfold("three",three)}><Icon type={three?"down":"right"}/>所在单位：</p>
          <p>{ four?item.four:this.cutOut(item.four) }</p>
          <ContentDetailFiveItem content={item.five}/>
        </div>
      </div>
    );
  }
}
