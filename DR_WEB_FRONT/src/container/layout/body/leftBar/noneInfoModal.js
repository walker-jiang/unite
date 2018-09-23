import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModalBase from 'components/dr/modal';
export default class Popout extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false
    };
  };
  hideModal(){
    this.setState({
      visible: false
    });
  };
  showModal(){
    let self = this;
    self.setState({
      visible: true
    },function(){
        window.setTimeout(function(){
          if(self.state.visible){
            self.hideModal();
          }
        }, 1000);
    });
  };
  render() {
    let {visible} = this.state;
    return (
      <ModalBase visible={visible}>
        <Container>
          请输入
          <Stress>患者姓名/姓名简拼/手机号</Stress>
          快速查询
        </Container>
      </ModalBase>
    );
  }
}
const Container = styled.div`
  width: 500px;
  height: 100px;
  background-color: rgba(10,110,203,1);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;
const Stress = styled.span`
  color: #bee2a9;
`;
/*
@作者：姜中希
@日期：2018-06-06
@描述：自定义一个弹框组件， 只包含基础功能包括半透明背景，头部标题，关闭按钮，显示、隐藏的回调函数，
*/
