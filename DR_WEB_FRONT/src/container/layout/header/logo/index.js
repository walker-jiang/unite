import React, {Component, PropTypes} from 'react'; // react核心
import styled from 'styled-components';
import LogoImg from './logo.png';
import Name from './name.png';

export default class Logo extends Component {
  render() {
    return (
      <Container>
        <Img src={LogoImg}/>
        <SysName src={Name} />
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
  margin-left: 10px;
`;
const SysName = styled.img`
  margin-left: -5px;
  margin-top: 7px;
}
`;
/*
@作者：姜中希
@日期：2018-06-05
@描述：logo组件
*/
