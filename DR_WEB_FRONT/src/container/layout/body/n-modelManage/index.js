import React, {Component} from 'react';
import styled from 'styled-components';


export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  };
  render() {
    return (
      <Container>
        <Header>
          <Menuemtep>病例模板</Menuemtep>
          <Menuemtep>医嘱模板</Menuemtep>
        </Header>
     </Container>
    );
  }
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-left: 1px;

`;
const Header = styled.div`
  height: 67px;
  width: 100%;
  background-color: rgb(242,242,242);
  border-bottom: 1px solid #B9B9B9;
`
const Menuemtep = styled.span`
  font-weight: 400;
  line-height:67px;
  color: #000;
  font-size: 22px;
  margin: 0 20px;
`
