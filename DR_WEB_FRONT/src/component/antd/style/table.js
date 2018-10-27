import { css } from 'styled-components';


/** 可选择行的表格 */
const selectedTable = css`
  /** 可选的表格，行缩进5px */
  .Selected > td, .unSelected > td, .checked > td{
    padding-left: 5px !important;
  }
  /* 选中后对Selected类添加背景色 */
  .Selected.ant-table-row {
    transform: scale(1.05);
    background-color: #eac7d8 !important;
  }
  .ant-table-tbody > .Selected:hover > td{
    transform: scale(1.05);
    background-color: #eac7d8 !important;
  }
  .checked.ant-table-row {
    background-color: #308CFD;
  }
  .ant-table-tbody > .checked:hover > td{
    background-color: #308CFD !important;
  }
  .checked.Selected.ant-table-row{
    background-color: #308CFD !important;
    transform: scale(1.05);
  }
`;

const dottedRowTable = css`
  .dotted:not(:last-child) > td  {
    border-bottom: 1px dashed #CCCCCC !important;
    height: 33px;
  }
  .dotted:last-child > td {
    border: none;
    height: 33px;
  }
  .dotted.clear > td > span, .dotted.clear > td > a , .dotted.clear > td > input,  .dotted.clear > td > div {
    display: none !important;
  }
`;
export default {selectedTable, dottedRowTable};
