import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'antd';
import Icon from 'components/dr/icon';
import SearchInput from 'components/dr/input/searchInput';
import IconSty from 'components/dr/icon/iconStyle';
import HocAddTable from '../../../hocAddTable';
import tableSty from 'components/antd/style/table';

class QuickAddMaterialItem extends Component {

  /** [getColumns 获取表格数据 ] */
  getColumns(){
    const columns = [{
      title: '材料',
      dataIndex: 'medicalname',
      key: 'medicalname',
      render: (text, record) => record.medicalname ? record.medicalname : record.orderSuitname
    }, {
      title: '医保等级',
      dataIndex: 'medinslevelDic',
      key: 'medinslevelDic'
    }, {
      title: '医保备注',
      dataIndex: 'medinsrem',
      key: 'medinsrem'
    }, {
      title: '执行科室',
      dataIndex: 'deptname',
      key: 'deptname'
    }, {
      title: '单价(元)',
      dataIndex: 'unitprice',
      key: 'unitprice',
      render: (text, record, index) => {
        if(record.baMedicalDtlList){
          return record.baMedicalDtlList.reduce((prev, curr)=> {
            return {count: 1, unitprice: (prev.count * prev.unitprice + curr.count * curr.unitprice)}
          } ).unitprice;
        }else{
          return record.unitprice;
        }
      }
    }, {
      title: '单位',
      dataIndex: 'baseUnitDic',
      key: 'baseUnitDic'
    }];
    return columns;
  };
  render() {
    let { showResult = false, itemsData = [], loadStatus = 0 } = this.props;
    let columns = this.getColumns();
    return (
      <SearchInput {...this.props} displayed={this.props.showResultFunc} onKeyDown={this.props.handleEnterPress}>
        {
          showResult?
          (
            <Result>
              <SpecTable
                onRow={(record) => {
                  return {
                    onClick: (e) => {
                      this.props.checkedLine(record, record.status?0:2);
                      e.stopPropagation();
                      this.props.getValue(record);
                    },       // 点击行
                  };
                }}
                rowClassName={(record, index)=>{
                  return record.status ? (record.status == 1 ? 'Selected' : 'checked') : 'unSelected';
                }}
                locale={{emptyText: loadStatus ? <DataLoading type='data_loading' /> : '暂无材料项目数据' }}
                columns={columns}
                dataSource={itemsData}
                pagination={false}
              >
              </SpecTable>
            </Result>
          )
          :null
        }
      </SearchInput>
    );
  }
}
const Result = styled.div`
  position: absolute;
  width: 100%;
  min-height: 20px;
  max-height: 350px;
  overflow-y: scroll;
  box-shadow: red;
  color: rgba(0,0,0,0.65);
  z-index: 5;
  background: #fff;
  padding: 0 5px;
  border-left: 1px solid #bebebe;
  border-right: 1px solid #bebebe;
  border-bottom: 1px solid #bebebe;
`;
const SpecTable = styled(Table)`
  ${tableSty.selectedTable}
`;
const DataLoading = styled(Icon)`
  ${IconSty.rotate}
`;
let params = {
  url: 'BaOrderSuitController/getList',
  async: false,
  data: {
    ordertype: 5,
    // mitype:
  },
  processData: (data) => { // 后台返回数据处理函数
    let itemsData = data.baMedicalDtlList.map((item, index)=>{
      item.key = index; // 加唯一key值
      item.status = (index == 0) ? 1 : 0; // 0表示全部未选中,1表示选择了该行,初始化时默认选中第一行
      return item
    });
    data.baOrderSuitList.forEach((item, index)=>{
      item.key = itemsData.length; // 加唯一key值
      itemsData.push(item);
    });
    return itemsData;
  }
};
export default HocAddTable(QuickAddMaterialItem, params)
/*
@作者：姜中希
@日期：2018-08-22
@描述：快速添加材料项目
*/
