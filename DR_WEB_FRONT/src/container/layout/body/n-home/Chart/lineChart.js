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
        month =(month<10 ? "0"+month : month),
        dat = date.getDate(),//日
        h = new Date().getHours(),//h
        m = new Date().getMinutes(),//m
        s = new Date().getSeconds(),//s
        st = year+'-'+month+'-'+dat+' '+h+':'+m+':'+s,
        yearStart= (year-4)+'-'+'01'+'-'+'01'+' '+'00:00:00',
        data;
        date.setMonth(date.getMonth()-10);//之前的5个月
        date.setDate(date.getDate()-9);//之前的10个工作日
    var month1 = date.getMonth()+1,
        month1 =(month1<10 ? "0"+month1 : month1),
        year1= date.getFullYear()-1;
    var date1 =new Date(),timestamp, newDate,day1,st1,monthStart;
        timestamp = date1.getTime(),
        newDate = new Date(timestamp - 6 * 24 * 3600 * 1000),
        day1 =(newDate.getDate()<10 ? "0"+newDate.getDate() : newDate.getDate()),
        st1 = newDate.getFullYear()+'-'+(parseInt(newDate.getMonth())+parseInt(1))+'-'+day1+' '+'00:00:00',
        monthStart = year1+'-'+month+'-'+'01'+' '+'00:00:00';
    if(linechartDate){
      if(linechartDate == 'day'){
        data ={
          beginTime:st1,
          endTime:st,
          doctorid:window.sessionStorage.getItem('userid'),
          groupBy:'day'
        }
        getryndata(data,'日就诊总量','日初诊量','日复诊量')
      }else if (linechartDate == 'month') {
        data ={
          beginTime:monthStart,
          endTime:st,
          doctorid:window.sessionStorage.getItem('userid'),
          groupBy:'month'
        }
        console.log('月数据',data)
        getryndata(data,'月就诊总量','月初诊量','月复诊量')
      }else if (linechartDate == 'year') {
        data ={
          beginTime:yearStart,
          endTime:st,
          doctorid:window.sessionStorage.getItem('userid'),
          groupBy:'year'
        }
        getryndata(data,'年就诊总量','年初诊量','年复诊量')
      }
    }else{
      data ={
        beginTime:st1,
        endTime:st,
        doctorid:window.sessionStorage.getItem('userid'),
        groupBy:'day'
      }
      getryndata(data,'日就诊总量','日初诊量','日复诊量')
    }
    var this_=this,dataA = [];
    function getryndata(data,jz,cz,fz){
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
      function scallBack(res){
        if(res.data){
          console.log('患者就诊量趋势分析',res.data);
          res.data.map((val,i) => {
            dataA.push({month:val.times,temperature:val.firstcas,city:jz},{month:val.times,temperature:val.firstcas,city:cz},{month:val.times,temperature:val.oldcas,city:fz})
          })
        }
        this_.setState({
          daTa:dataA
        },()=>{
            this_.upData(sel)
        });
      }
      function ecallback(res){
        console.log('errorres',res);
      }
    }
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
