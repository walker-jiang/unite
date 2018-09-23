/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治-----中成药
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs, Divider   } from 'antd';
import '../style/doctorAdvice.less';
import '../style/doctorAdvice.less';
import ContentDetailThree from '../../pubilcModule/contentDetailThree.js';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[
        {
          one:"荆芥 、薄荷、防风、柴胡、紫苏叶、葛根、桔梗、苦杏仁、白芷、苦地丁、芦根；",
          two:"感冒/风寒感冒",
          three:"扶正祛邪",
          four:"口服/一日2次",
        },
        {
          one:"荆芥 、薄荷、防风、柴胡、紫苏叶、葛根、桔梗、苦杏仁、白芷、苦地丁、芦根；",
          two:"感冒/风寒感冒",
          three:"扶正祛邪",
          four:"口服/一日2次",
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
                          <span class="content-p">银翘解毒散</span>
                          <span class="content-div">匹配指数:<Rate value="5" disabled style={{fontSize:10,marginLeft:5}}/></span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <ContentDetailThree item={item}/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
