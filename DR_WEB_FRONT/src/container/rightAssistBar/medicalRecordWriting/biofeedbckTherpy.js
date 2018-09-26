/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----治疗反馈
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input } from 'antd';
import './style/rightAssistBar.less';
import LineChart from '../pubilcModule/lineChart.js';
import medicalRWService from '../service/medicalRWService.js';
const RadioGroup = Radio.Group;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
      start:0,
      end:1,
      RadioList:[],
      count:0,//分数总数
      dataSource:[],//折线图数据源
    };
  };
  componentWillMount(){
    this.getChart();
  }
  componentDidMount(){
    this.queryAnswer();
  }
  getChart = () =>{
    var self = this;
    function callBack(res){
      if(res.result && res.data){
        console.log("getChart获取成功");
        self.setState({
          dataSource:res.data
        })
      }else{
        console.log("getChart获取失败");
      }
    }
    let params = { "billid":"201837522770543143" }; //病历编号
    medicalRWService.getChart(params, callBack);

  }
  queryAnswer = () =>{
    var self = this;
    function callBack(res){
      if(res.result && res.data){
        console.log("queryAnswer获取成功");
        self.setState({ RadioList: res.data.buTrfeedQuestionParamList})
      }else{
        console.log("queryAnswer获取失败");
      }
    }
    let params = { "typeid":questionTemplate };
    medicalRWService.queryAnswer(params, callBack);
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      count: this.state.count+e.target.value,
      value:e.target.value
    },()=>{
      console.log("当前总分数为：",this.state.count);
      setTimeout(()=>{
        this.setState({
          start:this.state.start+1,
          end:this.state.end+1,
          value:"",
        })
      },300)
    });

  }
  render() {
    var { RadioList, start, end, dataSource, count } = this.state;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <div class="rightAssistBar_biofeedbckTherpy">
        <div class="rightAssistBar_div">
          <p>请针对上次治疗效果选择符合的结果：</p>
          {
            start>4
            ?
            <center>感谢您的反馈,您一共答了<span style={{color:'#ff4d4d'}}>5</span>道题，总分<span style={{color:'#ff4d4d'}}>{count}</span>分</center>
            :
            RadioList.slice(start,end).map((item,index)=>{
              return (
                <div key={index}>
                  <p>{item.buTrfeedQuestion.quedesc}</p>
                  <RadioGroup onChange={this.onChange}  value={this.state.value}>
                    {
                      item.buTrfequeAnswerList.map((j,k)=>{
                        return(
                          <Radio key={k} style={radioStyle} value={j.ansscore}>{j.ansdesc}</Radio>
                        )
                      })
                    }
                  </RadioGroup>
                </div>
              )
            })
          }
        </div>
        <p class="biofeedbckTherpy_p"><p>病情趋势分析</p></p>
        <LineChart dataSource={dataSource}/>
      </div>
    );
  }
}
