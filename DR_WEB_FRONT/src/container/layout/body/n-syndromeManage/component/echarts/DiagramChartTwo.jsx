import React, { Component } from 'react';
import { Icon, Row, Col, Card, Tag, Divider, Avatar  } from 'antd';
import './style/ChartStyle';
import home from './style/home.png';
import bianzhenglunzhi from './style/bianzhenglunzhi.png';
import fangji from './style/fangji.png';
import bingyin from './style/bingyin.png';
import mingyiyian from './style/mingyiyian.png';
import shiyijishu from './style/shiyijishu.png';
import wenxian from './style/wenxian.png';
import yishibaojian from './style/yishibaojian.png';
import yufangjiancha from './style/yufangjiancha.png';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import $ from 'jquery';
import  'echarts/lib/chart/graph';
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';
import LoginService from '../../services/loginService';
import SearchPageService from '../../services/SearchPageService';
class DiagramChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visiable:false,
        aVisiable:false
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
      this.organEchartData(this.props.dateSource,this.props.queryName);
    }
    organEchartData = (dateSource,queryName) =>{
      console.log("dateSource",dateSource);
      console.log("queryName",queryName);
      var datas = [];
      var links = [];
      datas.push({id:0,symbol:`image://${home}`,symbolSize:100,name:queryName,menuLevel:"1",value:{funurl:"1"}})
      dateSource.forEach((item,index)=>{
        datas.push({
          id:item.fieldid,
          name:item.funname,
          symbol:`image://${fangji}`,
          symbolSize:70,
          value:item,
          isFold:true,// true 可以展开  false 不可展开
          menuLevel:"2",// 1级不可点击   2级出3级  3级点出弹窗
        });
        links.push({
          source: 0,target: item.fieldid,weight:5
        })
      })
      console.log("=========",datas);
      this.setState({ datas,links });
      this.renderEchart(datas,links);
    }
    renderEchart =(datas,links) =>{
      //debugger;
      console.log("准备渲染的数据为",datas);
      console.log("准备链接的方式",links);
      var self = this;
      self.setState({
        datas:datas,
        links:links
      })
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('DiagramChart'));
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
                    position : ['25%', '110%'],//标签的位置。['50%', '50%'] [x,y]
                    textStyle: {
                        fontSize: this.props.fontSize
                    },
                }
            },
            // tooltip:{
            //   show : true,   //默认显示
            //   showContent:true, //是否显示提示框浮层
            //   trigger:'item',//触发类型，默认数据项触发
            //   triggerOn:'click',//提示触发条件，mousemove鼠标移至触发，还有click点击触发
            //   enterable:true,//鼠标是否可进入提示框浮层中
            //   alwaysShowContent:false, //默认离开提示框区域隐藏，true为一直显示
            //   backgroundColor: 'rgba(255,255,255,1)',//背景颜色（此时为默认色）
            //   borderColor:"#ccc",                        //边框颜色
            //   borderWidth:1,
            //   position: function (point, params, dom, rect, size) {
            //     $(dom).html(`<div class="tip"><center><button class="courseBtn">切换中心</button><button class="courseBtnTwo">查看详情</button></center></div>`)
            //   }
            // },
            series: [{
                type: 'graph',
                layout: 'force',
                symbolSize: this.props.symbolSize,//圆圈大小
                legendHoverLink : true,//是否启用图例 hover(悬停) 时的联动高亮
                focusNodeAdjacency : true,
                edgeSymbol: ['none', 'none'],//arrow
                roam : true,
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
                links: links,
            }]
      });
      // myChart.on("mouseover", function(data) {
      //     // 取消节点连接线触发效果
      //     if (data.dataType == "edge") {
      //         myChart.dispatchAction({
      //             type: 'unfocusNodeAdjacency',
      //             seriesIndex: 0
      //         });
      //     }
      // })
      myChart.off('click');
      myChart.on("click", function(data) {
          // 取消节点连接线触发效果
          console.log("==========",data);
          //1，打开右侧显示框
          //2，重新渲染一个新的图谱
          self.setNode(data);
      })
      //this.toggleShowNodes(myChart);
      window.addEventListener("resize", function () {
          myChart.resize();
      });
      myChart.resize();
    }
    QueryAtlasDetail = (data) =>{
      console.log("data88888888888888",data);
      var result = SearchPageService.QueryAtlasDetail({
        "context": data.name,
        "page": 1,
        "size":10,
        "type": data.value.funurl,//data.funurl
      })
      console.log("result=============",result);
      if(result.result){
        if(result.data != null){
          var titleName,titleDesc;
          switch (data.value.funurl) {
            case "1":titleName = result.data.diseasename;titleDesc = result.data.definition;break;
            case "5":titleName = result.data.nameAll;titleDesc = result.data.definition;break;
            case "3":titleName = result.data.nameAll;titleDesc = result.data.apdesc;break;
            case "2":titleName = result.data.titlechAll;titleDesc = result.data.digest;break;
            case "10":titleName = result.data.tm_title_all;titleDesc = result.data.tm_title_all;break;
            case "6":titleName = result.data.scname;titleDesc = result.data.scdesc;break;
            default:titleName = result.data.medicinenameAll;titleDesc = result.data.cpmdesc;break;// case "4":
          }
          console.log("@@@@@@@@@@@@@@",JSON.stringify(titleName));
          this.setState({
            titleName:JSON.stringify(titleName) == undefined ?"暂无信息":titleName,
            titleDesc:JSON.stringify(titleDesc) == undefined ?"暂无信息":titleDesc,
          })
        }else{
          this.setState({
            titleName:"暂无信息",
            titleDesc:"暂无信息",
          })
        }
      }
    }
    QuerySecondLevelMenu = (value) =>{
      var data = value.data;
      console.log("获取二级菜单",data);
      if(data != null){
        var url;
        if(!data.isFold){ // 说明已经展开了需要合上该节点
          //删除该节点
          this.state.links.forEach((item,index)=>{
            if(item.source == data.id){
              console.log("%%%%%%%%%%%%%%%%%%%%",item.source);
              this.state.datas.forEach((j,k)=>{
                if(item.target == j.id){
                  this.state.datas.splice(k,1);//删除节点
                  this.state.datas.length = this.state.datas.length-1
                }
              })
            }
          })
          //删除节点链接
          this.state.links.forEach((item,index)=>{
            if(item.source == data.id){
              this.state.links.splice(index,1);
              this.state.links.length = this.state.links.length-1
            }
          })
          //将点击的节点属性isFold设置成true
          this.state.datas.forEach((item,index)=>{
            if(item.id == data.id){
              item.isFold = true
            }
          })
          //debugger;
          this.renderEchart(this.state.datas,this.state.links);
        }else{
          if(data.value.funurl == 6 || data.value.funurl == 5|| data.value.funurl == 3|| data.value.funurl == 2|| data.value.funurl == 12){
            switch (data.value.funurl) {
              case "6":url="/stechnology/query/index/stec";break;//适宜技术
              case "5":url="/mprescription/query/index/mpre";break;//现代方剂
              case "3":url="/stechnology/query/index/stec";break;//古代方剂
              case "2":url="/cpmedicine/query/index/apre";break;//中成药
              case "12":url="/channelandcollateral/query/index/acup";break;//经络 12
              default:break;
            }
            var params = {
              "context": this.props.queryName,
              "id": data.value.fieldid,
              "page": 1,
              "size": 10,
              "type": data.value.funurl
            }
            var result = SearchPageService.QuerySecondLevelMenu(url,params)
            console.log("有三级菜单，三级菜单是",result);
            if(result.result){
              console.log("this.state.links",this.state.links);
              console.log("this.state.datas",this.state.datas);
              //重新定义节点和链接方式
              //重新定义节点
              result.data.forEach((item,index)=>{
                this.state.datas.push({
                  id:item.id,
                  name:item.name,
                  symbolSize:45,
                  value:item,
                  isFold:true,// true 可以展开  false 不可展开
                  menuLevel:"3",// 1级不可点击   2级出3级  3级点出弹窗
                })
              })
              //重新定义链接方式
              result.data.forEach((item,index)=>{
                this.state.links.push({
                  source:data.value.fieldid,
                  target:item.id,
                  weight:10
                })
              })
              //将点击的节点属性isFold设置成false
              this.state.datas.forEach((item,index)=>{
                if(item.id == data.id){
                  item.isFold = false
                }
              })
              this.renderEchart(this.state.datas,this.state.links);
            }
          }else{
            console.log("暂时没有三级菜单！！！！！！！！！！！！！！");
          }
        }
      }
    }
    setNode = (data) =>{
      console.log("setNode=========",data);
      // 1级不可点击出浮层   2级出3级  3级点出弹窗 重新渲染
      var self = this;
      if(data.data.menuLevel == 1){
        self.QueryAtlasDetail(data.data);
      }else if(data.data.menuLevel == 2){
        self.QueryAtlasDetail(data.data);
        self.QuerySecondLevelMenu(data);
        console.log("data.data%%%%%%%%%%%%%",data.data.value.funurl);
        self.setState({ type:data.data.value.funurl })
      }else{ //3重新渲染
        var context = data.data.name;
        var type = this.state.type;
        console.log("############",data.data.value);
        var result = SearchPageService.QueryAtlas({context:context,type:type});
        if(result.result){
          if(result.data != null && JSON.stringify(result.data) != "[]"){
            self.organEchartData(result.data,context);
            self.setState({aVisiable:true});
          }
        }
      }
      self.setState({ visiable:true });
    }
    render() {
        var { aVisiable, visiable, titleName, titleDesc } =this.state;
        return (
            <div>
              {
                aVisiable
                ?
                <a className="DiagramChartTwo-a"
                  onClick={()=>{ this.organEchartData(this.props.dateSource,this.props.queryName);this.setState({aVisiable:false}) }}
                >
                  返回上一级
                </a>
                :
                null
              }
              {
                visiable
                ?
                <div className="DiagramChartTwo-Card">
                    <Icon type="close-circle" theme="outlined" className="DiagramChartTwo-icon" onClick={()=>{ this.setState({visiable:false}) }}/>
                    <p style={{fontSize:14,color:'#000000',fontWeight:600}}>{titleName}</p>
                    <hr style={{backgroundColor:'#0099FF',height:3,marginTop:-10,width:32,float:'left'}}/>
                    <p style={{fontSize:12,color:'#000000'}}>
                    <div dangerouslySetInnerHTML = {{ __html:titleDesc }}></div>
                    </p>
                    <p style={{position:'absolute',bottom:0,right:8,color:'red',fontSize:12,cursor:'pointer'}}>更多</p>
                </div>
                :
                null
              }
              <div style={{height:this.props.height,width:this.props.width}} id="DiagramChart"></div>
            </div>
        );
    }
}

export default DiagramChart;
