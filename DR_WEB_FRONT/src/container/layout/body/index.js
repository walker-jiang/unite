import React, {Component} from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable'; // 加载时进行模块分离

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

const Cure = Loadable({
  loader: () => import('./n-cure'),
  loading: loadingComponent,
});
const More = Loadable({
  loader: () => import('./n-more'),
  loading: loadingComponent,
});

const PantientRecords = Loadable({
  loader: () => import('./n-patientRecords'),
  loading: loadingComponent,
});

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
          <Route path='/Layout/treatment/:id' component={TreatManage}></Route>
          <Route path='/Layout/electronicMedicalRecords' component={Electronic}></Route>
          <Route path='/Layout/cure' component={Cure}></Route>
          <Route path='/Layout/patientRecords' component={PantientRecords}></Route>
          <Route path='/Layout/more' component={More}></Route>
      </Container>
    );
  }
}
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
