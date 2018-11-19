import React, { Component } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import BLClassify from './bl';  //病历分类
import YZClassify from './yz';  //医嘱分类
import BLTmp from './blTmp';  //病历模板
// import WrapperWriteMedicalRecords from 'roots/layout/body/treatment/treatItem/writeMedicalRecords';
import YZTmp from './yzTmp';  //医嘱模板

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'bl',
      currentTmp: 'fl', //共三个值 bl 病历 yz 医嘱 fl 分类(classify)： 默认状态
      paramData: {},  //获取模板时使用的参数
      tmpName: "",  //模板名称
      optType: "",  //模板操作类型, check edit delete create
      tmpClassify: {},  //当前选中树节点数据的建议版
    };
  }

  handleClassifyClick = (e) => {
    this.setState({ current: e.key })
  }

  /**
   * type 需要展示的模板,
   * paramData 请求模板的参数,
   * tmpName 模板名称,
   * optType 操作类型
   */
  handleTmpClick = (type, paramData, tmpName, optType, tmpClassify) => {
    this.setState({ currentTmp: type ? type : 'fl', paramData: paramData, tmpName: tmpName, optType: optType, tmpClassify: tmpClassify })
  }

  render() {
    const { current, currentTmp, paramData, tmpName, optType, tmpClassify } = this.state;
    return (
      <div>
        {(currentTmp == 'fl') && <Container>
          <Title>
              <Header>
                <MenuStyle
                  onClick={this.handleClassifyClick}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                >
                  <Menu.Item key="bl">病历模板</Menu.Item>
                  <Menu.Item key="yz">医嘱模板</Menu.Item>
                </MenuStyle>
              </Header>
            <Center>
              {(current == 'bl') && <BLClassify openTmp={this.handleTmpClick} />}
              {(current == 'yz') && <YZClassify openTmp={this.handleTmpClick} />}
            </Center>
            <PageContainer>
              <p>共15个诊疗单模板，其中平台共享模板10个，庆阳中医馆共享模板3个，我的模板2个</p>
            </PageContainer>
          </Title>
        </Container>}
        {(current == 'bl' && currentTmp == 'bl') && <BLTmp openTmp={this.handleTmpClick} paramData={paramData} tmpName={tmpName} optType={optType} tmpClassify={tmpClassify} />}
        {(current == 'yz' && currentTmp == 'yz') && <YZTmp openTmp={this.handleTmpClick} paramData={paramData} tmpName={tmpName} optType={optType} tmpClassify={tmpClassify} />}
      </div>
    );
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;
const Title = styled.div`
  height: 100%;
  width: 100%;
`;
const Header = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(242, 242, 242, 1);
  padding: 0px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 1px 1px 5px;
`;
const Center = styled.div`
  width: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  height: calc(100% - 110px);
  position: relative;
  padding: 0px 20px;
  border-bottom: 1px solid rgba(242, 242, 242, 1);
`;
const MenuStyle = styled(Menu) `
  &&&.ant-menu {
    background: rgba(242, 242, 242, 1);
`;
const Left = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  height: calc(100% - 120px);
  overflow: scroll;
  position: relative;
`;

const PageContainer = styled.div`
  width: 100%;
  float: left;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
`;

/**
@作者：杨腊梅
@日期：2018-10-22
@描述：模板管理
*/