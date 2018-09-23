import React, { Component } from 'react';
import styled from 'styled-components';
import 'antd/lib/button/style';
import ElectronicTable from './electronicTable'
import ElectronicList from './electronicList'
import getResource from 'commonFunc/ajaxGetResource';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: '1',
    };
  }

  handleClick(pram){
    this.setState({
      visible: pram
    });
  };

  render() { 
    let {visible,userId,name,sex,age,certificatesNumber}  = this.state;
    let t  = null;
    if(visible == 1){
      t = <ElectronicTable onToggle={this.handleClick.bind(this)} />
    } else if (visible == 2) {
      t = <ElectronicList onToggle={this.handleClick.bind(this)} />
    } 
    return (
      <FatherDiv>
       {
        t
       }
      </FatherDiv>
    )
  }
}
const FatherDiv = styled.div`
  
`;
/*
@作者：王崇琨
@日期：2018-09-12
@描述：电子病历父组件
*/
