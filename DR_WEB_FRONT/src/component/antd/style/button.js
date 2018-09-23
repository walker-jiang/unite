import { css } from 'styled-components';

/** [两边是半圆形的按钮] */
const semicircle = css`
  &&& {
    color: #FFFFFF;
    border-radius: 9999px; /*无穷大时取高度一半*/
    background-color: rgba(10, 110, 203, 1);
    margin: 10px;
    padding: 2px 35px;
    border: none;
    outline: none;
  }
  &&&:hover {
    background-color: #0085f2;
  }
  &&&:focus {
    background-color: #005daa;
  }
`;
/** [两边是半圆白色背景淡蓝色字体的取消按钮] */
const white = css`
  &&& {
    border-radius: 9999px;
    padding: 2px 35px;
    background-color: white;
    border: none;
    color: #0A6ECB;
    margin: 10px;
  }
  &&&:hover {
    background-color: #fbf7fa !important;
    border-color: #1890ff;
    outline: none;
  }
`;
/** [两边是半圆灰色背景白色字体的取消按钮] */
const gray = css`
  &&& {
    border-radius: 9999px;
    padding: 2px 35px;
    background-color: rgba(242, 242, 242, 1);
    border: none;
    color: #0A6ECB;
    margin: 0px 10px;
  }
`;
export default {semicircle, white, gray}
