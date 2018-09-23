import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import load from './load.gif';
import ing from './ing.gif';

export default class Index extends Component {
  render() {
    let {loading = false, size='20px', info = '加载中......'} = this.props;
    return (
      <div>
      {
        loading ?
          <Panel>
            <LoadImg size={size}></LoadImg>
            {info}
            {this.props.children}
          </Panel>
        : null
      }
      </div>
    );
  }
}
const Container = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: rgba(0,0,0,0.2);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props=>props.size};
`;
const Panel = styled.div`
  color: black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const LoadImg = styled.img.attrs({
  src: load
})`
  width: ${props=>props.size};
  height: ${props=>props.size};
  margin: 10px;
`;
const IngImg = styled.img.attrs({
  src: ing
})`
  width: ${props=>props.size};
  height: ${props=>props.size};
  margin: 10px;
`;

Index.propTypes = {
  loading: PropTypes.bool, // true 表示正在加载 false 加载完毕或者未加载
  size: PropTypes.string // 加载图标和文本的大小
};
/*
@作者：姜中希
@日期：2018-07-13
@描述：加载中，请求未达到前加载的组件
*/
