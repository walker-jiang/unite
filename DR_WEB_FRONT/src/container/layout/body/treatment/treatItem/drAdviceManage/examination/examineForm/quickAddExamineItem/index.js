import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'antd';
import SearchInput from 'components/dr/input/searchInput';
import Icon from 'components/dr/icon';
import getResource from 'commonFunc/ajaxGetResource';
import tableSty from 'components/antd/style/table';
import IconSty from 'components/dr/icon/iconStyle';
import HocAddTable from '../../../hocAddTable';

class QuickAddExamineItem extends Component {
  componentWillReceiveProps(nextProps){
    this.setState({
      showResult: nextProps.showResult,
      examineItemsData: nextProps.examineItemsData,
      loadStatus: nextProps.loadStatus
    });
  };
  /** [getColumns 获取表格数据 ] */
  getColumns(){
    const columns = [{
      title: '检查项目',
      dataIndex: 'medicalname',
      key: 'medicalname',
      width: '18%',
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
    }, {
      title: '是否组套',
      dataIndex: 'islock',
      key: 'islock',
      render: (text, record, index) => record.baMedicalDtlList ? '是' : '否'
    }];
    return columns;
  };
  render() {
    // let { showResult, examineItemsData, loadStatus } = this.state;
    let { showResult = false, itemsData = [], loadStatus = 0 } = this.props;
    let columns = this.getColumns();
    return (
      <SearchInput {...this.props} onFocus={this.showResult} displayed={this.props.showResultFunc} onKeyDown={this.props.handleEnterPress}>
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
                locale={{emptyText: loadStatus ? <DataLoading type='data_loading' /> : '暂无检验项目数据' }}
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
  padding: 0 15px;
  border-left: 1px solid #bebebe;
  border-right: 1px solid #bebebe;
  border-bottom: 1px solid #bebebe;
`;
const SpecTable = styled(Table)`
  ${tableSty.selectedTable};
`;
const DataLoading = styled(Icon)`
  ${IconSty.rotate}
`;
/*
@作者：姜中希
@日期：2018-08-22
@描述：快速添加检验项目
*/
let params = {
  url: 'BaOrderSuitController/getList',
  async: false,
  data: {
    ordertype: 1,
    // mitype: 
  }
};
export default HocAddTable(QuickAddExamineItem, params)
