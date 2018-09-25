import React, { Component } from 'react';
import styled from 'styled-components';
import 'antd/lib/button/style';
import ElectronicTable from './electronicTable'
import ElectronicList from './electronicList'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: '1',
      patientid: '',
      patientname: '',
      sex: '',
      birthday: '',
      patienttypeDic: '',
      examDate: ''
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(pram,patientid,patientname,sex,birthday,patienttypeDic,examDate,casetype){
    console.log('patientid',patientid)
    this.setState({
      visible: pram,
      patientid: patientid,
      patientname: patientname,
      sex: sex,
      birthday: birthday,
      patienttypeDic: patienttypeDic,
      examDate: examDate,
      casetype: casetype
    });
  };

  render() { 
    let {visible, patientid,patientname,sex,birthday,patienttypeDic,examDate,casetype}  = this.state;
    let t  = null;
    if(visible == 1){
      t = <ElectronicTable onToggle={this.handleClick} />
    } else if (visible == 2) {
      t = <ElectronicList onToggle={this.handleClick} patientid={patientid} patientname={patientname} sex={sex} birthday={birthday}  patienttypeDic={patienttypeDic} examDate={examDate} casetype={casetype}/>
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