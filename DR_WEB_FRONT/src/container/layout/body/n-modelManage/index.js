import React, {Component} from 'react';
import styled from 'styled-components';
import { Button,Row, Col} from 'antd';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      rcStatus:0,
    };
  };
  toggleTabs(curTab){
    this.setState({
      rcStatus: curTab
    },() => {
      console.log(curTab)
    });
  };
  render() {
      let { rcStatus } = this.state;
    return (
      <Container>
        <Header>
          <TabPane activeTab={rcStatus} _key={0} onClick={(e) => this.toggleTabs(0)}>病例模板</TabPane>
          <TabPane activeTab={rcStatus} _key={1} onClick={(e) => this.toggleTabs(1)}>医嘱模板</TabPane>
        </Header>
        <Body>
          <ButBox>
             <ButtClass>+新建分类</ButtClass>
             <ButtModel>+新建模板</ButtModel>
          </ButBox>
          <Top>
            <Column span={7} className="first">模板管理</Column>
            <Column span={1}>名称</Column>
            <Column span={7}></Column>
            <Column span={3}>创建时间</Column>
            <Column span={3}>创建者</Column>
            <Column span={3}>操作</Column>
          </Top>
          <Subject>
               <Colu span={8} className="left">q</Colu>
               <Colu span={16}>w</Colu>
          </Subject>
        </Body>
     </Container>
    );
  }
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-left: 1px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  height: 67px;
  width: 100%;
  background-color: rgb(242,242,242);
  border-bottom: 1px solid #B9B9B9;
`;
const TabPane = styled.span`
  display: inline-block;
  height: 30px;
  word-wrap: normal;
  white-space: nowrap;
  font-weight: 400;
  line-height:27px;
  color: #000;
  font-size: 22px;
  margin: 0 20px;
  cursor: pointer;
  border-bottom: ${props => props.activeTab == props._key ? '2px solid #0066cc': 'none'} ;
`;
const Body = styled.div`
   width: 100%;
   height:607px;
   padding: 0 20px;
 `;
const ButBox = styled.div`
  width: 100%;
  height:50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
`
const ButtClass =styled.div`
  height:28px;
  width:100px;
  border-radius:70px;
  background-color:rgba(102, 204, 51, 1);
  font-weight: 400;
  font-size: 13px;
  text-align: center;
  line-height:28px;
  color:#fff;
  margin-right: 20px;
`
const ButtModel =styled.div`
  height:28px;
  width:100px;
  border-radius:70px;
  background-color:rgba(16, 141, 233, 1);
  font-weight: 400;
  font-size: 13px;
  color:#fff;
  text-align: center;
  line-height:28px;
`
const Top =styled(Row)`
  background-color: rgba(235, 235, 235, 1);
  width: 100%;
  margin-top: 10px;
`
const Column =styled(Col)`
  text-align: center;
  height: 28px;
  line-height: 28px;
  font-size:12px;
  color: rgb(101, 101, 101);
  &&&.first{
    text-align: left;
    padding-left: 20px;
  }
`
const Subject =styled(Row)`
  width: 100%;
  border-bottom: 1px solid #ccc;
`
const Colu =styled(Col)`
  height: 466px;
  &&&.left{
    border-right: 1px solid #ccc;
  }
`
/*
@作者：马奔
@日期：2018-10-16
@描述：模板管理
*/
