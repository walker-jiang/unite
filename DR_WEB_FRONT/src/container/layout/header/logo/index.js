import React, {Component, PropTypes} from 'react'; // react核心
import styled from 'styled-components';
import LogoImg from './logo.png';

export default class Logo extends Component {
  render() {
    return (
      <Container>
        <Img src={LogoImg}/>
        <span>{systemName}</span>
      </Container>
  )
  }
}
const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: "MicrosoftYaHei, 微软雅黑";
`;
const Img = styled.img`
  width: 28px;
  margin: 0px 10px;
`;
/*
@作者：姜中希
@日期：2018-06-05
@描述：logo组件
*/
