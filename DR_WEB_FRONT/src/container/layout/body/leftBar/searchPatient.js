import React, {Component} from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import Semicircle from 'components/dr/input/searchInput/semicircle';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import tableSty from 'components/antd/style/table';

export default class AddIllByDiagnose extends Component {
  constructor(props){
    super(props);
    this.state = {
      showResult: false, // 是否展示疾病搜索结果
      patientData: [], // 患者数据数组
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
      inputValue: '', // 输入的值
      patientInfo: {}, // 患者证件号码
    };
    this.showResult = this.showResult.bind(this);
    this.hideResult = this.hideResult.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }
  // 设置表格表头
  getTableCol(){
    const columns = [{
      title: '患者姓名',
      dataIndex: 'patientname',
      key: 'patientname'
    }, {
      title: '患者手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }];
    return columns;
  };
  // 获取患者基本信息数据
  getPatientBasicData(keyword){
    let self = this;
    let params = {
      url: 'BaPatientController/getList',
      data: {
        keyword: keyword,
      },
    };
    function callBack(res){
      if(res.result){
        let patientData = res.data.map((item, index)=>{
          item.key = index; // 加唯一key值
          item.status = (index == 0) ? 1 : 0; // 0表示全部未选中， 1表示选择了该行，初始化时默认选中第一行
          return item
        });
          let totalLines = patientData.length;
        self.setState({patientData, totalLines, inputValue: keyword});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [changeValue 输入框改变后通知父组件，并将新值保存下来方便用户直接搜索患者基本信息]
   * 如果当前呈现了结果浮层表明是在搜索用户基本信息，否则是在搜索挂号信息
   * @param  {[type]} value [新值]
   * @return {[type]}       [void]
   */
  changeValue(value){
    if(this.state.showResult){
      this.getPatientBasicData(value);
    }else{// 保存数据当从搜索挂号信息切换到搜索基本信息时使用inputValue
      this.setState({ inputValue: value },
        function(){
          this.props.onChange();
        });
    }
  };
  /** [showResult 先显示浮层，然后去基本信息中查询该人] */
  showResult(){
    this.setState({showResult: true});
    this.getPatientBasicData(this.state.inputValue);
  };
  /** [hideResult 隐藏浮层] */
  hideResult(){
    this.setState({showResult: false});
  };
  /** [getSelectedData 获取到选中行的数据] */
  getSelectedData(){
    let selectedIllData = {};
    let { patientData, showResult } = this.state;
    if(showResult){ // 只有显示着查询结果浮框才能添加进诊断
      illData.forEach((item, index)=>{ // 只返回选中的行
        if(item.status == 2){
          selectedIllData = item;
        }
      });
    }
    return selectedIllData;
  };
  /** [SelectedLine 选中表格行] */
  SelectedLine(record){
    let patientData = this.state.patientData;
    patientData.map((item)=>{ // 将除当前点击行外的所有行均设置为未选中
      if(item.status != 2){
        if(item.key == record.key){
          if(item.status == 1){
            item.status = 0;
          }else{
            item.status = 1;
          }
        }
        else{
          item.status = 0;
        }
        return item;
      }
    });
    this.setState({ patientData });
  };
  /** [checkedLine 选中表格行触发的函数] */
  checkedLine(record, status){
    let patientData = this.state.patientData;
    patientData.map((item)=>{ // 改变当前行的选中状态
      if(item.key == record.key){
        item.status = status;
        if(status == 2){
          this.hideResult();
          this.setState({patientInfo: record}, function(){
            document.getElementById('saerchPatient').value = record.patientname;
          })
          // this.props.addWestMedicineData({});
        }
      }else{
        item.status = 0;
      }
      return item;
    });
    this.setState({ patientData });
  };
  /** [handleEnterPress 包括向上箭头选择上一行，下箭头选择下一行，enter后切换到病侯] */
  handleEnterPress = (e) => {
    let patientData = this.state.patientData;
    let curLine = this.state.curLine;
    let totalLines = this.state.totalLines;
    switch(e.keyCode){
      case 40:         // 向下箭头, 选择下一行
        if(totalLines <= 1){ // 只有一行的话不用在行间移动
          return;
        }
        if(curLine >= totalLines-1){
          curLine = 0;
        }else{
          curLine++;
        }
        this.SelectedLine(patientData[curLine]);
        break;
      case 38:         // 向上箭头，选择上一行
        if(totalLines <= 1){ // 只有一行的话不用在行间移动
          return;
        }
        if(curLine <= 0){
          curLine = totalLines-1;
        }else{
          curLine--;
        }
        this.SelectedLine(patientData[curLine]);
        break;
      case 13:         // enter
        this.checkedLine(patientData[curLine], 2);
        break;
    };
    this.setState({ curLine });
  };
  render() {
    let { formItemProps, placeholder, icon } = this.props;
    let { showResult, patientData } = this.state;
    let columns = this.getTableCol();
    return (
      <Semicircle icon={icon} onKeyDown={this.handleEnterPress} id='saerchPatient' displayed={this.changeValue} placeholder={placeholder}>
        {
          showResult?
          <Result>
            <SpecTable
              onRow={(record) => {
                return {
                  onClick: (e) => {
                    this.checkedLine(record, 2);
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
              locale={{emptyText: <span onClick={()=>{this.props.onRegister()}}>无患者信息,请先<a>登记</a></span>}}
              dataSource={patientData} />
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
@描述：添加诊断输入框组件
*/
