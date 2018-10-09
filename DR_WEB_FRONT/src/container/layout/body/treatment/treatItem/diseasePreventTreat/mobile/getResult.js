import React, {Component} from 'react';
import { String } from 'core-js';
import { STATUS_CODES } from 'http';
import { Button, Row, Col } from 'antd';
import testAgain from "../images/testAgain.png";
import chooseDate from "../images/chooseDate.png";
import patientInformation from "../images/patientInformation.png";
import testResult from "../images/testResult.png";
import specificSuggestions from "../images/specificSuggestions.png";
import chartAnalysis from "../images/chartAnalysis.png";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/lib/picker/style/css';        // 加载 CSS
import 'antd-mobile/lib/list/style/css';        // 加载 CSS
import 'antd-mobile/lib/white-space/style/css';        // 加载 CSS
import getResource from 'commonFunc/ajaxGetResource';
import '../css/getResult.less'

export default class GetResult extends Component {
  constructor(props){
    super(props);
    this.state={
      url: '',
      data: [],
      cols: 1,
      pickerValue: [],
      asyncValue: [],
      sValue: '',
      time: '',
      newData:[],// piker数据源
      visible: false,
      yearSeven: [],
      yearEight: [],
    }
  };

  componentDidMount () {
    this.getTimeMenuData();
  }

   /**
   * 选择器选择时间
   * @params
   * @return
   */
  onChange = (val) => {
    this.setState({
      sValue: val[1]
    }, function(){
      this.getClickResultsData()
    })
  }

