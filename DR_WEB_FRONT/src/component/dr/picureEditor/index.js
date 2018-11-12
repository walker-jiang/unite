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
      scale: 0.6, //图片放缩
      src: '', // 图片路径
      position: { x: 0.5, y: 0.5 },
    };
    this.handleClose = this.handleClose.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.retakePicture = this.retakePicture.bind(this);
  };
  /** [handleOpen 打开编辑组件] */
  handleOpen(src){
    this.setState({ visible: true, src, scale: 0.8 });
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
  retakePicture(){
    this.handleClose();
    this.props.retakePicture();
  }; 
  uploadPicture(){
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()
      let src = canvas.toDataURL('image/png');
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
          self.handleClose();
          self.props.getUrl(src);
          // self.props.getUrl(res.data.url);
        }else{
          self.saveTip.showModal(3);
          console.log('异常响应信息', res);
        }
      };
      ajaxGetResource(params, callBack);
    }     
  };
  handlePositionChange = position => {
    this.setState({ position })
  }
  render() {
    let { scale, visible, src } = this.state;
    return (
        <StyledModal
           className="Modal"
           overlayClassName="Overlay"
           isOpen={visible}
           ariaHideApp={false}>
           <Container>
             <Header>
               <Title>预览</Title>
               <Icon onClick={this.handleClose} type='close' width='20px' height='20px' fill='#FFFFFF'/>
             </Header>
             <Body>
               <Editor>
                 <AreaBorder>
                   <AvatarEditor
                     ref = { ref => this.editor = ref}
                     image={src}
                     width={250}
                    height={250}
                    border={50}
                    position={this.state.position}
              onPositionChange={this.handlePositionChange}
                     color={[255, 255, 255, 0.6]} // RGBA
                     scale={scale}>
                   </AvatarEditor>
                 </AreaBorder>
                 <ScaleButton>
                   <OpeBtn onClick={() => this.scaleHandle('+')}>+</OpeBtn>
                   <OpeBtn onClick={() => this.scaleHandle('-')}>-</OpeBtn>
                   <span>{scale*100}</span>
                 </ScaleButton>
               </Editor>
               <ActionButton>
                 <SaveButton type='primary' onClick={this.uploadPicture}>保存</SaveButton>
                 <RefreshButton type='primary' onClick={this.retakePicture}>重新拍照</RefreshButton>
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
  border-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  width: 500px;
`;
const StyledModal = styled(Modal)`
${StyReactModal.windowModal}
`;
const Body = styled.div`
  height: 452px;
  padding: 15px;
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
const CloseIcon = styled(Icon)`
  border-radius: 50%;
  padding: 5px;
  background-color: #0A6ECB;
  margin-right: -15px;
`;
const AreaBorder = styled.div`
  border: 1px dashed #D7D7D7;
  width: 340px;
  height: 340px;
`;
const Editor = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ScaleButton = styled.div`
  color: white;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #d0b1b1;
`;
const OpeBtn = styled.div`
  cursor: pointer;
  background-color: #F2F2F2;
  float: left;
  margin: 10px;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
`;
const ActionButton = styled.div`
  height: 80px;
  margin: 13px 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const SaveButton = styled(Button)`
  ${StyButton.semicircle}
`;
const RefreshButton = styled(Button)`
  ${StyButton.gray}
`;

/*
@作者：姜中希
@日期：2018-09-28
@描述：图片修剪组件
*/
