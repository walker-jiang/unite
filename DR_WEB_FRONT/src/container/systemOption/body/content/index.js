import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Entry from './entry';
import InfoModefied from './infoModified';
import SystemSetting from './systemSetting';
import SysSettingNo from './systemSetting/sysSettingNo';

export default class Content extends Component {
  render() {
    return (
      <Switch>
	    	<Route component={Entry} path='/systemOption/entry'></Route>
	    	<Route path='/systemOption/pim' component={InfoModefied} exact></Route>
        <Route path='/systemOption/sysSetting' component={SystemSetting} exact></Route>
        <Route path='/systemOption/sysSettingNo' component={SysSettingNo} exact></Route>
	    </Switch>
    );
  }
}
const Container = styled.div`

`;

/*
@姜中希
@日期：2018-07-29
@描述：系统设置界面容器，包括个人信息设置、修改密码、系统选项、模板管理、系统版本
*/
