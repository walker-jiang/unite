import React, {Component, PropTypes} from 'react'; // react核心
import styled from 'styled-components';
import user from './user.png';

export default class UserInfo extends Component {
  render() {
    return (
      <Container>
        <Item>
          <Img />
          <span>中医馆-{window.sessionStorage.getItem('username')}</span>
        </Item>
      </Container>
    )
  }
}
const Container = styled.div`
  display: flex;
  align-items: center;
  color: #1770C8;
  height: 100%
`;
const Item = styled.span`
  padding: 0px 12px;
  height: 17px;
  border-left: 1px solid #1770C8;
  display: flex;
  align-items: center;
  cursor: pointer
`;
const Img = styled.img.attrs({
  src: user
})`
  width: 16px
`;
/*
@作者：姜中希
@日期：2018-07-06
@描述：顶部右侧导航栏，用户信息展示处
*/
