import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import styled from 'styled-components';
import Icon from 'components/dr/icon';

const RadioGroup = Radio.Group;

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
      }
    }
    onChange = (e) => {
        // console.log('radio checked', e.target.value);
        this.setState({
        value: e.target.value,
        });
    }  
  render() {
    let { value, ...other } = this.props; // 表单属性
    return (
      <div>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>初诊</Radio>
            <Radio value={2}>复诊</Radio>
        </RadioGroup>
        <InputWithLine {...other} value={value.extractionData} />
      </div>
    );
  }
}
const Sign = styled(Icon)`
  position: absolute;
  margin-left: -25px;
  width: 20px;
  margin-top: 10px;
`;
const InputWithLine = styled.div.attrs({
  type: 'text',
  autoComplete: 'off',
  placeholder: props => props.placeholder
})`
  border-bottom: 1px solid rgba(215, 215, 215, 1);
  border-top: none;
  width: 100%;
  border-left: none;
  line-height: 25px;
  color: black;
  border-right: none;
  background: transparent;
  margin-top: -4px;
  font-size: 12px;
  &:focus {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    outline: none
  }
`;
/*
@作者：王崇琨
@日期：2018-09-11
@描述：自定义一个单选，样式定制。
*/
