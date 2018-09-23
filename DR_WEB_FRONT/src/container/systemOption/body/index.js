import React, { Component } from 'react';
import styled from 'styled-components';
import Content from './content';
const bodyHeight = document.body.clientHeight;
export default class Body extends Component {
  render() {
    return (
      <Container>
        <Title>系统设置</Title>
        <Content></Content>
      </Container>
    );
  }
}
const Container = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: #999999;
  font-size: 12px;
  padding-top: 12px;
  min-height: ${(bodyHeight-60) + 'px'}; /*让底部栏始终在底部*/
`;
const Title = styled.span`
  color: #333333;
  font-size: 16px;
  margin-left: 249px;
`;
/*
@姜中希
@日期：2018-07-29
@描述：系统设置界面容器，包括标题和主要设置内容容器
*/
