/*
@作者：马奔
@日期：2018-10-26
@描述：权限预览模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import Prescriptionauthorization from '../prescriptionauthorization'
import Roleauthoritymodule from '../roleauthoritymodule'

export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      rcStatus:1,
      islook:1,     // 控制是操作还是预览
      id:this.props.id,
      userid:this.props.userid  , //展示或者操作时候当前用户的id
    };
  };
  componentWillMount(){
  };
  /** [toggleTabs 点击样式切换] */
  toggleTabs(curTab){
    this.setState({
      rcStatus: curTab
    });
  };
  render(){
    let { rcStatus ,islook,id}=this.state;
    return(
      <Container>
        <Header>
            <span style={{color:'#000',margin:'0px 5px'}}>▶</span>
            <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(1)}>角色设置</span>
            <span style={{color:'#000',margin:'0px 5px'}}> ＞ </span>
            <span>权限预览</span>
        </Header>
        <Body>
          <Tab>
            <TabPanes activeTabs={rcStatus} _key={1} onClick={(e) => this.toggleTabs(1)}>操作权限</TabPanes>
            <TabPanes activeTabs={rcStatus} _key={2} onClick={(e) => this.toggleTabs(2)}>处方权限</TabPanes>
          </Tab>
          {rcStatus==1?
            <Roleauthoritymodule islook={islook} id={id}/>
          :
            <Prescriptionauthorization islook={islook} id={id}/>
          }
        </Body>

      </Container>
    )
  }
}
const Container = styled.div`
  width:100%;
  overflow: hidden;
  height: calc(100vh - 100px);
`;
const Header = styled.div `
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: rgb(242,242,242);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.349019607843137);
`;
const Body =styled.div`
  width:100%;
  height: 600px;

`
const Tab =styled.div`
  height:27px;
  width:100%;
  border-bottom:1px solid #0a6ecb;
  display:flex;
  margin: 10px 10px 0px 10px;
`
const TabPanes =styled.div`
  height:27px;
  width:90px;
  line-height: 27px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #0a6ecb;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-left: 10px;
  background-color:${props => props.activeTabs == props._key ? '#0a6ecb': '#fff'} ;
  color: ${props => props.activeTabs == props._key ? '#fff': '#0a6ecb'} ;
  cursor: pointer;
`
