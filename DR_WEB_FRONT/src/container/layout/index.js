import React, {Component} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Header from './header';
import Body from './body';
import Sider from './sider';
import { Layout } from 'antd';

class Index extends Component {
  constructor(props){
    super(props);
    window.AddHerbalMedicineFunc = (params) => this.AddHerbalMedicineFunc(params)
  };
  AddHerbalMedicineFunc(params){
    window.herbalData = params; // 将知识库传过来的草药数据存为全局变量
    if(window.sessionStorage.getItem('userid')){ // 当前为已经登陆状态
      if(window.patientid){ // 已接诊跳转到诊疗页
        this.props.history.push('/Layout/treatment/' + window.patientid)
      }else{ // 未接诊跳转到接诊页
        this.props.history.push('/Layout/todayPatient')
      }
    }else{
        this.props.history.push('/login')
    }
  };
  componentWillMount(){
    if(window.getLoginState){
      this.setUserInfoForClient();
    }
  };
  setUserInfoForClient(){
    let userInfoObj = JSON.parse(window.getLoginState());
    console.log('userInfoObj.userid123', userInfoObj);
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
export default withRouter(Index);
