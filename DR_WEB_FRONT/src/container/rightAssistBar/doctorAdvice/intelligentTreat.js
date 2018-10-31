/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs,   } from 'antd';
import AppropriateTechnology from './content/appropriateTechnology.js';
import Exception from '../exception/exceptionPage.js';
import ChineseMedicine from './content/chineseMedicine.js';
import Prescription from './content/prescription.js';
import Consilia from './content/consilia.js';
import getResource from 'commonFunc/ajaxGetResource';
import './style/doctorAdvice.less';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
import doctorAdviceService from '../service/doctorAdviceService.js';

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 1,
      bu:{},
      isQuery:false,
      seachValue:"",//搜索条件
      isSuccess:true,//服务是否联通
      cmdrugPage:"1",//处方页数
      cpmPage:"1",//中成药页数
      stPage:"1",//适宜技术页数
      mcPage:"1",//名医医案页数
      dataSource:{
        clist:[],
        plist:[],
        slist:[],
        mlist:[],
        total:0,
      }
    };
  };
  componentWillReceiveProps(){
    //this.getPatientData();//获取诊疗信息------辩证论证入参
  }
  componentDidMount(){
    window.searchITList = () => this.getDiagnoseData();
    this.getPatientData();//获取诊疗信息------辩证论证入参
  }
  /**
   * 获取到除了诊断信息之外的数据
   * @method getPatientData
   * @return {[type]}       [description]
   */
  getPatientData = () =>{
    let self = this;
    let params = {
      url: 'BuRegisterController/getData',
      data: {
        registerid: window.registerID
      },
    };
    function callBack(res){
      console.log("挂号信息为",res);
      if(res && res.data){
        self.setState({
          bu:res.data,
        },()=>{
          console.log("有执行了一次");
          self.getDiagnoseData();
        })
      }else{
        console.log("该人暂时没有挂号信息");
      }
    };
    function callBackError(res){
      self.setState({ isQuery:true,isSuccess:false });
    }
    getResource(params, callBack, callBackError);
  };
  /**
   * 获取加载诊断数据  ,并且将患者数据和诊疗数据拼接
   * @method getDiagnoseData
   * @return {[type]}        [description]
   */
  getDiagnoseData = () =>{
    console.log("this.state.bu==========",this.state.bu);
    if(JSON.stringify(this.state.bu) != "{}"){
      let self = this;
      console.log("window.registerID==============",window.registerID);
      if(self.props.type == 1){
        var params = {
          url: 'BuDiagnosisInfoController/getData',
          data: {
            registerid: window.registerID
          },
        };
      }else{
        var params = {
          url: 'BuDiagnosisInfoController/getData',
          server_url: config_InteLigenTreat_url+'TCMAE/',
          data: {
            registerid: window.registerID
          },
        };
      }
      function callBack(res){
        if(res && res.data){
          console.log('获取诊断信息成功',res.data);
          var params = self.state.bu;
          params['buDiagnosisInfo'] = res.data;
          self.setState({ bu:params },()=>{
            self.searchList();
          })
        }else{
          console.log("该人暂时没有诊断信息,右侧模板为空");
          self.setState({ isQuery:true });
        }
      };
      function callBackError(res){
        self.setState({ isQuery:true,isSuccess:false });
      };
      getResource(params, callBack, callBackError);
    }else{
      console.log("此时暂未获取到患者信息");
    }
  };
  ages = (str) => {
    console.log("str===",str);
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(r==null)return false;
    var d=new Date(r[1],r[3]-1,r[4]);
    if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){
      var Y = new Date().getFullYear();
      return (Y-r[1]);
    }
    return 0;//"输入的日期格式错误！"
  }
  searchList = () =>{
    var self = this;
    self.setState({ isQuery:false },()=> {
      window.setTimeout(()=>{
        console.log("bu=======",self.state.bu);
        console.log("isQuery",self.state.isQuery);
        console.log("window.birthday=======",window.birthday);
        let params = {
          bu:JSON.stringify(self.state.bu),
          sex:window.sex,
          age:window.birthday?self.ages(window.birthday.substr(0,10)).toString():"",
          pageSize:"10",//分页长度
          cmdrugPage:self.state.cmdrugPage,//处方页数
          cpmPage:self.state.cpmPage,//中成药页数
          stPage:self.state.stPage,//适宜技术页数
          mcPage:self.state.mcPage,//医医案页数
          seachValue:self.state.seachValue,//搜索条件
        };
        function callBack(res){
          if(res.flag == 1){
            console.log("获取辨证论治成功==============",res);
            self.setState({ dataSource:res.data,isQuery:true });
          }else{
            console.log('获取辨证论治异常响应信息', res);
          }
        };
        function callBackError(res){
          self.setState({ isQuery:true,isSuccess:false });
        }
        doctorAdviceService.ImtreatprelistGetList(params, callBack, callBackError);
      })
    },100);
  }
  callback(key) {
    console.log(key);
  }
  /**
   * 左右联动（和书写诊疗单）
   * @method changeInitData
   * @param  {[type]}       item [表单内容]
   * 医嘱订单类型；1-检验申请单 2.检查申请单 3.-中草药处方、4-中成药及西药处方 5-适宜技术处方 6-西医治疗 7-嘱托
   */
  changeInitData = (item,ordertype) =>{
    console.log("左右联动=============",item);
    var params;
    console.log("数据组装后=============",item);
    //var test = this.chPatentMedicineSampleData();
    this.props.actionManager('add', {orderid:'', ordertype: ordertype}, item);
  }
  // cmdrugPage:"1",//处方页数
  // cpmPage:"1",//中成药页数
  // stPage:"1",//适宜技术页数
  // mcPage:"1",//医医案页数
  updatePageSize = (pageSize,type) => {
    switch (type) {
      case 1:
          this.setState({ cmdrugPage:pageSize },()=>{
            this.searchList();
          })
          break;
      case 2:
          console.log("cpmPage=======",pageSize);
          this.setState({ cpmPage:pageSize },()=>{
            this.searchList();
          })
          break;
      case 3:
          this.setState({ stPage:pageSize },()=>{
            this.searchList();
          })
          break;
      default:
          this.setState({ mcPage:pageSize },()=>{
            this.searchList();
          })
          break;
    }
  }
  render() {
    var { dataSource, bu, isQuery, cmdrugPage, cpmPage, stPage, mcPage, isSuccess } = this.state;
    console.log("bu@@@@@@@@@@@@@@@@@@@@",bu);
    return (
      <div className="intelligentTreat" style={this.props.type == "1"?{height:'77.2vh'}:{}}>
      {
        this.props.type == "2"
        ?
        <div className="tab">
          <Row>
            <Col span={24}>
              <center>
                <Search
                  style={{width:'90%'}}
                  placeholder={this.props.type == "1"?"请输入模板名称或症状快速查询":"请输入症候和症状快速查询"}
                  onSearch={value => { this.setState({ seachValue:value },()=>{ this.searchList() }) }}
                />
              </center>
            </Col>
          </Row>
        </div>
        :
        null
      }
      {
        isSuccess
        ?
        <div className="intelligentTreat_Tabs">
          <Tabs onChange={this.callback} tabBarGutter={10} type="card" >
            <TabPane tab="方剂" key="1">
              <Prescription
                updatePageSize={this.updatePageSize}
                type={this.props.type}
                pageSize={cmdrugPage}
                isQuery={isQuery}
                dataSource={dataSource.clist}
                bu={JSON.stringify(bu)}
                changeInitData={this.changeInitData}
              />
            </TabPane>
            <TabPane tab="中成药" key="2">
              <ChineseMedicine
                updatePageSize={this.updatePageSize}
                type={this.props.type}
                pageSize={cpmPage}
                isQuery={isQuery}
                dataSource={dataSource.plist}
                bu={JSON.stringify(bu)}
                changeInitData={this.changeInitData}
              />
            </TabPane>
            <TabPane tab="中医适宜技术" key="3">
              <AppropriateTechnology
                updatePageSize={this.updatePageSize}
                type={this.props.type}
                pageSize={stPage}
                isQuery={isQuery}
                dataSource={dataSource.slist}
                bu={JSON.stringify(bu)}
                changeInitData={this.changeInitData}
              />
            </TabPane>
            <TabPane tab="名医医案" key="4">
              <Consilia
                updatePageSize={this.updatePageSize}
                type={this.props.type}
                pageSize={mcPage}
                isQuery={isQuery}
                dataSource={dataSource.mlist}
                bu={JSON.stringify(bu)}
                changeInitData={this.changeInitData}
              />
            </TabPane>
          </Tabs>
        </div>
        :
        <Exception params={"500"}/>
      }
      </div>
    );
  }
}
