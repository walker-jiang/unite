import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PatienList from './patientList';
import AgentRequest from './agentBusinessesManage/agentRequest';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class MyTreat extends Component {
  render() {
    return (
      <Layout>
        <Sider>
          <Title>我的诊疗</Title>
          <SpecMenu
            onClick={this.handleClick}
            style={{ width: 220 }}
            defaultSelectedKeys={['1']}
            mode="inline"
          >
            <Menu.Item key="1">
              <StyledLink to={`${this.props.match.url}`}>
                <MenuIcon type="appstore" />
                <span>患者列表</span>
              </StyledLink>
            </Menu.Item>
            <SubMenu key="2" title={<span><MenuIcon type="appstore" /><span>代开业务管理</span></span>}>
              <Menu.Item key="21">
                <StyledLink to={`${this.props.match.url}/agentRequest`}>
                  代开请求
                </StyledLink>
              </Menu.Item>
              <Menu.Item key="22">已代开业务</Menu.Item>
            </SubMenu>
            <Menu.Item key="3">
              <StyledLink to={`${this.props.match.url}`}>
                <MenuIcon type="appstore" />
                <span>预约挂号查询</span>
              </StyledLink>
            </Menu.Item>
            <Menu.Item key="4">
              <StyledLink to={`${this.props.match.url}`}>
                <MenuIcon type="appstore" />
                <span>申请住院查询</span>
              </StyledLink>
            </Menu.Item>
            <SubMenu key="5" title={<span><MenuIcon type="appstore" /><span>代开业务管理</span></span>}>
              <Menu.Item key="51">
                <StyledLink to={`${this.props.match.url}/agentRequest`}>
                  我参与的
                </StyledLink>
              </Menu.Item>
              <Menu.Item key="52">我发起的</Menu.Item>
            </SubMenu>
            <SubMenu key="6" title={<span><MenuIcon type="appstore" /><span>代开业务管理</span></span>}>
              <Menu.Item key="61">
                <StyledLink to={`${this.props.match.url}/agentRequest`}>
                  检查/检验模板
                </StyledLink>
              </Menu.Item>
              <Menu.Item key="62">处方模板</Menu.Item>
            </SubMenu>
          </SpecMenu>
        </Sider>
        <Content>
          <Switch>
            <Route path={`${this.props.match.url}`} component={PatienList} exact></Route>
            <Route path={`${this.props.match.url}/agentRequest`} component={AgentRequest} exact></Route>
          </Switch>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
const Layout = styled.div`
  height: 100%;
  display: flex;
`;
const Sider = styled.div`
  height: 100%;
  background-color: rgba(215, 215, 215, 1);
`;
const Content = styled.div``;
const SpecMenu = styled(Menu)`
  background-color: #F2F2F2;
  & > .ant-menu-submenu > .ant-menu-submenu-title {
    border-bottom: 1px solid white;
    color: #999999;
    font-size: 12px;
    margin-bottom: 0px;
  }
  & > .ant-menu-item {
    border-bottom: 1px solid white;
    color: #999999;
    font-size: 12px;
    margin-bottom: 0px;
  }
  & > .ant-menu-submenu > .ant-menu {
    background-color: #F2F2F2 !important;
  }
  & > .ant-menu-submenu > .ant-menu > .ant-menu-item-selected {
    background-color: #FFFFFF !important;
  }
  & > .ant-menu-item-selected {
    background-color: #FFFFFF !important;
  }
  & > .ant-menu-submenu > .ant-menu-inline > .ant-menu-item:after {
    border: none;
  }
  & > .ant-menu-item-selected:after {
    border: none !important;
  }
  & > .ant-menu-submenu > .ant-menu-inline > .ant-menu-item {
    border-bottom: 1px solid white;
    margin-top: 0px;
    margin-bottom: 0px;
    color: #333333;
    font-size: 12px;
    font-style: normal;
    font-family: 'MicrosoftYaHei', '微软雅黑';
    font-weight: 400;
  }
`;
const Title = styled.div`
  height: 49px;
  line-height: 49px;
  text-align: center;
  width: 100%;
  background-color: rgba(215, 215, 215, 1);
  color: #ffffff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  font-family: 'MicrosoftYaHei', '微软雅黑';
`;
const MenuIcon = styled(Icon)`
  color: rgba(188, 188, 188, 1);
  font-size: 16px;
  top: 5px !important;
`;
const StyledLink = styled(Link)`
  height: 100%;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.65);
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
      color: rgba(0, 0, 0, 0.65);
  }
`;
/*
@作者：姜中希
@日期：2018-06-05
@描述：我的诊疗容器
*/
