import React, {Component, PropTypes} from 'react'; // react核心
import styled from 'styled-components';
import { Tag } from 'antd';
import Right from '../img/u1674.png';
import tagsSty from 'components/antd/style/tags';

export default class CheckableTag extends Component {
  constructor(props){
    super(props);
    this.state = {
      checkable: false
    };
  };
  handleTagClick(e, checkable){
    let { id = '' } = this.props;
    this.setState({
      checkable: !checkable
    });
    this.props.onClick(e.target.innerText, !checkable, id);
  };
  render() {
    let checkable = this.state.checkable;
    let { text, color, url = 'rong' } = this.props;
    let func = {};
    if(this.props.onClick){
      func.onClick = (e)=>this.handleTagClick(e, checkable);
    }
    if(this.props.onMouseEnter){
      func.onMouseEnter = (e) => {this.props.onMouseEnter(true, url)};
    }
    if(this.props.onMouseOut){
      func.onMouseOut = (e) => {this.props.onMouseOut()};
    }
    return (
      <SpecTag color={color} className={color} {...func} >
      {text}
      {checkable?<img src={Right} style={styles.clickable}/>:null}
      </SpecTag>
    )
  }
}
const styles  = {
  clickable: {
    position: 'absolute'
  }
}
const SpecTag = styled(Tag)`
  ${tagsSty.semicircle}
  img{
    position: absolute;
  }
`;
/*
@作者：姜中希
@日期：2018-06-28
@描述：自定义一个可选中的tag
*/
