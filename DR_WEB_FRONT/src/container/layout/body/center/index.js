import React, {Component} from 'react';
import styled from 'styled-components';
import Content from './content';
import Footer from './footer';

export default class Center extends Component {
  render() {
    return (
      <Container>
        <Content {...this.props} />
        <Footer />
      </Container>
    );
  }
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
/*
@作者：姜中希
@日期：2018-07-05
@描述：中间主体内容布局容器， 分为上下两部分
*/
