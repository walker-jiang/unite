import React, {Component} from 'react';
import styled from 'styled-components';
import InputEnterPop from 'components/dr/input/enterPopInput';
import PopContent from '../../illHistory/illHisEnterPop/popContent';
export default class SyndromePop extends PopContent {
  render() {
    return (
      <InputEnterPop icon_right='-20px' formItemProps={this.props} ref={ref=>this.PopComponent = ref} title='辩证要点' icon='#C6C6C6' fixed_left={0}>
      {super.render()}
      </InputEnterPop>
    );
  }
}
/*
@作者：姜中希
@日期：2018-07-09
@描述：辩证要点组件，包含输入框和弹框，弹框提供子元素即可
*/
