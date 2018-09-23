import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class Triangle extends Component {
  render() {
    let { left = '50%' } = this.props;
    return (
      <Container left={left}>
        <Child left={left}/>
      </Container>
    )
  }
}
const Container = styled.div`
  width: 0px;
  margin-left: ${props=>props.left};
  border-right: 11px solid transparent;
  border-left: 11px solid transparent;
  border-bottom: 11px solid #A9A9A9;
`;
const Child = styled.div`
  width: 0px;
  position: absolute;
  margin-left: ${props=>props.left};
  left: 1px;
  margin-top: 2px;
  z-index: 1px;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid white
`;
/*
@作者：姜中希
@日期：2018-06-27
@描述：纯div的一个三角形，去掉底边，需要指定位置提供属性left
*/
Triangle.proptypes = {
  left: PropTypes.string.isRequired
};
