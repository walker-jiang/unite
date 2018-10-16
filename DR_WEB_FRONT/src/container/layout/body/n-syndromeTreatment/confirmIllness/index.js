import React, {Component} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import LeftInfo from '../leftinfo'
import { Button,Checkbox ,Radio, Form, Row, Col } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
export default class Index extends Component {
  constructor(props) {
     super(props);
    this.state = {
     }
   }
   render() {
   return(
      <Container >
        <LeftInfo/>
        <Right>
          <Fromx>
          </Fromx>
          <BottomBtn>
            <Checkbox checked>同步到患者案例</Checkbox>
            <Bot type="primary" onClick={this.props.nextStep}>智能辩证</Bot>
            <Bot onClick={this.props.lastStep}>返回上一步</Bot>
         </BottomBtn>
        </Right>
      </Container>)
  }
}
const Container =styled.div`
  width:100%;
  height:100%;
  overflow: hidden;
  border-top:1px solid #ccc;
  display:flex;
  flex-flow:row;
`

const Right =styled.div`
  flex:1;
  height: 100%;
  padding: 30px;
`
const Fromx = styled.div`
  width: 93%;
  height: 400px;
  ${'' /* margin: 30px auto; */}
  border: 1px solid #ccc;
`
const BottomBtn =styled.div`
  width:100%;
  height:100px;
  margin-top: 15px;
`
const Bot = styled (Button)`
  border-radius:20px !important;
  padding:0 25px !important;
  margin: 0 15px !important;
`
