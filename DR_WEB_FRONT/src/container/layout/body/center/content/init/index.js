import React, {Component, PropTypes} from 'react'; // react核心
import no_body from './no_body.png';
import styled from 'styled-components';

export default class Init extends Component {
  render() {
    return (
      <Container>
        <img src={no_body} />
        <Title>暂无患者诊疗信息</Title>
        <Tip>请先在左侧患者区选择患者</Tip>
      </Container>
    )
  }
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.p`
  color: #666666;
  font-size: 16px;
`;
const Tip = styled.p`
  color: #CCCCCC;
  font-size: 12px;
`;
