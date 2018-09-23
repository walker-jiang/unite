/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏------医嘱-----医嘱模板
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import '../medicalRecordWriting/style/rightAssistBar.less';
import SearchTree from '../pubilcModule/searchTree.js';
import ContentDetailSix from '../pubilcModule/contentDetailSix.js';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"金银花（10g）、柴胡（10g）、栀子（20g）、枸杞（10g）、党参（10g）、黄芪（20g）",
          two:{
            name:"金银花（10g）、柴胡（10g）、栀子（20g）、枸杞（10g）、党参（10g）、黄芪（20g）",
            usage:"煎服 / 付数：2付",
            frequency:"1日2次"
          },
          three:"金银花（10g）、柴胡（10g）、栀子（20g）、枸杞（10g）、党参（10g）、黄芪（20g）",
          four:"金银花（10g）、柴胡（10g）、栀子（20g）、枸杞（10g）、党参（10g）、黄芪（20g）",
          five:"风寒侵袭症",
        },
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"金银花（10g）、柴胡（10g）、栀子（20g）、枸杞（10g）、党参（10g）、黄芪（20g）",
          two:{
            name:"金银花（10g）、柴胡（10g）、栀子（20g）、枸杞（10g）、党参（10g）、黄芪（20g）",
            usage:"煎服 / 付数：2付",
            frequency:"1日2次"
          },
          three:"金银花（10g）、柴胡（10g）、栀子（20g）、枸杞（10g）、党参（10g）、黄芪（20g）",
          four:"金银花（10g）、柴胡（10g）、栀子（20g）、枸杞（10g）、党参（10g）、黄芪（20g）",
          five:"风寒侵袭症",
        },
      ],
      isCut:true,
      unfold:false
    };
  };
  componentWillMount(){

  }
  cut = (isCut) =>{
    console.log("isCut",isCut);
    this.setState({isCut})
  }
  unfold = (unfold) =>{
    this.setState({unfold:!unfold});
  }
  render() {
    var { content, isCut, unfold } = this.state;
    return (
      <div class="rightAssistBar_template">
        <div class="tab">
          <Row>
            <Col span={4}>
              <Icon type="bars" onClick={()=>{ this.cut(true) }}/>
              <Icon type="bars" onClick={()=>{ this.cut(false) }}/>
            </Col>
            <Col span={20}>
              <Search
                placeholder="请输入模板名称或症状快速查询"
                onSearch={value => console.log(value)}
              />
            </Col>
          </Row>
        </div>
        <div class="data">
          {
            isCut
            ?
            content.map((item,index)=>{
              return(
                <div class="content">
                  <div class="content-title">
                    <Row>
                      <Col span={12}><p class="content-p">{item.title}</p></Col>
                      <Col span={4}><p class="content-p-two">• 院方模板</p></Col>
                      <Col span={8}>
                        <Button>引入模板</Button>
                        <Divider type="vertical" />
                      </Col>
                    </Row>
                  </div>
                  <ContentDetailSix item={item} unfold={unfold}/>
                </div>
              )
            })
            :
            <div><SearchTree/></div>
          }
        </div>
      </div>
    );
  }
}
