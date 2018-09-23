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
      keyword: '', //为了能够保持和病症组件联动需要记住keyword
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
    };
    this.showResult = this.showResult.bind(this);
    this.hideResult = this.hideResult.bind(this);
  }
  /** [componentWillReceiveProps 病症更新后更新病侯的查询结果] */
  componentWillReceiveProps(nextProps){
    this.getIllData(this.state.keyword, nextProps.symptomId);
  };
  /** [getTableCol 获取表格项] */
  getTableCol(){
    const columns = [{
      title: '诊断码',
      dataIndex: 'manifcode',
      key: 'manifcode'
    }, {
      title: '名称',
      dataIndex: 'manifname',
      key: 'manifname',
    }];
    return columns;
  };
  /** [getIllData 获取疾病数据] */
  getIllData(keyword, symptomId){
    let self = this;
    let params = {
      url: 'BaDiseaseManifController/getList',
      data: {
        keyword: keyword,
        diseaseid: symptomId,
      },
    };
    function callBack(res){
      if(res.result){
        let illData = res.data.map((item, index)=>{
          item.key = index; // 加唯一key值
          item.status = (index == 0) ? 1 : 0; // 0表示全部未选中
          return item
        });
        let totalLines = illData.length;
        self.setState({illData, totalLines});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [showResult 显示查询结果] */
  showResult(value){
    this.getIllData(value, this.props.symptomId);
    this.setState({showResult: true, keyword: value});
  };
  /** [hideResult 隐藏查询结果] */
  hideResult(){
    this.setState({showResult: false});
  };
  /** [getSelectedData 获取到选中行的数据] */
  getSelectedData(){
    let selectedIllData = new Array();
    let { illData, showResult } = this.state;
    if(showResult){ // 只有显示着查询结果浮框才能添加进诊断
      illData.forEach((item, index)=>{ // 只返回选中的行
        if(item.status == 2){
          selectedIllData.push(item);
        }
      });
    }
    return selectedIllData;
  };
  /** [SelectedLine 选择表格行触发的函数] */
  SelectedLine(record){
    let illData = this.state.illData;
    illData.map((item)=>{ // 改变当前行的选中状态
      if(item.status != 2){
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
          item.status = status;
      }
      return item;
    });
    this.setState({ illData });
  };
  handleEnterPress = (e) => {
    let illData = this.state.illData;
    let curLine = this.state.curLine;
    let totalLines = this.state.totalLines;
    switch(e.keyCode){
      case 40:         // 向下箭头, 选择下一行
        if(curLine >= totalLines-1){
          curLine = 0;
        }else{
          curLine++;
        }
        this.SelectedLine(illData[curLine]);
        break;
      case 38:         // 向上箭头，选择上一行
        if(curLine <= 0){
          curLine = totalLines-1;
        }else{
          curLine--;
        }
        this.SelectedLine(illData[curLine]);
        break;
      case 37:         // 向左箭头， 选中该行
        this.checkedLine(illData[curLine], 2);
        break;
      case 39:         // 向右箭头，取消选中该行
        this.checkedLine(illData[curLine], 1);
        break;
      case 13:         // enter，提交诊断到列表
        document.getElementById('symptom').focus();
        this.props.addChinaMedicineData({});
        break;
    };
    this.setState({ curLine });
  };
  render() {
    let { formItemProps, placeholder, icon } = this.props;
    let { showResult, illData } = this.state;
    let columns = this.getTableCol();
    return (
      <Semicircle id='manifestation' onKeyDown={this.handleEnterPress} icon={icon} displayed={this.showResult} placeholder={placeholder}>
        {
          showResult?
          <Result>
            <SpecTable
              onKeyDown={(e)=>this.props.onKeyDown(e)}
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
