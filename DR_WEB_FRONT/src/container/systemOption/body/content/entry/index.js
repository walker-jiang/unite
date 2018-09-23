import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import head from './head.png';

export default class Entry extends Component {
  render() {
    return (
      <Container>
        <Left>
          <Label>机构编号：
            <Value>BJSZGUAN</Value>
          </Label>
          <Label>机构名称：
            <Value>北京永顺中医馆</Value>
          </Label>
          <Label>机构类型：
            <Value>中医馆</Value>
          </Label>
        </Left>
        <Center>
          <Item>
            <Desc>
              <Title>个人信息设置</Title>
              <span>修改和完善个人登录信息</span>
            </Desc>
            <Link to='/systemOption/pim'>
              编辑
            </Link>
          </Item>
          <Item>
            <Desc>
              <Title>修改密码</Title>
              <span>定期修改登录密码，减小密码泄露风险</span>
            </Desc>
            <Link to='/systemOption/pim'>
              编辑
            </Link>
          </Item>
          <Item>
            <Desc>
              <Title>系统选项</Title>
              <span>定义系统运行的的各种参数信息</span>
            </Desc>
            <Link to='/systemOption/sysSetting'>
              编辑
            </Link>
          </Item>
          <Item>
            <Desc>
              <Title>模块管理</Title>
              <span>可以卸载和安装系统应用模块</span>
            </Desc>
            <Link to='/systemOption/pim'>
              编辑
            </Link>
          </Item>
          <Item>
            <Desc>
              <Title>系统版本</Title>
              <span>查看版本号，手动更新版本</span>
            </Desc>
            <Link to='/systemOption/pim'>
              编辑
            </Link>
          </Item>
        </Center>
        <Right>
          <HeadPic src={head}></HeadPic>
          <UserInfo>
            <Label>当前用户：
              <Value>王琰龙</Value>
            </Label>
            <Label>所在科室：
              <Value>中医科</Value>
            </Label>
            <Label>职务职级：
              <Value>副主任医师</Value>
            </Label>
          </UserInfo>
        </Right>
	    </Container>
    );
  }
}
const Container = styled.div`
  display: flex;
  height: 100%;
  flex-grow: 1;
  border-top: 1px solid #999999;
  margin: 14px 131px 0px 25px ;
`;
const Left = styled.div`
  width: 200px;
  padding-top: 10px;
  overflow: hidden;
  word-wrap: normal;
  white-space: nowrap;
`;
const Label = styled.div`
  height: 36px;
  line-height: 36px;
`;
const Value = styled.span`
  color: #0A6ECB;
`;
const Center = styled.div`
  border: 1px solid transparent;
  border-image: linear-gradient(to bottom, #CDCDCD, white) 10;
  border-top: 0px solid transparent;
  flex-grow: 1;
  padding: 6px 25px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid rgba(228, 228, 228, 1);
  height: 40px;
  margin-top: 10px;
`;
const Desc = styled.div`
  display: flex;
`;
const Title = styled.div`
  color: rgb(51, 51, 51);
  margin-right: 50px;
`;
const Action = styled.div``;
const Right = styled.div`
  width: 240px;
  padding-left: 25px;
`;
const HeadPic = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 20px;
`;
const UserInfo = styled.div`
  margin-top: 22px;
  border-top: 1px dashed #efd6d6;
`;

/*
@姜中希
@日期：2018-07-29
@描述：系统设置入口组件
*/
