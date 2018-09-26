import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon,Carousel,Row,Col,Button,Modal,Table,Form,Checkbox,Card,Tabs,Radio } from 'antd';
import G2 from '@antv/g2';
class PieChart extends React.Component {
  constructor(props) {
    super(props);
      this.state = {

      };
  }
  componentDidMount=()=>{
      var data = [{
      type: '感冒',
      color:"#f60",
      value: 56
    }, {
      type: '胃痛',
      value: 18
    }, {
      type: '痛经',
      value: 32
    }, {
      type: '中暑',
      value: 15
    }, {
      type: '痤疮',
      value: 15
    }, {
      type: '其他',
      value: 15
    }];

    // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
    var sliceNumber = 0.01;
    var self = this
    // 自定义 other 的图形，增加两条线
    G2.Shape.registerShape('interval', 'sliceShape', {
      draw: function draw(cfg, container) {
        console.log("skjhda",cfg);
        console.log("s464",container);
        var points = cfg.points;
        var path = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push(['L', points[1].x, points[1].y - sliceNumber]);
        path.push(['L', points[2].x, points[2].y - sliceNumber]);
        path.push(['L', points[3].x, points[3].y]);
        path.push('Z');
        path = this.parsePath(path);
        return container.addShape('path', {
              attrs: {
                fill: cfg.color,
                path: path
              }
            });
          }
        });

        var chart = new G2.Chart({
          container: 'mountNode',
          forceFit: true,
          height:250,
          width:250,
          padding: { top: 10, right:150, bottom: 10, left: 0 }
        });
        chart.guide().html({
          position: ['50%', '50%'],
          html: '<div style="color:##929292;font-size: 14px;text-align: center;width: 10em;">就诊总量<br><span style="color:#272727;font-size:20px">268人</span></div>',
          alignX: 'middle',
          alignY: 'middle'
        });
        chart.source(data);
        chart.coord('theta', {
          innerRadius: 0.75
        });

        chart.tooltip({
          showTitle: false
        });
        chart.legend({
          useHtml: true,
          position: 'right',
          offsetY:-50,
          offsetX:"",
          textStyle: {
            textAlign: 'left', // 文本对齐方向，可取值为： start middle end
            fill: '#404040', // 文本的颜色
            fontSize: '14', // 文本大小
            fontWeight: 'bold', // 文本粗细
            rotate: 0, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
            textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
          },

          itemFormatter(val,g) {
            console.log("jaksjdl",val);
            var str= `<span>${val}</span><span>36%</span><span>55人</span>`
            return str; // val 为每个图例项的文本值
          }
        });
        chart.intervalStack().position('value').color('type').shape('sliceShape');


        chart.render();
        // var geom = chart.getGeoms()[0]; // 获取所有的图形
        // var items = geom.getData(); // 获取图形对应的数据
        //   console.log("items",items);
        }
    render(){
      return(
        <div id="mountNode">
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
export default PieChart
