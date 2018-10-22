import React, { Component } from 'react';
import styled from 'styled-components';
import TableItem from './tableItem';
import Addtip from './addtip.png';
import border from './border.png';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      herbalData: [], // 草药数据集
    };
    this.dosageChange = this.dosageChange.bind(this);
    this.usageChange = this.usageChange.bind(this);
  }
  /**
   * [dosageChange 修改草药剂量]
   * @param  {[type]} medicinename [草药名称]
   * @param  {[type]} newDosage    [新剂量]
   * @return {[type]}              [void]
   */
  dosageChange(medicinename, newDosage) {
    this.props.dosageChange(medicinename, newDosage);
  }
  usageChange(medicineid, newUsage){
    this.props.usageChange(medicineid, newUsage);
  };
  render() {
    let herbalData = this.props.herbalData;
    let baHerbalMedicines = this.props.buOrderDtlList;
    let mergeArray = baHerbalMedicines.concat(herbalData);
    let rows = new Array();
    for(let i = 0; i < parseInt((mergeArray.length -1) / 4) + 1; i++){
      let row = new Array();
      let len = mergeArray.length - (i + 1) * 4;
      len = (len > 0) ? 4 : (4 + len);
      for(let j = i * 4; j < i * 4 + len; j++){
        row.push(<TableItem value={mergeArray[j]} onDelete={()=>{this.props.delHerbal(mergeArray[j])}} onUsageChange = {this.usageChange} dosageChange={this.dosageChange} autofocus={(mergeArray.length == j + 1) ? 'autofocus' : 'none'} key={j}></TableItem>);
        // if(j == (mergeArray.length - 1) && mergeArray.length % 4 != 0){
        //   row.push(<Add onClick = { () => { this.props.addHerbal() }} key={'j'}>+</Add>);
        // }
      }
      let rowLine = <Row key={i} width={row.length/4}>{row}</Row>
      rows.push(rowLine);
    }
    if(mergeArray.length % 4 == 0){ // 添加到下一行
      let rowLine = <Row key={rows.legnth +1} width={0.25}>
                      <Add  key={'add'} onClick = { () => { this.props.addHerbal() }}>+</Add>
                    </Row>
      rows.push(rowLine);
    }
    return (
      <TableWrap>
      {
        rows.map((item, index) => item)
      }
      {
        mergeArray.length == 0 ? <TipWrap>
        <TipImg src={Addtip} />
        <TipTitle>处方中还没有添加穴位</TipTitle>
        <TipText>通过<TipTextBlue>穴位搜索框</TipTextBlue>快速添加</TipText>
      </TipWrap> : null
      }
      </TableWrap>
    )
  }
}
const TableWrap = styled.ul`
  border:10px solid transparent;
  border-image: url(${border}) 12 14 12 14 stretch;
  position: relative;
  top: -18px;
  width: 857px;
  height: 310px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: ${props => props.width * 100 + '%'};
`;
const Add = styled.p`
  font-size: 48px;
  line-height: 64px;
  color: #000;
  cursor: pointer;
  text-align: center;
  background: #f2f2f2;
  width: 205px;
  height: 70px;
`;
const TipWrap = styled.div`
  width: 100%;
  position: absolute;
  top: 60px;
`;
const TipImg = styled.img`
  width: 109px;
  height: 130px;
  margin-left: 44%;
`;
const TipTitle = styled.div`
  font-size: 16px;
  color: #666666;
  text-align: center;
  line-height: 24px;
`;
const TipText = styled.p`
  font-size: 12px;
  color: #999999;
  text-align: center;
`;
const TipTextBlue = styled.i`
  color: rgb(178, 20, 20)
`;
/*
@作者：马晓敏
@日期：2018-07-05
@描述：显示方式——方块儿排列
*/
