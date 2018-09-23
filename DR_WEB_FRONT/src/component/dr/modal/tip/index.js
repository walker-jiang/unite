import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      content: '', // 文本内容
      stressContent: '', // 强调内容
    };
  };
  hideModal(){
    this.setState({
      visible: false
    });
  };
  showModal(childText){
    let {content = '', stressContent = ''} = childText;
    let self = this;
    self.setState({
      visible: true,
      content: content,
      stressContent: stressContent
    },()=>{
      window.setTimeout(()=>{ // 设置一段时间后自动隐藏
        if(self.state.visible){
          self.hideModal();
        }
      }, 1000);
    });
  };
  render() {
    let { visible, content, stressContent } = this.state;
    return (
      <Modal
         isOpen={visible}
         style={modalStyle}
         ariaHideApp={false}>
         <Container>
           <div>
             <span>{stressContent}</span>
               {content}
               {this.props.children}
           </div>
         </Container>
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
  & > div > span {
    color: #bee2a9 !important;
  }
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
/*
@作者：姜中希
@日期：2018-07-22
@描述：自定义一提示弹框，背景半透明，有边框阴影，提示内容通过函数传递
*/
