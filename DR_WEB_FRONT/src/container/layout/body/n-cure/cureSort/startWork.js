import React, {Component} from 'react';
import { Radio, Progress, Row, Col } from 'antd'
import "../css/startWork.css";
import tp from "../images/tipPhoto.png";
import bg from "../images/background.png";
import ic from "../images/iconCount.png";
import ScrollArea from 'components/scrollArea';
import getResource from 'commonFunc/ajaxGetResource';

const bodyHeight = document.body.clientHeight;
const RadioGroup = Radio.Group;

export default class StartWork extends Component {
  constructor(props){
    super(props);
    //this.handClick = this.handClick.bind(this);
    this.state = {
      value: null,
      startQuestion: 1,
      end: '',
      arr:[],
      answer:[],
      index: 0,
      userId: '',
      percent: 0,
      length: ''
    };
  };

  componentDidMount(){//获取题目
    let params = {
            type: 'GET',
            url: 'healthcabin/checkbody/getAllTcmQuestion',
            contentType: '',
            server_url: config_CureService_url,
            xhrFields:{withCredentials:true},
            crossDoman:true,
            data: {
              qSex: this.props.sex
            }
        };
        let that = this;
        function success(res){
          that.setState({
            arr: res.data,
            end: res.data.length,
            length: res.data.length
          })
        };

        function error(res){
            console.log('获取题目失败');
        };

        getResource(params, success, error);
  }

  componentWillReceiveProps(newProps) {
    console.log('Component WILL RECEIVE PROPS!')
  }

  onChange(e) {
    let userId = this.props.userId;
    console.log('userId',userId)
    let arr = this.state.arr;
    let type_id = arr[this.state.index].type_id;
    let type_name = arr[this.state.index].type_name;
    let q_id = arr[this.state.index].q_id;
    let options_value = e.target.value + '';
    let answerJson = this.state.answer;
    let aj = answerJson.push({typeId: type_id, typeName: type_name, qId: q_id, optionsValue: options_value});
    let startQuestion = this.state.startQuestion;
    if(startQuestion == arr.length){//当前数量等于题目.length时，点击最后一题的选项，提交存储答案的json
      if('radio checked'){
        let paramsData = JSON.stringify(answerJson);
        let params = {
          type: 'GET',
          url: 'healthcabin/checkbody/getCheckResult',
          server_url: config_CureService_url,
          contentType: '',
          xhrFields:{withCredentials:true},
          crossDoman:true,
          async: false,
          //dataType: 'jsonp',
          data: {
            json: paramsData,
            userId: userId
          }
        };

        function success(res){

        };

        function error(res){
            console.log('提交答案失败');
        };

        getResource(params, success, error);
        this.handClick();
      }
    }
    this.setState({ value:e.target.value },()=>{
      setTimeout(() => {
        this.setState({
          value: null,
          startQuestion: this.state.startQuestion+1,
          end: this.state.end-1,
          index: this.state.index + 1,
          percent: Math.round(((this.state.index+1)/this.state.length) * 100)
        });
      }, 200);
    })
  }

  handClick(){//切换组件，跳转到结果页面testResults.js
    let pram = 1;
    this.props.onToggle(pram);
  }
  render() {
    let mmuu = null;
    if(this.state.arr.length != 0){
      var aa = this.state.arr;
      mmuu =
      <div>
        <Row type="flex" justify="start">
          <Col lg={24} xl={24} xxl={24}>
            <div className="bgDiv">
              <img src={bg} className="bG"/>
              <p className="questionStyle">🔘&nbsp;<span>{this.state.arr[this.state.index].type_name}</span></p>
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col lg={24} xl={24} xxl={24}>
            <div className="questionDiv">
              <img src={ic} className="iC"/>
              <span className="questionTip">问题{this.state.startQuestion}</span>
              <div className="house">{this.state.arr[this.state.index].q_text}</div>
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col lg={24} xl={24} xxl={24}>
            <div className="borderGround">
              <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value} className="radioG">
                <Radio key="a" value={1}>A:{this.state.arr[this.state.index].options_text.substring(0,7)}</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio key="b" value={2}>B:{this.state.arr[this.state.index].options_text.substring(8,15)}</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio key="c" value={3}>C:{this.state.arr[this.state.index].options_text.substring(16,22)}</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio key="d" value={4}>D:{this.state.arr[this.state.index].options_text.substring(23,29)}</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio key="e" value={5}>E:{this.state.arr[this.state.index].options_text.substring(30,37)}</Radio>
              </RadioGroup>
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col lg={24} xl={24} xxl={24}>
            <span className="rember">测试进度：本次测试问题共{this.state.arr.length}个，已经回答{this.state.index}个，目前还剩下{this.state.end} 个问题未回答，选择答案后自动转到下一题~</span>
          </Col>
        </Row>
      </div>
    }
    return (
      <div className="all">
        <ScrollArea height={100}>
          <Row type="flex" justify="start">
            <Col lg={24} xl={24} xxl={24}>
              <div>
                <img src={tp} className="tipPhoto"/>
                <p className="tipTitle">患者体质辨析测评</p>
                <p className="tipText">请您通过问答形式协助患者完成“体质辨析测评”
                </p>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col lg={24} xl={24} xxl={24}>
              <div className="percentLeft">
                {mmuu}
                <div className="answerProgress" style={{ width: 300 }}>
                  <Progress percent={this.state.percent} size="small" />
                </div>
              </div>
            </Col>
          </Row>
        </ScrollArea>
      </div>
    );
  }
}

/*
@作者：王崇琨
@日期：2018-07-08
@描述：治未病-根据性别获取题目
*/
