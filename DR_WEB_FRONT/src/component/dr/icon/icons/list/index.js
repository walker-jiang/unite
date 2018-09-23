import React, {Component} from 'react';
import Icon from './list.svg';
import styled from 'styled-components';

export default class Index extends Component {
  render() {
    let {backgroundColor, borderColor, ...other} = this.props;
    return (
      <ListIcon {...other} borderColor={borderColor}>
        <Line backgroundColor={backgroundColor}></Line>
        <Line></Line>
        <Line></Line>
      </ListIcon>
    );
  }
}
const ListIcon = styled.div`
  cursor: pointer;
  float: left;
  width: 20px;
  height: 20px;
  border: 1px solid #999999;
  border-radius: 3px;
`;
const Line = styled.div`
  height: 2px;
  background: #999999;
  margin: 3px 2px 0px 2px;
`;
/*
@作者：姜中希
@日期：2018-08-14
@描述：列表图标
*/
