import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable'; // The default
import { Button, Icon } from 'antd';
import Modal from 'react-modal';

export default class Popout extends Component {
  constructor(props){
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleOK = this.handleOK.bind(this);
  };
  /** [handleClose 通过组件的onClose属性改变visible来关闭弹框] */
  handleClose(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.onClose();
  };
  /** [handleOK ok函数设置为点击footer确定时触发，当组件不提供这个属性时不显示footer] */
  handleOK(){
    this.props.onOk();
  };
  render() {
    let {visible, children, onOk, title = '', className = ''} = this.props;
    return (
      <Modal
         isOpen={visible}
         style={modalStyle}
         ariaHideApp={false}
         onClick={()=>{alert()}}>
         <Book>
          <Book>
            <Book>
              <Book>
                <Pannel className={className}>
                  <Header className='header' title={title}>
                    { title ? <span>好健康中医馆—{title}</span> : null}
                    <Close type='close' onClick={this.handleClose}/>
                  </Header>
                  <div>
                    {children}
                  </div>
                </Pannel>
              </Book>
            </Book>
          </Book>
        </Book>
      </Modal>
    );
  }
}
const Book = styled.div`
  border: 1px solid #888888;
  transform: translate(-1px, -1px);
`;
const modalStyle = {
   overlay: {
     position: 'fixed',
     top: 0,
     left: 0,
     zIndex: 3,
     padding: '0px',
     width: '100vw',
     height: '100vh',
     backgroundColor: 'rgba(0, 0, 0, 0.2)'
   },
   content: {
     zIndex: 3,
     paddingTop: '0px',
     paddingBottom: '0px',
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
const Container = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center
`;
const Pannel = styled.div`
  background-color: #FFFFFF;
  min-width: 20%;
  width: fit-content;
`;
const Header = styled.div`
  z-index: 4;
  position: relative;
  height: ${props => props.title ? '55px' : '30px'} !important;
  font-size: 30px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Close = styled(Icon)`
  position: absolute;
  cursor: pointer;
  right: 5px;
  top: 5px;
  font-size: 15px;
  color: #FFFFFF;
  font-weight: 600;
  background-color: #bfced6;
  border-radius: 50%;
  padding: 5px;
  &:hover {
    background-color: #D7D7D7;
  }
`;
const Footer = styled.div`
  height: 96px;
  border-top: 1px solid #E6E6E6;
  display: flex;
  justify-content: center;
  align-items: center
`;
Popout.proptypes = {
  visible: PropTypes.bool,
  children: PropTypes.element,
  onOk: PropTypes.func,
  title: PropTypes.string
};
/*
@作者：姜中希
@日期：2018-06-06
@描述：自定义一个弹框组件， 只包含基础功能包括半透明背景，头部标题，关闭按钮，显示、隐藏的回调函数，
如果组件定义了onOk属性那么底部会有动作按钮，否则动作按钮是null
*/
