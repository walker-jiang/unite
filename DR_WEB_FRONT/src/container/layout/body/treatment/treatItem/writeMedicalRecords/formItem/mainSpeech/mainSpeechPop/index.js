import React, {Component} from 'react';
import styled from 'styled-components';
import { Tag, Input } from 'antd';
import TextareaEnterPop from 'components/dr/textareaEnterPop';
import Loading from 'components/dr/loading';
import SimplePop from './simplePop';
import Icon from 'components/dr/icon';
import TipModal from 'components/dr/modal/tip';
import inputSty from 'components/antd/style/input';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import IllHisEnterPop from '../../illHistory/illHisEnterPop';
// import HocKeyFunc from './hocKeyFunc';

export default class MainSpeech extends IllHisEnterPop {
  constructor(props){
    super(props);
    this.simplePopSure = this.simplePopSure.bind(this);
  };
  /**
   * [selectText 选中某行文本接下来要显示弹框填写持续时间]
   * @param  {[type]} text [选中行文本]
   * @param  {[type]} curLine [选中行行标]
   * @return {[type]}      [undefined]
   */
  selectText = (item, curLine) => {
    let text = item.itemcontent;
    if(curLine){
      this.setState({ // 点击选中维护当前游标
        visibleChild: true,
        curLine: curLine
      })
    }else{ // 键盘enter当前游标已改
      this.setState({
        visibleChild: true
      })
    }
    let pre_text = typeof(this.props.value) == 'string' ? this.props.value + '；' : this.props.value.extractionData;
    // 去重校验
    let repeat_item_text = this.validateRepeat(pre_text, text);
    if(repeat_item_text){
      this.tipModal.showModal({
        content: '已存在，请勿重复添加！',
        stressContent: repeat_item_text
      });
    }else{
      this.simplePop.handleOpen(text); // 打开时间框
      this.maintainTags(item.id);
    }
  };
  /**
   * [simplePopSure 时间确定按钮点击后触发的函数]
   * @param  {[type]} primarySym [主症文本]
   * @param  {[type]} time       [时间]
   * @return {[type]}            [undefined]
   */
  simplePopSure(primarySym, time, unit){
    this.PopComponent.handleClose(); // 关闭本弹框
    let pre_text = typeof(this.props.value) == 'string' ? this.props.value + '；' : this.props.value.extractionData;
    pre_text += (primarySym + '持续' + time + unit );
    pre_text += '；';
    this.props.onChange({originData: [], extractionData: pre_text}); // 改变主诉表单项的值
  };
  /**
 * [validateRepeat 重复性校验]
 * @param  {[type]} pre_text [之前的文本]
 * @param  {[type]} e        [当前文本]
 * @return {[type]} string         [重复的文本]
 */
validateRepeat(pre_text, e){
  let pre_text_arr = pre_text.replace(/、/, '；').split('；');
  let repeat_item_text = '';
  let cur_text_arr = e.split('、');
  cur_text_arr.forEach(cur_item => {
    pre_text_arr.forEach(pre_item => {
      if(pre_item.indexOf('持续') > 0){
        if(cur_item === pre_item.substr(0, pre_item.indexOf('持续'))){
          repeat_item_text = cur_item;
          return;
        }
      }else{
        if(cur_item === pre_item){
          repeat_item_text = cur_item;
          return;
        }
      }
    });
  });
  return repeat_item_text;
};
  render() {
    return(
      <div>
        <SimplePop ref={ref=>this.simplePop = ref} onOk={this.simplePopSure} returnFocus={()=>{ this.input.focus() }}/>
        {super.render()}
      </div>
    )
  }
}
/*
@作者：姜中希
@日期：2018-07-06
@描述：主诉组件，包含主诉输入框和弹框，弹框提供子元素即可
*/
// export default class MainSpeech;
