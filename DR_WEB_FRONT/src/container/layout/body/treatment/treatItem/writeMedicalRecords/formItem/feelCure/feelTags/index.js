import React, {Component, PropTypes} from 'react'; // react核心
import styled from 'styled-components';
import CheckableTag from 'components/antd/components/checkableTag';
import { Radio } from 'antd';
import FloatTip from './floatTip';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const RadioGroup = Radio.Group;
export default class FellCure extends Component {
  constructor(props){
    super(props);
    this.state = {
      leftSelected: [], // 左脉象
      rightSelected: [], // 右脉象
      list: [], // 脉象列表
      curent: 0, // 0代表左，1代表右
      pulseCondition: false ,// 脉象开关
      details:'' , //脉象详情数据
      pulsekey:'' , //脉象的名称
    };
    this.checkBoxClick = this.checkBoxClick.bind(this);
  };
  componentWillMount(){
    this.getData();
  };
  /** [getData 获取脉象列表] */
  getData(){
    let self = this;
    let params = {
      url: 'BaPulseConditionController/getList',
      data: {},
    };
    function callBack(res){
      if(res.result){
        let list = new Array();
        res.data.map((item)=>{
          list.push({
            key: item.conditionid,
            name: item.condTypename,
            details: item.condTypedesc,  // 详细信息
            pulsekey:item.condTypename+'脉', //脉象名称
          });
        });
        self.setState({ list });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [checkBoxClick 点击标签触发的函数]
   * @param  {[type]} text      [标签上的文本]
   * @param  {[type]} checkable [标签是否选中的状态]
   * @return {[type]}           [undefined]
   */
  checkBoxClick(text, checkable, id){
    let {curent, leftSelected, rightSelected} = this.state;
    if(curent == 0){
      this.traverseArr(text, checkable, leftSelected, id);
    }else{
      this.traverseArr(text, checkable, rightSelected, id);
    }
  };
  /**
   * [traverseArr 将xaunzh选中或者删除的标签添加数组或者从数组删除， 然后通知父组件更新]
   * @param  {[type]} text      [标签文本]
   * @param  {[type]} checkable [是否选中，选中添加否则删除]
   * @param  {[type]} arr       [存入左脉象还是右脉象]
   * @return {[type]}           [undefined]
   */
  traverseArr(text, checkable, arr, id){
    if(checkable){ // 选中
      arr.push({id: id, name: text});
    }else{ // 取消
      arr.pop({id: id, name: text});
    }
    let {leftSelected, rightSelected} = this.state;
    this.props.onClick(leftSelected, rightSelected);
  };
  toggleRadio(e){ // 单选按钮切换
    this.setState({
      curent: (this.state.curent == 0) ? 1 : 0
    });
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  // 鼠标停留两秒后显示右侧脉象详情
  handleMouseOver = (html,key) => {
    setTimeout(
      () => {
        this.setState({
          pulseCondition: true,
          details: html,
          pulsekey:key,
        })
      },
      1000
    );
  }
  // 点击关闭右侧脉象详情页
  onClose = () => {
    this.setState({
      pulseCondition: false,
    })
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.expand){
      this.onClose();
    }
  };
  /**
   * [stopBubling 阻止事件冒泡的函数]
   * @param  {[type]} e [事件源]
   * @return {[type]}   [undefined]
   */
  stopBubling = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  render() {
    let { curent, list, pulseCondition, details, pulsekey } = this.state;
    let expand = this.props.expand;
    return (
      <Container expand={expand}>
        <FloatTip  onClose={this.onClose} pulseCondition={pulseCondition} details={details} pulsekey={pulsekey}></FloatTip>
        <div onClick={this.stopBubling}>
          <RadioGroup value={curent} onChange={(e)=>{this.toggleRadio(e)}} onClick={this.stopBubling}>
            <Radio value={0}>脉象左</Radio>
            <Radio value={1}>脉象右</Radio>
          </RadioGroup>
        </div>
        <PulseLeft curent={curent}>
          {
            list.map((item, index) => {
              return <CheckableTag key={index} id={item.key} color="#41b334" onClick={this.checkBoxClick} text={item.name} onMouseEnter={() => {this.handleMouseOver(item.details,item.pulsekey)}}></CheckableTag>
            })
          }
        </PulseLeft>
        <PulseRight curent={curent}>
          {
            list.map((item, index) => {
              return <CheckableTag key={index} id={item.key} color="#41b334" onClick={this.checkBoxClick} text={item.name}></CheckableTag>
            })
          }
        </PulseRight>
      </Container>
    )
  }
}
const Container = styled.div`
  display: ${props => props.expand ? 'block' : 'none'}
`;
const PulseLeft = styled.div`
  display: ${props=> (props.curent == 0)?'block':'none'}
`;
const PulseRight = styled.div`
  display: ${props=> (props.curent == 1)?'block':'none'}
`;
/*
@作者：姜中希
@日期：2018-06-28
@描述：切诊组件
*/
