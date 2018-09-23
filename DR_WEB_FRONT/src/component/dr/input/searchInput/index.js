import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class QuickAdd extends PureComponent {
  constructor(props){
    super(props);
    this.showResult = this.showResult.bind(this);
  };
  /** [showResult 触发显示结果弹框的函数] */
  showResult(value){
    if(this.props.formItemProps){
      this.props.formItemProps.onChange(value);
    }
    this.props.displayed(value);
  };
  render() {
    let { icon, placeholder, formItemProps } = this.props;
    let inputProps = {};
    if(formItemProps){
      inputProps.value = formItemProps.value;
    }
    return (
      <Container className={this.props.className}>
        <Search icon={icon} >🔍</Search>
        <Input id="quickAddInput"
          type='text'
          autoComplete="off"
          onClick={(e)=>{
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
             this.showResult(e.target.value)}
           }
          {...inputProps}
          onChange={e => {this.showResult(e.target.value)}}
          onKeyDown={(e)=>{this.props.onKeyDown(e)}}
          placeholder={placeholder}
        />
        { this.props.children }
      </Container>
    );
  }
}
const Container = styled.div`
  width: 100%;
  position: relative
`;
const Search = styled.span`
  position: absolute;
  display: ${props => (props.icon == 'true') ? 'block' : 'none'};
  top: 0px;
  left: -10px;
`;
const Input = styled.input`
  border-bottom: 1px solid rgba(215, 215, 215, 1);
  border-top: none;
  border-left: none;
  line-height: 25px;
  color: black;
  border-right: none;
  width: 100%;
  height: 25px;
  margin-top: 10px;
  font-size: 12px;
  padding-left: 10px;
  background-color: transparent;
  &:focus {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    outline: none
  }
`;
QuickAdd.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string
};
/*
@作者：姜中希
@日期：2018-07-03
@描述：自定义一个输入框组件，样式定制，输入时会自动过滤出来匹配的结果，
引用参考src\container\layout\body\center\content\treatManage\treatment\treatmentList\smartCure\addSmartCure\quickAddHerb.js
*/
