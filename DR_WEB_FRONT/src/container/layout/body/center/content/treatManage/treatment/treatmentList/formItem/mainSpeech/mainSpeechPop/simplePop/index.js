
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, InputNumber, Row, Col } from 'antd';
import Modal from 'react-modal';
import buttonSty from 'components/antd/style/button';

export default class SimplePop extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: '',
      primarySym: '' , // 选中的主症
      visible: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOK = this.handleOK.bind(this);
  };
  /** [handleClose 本弹框的取消事件] */
  handleClose(e){
    this.setState({visible: false});
    this.props.returnFocus(); // 返回焦点
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  /** [handleOpen 本弹框的打开事件] */
  handleOpen(text){
    this.setState({visible: true, primarySym: text});
  };
  /** [handleOK 本弹框点击确定按钮的提交事件] */
  handleOK(){
    this.setState({visible: false});
    this.props.onOk(this.state.primarySym, this.state.time);
  };
  /** [handleInput 时间输入事件] */
  handleInput(e){
    this.setState({time: e.target.value});
  };
  /** [handleEnterPress 包括enter显示，esc隐藏的判断函数] */
  handleEnterPress = (e) => {
    if(e.keyCode == 13){ // enter
      this.handleOK(e);
      e.preventDefault();// 阻止冒泡
      return false;
    }
    if(e.keyCode == 27){ // ESC
      this.handleClose(e);
      e.preventDefault();// 阻止冒泡
      return false;
    }
  };
  render() {
    let { visible, primarySym } = this.state;
    return (
    <div>
      {
        !!visible ?
        <Container onKeyDown={this.handleEnterPress}>
          <Body>
            <Line>
              <Title span={6}>主症：</Title>
              <Text span={18}>{primarySym}</Text>
            </Line>
            <Line>
              <Title span={6}>持续时间(天)：</Title>
              <Col span={18}>
                <InputDom className='not-draggable' autoFocus='autofocus' onChange={(e)=>{this.handleInput(e)}}/>
              </Col>
            </Line>
            <Row>
              <Col span={6} offset={5}>
                <SureButton type="primary" onClick={this.handleOK}>确定</SureButton>
              </Col>
              <Col span={6} offset={2}>
                <CancelButton type="primary" onClick={this.handleClose}>取消</CancelButton>
              </Col>
            </Row>
          </Body>
        </Container>
        : null
      }
    </div>
    );
  }
}
const modalStyle = {
   overlay: {
     position: 'fixed',
     top: 0,
     left: 0,
     width: '100vw',
     height: '100vh',
     backgroundColor: 'rgba(0, 0, 0, 0.2)'
   },
   content: {
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
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  font-size: 12px;
  z-index: 5;
  font-family: 'MicrosoftYaHei', '微软雅黑';
  justify-content: center
`;
const Body = styled.div`
  width: 380px;
  height: 131px;
  background-color:rgba(242, 242, 242, 1);
  padding: 10px 20px;
  display: flex;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
  flex-direction: column;
  justify-content: space-around
`;
const Line = styled(Row)`
  display: flex !important;
  align-items: center;
`;
const Title = styled(Col)`
  text-align: right;
  white-space: nowrap;
  color: #666666 !important;
`;
const Text = styled(Col)`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InputDom = styled(InputNumber)`
  border-radius: 15px !important;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.white}
`;
SimplePop.propsTypes = {
  primarySym: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
/*
@作者：姜中希
@日期：2018-06-28
@描述：自定义一个简单弹框组件
*/
