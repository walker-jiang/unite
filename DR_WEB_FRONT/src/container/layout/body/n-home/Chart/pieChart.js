import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon,Carousel,Row,Col,Button,Modal,Table,Form,Checkbox,Card,Tabs,Radio } from 'antd';
import G2 from '@antv/g2';
// import Ajax from '../../../../rightAssistBar/service/xhr/index';
import Ajax from '../../../../../util/commonFunction/ajaxGetResource';
class PieChart extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        daTa:[]
      };
  }
  upData=(timeDate,ook)=>{
    // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
    var sliceNumber = 0.01;
    var self = this
    // 自定义 other 的图形，增加两条线
    G2.Shape.registerShape('interval', 'sliceShape', {
      draw: function draw(cfg, container) {
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

    window.piechartPaint=()=>{
      var all=0;
      self.state.daTa.forEach(item=>{
        if(item.value == '' || item.value == 'NaN'){
          item.value = 0
        }
        all += parseInt(item.value)
      })
      var divHtml;
      if(all == 0){
        divHtml=`<div style="color:##929292;font-size: 14px;text-align: center;width: 10em;">就诊总量<br><span style="color:#272727;font-size:20px"> 0 </span></div>`
      }else{
        divHtml=`<div style="color:##929292;font-size: 14px;text-align: center;width: 10em;">就诊总量<br><span style="color:#272727;font-size:20px"> ${all} </span></div>`
      }
      chart.guide().html({
        html: divHtml,
        alignX: 'middle',
        alignY: 'middle',
        position: ['50%', '50%']
      });
    }
    if (ook=="first") {
       window.chart = new G2.Chart({
        container: 'mountNode',
        forceFit: true,
        height:250,
        width:250,
        padding: { top: 10, right:150, bottom: 10, left: 0 }
      });
      window.piechartPaint();
      window.chart.source(this.state.daTa,{
        percent: {
          formatter: function formatter(val) {
            val = val * 100 + '%';
            return val;
          }
        }
      });
      // window.chart.changeData(this.state.daTa)
      window.chart.coord('theta', {
        innerRadius: 0.75
      });
      window.chart.tooltip({
        showTitle: false
      });
      var this_ =this;
      window.chart.legend({
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

          var data=this_.state.daTa.find(item=>{
            return item.type==val
          })
          var all=0;
          this_.state.daTa.forEach(item=>{
            if(item.value == '' || item.value == 'NaN'){
              item.value = 0
            }
            all += parseInt(item.value)
          })
          var str;
          // console.log('Math.floor(parseInt(data.value)/all*100)',(parseInt(data.value)/all*100).toFixed(1)-(1/all).toFixed(1),Math.round(parseInt(data.value)/all*100),data.value);
          if(all == 0){
            str=`<span>${data.type}</span> <span> 0%</span>  <span>${data.value}人</span>`
          }else{
            str=`<span>${data.type}</span> <span> ${Math.round(parseInt(data.value)/all*100)}%</span>  <span>${data.value}人</span>`
          }

          return str; // val 为每个图例项的文本值
        }
      });
      window.chart.intervalStack().position('value').color('type').shape('sliceShape');
      window.chart.render();
    }else{
      window.chart.guide().clear();// 清理guide
      window.piechartPaint();
      window.chart.source(self.state.daTa);
      window.chart.repaint();
    }



    // var geom = chart.getGeoms()[0]; // 获取所有的图形
    // var items = geom.getData(); // 获取图形对应的数据
  }
  componentDidMount=()=>{
    this.props.onRef(this);
    this.piechartDate("day","first");
  }
  piechartDate=(timeDate,ook)=>{
    var date = new Date(),
        year = date.getFullYear(),//年
        month = parseInt(date.getMonth())+parseInt(1),//月
        date = date.getDate(),//日
        h = new Date().getHours(),//h
        m = new Date().getMinutes(),//m
        s = new Date().getSeconds(),//s
        st1 = year+'-'+month+'-'+date+' '+'00:00:00',
        st = year+'-'+month+'-'+date+' '+h+':'+m+':'+s,
        monthStart = year+'-'+month+'-'+'1'+' '+'00:00:00',
        yearStart = year+'-'+'1'+'-'+'1'+' '+'00:00:00';
    var data={};
    // var dateTime = new Date(new Date().toLocaleDateString()).getTime()
    if(timeDate){
      if(timeDate == 'day'){
        data ={
          beginTime:st1,
          endTime:st,
          doctorid:window.sessionStorage.getItem('userid')
        }
      }else if(timeDate == 'month'){
        data ={
          beginTime:monthStart,
          endTime:st,
          doctorid:window.sessionStorage.getItem('userid')
        }
      }else if (timeDate == 'year') {
        data ={
          beginTime:yearStart,
          endTime:st,
          doctorid:window.sessionStorage.getItem('userid')
        }
      }
    }else{
      data ={
        beginTime:st1,
        endTime:st,
        doctorid:window.sessionStorage.getItem('userid')
      }
    }
    const params = {
      type:'get',
      dataType:'JSON',
      contentType:'application/json;charset=UTF-8',
      async:true,
      server_url:config_service_url,
      url:'IndexController/getProportionAnalysis',
      data:data
    }
    Ajax(params,scallBack,ecallback);
    var this_=this,dataA = [];
    function scallBack(res){
      var disval=0;
      res.data.map((val,i) => {
        if( val.disname == ''){//把disname是空的对应的disnamecount值添加到'其他'里面
          disval += parseInt(val.disnamecount)
        }
        if(val.disname){//disname不是空时
          if(val.disname == '其他' && val.disnamecount=='' || val.disname == '其他' && val.disnamecount=='NaN'){
            val.disnamecount = disval;
          }else if (val.disname == '其他' && val.disnamecount !='' || val.disname == '其他' && val.disnamecount !='NaN') {
            val.disnamecount = parseInt(val.disnamecount) + disval;
          }
          dataA.push({type:val.disname,value:parseInt(val.disnamecount)})
        }
      })
      this_.setState({
        daTa:dataA
      },()=>{
          this_.upData(timeDate,ook)
      });

    }
    function ecallback(res){
      console.log('errorres',res);
    }
  }
  render(){
    return(
      <div id="mountNode">

        <h2 style={{
            fontFamily: "Microsoft Tai Le Negreta, Microsoft Tai Le Normal, Microsoft Tai Le",
            fontSize:"14px",
            fontWeight: 700,
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
