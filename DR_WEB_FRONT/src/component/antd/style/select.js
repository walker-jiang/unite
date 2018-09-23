import { css } from 'styled-components';
import thinDown from '../img/thinDown.png';
import thinUp from '../img/thinUp.png';
import down from '../img/down.png';
import up from '../img/up.png';

/* 圆形，蓝色背景下拉箭头的下拉框 */
const blueSemicircle = css`
  & > .ant-select-selection {
    border-radius: 0px !important;
    width: 100% !important;
    border: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    height: 36px !important;
    padding-top: 7px !important;
    background-color: transparent;
  }
  & > .ant-select-selection:focus {
    border: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    box-shadow: none !important;
  }
  & > .ant-select-selection > .ant-select-arrow {
    background: url(${down}) no-repeat top right;
    width: 25px;
    line-height: normal;
    font-size: 16px;
    color: rgba(0,0,0,0);
  }
  & .ant-select-selection__placeholder{
    font-size: 12px;
    color: rgb(153, 153, 153);
  }
  &.ant-select.ant-select-open > .ant-select-selection > .ant-select-arrow {
    background: url(${up}) no-repeat top right;
    width: 25px;
    line-height: normal;
    font-size: 16px;
    color: rgba(0,0,0,0);
  }
`;
/* 保留底边框,细下拉箭头的下拉框 */
const thinArrow = css`
  & > .ant-select-selection {
    border-radius: 0px !important;
    width: 100% !important;
    border: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    height: 36px !important;
    padding-top: 7px !important;
    background-color: transparent;
  }
  & > .ant-select-selection:focus {
    border: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    box-shadow: none !important;
  }
  &&& > .ant-select-selection > .ant-select-arrow {
    background: url(${thinDown}) no-repeat bottom right;
    width: 25px;
    line-height: normal;
    font-size: 16px;
    color: rgba(0,0,0,0);
  }
  & > .ant-select-selection > .ant-select-arrow::before {
    color: rgba(0,0,0,0)
  }
  &&&.ant-select.ant-select-open > .ant-select-selection > .ant-select-arrow {
    background: url(${thinUp}) no-repeat bottom right;
    width: 25px;
    line-height: normal;
    font-size: 16px;
    color: rgba(0,0,0,0);
  }
`;
/* 黑色三角形符号的下拉箭头的下拉框 */
const blackTriangle = css`
  & > .ant-select-selection{
    border-radius: 0px;
  }
  & > .ant-select-selection--single{
    height: 25px;
  }
  & > .ant-select-selection > .ant-select-selection__rendered{
    line-height: 25px;
  }
  & > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value{
    text-decoration: underline;
    padding-right: 0px;
  }
  & > .ant-select-selection > .ant-select-arrow::before{
    content: '▼';
    color: #8B8B8B;
  }
`;
export default {blueSemicircle, thinArrow, blackTriangle};
