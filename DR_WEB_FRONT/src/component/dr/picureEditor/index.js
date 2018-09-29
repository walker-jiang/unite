import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Button } from 'antd';
import AvatarEditor from 'react-avatar-editor'
import StyReactModal from 'components/reactModal';
import Demo from './she.jpg';
import Icon from 'components/dr/icon';
import StyButton from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import SaveTip from 'components/dr/modal/saveTip';

export default class PictureEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false, // 可见性
      scale: 1, //图片放缩
      src: '', // 图片路径
    };
    this.handleClose = this.handleClose.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  };
  /** [handleOpen 打开编辑组件] */
  handleOpen(src){
    this.setState({ visible: true, src });
  };
  /** [handleClose 卸载编辑组件] */
  handleClose(){
    this.setState({ visible: false });
  };
  scaleHandle(ch){
    let scale = this.state.scale;
    if(ch == '+'){
      scale += 0.1;
    }
    if(ch == '-' && scale > 0){
      scale -= 0.1;
    }
    this.setState({ scale });
  };
  dataURLtoFile(dataurl, filename) {//将base64转换为文件      
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);      
    while(n--){          
      u8arr[n] = bstr.charCodeAt(n);      
    }      
    return new File([u8arr], filename, {type:mime});  
  }  
  uploadPicture(){
    let src = this.state.src;
    let file = this.dataURLtoFile(src, 'tougue.png');
    var formData = new FormData();
    formData.append('serviceType', 'casPhoto');
    formData.append('orguserid', window.sessionStorage.getItem('userid'));
    formData.append('cardno', window.cardno);
    formData.append('registerid', window.registerID);
    formData.append('clientFile', file);
    let self = this;
    this.saveTip.showModal(1);
    let params = {
      url: 'BaUploadController/upload',
      type: 'post',
      contentType: false,
      processData: false,
      data: formData,
    };
    function callBack(res){
      if(res.result && res.data){
        self.saveTip.showModal(2);
      }else{
        self.saveTip.showModal(3);
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  render() {
    let { scale, visible, src } = this.state;
    return (
        <StyledModal
           className="Modal"
           overlayClassName="Overlay"
           isOpen={visible}
           ariaHideApp={false}>
           <Container>
             <Body>
               <Header>
                 <Title type='primary'>保存舌苔图片</Title>
                 <CloseIcon onClick={this.handleClose} type='close' fill='#FFFFFF' width='30px' height='30px'/>
               </Header>
               <Editor>
                 <AvatarEditor
                   image={src}
                   width={350}
                   height={350}
                   border={50}
                   color={[255, 255, 255, 0.6]} // RGBA
                   scale={scale}
                   rotate={0}>
                 </AvatarEditor>
                 <ScaleButton>
                   <OpeBtn onClick={() => this.scaleHandle('+')}>+</OpeBtn>
                   <OpeBtn onClick={() => this.scaleHandle('-')}>-</OpeBtn>
                   <span>{scale*100}</span>
                 </ScaleButton>
               </Editor>
               <ActionButton onClick={this.uploadPicture}>
                 保存
               </ActionButton>
             </Body>
           </Container>
           <SaveTip ref={ ref => {this.saveTip = ref}}></SaveTip>
         </StyledModal>
    );
  }
}
const Container = styled.div`
  border: 2px solid #D1D1D1;
  background-color: #FFFFFF;
`;
const StyledModal = styled(Modal)`
${StyReactModal.windowModal}
`;
const Body = styled.div``;
const Header = styled.div`
  height: 40px;
  width: 450px;
  position: absolute;
  margin-top: -40px;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
`;
const Title = styled(Button)`
  ${StyButton.semicircle}
`;
const CloseIcon = styled(Icon)`
  border-radius: 50%;
  padding: 5px;
  background-color: #0A6ECB;
  margin-right: -15px;
`;
const Editor = styled.div`
  margin-top: 20px;
  position: relative;
  box-sizing: border-box;
  border: 3px groove #5de6d9;
`;
const ScaleButton = styled.div`
  position: absolute;
  color: white;
  top: 400px;
  left: 170px;
  display: flex;
  align-items: center;
  color: #d0b1b1;
`;
const OpeBtn = styled.div`
  cursor: pointer;
  background-color: #0A6ECB;
  float: left;
  margin: 5px;
  width: 37px;
  height: 37px;
  text-align: center;
  line-height: 37px;
  border-radius: 50%;
`;
const ActionButton = styled.div`
  width: 80px;
  height: 80px;
  margin: 13px auto;
  cursor: pointer;
  background: #0A6ECB;
  font-size: 20px;
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/*
@作者：姜中希
@日期：2018-09-28
@描述：图片修剪组件
*/
