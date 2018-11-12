import React, {Component, PropTypes} from 'react'; // react核心
import header from './header.png';
import re_select from './re_select.png';
import styled from 'styled-components';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class Left extends Component {
  constructor(props){
    super(props);
    this.state = {
      baPatient: {},
      caseBasicInfo: null, // 基本病历信息不包括诊断
    };
  };
  componentWillMount(){
    this.getRegisterInfo(window.registerID);
  };
  /**
   * [getRegisterInfo getRegisterInfo]
   * @param  {[type]} registerid [挂号ID]
   * @return {[type]}            [undefined]
   */
  getRegisterInfo(registerid){
    let self = this;
    let params = {
      url: 'BuRegisterController/getData',
      data: {
        registerid: registerid,
      },
    };
    function callBack(res){
      if(res.result){
        window.cardno = res.data.baPatient.cardno;
        window.cardtype = res.data.baPatient.cardtype;
        window.birthday = res.data.baPatient.birthday;
        window.sex = res.data.baPatient.sex;
        window.patientName = res.data.baPatient.patientname;
        window.patientID = res.data.baPatient.patientid;
        window.registerID = registerid;
        let { baPatient } = res.data;
        self.setState({ baPatient });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  render() {
    let { patientname = '未知', sexDic = '男', birthday = '1992-08-21', mobile = '**********', cardno = '**********************', patienttypeDic = '未知'} = this.state.baPatient;
    let age = extractDataFromIdentityCard.getAgeFromBirthday(birthday);
    let caseBasicInfo = this.state.caseBasicInfo;
    return (
      <Container>
        <DocInfo>
          <Img src={header} />
          <TextInfo>
              <span>{window.sessionStorage.getItem('username') ? window.sessionStorage.getItem('username') : '未知'}</span>
              <span>{window.sessionStorage.getItem('postDic') ? window.sessionStorage.getItem('postDic') : '未知'}</span>
          </TextInfo>
        </DocInfo>
        <Info>
          <Label>患者姓名 :</Label>
          <Value>{patientname}</Value>
        </Info>
        <Info>
          <Label>性别 :</Label>
          <Value>{sexDic}</Value>
        </Info>
        <Info>
          <Label>年龄 :</Label>
          <Value>{age}</Value>
        </Info>
        <Info>
          <Label>移动电话 :</Label>
          <Value>{mobile}</Value>
        </Info>
        <Info>
          <Label>医保类型 :</Label>
          <Value>{patienttypeDic}</Value>
        </Info>
        <ActionButton onClick={() => { this.props.history.push('/Layout/syndromeTreatment')}}>
          <img src={re_select} />
          <Value>重选患者</Value>
        </ActionButton>
      </Container>
    )
  }
}
const Container = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0px solid transparent;
  border-right: 1px solid transparent;
  border-image: linear-gradient( to bottom, #1273CD , white) 100 30;
  padding-top: 40px;
`;
const DocInfo = styled.div`
  width: 162px;
  height: 80px;
  color: #16B4E7;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 30px;
  border-bottom: 1px solid #CCCCCC;
`;
const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Img = styled.img`
`;
const Info = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Label = styled.div`
  color: #333333;
  width: 50%;
  text-align: right;
`;
const Value = styled.div`
  width: 50%;
  color: #16B4E7;
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ActionButton = Info.extend`
  cursor: pointer;
  width: 60%;
  padding: 5px 0px;
  border-top: 1px solid #CCCCCC;
  border-bottom: 1px solid #CCCCCC;
`;
/*
@作者：姜中希
@日期：2018-11-1
@描述：辨证论治左侧栏展示患者和医生信息
*/
