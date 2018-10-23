import React, {Component} from 'react';
import styled from 'styled-components';
import { Button, Input, Radio, Progress, Row, Col } from 'antd'
import Cure from "./cure.js"
import people1 from "../images/u7015.png";
import ceshi from "../images/ceshi.png";
import leftLine from "../images/leftLine.png";
import rightLine from "../images/rightLine.png";

export default class CureTwo extends Component {
  constructor(props){
    super(props);
  };
  render() {
    return (//已答题显示样式
      <Row type="flex" justify="start">
        <Col lg={24} xl={24} xxl={24}>
          <div className="testAgain">
            <img src={people1} style={styles.littlePeople1}/>
            <img src={ceshi} style={styles.noEnd1}/>
            <img src={leftLine} style={styles.leftLine}/>
            <img src={rightLine} style={styles.rightLine}/>
            <p style={styles.change1}>患者体质辨析测试</p>
            <p style={styles.changeTwo1}>
            请您从下面选择任意种方法进行“患者体质辨析测评”</p>
          </div>
        </Col>
      </Row>
    );
  }
}

const styles = {
  testAgain:{
    display: 'none',
    position: 'relative'
  },
  littlePeople1:{
    position: 'absolute',
    left: '5rem',
    top: '3rem',
    width: '36px',
    height: '50px'
  },
  noEnd1:{
    position: 'absolute',
    left: '5rem',
    top: '4.5rem',
    width: '36px',
    height: '19px'
  },
  leftLine:{
    position: 'absolute',
    top: '4rem',
    left: '5.3rem'
  },
  rightLine:{
    position: 'absolute',
    top: '4rem',
    left: '7.6rem'
  },
  change1:{
    fontFamily: 'MicrosoftYaHei 微软雅黑',
    color: 'black',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '18px',
    textAlign: 'left',
    position: 'absolute',
    top: '2.7rem',
    left: '10rem'
  },
  changeTwo1:{
    fontFamily: 'MicrosoftYaHei 微软雅黑',
    color: 'black',
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#999999',
    fontSize: '14px',
    textAlign: 'left',
    position: 'relative',
    top: '4.5em',
    left: '10rem'
  }
}

/*
@作者：王崇琨
@日期：2018-07-08
@描述：治未病-已答题显示样式
*/
