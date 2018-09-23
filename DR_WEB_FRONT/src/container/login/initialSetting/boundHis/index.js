import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, Carousel } from 'antd';
import getResource from 'commonFunc/ajaxGetResource';
import HisList from './hisList';
import UnbindTip from './unbindTip';
import UnfinishedTip from './unfinishedTip';
import buttonSty from 'components/antd/style/button';

class BindHis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [], // 用户信息
      bindData: [], // 绑定信息
      supportSysData: [], // 支持系统系统
      unionId: '', // 联合登录 ID
      sysName: '', // 系统名称
      orgUserid: '', // 用户ID
    };
    this.handleClick = this.handleClick.bind(this);
    this.getUnionData =  this.getUnionData.bind(this);
  }
  componentWillMount() {
    this.getUnionData();
  }
  /**
   * [getUnionData 获取用户信息]
   * @param  {[type]} id [用户ID]
   * @return {[type]}    [void]
   */
  getUnionData() {
    let params = {
      url: 'BaOrguserController/getUnionData',
      type: 'post',
      data: window.orgUserid,
    };
    let that = this;
    function success(res) {
      if(res.result){
        // 将当前用户的信息保存供其它组件用
        window.sessionStorage.setItem('username', res.data.baOrguser.realname); // 用户名
        window.sessionStorage.setItem('deptid', res.data.baOrguser.deptid); // 科室ID
        window.sessionStorage.setItem('orgid', res.data.baOrguser.orgid); // 机构ID
        window.sessionStorage.setItem('userid', window.orgUserid); // 用户ID
        window.sessionStorage.setItem('post', res.data.baOrguser.post); // 医生级别
        if(res.data.baOrguser.initcomplete != '0'){
          if(bundleMode == 'CS'){
            that.setUserInfo();
          }
        }
        that.setState({
          userData: res.data.baOrguser,
          bindData: res.data.baOrguserUnion,
          supportSysData: res.data.sySupportsys,
          unionId: res.data.baOrguserUnion[0].uionid,
          sysName: res.data.baOrguserUnion[0].sysname,
          orgUserid: res.data.baOrguserUnion[0].orgUserid,
        })
      }
    };
    getResource(params, success);
  }
  setUserInfo(){
    let deptid = window.sessionStorage.getItem('deptid'); // 科室id
    let orgid = window.sessionStorage.getItem('orgid'); // 机构id
    let userid = window.sessionStorage.getItem('userid'); // 用户id
    let post = window.sessionStorage.getItem('post'); // 医生级别
    let username = window.sessionStorage.getItem('username'); // 用户名
    let obj = {
      userid: userid,
      orgid: orgid,
      deptid: deptid,
      post: post,
      username: username
    };
    // console.log(obj);
    window.loginSystem(JSON.stringify(obj));
  };
  handleClick() {
    let unionId = this.props.unionId;
    if (unionId != '') {
      this.props.onToggle();
    } else {
      const modal = Modal.error({
        title: '请您先绑定HIS，绑定后才能继续下一步设置',
      });
      setTimeout(() => modal.destroy(), 1000);
    }
  }
  render() {
    let {unionId, sysName, supportSysData} = this.state;
    return (
      <div>
        <Tip>
          <TipIcon type="info-circle" />
          注册本系统前，您需要先绑定一个HIS系统：
        </Tip>
        <Content>
          <HisList supportSysData={supportSysData} unionId={unionId}>
          </HisList>
          {
            !unionId ? null :
            (
              <AlreadyBind>
                <AlreadyBindTip>
                  <PassTipIcon type="check-circle" />
                  HIS系统绑定用户如下：
                </AlreadyBindTip>
                <AlBindTip>
                  HIS系统名称：
                  <SpecialColor>{sysName}</SpecialColor>  | HIS用户名：
                  <SpecialColor>daniel</SpecialColor>
                </AlBindTip>
                <Unbind onClick={()=>{this.unbindTip.handleOpen()}} >解除绑定</Unbind>
              </AlreadyBind>
            )
          }
        </Content>
        <Footer>
          <SureButton type="primary" onClick={this.handleClick}>确认并下一 步</SureButton>
          <CancelButton type="primary" onClick={()=>{this.unfinishedTip.handleOpen()}}>取消</CancelButton>
        </Footer>
        <UnbindTip ref={ref=>{this.unbindTip = ref}} handleOk={this.getUnionData}></UnbindTip>
        <UnfinishedTip ref={ref=>{this.unfinishedTip = ref}}></UnfinishedTip>
      </div>
    );
  }
}
const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 245px;
`;
const Tip = styled.div`
  margin: 15px 0px;
  font-size: 13px;
  color: #333333;
`;
const TipIcon = styled(Icon)`
  color: #33CC00;
  font-size: 16px;
  margin-right: 5px;
`;
const HisSystem = styled.li`
  float: left;
  margin: 0 6px;
  width: 100px !important;
  height: 150px;
  background: #fff;
  list-style: none;
`;
const HisName = styled.p`
  padding: 28px 15px 0 15px;
  width: 100px;
  height: 100px;
  border: 1px solid #ffffff;
  background: ${props=>props.background || 'rgba(228, 228, 228, 1)'};
  text-align: center;
  line-height: normal;
  font-size: 16px;
  color: #ffffff;
`;
const AlreadyBindBtn = styled.div`
  background: #33cc00;
  color: #fff;
  margin: 10px 5px;
  width: 90px;
  height: 30px;
  border-radius: 15px;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
`;
const AlreadyBindIcon = styled(Icon)`
  font-weight: 900;
  font-size: 14px;
  margin-right: 5px;
  margin-top: 1px;
`;
const BindBtn = styled.div`
  margin: 10px 5px;
  width: 90px;
  height: 30px;
  border: 1px solid #33cc00;
  border-radius: 15px;
  background: #fff;
  font-size: 12px;
  color: #33cc00;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
`;
const AlreadyBind = styled.div`
  float: left;
  width: 100%;
  margin-top: 20px;
`;
const AlreadyBindTip = styled.p`
  line-height: 20px;
  color: #333333;
`;
const AlBindTip = AlreadyBindTip.extend`
  padding-left: 25px;
  float: left;
  line-height: 20px;
`;
const PassTipIcon = styled(Icon)`
  color: #33cc00;
  font-size: 16px;
  margin-right: 9px;
`;
const SpecialColor = styled.span`
  color: #0A6ECB;
`;
const Unbind = styled.p`
  float: left;
  margin-left: 25px;
  cursor: pointer;
  width: 80px;
  height: 22px;
  background: #33cc00;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 22px;
  border-radius: 11px;
`;
const Footer = styled.div`
  width: 708px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
  width: 160px;
`;
const CancelButton= styled(Button)`
  ${buttonSty.white};
  width: 120px;
`;

export default withRouter(BindHis)

/*
@作者：姜中希
@日期：2018-08-09
@描述：已绑定的系统列表
*/
