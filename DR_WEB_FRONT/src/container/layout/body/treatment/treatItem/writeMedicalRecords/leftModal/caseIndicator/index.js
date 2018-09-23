import React, {Component} from 'react';
import styled from 'styled-components';
import ScrollArea from 'components/scrollArea';
import { Checkbox } from 'antd';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: []
    };
    this.changeItem = this.changeItem.bind(this);
  };
  changeItem(e){
    this.props.changeCaseItem(e.target.value,e.target.checked);
  };
  render() {
    let caseItems = this.props.caseItems;
    console.log('caseItems', caseItems);
    return (
      <Container>
          <Header>
            <span>当前指标</span>
            <Stress>（您可以通过勾选择下列指标扩展诊疗单输入项）</Stress>
          </Header>
          <ScrollArea height={270}>
            <Body>
            {
              caseItems.map((item, index) => {
                return <Checkbox onChange={this.changeItem} key={index} disabled={item.isnecessary == '01'} value={item.targetid} checked={item.isChoose == '01'}>{item.targetname}</Checkbox>
              })
            }
            </Body>
          </ScrollArea>
      </Container>
    );
  }
}
const Container = styled.div`
  background-color: #FFFFFF;
  height: 100%;
  width: 100%;
  padding: 5px;
`;
const Header = styled.div`
  border-bottom: 1px solid #797979;
  padding: 5px;
`;
const Stress = styled.span`
  color: #0A6ECB;
`;
const Body = styled.div`
  padding: 10px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  .ant-checkbox-wrapper + .ant-checkbox-wrapper{
    margin-left: 0px;
  }
`;
/*
@作者：姜中希
@日期：2018-09-03
@描述：诊疗单右侧栏病历指标组件
*/
