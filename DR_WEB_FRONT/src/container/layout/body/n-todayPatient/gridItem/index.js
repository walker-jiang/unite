import React, {Component, PropTypes} from 'react'; // react核心
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import man from './man.png';
import women from './women.png';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class Index extends Component {
  render() {
    const { gridType, dataSource, doing, redo, done, view, keepDoing } = this.props;
    const themeType = gridType == 0 ? 'to' : ( gridType == 1 ? 'ing_done' : 'done' );
    return (
      <ThemeProvider theme={theme}>
        <Container themeType={themeType}>
          <Body>
            <SexIocn themeType={themeType}></SexIocn>
            <Info>
              <Name>{dataSource.patientname}</Name>
              <div>{dataSource.sexDic} | {dataSource.casetypeDic ? dataSource.casetypeDic : '未知'}｜{dataSource.mobile}</div>
              <div>全天号 ｜ {dataSource.regDate.substr(8,2)}号</div>
            </Info>
          </Body>
          {
            gridType == 0 ?
            <Footer themeType={themeType}>
              <ActionButton onClick={e => doing(dataSource.registerid, dataSource.patientid)}>
                <Link
                  to={'/Layout/treatment'}>
                  接诊
                </Link>
              </ActionButton>
            </Footer>
            : gridType == 1 ?
            <Footer themeType={themeType}>
              <ActionButton onClick={e => keepDoing(dataSource.registerid, dataSource.patientid)}>
                <Link to={'/Layout/treatment'}>
                  继续接诊
                </Link>
              </ActionButton>
              <ActionButton onClick={e => done(dataSource.registerid)}>
                完成治疗
              </ActionButton>
            </Footer>
            :
            <Footer themeType={themeType}>
              <ActionButton onClick={e => redo(dataSource.registerid, dataSource.patientid)}>
                <Link to={'/Layout/treatment'}>
                  重新接诊
                </Link>
              </ActionButton>
              <ActionButton onClick={e => view(dataSource.registerid)}>
                <Link to={'/Layout/treatment'}>
                  信息查看
                </Link>
              </ActionButton>
            </Footer>
          }
        </Container>
      </ThemeProvider>
    )
  }
}
const theme = {
  to: {
    bg: '#38B6E4',
    bg1: '#9BDBF2',
    bg3: '#FFFFFF',
  },
  ing_done: {
    bg: '#FF9900',
    bg1: '#FFCC7F',
    bg3: '#F2F2F2',
  },
  done: {
    bg: '#33CC00',
    bg1: '#FFCC7F',
    bg3: '#F2F2F2',
  }
};
const Container = styled.div`
  float: left;
  margin: 8px;
  width: 232px;
  height: 139px;
  background-color: ${props => props.theme[props.themeType].bg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Body = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const SexIocn = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme[props.themeType].bg1};
  background-image: url(${man});
  background-repeat: no-repeat;
  background-position: center;
`;
const Info = styled.div`
  width: 150px;
  color: white;
  font-size: 12px;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
const Footer = styled.div`
  width: 100%;
  height: 39px;
  color: #566ED4;
  font-size: 13px;
  display: flex;
  border: 1px solid #E4E4E4;
  background-color: ${props => props.theme[props.themeType].bg3};
`;
const ActionButton = styled.div`
  &:nth-child(2){
    border-left: 1px solid #E4E4E4;
  }
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
/*
@作者：姜中希
@日期：2018-09-14
@描述：患者信息平铺单元格组件
*/
