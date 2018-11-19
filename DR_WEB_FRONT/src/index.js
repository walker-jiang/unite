import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable'; // 加载时进行模块分离
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import obj_prototype from 'commonFunc/prototype'; // 引入自定义的原型方法
import Mobile from './container/layout/body/treatment/treatItem/diseasePreventTreat/mobile';
// import Layout from './container/layout';
import './global.css'; // 全局样式文件
import 'antd/dist/antd.less';
const loadingComponent = () => (<div>Loading...</div>);
import Layout from './container/layout';
// const Layout = Loadable({
//   loader: () => import('./container/layout'),
//   loading: loadingComponent,
// });
// import Login from './container/login';
const Login = Loadable({
  loader: () => import('./container/login'),
  loading: loadingComponent,
});
const HisLogin = Loadable({
  loader: () => import('./container/login/hisLogin'),
  loading: loadingComponent,
});
// const Mobile = Loadable({
//   loader: () => import('./container/layout/body/treatment/treatItem/diseasePreventTreat/mobile'),
//   loading: loadingComponent,
// });
const Download = Loadable({
  loader: () => import('./container/download'),
  loading: loadingComponent,
});
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' render={() => <Redirect to="/login" />} exact></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/hisLogin' component={HisLogin}></Route>
      <Route path='/download' component={Download} ></Route>
      <Route path='/layout' component={Layout} ></Route>
      <Route path='/Mobile' component={Mobile} exact></Route>
    </Switch>
  </BrowserRouter>
);
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
if (module.hot) {
  module.hot.accept();
}
/*
@作者：姜中希
@日期：2018-06-05
@描述：入口文件，定义了根路由，引入了根组件
*/
