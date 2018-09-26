import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import Icon from 'components/dr/icon';
import Loading from 'components/dr/loading';
import reactModalSty from 'components/reactModal';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      saved: 0, // 0 未保存， 1保存中， 2保存成功 3， 保存失败
    };
  };
  hideModal(){
    this.setState({
      visible: false
    });
  };
  showModal(status){
    this.setState({
      visible: true,
      saved: status
    }, () => { // 一段时间后消失
      if(status == 2 || status == 3){
        window.setTimeout(() => {
          this.setState({ visible: false });
        }, 1000);
      }
    });
  };
  render() {
    let { visible, saved } = this.state;
    return (
      <WindowModal
         className="Modal"
         overlayClassName="Overlay"
         isOpen={visible}
         ariaHideApp={false}>
         {
           saved == 1 ?
            <Loading loading={true} size='40px' info='正在保存数据，请稍后...'></Loading>
           : saved == 2 ?
           <SuccessTip>
             <SuccessIcon type='success' />保存成功！
           </SuccessTip> : (
             saved == 3 ?
             <SuccessTip>
               <FailIcon type='fail' />保存失败，请检查网络连接！
             </SuccessTip> : null
           )
         }
      </WindowModal>
    );
  }
}
const WindowModal = styled(ReactModal)`
  ${reactModalSty.windowModal}
`;
const SuccessTip = styled.div`
  background-color: #FFFFFF;
  width: 277px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;
const SuccessIcon = styled(Icon)`
  margin: 20px;
  width: 30px;
  height: 30px;
`;
const FailIcon = styled(Icon)`
  margin: 20px;
  width: 35px;
  height: 35px;
  fill: #e06f6f;
`;
/*
@作者：姜中希
@日期：2018-07-22
@描述：自定义一提示弹框，背景半透明，有边框阴影，提示内容通过函数传递
*/
