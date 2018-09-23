import React, {Component} from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable'; // 加载时进行模块分离
const loadingComponent = () => (<div>Loading...</div>);
const Login = Loadable({
  loader: () => import('./login'),
  loading: loadingComponent,
});
const BindingHis = Loadable({
  loader: () => import('./bindingHis'),
  loading: loadingComponent,
});
const RetakePassword = Loadable({
  loader: () => import('./retakePassword'),
  loading: loadingComponent,
});
const InitialSetting = Loadable({
  loader: () => import('./initialSetting'),
  loading: loadingComponent,
});
export default class Index extends Component {
  render() {
    return (
      <Window>
        <Switch>
          <Route path='/login' component={Login} exact></Route>
          <Route path='/login/initialSetting' component={InitialSetting} exact></Route>
          <Route path='/login/getPassword' component={RetakePassword} exact></Route>
          <Route path='/login/bindingHis' component={BindingHis} exact></Route>
        </Switch>
      </Window>

    );
  }
}
/* 将登录窗总是在窗体中间*/
const Window = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${bundleMode == 'CS' ? 'white' : '#006699'};
  width: ${bundleMode == 'CS' ? '750px' : '100%'};
  height: ${bundleMode == 'CS' ? '480px' : '100vh'};
`;
/*
@作者：姜中希
@日期：2018-08-05
@描述：登录所涉及的组件（登录i、找回密码、绑定、初始化设置）路由容器
*/
