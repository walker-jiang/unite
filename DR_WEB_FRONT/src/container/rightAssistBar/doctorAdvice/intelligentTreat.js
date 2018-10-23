/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----医嘱-----智能论治
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input, Rate, Tabs,   } from 'antd';
import AppropriateTechnology from './content/appropriateTechnology.js';
import ChineseMedicine from './content/chineseMedicine.js';
import Prescription from './content/prescription.js';
import Consilia from './content/consilia.js';
import getResource from 'commonFunc/ajaxGetResource';
import './style/doctorAdvice.less';
const TabPane = Tabs.TabPane;
import doctorAdviceService from '../service/doctorAdviceService.js';

export default class IntelligentTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 1,
      bu:{},
      isQuery:false,
      dataSource:{
        clist:[],
        plist:[],
        slist:[],
        mlist:[],
      }
    };
  };
  componentWillMount(){
    this.getPatientData();//获取诊疗信息------辩证论证入参
  }
  componentDidMount(){
    window.searchITList = () => this.getDiagnoseData();
  }
  getPatientData(id){
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
          bu:res.data
        },()=>{
          self.getDiagnoseData();
        })
      }else{
        console.log("该人暂时没有挂号信息");
      }
    };
    getResource(params, callBack);
  };
  /** [getDiagnoseData 获取加载诊断数据] */
  getDiagnoseData(){
    let self = this;
    let params = {
      url: 'BuDiagnosisInfoController/getData',
      data: {
        registerid: window.registerID
      },
    };
    function callBack(res){
      if(res && res.data){
        console.log('获取诊断信息成功',res.data);
        var params = self.state.bu;
        params['buDiagnosisInfo'] = res.data;
        self.searchList(params);
      }else{
        console.log("该人暂时没有诊断信息,右侧模板为空");
      }
    };
    getResource(params, callBack);
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
  // queryBu = () =>{
  //   let params = {
  //     type: 'GET',
  //     async : true,
  //     url: 'BuPatientCaseController/getData',
  //     contentType: '',
  //     data:{
  //       registerid:window.registerID
  //     }
  //   };
  //   let self = this;
  //   function success(res){
  //     console.log('获取挂号信息成功',res);
  //     if(res && res.data){
  //       self.setState({
  //         bu:res.data
  //       },()=>{
  //         self.searchList(res.data);
  //       })
  //     }else{
  //       alert("获取挂号信息失败，请检查服务");
  //     }
  //   };
  //   function error(res){
  //       console.log('获取挂号信息失败');
  //   };
  //   getResource(params, success, error);
  // }
  searchList = (bu) =>{
    var self = this;
    console.log("bu=======",bu);
    let params = {
      bu:JSON.stringify(bu),
      sex:window.sex,
      age:self.ages(window.birthday.substr(0,10)).toString(),
      pageSize:"10",//分页长度
      cmdrugPage:"1",//处方页数
      cpmPage:"1",//中成药页数
      stPage:"1",//适宜技术页数
      mcPage:"1",//适宜技术页数
    };
    function callBack(res){
      if(res.flag == 1){
        console.log("获取辨证论治成功==============",res);
        self.setState({ dataSource:res.data,isQuery:true });
      }else{
        console.log('获取辨证论治异常响应信息', res);
      }
    };
    doctorAdviceService.ImtreatprelistGetList(params, callBack);
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
    //数据组装
    if(ordertype == 3){

    }else if(ordertype == 4){
      var recipename = "";
      if(item.buRecipe != null){
        recipename = item.buRecipe.recipename;
      }
      params = {
        medicineData:item.baMedicines,
        recipename:recipename,
        remark:"",
        treatway:"",
        countnum:"",
        freq:"",
        buDiagnosisList:item.buDiagnosisInfo,
      }
    }else if(ordertype == 5){

    }else{

    }
    // var buDiagnosisInfo = item.buDiagnosisInfo;
    // buDiagnosisInfo['buDiagnosisDismainfList'] = buDiagnosisInfo.buDiagnosisList;
    // if(item.buRecipe != null){
    //   var recipename = item.buRecipe.recipename;
    // }
    // var params = {
    //   herbalData:item.baHerbalMedicines,
    //   recipename:recipename,
    //   remark:"",
    //   treatway:"",
    //   countnum:"",
    //   freq:"",
    //   buDiagnosisList:buDiagnosisInfo,
    // }
    //console.log("数据组装后=============",params);
    this.props.actionManager('add', {orderid:'', ordertype: ordertype}, params);
  }
  render() {
    var { dataSource, bu, isQuery } = this.state;
    console.log("dataSource========",typeof(dataSource) == "undefined");
    return (
      <div className="intelligentTreat">
      {
        <div className="intelligentTreat_Tabs">
          <Tabs onChange={this.callback} tabBarGutter={12} type="card" >
            <TabPane tab="方剂" key="1"><Prescription isQuery={isQuery} dataSource={dataSource.clist} bu={JSON.stringify(bu)} changeInitData={this.changeInitData}/></TabPane>
            <TabPane tab="中成药" key="2"><ChineseMedicine isQuery={isQuery} dataSource={dataSource.plist} bu={JSON.stringify(bu)} changeInitData={this.changeInitData}/></TabPane>
            <TabPane tab="中医适宜技术" key="3"><AppropriateTechnology isQuery={isQuery} dataSource={dataSource.slist} bu={JSON.stringify(bu)} changeInitData={this.changeInitData}/></TabPane>
            <TabPane tab="名医医案" key="4"><Consilia isQuery={isQuery} dataSource={dataSource.mlist} bu={JSON.stringify(bu)} changeInitData={this.changeInitData}/></TabPane>
          </Tabs>
        </div>
      }
      </div>
    );
  }
}
