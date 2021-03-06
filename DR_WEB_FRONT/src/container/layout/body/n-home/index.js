import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable'; // 加载时进行模块分离
import { Layout, Menu, Breadcrumb,Carousel,Row,Col,Button,Modal,Table,Form,Checkbox,Card,Tabs,Radio } from 'antd';
import Icon from 'components/dr/icon';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { Header, Content, Footer, Sider } = Layout;
import "./home.less";
import $ from "jquery";
import HomeTabs from "./homeTabs";
import PieChart from "./Chart/pieChart.js";
import LineChart from "./Chart/lineChart.js";
import Ajax from '../../../../util/commonFunction/ajaxGetResource';
import Post from '../../../rightAssistBar/service/xhr/index.js';
import styled from 'styled-components';
import { Link, Router  } from 'react-router-dom';
class Home extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
          show:false,//拉灯
          set:false,//定住
          daTa:'',//今日接诊总量
          daTa0:'',//今日首诊总量
          daTa1:"",//今日复诊总量
          data2:[],//接诊中
          data:[],//待接诊
          data3:[],//已完成
          allpatientnum:'',//病人总数
      };
  }
  componentDidMount=()=>{
    //首页就诊量请求
    var date = new Date(),
        year = date.getFullYear(),//年
        month = date.getMonth()+1,//月
        date = date.getDate(),//日
        h = new Date().getHours(),//h
        m = new Date().getMinutes(),//m
        s = new Date().getSeconds(),//s
        st1 = year+'-'+month+'-'+date+' '+'00:00:00',
        st = year+'-'+month+'-'+date+' '+h+':'+m+':'+s;
        // console.log('yeardateday',year,month,date);
    //今日接诊总量
    var data ={
      beginTime:st1,
      endTime:st,
      doctorid:window.sessionStorage.getItem('userid'),
      casetype:'',
    }
    const params = {
      type:'get',
      dataType:'JSON',
      contentType:'application/json;charset=UTF-8',
      async:true,
      server_url:config_service_url,
      url:'IndexController/getCas',
      data:data
    }

    Ajax(params,scallBack,ecallback);

    var this_=this;
    function scallBack(res){
      this_.setState({
        daTa:res.data
      },()=>{
          // this_.upData()
      });
    }
    function ecallback(res){
    }
    //今日首诊总量
    var data0 ={
      beginTime:st1,
      endTime:st,
      doctorid:window.sessionStorage.getItem('userid'),
      casetype:0,
    }
    const params0 = {
      type:'get',
      dataType:'JSON',
      contentType:'application/json;charset=UTF-8',
      async:true,
      server_url:config_service_url,
      url:'IndexController/getCas',
      data:data0
    }
    Ajax(params0,scallBack0,ecallback0);
    function scallBack0(res){
      this_.setState({
        daTa0:res.data
      });
    }
    function ecallback0(res){
      console.log('今日首诊总量未成功:',res);
    }
    //今日复诊总量
    var data1 ={
      beginTime:st1,
      endTime:st,
      doctorid:window.sessionStorage.getItem('userid'),
      casetype:1,
    }
    const params1 = {
      type:'get',
      dataType:'JSON',
      contentType:'application/json;charset=UTF-8',
      async:true,
      server_url:config_service_url,
      url:'IndexController/getCas',
      data:data1
    }
    Ajax(params1,scallBack1,ecallback1);
    function scallBack1(res){
      this_.setState({
        daTa1:res.data
      });
    }
    function ecallback1(res){
      console.log('今日复诊总量未成功:',res);
    }
    //首页接诊信息列表请求
    var jzdata = {
      keyword:'',
      orgid:window.sessionStorage.getItem('orgid'),
      deptid:window.sessionStorage.getItem('deptid'),
      doctorid:window.sessionStorage.getItem('userid'),
      beginTime:st1,
      endTime:st,
      rcStatus:1 //接诊中
    }
    const jzparams = {
      type:'get',
      dataType:'JSON',
      contentType:'application/json;charset=UTF-8',
      async:true,
      server_url:config_service_url,
      url:'BuRegisterController/getListByMap',
      data:jzdata
    }
    Ajax(jzparams,jzcsallBack,jzecallback);
    var data1 =[],this_=this;
    function jzcsallBack(res){
      this_.setState({
        data2:res.data.records,
        allpatientnum:res.data.records.length
      },()=>{this_.render});
    }
    function jzecallback(res){
    }

    //待接诊
    var djzdata = {
      keyword:'',
      orgid:window.sessionStorage.getItem('orgid'),
      deptid:window.sessionStorage.getItem('deptid'),
      doctorid:window.sessionStorage.getItem('userid'),
      beginTime:st1,
      endTime:st,
      rcStatus:0 //待接诊
    }
    const djzparams = {
      type:'get',
      dataType:'JSON',
      contentType:'application/json;charset=UTF-8',
      async:true,
      server_url:config_service_url,
      url:'BuRegisterController/getListByMap',
      data:djzdata
    }
    Ajax(djzparams,djzcsallBack,djzecallback);
    var data =[],this_=this;
    function djzcsallBack(res){
      this_.setState({
        data:res.data.records
      },()=>{this_.render});
    }
    function djzecallback(res){
      console.log('首页接诊信息列表请求待接诊未成功',res);
    }
    //已完成
    var ywcdata = {
      keyword:'',
      orgid:window.sessionStorage.getItem('orgid'),
      deptid:window.sessionStorage.getItem('deptid'),
      doctorid:window.sessionStorage.getItem('userid'),
      beginTime:st1,
      endTime:st,
      rcStatus:2 //已完成
    }
    const ywcparams = {
      type:'get',
      dataType:'JSON',
      contentType:'application/json;charset=UTF-8',
      async:true,
      server_url:config_service_url,
      url:'BuRegisterController/getListByMap',
      data:ywcdata
    }
    Ajax(ywcparams,ywccsallBack,ywcecallback);
    var data =[],this_=this;
    function ywccsallBack(res){
      this_.setState({
        data3:res.data.records
      },()=>{this_.render});

    }
    function ywcecallback(res){
      console.log('首页接诊信息列表请求已完成未成功',res);
    }
  }
  changeMenuItem=(value)=>{
    console.log('valuevalue',value);
  }

  callback=(key)=> {
    console.log('121212121212',key);
  }
  //把子组件this指向传过来
  onRef=(ref)=>{
    this.PieChart=ref;
  }
  ronRefs=(ref)=>{
    this.LineChart=ref;
  }
  //LineChart 本日 月 年 就诊患者疾病占比分析数据
  onChanges=(e)=>{
    this.LineChart.linechartDate(e.target.value);
    console.log(`linechartDate:${e.target.value}`);
  }
  //PieChart本日 月 年 就诊患者疾病占比分析
  onChange=(e)=>{
    // this.setState({selectTime:e.target.value});
    this.PieChart.piechartDate(e.target.value);
    console.log(`radio checked:${e.target.value}`);
  }
  deng=()=>{
    var show=!this.state.show
    this.setState({show})
  }
  dingzhu=()=>{
    var set =!this.state.set
    this.setState({set})
  }

  modifyRcState(rcStatus, registerid){
    let self = this;
    let params = {
      url: 'BuRegisterController/receive',
      async: false,
      data: {
        rcStatus: rcStatus, // 接诊状态
        registerid: registerid, // 就诊id
        doctorid: window.sessionStorage.getItem('userid'), // 接诊医生
        doctorname: window.sessionStorage.getItem('username'), // 接诊医生
      },
    };
    function callBack(res){
      // self.props.history.push('/Layout/treatment');
      console.log('接诊状态修改为0-待接诊 1-接诊中2-已接诊）', rcStatus);
    };
    Ajax(params, callBack);
  };
  //接诊跳转
  jzAct=(rec)=>{
    if(rec.registerid){
      let path = {
        pathname: '/layout/treatment/' + rec.patientid,
      };
      window.registerID = rec.registerid;
      window.modifyPermission = 1; // 治疗书写权限0只读 1 可写
      window.patientID = rec.patientid;
      this.modifyRcState(1, rec.registerid);
      // 跳转到接诊界面
      this.props.history.push(path);
    }else{
      console.log('异常响应信息', res);
    }
  }
  //继续接诊跳转
  goonjz=(rec)=>{
    console.log('recrecrec',rec);
    if(rec.registerid){
      let path = {
        pathname: '/layout/treatment/' + rec.registerid,
      };
      window.registerID = rec.registerid;
      window.patientID = rec.patientid;
      window.modifyPermission = 1;// 治疗书写权限0只读 1 可写
      // 跳转到接诊界面
      this.props.history.push(path);
    }else{
      console.log('异常响应信息', res);
    }
  }
  //完成接诊跳转
  overjz=(rec)=>{
    console.log('recrececcc',rec);
    if(rec.registerid){
      let path = {
        pathname: '/layout/treatment/' + rec.registerid,
      };
      window.registerID = rec.registerid;
      window.patientID = rec.patientid;
      window.modifyPermission = 0;// 治疗书写权限0只读 1 可写
      // 跳转到接诊界面
      this.props.history.push(path);
    }else{
      console.log('异常响应信息', res);
    }
  }
  //年龄计算
  ages=(str)=>{
    var returnAge;
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(r==null)return   false;
    var d= new Date(r[1],   r[3]-1,   r[4]);
    if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){
      var Y = new Date().getFullYear();
      var M = new Date().getMonth()+1;
      var D = new Date().getDate();
      if(Y == parseInt(r[1])){
        returnAge = 0;//同年 则为0岁
      }else{
        var ageDiff = Y - parseInt(r[1]) ; //年差
        if(ageDiff > 0){
          if(M == parseInt(r[3])){
            var dayDiff = D - parseInt(r[4]);//日差
            if(dayDiff < 0){
              returnAge = ageDiff - 1;
            }else{
              returnAge = ageDiff ;
            }
          }else{
            var monthDiff = M - parseInt(r[3]);//月差
            if(monthDiff < 0){
              returnAge = ageDiff - 1;
            }else{
              returnAge = ageDiff ;
            }
          }
        }else{
          returnAge = -1;//返回-1 表示出生日期输入晚于今天
        }
        return returnAge;
      }
    }
    //日期格式'2018-10-10'
    return(returnAge="输入的日期格式错误！");
  }
  render() {
      const this_=this;
      var style=!this.state.set?{
            width:"30%",
            left:"70%",
            borderTop:"1px solid #ccc",
            borderLeft:"1px solid #ccc",
            borderBottom:"1px solid #ccc",
            marginLeft:"25px",
            padding:"20px",
            position:"absolute",
            top:`${this.state.show?"0px":"-1000px"}`,
            background:"#fff",
            zIndex:"1",
            transition:"top .5s",
            boxShadow: '1px 2px 8px #AAA'
          }:{
              width:"28%",float:"left",background:"",minWidth:"346px",borderLeft:"1px solid #CCCCCC",marginLeft:"20px",padding:"0 0 0 20px"
            }

      const columns = [
          {
            title: '患者姓名',
            dataIndex: 'patientname',
            width:"8%",
            render:(text,record)=>{
              if(record.sexDic == '男'){
                return(
                  <span><Icon type='man'/>{text}</span>
                )
              }else{
                return(
                  <span><Icon type='woman'/>{text}</span>
                )
              }

            }
          },
          {
            title: '患者编号',
            dataIndex: 'patientid',
            width:"11%"
          },
          {
            title: '性别',
            dataIndex: 'sexDic',
            width:"6%"
          },
          {
            title: '年龄',
            dataIndex: 'birthday',
              width:"6%",
              render:(text,record)=>{
                const bir=record.birthday.split(' ',1)
                var age=this_.ages(bir[0]);
                return  age
              }
          },
          {
            title: '手机号',
            dataIndex: 'mobile',
              width:"11%"
          },
          {
            title: '身份证号',
            dataIndex: 'cardno',
              width:"12%"
          },
          {
            title: '患者类型',
            dataIndex: 'patienttypeDic',
              width:"8%"
          },
          {
            title: '就诊类型',
            dataIndex: 'casetypeDic',
              width:"7%"
          },
          {
            title: '接诊科室',
            dataIndex: 'deptidDic',
              width:"7%"
          },
          {
            title: '接诊医生',
            dataIndex: 'recDoctorname',
              width:"7%"
          },
          {
            title: '登记时间',
            dataIndex: 'regDate',
            width:"11%"
          },
          {
            title: '操作',
            dataIndex: 's',
              width:"6%",
            render:(test,record)=>{
              // console.log('recordrecord',record);
              return (
                <div style={{color:"#3366ff",cursor:'pointer'}} onClick={this.jzAct.bind(this, record)}>接诊</div>
              )
            }
          }
      ];
      const data = this.state.data;

      const columns2 = [
          {
            title: '患者姓名',
            dataIndex: 'patientname',
            width:"10%",
            render:(text,record)=>{
              if(record.sexDic == '男'){
                return(
                  <span><Icon type='man'/>{text}</span>
                )
              }else{
                return(
                  <span><Icon type='woman'/>{text}</span>
                )
              }

            }
          },
          {
            title: '患者编号',
            dataIndex: 'patientid',
              width:"10%"
          },
          {
            title: '性别',
            dataIndex: 'sexDic',
              width:"10%"
          },
          {
            title: '年龄',
            dataIndex: 'birthday',
              width:"10%",
              render:(text,record)=>{
                const bir=record.birthday.split(' ',1)
                var age=this_.ages(bir[0]);
                return  age
              }
          },
          {
            title: '手机号',
            dataIndex: 'mobile',
              width:"11%"
          },
          {
            title: '身份证号',
            dataIndex: 'cardno',
              width:"10%"
          },
          {
            title: '患者类型',
            dataIndex: 'patienttypeDic',
              width:"10%"
          },
          {
            title: '就诊类型',
            dataIndex: 'casetypeDic',
              width:"7%"
          },
          {
            title: '接诊科室',
            dataIndex: 'deptidDic',
              width:"7%"
          },
          {
            title: '接诊医生',
            dataIndex: 'recDoctorname',
              width:"7%"
          },
          {
            title: '接诊时间',
            dataIndex: 'examDate',
            width:"11%"
          },
          {
            title: '操作',
            dataIndex: 's',
              width:"10%",
            render:(test,record)=>{
              return (
                <div style={{color:"#3366ff"}}><span style={{cursor:'pointer'}} onClick={this.goonjz.bind(this,record)}>继续接诊</span>|<span style={{cursor:'pointer'}} onClick={this.overjz.bind(this,record)}>完成接诊</span></div>
              )
            }
          }
        ];
      const data2 = this.state.data2;

      //已完成
      const columns3 = [
          {
            title: '患者姓名',
            dataIndex: 'patientname',
            width:"10%",
            render:(text,record)=>{
              if(record.sexDic == '男'){
                return(
                  <span><Icon type='man'/>{text}</span>
                )
              }else{
                return(
                  <span><Icon type='woman'/>{text}</span>
                )
              }

            }
          },
          {
            title: '患者编号',
            dataIndex: 'patientid',
              width:"10%"
          },
          {
            title: '性别',
            dataIndex: 'sexDic',
              width:"10%"
          },
          {
            title: '年龄',
            dataIndex: 'birthday',
              width:"10%",
              render:(text,record)=>{
                const bir=record.birthday.split(' ',1)
                var age=this_.ages(bir[0]);
                return  age
              }
          },
          {
            title: '手机号',
            dataIndex: 'mobile',
              width:"11%"
          },
          {
            title: '身份证号',
            dataIndex: 'cardno',
              width:"10%"
          },
          {
            title: '患者类型',
            dataIndex: 'patienttypeDic',
              width:"10%"
          },
          {
            title: '就诊类型',
            dataIndex: 'casetypeDic',
              width:"7%"
          },
          {
            title: '接诊科室',
            dataIndex: 'deptidDic',
              width:"7%"
          },
          {
            title: '接诊医生',
            dataIndex: 'recDoctorname',
              width:"7%"
          },
          {
            title: '接诊时间',
            dataIndex: 'examDate',
            width:"11%"
          },
          {
            title: '操作',
            dataIndex: 's',
              width:"10%",
            render:(test,record)=>{
              return (
                <div style={{color:"#3366ff"}}><span style={{cursor:'pointer'}} onClick={this.goonjz.bind(this,record)}>重新接诊</span>|<span style={{cursor:'pointer'}} onClick={this.overjz.bind(this,record)}>查看病例</span></div>
              )
            }
          }
        ];
      const data3 = this.state.data3;
      return (
      <div>


        <div className="home">
          <div id="deng" style={{
            position:"absolute",
            display:`${this.state.set?"none":"block"}`,
            width:"28px",
            height:"28px",
            background:"#fff",
            border:"3px solid #1675CD",
            borderRadius:"50%",
            textAlign:"center",
            lineHeight:"28px",
            zIndex:2,
            top:`${this.state.show?"10px":"33px"}`,
            transition: "top .5s",
            left:"93%",
            lineHeight:'22px',
            transition:"all .5s"}}
            onClick={this.deng}>
            <span style={{position:"absolute",height:`${this.state.show?'12px':"33px"}`,width:"2px",background:"#797979",top:`${this.state.show?'-12px':"-36px"}`,left:"10px",transition: "height,top, .5s"}}>
            </span>析
          </div>
          <div style={{width:`${!this.state.set?"100%":"70%"}`,padding:'20px',float:"left",background:""}}>
            <Row className="fontStyle">
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 7, offset: 0 }}>
                <Card >
                  <p style={{color:'#666666',fontSize:'16px'}}>今日接诊总量</p>
                  <p style={{color:'#0A6ECB',fontSize:'28px'}}>{this.state.daTa?this.state.daTa:'0'}人</p>
                </Card></Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span:7, offset: 1 }} style={{marginLeft:"6%"}}>
                <Card>
                  <p>今日首诊总量</p>
                  <p>{this.state.daTa0?this.state.daTa0:'0'}人</p>
                </Card>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 7, offset: 1 }} style={{marginLeft:"6%"}}>
                <Card>
                  <p>今日复诊总量</p>
                  <p>{this.state.daTa1?this.state.daTa1:'0'}人</p>
                </Card>
              </Col>
            </Row>
            <Row style={{fontSize:"18px",color:"#0A6ECB",fontFamily: "'Arial Normal', 'Arial'",margin:"20px 0 10px 0"}}>
              <div className='dian'>今日门诊</div>
            </Row>
            <Row>
              <HomeTabs columns={columns} data={data} columns2={columns2} data2={data2} columns3={columns3} data3={data3} date={this.state.data3.length}></HomeTabs>
            </Row>
          </div>

          <div style={style}>
            <Row style={{fontFamily: "'Microsoft Tai Le Negreta', 'Microsoft Tai Le Normal', 'Microsoft Tai Le'",
                fontWeight: 700,
                fontStyle: "normal",
                fontSize: "16px",
                color: "rgba(0, 0, 0, 0.847058823529412)",
                lineHeight:" 24px",
                borderBottom:"1px solid rgba(204, 204, 204, 1)"
              }}>
                患者疾病占比<button onClick={this.dingzhu} style={{float:"right",width:"22px",height:"27px",border:'0px',background:"#fff",cursor: "pointer",outline:'none',marginRight: '10px',marginTop: '3px'}}
                >
                {this.state.set?<Iconstyl type='ding'/>:<Iconstyl type='disDing'/>}
              </button>
            </Row>

            <div  style={{overflow:"hidden"}}>
              <span>分析方式：</span>
              <RadioGroups onChange={this.onChange} defaultValue="day" size="small">
                <RadioButton className='leftbo' value="day">日</RadioButton>
                <RadioButton value="month">月</RadioButton>
                <RadioButton value="year">年</RadioButton>
              </RadioGroups>
              <PieChart onRef={this.onRef}></PieChart>
            </div>
            <Divline>
              <div className='divlinechild'>
                <div className='linechildren'>
                  <span>分析方式：</span>
                  <RadioGroups onChange={this.onChanges} defaultValue="day" size="small">
                    <RadioButton className='leftbo' value="day">日</RadioButton>
                    <RadioButton value="month">月</RadioButton>
                    <RadioButton value="year">年</RadioButton>
                  </RadioGroups>
                </div>
                <LineChart ronRef={this.ronRefs}></LineChart>
              </div>
            </Divline>
          </div>
        </div>
      </div>
      );
    }
  }
export default Home
const RadioGroups = styled(RadioGroup)`
  height:35px;
  line-height:60px !important;
  .ant-radio-button-wrapper{
    margin-right:13px;
    height:21px !important;
    line-height:20px !important;
    width:47px;
    text-align:center;
  }
  .leftbo{
    border-radius: 4px 0 0 4px;
    margin-left:13px;
  }
`;
const Divline = styled.div`
  border-top:1px solid #CCCCCC;
  overflow:hidden
  .divlinechild{
    position:relative;
    margin-top:20px;
    .linechildren{
      position: absolute;
      top: 45px;
      left: 20px;
    }
    canvas{
      margin-left: -35px;
    }
  }
`;
const Iconstyl = styled(Icon)`
  height:20px !important;
  width:20px !important;
`;
