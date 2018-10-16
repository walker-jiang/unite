import React, {Component, PropTypes} from 'react'; // react核心
// import { Switch, Route, Router  } from 'react-router-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import styled from 'styled-components';
import user from './user.png';

export default class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state={
      show:false
    }
  }
  handleSet=()=>{
    console.log('12121212');
    this.setState({show:!this.state.show});
  }
  personalset=(e)=>{
    this.setState({show:false});
    $(e.target).css({'background':'#108DE9'})
    $(e.target).children('a').css({'color':'#fff'})
    $("#pest").css({'display':'none'})
    if($(e.target).text()=='注销用户'){
      window.sessionStorage.clear();
    }
  }
  render() {
    return (
      <Container>
        <Item>
          <Img />
          <span>中医馆-{window.sessionStorage.getItem('username')}</span>
          <span onClick={this.handleSet} style={{height:'12px',width:'12px',border:"4px solid #0A6ECB",borderTop:"none",borderRight:"none",marginLeft:'10px',marginBottom:'5px',transform:"rotate(-45deg)"}}></span>
          <div id='pest' onClick={this.personalset} style={{position:'absolute',top:'40px',right:"25px",height:'60px',width:'170px',display:`${this.state.show==true?'block':'none'}`,zIndex:999,background:'#F2F2F2',textAlign:'center'}}>
            <p style={{height:'30px',width:'100%',lineHeight:'30px',background:'#F2F2F2',margin:0}}><i style={{height:"30px",width:"30px",background:"url(./gr.png)"}}></i><Link style={{color:"#333"}} to="/Layout/personalSetting">个人设置</Link></p>
            <p style={{height:'30px',width:'100%',lineHeight:'30px',background:'#F2F2F2',margin:0}}><i style={{height:"30px",width:"30px",background:"url(./zx.png)"}}></i><Link style={{color:"#333"}} to="/login">注销用户</Link></p>
          </div>
        </Item>
      </Container>
    )
  }
}
const Container = styled.div`
  display: flex;
  align-items: center;
  color: #0A6ECB;
  height: 100%;
  margin-right: 20px;
`;
const Item = styled.span`
  padding: 0px 12px;
  height: 17px;
  border-left: 1px solid #1770C8;
  display: flex;
  align-items: center;
  cursor: pointer
`;
const Img = styled.img.attrs({
  src: user
})`
  width: 16px
`;
/*
@作者：姜中希
@日期：2018-07-06
@描述：顶部右侧导航栏，用户信息展示处
*/
