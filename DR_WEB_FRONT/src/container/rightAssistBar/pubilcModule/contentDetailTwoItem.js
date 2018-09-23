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
      isUnfoldAll:false,//是否展开全部
    };
  };
  unfoldAll = (isUnfoldAll) => {
    this.setState({isUnfoldAll:!isUnfoldAll})
  }
  render() {
    var { isUnfoldAll } = this.state;
    const { content } = this.props;
    return (
      <div>
      <div class="content-detail-two-Button">
        <Button>引入</Button>
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
            <div class="content-detail-two-div">
              <p>{index+1}.病情：</p>
              <p>{item.name}</p>
              <p>加减药：</p>
              <p>{item.value}</p>
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
