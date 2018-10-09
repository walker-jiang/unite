import React, { Component } from 'react';
import { Icon, Row, Col} from 'antd';
import './style/ChartStyle';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';

class PieChart extends Component {
    componentDidMount() {
        var pieList = this.props.pieList;
        console.log("pieList============",pieList)
        var data = [];
        var newPieList = [];
        pieList.forEach((item, index)=>{
          data.push(item.area_name);
          newPieList.push({
            name:item.area_name,
            value:item.root_count
          })
        })
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('PieChart'));
        // 绘制图表
        myChart.setOption({
             tooltip: {
                  trigger: 'item',
                  showContent:true,
                  confine:true,
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  x: 'top',
                  data:data
              },
              series: [
                  {
                      name:'占比',
                      type:'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                              show: false,
                              position: 'center'
                          },
                          emphasis: {
                              show: true,
                              textStyle: {
                                  fontSize: '30',
                                  fontWeight: 'bold'
                              }
                          }
                      },
                      labelLine: {
                          normal: {
                              show: false
                          }
                      },
                      data:newPieList
                  }
              ]
        });
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    render() {
        return (
            <div id="PieChart" style={{ height: 400 }}></div>
        );
    }
}

export default PieChart;
