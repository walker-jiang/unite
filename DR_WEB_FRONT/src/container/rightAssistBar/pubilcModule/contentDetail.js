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
        <div class="content-icon">
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
            <div class="content-detail">
              <p onClick={()=>this.unfold("one",one)}><Icon type={one?"down":"right"}/>主诉：</p>
              <p>{ one?item.one:this.cutOut(item.one) }</p>
              <p onClick={()=>this.unfold("two",two)}><Icon type={two?"down":"right"}/>望诊：</p>
              <p>{ two?item.two:this.cutOut(item.two) }</p>
              <p onClick={()=>this.unfold("three",three)}><Icon type={three?"down":"right"}/>切诊：</p>
              <p>{ three?item.three:this.cutOut(item.three) }</p>
              <p onClick={()=>this.unfold("four",four)}><Icon type={four?"down":"right"}/>体格检查：</p>
              <p>{ four?item.four:this.cutOut(item.four) }</p>
              <p onClick={()=>this.unfold("five",five)}><Icon type={five?"down":"right"}/>诊断：</p>
              <p>{ five?item.five:this.cutOut(item.five) }}</p>
              <p onClick={()=>this.unfold("six",six)}><Icon type={six?"down":"right"}/>XXXX：</p>
              <p>{ six?item.six:this.cutOut(item.six) }}</p>
              <p onClick={()=>this.unfold("seven",seven)}><Icon type={seven?"down":"right"}/>XXXX：</p>
              <p>{ seven?item.seven:this.cutOut(item.seven) }}</p>
              <p onClick={()=>this.unfoldAll(isUnfoldAll)}>查看详细<Icon type={isUnfoldAll?"down":"double-left"} theme="outlined" /></p>
            </div>
            :
            <div class="content-detail">
              <p onClick={()=>this.unfold("one",one)}><Icon type={one?"down":"right"}/>主诉：</p>
              <p>{ one?item.one:this.cutOut(item.one) }</p>
              <p onClick={()=>this.unfold("two",two)}><Icon type={two?"down":"right"}/>望诊：</p>
              <p>{ two?item.two:this.cutOut(item.two) }</p>
              <p onClick={()=>this.unfold("three",three)}><Icon type={three?"down":"right"}/>切诊：</p>
              <p>{ three?item.three:this.cutOut(item.three) }</p>
              <p onClick={()=>this.unfold("four",four)}><Icon type={four?"down":"right"}/>体格检查：</p>
              <p>{ four?item.four:this.cutOut(item.four) }</p>
              <p onClick={()=>this.unfold("five",five)}><Icon type={five?"down":"right"}/>诊断：</p>
              <p>{ five?item.five:this.cutOut(item.five) }}</p>
              <p onClick={()=>this.unfoldAll(isUnfoldAll)}>查看详细<Icon type={isUnfoldAll?"down":"double-left"} theme="outlined" /></p>
            </div>
          )
        }
      </div>
    );
  }
}
