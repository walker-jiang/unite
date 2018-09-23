import React, {Component, PropTypes} from 'react'; // react核心
import Loadable from 'react-loadable'; // 加载时进行模块分离
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
// import TreatManage from './treatManage';
import MyTreat from './myTreat';
import Init from './init';
import TodayPatient from './todayPatient';
import PatientRegister from './patientRegister';

const loadingComponent = () => (<div>Loading...</div>);
const TreatManage = Loadable({
  loader: () => import('./treatManage'),
  loading: loadingComponent,
});
// const MyTreat = Loadable({
//   loader: () => import('./myTreat'),
//   loading: loadingComponent,
// });
// const Init = Loadable({
//   loader: () => import('./init'),
//   loading: loadingComponent,
// });
export default class Content extends Component {
  render() {
    return (
      <Container>
        <Route path={`${this.props.match.path}/treatManage/:id`} component={TreatManage} ></Route>
        <Route path={`${this.props.match.path}/myTreat`} component={MyTreat}></Route>
        <Route path={`${this.props.match.path}/todayPatient`} component={TodayPatient}></Route>
        <Route path={`${this.props.match.path}/patientRegister`} component={PatientRegister}></Route>
      </Container>
    )
  }
}
const Container = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  background: #FFFFFF;
  margin-top: 5px;
`;
/*
@作者：姜中希
@日期：2018-06-05
@描述：中部主要内容的容器；包含诊疗管理、我的诊疗路由的声明
*/
