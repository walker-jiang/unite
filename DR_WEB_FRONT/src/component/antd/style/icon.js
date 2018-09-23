import { css } from 'styled-components';

/** [淡蓝色的圆形图标] */
const lightBlue = css`
  &.anticon {
    padding: 3px;
    font-size: 16px;
    font-weight: 900;
    color: #FFFFFF;
    background-color: #6BB6E5;
    border-radius: 50%;
    cursor: pointer;
  }
  &.anticon:hover {
    background-color: #95cdf1;
  }
`;
/** [红色背景的圆形图标] */
const red = css`
  &.anticon {
    padding: 3px;
    font-size: 16px;
    font-weight: 900;
    color: #FFFFFF;
    background-color: rgb(220, 82, 82);
    border-radius: 50%;
    cursor: pointer;
  }
  &.anticon:hover {
    background-color: rgb(226, 113, 113);
  }
`;
/** [蓝色字体无背景颜色的圆形图标] */
const blue = css`
  &.anticon  {
    font-size: 16px;
    font-weight: 900;
    color: #0A6ECB;
    cursor: pointer;
    width: 24px;
    height: 24px;
    padding: 4px;
  }
  &.anticon:hover {
    color: #FFFFFF;
    background-color: red;
    border-radius: 9999px;
  }
`;
export default {lightBlue, red, blue}
