import React, {Component} from 'react';
import Icon from './table.svg';
import styled from 'styled-components';

export default class Index extends Component {
  render() {
    return (
      <TableIcon {...this.props} >
        <Block></Block>
        <Block></Block>
        <Block></Block>
        <Block></Block>
      </TableIcon>
    );
  }
}
const TableIcon = styled.div`
  cursor: pointer;
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background: rgba(10, 110, 203, 1);
  padding-top: 1px;
  padding-left: 1px;
`;
const Block = styled.div`
  width: 5px;
  height: 5px;
  float: left;
  background-color: #FFFFFF;
  margin: 2px;
`;
/*
@作者：姜中希
@日期：2018-08-14
@描述：方格图标
*/
