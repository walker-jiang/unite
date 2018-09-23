import React, { Component } from 'react';
import styled from 'styled-components';
import inspection from './imgs/none_focus/inspection.png';
import inspection_hover from './imgs/hover/inspection.png';
import examine from './imgs/none_focus/examine.png';
import examine_hover from './imgs/hover/examine.png';
import ch_medicine from './imgs/none_focus/ch_medicine.png';
import ch_medicine_hover from './imgs/hover/ch_medicine.png';
import west_medicine from './imgs/none_focus/west_medicine.png';
import west_medicine_hover from './imgs/hover/west_medicine.png';
import suit_tech from './imgs/none_focus/suit_tech.png';
import suit_tech_hover from './imgs/hover/suit_tech.png';
import west_cure from './imgs/none_focus/west_cure.png';
import west_cure_hover from './imgs/hover/west_cure.png';
import material from './imgs/none_focus/material.png';
import material_hover from './imgs/hover/material.png';
import add from './imgs/none_focus/add.png';
import add_hover from './imgs/hover/add.png';


export default class Index extends Component {
    render () {
    return (
      <Container>
        <AddQuickly>
          <Icon src={add} hover={add_hover}/>快速添加：
        </AddQuickly>
        <AddList>
          <ListItem onClick={() => {this.props.operate('add', {orderid: '', ordertype: 1})}} >
            <Icon src={inspection} hover={inspection_hover}/>检验
          </ListItem>
          <Line>|</Line>
          <ListItem onClick={() => {this.props.operate('add', {orderid: '', ordertype: 2})}} >
            <Icon src={examine} hover={examine_hover}/>检查
          </ListItem>
          <Line>|</Line>
          <ListItem onClick={() => {this.props.operate('add', {orderid: '', ordertype: 3})}} >
            <Icon src={ch_medicine} hover={ch_medicine_hover}/>中药
          </ListItem>
          <Line>|</Line>
          <ListItem onClick={() => {this.props.operate('add', {orderid: '', ordertype: 4})}} >
            <Icon src={west_medicine} hover={west_medicine_hover}/>中成药/西药
          </ListItem>
          <Line>|</Line>
          <ListItem onClick={() => {this.props.operate('add', {orderid: '', ordertype: 5})}} >
            <Icon src={suit_tech} hover={suit_tech_hover}/>中医适宜技术
          </ListItem>
          <Line>|</Line>
          <ListItem onClick={() => {this.props.operate('add', {orderid: '', ordertype: 6})}} >
             <Icon src={west_cure} hover={west_cure_hover}/>西医治疗
           </ListItem>
          <Line>|</Line>
          <ListItem onClick={() => {this.props.operate('add', {orderid: '', ordertype: 7})}} >
             <Icon src={material} hover={material_hover}/>材料
          </ListItem>
        </AddList>
      </Container>
    )
  }
}
const Container = styled.div`
  overflow: hidden;
  margin-top: 12px;
  padding-left: 24px;
`;
const AddQuickly = styled.div`
  cursor: pointer;
  float: left;
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 10px;
  margin-right: 16px;
`;
const AddList = styled.ul`
  float: left;
  overflow: hidden;
  font-size: 12px;
  color: #999999;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  float: left;
  list-style: none;
  color: #333;
  cursor: pointer;
`;
const Icon = styled.div`
  background: url(${props => props.src});
  background-size: 100% 100%;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  &:hover {
    background: url(${props => props.hover});
    background-size: 100% 100%;
  }
`;
const Line = styled.i`
  display: inline-block;
  float: left;
  margin: 0px 10px;
  color: #999999
`;
const ListItemIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-top: -2px;
`;
/*
@作者：姜中希
@日期：2018-08-28
@描述：医嘱快速添加入口组件
*/
