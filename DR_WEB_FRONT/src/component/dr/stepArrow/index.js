import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class Index extends Component {
  render() {
    let { background = '#f2f2f2', borderColor = '#FFFFFF', color = '#1E1E1E', text = '请设置标题', width = 'fit-content', height = '37px', nextBG = '#f2f2f2' } = this.props;
    return (
      <Container background={background} borderColor={borderColor} color={color} width={width} height={height} className={this.props.className}>
        <ReverseArrow background={background} borderColor={borderColor} height={height}></ReverseArrow>
        <ReverseArrowBorder background={background} borderColor={borderColor} height={height} nextBG={nextBG}></ReverseArrowBorder>
        <Rect background={background}>{text}</Rect>
      </Container>
    );
  }
}
const Container = styled.div`
  float: left;
  position: relative;
  background-color: ${(props)=> props.borderColor};
  color: ${(props)=> props.color};
	height: ${(props)=> props.height};
  width: ${(props)=> props.width };
  padding-right: 12px;
`;
const Rect = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props=>props.background};
`;
const ReverseArrow = styled.div`
  position: absolute;
  right: 2px;
  height: 0px;
  width: 0px;
  border-width: ${(props)=>(parseInt(props.height)/2+'px')} 0px ${(props)=>(parseInt(props.height)/2 + 1+'px')} 12px;
	border-style: solid;
  z-index: 2;
	border-color: ${(props)=> props.borderColor} ${(props)=> props.borderColor} ${(props)=> props.borderColor} ${props=>props.background};
`;
const ReverseArrowBorder = ReverseArrow.extend`
  right: 0px;
  z-index: 3;
  border-width: ${(props)=>(parseInt(props.height)/2 - 1 + 'px')} 0px ${(props)=>(parseInt(props.height)/2 + 1 +'px')} 12px;
  border-color: ${props=>props.nextBG} ${props=>props.nextBG} ${props=>props.nextBG} transparent;
`;
Index.proptypes = {
  background:  PropTypes.string, // 提供箭头的背景颜色
  borderColor: PropTypes.string, // 提供箭头边框的颜色
  color: PropTypes.string, // 提供箭头的文本颜色
  text: PropTypes.string, // 提供箭头的文本
  width: PropTypes.string, // 提供箭头的宽度
}
/*
@作者：姜中希
@日期：2018-08-5
@描述：自定义一个步骤条组件
*/
