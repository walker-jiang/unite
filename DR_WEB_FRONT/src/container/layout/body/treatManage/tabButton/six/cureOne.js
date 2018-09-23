import React, {Component} from 'react';
import styled from 'styled-components';
import Cure from "./cure.js"
import people from "../../images/u7015.png";
import wwc from "../../images/wwc.png";

export default class CureOne extends Component {
  constructor(props){
    super(props);
  };
  render() {
    return (//未答题显示样式
      <div style={styles.iconTips}>
          <img src={people} style={styles.littlePeople}/>
          <img src={wwc} style={styles.noEnd}/>
          <p style={styles.change}>该患者未完成体质辨析测评</p>
          <p style={styles.changeTwo}>
           请您从下面选择任意种方法进行“患者体质辨析测评”</p>
      </div>
    );
  }
}

const styles = {
  iconTips:{
    position: 'relative'
  },
  littlePeople:{
    position: 'absolute',
    left: '6.6%',
    top: '20%',
    width: '36px',
    height: '50px'
  },
  noEnd:{
    position: 'absolute',
    left: '6.6%',
    top: '59.4%',
    width: '36px',
    height: '19px'
  },
  change:{
    fontFamily: 'MicrosoftYaHei 微软雅黑',
    color: 'black',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '18px',
    textAlign: 'left',
    position: 'relative',
    top: '0.5em',
    left: '10.5%'
  },
  changeTwo:{
    fontFamily: 'MicrosoftYaHei 微软雅黑',
    color: 'black',
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#999999',
    fontSize: '14px',
    textAlign: 'left',
    position: 'relative',
    top: '0.6em',
    left: '10.5%'
  }
}

/*
@作者：王崇琨
@日期：2018-07-08
@描述：治未病-未答题显示样式
*/