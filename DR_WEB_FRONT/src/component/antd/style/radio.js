import { css } from 'styled-components';

/* 只有底部边框的单选按钮组 */
const borderRadioGroup = css`
  &&& {
    border-bottom: 1px solid #D7D7D7;
    width: 100%;
    line-height: 28px;
  }
  .ant-radio-wrapper {
    margin-left: 10px;
    margin-right: 20px;
  }
  .ant-radio-inner:after {
    background-color: #7d868e;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #7d868e;
  }
`;

export default {borderRadioGroup}
