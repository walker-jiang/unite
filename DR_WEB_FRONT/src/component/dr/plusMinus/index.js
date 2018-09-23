import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.operate = this.operate.bind(this);
  };
  /** [operate 点击加减按钮] */
  operate(e){
    let operateChar = e.target.innerText;
    const { value, onChange, type = 'number' } = this.props
    let newValue = value;
    switch(operateChar){
      case '+':
        if(type == 'percent' && newValue +5  <= 100){ // 百分比模式
          newValue  = newValue + 5;
        }
        else if(type == 'number'){ // 数字模式
          newValue++;
        }
        break;
      case '-':
        if(type == 'percent'){ // 百分比模式
          newValue  = newValue - 5;
        }
        else if(type == 'number'){ // 数字模式
          newValue--;
        }
        if(newValue < 0){
          return;
        }
        break;
      default:
        console.log('无效点击事件');
    };
    onChange(newValue);
  };
  render() {
    const { value, type = 'number', ...others } = this.props
    return (
      <Container >
        <Plus onClick={this.operate}>+</Plus>
        <Input {...others}>{value}{type == 'percent'? '%' : ''}</Input>
        <Minus onClick={this.operate}>-</Minus>
      </Container>
    );
  }
}
const Container = styled.span` /* 半圆边框的组件容器*/
  border: 1px solid rgb(228, 228, 228);
  border-radius: 14px;
`;
const Input = styled.span` /* 显示数值的元素 */
  margin: 0px 30px;
`;
const Operation = styled.span` /* 基本的操作组件样式，边框、半圆、手型 */
  border: 1px solid rgb(228, 228, 228);
  border-radius: 14px;
  padding: 0px 5px;
  cursor: pointer;
`;
const Plus = Operation; /* 加数字 */
const Minus = Operation.extend` /* 减数字 ，由于加减所占的宽度不一样所以通过span设置*/
  padding: 0px 6px;
`;
/*
@作者：姜中希
@日期：2018-07-13
@描述：通过左右加减按钮操作数字的组件
*/
Index.propTypes = {
  value: PropTypes.number,
  type: PropTypes.oneOf(['number', 'percent'])
};
