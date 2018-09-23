import React, {Component} from 'react';
import styled from 'styled-components';
import right from './right_arrow.png';

export default class RightBar extends Component {
  render() {
    return (
      <Container>
        <RightArrow>

        </RightArrow>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 13px;
  heigt: 100%;
  ${'' /* border: 1px solid yellow; */}
  display: flex;
  align-items: center
`;
const RightArrow = styled.div`
  height: 250px;
  background: linear-gradient(rgba(228, 228, 228, 1), white, rgba(228, 228, 228, 1));
  display: flex;
  align-items: center;
  cursor: pointer
`;
const Img = styled.img.attrs({
  src: right,
})`
  transform: rotateZ(-90deg);
`;
/*
@作者：姜中希
@日期：2018-07-05
@描述：右侧竖条展开浮窗栏目
*/
