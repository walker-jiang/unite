import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import Semicircle from 'components/dr/input/searchInput/semicircle';
import tableSty from 'components/antd/style/table';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class AddIllByManifestations extends Component {
  constructor(props){
    super(props);
    this.state = {
      showResult: false, // 是否展示疾病搜索结果
      illData: [], // 疾病数据数组
      // keyword: '', //为了能够保持和病症组件联动需要记住keyword
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从-1开始，, 初始化未选中任何行，-1表示未选中任何行
    };
    this.showResult = this.showResult.bind(this);
    this.hideResult = this.hideResult.bind(this);
    this.clearInputValue = this.clearInputValue.bind(this);
  }
  // /** [componentWillReceiveProps 病症更新后更新病侯的查询结果] */
  // componentWillReceiveProps(nextProps){
  //   this.getIllData(this.state.keyword, nextProps.symptomId);
  // };
  /** [getTableCol 获取表格项] */
  getTableCol(){
    const columns = [{
      title: '诊断码',
      dataIndex: 'syncode',
      key: 'syncode'
    }, {
      title: '名称',
      dataIndex: 'synname',
      key: 'synname',
    }];
    return columns;
  };
  /** [getIllData 获取疾病数据] */
  getIllData(keyword){
    let self = this;
    let params = {
      url: 'BaSyndromeController/getList',
      data: {
        keyword: keyword,
        diseaseid: this.props.symptomId,
      },
    };
    function callBack(res){
      if(res.result){
        let illData = res.data.map((item, index)=>{
          item.key = index; // 加唯一key值
          item.status = index ? 0 : 1; // 0表示全部未选择
          item.checkedStatus = 0; // 0表示全部未选中 2 表示选中
          return item
        });
        let totalLines = illData.length;
        if(totalLines == 1){
          illData[0].checkedStatus = 2;
        }
        self.setState({illData, totalLines, curLine: 0, showResult: true});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [showResult 显示查询结果] */
  showResult(value){
    this.getIllData(value);
  };
  /** [hideResult 隐藏查询结果] */
  hideResult(){
    this.setState({showResult: false});
  };
  /** [getSelectedData 获取到选中行的数据] */
  getSelectedData(){
    let { illData, showResult } = this.state;
    let selectedIllData = illData.filter(item => item.checkedStatus == 2);
    return selectedIllData;
  };
  /** [SelectedLine 选择表格行触发的函数] */
  SelectedLine(record){
    let illData = this.state.illData;
    illData.map((item)=>{ // 改变当前行的选中状态
      if(item.key == record.key){
        if(item.status == 0){
          item.status = 1;
        }
        else{
          item.status = 0;
        }
      }else{
        item.status = 0;
      }
      return item;
    });
    this.setState({ illData });
  };
  /** [checkedLine 选中表格行触发的函数] */
  checkedLine(record, status){
    let illData = this.state.illData;
    illData.map((item)=>{ // 改变当前行的选中状态
      if(item.key == record.key){
          item.checkedStatus = status;
          if(status == 0){
            item.status = 1;
          }
      }
      return item;
    });
    this.setState({ illData });
  };
  handleEnterPress = (e) => {
    let illData = this.state.illData;
    let curLine = this.state.curLine;
    let totalLines = this.state.totalLines;
    let showResult = this.state.showResult;
    switch(e.keyCode){
      case 40:         // 向下箭头, 选择下一行
        if(showResult){ // 防止出现弹框还未出现用户已经按键导致展示的不是期望行
          if(curLine >= totalLines-1){
            curLine = 0;
          }else{
            curLine++;
          }
          this.SelectedLine(illData[curLine]);
          break;
        }
      case 38:         // 向上箭头，选择上一行
        if(showResult){ // 防止出现弹框还未出现用户已经按键导致展示的不是期望行
          if(curLine <= 0){
            curLine = totalLines-1;
          }else{
            curLine--;
          }
          this.SelectedLine(illData[curLine]);
        }
        break;
      case 37:         // 向左箭头， 选中该行
        if(showResult){ // 防止出现弹框还未出现用户已经按键导致展示的不是期望行
          this.checkedLine(illData[curLine], 2);
        }
        break;
      case 39:         // 向右箭头，取消选中该行
        if(showResult){ // 防止出现弹框还未出现用户已经按键导致展示的不是期望行
          this.checkedLine(illData[curLine], 0); // 先取消选中
        }
        break;
      case 13:         // enter，
        if(showResult){ // 弹框显示的时候enter键的执行步骤是收起弹框给输入框赋值通知父组件更新疾病ID
          let selectedManifnames = [];
          illData.forEach(item => {
            if(item.checkedStatus == 2){
              selectedManifnames.push(item.synname);
            }
          });
          this.semicircleInput.changeInputValue(selectedManifnames.join('、'));
          this.hideResult();
        }else{ // 其余的enter事件包括 需要将焦点切换给病候的情况
          this.props.enterEvent(this.semicircleInput.state.value, 'manifestations');
        }
        break;
    };
    this.setState({ curLine });
  };
  clearInputValue(){
    this.semicircleInput.changeInputValue('');
    this.setState({ illData: [] });
  };
  render() {
    let { formItemProps, placeholder, icon } = this.props;
    let { showResult, illData } = this.state;
    let columns = this.getTableCol();
    return (
      <Semicircle {...this.props} ref={ ref => { this.semicircleInput  = ref}} onKeyDown={this.handleEnterPress} hideEmpty={this.hideResult} displayed={this.showResult}>
        {
          showResult?
          <Result>
            <SpecTable
              onKeyDown={(e)=>this.props.onKeyDown(e)}
              onRow={(record) => {
                return {
                  onClick: (e) => {
                    this.checkedLine(record, record.checkedStatus == 0 ? 2 : 0 );
                    document.getElementById('manifestations').focus(); // 焦点切换到病候输入框
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  },       // 点击行
                };
              }}
              rowClassName={(record, index)=>{
                return record.status ? (record.checkedStatus ? 'Selected checked' : 'Selected') : ( record.checkedStatus ? 'checked' : 'unSelected');
              }}
              showHeader={false}
              columns={columns}
              pagination={false}
              dataSource={illData} />
          </Result>
          :null
        }
      </Semicircle>
    );
  }
}
const Result = styled.div`
  position: absolute;
  width: 100%;
  min-height: 20px;
  z-index: 3;
  font-size: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  color: rgba(0,0,0,0.65);
  background: white;
`;
const SpecTable = styled(Table)`
  ${tableSty.selectedTable}
`;
/*
@作者：姜中希
@日期：2018-07-11
@描述：添加病侯输入框界面
*/
