import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import Pan3D from './pan3D';
import buttonSty from 'components/antd/style/button';

export default class Popout extends Component {
  constructor(props){
    super(props);
    this.handleClose = this.handleClose.bind(this);
  };
  handleClose(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.onClose();
  };
  cancelHandle(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  render() {
    let {visible = true, children = null, title = '弹框标题'} = this.props;
    return (
      <div>
      {
        visible?
        (
          <Container visible={visible}>
            <Pannel onClick={this.cancelHandle}>
              <Header>
                <Pan3D title={title}/>
                <Button type="primary" shape='circle' icon='close' onClick={this.handleClose} className='popCloseBT'/>
              </Header>
              <div>
                {children}
              </div>
              <Footer>
                <SureButton type="primary" onClick={this.handleClose}>暂不处理，以后再说</SureButton>
              </Footer>
            </Pannel>
          </Container>
        ):
        null
      }
      </div>
    );
  }
}
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const Container = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  color: #FFFFFF;
  align-items: center
`;
const Pannel = styled.div`
  background: #ffffff;
  width: fit-content;
  min-width: 400px;
  z-index: 3
`;
const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
`;
const Footer = styled.div`
  height: 80px;
  border-top: 1px solid rgb(175, 232, 232);
  display: flex;
  justify-content: center;
  align-items: center
`;
Popout.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string
};
/*
@作者：姜中希
@日期：2018-06-06
@描述：自定义一个弹框组件， 只包含基础功能包括半透明背景，显示、隐藏的回调函数，
隐藏滚动条，一个3D效果的标题栏， 点击关闭按钮或者半透明背景或者动作按钮均可关闭弹框
子组件直接嵌套即可
*/
