import React, {Component} from 'react';
import styled from 'styled-components';
import { Switch, Route, Router  } from 'react-router-dom';
import Loadable from 'react-loadable'; // 加载时进行模块分离
import layout from './n-syndromeManage/component/layout/layout'; // 布局界面

const loadingComponent = () => (<div>Loading...</div>);

const TodayPatient = Loadable({
  loader: () => import('./n-todayPatient'),
  loading: loadingComponent,
});
const Home = Loadable({
  loader: () => import('./n-home'),
  loading: loadingComponent,
});
// import TreatManage from './treatment';
const TreatManage = Loadable({
  loader: () => import('./treatment'),
  loading: loadingComponent,
});
const PatientRegister = Loadable({
  loader: () => import('./n-patientRegister'),
  loading: loadingComponent,
});
const RegisterForm = Loadable({
  loader: () => import('./n-patientRegister/registerForm'),
  loading: loadingComponent,
});
const Electronic = Loadable({
  loader: () => import('./n-electronicMedicalRecords'),
  loading: loadingComponent,
});
// import SyndromeTreatment from './n-syndromeTreatment';
const SyndromeTreatment = Loadable({
  loader: () => import('./n-syndromeTreatment'),
  loading: loadingComponent,
});
const Cure = Loadable({
  loader: () => import('./n-cure'),
  loading: loadingComponent,
});
// import More from './n-more';
const More = Loadable({
  loader: () => import('./n-more'),
  loading: loadingComponent,
});
const PantientRecords = Loadable({
  loader: () => import('./n-patientRecords'),
  loading: loadingComponent,
});

const layoutSub = Loadable({
  loader: () => import('./n-syndromeManage/component/layout/layout.jsx'),
  loading: loadingComponent,
});
// import ModelManage from './n-modelManage';
const ModelManage= Loadable({
  loader: () => import('./n-modelManage'),
  loading: loadingComponent,
});
const PersonalSetting= Loadable({
  loader: () => import('./n-personalSettings'),
  loading: loadingComponent,
});
const SystemManage= Loadable({
  loader: () => import('./n-systemManage'),
  loading: loadingComponent,
});
import UserManage from './n-userManage';
// const UserManage = Loadable({
//   loader: () => import('./n-userManage'),
//   loading: loadingComponent,
// });
export default class Body extends Component {
  constructor(props){
    super(props);
    this.state = {
      leftBarToggle: null, // 左侧栏是否显示内容
    };
  };
  render() {
    let { leftBar , leftBarToggle } = this.state;
    let pathname = this.props.location.pathname; // 只有我的诊疗界面展示左侧浮框
    return (
      <Container>
          <Route path='/Layout/todayPatient' component={TodayPatient} exact></Route>
          <Route path='/Layout/patientRegister' component={PatientRegister} exact></Route>
          <Route path='/Layout/registerForm/:type' component={RegisterForm} exact></Route>
          <Route path='/Layout' component={Home} exact></Route>
          <Route path='/Layout/treatment' component={TreatManage}></Route>
          <Route path='/Layout/caseCenter' component={Electronic}></Route>
          <Route path='/Layout/cureNotIll' component={Cure}></Route>
          <Route path='/Layout/syndromeTreatment' component={SyndromeTreatment}></Route>
          <Route path='/Layout/patientArchives' component={PantientRecords}></Route>
          <Route path='/Layout/more' component={More}></Route>
          <Route path="/Layout/sub" component={layoutSub}></Route>
          <Route path="/Layout/personalSetting" component={PersonalSetting}></Route>
          <Route path='/Layout/modelManage' component={ModelManage}></Route>
          <Route path='/Layout/systemManage' component={SystemManage}></Route>
          <Route path='/Layout/userManage' component={UserManage}></Route>
          {
            // <div style={{position:'absolute',color:'#666666',left:0,bottom:0,height:'30px',background:'#F2F2F2',textAlign:"center",width:'100%',lineHeight:'30px',fontSize:'12px'}}>Copyright © 2018   中科软科技股份有限公司</div>
          }
      </Container>
    );
  }
}
/** flex-grow: 1; 和 position: absolute; 保证本组件可充满剩余高度*/
const Container = styled.div`
  width: 100%;
  position: relative;
  flex-grow: 1;
`;
/*
@作者：姜中希
@日期：2018-07-05
@描述：头部导航栏以下的部分, 分为三部分，左侧展开栏，右侧展开栏，中间主要内容部分
*/
