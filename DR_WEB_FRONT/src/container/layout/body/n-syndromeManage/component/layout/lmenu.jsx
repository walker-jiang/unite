import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import styled from 'styled-components';
const SubMenu = Menu.SubMenu;
/**   
 * 公共菜单
 *
 * @export
 * @class Lmenu
 * @extends {Component}
 */
export class Lmenu extends Component {

  render() {
    return (
      <Menu
        style={{ width: 200, height:"52rem" }}
        className='myTreat'
        defaultSelectedKeys={['1']}
        mode="inline"
      >
        <Menu.Item key="1">
          <Link to="/Layout/sub/Home">
            <MenuIcon type="appstore" />
            <span>导航管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/Layout/sub/clinical">
            <MenuIcon type="appstore" />
            <span>临床指南管理</span>
          </Link>
        </Menu.Item>
        <SubMenu key="sub1" title={<span><Icon type="setting" /><span>辨证论治院方</span></span>}>
          <Menu.Item key="9">
            <Link to="/Layout/sub/zhong">
              <MenuIcon type="appstore" />
              <span>中药匹配</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/Layout/sub/zhongCheng">
              <MenuIcon type="appstore" />
              <span>中成药匹配</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/Layout/sub/shiYi">
              <MenuIcon type="appstore" />
              <span>适宜技术匹配</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="10">中成药匹配</Menu.Item>
          <Menu.Item key="11">适宜技术匹配</Menu.Item> */}
        </SubMenu>
        <Menu.Item key="3">
          <Link to="/Layout/sub/mprescription">
            <MenuIcon type="appstore" />
            <span>现代方剂管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/Layout/sub/aprescription">
            <MenuIcon type="appstore" />
            <span>古代方剂管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/Layout/sub/cpmedicine">
            <MenuIcon type="appstore" />
            <span>中成药管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/Layout/sub/chineseMedicine">
            <MenuIcon type="appstore" />
            <span>中药管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="/Layout/sub/abstract">
            <MenuIcon type="appstore" />
            <span>期刊文献管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="8">
          <Link to="/Layout/sub/tzMedicalcase">
            <MenuIcon type="appstore" />
            <span>名医医案管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="9">
          <Link to="/Layout/sub/acupoint">
            <MenuIcon type="appstore" />
            <span>穴位信息管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="10">
          <Link to="/Layout/sub/article">
            <MenuIcon type="appstore" />
            <span>文章资源管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link to="/Layout/sub/dataDictionaries">
            <MenuIcon type="appstore" />
            <span>数据字典管理</span>
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}
const StyledLink = styled(Link)`
  height: 100%;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.65);
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
      color: rgba(0, 0, 0, 0.65);
  }
`;
const MenuIcon = styled(Icon)`
  color: rgba(188, 188, 188, 1);
  font-size: 16px;
  top: 5px !important;
`;
