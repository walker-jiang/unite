import React, { Component } from 'react';
import { Icon, Row, Col, Card, Tag, Divider, Avatar  } from 'antd';
import './style/ChartStyle';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/graph';
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';
import LoginService from '../../services/loginService';
class DiagramChart extends Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    componentWillMount(){

    }
    randomColor(){
      var colorList=['#FC6B94','#80BE94','#FC946B','#0099FF','#9C27B0']
      var value = Math.floor(Math.random()*4);
      return colorList[value];
    }
    /**
     * 展开或关闭节点
     * @param chart
     * @param params
     */
    toggleShowNodes = (chart, params) => {
        console.log("chart",chart)
        console.log("params",params)

    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('DiagramChart'));

        var datas = [{
                    name: '感冒',
                }, {
                    name: '适宜技术',
                }, {
                    name: '病因',
                }, {
                    name: '辩证论治',
                }, {
                    name: '方剂',
                }, {
                    name: '预防检查',
                }, {
                    name: '饮食保健',
                }, {
                    name: '医案',
                }, {
                    name: '文献',
                }, {
                    name: '测试1',
                },{
                    name: '测试2',
                },
        ];

        for(var i = 0; i<datas.length; i++){
            if(i===0){
                datas[i].itemStyle = {
                    normal: {
                        color: this.randomColor()
                    }
                };
            }else{
                datas[i].itemStyle = {
                    normal: {
                        color: this.randomColor()
                    }
                };
            }
        }
        // 绘制图表
        myChart.setOption({
              animationEasingUpdate: 'quinticInOut',
              label: {
                  normal: {
                      show: true,
                      textStyle: {
                          fontSize: this.props.fontSize
                      },
                  }
              },
              series: [{
                  type: 'graph',
                  layout: 'force',
                  symbolSize: this.props.symbolSize,//圆圈大小
                  //symbol:'image://https://www.banbaowang.com/uploads/allimg/180223/32-1P223113403.jpg',
                  focusNodeAdjacency:false, //触碰渐变
                  roam: false,//是否可拖拽
                  draggable: false,//节点跟随转动
                  force: {
                      repulsion: this.props.repulsion,
                      layoutAnimation:false, //节点跟随转动
                      edgeLength:this.props.edgeLength,
                  },
                  label: {
                      normal: {
                          show: true,
                          textStyle: {
                              fontSize: this.props.fontSize,
                          },
                      },
                  },
                  lineStyle: {
                      normal: {
                          opacity: 0.9,
                          width: 1,
                      },
                      emphasis:{
                          color: '#ec407a'
                      }
                  },
                  data: datas,
                  links: [
                  {source: 0,target: 1,},
                  {source: 0,target: 2,},
                  {
                      source: 0,
                      target: 3,
                  }, {
                      source: 0,
                      target: 4,
                  }, {
                      source: 0,
                      target: 5,
                  }, {
                      source: 0,
                      target: 6,
                  }, {
                      source: 0,
                      target: 7,
                  },{
                      source: 0,
                      target: 8,
                  },{
                      source: 8,
                      target: 9,
                  },{
                      source: 8,
                      target: 10,
                  }]
              }]
        });
        myChart.on("mouseover", function(data) {
            // 取消节点连接线触发效果
            if (data.dataType == "edge") {
                myChart.dispatchAction({
                    type: 'unfocusNodeAdjacency',
                    seriesIndex: 0
                });
            }
        })
        this.toggleShowNodes(myChart);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    render() {
        var self = this;
        return (
            <div style={{height:this.props.height,width:this.props.width}} id="DiagramChart"></div>
        );
    }
}

export default DiagramChart;
