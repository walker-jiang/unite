import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Button } from 'antd';
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
    this.retake = this.retake.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getPicture = this.getPicture.bind(this);
  };
  /** [getCameraDevice 开启摄像头] */
  getCameraDevice(){
    var constraints = {video: { width: 1366, height: 768 } };
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
    var canvas=this.canvas;
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 1280, 650);
    this.setState({ status: 1 });
  };
  /** [retake 重新拍照] */
  retake(){
    this.setState({ status: 0 });
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
  /** [getPicture 获取canvas中的图片] */
  getPicture(){
    var canvas=this.canvas;
    let src = canvas.toDataURL('image/png');
    this.props.returPicture(src);
    this.handleClose();
  };
  render() {
    let { status, visible } = this.state;
    return (
        <Modal
           isOpen={visible}
           style={modalStyle}
           ariaHideApp={false}>
           <Video innerRef={ref => {this.video = ref}}>您的浏览器不支持 video 标签。</Video>
           <Canvas innerRef={ref => {this.canvas = ref}} display={status} width='1280' height='650'></Canvas>
           {
             status ?
             <Footer>
               <ActionButton onClick={this.retake}>重拍</ActionButton>
               <ActionButton onClick={this.getPicture}>确定</ActionButton>
             </Footer>
             :
             <Footer>
               <CameraIcon type='camera_action' onClick={this.takePicture}/>
               <ActionButton onClick={this.handleClose}>取消</ActionButton>
             </Footer>
           }
         </Modal>
    );
  }
}
const Container = styled.div`
  background-color: rgba(0,0,0,0.3);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  z-index: 1999;
`;
const modalStyle = {
   overlay: {
     position: 'fixed',
     top: 0,
     left: 0,
     zIndex: 1999,
     padding: '0px',
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
     overflow: 'hidden',
     border: 'none',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     outline: 'none',
   }
 };
const Video = styled.video`
  position: absolute;
  z-index: 2000;
`;
const Canvas = styled.canvas`
  position: absolute;
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
const model = `
  width: 40px;
  height: 40px;
  background-color: #e4d5d5;
  padding: 5px;
  border-radius: 50%;
  margin: 10px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  &:hover {
    background-color: #FFFFFF;
  }
`;
const CameraIcon = styled(Icon)`${model}`;
const ActionButton = styled.div`${model}`;
/*
@作者：姜中希
@日期：2018-06-26
@描述：日期选择框， 圆形边框，右侧查询按钮
*/
