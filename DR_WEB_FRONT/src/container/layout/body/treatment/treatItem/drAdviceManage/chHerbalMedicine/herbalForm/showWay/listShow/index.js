import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import deepClone from 'commonFunc/deepClone';
import getResource from 'commonFunc/ajaxGetResource';
import tableSty from 'components/antd/style/table';
import paginationSty from 'components/antd/style/pagination';

export default class Index extends Component {
  // 获取特殊用法下拉数据
  getSpecialUsage() {
    let params = {
      url: 'BaUsageController/getList',
      data: {}
    };
    let that = this;
    function success(res) {
      that.setState({
        selectData: res.data
      })
    };
    getResource(params, success);
  }
  /** [getTableColumns 设置表格列] */
  getTableColumns(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'order',
        key: 'order',
        render: (text, record, index)=> <span>{index+1}</span>
      },{
        title: '草药名称',
        dataIndex: 'itemname',
        key: 'itemname',
        render: (text, record, index)=> <MiTypeText miType={this.props.selectedMitype}>{text}</MiTypeText>
      },{
        title: '剂量/单位',
        dataIndex: 'baseUnit',
        key: 'baseUnit',
        render: (text, record, index)=> <span>{text}</span>
      },{
        title: '特殊用法',
        dataIndex: 'usagename',
        key: 'usagename',
        render: (text, record, index)=> <span>{text}</span>
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record, idnex)=> <a onClick={()=>{this.props.delHerbal(record)}}>删除</a>
      }
    ];
    return columns;
  };
  /**
   * [getTableDataSource 原始数据对象转为表格形式]
   * @param  {[type]} originData [草药数据]
   * @return {[type]}            [void]
   */
  getTableDataSource(herbalData, current, pageSize){
    let dataSource = herbalData.slice((current - 1) * pageSize, current * pageSize);
    if(dataSource.length % 8 != 0){
      for(let i = dataSource.length % 8; i < 8 ; i++){
        let item = deepClone(dataSource[dataSource.length-1]);
        item.key = dataSource.length;
        item.itemcode = '空'; // 空行标识
        dataSource.push(item)
      }
    }
    return dataSource;
  };
  render() {
    let { herbalData, current, pageSize} = this.props;
    let columns = this.getTableColumns();
    let dataSource = this.getTableDataSource(deepClone(herbalData), current, pageSize);
    return (
      <ListWrap
        rowKey={record => record.id}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        locale={{emptyText: '暂无草药数据' }}
        rowClassName={(record, index)=>record.itemcode != '空' ? 'dotted' : 'dotted clear'} >
      </ListWrap>
    )
  }
}
const ListWrap = styled(Table)`
  ${tableSty.dottedRowTable};
  ${paginationSty.easyPagination};
  & {
    position: relative;
    width: 857px;
    min-height: 300px;
    border-bottom: 1px solid rgb(178, 20, 20)
  }
`;
// 医保外红色显示
const MiTypeText = styled.span`
  color: ${props => props.miType == '1' ? 'red' : 'black'};
`;
/*
@作者：姜中希
@日期：2018-08-15
@描述：显示方式——列表
*/
