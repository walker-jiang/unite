import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Button } from 'antd';
import StyReactModal from 'components/reactModal';
import Icon from 'components/dr/icon';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      video: null,
      status: 0, // 0，未拍照 1，已拍照
      visible: false, // 可见性
    };
    this.takePicture = this.takePicture.bind(this);
    this.handleClose = this.handleClose.bind(this);
  };
  /** [getCameraDevice 开启摄像头] */
  getCameraDevice(){
    var constraints = {video: { width: 570, height: 535 } };
    var video = null;
    let self = this;
		navigator.mediaDevices.getUserMedia(constraints)
		.then(function(mediaStream) {
		  video = self.video;
		  video.srcObject = mediaStream;
		  video.onloadedmetadata = function(e) {
			     video.play();
		  };
      self.setState({ video });
		})
		.catch(function(err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
  };
  /** [takePicture 拍照并显示在canvas中] */
  takePicture(){
    let video = this.state.video;
    console.log('video', video);
    var canvas=this.canvas;
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 570, 535);

    let src = canvas.toDataURL('image/png');
    this.props.returPicture(src);
    this.handleClose();
  };
  /** [handleOpen 打开拍照组件] */
  handleOpen(){
    this.setState({ visible: true });
    this.getCameraDevice();
  };
  /** [handleClose 卸载拍照组件] */
  handleClose(){
    this.setState({ visible: false });
  };
  render() {
    let { status, visible } = this.state;
    return (
        <StyledModal
           className="Modal"
           overlayClassName="Overlay"
           isOpen={visible}
           ariaHideApp={false}>
           <Container>
             <Header>
               <Icon onClick={this.handleClose} type='close' width='20px' height='20px' fill='#FFFFFF'/>
             </Header>
             <Body>
                 {
                   <Canvas innerRef={ref => {this.canvas = ref}} display={status} width='570' height='535'></Canvas>
                 }
               <Video innerRef={ref => {this.video = ref}}>您的浏览器不支持 video 标签。</Video>
               <ActionButton onClick={this.takePicture}>
                 <Icon type='camera' width='30px' height='30px' fill="#ffffff"/>
                 拍照
               </ActionButton>
             </Body>
           </Container>
         </StyledModal>
    );
  }
}
const Container = styled.div`
  background-color: rgba(242, 242, 242, 1);
  border-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
`;
const Header = styled.div`
  border-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  height: 40px;
  background-color: rgba(10, 110, 203, 1);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 10px
`;
const Body = styled.div`
  display: flex;
  align-items: center;
`;
const StyledModal = styled(Modal)`
  ${StyReactModal.windowModal}
`;
const Video = styled.video`
  padding: 20px;
  z-index: 2000;
`;
const Canvas = styled.canvas`
  z-index: 2001;
  display: ${props => props.display == 0 ? 'none' : 'block'}
`;
const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2002;
`;

const ActionButton = styled.div`
  width: 88px;
  height: 88px;
  cursor: pointer;
  margin: 13px;
  background: #0A6ECB;
  font-size: 20px;
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
/*
@作者：姜中希
@日期：2018-09-28
@描述：拍照组件，提供照片给父组件
*/
