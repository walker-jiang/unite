import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Icon, Input, Select } from 'antd';
import down_arrow from './down.png';
import up_arrow from './up.png';
import getResource from 'commonFunc/ajaxGetResource';
import down from './down.png';
import up from './up.png';
import red_lang from './red_lang.png';
import green_lang from './green_lang.png';

const Option = Select.Option;

export default class TableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectData: [], // 用法下拉框
      openstatus: false, // 下拉列表是否展开
    };
  }
  componentWillMount () {
    this.getSpecialUsage()
  }
  /**
   * [handleEnterPress 按下Enter键,光标定位到选择特殊用法上]
   * @param  {[type]} keyCode [键码]
   * @param  {[type]} name    [源组件名称]
   * @return {[type]}         [void]
   */
  handleEnterPress(keyCode, name) {
    // console.log('keyCode', keyCode);
    switch(keyCode+name){
      case '13numberInput':
        this.specialUsage.focus();
        break;
      case '13select':
        this.setState({
          openstatus: false
        },()=>{ // enter切换到快速输入
          document.getElementById('quickAddInput').click();
          document.getElementById('quickAddInput').focus();
        })
        break;
      case '40select':
        this.setState({
          openstatus: true
        });
        break;
    };

  }
  /**
   * [dosageChange 修改草药剂量]
   * @param  {[type]} value     [原来的草药项]
   * @param  {[type]} e         [源DOM]
   * @param  {[type]} oldDosage [原来的剂量]
   * @return {[type]}           [void]
   */
  dosageChange(value, e, oldDosage) {
    if(!(oldDosage == e.target.value)){ // 只有值改变了才去触发改变原数组的函数
      this.props.dosageChange(value.itemcode, e.target.value)
    }
  }
  usageChange(value, e, oldUsage){
    if(e.key != oldUsage){
        this.props.onUsageChange(value.itemcode, e)
    }
  };
  // 获取特殊用法下拉数据
  getSpecialUsage() {
    let params = {
      url: 'BaUsageController/getList',
      data: {}
    };
    let that = this;
    function success(res) {
      if(res.result){
        let selectData = res.data;
        that.setState({ selectData })
      }
    };
    getResource(params, success);
  }
  componentDidMount(){
    let autofocus = this.props.autofocus;
    if(autofocus == 'autofocus'){
      // console.log('this.numberInput', this.numberInput);
      ReactDOM.findDOMNode(this.numberInput).select();
      // this.numberInput.select();
    }
  };
  render() {
    let { selectData, openstatus } = this.state;
    let { value , autofocus, mouse_event } = this.props;
    let { usageid, usagename } = value;
    return (
      <Container>
        <TipIcon>
          {
            value.careful ? <CarefulTip src={red_lang} onMouseEnter={() => {mouse_event(0, value.careful)}} onMouseLeave={() => {mouse_event(1)}}/> : null
          }
          {
            value.taboo ? <TabooTip src={green_lang} onMouseEnter={() => {mouse_event(0, value.taboo)}} onMouseLeave={() => {mouse_event(1)}}/> : null
          }

        </TipIcon>
        <CloseIcon type="close" onClick={()=>{this.props.onDelete(value)}} />
        <DataWrapper exist={value.exist}>
          <CenterWrapper>
            <NumberInput
              type="text"
              ref={ref=>{this.numberInput = ref}}
              onBlur={(e)=>{this.dosageChange(value,e,value.count)}}
              defaultValue={value.count}
              autoFocus={autofocus}
              onKeyDown={(e) => {this.handleEnterPress(e.keyCode, 'numberInput')}}
               />
            <HerBalName innerRef={ref=>{this.test=ref}}>{value.itemname}</HerBalName>
            <span>{value.baseUnitDic}</span>
          </CenterWrapper>
        </DataWrapper>
        <div
          onKeyDown = {(e)=>{this.handleEnterPress(e.keyCode, 'select')}}
          onClick={()=>{this.setState({openstatus: !openstatus})}}>
          <SpecSelect
            open={openstatus}
            labelInValue={true}
            defaultValue={{key: usageid, label: usagename}}
            onChange={(e)=>{this.usageChange(value, e, usageid)}}
            onSelect={(e)=>{this.handleEnterPress(13, 'select')}}
            onBlur={()=>{this.setState({openstatus: false})}}
            innerRef={ref=>this.specialUsage = ref} >
            {
              selectData.map((value, index) => {
                return(
                  <Option key={value.usageid} value={value.usageid}>{value.usagename}</Option>
                )
              })
            }
          </SpecSelect>
        </div>
      </Container>
    )
  }
}

