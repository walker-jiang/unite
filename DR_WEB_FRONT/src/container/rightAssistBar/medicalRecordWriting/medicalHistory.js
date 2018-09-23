/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----历史模板
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import './style/rightAssistBar.less';
import ContentDetail from '../pubilcModule/contentDetail.js';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {

      content:[
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"头晕、发烧、头痛、四肢无力、流清鼻涕、嗓子疼、浑身发冷、四肢无力、流清鼻涕、嗓子疼、浑身发冷",
          two:"舌苔（薄）；舌质（白）",
          three:"左（浮、紧）；右（浮、紧）",
          four:"扁桃体肿大",
          five:"风寒侵袭症",
          six:"风寒侵袭症XXXXXX",
          seven:"风寒侵袭症XXXXXXXXXXXXXXXXXXX",
        },
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"头晕、发烧、头痛、四肢无力、流清鼻涕、嗓子疼、浑身发冷、四肢无力、流清鼻涕、嗓子疼、浑身发冷",
          two:"舌苔（薄）；舌质（白）",
          three:"左（浮、紧）；右（浮、紧）",
          four:"扁桃体肿大",
          five:"风寒侵袭症",
          six:"风寒侵袭症XXXXXX",
          seven:"风寒侵袭症XXXXXXXXXXXXXXXXXXX",
        },
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"头晕、发烧、头痛、四肢无力、流清鼻涕、嗓子疼、浑身发冷、四肢无力、流清鼻涕、嗓子疼、浑身发冷",
          two:"舌苔（薄）；舌质（白）",
          three:"左（浮、紧）；右（浮、紧）",
          four:"扁桃体肿大",
          five:"风寒侵袭症",
          six:"风寒侵袭症XXXXXX",
          seven:"风寒侵袭症XXXXXXXXXXXXXXXXXXX",
        },
      ],
      unfold:false
    };
  };
  componentWillMount(){

  }
  render() {
    var { content, unfold } = this.state;
    return (
      <div class="rightAssistBar_medicalHistory">
        <div class="medicalHistory_data">
          <p class="data_p">共<span>2</span>次病历记录</p>
          {
            content.map((item,index)=>{
              return(
                <div class="medicalHistory_content">
                  <div class="medicalHistory_content-title">
                    <Row>
                      <Col span={16}><p class="content-p">2018-08-06 | 永顺中医馆 | 医师：张保全 | <span>复诊</span></p></Col>
                      <Col span={8}>
                        <Button>引入病历</Button>
                        <Divider type="vertical" />
                      </Col>
                    </Row>
                    <Row><Col span={24}><p>诊断：小儿感冒/风寒感冒</p></Col></Row>
                  </div>
                  <ContentDetail item={item}/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
