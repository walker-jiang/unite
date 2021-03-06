import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from 'components/dr/input/searchInput';
import { Table } from 'antd';
import getResource from 'commonFunc/ajaxGetResource';
import tableSty from 'components/antd/style/table';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      showResult: false, // 是否显示浮窗
      medicineItemsData: [], // 西医治疗项目数据数组
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
    };
    this.showResult = this.showResult.bind(this);
    this.hideResult = this.hideResult.bind(this);
  };
  /* getMedicineData 获取西医治疗项目数据 */
  getMedicineData(value){
    let params = {
      url: 'BaOrderSuitController/getList',
      data: {
        keyword: value,
        ordertype: 4
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let medicineItemsData = res.data.baMedicalDtlList.map((item, index)=>{
          item.key = index; // 加唯一key值
          item.status = (index == 0) ? 1 : 0; // 0表示全部未选中,1表示选择了该行,初始化时默认选中第一行
          return item
        });
        res.data.baOrderSuitList.forEach((item, index)=>{
          item.key = medicineItemsData.length; // 加唯一key值
          medicineItemsData.push(item);
        });
        let totalLines = medicineItemsData.length;
        console.log('medicineItemsData', medicineItemsData);
        that.setState({medicineItemsData, totalLines});
      }else{
        console.log('异常响应信息', res);
      }
    };
    getResource(params, success);
  };
  /* [showResult 查询、展示结果] */
  showResult(value = ''){
    this.setState({
      showResult: true
    });
    this.getMedicineData(value);
  };
  /* [hideResult 收起查询结果] */
  hideResult(){
    this.setState({
      showResult: false
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
    let medicineItemsData = this.state.medicineItemsData;
    let quickAddData = medicineItemsData[curLine];
    this.setState({
      showResult: false,
    }, function () {
      this.props.getQuickData(quickAddData)
    });
  }
  /* [checkedLine 选中表格行触发的函数] */
  checkedLine(record, status){
    let medicineItemsData = this.state.medicineItemsData;
    medicineItemsData.map((item)=>{ // 改变当前行的选中状态
      if(item.key == record.key){
          item.status = status;
      }else{
        item.status = 0;
      }
      return item;
    });
    this.setState({ medicineItemsData });
  };
  // 将除当前点击行外的所有行均设置为未选中
  SelectedLine(record){
    let medicineItemsData = this.state.medicineItemsData;
    medicineItemsData.map((item)=>{
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
    this.setState({ medicineItemsData });
  };
  /* [handleEnterPress 包括向上箭头选择上一行，下箭头选择下一行*/
  handleEnterPress = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let medicineItemsData = this.state.medicineItemsData;
    let curLine = this.state.curLine;
    let totalLines = this.state.totalLines;
    switch(e.keyCode){
      case 40:         // 向下箭头, 选择下一行
        if(curLine >= totalLines-1){
          curLine = 0;
        }else{
          curLine++;
        }
        this.SelectedLine(medicineItemsData[curLine]);
        break;
      case 38:         // 向上箭头，选择上一行
        if(curLine <= 0){
          curLine = totalLines-1;
        }else{
          curLine--;
        }
        this.SelectedLine(medicineItemsData[curLine]);
        break;
      case 13:         // Enter 添加到处方列表
        this.checkedLine(medicineItemsData[curLine], 2);
        this.getEnterValue(curLine)
        break;
    };
    this.setState({ curLine });
    return false;
  };
  /** [getColumns 获取表格数据 ] */
  getColumns(){
    const columns = [{
      title: '西医治疗项目',
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
    }, {
      title: '是否组套',
      dataIndex: 'islock',
      key: 'islock',
      render: (text, record, index) => record.baMedicalDtlList ? '是' : '否'
    }];
    return columns;
  };
  render() {
    let { showResult, medicineItemsData } = this.state;
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
                locale={{emptyText: '暂无西医治疗项目数据' }}
                columns={columns}
                dataSource={medicineItemsData}
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

/*
@作者：姜中希
@日期：2018-08-22
@描述：快速添加西医治疗项目
*/
