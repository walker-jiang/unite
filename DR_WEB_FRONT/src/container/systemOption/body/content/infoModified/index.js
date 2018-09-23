import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InfoForm from './infoForm';

export default class Index extends Component {
  render() {
    return (
      <Container>
          <ActiveItem>
            <Item>
              <Desc>
                <Title>个人信息设置</Title>
                <span>修改和完善个人登录信息</span>
              </Desc>
              <Link to='/systemOption/pim'>
              编辑
            </Link>
            </Item>
            <InfoForm />
          </ActiveItem>
          <Item>
            <Desc>
              <Title>个人信息设置</Title>
              <span>修改和完善个人登录信息</span>
            </Desc>
            <Link to='/systemOption/pim'>
            编辑
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
  padding-top: 17px;
`;
const Item = styled.div`
  width: 715px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid rgba(228, 228, 228, 1);
  height: 40px;
  margin-bottom: 10px;
`;
const ActiveItem = styled.div`
  padding-right: 25px;
  margin-right: -25px;
  border: 1px solid red;
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
@描述：系统设置个人信息修改界面
*/
