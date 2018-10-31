import React, {Component} from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';

import BLClassify from './bl';  //病历分类
import YZClassify from './yz';  //医嘱分类
import BLTmp from './blTmp';  //病历模板
import YZTmp from './yzTmp';  //医嘱模板

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'bl',
      currentTmp: 'fl', //共三个值 bl 病历 yz 医嘱 fl 分类(classify)： 默认状态
      paramData: {}
    };
  };

  handleClassifyClick = (e) => {
    this.setState({ current: e.key })
  }

  handleTmpClick = (type, paramData) => {
    this.setState({ currentTmp: type? type: 'fl', paramData: paramData })
  }

  render() {
    const { current, currentTmp, paramData } = this.state;
    return (
      <div>
        <Container>
          <Header>
            <Menuemtep>病例模板</Menuemtep>
            <Menuemtep>医嘱模板</Menuemtep>
          </Header>
        </Container>
        <div>
          {(currentTmp == 'fl') &&
            <div>
              <Menu
                onClick={this.handleClassifyClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
              >
                <Menu.Item key="bl">病历模板</Menu.Item>
                <Menu.Item key="yz">医嘱模板</Menu.Item>
              </Menu>
              {(current == 'bl') && <BLClassify newTmp={this.handleTmpClick}/>}
              {(current == 'yz') && <YZClassify newTmp={this.handleTmpClick}/>}
            </div>}
          {(current == 'bl' && currentTmp == 'bl') && <BLTmp newTmp={this.handleTmpClick} paramData={paramData}/>}
          {(current == 'yz' && currentTmp == 'yz') && <YZTmp newTmp={this.handleTmpClick} paramData={paramData}/>}
        </div>
      </div>
    );
  }
}

/*
@作者：杨腊梅
@日期：2018-10-22
@描述：模板管理
*/
