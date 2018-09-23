import { css } from 'styled-components';

/* 覆盖antd分页器样式 1/1 下页 | 上页*/
const easyPagination = css`
  .ant-pagination {
    margin-right: 70px !important;
    color: #0A6ECB !important;
    font-size: 12px !important;
  }
  .ant-pagination > .ant-pagination-prev {
    margin-right: -160px;
    border-radius: 0px;
    padding-left: 10px;
    color: #0A6ECB !important;
  }
  .ant-pagination > .ant-pagination-prev::before{
    content: '|';
    color: #0A6ECB;
    padding-right: 12px;
    margin-bottom: 5px;
  }
  .ant-pagination > .ant-pagination-prev a{
    color: #0A6ECB !important;
  }
  .ant-pagination > .ant-pagination-next a{
    color: #0A6ECB !important;
  }
  .ant-pagination > .ant-pagination-simple-pager {
    width: 80px;
    margin-right: -2px !important;
  }
  .ant-pagination > .ant-pagination-simple-pager > input{
    border: none !important;
    background-color: transparent !important;
    padding: 0px !important;
    margin-right: 0px !important;
    width: fit-content !important;
    text-align: right !important;
  }
  .ant-pagination > .ant-pagination-simple-pager > .ant-pagination-slash{
    margin: 0px !important;
  }
  .ant-pagination.ant-table-pagination{
    margin: 5px 0px ;
  }
`;

export default {easyPagination};
