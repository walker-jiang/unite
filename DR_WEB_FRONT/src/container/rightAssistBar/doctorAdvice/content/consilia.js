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
      content:[],
    };
  };
  componentWillMount(){
    console.log("名医医案json========",this.props.dataSource);
    if(this.props.dataSource.dataList){
      var array = [];
      this.props.dataSource.dataList.forEach((item,index)=>{//辩证论治套的一层
        if(this.props.dataSource.dataList){
          var objectList = JSON.parse(item).objectList;
          objectList.forEach((j,k)=>{//知识库套的一层
            console.log("名医医案json一条=============",j);
            console.log("=========",j.tm_DetailAndDoctor.doctorList[0].name);
            array.push({
             title:j.tm_title_all,
             // name:j.tm_DetailAndDoctor.doctorList[0].name,
             // company:j.tm_DetailAndDoctor.doctorList[0].company,
             // isauthor:j.tm_DetailAndDoctor.doctorList[0].isauthor,
             initData:j
            })
          })
        }
      })
      this.setState({ content:array });
    }else{
      console.log("方剂暂无数据");
    }
  }
  /**
   * 左右联动（和书写诊疗单）
   * @method changeInitData
   * @param  {[type]}       item [表单内容]
   */
  changeInitData = (item) =>{
    var self = this;
    console.log("@@@@@@@@@@@@@@",item);
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
                          <span className="content-div">匹配指数:<Rate value={5} disabled style={{fontSize:10,marginLeft:5}}/></span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <ContentDetailFive item={item.initData} bu={this.props.bu} changeInitData={this.changeInitData}/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
