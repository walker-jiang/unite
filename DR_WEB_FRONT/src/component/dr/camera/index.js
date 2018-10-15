import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Button } from 'antd';
import StyReactModal from 'components/reactModal';
import Icon from 'components/dr/icon';
// 兼容调取摄像头api 并兼容

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
    window.promisifiedOldGUM = function promisifiedOldGUM(constraints){
      var getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);
      if(!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }
      return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  };
  /** [getCameraDevice 开启摄像头] */
 getCameraDevice(){
   var videoObj = {video: { width: 467, height: 342 } };
   let self = this;
   var uA =  navigator.userAgent.toLowerCase();
   var version,text;
   var chromeTest =  /(chrome)(?:.*version)?[ \/]([\w.]+)/;
   var match = chromeTest.exec(uA) || [];
   if(navigator.mediaDevices === undefined) {
     navigator.mediaDevices = {};
   }
   console.log('navigator.mediaDevices.getUserMedia', navigator.mediaDevices.getUserMedia);
   if(navigator.mediaDevices.getUserMedia == undefined) {
     navigator.mediaDevices.getUserMedia = window.promisifiedOldGUM;
   }
   window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
   if(match[1] == 'chrome' && match[2]){
     version = match[2];
   }
   if(navigator.vendor != 'Google Inc.' || (version && parseInt(version) <42)){
   }else if(navigator.mediaDevices.getUserMedia){
     navigator.mediaDevices.getUserMedia({
         video:true
       }).then(function(stream){
         self.successCallback(stream);
       }).catch(function(err){
     });
   }else{
   }
 };

 /** [successCallback 获取摄像头后的回调函数] */
 successCallback(stream){
   window._assessmentStreamRef = stream;
   window.openGamera  = true;
   var video = this.video;
   video.height=342;
   video.width = 467;
   if(typeof video.srcObject !== 'undefined'){
     video.srcObject = stream;
   }else if(video.mozSrcObject!==undefined){
     video.mozSrcObject = stream;
   }else{
     video.src = (window.URL&&window.URL.createObjectURL(stream))||stream;
   }
   video.play();
   this.setState({ video });
 };
  /** [takePicture 拍照并显示在canvas中] */
  takePicture(){
    let video = this.state.video;
    var canvas=this.canvas;
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 467, 342);

    let src = canvas.toDataURL('image/png'); // base64
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
               <Title>拍照</Title>
               <Icon onClick={this.handleClose} type='close' width='20px' height='20px' fill='#FFFFFF'/>
             </Header>
             <Body>
                 {
                   <Canvas innerRef={ref => {this.canvas = ref}} display={0} width='570' height='535'></Canvas>
                 }
               <Video id='video' innerRef={ref => {this.video = ref}}>您的浏览器不支持 video 标签。</Video>
               <ActionButton onClick={this.takePicture}>
                 <Icon type='camera' width='30px' height='30px' fill="#ffffff"/>
               </ActionButton>
             </Body>
           </Container>
         </StyledModal>
    );
  }
}
const StyledModal = styled(Modal)`
  ${StyReactModal.windowModal}
`;
const Container = styled.div`
  background-color: rgba(242, 242, 242, 1);
  border-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  width: 500px;
`;
const Header = styled.div`
  border-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  height: 40px;
  background-color: rgba(10, 110, 203, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px
`;
const Title = styled.span`
  color: #FFFFFF;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 452px;
  padding: 15px;
`;
const Video = styled.video`
  z-index: 2000;
`;
const Canvas = styled.canvas`
  z-index: 2001;
  display: ${props => props.display == 0 ? 'none' : 'block'}
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2002;
`;
const ActionButton = styled.div`
  width: 71px;
  height: 71px;
  cursor: pointer;
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
