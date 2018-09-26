import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable'; // 加载时进行模块分离
import Loading from './icons/loading.svg';

const loadingComponent = () => (<span></span>);

export default class Index extends Component {
  render() {
    let Icon = Loadable({
      loader: () => import('./icons/' + this.props.type + '.svg'),
      loading: loadingComponent,
    });
    let { fill = 'black', width = '13px', height = '13px',  ...others} = this.props;
    return (
      <Container >
        <Icon {...others} fill={fill} width={width} height={height}/>
      </Container>
    );
  }
}
const Container = styled.span`
  float: left;
  margin-left: 25rem;
  margin-top: -2.6rem;
  svg{
    cursor: pointer;
  }
`;
Index.propTypes = {
  type: PropTypes.string.isRequired, //文件名称
  fill: PropTypes.string, // 图标颜色 记得去掉原始图标中的fill属性
  width: PropTypes.string, // 图标宽度
  height: PropTypes.string, // 图标高度
};
/*
@作者：王崇琨
@日期：2018-09-22
@描述：图标组件, fil
*/
