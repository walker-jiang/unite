import React, {Component} from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
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
  render() {
    let { dataSource , operate } = this.props;
    let { source, target } = this.state;
    return (
      <Container>
      {
        dataSource.map((item, index) =>
          <Draggable
            handle=".handle"
            bounds='parent'
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[5, 5]}
            key={index}
            onStart={this.handleStart}
            onStop={this.handleStop}>
              <Grid className='handle' source={source == item.orderid} targetOrder={target}>
                <Item dataItem={item} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} operate={(type, record) => {this.props.operate(type, record)}}></Item>
              </Grid>
          </Draggable>
        )
      }
      </Container>
    );
  }
}
const Container = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
`;
const Grid = styled.div`
  position: relative;
  float: left;
  width: 210px;
  height: 145px;
  background-color: #FFFFFF;
  z-index: ${props => props.source ? 1 : 2};
  &:hover {
    border: 2px solid red;
  }
`;
/*
@作者：姜中希
@日期：2018-08-28
@描述：医嘱列表平铺容器
*/
