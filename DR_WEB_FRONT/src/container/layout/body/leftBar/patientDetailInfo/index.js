import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Popout from 'components/popout/basePop';
import Body from './InfoForm';

class InputSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
  };
  handleClose(){
    this.setState({visible: false});
  };
  handleOpen(){
    this.setState({visible: true});
  };
  handleOk(patientid, registerid, patientname){
    this.handleClose();
    this.props.onOk(patientid, registerid, patientname);
  };
  render() {
    let { visible } = this.state;
    return (
      <Popout visible={visible} title ='患者基本信息' onClose={this.handleClose}>
        <Body onClose={this.handleClose} onOk={this.handleOk}></Body>
      </Popout>
    )
  }
}

/*
@作者：姜中希
@日期：2018-07-23
@描述：患者信息弹框组件
*/
export default withRouter(InputSelect);
