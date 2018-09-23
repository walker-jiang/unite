import React, {Component} from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

export default class Index extends Component {
  constructor(props){
    super(props);
  };
  /**
   * [modifyCheckState 复选框改变事件]
   * @param  {[type]} checked [选中、取消]
   * @param  {[type]} orderid [医嘱ID]
   * @return {[type]}         [void]
   */
  modifyCheckState(checked, orderid){
    let dataSource = this.props.dataSource;
    dataSource.forEach((item) => {
      if(item.orderid == orderid){
        item.checkState = checked;
      }
    });
    this.forceUpdate();
  };
  /** [getColumn 设置表格项目] */
  getColumn(){
    let columns = [{
        title: "",
        dataIndex: 'check',
        key: 'check',
        render: (text, record, index) => {
          return <SpecCheckbox checked={record.checkState} onClick={(e) => this.modifyCheckState(e.target.checked, record.orderid)}></SpecCheckbox>
        }
      },{
        title: "序号",
        dataIndex: 'order',
        align: 'center',
        key: 'order',
        render: (text, record, index) => {
          return (index + 1)
        }
      },
      {
        title: "医嘱类型",
        dataIndex: 'ordertypeDic',
        key: 'ordertypeDic',
      },
      {
        title: "医嘱内容",
        dataIndex: 'ordercontent',
        key: 'ordercontent',
        className: 'order-content'
      },
      {
        title: "价格（元）",
        dataIndex: 'feeall',
        key: 'feeall',
      },
      {
        title: "医生",
        dataIndex: 'orgUsername',
        key: 'orgUsername',
      },
      {
        title: "开立日期",
        dataIndex: 'utstamp',
        key: 'utstamp',
      },
      {
        title: "状态",
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => record.orderstate == 1 ? <DonePay>• 待缴费</DonePay> : <ToPay>• 已缴费</ToPay>
      },
      {
        title: "打印状态",
        dataIndex: 'printstateDic',
        key: 'printstateDic',
      },
      {
        title: "操作",
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
          <div key={index}>
            <OperationCell onClick={() => { this.onType(text, index, record) }}>打印</OperationCell> &nbsp;| &nbsp;
            <OperationCell onClick={() => { this.props.operate('view', record) }}>查看</OperationCell> &nbsp;| &nbsp;
            <OperationCell onClick={() => { this.props.operate('modify', record) }}>修改</OperationCell> &nbsp;| &nbsp;
            <OperationCell onClick={() => { this.props.operate('delete', record) }}>删除</OperationCell>
          </div>
        )
      }
    ];
    return columns;
  };
  render() {
    let { dataSource , operate } = this.props;
    console.log('dataSource', dataSource);
    let columns = this.getColumn();
    return (
      <SpecTable
        locale={{emptyText: '暂无医嘱数据' }}
        pagination={false}
        dataSource={dataSource}
        columns={columns}>
      </SpecTable>
    );
  }
}
const SpecTable = styled(Table)`
  clear: both;
  /*  表格头部样式  */
  .ant-table-thead tr th {
    background: #f2f2f2;
    border-top: 1px solid #dddddd;
  }
  .ant-table-tbody tr td {
    padding: 7px 0px !important;
    border-bottom: 1px dashed #F2F2F2;
  }
  .order-content {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
  }
`;
const SpecCheckbox = styled.input.attrs({
  type: 'checkbox'
})`
  margin: 0px 3px;
`;
const ToPay = styled.span`
  color: #009900
`;
const DonePay = styled.span`
  color: #0A6ECB
`;
const OperationCell = styled.i`
  color: #0a6ecb;
  cursor: pointer;
`;
/*
@作者：姜中希
@日期：2018-08-28
@描述：医嘱列表列表容器
*/
