import React, { Component } from 'react';
import { Icon, Row, Col, Card, Tag, Divider, Avatar  } from 'antd';
import './style/ChartStyle';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';
import LoginService from '../../services/loginService';
class LineChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        LineChartList:[]
      }
    }
    componentWillMount(){

    }
    componentDidMount() {
      let a=localStorage.getItem("orgcode")
      let b = localStorage.getItem("orgtype")
      let c ={
        orgCode:a,
        orgType:b
      }
      let dataGraph=LoginService.dataGraph(c)
      var xAxisData=[]
      var seriesData=[]
      for(var key in dataGraph.data.everyMonth){
        xAxisData.push(key)
        seriesData.push(dataGraph.data.everyMonth[key])
      }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('LineChart'));
        // 绘制图表
        myChart.setOption({
                title : {
                  text: '企业每个月报告数查询',
                  subtext: ''
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: seriesData,
                    type: 'line'
                }]
        });
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }


    render() {

        var self = this;
        return (
            <div style={{height:400}} id="LineChart"></div>
        );
    }
}

export default LineChart;
