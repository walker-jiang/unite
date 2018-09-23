import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class Logout extends Component {
  render() {
    return (
      <Container>
        <Item>
          <StyledLink to='/'>
            注销
          </StyledLink>
        </Item>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: #1770C8;
`;
const Item = styled.div`
  border-left: 1px solid #1770C8;
  height: 17px;
  padding: 0px 12px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
      color: #1770C8;
  }
`;
/*
@作者：姜中希
@日期：2018-07-05
@描述：注销系统包含三部分，注销、？、X
*/
