import React, {Component} from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import Semicircle from 'components/dr/input/searchInput/semicircle';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import tableSty from 'components/antd/style/table';

export default class AddIllBySymptom extends Component {
  constructor(props){
    super(props);
    this.state = {
      showResult: false, // 是否展示疾病搜索结果
      illData: [], // 疾病数据数组
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
    };
    this.showResult = this.showResult.bind(this);
    this.hideResult = this.hideResult.bind(this);
    this.clearInputValue = this.clearInputValue.bind(this);
  }
  /** [getTableCol 获取表格项] */
  getTableCol(){
    const columns = [{
      title: '诊断码',
      dataIndex: 'discode',
      key: 'discode'
    }, {
      title: '名称',
      dataIndex: 'disname',
      key: 'disname',
    }];
    return columns;
  };
  /** [getIllData 获取疾病数据] */
  getIllData(keyword){
    let self = this;
    let params = {
      url: 'BaDiseaseController/getList',
      data: {
        keyword: keyword,
      },
    };
    function callBack(res){
      if(res.result){
        let illData = [];
        res.data.map((item, index)=>{
          if(JSON.stringify(item) != 'null'){
            item.key = index; // 加唯一key值
            item.status = (index == 0) ? 1 : 0; // 0表示全部未选中， 1表示选择了该行，初始化时默认选中第一行
            illData.push(item);
          }
        });
        let totalLines = illData.length;
        self.setState({illData, totalLines, showResult: true, curLine: 0});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [showResult 展示查询结果] */
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
    let selectedIllData = illData.filter(item => item.status == 2);
    return selectedIllData[0];
  };
  /**
   * [SelectedLine 通过键盘那或者鼠标选择当前行，并通知病侯更新联动查询结果]
   * @param {[type]} record [该行数据]
   * @param {[type]} state  [0代表取消选择， 1代表选择]
   */
  SelectedLine(record){
    let illData = this.state.illData;
    illData.map((item)=>{ // 将除当前点击行外的所有行均设置为未选中
      if(item.status != 2){
        if(item.key == record.key){
          if(item.status == 1){
            item.status = 0;
            // this.props.notify('');
          }else{
            item.status = 1;
            // this.props.notify(record.diseaseid);
          }
        }else{
          item.status = 0;
        }
      }
      return item;
    });
    this.setState({ illData });
  };
  /** [checkedLine 选中表格行或者enter键触发的函数] */
  checkedLine(record, status){
    let illData = this.state.illData;
    illData.map((item)=>{ // 改变当前行的选中状态
      if(item.key == record.key){ // 只将当前行设为选中状态其余的均为未选中
          item.status = status;
          if(status == 2){ // 如果想要操作的选中行
            this.props.notify(record.diseaseid);
            this.semicircleInput.changeInputValue(record.disname);
          }else{ // 想要操作的是取消，目前不存在这种情况
            this.props.notify();
            this.semicircleInput.changeInputValue('');
          }
      }else{
        item.status = 0;
      }
      return item;
    });
    if(!illData.length){// 没有查到对应的疾病信息
      this.props.notify();
      this.semicircleInput.changeInputValue('');
    }
    this.hideResult();
    this.setState({ illData });
  };
  /** [handleEnterPress 包括向上箭头选择上一行，下箭头选择下一行，enter后切换到病侯] */
  handleEnterPress = (e) => {
    let illData = this.state.illData;
    let curLine = this.state.curLine;
    let totalLines = this.state.totalLines;
    let showResult = this.state.showResult;
    switch(e.keyCode){
      case 40:         // 向下箭头, 选择下一行
        if(showResult){ // 防止出现弹框还未出现用户已经按键导致展示的不是期望行
          if(totalLines == 1){
            break;
          }
          if(curLine >= totalLines-1){
            curLine = 0;
          }else{
            curLine++;
          }
          this.SelectedLine(illData[curLine]);
        }
        break;
      case 38:         // 向上箭头，选择上一行
        if(showResult){ // 防止出现弹框还未出现用户已经按键导致展示的不是期望行
          if(totalLines == 1){
            break;
          }
          if(curLine <= 0){
            curLine = totalLines-1;
          }else{
            curLine--;
          }
          this.SelectedLine(illData[curLine]);
        }
        break;
      case 13:         // enter，切换到病侯
        if(showResult){ // 弹框显示的时候enter键的执行步骤是收起弹框给输入框赋值通知父组件更新疾病ID
          this.checkedLine(illData[curLine], 2); //
        }else{ // 其余的enter事件包括 输入框为空并且当前已经添加了诊断数据,提交诊断的情况， 和输入框有值需要将焦点切换给病候的情况
          this.props.enterEvent(this.semicircleInput.state.value, 'symptom');
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
    let { showResult, illData } = this.state;
    let columns = this.getTableCol();
    return (
      <Semicircle onKeyDown={this.handleEnterPress} {...this.props} displayed={this.showResult} hideEmpty={this.hideResult} ref={ ref => { this.semicircleInput  = ref}}>
        {
          showResult?
          <Result>
            <SpecTable
              onRow={(record) => {
                return {
                  onClick: (e) => {
                    this.checkedLine(record, record.status == 0 || record.status == 1 ? 2 : 0 );
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  },       // 点击行
                };
              }}
              rowClassName={(record, index)=>{
                return record.status ? (record.status == 1 ? 'Selected' : 'checked') : 'unSelected';
              }}
              locale={{emptyText: '没有查到对应数据' }}
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
  padding: 2px 5px;
`;
const SpecTable = styled(Table)`
  ${tableSty.selectedTable}
`;
/*
@作者：姜中希
@日期：2018-07-11
@描述：添加疾病输入框组件
*/
