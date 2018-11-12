import React, {Component} from 'react';
import styled from 'styled-components';
import { Tag, Input } from 'antd';
import Loading from 'components/dr/loading';
import getResource from 'commonFunc/ajaxGetResource';
import Icon from 'components/dr/icon';
import TipModal from 'components/dr/modal/tip';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

let getDisplayName = component => {   return component.displayName || component.name || 'Component' }

const HocAddTable = (WrappedComponent, params) => {
  return class QuickAddItem extends Component {
    constructor(props){
      super(props);
      this.state = {
        showResult: false, // 是否显示浮窗
        itemsData: [], // 项目数据数组
        totalLines: 0, // 查询结果总行数
        curLine: 0, // 当前行,从0开始，-1表示未选中任何行
        loadStatus: 0, // 数据加载状态 0 未请求或者请求完毕 1 请求中
      };
      this.showResult = this.showResult.bind(this);
      this.hideResult = this.hideResult.bind(this);
      this.checkedLine = this.checkedLine.bind(this);
      this.getValue = this.getValue.bind(this);
    };
    /* getData 获取项目数据 */
    getData(value){
      params.data.keyword = value;
      let that = this;
      function success(res) {
        if(res.result){
          let itemsData = res.data.baMedicalDtlList.map((item, index)=>{
            item.key = index; // 加唯一key值
            item.status = (index == 0) ? 1 : 0; // 0表示全部未选中,1表示选择了该行,初始化时默认选中第一行
            return item
          });
          res.data.baOrderSuitList.forEach((item, index)=>{
            item.key = itemsData.length; // 加唯一key值
            itemsData.push(item);
          });
          let totalLines = itemsData.length;
          that.setState({itemsData, totalLines, loadStatus: 0});
        }else{
          console.log('异常响应信息', res);
        }
      };
      this.setState({ loadStatus: 1, itemsData:[], showResult: true, totalLines: 0, curLine: 0 }, ()=>{ // 先把项目置空
        getResource(params, success);
      });
    };
    /* [showResult 查询、展示结果] */
    showResult(value = ''){
      if(value.trim() != ''){
        this.getData(value);
      }else{ // 空输入项关闭下拉框
        this.hideResult();
      }
    };
    /* [hideResult 收起查询结果] */
    hideResult(){
      this.setState({
        showResult: false,
        itemsData: [],
        totalLines: 0,
        curLine: 0,
        loadStatus: 0
      });
    };
    /* [checkedLine 选中表格行触发的函数] */
    checkedLine(record, status){
      let itemsData = this.state.itemsData;
      itemsData.map((item)=>{ // 改变当前行的选中状态
        if(item.key == record.key){
            item.status = status;
        }else{
          item.status = 0;
        }
        return item;
      });
      this.setState({ itemsData });
    };
    // 将除当前点击行外的所有行均设置为未选中
    SelectedLine(record){
      let itemsData = this.state.itemsData;
      itemsData.map((item)=>{
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
      this.setState({ itemsData });
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
      let itemsData = this.state.itemsData;
      let quickAddData = itemsData[curLine];
      this.setState({
        showResult: false,
      }, function () {
        this.props.getQuickData(quickAddData)
      });
    }
    /* [handleEnterPress 包括向上箭头选择上一行，下箭头选择下一行*/
    handleEnterPress = (e) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      let itemsData = this.state.itemsData;
      let curLine = this.state.curLine;
      let totalLines = this.state.totalLines;
      switch(e.keyCode){
        case 40:         // 向下箭头, 选择下一行
          if(curLine >= totalLines-1){
            curLine = 0;
          }else{
            curLine++;
          }
          this.SelectedLine(itemsData[curLine]);
          break;
        case 38:         // 向上箭头，选择上一行
          if(curLine <= 0){
            curLine = totalLines-1;
          }else{
            curLine--;
          }
          this.SelectedLine(itemsData[curLine]);
          break;
        case 13:         // Enter 添加到处方列表
          if(itemsData.length > 0 && this.state.showResult){
            this.checkedLine(itemsData[curLine], 2);
            this.getEnterValue(curLine)
          }else{
            this.tipModal.showModal({stressContent: '请选择项目'});
          }
          break;
      };
      this.setState({ curLine });
      return false;
    };
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`
    render(){
      let { showResult, itemsData, loadStatus } = this.state;
      return (
        <div>
          <WrappedComponent {...this.props} showResultFunc={this.showResult} {...this.state} handleEnterPress={this.handleEnterPress} checkedLine={this.checkedLine} getValue={this.getValue}/>
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        </div>
      )
    };
  }
}
/*
@作者：姜中希
@日期：2018-1-07
@描述：所有下拉表格弹框的高级组件
*/
export default HocAddTable;
