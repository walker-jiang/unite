import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from 'components/dr/input/searchInput';
import { Table } from 'antd';
import Icon from 'components/dr/icon';
import tableSty from 'components/antd/style/table';
import getResource from 'commonFunc/ajaxGetResource';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      showResult: false, // 是否显示浮窗
      patientData: [], //患者数据数组
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
    };
    this.showResult = this.showResult.bind(this);
    this.hideResult = this.hideResult.bind(this);
  };
  /* getPatientData 获取患者数据 */
  getPatientData(value){
    let params = {
      url: 'BaPatientController/getList',
      data: {
        keyword: value
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let patientData = res.data.map((item, index)=>{
          item.key = index; // 加唯一key值
          item.status = (index == 0) ? 1 : 0; // 0表示全部未选中,1表示选择了该行,初始化时默认选中第一行
          return item
        });
        let totalLines = patientData.length;
        that.setState({patientData, totalLines});
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
    this.getPatientData(value);
  };
  /* [hideResult 收起查询结果] */
  hideResult(){
    this.setState({
      showResult: false
    });
  };
  /* 获取选中行数据 */
  getEnterValue (patientDataItem) {
    console.log('patientDataItem.patientname', patientDataItem.patientname);
    this.setState({
      showResult: false,
    }, function () {
        // this.searchInput.showResult(patientDataItem.patientname);
        this.props.getQuickData(patientDataItem);
        // this.props.onChange(patientDataItem.patientname);
        this.hideResult();
    });
  }
  /* [checkedLine 选中表格行触发的函数] */
  checkedLine(record, status){
    let patientData = this.state.patientData;
    patientData.map((item)=>{ // 改变当前行的选中状态
      if(item.key == record.key){
          item.status = status;
      }else{
        item.status = 0;
      }
      return item;
    });

    this.setState({ patientData });
  };
  // 将除当前点击行外的所有行均设置为未选中
  SelectedLine(record){
    let patientData = this.state.patientData;
    patientData.map((item)=>{
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
    this.setState({ patientData });
  };
  /* [handleEnterPress 包括向上箭头选择上一行，下箭头选择下一行*/
  handleEnterPress = (e) => {
    let patientData = this.state.patientData;
    let curLine = this.state.curLine;
    let totalLines = this.state.totalLines;
    switch(e.keyCode){
      case 40:         // 向下箭头, 选择下一行
        if(curLine >= totalLines-1){
          curLine = 0;
        }else{
          curLine++;
        }
        this.SelectedLine(patientData[curLine]);
        break;
      case 38:         // 向上箭头，选择上一行
        if(curLine <= 0){
          curLine = totalLines-1;
        }else{
          curLine--;
        }
        this.SelectedLine(patientData[curLine]);
        break;
      case 13:         // Enter 添加到处方列表
        this.checkedLine(patientData[curLine], 2);
        this.getEnterValue(patientData[curLine])
        break;
    };
    this.setState({ curLine });
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    return false;
  };
  /** [getColumns 获取表格数据 ] */
  getColumns(){
    const columns = [{
      title: '患者姓名',
      dataIndex: 'patientname',
      key: 'patientname',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '年龄',
      dataIndex: 'birthday',
      key: 'birthday',
    }, {
      title: '患者编号',
      dataIndex: 'patientno',
      key: 'patientno',
    }, {
      title: '就诊卡号',
      dataIndex: 'care_cardno',
      key: 'care_cardno',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '身份证号',
      dataIndex: 'cardno',
      key: 'cardno',
    }, {
      title: '患者类型',
      dataIndex: 'patienttype',
      key: 'patienttype',
    }];
    return columns;
  };
  render() {
    let { showResult, patientData } = this.state;
    let formItemProps = this.props;
    let columns = this.getColumns();
    return (
      <SearchInput ref={ref => {this.searchInput = ref}} formItemProps={formItemProps} onFocus={this.showResult} displayed={this.showResult} onKeyDown={this.handleEnterPress}>
        <Search type='search' />
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
                      this.getEnterValue(record);
                    },       // 点击行
                  };
                }}
                rowClassName={(record, index)=>{
                  return record.status ? (record.status == 1 ? 'Selected' : 'checked') : 'unSelected';
                }}
                locale={{emptyText: '暂无患者数据' }}
                columns={columns}
                dataSource={patientData}
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
  left: -100px;
  width: 600px;
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
const Search = styled(Icon).attrs({
  fill: '#C6C6C6'
})`
  position: absolute;
  right: 0px;
  top: 15px;
  width: 16px;
  height: 16px;
`;
/*
@作者：姜中希
@日期：2018-09-12
@描述：快速添加患者信息
*/
