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
    this.state = {
      link:window.sessionStorage.getItem('selsetd'),
    }
    window.AddHerbalMedicineFunc = (params) => this.AddHerbalMedicineFunc(params)
  };
  /**
   * [AddHerbalMedicineFunc 从知识库添加中药处方定义的全局回调函数]
   * @param {[type]} params [草药数据]
   */
  AddHerbalMedicineFunc(params){
    // window.herbalData = params; // 将知识库传过来的草药数据存为全局变量
    if(window.sessionStorage.getItem('userid')){ // 当前为已经登陆状态
      if(window.registerID){ // 已接诊跳转到诊疗页
        this.props.history.push('/Layout/treatment')
        window.noticeFunc(params);
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
  componentWillReceiveProps(nextProps){
      let _this=this
      // console.log(nextProps.location.pathname)
      let link= nextProps.location.pathname.split("/");
      // console.log(link);
      if(link[2]==undefined){
        window.sessionStorage.setItem('selsetd', 'home');
        _this.setState({link:'home'})
      }else if(link[2]=='treatment'){
        window.sessionStorage.setItem('selsetd','todayPatient');
        _this.setState({link:'todayPatient'})
      }else{
        window.sessionStorage.setItem('selsetd', link[2]);
        _this.setState({link:link[2]})
      }
  };
  setUserInfoForClient(){
    let userInfoObj = JSON.parse(window.getLoginState());
    console.log('userInfoObj.userid123', userInfoObj);
    window.sessionStorage.setItem('username', userInfoObj.username); // 用户名
    window.sessionStorage.setItem('deptid', userInfoObj.deptcode); // 科室ID
    window.sessionStorage.setItem('orgid', userInfoObj.orgid); // 机构ID
    window.sessionStorage.setItem('userid', userInfoObj.userid); // 用户ID
    window.sessionStorage.setItem('post', userInfoObj.post); // 医生级别
  };
  render() {
    return (
      <Layout style={{height: '100vh',width:"100%",background:'#fff !important'}}>
        <Sider style={{height:'100%',width:"10%",float:'left'}} ref="MenuItem" link={this.state.link}></Sider>
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
