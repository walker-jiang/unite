/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治-----名医医案
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs, Divider, Spin   } from 'antd';
import '../style/doctorAdvice.less';
import '../style/doctorAdvice.less';
import ContentDetailFive from '../../pubilcModule/contentDetailFive.js';
import zanwunerong from '../style/zanwunerong.png';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      isQuery:false,//是都查询过，spin专用
    };
  };
  componentWillMount(){
    console.log("名医医案json========",this.props.dataSource);
    this.insertData(this.props.dataSource);
  }
  componentWillReceiveProps(nextProps){
    console.log("方剂的json为",nextProps.dataSource);
    this.insertData(nextProps.dataSource);
  }
  insertData = (dataSource) => {
    if(dataSource.dataList){
      var array = [];
      dataSource.dataList.forEach((item,index)=>{//辩证论治套的一层
        if(dataSource.dataList){
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
      this.setState({ content:array,isQuery:true });
    }else{
      console.log("名医医案暂无数据");
      this.setState({ isQuery:true });
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
    var { content, isQuery } = this.state;
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
            :
            (
              isQuery
              ?
              <center style={{marginTop:50}}><img src={zanwunerong}/><br/>暂无数据，请输入诊断信息后方可查询</center>
              :
              <center style={{marginTop:50}}><div className="example"><Spin/>正在加载中,请稍后...</div></center>
            )
          }
        </div>
      </div>
    );
  }
}
