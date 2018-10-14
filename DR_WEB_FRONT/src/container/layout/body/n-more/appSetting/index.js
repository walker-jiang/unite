import React, {Component} from 'react';
import styled from 'styled-components';
import { Tabs, Icon,Form,Row } from 'antd';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  };
  render () {
    return(
     <Container>
      ,
     </Container>
    )
  };
}
const Container = styled.div`
  width: 100%;
  height:100%;
  overflow: hidden;
`;
const SpecRow = styled(Row)`
  color: #0A6ECB;
  margin-bottom: 10px
`;
const TipText = styled.span`
  margin-left: 10px;
  padding-left: 10px;
  border-left: 1px solid #ccc;
`;
const SureButton = styled(Button)`
  ${StyButton.semicircle}
`;
const CancelButton = styled(Button)`
  ${StyButton.gray}
`;
