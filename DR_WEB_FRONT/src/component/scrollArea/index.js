import React, {Component} from 'react';
import styled from 'styled-components';

export default class Index extends Component {
  constructor(props){
    super(props);
  };
  render() {
    let {height = 200} = this.props;
    return (
      <Container height={height} className={this.props.className}>
      { this.props.children }
      </Container>
    );
  }
}
const Container = styled.div`
  overflow: scroll;
  height: calc(100vh - ${props=>(props.height+'px')});
  ::-webkit-scrollbar {
    display: none;
  }
`;
/*
@作者：姜中希
@日期：2018-06-26
@描述：滚动区域容器，可以滚动但是滚动条设为不可见，
使用方法是直接在其内部嵌套需要滚动的子组件即可
注：需要指定滚动区域的高度，默认是200
使用可参考：src\component\scrollArea\index.js
*/
