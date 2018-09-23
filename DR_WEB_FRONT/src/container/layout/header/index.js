import React, {Component, PropTypes} from 'react'; // react核心
import styled from 'styled-components';

import Logo from './logo';
import Nav from './nav';

export default class Header extends Component {
  render() {
    return (
      <Container>
        <Logo />
        <Nav {...this.props}/>
      </Container>
    )
  }
}
const Container = styled.div`
  height: 40px;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  color: #0A6ECB;
  display: flex;
  flex-direction: row;
  justify-content: space-between
`;
/*
@作者：姜中希
@日期：2018-06-05
@描述：顶部导航容器包含左侧logo和右侧导航菜单
*/
