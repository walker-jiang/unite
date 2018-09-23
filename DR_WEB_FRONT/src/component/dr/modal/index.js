import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable'; // The default
import styled from 'styled-components';
import Modal from 'react-modal';

export default class ModalBase extends Component {
  render() {
    let { visible } = this.props;
    return (
      <Modal
         isOpen={visible}
         style={modalStyle}
         ariaHideApp={false}>
        <Container>{this.props.children}</Container>
      </Modal>
    );
  }
}
const Container = styled.div`
  width: 390px;
  height: 97px;
  background-color: rgba(10,110,203,1);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 5px 5px 5px #5b5463;
  padding: 20px 35px;
`;
const modalStyle = {
   overlay: {
     position: 'fixed',
     top: 0,
     left: 0,
     width: '100vw',
     height: '100vh',
     zIndex: 20,
     backgroundColor: 'rgba(0, 0, 0, 0.2)'
   },
   content: {
     zIndex: 20,
     position: 'fixed',
     top: '0px',
     left: '0px',
     right: '0px',
     bottom: '0px',
     background: 'transparent',
     overflow: 'auto',
     border: 'none',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     outline: 'none',
   }
 };
ModalBase.proptypes = {

};
/*
@作者：姜中希
@日期：2018-07-22
@描述：自定义一个弹框组件
*/
