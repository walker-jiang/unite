import React, { Component } from 'react'; // react核心
import PropTypes from 'prop-types';
import styled from 'styled-components';
import decrator from './active.png';
import { NavLink, Link } from 'react-router-dom';

export default class NavItems extends Component {
  render() {
    let { to = '/' , children } = this.props;
    return (
      <StyledLink
        activeStyle={ActiveLink}
        to={to}>
        {children}
      </StyledLink>
    )
  }
}
const ActiveLink = {
  background: 'rgba(56, 182, 228, 1) url(' + decrator + ') no-repeat center 90%',
  color: '#FFFFFF',
}
const StyledLink = styled(NavLink)`
  height: 100%;
  color: #0A6ECB;
  padding: 10px 12px;
  font-size: 14px;
  margin: auto 5px;
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  };
  &:hover {
    background-color: rgba(153, 153, 153, 0.498039215686275);
    color: #0A6ECB;
  }
`;
/** @type {Object} [props类型和内容检查] */
NavItems.propTypes = {
  to: PropTypes.string
}
/*
@作者：姜中希
@日期：2018-06-06
@描述：导航子组件，激活打导航项添加了小箭头
*/
