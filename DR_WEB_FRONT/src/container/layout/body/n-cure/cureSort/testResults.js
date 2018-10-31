import React, {Component} from 'react';
import { Row, Col, Menu, Icon } from 'antd'
import $ from 'jquery';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import "../css/testResults.less";
import duihao from "../images/duihao.png";
import history from "../images/history.png";
import right2 from "../images/right2.png";
import test from "../images/test.png";
import printImages from "../images/print.png";
import exportFile from "../images/exportFile.png";
import result from "../images/result.png";
import advice from "../images/advice.png";
import xian from "../images/xian.png";
import xiatu from "../images/xiatu.png";
import his from "../images/his.png";
import ScrollArea from 'components/scrollArea';
import getResource from 'commonFunc/ajaxGetResource';

const bodyHeight = document.body.clientHeight;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class TestResults extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: '1',
      display: 'none',
      status: 0,
      show : true,
      url: '',
      openKeys: ['2018'],
      time: '',
      yearEight: [],
      bodyType: '',
      performance: '',
      diet: '',
      motion: '',
      reminder: '',
      lifeWay: '',
      scoreChart: [],
      echartLabel: '',
      echartValue: '',
      imgUrl: '',
      printDataSource: []
    };
    this.handClick = this.handClick.bind(this);
    window.RportPrintCure = (params) => this.RportPrintCure(params)
  };

  handClick(){
    let pram = 3;
    this.props.onToggle(pram);
  }

  /**
   * [RportPrintCure 从客户端打印回调函数]
   * @param {[type]} params [返回打印是否完成]
   */
  RportPrintCure(params){
    console.log('返回打印是否完成',params);
  };

  //加载时间菜单
  getTimeMenuData(){
    let userId = this.props.userId;//子组件拿到父组件的属性
    let params = {
          type: 'GET',
          async : true,
          server_url: config_CureService_url,
          url: 'healthcabin/checkbody/gettimelist',
          contentType: '',
          data:{
            userId:userId
          }
        };
        let that = this;
        function success(res){
          that.setState({
            yearEight: res.data[2018]
          }, function(){
            this.getResultsData();
          })
        };

        function error(res){
            console.log('左侧时间菜单获取失败');
        };
        getResource(params, success, error);
  }

  //根据时间显示结果
  getResultsData(){
    let userId = this.props.userId;//子组件拿到父组件的属性
    let key = this.state.yearEight[0];
    let params = {
          type: 'GET',
          async : true,
          server_url: config_CureService_url,
          url: 'healthcabin/checkbody/getBodyCheckResultByTime',
          contentType: '',
          data: {
            time: key,
            userId: userId
          }
        };
        let that = this;
        function success(res){
          that.setState({
            printDataSource: res,
            scoreChart: res.data.scoreChart,//echert数据
            bodyType: res.data.conclusion.bodyType,//体质
            performance: res.data.conclusion.performance,//体质描述
            diet: res.data.solution.diet,//饮食
            motion: res.data.solution.motion,//运动
            reminder: res.data.solution.reminder,//温馨提示
            lifeWay: res.data.solution.lifeWay,//生活方式
            imgUrl: res.data.resultStr,//二维码
          },function(){
            this.onEcharts();
          })
        };

        function error(res){
            console.log('右侧列表获取失败');
        };
        getResource(params, success, error);
  }

  getClickResultsData(){
    let userId = this.props.userId;//子组件拿到父组件的属性
    let time = this.state.time;//获取点击的Key值
    let params = {
          type: 'GET',
          async : true,
          server_url: config_CureService_url,
          url: 'healthcabin/checkbody/getBodyCheckResultByTime',
          contentType: '',
          data: {
            userId: userId,
            time: time
          }
        };
        let that = this;
        function success(res){
          that.setState({
            printDataSource: res,
            scoreChart: res.data.scoreChart,//echert数据
            bodyType: res.data.conclusion.bodyType,//体质
            performance: res.data.conclusion.performance,//体质描述
            diet: res.data.solution.diet,//饮食
            motion: res.data.solution.motion,//运动
            reminder: res.data.solution.reminder,//温馨提示
            lifeWay: res.data.solution.lifeWay,//生活方式
          }, function(){
            this.onEcharts();
          })
        };

        function error(res){
            console.log('右侧列表获取失败');
        };
        getResource(params, success, error);
  }

  componentWillMount(){
    // 加载默认左侧时间菜单显示右侧list
    this.getTimeMenuData();
  }

  menuHandleClick = (e) => {
    // 左侧菜单栏
    let key = e.key;
    this.setState({
      time: key
    }, function(){
      this.getClickResultsData();
    })
  }

  iconClick(){
    // 显示隐藏左侧菜单
    if(this.state.display == 'none'){
      this.setState({
        display: 'block',
        status: 1
      })
    } else if(this.state.display == 'block'){
      this.setState({
        display: 'none',
        status: 0
      })
    }
  }

  printClick(){
    let printDataSource = this.state.printDataSource;
    delete(printDataSource["status"]);
    delete(printDataSource["msg"]);
    delete(printDataSource["result"]);
    let time = this.state.time || this.state.yearEight[0];
    let { sexDesc, name, patientAge } = this.props;
    printDataSource.data.name = name;
    printDataSource.data.time = time;
    printDataSource.data.sexDesc = sexDesc;
    printDataSource.data.age = patientAge;
    // let newData={ name, time, sexDesc, patientAge, ...printDataSource }
    console.log('printDataSource',JSON.stringify(printDataSource));
    window.reportPrint(1,JSON.stringify(printDataSource))
  }

  pdfClick(){
    // 导出PDF
    var pdf = new jsPDF('p', 'mm', 'a4');
        var print_content = $('#testResult');
        var filename = '测评结果.pdf';
        $('#testResult').css("background", "#fff")
        pdf.addHTML($('#testResult'), function(){
            pdf.output("save", filename)
        })
  }

  onEcharts() {
        let scoreChart = this.state.scoreChart;
        // 基于准备好的dom，初始化echarts实例
        let can = document.getElementById('canvas');
        let myChart = echarts.init(can);
        // 绘制图表
        myChart.setOption({
            backgroundColor: 'white',
            title: {
              text: '详细图表' ,
              x:'center',
              textStyle: {
                fontSize: 15,
                fontStyle: 'normal',
                fontWeight: 'bold'
            }
            },
            tooltip: {},
            animation: false,
            grid:{
                  x:60,
                  y:40,
                  x2:5,
                  y2:26,
                  borderWidth:1
                },
            xAxis: {
                data: [scoreChart[0].label, scoreChart[1].label, scoreChart[2].label, scoreChart[3].label, scoreChart[4].label, scoreChart[5].label, scoreChart[6].label, scoreChart[7].label, scoreChart[8].label]
            },
            yAxis: {
              type: 'value',
              scale: true,
              max: 90,
              min: 0,
              splitNumber: 6,
              axisLine:{show:false}
            },
            series: [{
                name: '体质',
                type: 'bar',
                itemStyle:{
                            normal:{
                              label : {
                                show: true,
                                position: 'inside'
                              },
                              color:'#0175c2'
                            },
                            emphasis :{
                              label : {
                                show: true,
                                position: 'inside'
                              },
                              color:'#0175c2'
                            }
                          },
                splitLine:{
                  lineStyle:{
                    type: 'dotted'
                  }
                },
                data: [scoreChart[0].value, scoreChart[1].value, scoreChart[2].value, scoreChart[3].value, scoreChart[4].value, scoreChart[5].value, scoreChart[6].value, scoreChart[7].value, scoreChart[8].value]
            }]
        });
        // 把echarts图片转成64编码的图片
        var imgSrc = can.toDataURL("image/png");
        // 渲染到图表上面，遮住图表
        let self = this;
        this.setState({
          url: imgSrc
        });

      }

  rootSubmenuKeys = ['2018', '2017'];
  onOpenChange = (openKeys) => {//点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁和方便获取年份
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    let { imgUrl, url, status, yearEight, bodyType, performance, diet, motion, reminder, lifeWay} = this.state;
    let sexDesc = this.props.sexDesc;
    let name = this.props.name;
    let patientAge = this.props.patientAge;
    let phone = this.props.phone;
    let time = this.state.time?this.state.time:this.state.yearEight[0];
    let s = null;
    if(status == 0){
      s = history
    } else if(status == 1){
      s = right2
    }
    let list = null;
    if(this.state.yearEight.length != 0){//判断菜单，如果为零则不进入。
      var aa = this.state.yearEight[0];
      list = <Menu onClick={this.menuHandleClick}
              style={{ width: 128 }}
              defaultSelectedKeys={[aa]}
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              mode="inline"
              className="cureMenuSelf"
            >
                <SubMenu key="2018" title="2018" className="fugai" onTitleClick={this.titleClick}>
                  {
                    this.state.yearEight.map((value,index)=>{
                      return(
                        <Menu.Item key={value} className="cureMenuItem">{value}</Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              </Menu>
    }
    return (
      <div id="testResult" style={styles.names}>
          <Row type="flex" justify="start" style={styles.rowMarginTop}>
            <Col lg={2} xl={2} xxl={2} offset={1}>
              <div>
                <img src={duihao} style={styles.duihao}/>
              </div>
            </Col>  
            <Col lg={14} xl={14} xxl={14} style={styles.long}>
              <div>
                <span style={styles.testTip}>该患者本次体质辨析测评已完成，结果如下(时间：{time})：</span>
              </div>
            </Col>    
            <Col lg={1} xl={1} xxl={1} offset={1}> 
                <img src={imgUrl} style={styles.erweima}/>
            </Col>  
            <Col lg={5} xl={5} xxl={5} style={styles.rightImage}> 
              <div id="noPrint">
                <img src={s}
                onClick={this.iconClick.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <img src={xian} style={styles.xian}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <img src={test} style={styles.test}
                onClick={this.handClick}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <img src={xian} style={styles.xian}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <img src={printImages} style={styles.printImages} id="snapshotButton"
                onClick={this.printClick.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <img src={xian} style={styles.xian}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <img src={exportFile} style={styles.exportFile}
                onClick={this.pdfClick.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col lg={24} xl={24} xxl={24}>
              <div style={styles.patientSecond}>
                <span style={styles.patientText}>测评患者:</span>
                <span style={styles.patientMessage}>{name}&nbsp;&nbsp;/&nbsp;&nbsp;{sexDesc}&nbsp;&nbsp;/&nbsp;&nbsp;{patientAge}&nbsp;&nbsp;/&nbsp;&nbsp;{phone}</span>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col lg={24} xl={24} xxl={24}>
              <div style={styles.flexStyle}>
                <div style={styles.firstBorder} style={{display:this.state.display}}>
                  <div style={styles.historyRemember}>
                    <p style={styles.fontStyle}>• 历史测评记录 </p>
                    <img src={his} style={styles.his}/>
                  </div>
                  <div>
                    {list}
                  </div>
                </div>
                <div style={styles.threeBorder}>
                  <ScrollArea height={222}>
                    <div style={styles.allStyle}>
                      <div style={styles.allStyle1}>
                        <div style={styles.jielun}>
                          <img src={result} style={styles.result}/>
                          <span style={styles.cpjl}>测评结论</span>
                        </div>
                        <div style={styles.resultBorder}>
                          <div style={styles.pWeiZhi}>
                            <p style={styles.pTitle}>
                              <span>🔊</span>
                              <span>您的体质为：</span>
                              <span style={styles.haha}>{bodyType}</span>
                            </p>
                            <p style={styles.pTitle1}>{performance}</p>
                          </div>
                        </div>
                      </div>
                      <div style={styles.allStyle2}>
                        <div style={styles.tubiao}>
                          <img src={result} style={styles.result}/>
                          <span style={styles.tbfx}>图表分析</span>
                        </div>
                        <div id="echartBorder" style={styles.echartThink}>
                          <img style={styles.snapshotImageElement} src={url}/>
                          <canvas id="canvas" style={styles.canvasImage} width="500" height="178">canvas not supported</canvas>
                        </div>
                      </div>
                    </div>
                    <div style={styles.nextAll}>
                      <div style={styles.next1}>
                        <img src={advice} style={styles.advice}/>
                        <p style={styles.adviceP}>针对性建议</p>
                        <img src={xiatu} style={styles.xiatu}/>
                      </div>
                      <div style={styles.next2}>
                        <ul style={styles.ul1}>
                          <li>
                            饮食
                            <p style={styles.ulLiFirst}>{diet}</p>
                          </li>
                          <li>
                            运动
                            <p style={styles.ulLiFirst}>{motion}</p>
                          </li>
                          <li>
                            生活方式
                            <p style={styles.ulLiFirst}>{lifeWay}</p>
                          </li>
                          <li>
                            温馨提示
                            <p style={styles.ulLiFirst}>{reminder}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </Col>
          </Row>
      </div>
    );
  }
}

/*
@作者：王崇琨
@日期：2018-06-30
@描述：治未病-显示答题结果
*/

const styles = {
  canvasImage:{
    backgroundColor: 'white'
  },
  firstBorder: {
    marginTop: '3%'
  },
  names:{
    overflow: 'hidden',
    width: '100%',
    height: 'cal(100% - 400px)'
  },
  testResult2:{
    float: 'right',
    marginTop: '-5rem'
  },
  long:{
    marginLeft: '-3rem',
    marginTop: '1rem'
  },
  rowMarginTop:{
    marginTop: '1rem'
  },
  rightImage: {
    marginTop: '1rem'
  },
  test:{
    width: '33px',
    height: '34px'
  },
  duihao:{
    width: '57px',
    height: '62px',
    marginTop: '-0.6%'
  },
 testTip:{
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '20px',
    color: 'black',
    // marginLeft: '1.5%'
  },
  erweima: {
    width: '4rem',
    // marginLeft: '74rem',
    // marginTop: '-5rem'
  },
  allStyle:{
    overflow: 'hidden',
    marginTop: '1%',
    width: '100%'
  },
  allStyle1:{
    float: 'left',
    width: '45%',
    marginLeft: '1.5%'
  },
  allStyle2:{
    float: 'left',
    width: '45%',
    marginLeft: '2%',
    zIndex: '1'
  },
  resultBorder:{
    height: '180px',
    background: 'inherit',
    boxSizing: 'border-box',
    border: '1px solid #1a76d1',
    borderRadius: '0px',
    overflow: 'hidden'
  },
  haha:{
    color: '#1A76D1'
  },
  pWeiZhi:{
    marginLeft: '3%'
  },
  pTitle:{
    marginTop: '6%',
    fontSize: '14px',
    color: 'black'
  },
  pTitle1:{
    fontSize: '14px',
    color: 'black'
  },
  echartThink:{
    height: '180px',
    background: 'inherit',
    boxSizing: 'border-box',
    border: '1px solid #999999',
    borderRadius: '0px',
    overflow: 'hidden',
    zIndex: '6'
  },
  snapshotImageElement: {
    width: '90%',
    height: '178px',
    backgroundColor: 'white'
  },
  jielun:{
    marginTop: '0.7%',
    fontWeight:'400',
    fontStyle:'normal',
    fontSize: '14px',
    color: 'rgb(255, 255, 255)',
    position: 'relative'
  },
  tubiao:{
    marginTop: '0.6%',
    fontSeight: '400',
    fontStyle: 'normal',
    fontSize: '14px',
    color: '#FFFFFF',
    position: 'relative'
  },
  tbfx: {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    marginLeft: '-6.4rem',
    marginTop: '0.7rem'
  },
  result:{
    backgroundColor: 'white'
  },
  cpjl: {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    marginLeft: '-6.4rem',
    marginTop: '0.7rem'
  },
  advice:{
    marginTop: '1rem',
    marginLeft: '-0.8rem',
    position: 'relative'
  },
  adviceP:{
    marginLeft: '2rem',
    marginTop: '-1.8rem',
    color: 'black',
    fontStyle: 'normal',
    fontSize: '14px',
    position: 'relative'
  },
  xiatu:{
    marginTop: '-2rem',
    marginLeft: '-0.8rem'
  },
  ul1:{
    color: '#1A76D1',
    marginLeft: '1%',
    listStyle: 'block !important'
  },
  ulLiFirst:{
    color: 'black',
    width: '92%'
  },
  firstBorder:{
    width: '131px',
    height:'300px',
    float: 'left',
    marginTop: '32px'
  },
  threeBorder:{
    width: '100%'
  },
  nextAll:{
    width: '100%',
    marginLeft: '2%'
  },
  next1:{
    width: '100%'
  },
  next2:{
    width: '100%'
  },
  flexStyle:{
    width: '100%',
    display: 'flex',
    marginLeft: '2.5rem',
    marginRight: '2.5rem'
  },
  historyRemember:{
    width: '128px',
    height: '26px',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  fontStyle:{
    backgroundColor: '#1a76d1',
    color: 'white',
    width: '100px',
    lineHeight: '24px',
    height: '26px',
    fontSize: '12px',
    float: 'left',
    paddingLeft: '10px'
  },
  his:{
    float: 'right',
  },
  history:{
    width: '33px',
    height: '34px',
    backgroundColor:'white'
  },
  printImages:{
    width: '33px',
    height: '34px',
    backgroundColor:'white'
  },
  exportFile:{
    width: '33px',
    height: '34px',
    backgroundColor:'white'
  },
  patientText:{
    fontFamily: 'MicrosoftYaHei, Microsoft YaHei',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#666666',
  },
  patientMessage: {
    fontFamily: 'MicrosoftYaHei,Microsoft YaHei',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#0A6ECB',
    marginLeft: '1rem'
  },
  patientSecond: {
    display: 'flex',
    marginLeft: '4rem',
    marginTop: '1rem'
  }
};
