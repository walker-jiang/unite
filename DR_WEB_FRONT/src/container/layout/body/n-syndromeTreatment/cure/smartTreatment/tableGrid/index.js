import React, {Component} from 'react';
import styled from 'styled-components';
import Item from './item';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      draggable: false, //是否处于拖拽状态
      source: '', // 拖拽源ID
      target: '', // 被合并目标的ID
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  };
  handleStart(e){
    this.setState({draggable: true, source: e.target.id});
  };
  handleStop(e){
    let { source, target } = this.state;
    if(target){
      let dataSource = this.props.dataSource;
      let sourceType = '';
      let targetType = '';
      let printstate = false;
      dataSource.forEach(item => {
        if(item.orderid == source){
          sourceType = item.ordertype;
          printstate = item.printstate == '01';
        }
        if(item.orderid == target){
          targetType = item.ordertype;
          printstate = item.printstate == '01';
        }
      });
      if(sourceType && targetType){
        console.log(source,'&', target,'合并校验');
        if(sourceType == targetType){
          if(printstate){
            console.log('已打印的医嘱不能合并');
          }else{
            console.log(source,'&', target,'即将合并');
          }
        }else{
          console.log(source,'&', target,'医嘱类型不同');
        }
      }
    }
  };
  handleMouseOver(e){
    let { draggable, source } = this.state;
    if(draggable){
      if(e.target.id != source){
        this.setState({
          target: e.target.id
        });
      }
    }
  };
  handleMouseLeave(e){
    let { draggable } = this.state;
    if(draggable){
      this.setState({
        target: ''
      });
    }
  };
  getGridList(patienList){
    const cols = 3; // 每行多少列
    const totalLength = patienList.length;
    let girds = [];
    let rowLines = [];
    patienList.map((item, index) => {
      let girdItem = <Item dataItem={item} view={this.props.view} del={this.props.del} modify={this.props.modify} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} operate={(type, record) => {this.props.operate(type, record)}}></Item>
      girds.push(girdItem);
    })
    let rowLength = parseInt(totalLength / cols);
    rowLength = totalLength % cols ? ( rowLength + 1 ) : rowLength; // 条件含义是如果敲好是cols的整数倍直接返回商， 否则的将商 加1 补最后一行（最后一行肯定不满）
    for(let i = 0; i < rowLength; i++){
      let RowLinesItem = (
        <RowLine key={i} width={(girds.slice(i * cols, ( i + 1 ) * cols)).length}>
          {
            girds.slice(i * cols, ( i + 1 ) * cols).map( item => item)
          }
        </RowLine>
      );
      rowLines.push(RowLinesItem);
    }
    return rowLines;
  };
  render() {
    let { dataSource , operate } = this.props;
    let { source, target } = this.state;
    let gridComponent = this.getGridList(dataSource);
    return (
      <Container>
      {
        gridComponent
      }
      </Container>
    );
  }
}
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const RowLine = styled.div`
  display: flex;
  justify-content: space-around;
  width: ${ props => props.width * 33 + '%'};
`;
/*
@作者：姜中希
@日期：2018-08-28
@描述：医嘱列表平铺容器
*/
