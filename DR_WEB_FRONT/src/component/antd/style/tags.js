import { css } from 'styled-components';
/* [两侧是半圆的标签] */
const semicircle = css`
  &&& {
    border-radius: 10px;
    padding: 0px 15px;
    color: ${props => props.text.indexOf('白') >= 0 ? 'black' : 'white'};
  }
`;
const yelloGreen = css`
  &&& {
    border-radius: 10px;
    padding: 0px 13px;
    background-color: #FFFF99;
    position: relative;
  }
  &&& > .anticon-cross{
    position: absolute;
    background-color: #FFCC00;
    color: #FFFFFF;
    padding: 4px;
    font-size: 14px;
    border-radius: 50%;
    top: -8px;
    right: -8px;
  }
`;
export default {semicircle, yelloGreen};
