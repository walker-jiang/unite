import React, {Component, PropTypes} from 'react'; // react核心
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import finish from './finish.png';
import right from './right.png';

export default class Index extends Component {
  render() {

    return (
        <Container >
          <Finish src={finish} />
          <FinishTip>辩证论治已完成</FinishTip>
          <RightTip><Right src={right} />已确认诊断结果：（成功加入该患者诊断）</RightTip>
          <Line>感冒/风寒感冒</Line>
          <RightTip><Right src={right} />已确认治疗方案：（成功加入该患者医嘱）</RightTip>
          <Line>1.中药处方：</Line>
          <Line>&nbsp;&nbsp;&nbsp;&nbsp;药单：金银花10g、柴胡10g、栀子20g、枸杞10g、党参10g、黄芪20g</Line>
          <Line>&nbsp;&nbsp;&nbsp;&nbsp;用法/频次：口服/一日2次</Line>
          <Line>2.中成药处方：感冒清热颗粒 | 口服 | 1日2次</Line>
          <Line>3.中医适宜技术：适宜技术类型：针刺 |  取穴：大椎、合谷、风池</Line>
          <ActionButton>
            <SureButton type="primary" onClick={() => {this.props.onStep(3)}}>查看患者医嘱</SureButton>
            <BorderButton type="primary" onClick={() => {this.props.onStep(1)}}>选择其他文档</BorderButton>
          </ActionButton>
        </Container>
    )
  }
}

const Container = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Finish = styled.img`
  width: 73px;
  height: 79px;
`;
const FinishTip = styled.p`
  margin: 20px;
  font-weight: 650;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.847058823529412);
  line-height: 32px;
`;
const Right = styled.img`
  margin: 5px;
`;
const RightTip = styled.div`
  height: 28px;
  width: 450px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Line = styled.div`
  height: 28px;
  width: 450px;
  padding-left: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ActionButton = styled.div`
  margin-top: 40px;
`;
const BorderButton = styled(Button)`
  ${buttonSty.white}
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
/*
@作者：姜中希
@日期：2018-10-16
@描述：完成
*/
