import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from 'components/dr/input/searchInput';
import { Table } from 'antd';
import Icon from 'components/dr/icon';
import getResource from 'commonFunc/ajaxGetResource';
import tableSty from 'components/antd/style/table';
import IconSty from 'components/dr/icon/iconStyle';




export default class QuickAddHerb extends Component {
  constructor(props){
    super(props);
    this.state = {
      showResult: false, // 是否显示浮窗
      herbData: [], //草药数据数组
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
      loadStatus: 0, // 数据加载状态 0 未请求或者请求完毕 1 请求中
    };
    this.showResult = this.showResult.bind(this);
    this.hideResult = this.hideResult.bind(this);
  };
  /* getHerbData 获取草药数据 */
  getHerbData(value){
    let params = {
      url: 'BaHerbalMedicineController/getList',
      data: {
        keyword: value
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let herbData = res.data.map((item, index)=>{
          item.key = index; // 加唯一key值
          item.status = (index == 0) ? 1 : 0; // 0表示全部未选中,1表示选择了该行,初始化时默认选中第一行
          return item
        });
        let totalLines = herbData.length;
        that.setState({herbData, totalLines});
      }else{
        console.log('异常响应信息', res);
      }
    };
    this.setState({ loadStatus: 1, herbData:[], showResult: true, totalLines: 0, curLine: 0 }, ()=>{ // 先把项目置空
      getResource(params, success);
    });
  };
  /* [showResult 查询、展示结果] */
  showResult(value = ''){
    if(value.trim() != ''){
      this.getHerbData(value);
    }else{ // 空输入项关闭下拉框
      this.hideResult();
    }
  };
  /* [hideResult 收起查询结果] */
  hideResult(){
    this.setState({
      showResult: false,
      herbData: [],
      totalLines: 0,
      curLine: 0,
      loadStatus: 0
    });
  };
  /* [getValue 获取表格选中行数据] */
  getValue(record){
    let quickAddData = record;
    this.setState({
      showResult: false,
    }, function () {
      this.props.getQuickData(quickAddData)
    });
  };
  /* 按下Enter键,获取选中行数据 */
  getEnterValue (curLine) {
    let herbData = this.state.herbData;
    let quickAddData = herbData[curLine];
    this.setState({
      showResult: false,
    }, function () {
      this.props.getQuickData(quickAddData)
    });
  }
  /* [checkedLine 选中表格行触发的函数] */
  checkedLine(record, status){
    let herbData = this.state.herbData;
    herbData.map((item)=>{ // 改变当前行的选中状态
      if(item.key == record.key){
          item.status = status;
      }else{
        item.status = 0;
      }
      return item;
    });
    this.setState({ herbData });
  };
  // 将除当前点击行外的所有行均设置为未选中
  SelectedLine(record){
    let herbData = this.state.herbData;
    herbData.map((item)=>{
      if(item.status != 2){
        if(item.key == record.key){
          if(item.status == 1){
            item.status = 0;
          }else{
            item.status = 1;
          }
        }else{
          item.status = 0;
        }
      }
      return item;
    });
    this.setState({ herbData });
  };
  /* [handleEnterPress 包括向上箭头选择上一行，下箭头选择下一行*/
  handleEnterPress = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let herbData = this.state.herbData;
    let curLine = this.state.curLine;
    let totalLines = this.state.totalLines;
    switch(e.keyCode){
      case 40:         // 向下箭头, 选择下一行
        if(curLine >= totalLines-1){
          curLine = 0;
        }else{
          curLine++;
        }
        this.SelectedLine(herbData[curLine]);
        break;
      case 38:         // 向上箭头，选择上一行
        if(curLine <= 0){
          curLine = totalLines-1;
        }else{
          curLine--;
        }
        this.SelectedLine(herbData[curLine]);
        break;
      case 13:         // Enter 添加到处方列表
        if(herbData.length > 0 && this.state.showResult){
          this.checkedLine(herbData[curLine], 2);
          this.getEnterValue(curLine)
        }else{
          this.tipModal.showModal({stressContent: '请选择项目'});
        }
        break;
    };
    this.setState({ curLine });
    return false;
  };
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
  render() {
    let { showResult, herbData, loadStatus } = this.state;
    let columns = this.getColumns();
    return (
      <SearchInput {...this.props} onFocus={this.showResult} displayed={this.showResult} onKeyDown={this.handleEnterPress}>
        {
          showResult?
          (
            <Result>
              <SpecTable
                onRow={(record) => {
                  return {
                    onClick: (e) => {
                      this.checkedLine(record, record.status?0:2);
                      e.stopPropagation();
                      this.getValue(record);
                    },       // 点击行
                  };
                }}
                rowClassName={(record, index)=>{
                  return record.status ? (record.status == 1 ? 'Selected' : 'checked') : 'unSelected';
                }}
                locale={{emptyText: loadStatus ? <DataLoading type='data_loading' /> : '暂无草药数据' }}
                columns={columns}
                dataSource={herbData}
                pagination={false}
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
  ${tableSty.selectedTable}
`;
const DataLoading = styled(Icon)`
  ${IconSty.rotate}
`;
/*
@作者：马晓敏
@日期：2018-07-10
@描述：快速添加草药处方
*/
