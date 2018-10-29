import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon,Carousel,Row,Col,Button,Modal,Table,Form,Checkbox,Card,Tabs,Radio } from 'antd';
import G2 from '@antv/g2';
import Ajax from '../../../../../util/commonFunction/ajaxGetResource';
class LineChart extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        daTa:[]
      };
  }
  upData=(sel)=>{
    if(sel){
      window.linechart = new G2.Chart({
        container: 'id',
        forceFit: true,
        height:250,
      });
    }
    window.linechart.source(this.state.daTa, {
      month: {
        range: [0, 1]
      }
    });
    window.linechart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    window.linechart.legend({
      position: 'top',
      offsetY:8,
      offsetX:60,
      marker:"circle",
    });
    window.linechart.axis('temperature', {
      label: {
        formatter: function formatter(val) {
          return val
        }
      }
    });
    window.linechart.line().position('month*temperature').color('city');
    window.linechart.point().position('month*temperature').color('city').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    window.linechart.render();
  }
  componentDidMount=()=>{
    this.props.ronRef(this);
    this.linechartDate('day',true);
  }

  linechartDate=(linechartDate,sel)=>{
    var date = new Date(),
        year = date.getFullYear(),//年
        month = parseInt(date.getMonth())+parseInt(1),//月
        dat = parseInt(date.getDate()),//日
        h = new Date().getHours(),//h
        m = new Date().getMinutes(),//m
        s = new Date().getSeconds(),//s
        st1 = year+'-'+month+'-'+parseInt(dat-9)+' '+'00:00:00',
        st = year+'-'+month+'-'+dat+' '+h+':'+m+':'+s,
        monthStart = year+'-'+month+'-'+'1'+' '+'00:00:00',
        yearStart= year+'-'+'1'+'-'+'1'+' '+'00:00:00',
        data;
    console.log('dateTime',st,st1);
    if(linechartDate){
      if(linechartDate == 'day'){
        data ={
          beginTime:st1,
          endTime:st,
          doctorid:window.sessionStorage.getItem('userid'),
          groupBy:'day'
        }
      }else if (linechartDate == 'month') {
        data ={
          beginTime:monthStart,
          endTime:st,
          doctorid:window.sessionStorage.getItem('userid'),
          groupBy:'month'
        }
      }else if (linechartDate == 'year') {
        data ={
          beginTime:yearStart,
          endTime:st,
          doctorid:window.sessionStorage.getItem('userid'),
          groupBy:'year'
        }
      }
    }else{
      data ={
        beginTime:st1,
        endTime:st,
        doctorid:window.sessionStorage.getItem('userid'),
        groupBy:'day'
      }
    }


    // console.log('pathname',data);
    const params = {
      type:'get',
      dataType:'JSON',
      contentType:'application/json;charset=UTF-8',
      async:true,
      server_url:config_service_url,
      url:'IndexController/getStatAnalysis',
      data:data
    }
    Ajax(params,scallBack,ecallback);
    var this_=this,dataA = [];
    function scallBack(res){
      console.log('successres',res);

      res.data.map((val,i) => {
        dataA.push({month:val.times,temperature:val.firstcas,city:'日就诊总量'},{month:val.times,temperature:val.firstcas,city:'日初诊量'},{month:val.times,temperature:val.oldcas,city:'日复诊量'})
      })
      // console.log('dataA',dataA);
      this_.setState({
        daTa:dataA
      },()=>{
          this_.upData(sel)
      });
    }
    function ecallback(res){
      console.log('errorres',res);
    }
    // var data = [{
    //   "month": "Jan",
    //   "city": "日新增患者量",
    //   "temperature": 7
    // }, {
    //   "month": "Jan",
    //   "city": "日就诊总量",
    //   "temperature": 3.9
    // }, {
    //   "month": "Feb",
    //   "city": "日新增患者量",
    //   "temperature": 6.9
    // }, {
    //   "month": "Feb",
    //   "city": "日就诊总量",
    //   "temperature": 4.2
    // }, {
    //   "month": "Mar",
    //   "city": "日新增患者量",
    //   "temperature": 9.5
    // }, {
    //   "month": "Mar",
    //   "city": "日就诊总量",
    //   "temperature": 5.7
    // }, {
    //   "month": "Apr",
    //   "city": "日新增患者量",
    //   "temperature": 14.5
    // }, {
    //   "month": "Apr",
    //   "city": "日就诊总量",
    //   "temperature": 8.5
    // }, {
    //   "month": "May",
    //   "city": "日新增患者量",
    //   "temperature": 18.4
    // }, {
    //   "month": "May",
    //   "city": "日就诊总量",
    //   "temperature": 11.9
    // }, {
    //   "month": "Jun",
    //   "city": "日新增患者量",
    //   "temperature": 21.5
    // }, {
    //   "month": "Jun",
    //   "city": "日就诊总量",
    //   "temperature": 15.2
    // }, {
    //   "month": "Jul",
    //   "city": "日新增患者量",
    //   "temperature": 25.2
    // }, {
    //   "month": "Jul",
    //   "city": "日就诊总量",
    //   "temperature": 17
    // }, {
    //   "month": "Aug",
    //   "city": "日新增患者量",
    //   "temperature": 26.5
    // }, {
    //   "month": "Aug",
    //   "city": "日就诊总量",
    //   "temperature": 16.6
    // }, {
    //   "month": "Sep",
    //   "city": "日新增患者量",
    //   "temperature": 23.3
    // }, {
    //   "month": "Sep",
    //   "city": "日就诊总量",
    //   "temperature": 14.2
    // }, {
    //   "month": "Oct",
    //   "city": "日新增患者量",
    //   "temperature": 18.3
    // }, {
    //   "month": "Oct",
    //   "city": "日就诊总量",
    //   "temperature": 10.3
    // }, {
    //   "month": "Nov",
    //   "city": "日新增患者量",
    //   "temperature": 13.9
    // }, {
    //   "month": "Nov",
    //   "city": "日就诊总量",
    //   "temperature": 6.6
    // }, {
    //   "month": "Dec",
    //   "city": "日新增患者量",
    //   "temperature": 9.6
    // }, {
    //   "month": "Dec",
    //   "city": "日就诊总量",
    //   "temperature": 4.8
    // }];
  }
    render(){
      return(
        <div id="id">
          <h2 style={{
              fontFamily: "Microsoft Tai Le Negreta, Microsoft Tai Le Normal, Microsoft Tai Le",
              fontSize:"14px",
              fontWeight: 700,
              marginLeft:"20px",
              fontStyle: "normal",
              height:"100px",
              lineHeight: "70px"}}>
              患者就诊量趋势分析
          </h2>
        </div>
      )
    }
}
export default LineChart
