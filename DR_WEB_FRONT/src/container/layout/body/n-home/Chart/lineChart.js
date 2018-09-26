import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon,Carousel,Row,Col,Button,Modal,Table,Form,Checkbox,Card,Tabs,Radio } from 'antd';
import G2 from '@antv/g2';
class LineChart extends React.Component {
  constructor(props) {
    super(props);
      this.state = {

      };
  }
  componentDidMount=()=>{
    var data = [{
    "month": "Jan",
    "city": "日新增患者量",
    "temperature": 7
  }, {
    "month": "Jan",
    "city": "日就诊总量",
    "temperature": 3.9
  }, {
    "month": "Feb",
    "city": "日新增患者量",
    "temperature": 6.9
  }, {
    "month": "Feb",
    "city": "日就诊总量",
    "temperature": 4.2
  }, {
    "month": "Mar",
    "city": "日新增患者量",
    "temperature": 9.5
  }, {
    "month": "Mar",
    "city": "日就诊总量",
    "temperature": 5.7
  }, {
    "month": "Apr",
    "city": "日新增患者量",
    "temperature": 14.5
  }, {
    "month": "Apr",
    "city": "日就诊总量",
    "temperature": 8.5
  }, {
    "month": "May",
    "city": "日新增患者量",
    "temperature": 18.4
  }, {
    "month": "May",
    "city": "日就诊总量",
    "temperature": 11.9
  }, {
    "month": "Jun",
    "city": "日新增患者量",
    "temperature": 21.5
  }, {
    "month": "Jun",
    "city": "日就诊总量",
    "temperature": 15.2
  }, {
    "month": "Jul",
    "city": "日新增患者量",
    "temperature": 25.2
  }, {
    "month": "Jul",
    "city": "日就诊总量",
    "temperature": 17
  }, {
    "month": "Aug",
    "city": "日新增患者量",
    "temperature": 26.5
  }, {
    "month": "Aug",
    "city": "日就诊总量",
    "temperature": 16.6
  }, {
    "month": "Sep",
    "city": "日新增患者量",
    "temperature": 23.3
  }, {
    "month": "Sep",
    "city": "日就诊总量",
    "temperature": 14.2
  }, {
    "month": "Oct",
    "city": "日新增患者量",
    "temperature": 18.3
  }, {
    "month": "Oct",
    "city": "日就诊总量",
    "temperature": 10.3
  }, {
    "month": "Nov",
    "city": "日新增患者量",
    "temperature": 13.9
  }, {
    "month": "Nov",
    "city": "日就诊总量",
    "temperature": 6.6
  }, {
    "month": "Dec",
    "city": "日新增患者量",
    "temperature": 9.6
  }, {
    "month": "Dec",
    "city": "日就诊总量",
    "temperature": 4.8
  }];

  var chart = new G2.Chart({
    container: 'id',
    forceFit: true,
    height:250,
  });
  chart.source(data, {
    month: {
      range: [0, 1]
    }
  });
  chart.tooltip({
    crosshairs: {
      type: 'line'
    }
  });
  chart.legend({
    position: 'top',
    offsetY:8,
    offsetX:60,
    marker:"circle",
  });
  chart.axis('temperature', {
    label: {
      formatter: function formatter(val) {
        return val
      }
    }
  });
  chart.line().position('month*temperature').color('city');
  chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
    stroke: '#fff',
    lineWidth: 1
  });
  chart.render();
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
              height:"70px",
              lineHeight: "70px"}}>
              本日就诊患者疾病占比分析
          </h2>
        </div>
      )
    }
}
export default LineChart
