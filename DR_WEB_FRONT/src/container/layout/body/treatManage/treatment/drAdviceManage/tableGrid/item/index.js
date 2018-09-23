import React, {Component} from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable'; // The default
import { Checkbox } from 'antd';
import Icon from 'components/dr/icon';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.modifyCheckState = this.modifyCheckState.bind(this);
  };
  /**
   * [modifyCheckState 改变复选框状态的函数]
   * @param  {[type]} e [事件源]
   * @return {[type]}   [description]
   */
  modifyCheckState(e){
    let dataItem = this.props.dataItem;
    dataItem.checkState = e.target.checked;
    this.forceUpdate();
  };
  render() {
    let { dataItem, operate } = this.props;
    let { orderstate = '6', orderstateDic = '未提交', printstate = '02', printstateDic = '未打印', ordertype = 1, ordertypeDic = '中药处方', ordercontent = '无', checkState = false} = dataItem;
    return (
      <Container ordertype={ordertype} onMouseOver={this.props.onMouseOver} onMouseLeave={this.props.onMouseLeave}>
        <Header>
          <SpecCheckbox checked={checkState} onClick={this.modifyCheckState}></SpecCheckbox>
          <PayState status={orderstate}>{orderstateDic}</PayState>
          <PrintState status={printstate}>{printstateDic}</PrintState>
        </Header>
        <Body id={dataItem.orderid}>
          {ordercontent}
        </Body>
        <Action>
          <Icon type='delete' onClick={() => {operate('delete', dataItem)}}></Icon>
          <Icon type='view' onClick={() => {operate('view', dataItem)}}></Icon>
          <Icon type='print' onClick={() => {operate('print', dataItem)}}></Icon>
          <Icon type='modify' onClick={() => {operate('modify', dataItem)}}></Icon>
        </Action>
        <OrderType ordertype={ordertype}>{ordertypeDic}</OrderType>
    </Container>
    );
  }
}
const colors = ['#38B6E4', '#0A6ECB', '#CC0000', '#33CC00', '#CC6633', '#009999', '#666666'];
const Container = styled.div`
  font-family: ${props => props.ordertype == 3 ? 'YaHei Consolas Hybrid' : 'MicrosoftYaHei'};
  position: relative;
  float: left;
  margin: 3px;
  width: 210px;
  height: 145px;
  font-size: 12px;
  background-color: rgba(56, 182, 228, 0);
  border: 2px solid rgba(56, 182, 228, 1);
  overflow: hidden;
`;
const Header = styled.div`
  height: 16px;
  background-color: #E4E4E4;
  display: flex;
  align-items: center;
`;
const SpecCheckbox = styled.input.attrs({
  type: 'checkbox'
})`
  margin: 0px 3px;
`;
const PayState = styled.span`
  border-right: 1px solid #797979;
  height: 13px;
  line-height: 13px;
  padding-right: 10px;
  margin-right: 10px;
  color: ${props => props.status == '6' ? '#FF9900' : '#0066CC'};
`;
const PrintState = styled.div`
  color: ${props => props.status == '02' ? '#FF9900' : '#008000'}
`;
const Action = styled.div`
  position: absolute;
  display: none;
  right: 10px;
  bottom: 10px;
  ${Container}:hover &&&{
    display: block;
  }
`;
const OrderType = styled.div`
  position: absolute;
  right: -22px;
  top: 22px;
  width: 106px;
  background-color: ${props => colors[props.ordertype - 1]};
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateZ(45deg);
`;
const Body = styled.div`
  height: 129px;
  padding: 3px;
  display: flex;
  align-items: center;
`;
/*
@作者：姜中希
@日期：2018-08-28
@描述：医嘱列表平铺容器项目
*/
