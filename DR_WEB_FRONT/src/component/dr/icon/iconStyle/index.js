import { css } from 'styled-components';

const rotate = css`
  width: 20px;
  height: 20px;
  @keyframes spin {
      from {
          transform: rotate(0deg);
      }
      to {
          transform: rotate(360deg);
      }
  }
  animation: spin 2s linear infinite;
`;
export default {rotate}
