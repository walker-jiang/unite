import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon,Carousel,Row,Col,Button,Modal,Table,Form,Checkbox,Card,Tabs,Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { Header, Content, Footer, Sider } = Layout;
import "./home.less"
import $ from "jquery"
import HomeTabs from "./homeTabs"
import PieChart from "./Chart/pieChart.js"
import LineChart from "./Chart/lineChart.js"
class Home extends React.Component {

constructor(props) {
  super(props);
    this.state = {
        show:false,//拉灯
        set:false,//定住
    };
}
componentDidMount=()=>{
  console.log("科室ID", window.sessionStorage.getItem('deptid'));
      //   $http.get('http://192.168.1.146:8087/buPatientReceiveController/getList', {
      //   params: {
      //     orgid:window.sessionStorage.getItem('orgid'),
      //     beginTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
      //     endTime:new Date(),
      //     rcStatus:0,
      //     deptid:window.sessionStorage.getItem('deptid'),
      //   }
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log("error",error);
      // });
      var  str = {
        orgid:window.sessionStorage.getItem('orgid'),
        beginTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
        endTime:new Date(),
        rcStatus:0,
        deptid:window.sessionStorage.getItem('deptid'),
      }
      $.ajax({
          type: 'GET', //请求的方式
          url:" http://192.168.1.146:8087/buPatientReceiveController/getList",
          data: str, //发给服务器的数据
          dataType: 'json',
          success: (data)=>{
            console.log("data",data);
          },
        });

}
changeMenuItem=(value)=>{

}

callback=(key)=> {
  console.log(key);
}
onChange=(e)=>{
  console.log(`radio checked:${e.target.value}`);
}
deng=()=>{
  var show=!this.state.show
  this.setState({show})
  console.log("askd");
}
dingzhu=()=>{
  var set =!this.state.set
  this.setState({set})
}
  render() {
    var style=!this.state.set?{
          width:"30%",
          minWidth:"346px",
          left:"70%",
          borderTop:"1px solid #ccc",
          borderLeft:"1px solid #ccc",
          borderBottom:"1px solid #ccc",
          marginLeft:"25px",
          padding:"20px",
          position:"absolute",
          top:`${this.state.show?"-20px":"-1000px"}`,
          background:"#fff",
          zIndex:"1",
          transition:"top .5s"}:{
            width:"28%",float:"left",background:"",minWidth:"346px",borderLeft:"1px solid #CCCCCC",marginLeft:"20px",padding:"0 0 0 20px"
          }
    const columns = [
          {
            title: '患者姓名',
            dataIndex: 'patientname',
            width:"8%"
          },
          {
            title: '患者编号',
            dataIndex: 'patientid',
              width:"11%"
          },
          {
            title: '性别',
            dataIndex: 'sex',
              width:"6%"
          },
          {
            title: '年龄',
            dataIndex: 'age',
              width:"6%"
          },
          {
            title: '手机号',
            dataIndex: 'mobile',
              width:"11%"
          },
          {
            title: '身份证号',
            dataIndex: 'b',
              width:"12%"
          },
          {
            title: '患者类型',
            dataIndex: 'c',
              width:"8%"
          },
          {
            title: '就诊类型',
            dataIndex: 'd',
              width:"7%"
          },
          {
            title: '就诊科室',
            dataIndex: 'deptid',
              width:"7%"
          },
          {
            title: '就诊医生',
            dataIndex: 'doctorname',
              width:"7%"
          },
          {
            title: '登记时间',
            dataIndex: 'beginTime',
            width:"11%"
          },
          {
            title: '操作',
            dataIndex: 's',
              width:"6%",
            render:()=>{
              return (
                <div style={{color:"#3366ff"}}>接诊</div>
              )
            }
          }
        ];
      const data = [
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '2',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '3',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '4',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '5',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '6',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '7',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '8',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '9',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        }
    ];
    const columns2 = [
          {
            title: '患者姓名',
            dataIndex: 'patientname',
            width:"10%"
          },
          {
            title: '患者编号',
            dataIndex: 'patientid',
              width:"10%"
          },
          {
            title: '性别',
            dataIndex: 'sex',
              width:"10%"
          },
          {
            title: '年龄',
            dataIndex: 'age',
              width:"10%"
          },
          {
            title: '手机号',
            dataIndex: 'mobile',
              width:"11%"
          },
          {
            title: '身份证号',
            dataIndex: 'b',
              width:"10%"
          },
          {
            title: '患者类型',
            dataIndex: 'c',
              width:"10%"
          },
          {
            title: '就诊日期',
            dataIndex: 'beginTime',
            width:"11%"
          },
          {
            title: '操作',
            dataIndex: 's',
              width:"10%",
            render:()=>{
              return (
                <div style={{color:"#3366ff"}}><span>继续接诊</span>|<span>完成接诊</span></div>
              )
            }
          }
        ];
      const data2 = [
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        },
        {
          key: '1',
          age: 32,
          sex:"男",
          patientname:"刘德华",
          patientid:"1102342456",
          mobile:"152****4321",
          b:"110105**********78",
          c:"普通医保",
          d:"初诊",
          deptid:"中医科",
          doctorname:"王琰龙",
          beginTime:"2018-04-01 10:12:22",
        }
    ];
    return (
      <div className="home" style={{margin:"20px 25px",background:"",position:"relative"}}>
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
            zIndex:100,
            top:`${this.state.show?"-20px":"0"}`,
            left:"90%",
            transition:"all .5s"}}
            onClick={this.deng}><span style={{position:"absolute",height:"35px",width:"2px",background:"#797979",top:"-38px",left:"9px"}}></span>析</div>
        <div style={{width:`${!this.state.set?"100%":"70%"}`,float:"left",background:""}}>
        <Row className="fontStyle">
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 7, offset: 0 }}>
            <Card >
              <p>今日就诊总量</p>
              <p>268人</p>
            </Card></Col>
          <Col xs={{ span: 11, offset: 1 }} lg={{ span:7, offset: 1 }} style={{marginLeft:"6%"}}>
            <Card>
              <p>今日首诊总量</p>
              <p>118人</p>
            </Card>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 7, offset: 1 }} style={{marginLeft:"6%"}}>
            <Card>
              <p>今日首诊总量</p>
              <p>223人</p>
            </Card>
          </Col>
        </Row>
        <Row style={{fontSize:"18px",color:"#0A6ECB",fontFamily: "'Arial Normal', 'Arial'",margin:"20px 0 10px 0"}}>
          <div className='dian'>今日门诊</div>
        </Row>
        <Row>
          <HomeTabs columns={columns} data={data} columns2={columns2} data2={data2} columns3={columns2} data3={data2}></HomeTabs>
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
                  患者疾病占比<button onClick={this.dingzhu} style={{float:"right",width:"16px",height:"16px",borderRadius:"50%",border:"2px solid #4C94D6",background:"#fff",cursor: "pointer"}}></button>
              </Row>

              <div  style={{overflow:"hidden"}}>
                <RadioGroup onChange={this.onChange} defaultValue="a" size="small">
                  <RadioButton value="a">全部</RadioButton>
                  <RadioButton value="b">内科</RadioButton>
                  <RadioButton value="c">肿瘤科</RadioButton>
                </RadioGroup>
                <PieChart></PieChart>
              </div>
              <div style={{borderTop:"1px solid #CCCCCC",overflow:"hidden"}}>
                <div style={{border:"1px solid #ccc",marginTop:"20px",borderRadius:"4px"}}>
                  <LineChart></LineChart>
                </div>
              </div>
        </div>
      </div>

    );
  }
}
export default Home
