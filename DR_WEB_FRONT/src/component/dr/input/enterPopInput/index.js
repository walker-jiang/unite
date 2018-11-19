import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from 'components/dr/icon';
import Popout from 'components/popout/basePop';
import BasicInput from '../basicInput';

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
    if(e.keyCode === 13 && e.ctrlKey){ // enter + ctrl
        if(!this.props.formItemProps.disable){ // 诊断是否只读模式
          this.setState({visible:true});
        }
    }
    if(e.keyCode == 13){ // enter 右侧联动
      if(this.props.formItemProps.onKeyDown){
        this.props.formItemProps.onKeyDown();
      }
      e.preventDefault(); // 阻止回车话那换行事件
      return false;
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
    let { icon = '#C6C6C6' , type = 'search', title = '标题', icon_right = '0px', hbgColor, icon_type, importability = true, fixed_left = 1} = this.props;
    let { value, ...other } = this.props.formItemProps; // 表单属性
    if(!importability){ //  去掉输入事件
      other.onChange = (e) => {}
    }
    return (
      <Container >
        <BasicInput {...other}  value={typeof(value) == 'string' ? value : value.extractionData} autoComplete="off" onKeyDown={this.handleEnterPress}/>
        <Search type={type} fill={icon} right={icon_right} onClick={()=>{this.setState({visible: true})}}/>
        <Popout visible={visible} title ={title} onClose={this.handleClose} hbgColor={hbgColor} icon_type={icon_type} fixed_left={fixed_left}>
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
