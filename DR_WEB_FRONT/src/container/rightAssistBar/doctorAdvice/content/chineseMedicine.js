/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治-----中成药
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs, Divider } from 'antd';
import '../style/doctorAdvice.less';
import '../style/doctorAdvice.less';
import ContentDetailThree from '../../pubilcModule/contentDetailThree.js';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
    };
  };
  componentWillMount(){
    console.log("中成药props===========",this.props.dataSource);
    if(this.props.dataSource.dataList){
      var array = [];
      this.props.dataSource.dataList.forEach((item,index)=>{
        array.push({
         title:item.cpmName,
         stars:item.stars,
         initData:item
        })
      })
      this.setState({ content:array });
    }else{
      console.log("中成药暂无数据");
    }
  }

  callback(key) {
    console.log(key);
  }
  render() {
    var { content } = this.state;
    return (
      <div className="prescription">
        <div className="data">
          {
            content.map((item,index)=>{
              return(
                <div style={{paddingBottom:8}} key={index}>
                  <div className="medicalHistory_content">
                    <div className="medicalHistory_content-title">
                      <Row style={{height:26}}>
                        <Col span={24}>
                          <span className="content-p">{item.title}</span>
                          <span className="content-div">匹配指数:<Rate value={item.stars} disabled style={{fontSize:10,marginLeft:5}}/></span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <ContentDetailThree item={item.initData} bu={this.props.bu}/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
