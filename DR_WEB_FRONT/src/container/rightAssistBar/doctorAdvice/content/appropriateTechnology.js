/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治-----中医适宜技术
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs, Divider   } from 'antd';
import '../style/doctorAdvice.less';
import '../style/doctorAdvice.less';
import ContentDetailFour from '../../pubilcModule/contentDetailFour.js';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[
        {
          one:"合谷、风池、大椎",
          two:"感冒/风寒感冒",
          three:"平刺用泻法",
          four:"口服/一日2次",
          five:[
            {name:"病情：恶心、呕吐",value:"木穴（+）、木穴（+）、木穴（+）"},
            {name:"病情：恶心、呕吐",value:"木穴（+）、木穴（+）、木穴（+）"},
          ]
        },
        {
          one:"合谷、风池、大椎",
          two:"感冒/风寒感冒",
          three:"平刺用泻法",
          four:"口服/一日2次",
          five:[
            {name:"病情：恶心、呕吐",value:"木穴（+）、木穴（+）、木穴（+）"},
            {name:"病情：恶心、呕吐",value:"木穴（+）、木穴（+）、木穴（+）"},
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
                          <span class="content-p">针法<span>(有临证加减)</span></span>
                          <span class="content-div">匹配指数:<Rate value="5" disabled style={{fontSize:10,marginLeft:5}}/></span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <ContentDetailFour item={item}/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
