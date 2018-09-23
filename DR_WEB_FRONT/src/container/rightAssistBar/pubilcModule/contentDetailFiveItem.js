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
      <span class="content-detail-five-Button-p" onClick={()=>{ this.unfoldAll(isUnfoldAll) }}>
        展开病案<Icon type={isUnfoldAll?"down":"double-left"} theme="outlined" />
      </span>
      {
        isUnfoldAll
        ?
        <div>
          <hr class="hr1"/>
          <p>&nbsp;</p>
          <p><Icon type="right"/>病案信息：</p>
          <p>&nbsp;</p>
          <p>患者:</p>
          <p>张东临 / 男 / 45岁</p>
          <p>中医诊断：</p>
          <p>感冒/风寒感冒  西医诊断：上呼吸道感染</p>
          <p>诊次信息（共2次）：</p>
          <p>&nbsp;</p>
          {
            content.map((item,index)=>{
              return(
                <div class="content-detail-Five-div">
                  <p><Icon style={{fontSize:14,marginRight:5}} type="right-circle" theme="outlined" />初诊：</p>
                  <p>患者语言欠清；喉中痰鸣，鼻涕不止，大便干；舌苔白厚；脉弦硬，80次/分。</p>
                  <div style={{marginLeft:55}}>
                    <p>1.中药处方：</p>
                    <p>生地5g，山药3g，丹皮3g，寸冬3g，陈皮3g，云苓3g</p>
                    <p style={{marginLeft:10}}>用法/频次/付数：口服/每天2次/3付</p>
                  </div>
                  <Button style={{float:'right',marginRight:10,height:20,lineHeight:1,marginTop:1}}>引入</Button>
                  <hr class="hr2"/>
                </div>
              )
            })
          }
        </div>
        :
        null
      }
      </div>

    );
  }
}
