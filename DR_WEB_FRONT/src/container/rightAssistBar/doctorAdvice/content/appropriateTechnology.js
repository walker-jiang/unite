/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治-----中医适宜技术
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs, Divider, Spin, Pagination   } from 'antd';
import '../style/doctorAdvice.less';
import ATModal from './aTModal.js';
import TipModal from 'components/dr/modal/tip';
import ContentDetailFour from '../../pubilcModule/contentDetailFour.js';
import doctorAdviceService from '../../service/doctorAdviceService.js';
import zanwunerong from '../style/zanwunerong.png';
const TabPane = Tabs.TabPane;

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[],
      AllData:{},//辩证论证引入数据
      tableSource:[],
      visible:false,
      total:0,
      pageSize:this.props.pageSize,
      isQuery:this.props.isQuery,//是都查询过，spin专用
      queryTableIsQuery:false,//弹出表格专用
    };
  };
  componentWillMount(){
    console.log("中医适宜技术dataSource========",this.props.dataSource);
    this.insertData(this.props.dataSource);
  }
  componentWillReceiveProps(nextProps){
    console.log("pageSize===============",nextProps.pageSize);
    this.insertData(nextProps.dataSource);
    this.setState({isQuery:nextProps.isQuery,pageSize:nextProps.pageSize});
  }
  insertData = (dataSource) => {
    if(dataSource && dataSource.dataList){
      var array = [];
      dataSource.dataList.forEach((item,index)=>{
        array.push({
         title:item.stName,
         priors:item.priors,
         stars:item.stars,
         initData:item
        })
      })
      this.setState({ content:array,total:dataSource.total });//dataSource.total
    }else{
      console.log("适宜技术暂无数据");
      this.setState({ content:[],total:0,isQuery:true });//dataSource.total
    }
  }
  getStOne = (AllItem,item) =>{
    var self = this;
    self.setState({ visible: true });
    setTimeout(()=>{
      if(item){
        console.log("AllItem=========",AllItem);
        console.log("item=========",item);
        AllItem['buMatchingAcupoints'] = item;
        let params = {
          imtreatprelist:JSON.stringify(AllItem),
          bu:self.props.bu
        };
        function callBack(res){
          if(res.flag == 1){
            console.log("适宜技术转换成功==============",res);
            //* 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
            //self.props.changeInitData(res.data,5);
            if(res.data && res.data.buOrderDtlList.length>0){
              self.setState({ AllData:res.data, queryTableIsQuery:true });
              self.queryTable(res.data.buOrderDtlList[0].itemcode);
            }else{
              alert("该条数据格式有错误");
            }
          }else{
            self.setState({ queryTableIsQuery:true });
            console.log('适宜技术转换失败', res);
            self.tipModal.showModal({
              content: '适宜技术引入失败'
            });
          }
        };
        doctorAdviceService.getSt(params, callBack);
      }
    },100)
  }
  Copy = (aObject) => {
    if (!aObject) {
      return aObject;
    }
    var bObject, v, k;
    bObject = Array.isArray(aObject) ? [] : {};
    for (k in aObject) {
      v = aObject[k];
      bObject[k] = (typeof v === "object") ? this.Copy(v) : v;
    }
    return bObject;
  }
  getSt = (item) =>{
    var self = this;
    self.setState({ visible: true });
    setTimeout(()=>{
      console.log("%%%%%%%%%%%%",item);
      var newItem = self.Copy(item);
      newItem['buMatchingAcupoints'] = [];
      let params = {
        imtreatprelist:JSON.stringify(newItem),
        bu:this.props.bu
      };
      function callBack(res){
        if(res.flag == 1){
          console.log("适宜技术转换成功==============");
          //* 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
          //self.props.changeInitData(res.data,5);
          if(res.data && res.data.buOrderDtlList.length>0){
            self.setState({ AllData:res.data, queryTableIsQuery:true });
            self.queryTable(res.data.buOrderDtlList[0].itemcode);
          }else{
            alert("该条数据格式有错误");
          }
        }else{
          self.setState({ queryTableIsQuery:true });
          console.log('适宜技术转换失败', res);
        }
      };
      doctorAdviceService.getSt(params, callBack);
    },100)
  }
  queryTable = (orderSuitCode) => {
    var self = this;
    var params = {
      orderSuitCode:orderSuitCode,//"hxb"
    }
    function callBack(res){
      if(res){
        if(res.data){
          console.log("适宜技术获取table列表成功");
          //* 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
          //数据解析
          var params = [];
          if(res.data.baOrderSuitList && res.data.baOrderSuitList.length != 0){
            res.data.baOrderSuitList.forEach((item,index)=>{
              params.push(item);
            })
          }
          if(res.data.baMedicalDtl && JSON.stringify(res.data.baMedicalDtl) != "{}"){
            params.push(res.data.baMedicalDtl);
          }
          console.log("params===============",params);
          self.setState({ tableSource:params, queryTableIsQuery:true });
        }else{
          alert("适宜技术获取table为空，测试数据有错误");
        }
      }else{
        self.setState({ queryTableIsQuery:true });
        console.log('适宜技术获取table列表失败', res);
      }
    };
    doctorAdviceService.getStQueryTable(params,callBack)
  }
  closeModal =() => {
    this.setState({ queryTableIsQuery:false,tableSource:[],visible: false });
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
        this.props.updatePageSize(current,1);
      },100);
    });
  }
  changeInitData = (item,type) => {
    this.setState({ visible:false });
    this.props.changeInitData(item,type);
  }
  render() {
    var { content, visible, tableSource, AllData, isQuery, pageSize, total, queryTableIsQuery } = this.state;
    return (
      <div className="prescription">
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        <ATModal
          AllData={AllData}
          closeModal={this.closeModal}
          queryTableIsQuery={queryTableIsQuery}
          visible={visible}
          tableSource={tableSource}
          changeInitData={this.changeInitData}
        />
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
                                <span className="content-p">{item.title}<span>{item.priors== "1" ? "(有临证加减)":""}</span></span>
                                <span className="content-div">匹配指数:<Rate value={item.stars} disabled style={{fontSize:10,marginLeft:5}}/></span>
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <ContentDetailFour getStOne={this.getStOne} getSt={this.getSt} changeInitData={this.props.changeInitData} item={item.initData} bu={this.props.bu}/>
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
