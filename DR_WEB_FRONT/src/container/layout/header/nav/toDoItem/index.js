import React, {Component} from 'react';
import styled from 'styled-components';
import sign from './img/sign.png';
import Popout from './popout';

export default class ToDoItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false, // 弹框可见性
    };
  };
  /** [handleClose 弹框关闭事件] */
  handleClose(){
    this.setState({visible:false});
  };
  /** [handleOpen 弹框打开事件] */
  handleOpen(){
    this.setState({visible:true});
  };
  render() {
    let { visible } = this.state;
    return (
      <Container onClick={()=>this.handleOpen()}>
          <Item>
            <span>待办事项</span>
            <Sign src={sign}/>
            <RedDot></RedDot>
            <Popout visible={visible} onClose={()=>this.handleClose()}/>
          </Item>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: #1770C8;
`;
const Sign = styled.img`
  margin-left: 6px;
  width: 16px;
`;
const RedDot = styled.div`
  width: 8px;
  height: 8px;
  background: rgba(245, 116, 81, 1);
  border-radius: 50%;
  margin-top: -10px;
  margin-left: -5px;
`;
const Item = styled.div`
  border-left: 1px solid #1770C8;
  padding: 0px 12px;
  height: 17px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
/*
@作者：姜中希
@日期：2018-07-05
@描述：待办事项，包括按钮和弹框
*/
