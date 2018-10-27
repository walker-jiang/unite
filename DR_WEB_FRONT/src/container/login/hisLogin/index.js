import React, {Component} from 'react';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import TipModal from 'components/dr/modal/tip';
import getResource from 'commonFunc/ajaxGetResource';

class hisLogin extends Component {
  constructor(props){
    super(props);
    window.hisLogining = (params) => this.hisLogining(params);
    // this.hisLogining();
  };
  hisLogining(params){
    console.log('进入局部方法', params);
    params = "{\"data\":{\"orgCode\":\"10000\",\"userCode\":\"2\",\"moduleType\":1}}";
    this.loginAction(JSON.parse(params));
  };
  loginAction(param){
    console.log('获取客户端传来的参数', param);
    let params = {
      url: 'BaOrguserController/getDataByidAndToken',
      server_url: config_login_url,
      data: {
        orgUerid: 2,
        serviceToken: ''
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        // 将当前用户的信息保存供其它组件用
        window.sessionStorage.setItem('username', res.data.baOrguser.realname); // 用户名
        window.sessionStorage.setItem('deptid', res.data.baOrguser.deptid); // 科室ID
        window.sessionStorage.setItem('orgid', res.data.baOrguser.orgid); // 机构ID
        window.sessionStorage.setItem('userid', res.data.baOrguser.orgUerid); // 用户ID
        window.sessionStorage.setItem('post', res.data.baOrguser.post); // 医生级别
        window.sessionStorage.setItem('token', res.data.serviceToken); // 医生级别

        if(window.setMenu){ // 通知客户端当前登录用户的菜单
          let rightSysModuleList = res.data.baOrguser.quickMenu.rightMenuList;
          rightSysModuleList.forEach(item => {
            if(item.syModule.modid  != 7){
              item.syModule.callurl = config_local_url + item.syModule.callurl;
            }
          });
          if(res.data){
            alert('设置菜单');
          }
          window.setMenu(JSON.stringify(rightSysModuleList));
        }else{
          console.log('未检测到菜单设置的全局函数！！！');
        }
        that.props.history.push('/Layout/syndromeTreatment');
      }else{
        that.tipModal.showModal({
          content: '用户登录失败，请联系管理员！！',
        });
      }
    }
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
      <Window>
        <span>
          中医健康信息服务平台登陆中。。。
        </span>
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </Window>

    );
  }
}
/* 将登录窗总是在窗体中间*/
const Window = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: '#006699';
  border: 1px solid red;
  width: 100%;
  height: 100vh;
`;
/*
@作者：姜中希
@日期：2018-10-24
@描述：his调用诊疗系统走的默认自动登录方式
*/
export default withRouter(hisLogin);
