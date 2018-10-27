import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable'; // The default
import { Button, Icon } from 'antd';
import Modal from 'react-modal';
import iconSty from 'components/antd/style/icon';
import buttonSty from 'components/antd/style/button';

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
    let {visible, children, onOk, title = '精美弹框', hbgColor = '#0A6ECB', icon_type = 'lightBlue'} = this.props;
    return (
      <Modal
         isOpen={visible}
         style={modalStyle}
         ariaHideApp={false}
          >
        <Draggable
          cancel=".not-draggable"
          position={null}
          defaultPosition={{x: 0, y: 0}}
          grid={[25, 25]}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}>
          <Pannel className="handle" onClick={this.cancelHandle}>
            <Header hbgColor={hbgColor}>
              <span>{title}</span>
              <CloseBtn type='close' icon_type={icon_type} onClick={this.handleClose} />
            </Header>
            <div>
              {children}
            </div>
            {
              !!!onOk?null:
              (
                <Footer>
                  <SureButton type="primary" onClick={this.handleOK}>确定</SureButton>
                  <CancelButton type="primary" onClick={this.handleClose}>取消</CancelButton>
                </Footer>
              )
            }
          </Pannel>
        </Draggable>
      </Modal>
    );
  }
}
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
  border-radius: 16px 16px 0px 0px
`;
const Header = styled.div`
  border-radius: 12px 12px 0px 0px;
  z-index: 4;
  height: 35px;
  font-size: 14px;
  font-weight: 400;
  background-color: ${props => props.hbgColor};
  display: flex;
  padding-left: 12px;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
  color: white
`;
const Footer = styled.div`
  height: 96px;
  border-top: 1px solid #E6E6E6;
  display: flex;
  justify-content: center;
  align-items: center
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.white}
`;
const CloseBtn = styled(Icon)`
  ${props => iconSty[props.icon_type]}
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
