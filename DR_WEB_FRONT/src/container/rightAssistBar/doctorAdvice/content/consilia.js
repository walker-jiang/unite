/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治-----名医医案
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs, Divider, Spin, Pagination   } from 'antd';
import '../style/doctorAdvice.less';
import ContentDetailFive from '../../pubilcModule/contentDetailFive.js';
import zanwunerong from '../style/zanwunerong.png';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      isQuery:this.props.isQuery,//是都查询过，spin专用
      total:0,
      pageSize:this.props.pageSize,
    };
  };
  componentWillMount(){
    console.log("名医医案json========",this.props.dataSource);
    this.insertData(this.props.dataSource);
  }
  componentWillReceiveProps(nextProps){
    console.log("pageSize===============",nextProps.pageSize);
    this.insertData(nextProps.dataSource);
    this.setState({isQuery:nextProps.isQuery,pageSize:nextProps.pageSize});
  }
  insertData = (dataSource) => {
    console.log("dataSource=========",dataSource);
    if(dataSource.dataList){
      var array = [];
      dataSource.dataList.forEach((item,index)=>{//辩证论治套的一层
        if(dataSource.dataList && item != "null"){
          var objectList = JSON.parse(item).objectList;
          objectList.forEach((j,k)=>{//知识库套的一层
            console.log("名医医案json一条=============",j);
            console.log("=========",j.tm_DetailAndDoctor.doctorList[0]);
            if(j.tm_DetailAndDoctor.doctorList[0]){
              array.push({
               title:j.tm_title_all,
               // name:j.tm_DetailAndDoctor.doctorList[0].name,
               // company:j.tm_DetailAndDoctor.doctorList[0].company,
               // isauthor:j.tm_DetailAndDoctor.doctorList[0].isauthor,
               initData:j
              })
            }
          })
        }
      })
      this.setState({ content:array,total:dataSource.total });//dataSource.total
    }else{
      console.log("名医医案暂无数据");
      this.setState({ content:[],total:0,isQuery:true });//dataSource.total
    }
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
        this.props.updatePageSize(current,1);
      },100);
    });
  }
  /**
   * 左右联动（和书写诊疗单）
   * @method changeInitData
   * @param  {[type]}       item [表单内容]
   */
  changeInitData = (item) =>{
    var self = this;
    console.log("item======",item);
    //debugger;
    if(item.buOrderDtlList){
      var arr =[];
      var error = "";
      var errorCount = 0;
      item.buOrderDtlList.forEach((params,index)=>{
        if(params.itemid){
          arr.push(params);
        }else{
          error = error+";"+params.itemname;
          errorCount++;
        }
      })
    }
    if(errorCount<4){
      item['buOrderDtlList'] = arr;
      //* 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
      self.props.changeInitData(item,3);
    }else{
      alert(`以下几种药物本医院没有匹配的药物,${error}`);
    }
  }
  callback(key) {
    console.log(key);
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
                                <span className="content-p" style={{color:'#333333'}}>{item.title}</span>
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
