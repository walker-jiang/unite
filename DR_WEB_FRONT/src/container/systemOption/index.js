import React, { Component } from 'react';
import styled from 'styled-components';
import Body from './body';
import Footer from './footer';

export default class SystemSetting extends Component {
  render() {
    return (
      <Container >
        <Body />
        <Footer />
      </Container>
    );
  }
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(228, 228, 228, 1);
  position: absolute;
  top: 0px;
  padding: 10px 16px;
  height: fit-content;
`;
/*
@姜中希
@日期：2018-07-29
@描述：系统设置界面容器，系统设置容器和底部系统版权信息
*/
