import React, {Component} from 'react';
import styled from 'styled-components';
import Popout from 'components/popout/basePop';
import { Button } from 'antd';
import buttonSty from 'components/antd/style/button';
import InteligentTreat from '../../../drAdviceManage/InteligentTreat/index.js';

export default class CreateScheme extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false
    };
  };
  /** [handleClose 关闭本弹框] */
  handleClose(){ // 关闭本弹框
    this.setState({visible: false});
  };
  /** [handleOk 点击确定关闭本弹框并打开智能诊疗弹框] */
  handleOk(){ //
    this.inteligentTreat.handlePopOpen();
  };
  /** [handleOpen 打开本弹框] */
  handleOpen(){
    this.setState({visible: true});
  };
  render() {
    let { visible } =  this.state;
    return (
      <div>
        <Popout visible={visible} title='系统操作提示' onClose={()=>{this.handleClose()}}>
          <Body>
            <Tip>
              <Search>
                🔍
              </Search>
              <span>系统已经为您推送了
                <Stress>
                  19
                </Stress>
                个可靠治疗方案，是否立即查看？
              </span>
            </Tip>
            <div>
              <SureButton type="primary" onClick={()=>{this.handleOk()}}>立即查看</SureButton>
              <CancelButton type="primary" onClick={()=>{this.handleClose()}}>以后再说</CancelButton>
            </div>
          </Body>
        </Popout>
        <InteligentTreat ref={ref=>{this.inteligentTreat = ref}}/>
        <SmartCure ref={ref=>this.smartCure = ref}/>
      </div>

    );
  }
}
const Body = styled.div`
  width: 510px;
  height: 256px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center
`;
const Tip = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  font-size: 20;
  font-weight: 400
`;
const Search = styled.span`
  font-size: 50px;
  transform: rotateY(180deg);
  margin-right: 20px;
`;
const Stress = styled.span`
  color: red
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
/*
@作者：姜中希
@日期：2018-07-02
@描述：是否推荐可靠治疗方案
*/
