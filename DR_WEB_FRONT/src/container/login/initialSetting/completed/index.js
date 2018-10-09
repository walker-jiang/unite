import React, {Component} from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Button, Icon } from 'antd';
import buttonSty from 'components/antd/style/button';
import finishIcon from './finish-icon.png';
import getResource from 'commonFunc/ajaxGetResource';

class Index extends Component {
    constructor(props) {
      super(props);
      this.startTreat = this.startTreat.bind(this);
    }
    /** [startTreat 跳到诊疗系统,客户端跳转通过window.loginSystem] */
    startTreat(){
      let that = this;
      let params = {
        url: 'BaOrguserController/getDataByidAndToken',
        server_url: config_login_url,
        data: {
          orgUerid: window.sessionStorage.getItem('userid'),
          serviceToken: window.sessionStorage.getItem('token')
        }
      };
      function success(res) {
        if(window.loginSystem){ // 监测客户端方法
          console.log('监测到客户端loginSystem方法');
          that.setUserInfo(res.data.baOrguser.deptid, res.data.baOrguser.orgid, res.data.baOrguser.orgUserid, res.data.baOrguser.post, res.data.baOrguser.realname, res.data.baOrguser.photo);
        }else{
          // 将当前用户的信息保存供其它组件用
          window.sessionStorage.setItem('username', res.data.baOrguser.realname); // 用户名
          window.sessionStorage.setItem('deptid', res.data.baOrguser.deptid); // 科室ID
          window.sessionStorage.setItem('orgid', res.data.baOrguser.orgid); // 机构ID
          window.sessionStorage.setItem('userid', res.data.baOrguser.orgUerid); // 用户ID
          window.sessionStorage.setItem('post', res.data.baOrguser.post); // 医生级别
          window.sessionStorage.setItem('token', res.data.serviceToken); // 医生级别
          that.props.history.push('/layout');
        }
      };
      getResource(params, success);
    };
    setUserInfo(deptid, orgid , userid, post, username, photo){
      let obj = {
        userid: userid,
        orgid: orgid,
        deptid: deptid,
        post: post,
        username: username,
        photo: photo
      };
      window.loginSystem(JSON.stringify(obj));
    };
    render() {
      return (
        <div>
          <FinishWrap>
            <FinishPicWrap>
              <FinishPic src={finishIcon} />
            </FinishPicWrap>
            <FinishWrite>
              <FinTitle>您已经完成了：</FinTitle>
              <ul>
                <FinListLi>绑定HIS
                  <FinSign type="check" />
                </FinListLi>
                <FinListLi>个人信息确认
                  <FinSign type="check" />
                </FinListLi>
                <FinListLi>成功修改登录密码
                  <FinSign type="check" />
                </FinListLi>
              </ul>
            </FinishWrite>
          </FinishWrap>
          <FinTip>轻轻一个点击，
            <SpecialColor>中医馆健康信息平台2.0</SpecialColor>
            将会带给您一个全新的诊疗体验~
          </FinTip>
          <Footer>
            <SureButton type="primary" onClick={this.startTreat}>开始体验</SureButton>
          </Footer>
        </div>
      );
    }
}
const FinishWrap = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 70px;
  margin-left: 200px
`;
const FinishPicWrap = styled.div`
  float: left;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #0A6ECB;
  text-align: center;
`;
const FinishPic = styled.img`
  width: 58px;
  height: 58px;
  margin-top: 21px;
`;
const FinishWrite = styled.div`
  float: left;
  margin-left: 20px;
`;
const FinListLi = styled.li`
  list-style: disc;
  font-size: 12px;
  color: #333333;
  margin-left: 15px;
  line-height: 24px;
`;
const FinTitle = styled.h1`
  font-size: 18px;
  color: #333333;
  margin-bottom: 10px;
`;
const FinSign = styled(Icon)`
  color: #0A6ECB;
  margin-left: 10px;
`;
const FinTip = styled.p`
  color: #999999;
  margin-left: 100px;
  margin-top: 40px;
  margin-bottom: 60px;
`;
const SpecialColor = styled.span`
  color: #0A6ECB;
`;
const Footer = styled.div`
  border-top: 1px solid #FFF;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
  width: 120px;
`;
export default withRouter(Index);
/*
@作者：姜中希
@日期：2018-08-09
@描述：初始化设置设置完成组件
*/
