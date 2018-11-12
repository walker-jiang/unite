/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治-----中成药
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs, Divider, Spin, Pagination } from 'antd';
import '../style/doctorAdvice.less';
import ContentDetailThree from '../../pubilcModule/contentDetailThree.js';
import zanwunerong from '../style/zanwunerong.png';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      total:0,
      pageSize:this.props.pageSize,
      isQuery:this.props.isQuery,//是都查询过，spin专用
    };
  };
  componentWillMount(){
    console.log("中成药props===========",this.props.dataSource);
    this.insertData(this.props.dataSource);
  }
  componentWillReceiveProps(nextProps){
      //debugger;
      console.log("chineseMedicinepageSize===============",nextProps.pageSize);
      this.insertData(nextProps.dataSource);
      this.setState({isQuery:nextProps.isQuery,pageSize:nextProps.pageSize});
  }
  insertData = (dataSource) => {
    if(dataSource && dataSource.dataList){
      var array = [];
      dataSource.dataList.forEach((item,index)=>{
        array.push({
         title:item.cpmName,
         stars:item.stars,
         initData:item
        })
      })
      this.setState({ content:array,total:dataSource.total });//dataSource.total
    }else{
      console.log("中成药暂无数据");
      this.setState({ content:[],total:0,isQuery:true });//dataSource.total
    }
  }
  callback(key) {
    console.log(key);
  }
  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>上一页</a>;
    } if (type === 'next') {
      return <a>下一页</a>;
    }
    return originalElement;
  }
  onChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({ isQuery:false },()=>{
      setTimeout(()=>{
        this.props.updatePageSize(current,2);
      },100);
    });
  }
  render() {
    var { content, isQuery, pageSize, total } = this.state;
    return (
      <div className="prescription">
        <div className="data" style={this.props.type == "1"?{height:'74vh'}:{}}>
          {
            content.length != 0
            ?
            (
              isQuery
              ?
              <div>
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
                        <ContentDetailThree changeInitData={this.props.changeInitData} item={item.initData} bu={this.props.bu}/>
                      </div>
                    )
                  })
                }
                {
                  total<=10
                  ?
                  <center style={{marginBottom:50}}>-------已经到底了-------</center>
                  :
                  <center style={content.length<5?{position:'absolute',bottom:50,marginLeft:'30%'}:{marginBottom:50}}>
                      <Pagination current={parseInt(pageSize)} total={total} onChange={this.onChange} itemRender={this.itemRender} />
                  </center>
                }
              </div>
              :
              <center style={{marginTop:50}}><div className="example"><Spin/>&nbsp;&nbsp;&nbsp;正在加载中,请稍后...</div></center>
            )
            :
            (
              isQuery
              ?
              <center style={{marginTop:50}}><img src={zanwunerong} style={{width:160}}/><br/>暂无数据，请输入诊断信息后方可查询</center>
              :
              <center style={{marginTop:50}}><div className="example"><Spin/>&nbsp;&nbsp;&nbsp;正在加载中,请稍后...</div></center>
            )
          }
        </div>
      </div>
    );
  }
}
