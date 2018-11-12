import React, {Component, PropTypes} from 'react'; // react核心
// import { Switch, Route, Router  } from 'react-router-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import styled from 'styled-components';
import user from './user.png';
import Icon from 'components/dr/icon';
export default class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state={
      show:false
    }
  }
  handleSet=(e)=>{
    if($(e.target).attr('id') == 'spanIcon'){
      if(this.state.show){
        $(e.target).siblings("#pest").slideToggle();
        $('#spanIcon').css({'transform':"rotate(-45deg)",'transform-origin':"39% 70% 0"})
      }else{
        $(e.target).siblings("#pest").slideToggle();
        $(e.target).css({'transform':"rotate(135deg)",'transform-origin':"39% 70% 0"})
      }
      this.setState({show:!this.state.show});
    }
    if ($(e.target).attr('id') == 'pullself' || $(e.target).text()=='个人设置') {
      $("#pest").slideToggle();
      $('#spanIcon').css({'transform':"rotate(-45deg)",'transform-origin':"39% 70% 0"})
    }else if($(e.target).text()=='注销用户'){
      window.sessionStorage.clear();
      window.localStorage.clear();
    }
  }
  render() {
    const style={
      height:'12px',
      width:'12px',
      border:"4px solid #0A6ECB",
      borderTop:"none",
      borderRight:"none",
      marginLeft:'10px',
      marginBottom:'5px',
      transform:"rotate(-45deg)"
    },
    styles = {
      position:'absolute',
      top:'40px',
      right:"25px",
      height:'60px',
      width:'170px',
      display:`${this.state.show==true?'block':'none'}`,
      zIndex:999,
      background:'#F2F2F2',
      textAlign:'center'
    },
    styleSpan={
       display:'inline-block',
       height:"30px",
       width:"30px",
       position: 'absolute',
       top: 0,
       left: 0,
       paddingLeft:'7px',
       borderRight:'1px solid #fff'
    },
    styleSpan1={
       display:'inline-block',
       height:"30px",
       width:"30px",
       position: 'absolute',
       top: 0,
       left: 0,
       paddingLeft:'7px'
    }
    return (
      <Container>
        <Item onClick={this.handleSet}>
          <Img />
          <span>中医馆-{window.sessionStorage.getItem('username')}</span>
          <span id='spanIcon' style={style}></span>
          <div id='pest' style={styles}>
            <Link style={{color:"#fff"}} to="/Layout/personalSetting">
              <Itemp id='pullself' style={{background:'#108DE9'}}>
                <span style={styleSpan1}>
                  <Icon type='selfput'/>
                </span>
                个人设置
              </Itemp>
            </Link>
            <Link style={{color:"#333"}} to="/login">
              <Itemp>
                <span style={styleSpan}>
                  <Icon type='del'/>
                </span>
                注销用户
              </Itemp>
            </Link>
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
const Itemp = styled.p`
  height:30px;
  width:100%;
  line-height:30px;
  background:#F2F2F2;
  margin:0;
  position:relative
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
