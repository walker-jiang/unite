import React, {Component, PropTypes} from 'react'; // react核心
import styled from 'styled-components';

import Menus from './menus';
import ToDoItem from './toDoItem';
import UserInfo from './userinfo';
import Logout from './logout';

export default class Nav extends Component {
  render() {
    return (
      <Container>
        <Menus {...this.props}/>
        <ToDoItem />
        <Feedback>意见反馈</Feedback>
        <UserInfo />
      </Container>
    )
  }
}
const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
  color: white;
  height: 100%
`;
const Feedback = styled.span`
  padding: 0px 12px;
  height: 17px;
  border-left: 1px solid #1770C8;
  display: flex;
  align-items: center;
  color: #0A6ECB;
  cursor: pointer
`;
/*
@作者：姜中希
@日期：2018-06-05
@描述：顶部右侧导航栏，包含导航菜单，待办事项，用户信息，注销
*/
