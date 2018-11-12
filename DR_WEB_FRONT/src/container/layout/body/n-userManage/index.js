/* @作者：马奔
@日期：2018-10-15
@描述：用户管理主模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import Rolesettings from './rolesettings'
import Usersettings from './usersettings'
import Useraddmodule from './usersettings/useraddmodule'
import Userinfomodule from './usersettings/userinfomodule'
import Roleaddmodule from './rolesettings/roleaddmodule'
import Rolecopymodule from './rolesettings/rolecopymodule'
import Roleinfomodule from './rolesettings/roleinfomodule'
import Roleauthoritymodule from './rolesettings/roleauthoritymodule'
import Prescriptionauthorization from './rolesettings/prescriptionauthorization'
import PermissionsPreview from './rolesettings/permissionsPreview'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rcStatus: 2 , //控制用户和角色显示和样式
      userorrole:'', // 用户或者角色  1角色2用户
      setting:'', //控制设置的类型 1 添加 2 查看
      id:'' //当前用户id
      // roleName:''  //角色的名称
    };
  }
  componentWillMount() {
  };
  /** [toggleTabs 点击样式切换/控制用户和角色的显示] */
  toggleTabs = (curTab) => {
    this.setState({rcStatus: curTab});
  };
  /**
   * [setuptype 设置的类型]
   * @param  {[type]} rcStatus   [主控制1用户2 3]
   * @param  {[type]} setting    [控制类型123456]
   * @param  {[type]} Userorrole [控制信息1角色2用户]
   * @param  {[type]} id         [当前用户或者角色的id]
   * @return {[type]}            [undefined]
   */
  setuptype = (rcStatus, userorrole,setting,id ) => {
    this.setState({rcStatus: rcStatus, userorrole: userorrole,setting: setting,id:id });
  }
  render() {
    let {rcStatus, userorrole,setting ,id} = this.state;
    let c
    if (userorrole == 1) { //角色设置
        switch (setting){
          case 1: //添加模块
            c = <Roleaddmodule setuptype={this.setuptype} id={id}/>
            break;
          case 2: //复制模块
            c = <Rolecopymodule setuptype={this.setuptype} id={id}/>
            break;
          case 3: //查看角色模块
            c = <Roleinfomodule setuptype={this.setuptype} id={id}/>
            break;
          case 4: //角色添加权限模块
            c = <Roleauthoritymodule setuptype={this.setuptype} id={id}/>
            break;
          case 5: //角色添加处方模块
            c = <Prescriptionauthorization setuptype={this.setuptype} id={id}/>
            break;
          case 6: //角色权限预览模块
            c = <PermissionsPreview setuptype={this.setuptype} id={id}/>
            break;
        }
    } else { // 用户设置
      switch (setting) {
        case 1: //添加模块
          c = <Useraddmodule setuptype={this.setuptype} id={id}/>
          break;
        case 2: //查看模块
          c = <Userinfomodule setuptype={this.setuptype} id={id} />
          break;
        case 3: //用户权限预览模块
          c = <PermissionsPreview setuptype={this.setuptype} userid={id}/>
          break;
      }
    };
    return (<Container>
      {
        rcStatus != 3
          ? <Box>
              <Header>
                <TabPane activeTab={rcStatus} _key={1} onClick={(e) => this.toggleTabs(1)}>角色设置</TabPane>
                <TabPane activeTab={rcStatus} _key={2} onClick={(e) => this.toggleTabs(2)}>用户设置</TabPane>
              </Header>
              <Body>
                {
                  rcStatus == 1
                    ? <Rolesettings setuptype={this.setuptype}/>
                    : <Usersettings setuptype={this.setuptype}/>
                }
              </Body>
            </Box>
          : <Box>
              {c}
            </Box>
      }
    </Container>)
  }
}

const Container = styled.div `
  width:100%;
  overflow: hidden;
  height: calc(100vh - 50px);
`;
const Box = styled.div `
  width:100%;
  overflow: hidden;
  height: 100%;
`;
const Header = styled.div `
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: rgb(242,242,242);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.349019607843137);
`;
const TabPane = styled.span `
  display: inline-block;
  height: 37px;
  width: 77px;
  word-wrap: normal;
  white-space: nowrap;
  font-weight: 400;
  line-height:35px;
  color: rgb(51, 51, 51);
  font-size: 14px;
  margin: 0 15px;
  text-align: center;
  cursor: pointer;
  border-bottom: ${props => props.activeTab == props._key
  ? '2px solid #0a6ecb'
  : 'none'} ;
`;
const Body = styled.div `
   width: 100%;
   height:607px;
   padding: 0 20px;
 `;
