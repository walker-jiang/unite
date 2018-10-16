import React, {Component} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Icon from 'components/dr/icon';
import {Link} from 'react-router-dom';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<Container>
      <Header>
        <LeftBox>
          <StyleIconA type='m_system_manage'/>
          系统管理
        </LeftBox>
        <RightBox to='/Layout/more'>
          <StyleIconB type='go_back'/>
          返回
        </RightBox>
      </Header>
      <Body>
        <RowLine>
          <Linkx to='/Layout/systemManage'>
            <StyleIcon type='m_system_manage'/>
          <Pan>系统设置</Pan>
          </Linkx>
          <Linkx to='/Layout/'>
            <StyleIcon type='manage_patient'/>
          <Pan>诊疗管理</Pan>
          </Linkx>
          <Linkx to='/Layout/'>
            <StyleIcon type='manage_syndrome_treatment'/>
          <Pan>辩证论治管理</Pan>
          </Linkx>
          <Linkx to='/Layout/'>
            <StyleIcon type='manage_compatible_contraindication'/>
          <Pan>配伍禁忌管理</Pan>
          </Linkx>
          <Linkx to='/Layout/remoteEducation'>
            <StyleIcon type='manage_knowledge'/>
          <Pan>知识库管理</Pan>
          </Linkx>
        </RowLine>
        <RowLine className="a_left">
          <Linkx to='/Layout/'>
            <StyleIcon type='manage_cure_not_ill'/>
          <Pan>治未病管理</Pan>
          </Linkx>
        </RowLine>
      </Body>
    </Container>)
  }
}
const Container = styled.div `
  width:100%;
  height:94vh;
  overflow: hidden;
  background-color: #f2f2f2;
  padding: 1% 12%;
`
const Header = styled.div `
  width:100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
`
const LeftBox = styled.div `
  display: flex;
  height: 33px;
  width: 115px;
  border-bottom: 1px solid #3190b0;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  color: rgb(51, 51, 51);
  justify-content: space-between;
  align-items:center;
  padding-right: 2px;
  padding-top: 2px;
  margin-top: 5px;
`
const StyleIconA = styled(Icon)`
 width: 19px;
 height: 19px;
`
const StyleIconB =styled(Icon)`
  width: 30px;
  height: 30px;
  margin-top: 5px;
`
const RightBox = styled(Link) `
  display: flex;
  height: 31px;
  width: 61px;
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  color: #0a6ecb;
  text-align: center;
  line-height: normal;
  align-items:center;
  justify-content: space-between;
    margin-top: 15px;
`
const Body = styled.div`
  width: 1000px;
  height: 560px;
  padding-top: 30px;
  background-color: #fff;
  border: 1px solid rgba(228, 228, 228, 1);
`
const RowLine = styled.div `
  display: flex !important;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  &.a_left{
    justify-content: start !important;
    margin-left: 5%;
  }
`;
const Pan =styled.span`
  color:#000;
  text-align: center;
  margin-top: 2px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
`
const Linkx = styled(Link)`
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction:column
  width: 10%;
  height:5.6%;
  padding-top: 20px;
  margin-bottom: 70px;

`
const StyleIcon = styled(Icon)`
  width: 50px;
  height: 50px;
  font-size:50px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
