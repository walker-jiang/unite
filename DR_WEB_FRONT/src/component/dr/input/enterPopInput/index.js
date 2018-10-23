import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from 'components/dr/icon';
import Popout from 'components/popout/basePop';

export default class InputSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      value: '', // 选中或者输入的值
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  };
  /** [handleEnterPress 包括enter显示，esc隐藏的判断函数] */
  handleEnterPress = (e) => {
    if(e.keyCode == 13){ // enter
      if(!this.props.formItemProps.disable){ // 诊断是否只读模式
        this.setState({visible:true});
        this.props.displayed(); // 通知父组件已显示弹框
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
  /** [handleOpen 弹框打开事件] */
  handleOpen(){
    this.setState({visible: true});
  };
  render() {
    let { visible } = this.state;
    let { icon = '#C6C6C6' , type = 'search', title = '标题', icon_right = '0px', hbgColor, icon_type, importability = true} = this.props;
    let { value, ...other } = this.props.formItemProps; // 表单属性
    if(!importability){
      other.onChange = (e) => {}
    }
    return (
      <Container >
        <Input {...other} value={value.extractionData} onKeyDown={this.handleEnterPress}/>
        <Search type={type} fill={icon} right={icon_right} onClick={()=>{this.handleEnterPress({keyCode: 13})}}/>
        <Popout visible={visible} title ={title} onClose={this.handleClose} hbgColor={hbgColor} icon_type={icon_type}>
          {this.props.children}
        </Popout>
      </Container>
    )
  }
}
const Container = styled.div`
  position: relative;
`;
const Search = styled(Icon)`
  width: 20px;
  height: 20px;
  position: absolute;
  cursor: pointer;
  right: ${props => props.right};
  top: 10px;
`;
const Input = styled.input.attrs({
  type: 'text',
  icon: 0,
  placeholder: props => props.placeholder
})`
  border-bottom: 1px solid rgba(215, 215, 215);
  border-top: none;
  border-left: none;
  border-right: none;
  line-height: 25px;
  color: black;
  width: 100%;
  background: transparent;
  margin-top: 10px;
  font-size: 12px;
  &:focus {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    outline: none
  }
`;
InputSelect.propTypes = {
  icon: PropTypes.string, // 右侧小搜索按钮的颜色
  type: PropTypes.string, // 右侧小按钮类型
  placeholder: PropTypes.string,
  title: PropTypes.string, // 标题
  displayed: PropTypes.func, // 弹框打开初始化数据
  formItemProps: PropTypes.object,
  icon_right: PropTypes.string, // 右侧小搜索的位置
  hbgColor:  PropTypes.string, //弹框背景颜色
  icon_type: PropTypes.string, //弹框按钮类型
  importability: PropTypes.bool, //舒入框是否允许输入
};
/*
@作者：姜中希
@日期：2018-08-10
@描述：
1.一个输入框组件，键入enter时会有弹框，ESC弹框关闭
2.根据提供的属性来判断是否提供弹框，具体属性请看proptypes
3.使用时结合antd form表单,src\container\layout\body\center\content\treatManage\treatment\drAdviceManage\chHerbalMedicine\diagnose\index.js
*/
