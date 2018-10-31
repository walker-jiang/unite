import React, { Component } from 'react';
import styled from 'styled-components';
import 'antd/lib/button/style';
import PatientTable from './patientTable/index.js';
import RegisterForm from './registerForm';
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
      sex: '',
      sexDic: '',
      birthday: '',
      patienttypeDic: '',
      basicOperation: '',
      cardtype: '',
      cardno: '',
      mobile: '',
    };
    this.handleClick = this.handleClick.bind(this)
    this.handSonsson = this.handSonsson.bind(this)
  }

  componentWillReceiveProps(){
    this.setState({ visible: 1 })
  };

  handSonsson(visible) {
    this.setState({
      visible,
    })

  }

  handleClick(basicOperation,pram,patientid,ctsorgidDic,upstamp,patientname,sex,sexDic,birthday,patienttypeDic,cardtype,cardno,mobile){
    console.log('pram',pram)
    this.setState({
      basicOperation: basicOperation,
      visible: pram,
      patientid: patientid,
      ctsorgidDic: ctsorgidDic,
      upstamp: upstamp,
      patientname: patientname,
      sex: sex,
      sexDic: sexDic,
      birthday: birthday,
      patienttypeDic: patienttypeDic,
      cardtype: cardtype,
      cardno: cardno,
      mobile: mobile
    });
  };

  render() { 
    let { basicOperation, visible,  patientid, ctsorgidDic, upstamp, patientname, sex, sexDic, birthday, patienttypeDic,cardtype,cardno,mobile }  = this.state;
    let t  = null;
    if(visible == 1){
      t = <PatientTable  onToggle={this.handleClick} />
    } else if (visible == 2) {
      t = <Ssc onToggle={this.handleClick} patientid = {patientid} basicOperation = {basicOperation} handSonsson={this.handSonsson}/>
    } else if (visible == 3) {
      t = <PatientDetails onToggle={this.handleClick} 
      basicOperation = {basicOperation}
      patientid = {patientid}
      ctsorgidDic = {ctsorgidDic}
      upstamp = {upstamp}
      patientname = {patientname}
      sex = {sex}
      sexDic = {sexDic}
      birthday = {birthday}
      patienttypeDic = {patienttypeDic}
      cardtype = {cardtype}
      cardno = {cardno}
      mobile = {mobile}
      />
    } else if (visible == 4){
      <RegisterForm />
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
  position: absolute;
  height: 100%;
  width: 100%;  
`;
/*
@作者：王崇琨
@日期：2018-09-12
@描述：电子病历父组件
*/