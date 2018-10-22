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
        self.setState({illData, totalLines});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [showResult 展示查询结果] */
  showResult(value){

    this.setState({showResult: true});
    this.getIllData(value);
  };
  /** [hideResult 隐藏查询结果] */
  hideResult(){
    this.setState({showResult: false});
  };
  /** [getSelectedData 获取到选中行的数据] */
  getSelectedData(){
    let selectedIllData = {};
    let { illData, showResult } = this.state;
    if(showResult){ // 只有显示着查询结果浮框才能添加进诊断
      illData.forEach((item, index)=>{ // 只返回选中的行
        if(item.status == 2){
          selectedIllData = item;
        }
      });
    }
    return selectedIllData;
  };
  /**
   * [SelectedLine 通过键盘那或者鼠标选择或者选中当前行，并通知病侯更新联动查询结果]
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
            this.props.notify('');
          }else{
            item.status = 1;
            this.props.notify(record.diseaseid);
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
          this.props.notify(record.diseaseid);
      }else{
        item.status = 0;
      }
      return item;
    });
    this.setState({ illData });
  };
  /** [handleEnterPress 包括向上箭头选择上一行，下箭头选择下一行，enter后切换到病侯] */
  handleEnterPress = (e) => {
    let illData = this.state.illData;
    let curLine = this.state.curLine;
    let totalLines = this.state.totalLines;
    switch(e.keyCode){
      case 40:         // 向下箭头, 选择下一行
        if(totalLines == 1){
          break;
        }
        if(curLine >= totalLines-1){
          curLine = 0;
        }else{
          curLine++;
        }
        this.SelectedLine(illData[curLine]);
        break;
      case 38:         // 向上箭头，选择上一行
        if(totalLines == 1){
          break;
        }
        if(curLine <= 0){
          curLine = totalLines-1;
        }else{
          curLine--;
        }
        this.SelectedLine(illData[curLine]);
        break;
      case 13:         // enter，切换到病侯
        this.checkedLine(illData[curLine], 2);
        document.getElementById('manifestation').focus();
        break;
    };
    this.setState({ curLine });
  };
  render() {
    let { formItemProps, placeholder, icon } = this.props;
    let { showResult, illData } = this.state;
    let columns = this.getTableCol();
    return (
      <Semicircle id='symptom'  onKeyDown={this.handleEnterPress} icon={icon} autofocus='autofocus' displayed={this.showResult} placeholder={placeholder}>
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
  padding: 0px 5px;
`;
const SpecTable = styled(Table)`
  ${tableSty.selectedTable}
`;
/*
@作者：姜中希
@日期：2018-07-11
@描述：添加疾病输入框组件
*/
