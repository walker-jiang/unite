import { css } from 'styled-components';

/* react modal 弹框样式， 在当前窗口前弹框 */
const windowModal = css`
  &.Modal {
    background-color: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
    z-index: 20;
    position: fixed;
    top: 0px;
    left: 0px;
    overflow: auto;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
  }
`;

export default {windowModal}
