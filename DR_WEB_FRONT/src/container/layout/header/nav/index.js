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
/*
@作者：姜中希
@日期：2018-06-05
@描述：顶部右侧导航栏，包含导航菜单，待办事项，用户信息，注销
*/
