import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from 'components/dr/input/searchInput';
import { Table } from 'antd';
import Icon from 'components/dr/icon';
import getResource from 'commonFunc/ajaxGetResource';
import tableSty from 'components/antd/style/table';
import HocAddTable from '../../../hocAddTable';
import IconSty from 'components/dr/icon/iconStyle';

class QuickAddMedicine extends Component {
  /** [getColumns 获取表格数据 ] */
  getColumns(){
    const columns = [{
      title: '药品名称',
      dataIndex: 'medicinename',
      key: 'medicinename',
    }, {
      title: '药品别名',
      dataIndex: 'otherPinyin',
      key: 'otherPinyin',
    }, {
      title: '医保等级',
      dataIndex: 'medinslevelDic',
      key: 'medinslevelDic',
    }, {
      title: '医保备注',
      dataIndex: 'medinsrem',
      key: 'medinsrem',
    }, {
      title: '规格',
      dataIndex: 'specification',
      key: 'specification',
    }, {
      title: '剂型',
      dataIndex: 'dosename',
      key: 'dosename',
    }, {
      title: '单位',
      dataIndex: 'baseUnitDic',
      key: 'baseUnitDic',
    }, {
      title: '单价',
      dataIndex: 'unitprice',
      key: 'unitprice',
    }, {
      title: '药房',
      dataIndex: 'manuidDic',
      key: 'manuidDic',
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
                locale={{emptyText: loadStatus ? <DataLoading type='data_loading' /> : '暂无中成药/西药数据数据' }}
                columns={columns}
                dataSource={itemsData}
                pagination={false}></SpecTable>
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
  padding: 0 15px;
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
  url: 'BaMedicineController/getList',
  async: false,
  data: {},
  processData: (data) => { // 后台返回数据处理函数
    let herbData = data.map((item, index)=>{
      item.key = index; // 加唯一key值
      item.status = (index == 0) ? 1 : 0; // 0表示全部未选中,1表示选择了该行,初始化时默认选中第一行
      return item
    });
    return herbData;
  }
};
export default HocAddTable(QuickAddMedicine, params);
/*
@作者：姜中希
@日期：2018-08-18
@描述：快速添加中成药处方
*/
