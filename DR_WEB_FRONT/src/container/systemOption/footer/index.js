import React, {Component} from 'react';
import styled from 'styled-components';

export default class Footer extends Component {
  render() {
    return (
      <Container>
        <span>Copyright © 2018   中科软科技股份有限公司</span>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
/*
@作者：姜中希
@日期：2018-06-05
@描述：底部信息栏，包含版权信息
*/
