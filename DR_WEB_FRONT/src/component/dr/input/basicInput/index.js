import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'components/dr/icon';

export default class Input extends Component {
  render() {
    let { value, className, ...other } = this.props; // 表单属性
    return (
      <div className={className}>
        <InputWithLine {...other} value={value ? value : ''} />
      </div>
    );
  }
}
const Sign = styled(Icon)`
  position: absolute;
  margin-left: -25px;
  width: 20px;
  margin-top: 10px;
`;
const InputWithLine = styled.input.attrs({
  type: 'text',
  // autoComplete: 'off',
  placeholder: props => props.placeholder
})`
  border-bottom: 1px solid rgba(215, 215, 215, 1);
  border-top: none;
  width: 100%;
  border-left: none;
  line-height: 25px;
  color: black;
  border-right: none;
  background: transparent;
  margin-top: 10px;
  font-size: 12px;
  word-break: break-all;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:focus {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    word-break: break-all;
    outline: none
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
/*
@作者：姜中希
@日期：2018-06-26
@描述：自定义一个基本输入框组件，样式定制，使用时要提供value
*/
