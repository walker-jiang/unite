import React, { Component } from 'react';
import styled from 'styled-components';
import 'antd/lib/button/style';
import PatientTable from './patientTable/index.js';
import Ssc from './profiled';
import PatientDetails from './patientDetails';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: '1',
      patientid: '',
      ctsorgidDic: '',
      upstamp: '',
      patientname: '',
      sexDic: '',
      birthday: '',
      patienttypeDic: '',
      basicOperation: ''
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(basicOperation,pram,patientid,ctsorgidDic,upstamp,patientname,sexDic,birthday,patienttypeDic){
    console.log('pram',pram)
    this.setState({
      basicOperation: basicOperation,
      visible: pram,
      patientid: patientid,
      ctsorgidDic: ctsorgidDic,
      upstamp: upstamp,
      patientname: patientname,
      sexDic: sexDic,
      birthday: birthday,
      patienttypeDic: patienttypeDic,
    });
  };

  render() { 
    let { basicOperation, visible,  patientid, ctsorgidDic, upstamp, patientname, sexDic, birthday, patienttypeDic }  = this.state;
    let t  = null;
    if(visible == 1){
      t = <PatientTable onToggle={this.handleClick} />
    } else if (visible == 2) {
      t = <Ssc onToggle={this.handleClick} patientid = {patientid} basicOperation = {basicOperation} />
    } else if (visible == 3) {
      t = <PatientDetails onToggle={this.handleClick} 
      basicOperation = {basicOperation}
      patientid = {patientid}
      ctsorgidDic = {ctsorgidDic}
      upstamp = {upstamp}
      patientname = {patientname}
      sexDic = {sexDic}
      birthday = {birthday}
      patienttypeDic = {patienttypeDic}
      />
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