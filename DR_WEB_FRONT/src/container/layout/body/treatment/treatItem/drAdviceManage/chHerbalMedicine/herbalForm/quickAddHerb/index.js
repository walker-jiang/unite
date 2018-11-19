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
import PagenationSty from 'components/antd/style/pagination';

class QuickAddHerb extends Component {
  /** [getColumns 获取表格数据 ] */
  getColumns(){
    const columns = [{
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => index+1
    }, {
      title: '草药名',
      dataIndex: 'medicinename',
      key: 'medicinename',
    }, {
      title: '别名',
      dataIndex: 'otherPinyin',
      key: 'otherPinyin',
    }, {
      title: '医保等级',
      dataIndex: 'medinslevelDic',
      key: 'medinslevelDic',
    }, {
      title: '规格',
      dataIndex: 'specification',
      key: 'specification',
    }, {
      title: '单位剂量',
      dataIndex: 'mediUnit',
      key: 'mediUnit',
    }, {
      title: '单位',
      dataIndex: 'baseUnit',
      key: 'baseUnit',
    }, {
      title: '单价',
      dataIndex: 'unitprice',
      key: 'unitprice',
    }, {
      title: '药房',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    }];
    return columns;
  };
  /** [stopPop 阻止事件冒泡] */
  stopPop = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    return false;
  };
  render() {
    let { showResult = false, itemsData = [], loadStatus = 0, total, currentPage } = this.props;
    let columns = this.getColumns();
    let that = this;
    let pagination = {
      simple: true,
      total: total, // 总的记录数
      defaultCurrent: currentPage, // 当前页
      current: currentPage, // 当前页
      pageSize: 10, // 每页记录数
      itemRender: (current, type, originalElement)=>{
        if (type === 'prev') {
          return <a>上页</a>;
        } if (type === 'next') {
          return <a>下页</a>;
        }if(type == 'page'){
          return <a className='test'>{current}</a>
        }
        return originalElement;
      },
      onChange:(nextPage, pageSize) => {
        that.props.getData(nextPage);
      },
    };
    return (
      <SearchInput {...this.props} displayed={this.props.showResultFunc} onKeyDown={this.props.handleEnterPress}>
        {
          showResult?
          (
            <Result  onClick={this.stopPop}>
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
                locale={{emptyText: loadStatus ? <DataLoading type='data_loading' /> : '暂无草药数据' }}
                columns={columns}
                dataSource={itemsData}
                pagination={pagination}
              ></SpecTable>
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
  ${PagenationSty.easyPagination};
  .ant-table-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const DataLoading = styled(Icon)`
  ${IconSty.rotate}
`;
let params = {
  url: 'BaHerbalMedicineController/getPageByMap',
  async: false,
  data: {},
  processData: (data) => { // 后台返回数据处理函数
    let herbData = [];
    if(data){
      herbData = data.records.map((item, index)=>{
        item.key = index; // 加唯一key值
        item.status = (index == 0) ? 1 : 0; // 0表示全部未选中,1表示选择了该行,初始化时默认选中第一行
        return item
      });
    }
    return herbData;
  }
};
export default HocAddTable(QuickAddHerb, params);
/*
@作者：马晓敏
@日期：2018-07-10
@描述：快速添加草药处方
*/
