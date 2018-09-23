import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styled from 'styled-components';

export default class Semicircle extends Component {
  /** [showResult 触发显示结果弹框的函数] */
  showResult(e){
    this.props.displayed(e.target.value);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  stopBubling(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  // componentWillReceiveProps(props){
  //   console.log('props.autofocus',props.autofocus);
  //   if(props.autofocus){
  //     this.input.focus();
  //   }
  // };
  render() {
    let {placeholder, autofocus, icon, id = 'no'} = this.props;
    return (
      <Container>
        <InputSearch onKeyDown={(e)=>this.props.onKeyDown(e)}>
          <Search>🔍</Search>
          <Input
            type='text'
            id={id}
            autoFocus={autofocus}
            className='not-draggable'
            placeholder={placeholder}
            onFocus={(e) => {this.showResult(e)}}
            onChange={(e)=>{this.showResult(e)}}
            onClick={(e)=>{this.stopBubling(e)}}
          />
          <Arrow icon={icon}><Icon type="down" /></Arrow>
        </InputSearch>
        { this.props.children }
      </Container>
    );
  }
}
const Container = styled.div`
  width: 100%;
  position: relative;
  margin: 0px 10px;
`;
const Search = styled.div`
  position: absolute;
  display: 'block';
`;
const Arrow = styled.div`
  position: absolute;
  right: 10px;
  color: black;
  display: ${props => (props.icon == 'true') ? 'block' : 'none'}
`;
const Input = styled.input`
  border-bottom: 1px solid rgba(215, 215, 215, 1);
  border-top: none;
  border-left: none;
  line-height: 25px;
  color: black;
  border-right: none;
  font-size: 12px;
  width: 100%;
  margin-left: 15px;
  margin-top: 1px;
  &:focus {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    outline: none
  }
`;
const InputSearch = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid rgba(215, 215, 215, 1);
  border-radius: 15px;
  padding: 0px 10px;
  height: 26px;
`;
Semicircle.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string
};
/*
@作者：姜中希
@日期：2018-07-03
@描述：自定义一个输入框组件，样式定制，输入时会自动过滤出来匹配的结果，
引用参考src\container\layout\body\center\content\treatManage\treatment\treatmentList\smartCure\addSmartCure\quickAddHerb.js
*/
