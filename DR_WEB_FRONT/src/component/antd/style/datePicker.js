import { css } from 'styled-components';
import calendar from '-!file-loader!components/dr/icon/icons/calendar.svg';

/* 只有底部边框自定义右侧小图标的日期选择器样式 */
const bottomBorder = css`
  .ant-input {
    border-radius: 0px;
    border: none;
    border-bottom: 1px solid #d9d9d9;
  }
  .ant-calendar-picker-icon {
    -webkit-mask: url(${calendar}) no-repeat 50% 50%;
    -webkit-mask-size: 14px 14px;
    background-color: #E9984E;
    width: 20px;
    height: 20px;
    margin-top: -10px;
  }
  .ant-calendar-picker-icon:after {
    content: '';
  }
`;

export default {bottomBorder}
