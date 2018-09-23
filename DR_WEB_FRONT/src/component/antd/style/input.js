import { css } from 'styled-components';

/* 圆角输入框 */
const semicircle = css`
  &&& {
    border-radius: 9999px;
  }
`;
/* 直角输入框 */
const direct = css`
  &&& {
    border-radius: 0px;
  }
`;
/* 比较矮短的输入框 */
const short = css`
  width: 40px;
  text-align: center;
  padding: 0px;
  border-radius: 0px;
  height: 25px;
`;
export default {semicircle, direct, short}
