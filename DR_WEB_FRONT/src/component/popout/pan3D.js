import React, {Component} from 'react';
import styled from 'styled-components';

export default class Pan3D extends Component {
  render() {
    return (
      <Container>
        <Left>
          <Top />
          <Bottom />
        </Left>
        <Right>
          {this.props.title}
        </Right>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 38px;
  width: 138px;
  margin-top: -10px;
  margin-left: 38px;
  display: flex;
  align-items: flex-start
`;
const Left = styled.div`
  width: 10px;
  height: 138px
`;
const Top = styled.div`
  border-left: 8px solid transparent;
  border-bottom: 10px solid rgb(67, 35, 99);
`;
const Bottom = styled.div`
  border-right: 7px solid rgb(81, 140, 140);
  border-bottom: 28px solid transparent;
`;
const Right = styled.div`
  height: 38px;
  line-height: 38px;
  width: 138px;
  background: #5f53cc;
  text-align: center
`;
/*
@作者：姜中希
@日期：2018-06-06
@描述：一个有3D效果的标题框
*/
