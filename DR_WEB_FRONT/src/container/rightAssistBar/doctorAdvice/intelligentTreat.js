/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs,   } from 'antd';
import AppropriateTechnology from './content/appropriateTechnology.js';
import ChineseMedicine from './content/chineseMedicine.js';
import Prescription from './content/prescription.js';
import Consilia from './content/consilia.js';
import './style/doctorAdvice.less';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 1,
    };
  };
  componentWillMount(){

  }

  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <div class="intelligentTreat">
        <div class="intelligentTreat_Tabs">
          <Tabs onChange={this.callback} tabBarGutter={12} type="card" >
            <TabPane tab="方剂" key="1"><Prescription/></TabPane>
            <TabPane tab="中成药" key="2"><ChineseMedicine/></TabPane>
            <TabPane tab="中医适宜技术" key="3"><AppropriateTechnology/></TabPane>
            <TabPane tab="名医医案" key="4"><Consilia/></TabPane>
          </Tabs>
        </div>
        {/*<div>
          <p>金银花主方(有临证加减)</p>
          <p>匹配指数:<Rate value="5" disabled style={{}}/></p>
        </div>*/}
      </div>
    );
  }
}