  /**
   * 加载时间菜单
   * @params
   * @return
   */
  getTimeMenuData(){
    let userId = this.props.userId;//子组件拿到父组件的属性
    let params = {
          type: 'GET',
          async : true,
          url: 'healthcabin/checkbody/gettimelist',
          server_url: config_CureService_url,
          contentType: '',
          data:{
            userId:userId
          }
        };
        let that = this;
        function success(res){
          var newData= [];
          var key;
          for(key in res.data){
            var newObj = {};
            newObj['label'] = key;
            newObj['value'] = key;
            var children =[];
            res.data[key].forEach((item,index)=>{
              children.push({
                label: item,
                value: item,
              })
            })
            newObj['children'] = children;
            newData.push(newObj);
          }
          that.setState({
            newData:newData,
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
          url: 'healthcabin/checkbody/getBodyCheckResultByTime',
          server_url: config_CureService_url,
          contentType: '',
          data: {
            time: key,
            userId: userId
          }
        };
        let that = this;
        function success(res){
          that.setState({
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

  getClickResultsData(){
    let userId = this.props.userId;//子组件拿到父组件的属性
    let sValue = this.state.sValue;//获取点击的Key值
    let params = {
          type: 'GET',
          async : true,
          url: 'healthcabin/checkbody/getBodyCheckResultByTime',
          server_url: config_CureService_url,
          contentType: '',
          data: {
            userId: userId,
            time: sValue
          }
        };
        let that = this;
        function success(res){
          that.setState({
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

  handClickTestAgain () {
    let pram = 3;
    this.props.onToggle(pram);
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

  render() {
    let {url, status, yearSeven, yearEight, bodyType, performance, diet, motion, reminder, lifeWay, newData, sValue} = this.state;
    let time = sValue||yearEight[0];
    let name = this.props.name;
    let s = this.props.sex;
    let sex = null;
    if (s == 1) {
      sex = "女"
    } else if (s == 2){
      sex = "男"
    } else if (s == 9){
      sex = "未知"
    }
    let age = this.props.age;
    return (
      <div style={styles.borderHeight}>
        <div style={styles.evaluationResultReport}>
            <Row type="flex" justify="start">
                <Col xs={6} sm={6}>
                  <div style={styles.historyTip}>
                    <img src={chooseDate} style={styles.chooseDate}/>
                    <div>
                      <WhiteSpace size="lg" />
                        <Picker
                          data={newData}
                          title="测评历史选择"
                          cols="2"
                          cascade={true}
                          extra="请选择(可选)"
                          value={this.state.newData}
                          onChange={this.onChange}
                        >
                          <h2 style={styles.history} arrow="horizontal">历史</h2>
                        </Picker>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12}>
                  <div>
                      <h2 style={styles.evaluationResultReportTitle}>测评结果报告</h2>
                  </div>
                </Col>
                <Col xs={6} sm={6}>
                  <div style={styles.testAgainTip} onClick={this.handClickTestAgain.bind(this)}>
                      <img src={testAgain} style={styles.testLater}/>
                      <h2 style={styles.testAgain}>重测</h2>
                  </div>
                </Col>
            </Row>
        </div>
        <br/>
        <div>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div>
                  <img src={patientInformation} style={styles.patientInformation}/>
                  <h2 style={styles.patientInformationPeople}>患者信息</h2>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div style={styles.patientInformationLine}>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div>
                <p style={styles.message}>患者名字：<span style={styles.name}>{name}</span>&nbsp;&nbsp;&nbsp;性别：<span style={styles.sex}>{sex}</span>&nbsp;&nbsp;&nbsp;年龄：<span style={styles.age}>{age}</span></p>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div>
                <p style={styles.message}>测评日期：<span style={styles.date}>{time}</span></p>
              </div>
            </Col>
          </Row>
        </div>
        <div style={styles.secondDiv}>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div>
                  <img src={testResult} style={styles.testResult}/>
                  <h2 style={styles.testResultEnd}>测试结论</h2>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div style={styles.testResultLine}>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={22} sm={22}>
              <div style={styles.physicalBorder}>
              <div>
                <p style={styles.pTitle}>
                  <span>🔊</span>
                  <span>您的体质为：</span>
                  <span style={styles.haha}>{bodyType}</span>
                </p>
                <br/>
                <p style={styles.pTitle1}>{performance}</p>
              </div>
              </div>
            </Col>
            <Col xs={2} sm={2}>
            </Col>
          </Row>
        </div>
        <br/>
        <div>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div>
                  <img src={chartAnalysis} style={styles.chartAnalysis}/>
                  <h2 style={styles.chartAnalysisText}>图表分析</h2>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div style={styles.chartAnalysisLine}>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={22} sm={22}>
              <div style={styles.physicalBorder}>
                <img style={styles.snapshotImageElement} src={url}/>
                <canvas id="canvas" width="379" height="204">canvas not supported</canvas>
              </div>
            </Col>
            <Col xs={2} sm={2}>
            </Col>
          </Row>
        </div>
        <div>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div>
                  <img src={specificSuggestions} style={styles.specificSuggestions}/>
                  <h2 style={styles.specificSuggestionsText}>针对性建议</h2>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}>
              <div style={styles.specificSuggestionsLine}>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={22} sm={22}>
              <div style={styles.next2}>
                <ul style={styles.ul1}>
                  <li>
                    饮食
                    <p style={styles.ulLiFirst}>{diet}
                    </p>
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
            </Col>
            <Col xs={2} sm={2}>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const styles = {
  borderHeight: {
    backgroundColor: 'white'
  },
  evaluationResultReport: {
    width: '100%',
    height: '8rem',
    backgroundColor: 'rgb(26, 118, 209)',
    marginTop: '-2rem',
    position: 'relative',
  },
  evaluationResultReportTitle: {
    color: 'white',
    fontSize: '22px',
    textAlign: 'center',
    paddingTop: '3.4rem',
    position: 'absolute',
    marginLeft: '4rem'
  },
  historyTip: {
    position: 'relative',
  },
  chooseDate: {
    width: '2rem',
    marginLeft: '1rem',
    marginTop: '3.8rem'
  },
  history: {
    color: 'white',
    fontSize: '17px',
    marginLeft: '3.5rem',
    marginTop: '-3rem',
    position: 'absolute'
  },
  testAgainTip: {
    position: 'relative'
  },
  testLater: {
    width: '2rem',
    marginTop: '3.8rem',
    marginLeft: '1.4rem'
  },
  testAgain: {
    color: 'white',
    fontSize: '17px',
    marginTop: '-2rem',
    marginLeft: '3.8rem',
    position: 'absolute'
  },
  patientInformation: {
    marginLeft: '1rem',
    width: '2rem',
    marginTop: '1%'
  },
  patientInformationPeople: {
    marginLeft: '3.5rem',
    fontSize: '17px',
    marginTop: '-2.2rem'
  },
  patientInformationLine: {
    width: '8.6rem',
    border: '1px solid #1a76d1',
    marginLeft: '1rem',
    marginTop: '1%'
  },
  message: {
    color: '#333333',
    fontSize: '17px',
    marginLeft: '3rem',
    marginTop: '4%'
  },
  secondDiv: {
    marginTop: '3%'
  },
  name: {
    color: '#1a76d1',
    fontSize: '17px',
  },
  sex: {
    color: '#1a76d1',
    fontSize: '17px',
  },
  age: {
    color: '#1a76d1',
    fontSize: '17px',
  },
  date: {
    color: '#1a76d1',
    fontSize: '17px',
  },
  testResult: {
    marginLeft: '1rem',
    width: '2rem',
    marginTop: '1%'
  },
  testResultEnd: {
    marginLeft: '3.5rem',
    fontSize: '17px',
    marginTop: '-2.2rem'
  },
  testResultLine: {
    width: '8.6rem',
    border: '1px solid #1a76d1',
    marginLeft: '1rem',
    marginTop: '1%'
  },
  physicalBorder: {
    width: '100%',
    height: '16rem',
    background: 'inherit',
    boxSizing: 'border-box',
    border: '1px solid #1a76d1',
    borderRadius: '0px',
    overflow: 'hidden',
    marginTop: '4%',
    marginLeft: '1rem'
  },
  haha: {
    color: '#1a76d1',
    fontSize: '19px',
  },
  pTitle: {
    fontSize: '19px',
    marginTop: '2rem',
    color: '#333333'
  },
  pTitle1: {
    fontSize: '17px',
    color: '#333333',
    marginTop: '-2rem'
  },
  chartAnalysis: {
    marginLeft: '1rem',
    width: '2rem',
    marginTop: '1%'
  },
  chartAnalysisText: {
    marginLeft: '3.5rem',
    fontSize: '17px',
    marginTop: '-2.2rem'
  },
  chartAnalysisLine: {
    width: '8.6rem',
    border: '1px solid #1a76d1',
    marginLeft: '1rem',
    marginTop: '1%'
  },
  snapshotImageElement: {
    width: '90%',
    height: '15.5rem',
    backgroundColor: 'white'
  },
  specificSuggestions: {
    marginLeft: '1rem',
    width: '2rem',
    marginTop: '1%'
  },
  specificSuggestionsText: {
    marginLeft: '3.5rem',
    fontSize: '17px',
    marginTop: '-2.2rem'
  },
  specificSuggestionsLine: {
    width: '8.6rem',
    border: '1px solid #1a76d1',
    marginLeft: '1rem',
    marginTop: '1%'
  },
  ul1: {
    fontSize: '17px',
    color: '#1A76D1',
  },
  ulLiFirst: {
    color: '#333333'
  },
  next2: {
    marginTop: '4%',
    marginLeft: '1rem'
  }
};
