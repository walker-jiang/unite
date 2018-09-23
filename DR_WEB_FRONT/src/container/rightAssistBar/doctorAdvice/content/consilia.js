/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治-----名医医案
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs, Divider   } from 'antd';
import '../style/doctorAdvice.less';
import '../style/doctorAdvice.less';
import ContentDetailFive from '../../pubilcModule/contentDetailFive.js';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[
        {
          one:"荆芥 、薄荷、防风、柴胡、紫苏叶、葛根、桔梗、苦杏仁、白芷、苦地丁、芦根；",
          two:"蔡连香   |   医生是否作者：是",
          four:"中国中医研究院西苑医院",
          five:[
            {name:"病情：恶心、呕吐",value:"甘草（+）、党参（+）、柴胡（-）"},
            {name:"病情：恶心、呕吐",value:"甘草（+）、党参（+）、柴胡（-）"},
          ]
        },
        {
          one:"荆芥 、薄荷、防风、柴胡、紫苏叶、葛根、桔梗、苦杏仁、白芷、苦地丁、芦根；",
          two:"蔡连香   |   医生是否作者：是",
          four:"中国中医研究院西苑医院",
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
                          <span class="content-p">蔡连香治疗风寒感冒经典医案</span>
                          <span class="content-div">匹配指数:<Rate value="5" disabled style={{fontSize:10,marginLeft:5}}/></span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <ContentDetailFive item={item}/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
