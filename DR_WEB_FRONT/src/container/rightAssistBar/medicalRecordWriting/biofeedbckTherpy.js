/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏-----治疗反馈
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Radio, Input } from 'antd';
import './style/rightAssistBar.less';
import LineChart from '../pubilcModule/lineChart.js';
const RadioGroup = Radio.Group;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 1,
    };
  };
  componentWillMount(){

  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <div class="rightAssistBar_biofeedbckTherpy">
        <div class="rightAssistBar_div">
          <p>请针对上次治疗效果选择符合的结果：</p>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={1}>治疗效果非常好</Radio>
            <Radio style={radioStyle} value={2}>治疗效果较好</Radio>
            <Radio style={radioStyle} value={3}>治疗效果一般</Radio>
            <Radio style={radioStyle} value={4}>有一些治疗效果，不明显</Radio>
            <Radio style={radioStyle} value={5}>没有任何疗效</Radio>
          </RadioGroup>
        </div>
        <p class="biofeedbckTherpy_p"><p>病情趋势分析</p></p>
        <LineChart/>
      </div>
    );
  }
}
