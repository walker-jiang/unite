import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class Menus extends Component {
  render() {
    return (
      <Container>
        <StyledLink
          to='/Layout'>
          门户首页
        </StyledLink>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const StyledLink = styled(Link)`
  padding: 0px 12px;
  height: 17px;
  display: flex;
  align-items: center;
  cursor: pointer
`;
/*
@作者：姜中希
@日期：2018-07-05
@描述：头部导航
*/
