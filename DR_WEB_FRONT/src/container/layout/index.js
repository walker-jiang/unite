import React, {Component} from 'react';
import styled from 'styled-components';
import Header from './header';
import Body from './body';
import Sider from './sider';
import { Layout } from 'antd';

export default class Index extends Component {
  componentWillMount(){
    if(bundleMode == 'CS'){
      this.setUserInfoForClient();
    }
  };
  setUserInfoForClient(){
    let userInfoObj = JSON.parse(window.getLoginState());
    window.sessionStorage.setItem('username', userInfoObj.username); // 用户名
    window.sessionStorage.setItem('deptid', userInfoObj.deptid); // 科室ID
    window.sessionStorage.setItem('orgid', userInfoObj.orgid); // 机构ID
    window.sessionStorage.setItem('userid', userInfoObj.userid); // 用户ID
    window.sessionStorage.setItem('post', userInfoObj.post); // 医生级别
  };
  render() {
    return (
      <Layout style={{minHeight: '100vh',width:"100%"}}>
         <Sider style={{width:"10%",float:'left'}} ref="MenuItem"></Sider>
         <SpecLayout>
           <Header {...this.props}/>
           <Body {...this.props}/>
         </SpecLayout>
     </Layout>
    );
  }
}
const SpecLayout = styled(Layout)`
  width: 90%;
  float: left;
  display: flex;
  flex-direction: column;
  &&& {
    background-color: white;
  }
`;
/*
@作者：姜中希
@日期：2018-06-05
@描述：布局文件，包含头部导航，以及以下主要内容
*/
