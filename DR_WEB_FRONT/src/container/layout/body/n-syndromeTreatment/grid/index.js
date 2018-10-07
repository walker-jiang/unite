import React, {Component, PropTypes} from 'react'; // react核心
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import GridItem from './gridItem';

export default class Index extends Component {
  render() {
    const { patienList } = this.props;
    return (
      <Container>
      {
        patienList.map(item => <GridItem gridType={item.rcStatus} key={item.patientid} dataSource={item}></GridItem>)
      }
      </Container>
    )
  }
}
const Container = styled.div`

`;
/*
@作者：姜中希
@日期：2018-09-14
@描述：患者信息平铺单元格组件
*/
