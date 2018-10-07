import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, Button } from 'antd';
import buttonSty from 'components/antd/style/button';
import Loading from 'components/dr/loading';
import bind from './bind.png';
import getResource from 'commonFunc/ajaxGetResource';
import SaveTip from 'components/dr/modal/saveTip';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      bindStatus: false, // 是否显示正在绑定
    };
    this.bindImmediately = this.bindImmediately.bind(this);
  };
  /** [bindImmediately 立即绑定] */
  bindImmediately(){
    let self = this;
    let userId = window.sessionStorage.getItem('userid');
    self.saveTip.showModal(1, '绑定');
    const data = {
      orgUserid: userId,
      sysid: this.props.sysid
    };
    let params = {
      url: 'baOrguserUnionController/bindHisSys',
      type: 'post',
      data: JSON.stringify(data),
    };
    function callBack(res) {
      if(res.result){
        self.saveTip.showModal(2, '绑定');
        self.props.history.push('/login/initialSetting'); // 跳转到初始化设置组件
      }else{
        self.saveTip.showModal(3, '绑定');
      }
    };
    getResource(params, callBack);
  };
  render() {
    let bindStatus = this.state.bindStatus;
    return (
      <div>
        <PassTip>
          <PassTipIcon type="check-circle" />
          您的身份验证已通过
        </PassTip>
        <BindWrap>
          <BindLeft>中科软社区HIS</BindLeft>
          <BindSign>
            <BindWrite>绑定</BindWrite>
            <dd><img alt="" src={bind} /></dd>
          </BindSign>
          <BindRight >中医馆健康信息平台</BindRight>
        </BindWrap>
        <Footer>
          <SureButton type="primary" onClick={this.bindImmediately}>立即绑定</SureButton>
          <Link to="/login/initialSetting">
            <CancelButton type="primary">取消</CancelButton>
          </Link>
        </Footer>
        <Loading loading={bindStatus}>
          <div>
            正在绑定
            <Stress>中科软社区HIS</Stress>
            ，请稍后
          </div>
        </Loading>
        <SaveTip ref={ ref => {this.saveTip = ref}}></SaveTip>
      </div>
    );
  }
}
const PassTip = styled.div`
  font-size: 14px;
  text-align: left;
  color: #333333;
  margin-left: 20px;
  margin-top: 25px;
`;
const PassTipIcon = styled(Icon)`
  color: #33cc00;
  font-size: 16px;
  margin-right: 9px;
`;
const BindWrap = styled.div`
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BindLeft = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 20px;
  text-align: center;
  font-size: 16px;
  border-radius: 10px;
  background: #33cc00;
	color: #ffffff;
	padding: 0 20px;
	padding-top: 25px;
`;
const BindRight = BindLeft.extend`
  background: #ffffff;
  border: 1px solid #0a6ecb;
  color: #0a6ecb;
  padding: 0 5px;
  padding-top: 25px;
`;
const BindSign = styled.dl`
  padding: 0 20px;
  margin-top: 10px;
`;
const BindWrite = styled.dt`
  font-size: 14px;
  text-align: center;
  color: #0a6ecb;
`;
const Footer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
  width: 120px;
`;
const CancelButton= styled(Button)`
  ${buttonSty.white};
  width: 120px;
`;
const Stress = styled.span`
  color: #5555e2;
`;
/*
@作者：姜中希
@日期：2018-08-09
@描述：绑定HIS系统——立即绑定
*/
export default withRouter(Index);
