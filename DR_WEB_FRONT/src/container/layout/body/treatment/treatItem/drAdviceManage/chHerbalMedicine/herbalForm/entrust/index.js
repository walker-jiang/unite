import React, {Component} from 'react';
import styled from 'styled-components';
import { Tag, Input, Button } from 'antd';
import InputEnterPop from 'components/dr/input/enterPopInput';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const { TextArea } = Input;

export default class CurePriciple extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
    };
    this.changeValue = this.changeValue.bind(this);
    this.handleSave = this.handleSave.bind(this);
  };
  changeValue(e){
    if(this.state.value.trim() != e.target.value.trim()){
      this.setState({
        value: e.target.value
      });
    }
  };
  handleSave(e){
    this.props.onChange({originData: [], extractionData: this.state.value});
    this.inputEnterPop.handleClose();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  render() {
    let formItemProps = this.props;
    let { value } = this.state;
    return (
      <InputEnterPop hbgColor='rgb(178, 20, 20)' icon_type='red' displayed = {() => {}} formItemProps={formItemProps} ref={ref=>this.inputEnterPop = ref} title='添加嘱托' type='edit'>
        <Editor
          value={value}
          autoFocus='autofocus'
          ref={ref => this.textarea = ref}
          className='not-draggable'
          rows={6}
          onChange={this.changeValue}>
        </Editor>
        <Footer>
          <SureButton type="primary" onClick={this.handleSave}>确定</SureButton>
          <CancelButton type="primary" onClick={()=>{this.inputEnterPop.handleClose()}}>取消</CancelButton>
        </Footer>
      </InputEnterPop>
    );
  }
}
const Editor = styled.textarea`
  &&& {
    width: 400px;
    max-width: 400px;
  }
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
  background-color: rgb(178,20,20) !important;
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
  color: rgb(178,20,20) !important;
`;
/*
@作者：姜中希
@日期：2018-07-09
@描述：嘱托组件，包含文本编辑框
*/
