/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治-----方剂
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs, Divider   } from 'antd';
import '../style/doctorAdvice.less';
import '../style/doctorAdvice.less';
import ContentDetailTwo from '../../pubilcModule/contentDetailTwo.js';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"金银花10g、柴胡10g、栀子20g、枸杞10g、党参10g、黄芪20g",
          two:"感冒/风寒感冒",
          three:"扶正祛邪",
          four:"口服/一日2次",
          five:[
            {name:"病情：恶心、呕吐",value:"甘草（+）、党参（+）、柴胡（-）"},
            {name:"病情：恶心、呕吐",value:"甘草（+）、党参（+）、柴胡（-）"},
          ]
        },
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"金银花10g、柴胡10g、栀子20g、枸杞10g、党参10g、黄芪20g",
          two:"感冒/风寒感冒",
          three:"扶正祛邪",
          four:"口服/一日2次",
          five:[
            {name:"病情：恶心、呕吐",value:"甘草（+）、党参（+）、柴胡（-）"},
            {name:"病情：恶心、呕吐",value:"甘草（+）、党参（+）、柴胡（-）"},
          ]
        }
      ],
    };
  };
  componentWillMount(){

  }

  callback(key) {
    console.log(key);
  }
  render() {
    var { content } = this.state;
    return (
      <div class="prescription">
        <div class="data">
          {
            content.map((item,index)=>{
              return(
                <div style={{paddingBottom:8}}>
                  <div class="medicalHistory_content">
                    <div class="medicalHistory_content-title">
                      <Row style={{height:26}}>
                        <Col span={24}>
                          <span class="content-p">金银花主方<span>(有临证加减)</span></span>
                          <span class="content-div">匹配指数:<Rate value="5" disabled style={{fontSize:10,marginLeft:5}}/></span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <ContentDetailTwo item={item}/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
