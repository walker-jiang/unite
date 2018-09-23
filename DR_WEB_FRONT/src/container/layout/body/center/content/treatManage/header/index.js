import React, {Component} from 'react';
import styled from 'styled-components';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import { Button, Breadcrumb } from 'antd'
import { withRouter } from 'react-router-dom';
import book from "./expand.png";

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {}
    };
  };
  componentWillMount(){
    this.getUserInfo();
  };
  componentWillReceiveProps(){
    this.getUserInfo();
  };
  getUserInfo(){
    let self = this;
    let params = {
      url: 'BaPatientController/getData',
      data: {
        id: this.props.match.params.id,
      },
    };
    function callBack(res){
      if(res.result){
        self.setState({
          userInfo: res.data
        });
        window.cardno = res.data.cardno;
        window.cardtype = res.data.cardtype;
        window.birthday = res.data.birthday;
        window.sex = res.data.sex;
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  render() {
    console.log(this.state.userInfo);
    let { patientname = '', sex = '', mobile='', patienttype='' } = this.state.userInfo;
    // console.log(this.props.toggle);
    return (
      <Container>
        <Left>
          患者姓名：
          <Label>{patientname}</Label>
          性别：
          <Label>{ sex == 1 ? '男' : (sex == '2' ? '女' : '未知')}</Label>
          年龄：
          <Label>38</Label>
          移动电话：
          <Label>{mobile}</Label>
          患者身份：
          <Label>{patienttype}</Label>
          |
          <Toggle src={book} onClick={()=>{this.props.toggle.visibleFloat()}}/>
        </Left>
        <Right>
          <Rectangular>
            <Breadcrumb separator="|">
              <Breadcrumb.Item>
                <Inner>📰详细信息</Inner>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Inner>
                  👴健康档案
                </Inner>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Inner>
                  ♻️患者转诊
                </Inner>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Inner>🖥远程会诊</Inner>
              </Breadcrumb.Item>
            </Breadcrumb>
            <KnowledgeRepo >
              📚中医知识库
            </KnowledgeRepo>
          </Rectangular>
        </Right>
      </Container>
    );
  }
}
const Container = styled.div`
  border-bottom: 1px solid #e4e4e4;
  height: 50px !important;
  width: 100%;
  font-size: 12px;
  color: #666666;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  height: 100%;
  right: 0px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;
const Label = styled.span`
  color: #0A6ECB;
  margin-right: 15px;
`;
const Right = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const Rectangular = styled.div`
  height: 38px;
  background-color: rgb(249, 249, 249);
  border: 1px solid rgba(228, 228, 228, 1);
  border-right: 0px solid red;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 1;
  padding-left: 20px;
  display: flex;
  align-items: center;
`;
const Inner = styled.span`
  color: #0A6ECB;
  font-size: 12px;
`;
const KnowledgeRepo = styled(Button)`
  position: absolute;
  color: white !important;
  background-color: #0066cc !important;
  border-top-left-radius: 20px !important;
  border-bottom-left-radius: 20px !important;
  margin-left: 20px;
`;
const Toggle = styled.img`
  margin-left: 20px;
  cursor: pointer;
`;
/*
@作者：姜中希
@日期：2018-07-20
@描述：诊疗管理头部用户信息部分, 可以在Toggle组件处切换左侧浮框
*/
export default withRouter(Header);
