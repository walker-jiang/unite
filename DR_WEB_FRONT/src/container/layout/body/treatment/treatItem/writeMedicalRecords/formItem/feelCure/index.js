import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import FeelTags from './feelTags';
import Icon from 'components/dr/icon';
import Input from 'components/dr/input/basicInput';

const FormItem = Form.Item;

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      expand: false, // 是否展开
    };
    this.feelTagsClick = this.feelTagsClick.bind(this);
  };
  /**
   * [expand 点击左侧下标触发展开或者收缩按钮]
   * @param  {[type]} e      [事件源]
   * @param  {[type]} status [状态]
   * @return {[type]}        [undefined]
   */
  expand(e, status){
    this.setState({
      expand: status
    });
    if(status){ // 同时收起左侧悬浮框
      this.props.hideObseverCure(e, 'observeCure');
    }
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  /**
   * [observeTagsClick 点击切诊小标签触发的选中函数]
   * @param  {[type]} tongueCoated [舌苔]
   * @param  {[type]} tongueShape  [舌质]
   * @return {[type]}              [undefined]
   */
  feelTagsClick(left, right){ // 将选中的标签插入输入行
    let leftText = []; // 左脉象文本
    left.forEach((item, index)=>{
      leftText.push(item.name);
    });
    let rightText = []; // 右脉象文本
    right.forEach((item, index)=>{
      rightText.push(item.name);
    });

    let text = left.length ? '左脉象（' : '';
    text += leftText.join('、')
    text += leftText.length ? '）' : '';
    text += ( leftText.length&&rightText.length ) ? '；' : '';
    text += rightText.length ? '右脉象（' : '';
    text += rightText.join('、')
    text += rightText.length ? '）' : '';

    let buPatcasPulconLeftList = left;
    let buPatcasPulconRightList = right;
    let originData = { buPatcasPulconLeftList, buPatcasPulconRightList};
    this.props.setFieldsValue({ palpation: text});
  };
  handleEnterPress = (e) => {
    let expand = this.state.expand;
    if(e.keyCode == 13){ // tab键
      this.expand(e, !expand);
    }
    if(e.keyCode == 9){ // tab键
      this.expand(e, false);
    }
  }
  render() {
    const { getFieldDecorator, formItemLayout, initialValue} = this.props;
    let expand = this.state.expand;
    return (
      <SpecRow>
        <SpecCol span={3}>
          <Arrow type={expand ? 'up-circle' : 'down-circle'} onClick={(e)=>this.expand(e, !expand)}/>
          <span>切诊：</span>
        </SpecCol>
        <Col span={21}>
          <SpecFormItem>
          {getFieldDecorator('palpation', {
            initialValue: initialValue
          })(
            <Input onClick={(e)=>this.expand(e, !expand)} onKeyDown={this.handleEnterPress} innerRef={ref => {this.input = ref}}/>
          )}
          <FeelTags onClick={this.feelTagsClick} expand={expand}/>
          </SpecFormItem>
        </Col>
      </SpecRow>
    );
  }
}
const SpecRow = styled(Row)`
`;
const Arrow= styled(Icon)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  fill: #0A6ECB;
  margin-top: 5px;
`;
const SpecCol = styled(Col)`
  &&& {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
  }
  font-size: 12px;
  height: 35px;
`;
const SpecFormItem = styled(FormItem)`
  .ant-form-item-control {
    line-height: 30px;
  }
`;
/*
@作者：姜中希
@日期：2018-09-03
@描述：诊疗单表单切诊表单项
*/
