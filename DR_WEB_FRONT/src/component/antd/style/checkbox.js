import { css } from 'styled-components';

/* 小复选框 */
const small = css`
  margin-left: 0px !important;
  span {
    font-size: 12px !important;
  }
  .ant-checkbox > .ant-checkbox-inner:after {
    left: 3px !important;
    top: 0px !important;
  }
  .ant-checkbox > .ant-checkbox-inner {
    width: 13px !important;
    height: 13px !important;
  }
`;
export default {small}
