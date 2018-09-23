import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SettingFormNo from './settingFormNo';

export default class SystemSetting extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true
    };
  };
  toggle(){
    this.setState({
      visible: !this.state.visible
    });
  };
  render() {
    return (
      <Container>
          <ActiveItem>
            <Item>
              <Desc>
                <Title>系统选项</Title>
                <span>定义系统运行的的各种参数信息</span>
              </Desc>
              <a onClick={()=>{this.toggle()}}>
                收起
              </a>
            </Item>
            {
              this.state.visible ?
              <SettingFormNo></SettingFormNo>
              : null
            }
          </ActiveItem>
          <Item>
            <Desc>
              <Title>模板管理</Title>
              <span>可以卸载和安装系统应用模块</span>
            </Desc>
            <Link to='/systemOption/pim'>
              查看
            </Link>
          </Item>
          <Item>
            <Desc>
              <Title>系统版本</Title>
              <span>查看版本号，手动更新版本</span>
            </Desc>
            <Link to='/systemOption/pim'>
              查看
            </Link>
          </Item>
	    </Container>
    );
  }
}
const Container = styled.div`
  flex-grow: 1;
  border-top: 1px solid #999999;
  margin: 14px 131px 0px 25px ;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;
const Item = styled.div`
  width: 715px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid rgba(228, 228, 228, 1);
  height: 32px;
  margin-bottom: 10px;
`;
const ActiveItem = styled.div`
  padding-right: 25px;
  margin-right: -25px;
  border-right: 1px solid red;
  border-image: linear-gradient(to bottom, #CDCDCD, white) 10;
`;
const Desc = styled.div`
  display: flex;
`;
const Title = styled.div`
  color: rgb(51, 51, 51);
  margin-right: 50px;
`;
/*
@姜中希
@日期：2018-07-29
@描述：系统选项用户没有登录时系统设置界面
*/
