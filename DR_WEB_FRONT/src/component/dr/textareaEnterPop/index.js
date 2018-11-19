import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Popout from 'components/popout/basePop';
import Icon from 'components/dr/icon';
export default class TextareaEnterPop extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false, // 弹框是否可见
    };
    this.handleClose = this.handleClose.bind(this);
  };
  /**
   * [handleKeyPress 键盘enter弹框ESC关闭弹框]
   * @param  {[type]} keyCode [键盘码]
   * @return {[type]}         [undefined]
   */
  handleKeyPress(e){
    if(e.keyCode === 13 && e.ctrlKey){ // enter + ctrl
      this.setState({visible:true});
      // this.props.displayed(this.props.formItemProps.title); // 通知父组件已显示弹框
    }
    if(e.keyCode == 13){ // enter 右侧联动
      if(this.props.formItemProps.onKeyDown){
        this.props.formItemProps.onKeyDown();
        e.preventDefault(); // 阻止回车话那换行事件
        return false;
      }
    }
    if(e.keyCode == 27){ // ESC
      this.setState({visible:false});
    }
  };
  /** [handleClose 弹框关闭事件] */
  handleClose(){
    this.setState({visible: false});
  };
  render() {
    let { fixed_left = 1, formItemProps: { value, title , ...other } } = this.props; // 表单属性
    let { visible } = this.state;
    return (
      <Container>
        <Textarea {...other} value={typeof(value) == 'string' ? value: value.extractionData} onKeyDown={(e) => { this.handleKeyPress(e) }} >
        </Textarea>
        <Sign type='search' fill='#C6C6C6' onClick={() => {this.setState({visible: true})}}></Sign>
        <Popout visible={visible} title ={title} onClose={this.handleClose} fixed_left={fixed_left}>
          {this.props.children}
        </Popout>
      </Container>
    );
  }
}
const Container = styled.div`
  position: relative;
`;
const Sign = styled(Icon)`
  position: absolute;
  right: -20px;
  top: 5px;
  width: 20px;
  height: 20px;
`;
const Textarea = styled.textarea`
  font-size: 12px;
  width: 100%;
  line-height: 20px;
  border: 1px solid rgb(215, 215, 215);
  color: #000000;
  &:disabled {
    background-color: #FFFFFF;
  }
  @media (max-height: 768px) {
    height: 40px !important;
  }
  @media (min-height: 768px) {
    height: 50px !important;
  }
  &:focus {
    outline: none
  }
`;
TextareaEnterPop.proptypes = {
  left: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}
/*
@作者：姜中希
@日期：2018-06-26
@描述：自定义一个文本域组件，使用原生textarea
*/