const Container = styled.li`
  position: relative;
  list-style: none;
  width: 205px;
  height: 70px;
  float: left;
  font-size: 18px;
  text-align: center;
  background: #f2f2f2;
  font-family: 'YaHei Consolas Hybrid';
  margin:0px 0px 4px 0px;
  color: rgb(178, 20, 20);
  &:hover {
    background-color: #fff;
    border: 1px solid rgb(178, 20, 20);
  }
  &:nth-child(4n): {
    margin-right: 0;
  }
`;
const TipIcon = styled.div`
  position: absolute;
`;
const CarefulTip = styled.img`
  float: left;
  cursor: pointer;
  margin: 5px;
`;
const TabooTip = styled.img`
  float: left;
  cursor: pointer;
  margin: 5px;
`;
const CloseIcon = styled(Icon)`
  font-size: 14px;
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer
`;
const DataWrapper = styled.div`
  width: 100%;
  display: flex;
  color: ${props => (props.exist == 0) ? 'blue' : 'rgb(178, 20, 20)'};
  justify-content: center;
  align-items: center;
  line-height: 66px;
`;
const CenterWrapper = styled.div`
  position: relative;
`;
const NumberInput = styled.input`
  width: 40px;
  height: 20px;
  line-height: 20px;
  background: none;
  outline: none;
  border: none;
  text-align: center;
  border-bottom: 1px solid rgb(178, 20, 20);
  ${'' /* & + span:after{
    content: '('
  }
  & + span + span:before{
    content: ')'
  }
  ${Container}:hover & {
    width: 40px;
    max-width: 40px;
    border-bottom: 1px solid #0a6ecb;
  }
  &:focus {
    width: 40px;
    max-width: 40px;
    border-bottom: 1px solid #0a6ecb;
  }
  &:focus + span:after{
    content: ''
  }
  &:focus + span + span:before{
    content: ''
  }
  ${Container}:hover & + span:after{
    content: ''
  }
  ${Container}:hover & + span + span:before{
    content: ''
  } */}
`;
const HerBalName = styled.span`
  float: left;
`;
const SpecSelect = styled(Select)`
  &&& .ant-select-arrow {
    background: url(${down}) no-repeat top right;
    width: 16px;
    height: 16px;
  }
  &&&.ant-select.ant-select-open > .ant-select-selection > .ant-select-arrow {
    background: url(${up}) no-repeat top right;
    width: 16px;
    height: 16px;
  }
  .ant-select-selection {
    background-color: transparent;
    border: none;
  }
  .ant-select-selection:focus {
    background-color: transparent;
    border: none;
    box-shadow: none
  }
  .ant-input:focus {
    background-color: transparent;
    border: none;
    box-shadow: none
  }
  .ant-select-selection:focus .ant-select-selection-selected-value {
    display: block !important;
  }
  .ant-select-selection-selected-value {
    font-family: 'YaHei Consolas Hybrid';
    display: ${props=>props.defaultValue.label == '无' ? 'none !important' : 'block'};
  }
  bottom: 25px;
  ${Container}:hover & {
    display: block;
  }
`;
/*
@作者：姜中希
@日期：2018-08-14
@描述：表格项目
*/
