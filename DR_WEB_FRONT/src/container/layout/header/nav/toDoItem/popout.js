import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dot from './img/blue_dot.png';
import BasePopout from 'components/popout/base3DPop';

export default class Popout extends Component {
  render() {
    /** @type {visible} [提供布尔类型的值表示弹框的现隐] */
    let {visible = true,  onClose} =  this.props;
    return (
      <BasePopout visible={visible} title='待办事项' onClose={()=>{onClose()}}>
        <Container>
          <Line>
            <img src={dot} />
            <Info>您有
              <Number>1</Number>个患者需要签约
              <Link>立即签约</Link>
            </Info>
          </Line>
          <Line>
            <img src={dot}/>
            <Info>您有
              <Number>2</Number>个来自
              <Stress>东四十条卫生院</Stress>的转诊病人待接收
              <Link>立即接收</Link>
            </Info>
          </Line>
          <Line>
            <img src={dot} />
            <Info>您有
              <Number>3</Number>个患者有开药申请
              <Link>立即处理</Link>
            </Info>
          </Line>
          <Line>
            <img src={dot} />
            <Info>模板设置 -
              <Stress>设置您常用的诊疗模板，为诊疗提供快捷服务</Stress>
              <Link>立即设置</Link>
            </Info>
          </Line>
        </Container>
      </BasePopout>
    );
  }
}
const Container = styled.ul`
  font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
  color: black;
  list-style: none;
  font-size: 13px;
  padding-left: 20px;
`;
const Line = styled.li`
  height: 40px;
  display: flex;
  align-items: center
`;
const Info = styled.span`
  padding: 0px 20px;
`;
const Number = styled.span`
  color: #FF3300
`;
const Link = styled.a`
  padding-left: 30px
`;
const Stress = styled.span`
  color: #17C6B4
`;
Popout.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
/*
@作者：姜中希
@日期：2018-06-06
@描述：自定义一个弹框待办事项组件， 被base3DPop弹框包装，主要是作为子组件提供内容
*/
