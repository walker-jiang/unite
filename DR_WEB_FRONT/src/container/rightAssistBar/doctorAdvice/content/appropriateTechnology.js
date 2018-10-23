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
import zanwunerong from '../style/zanwunerong.png';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
    };
  };
  componentWillMount(){
    console.log("中医适宜技术dataSource========",this.props.dataSource);
    this.insertData(this.props.dataSource);
  }
  componentWillReceiveProps(nextProps){
    console.log("中医适宜技术dataSource========",nextProps.dataSource);
    this.insertData(nextProps.dataSource);
  }
  insertData = (dataSource) => {
    if(dataSource.dataList){
      var array = [];
      dataSource.dataList.forEach((item,index)=>{
        array.push({
         title:item.stName,
         priors:item.priors == "1" ? "有临证加减":"无临证加减",
         stars:item.stars,
         initData:item
        })
      })
      this.setState({ content:array });
    }else{
      console.log("适宜技术暂无数据");
      this.setState({ isQuery:true });
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
            content.length != 0
            ?
            content.map((item,index)=>{
              return(
                <div style={{paddingBottom:8}} key={index}>
                  <div className="medicalHistory_content">
                    <div className="medicalHistory_content-title">
                      <Row style={{height:26}}>
                        <Col span={24}>
                          <span className="content-p">{item.title}<span>({item.priors})</span></span>
                          <span className="content-div">匹配指数:<Rate value={item.stars} disabled style={{fontSize:10,marginLeft:5}}/></span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <ContentDetailFour changeInitData={this.props.changeInitData} item={item.initData} bu={this.props.bu}/>
                </div>
              )
            })
            :
            <center style={{marginTop:50}}><img src={zanwunerong}/><br/>暂无数据，请输入诊断信息后方可查询</center>
          }
        </div>
      </div>
    );
  }
}
