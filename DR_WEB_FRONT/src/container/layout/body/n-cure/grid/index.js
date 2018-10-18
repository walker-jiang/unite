import React, {Component, PropTypes} from 'react'; // react核心
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import GridItem from './gridItem';

export default class Index extends Component {
  getGridList(patienList){
    const cols = 5; // 每行多少列
    const totalLength = patienList.length;
    let girds = [];
    let rowLines = [];
    patienList.map((item, index) => {
      let girdItem = <GridItem onStep={(step,cardno,casetype) => {this.props.onStep(step,cardno,casetype)}} gridType={item.rcStatus} key={index} dataSource={item} doing={this.doing} redo={this.redo} done={this.done} view={this.view} keepDoing={this.keepDoing}></GridItem>
      girds.push(girdItem);
    })
    let rowLength = parseInt(totalLength / cols);
    rowLength = totalLength % cols ? ( rowLength + 1 ) : rowLength; // 条件含义是如果敲好是cols的整数倍直接返回商， 否则的将商 加1 补最后一行（最后一行肯定不满）
    for(let i = 0; i < rowLength; i++){
      let RowLinesItem = (
        <RowLine key={i} width={(girds.slice(i * cols, ( i + 1 ) * cols)).length}>
          {
            girds.slice(i * cols, ( i + 1 ) * cols).map( item => item)
          }
        </RowLine>
      );
      rowLines.push(RowLinesItem);
    }
    return rowLines;
  };
  render() {
    const { patienList } = this.props;
    let girds = this.getGridList(patienList);
    return (
      <Container>
        <Grid >
          {girds}
        </Grid>
      </Container>
    )
  }
}
const Container = styled.div`

`;
const Grid = styled.div`
  margin: 8px auto;
`;
const RowLine = styled.div`
  display: flex;
  justify-content: space-around;
  width: ${ props => props.width * 20 + '%'};
`;
/*
@作者：姜中希
@日期：2018-09-14
@描述：患者信息平铺单元格组件
*/
