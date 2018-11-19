import React, {Component} from 'react';
import TextareaEnterPop from 'components/dr/textareaEnterPop';
import PopContent from './popContent';

export default class illHisEnterPop extends PopContent{

  render(){
    return(
      <TextareaEnterPop formItemProps={this.props} ref={ref=>this.PopComponent = ref} fixed_left={0}>
      {super.render()}
      </TextareaEnterPop>
    )
  }
}
