/* @作者：马奔
@日期：2018-10-24
@描述：用户查看 模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';

export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const listinfo={
        username: 'DSDZ100001031',
        realname: '北京市通州区卫计委' ,
        department:' 中医科' ,
        title: '主治医师',
        roles:  '管理机构管理员 中医主治医师',
        phonenumber: '',
        email:'' ,
        Remarks:'',
        ismodify: true,
      }
    return(
      <Container>
        <Header>
            <span style={{color:'#000',margin:'0px 5px'}}>▶</span>
            <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(2,2)}>用户设置</span>
            <span style={{color:'#000',margin:'0px 5px'}}> ＞ </span>
            <span>用户信息</span>
            <Rightback>
              <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(2,2)}>返回</span>
            </Rightback>
        </Header>
        <Body>
           <FormItems>
             <Leftbox>用户名:</Leftbox>
           <Rightbox>{listinfo.usernamec !=''? listinfo.username:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>真实姓名:</Leftbox>
             <Rightbox>{listinfo.realname !=''? listinfo.realname:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>所在科室:</Leftbox>
             <Rightbox>{listinfo.department !=''? listinfo.department:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>职称:</Leftbox>
             <Rightbox>{listinfo.title !=''? listinfo.title:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>角色:</Leftbox>
             <Rightbox>{listinfo.roles !=''? listinfo.roles:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>手机号:</Leftbox>
           <Rightbox>{listinfo.phonenumber !=''? listinfo.phonenumber:<span style={{color:'#999999'}}>暂无手机号</span>}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>联系邮箱:</Leftbox>
           <Rightbox>{listinfo.email !=''? listinfo.email:<span style={{color:'#999999'}}>暂无邮箱</span>}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>备注:</Leftbox>
           <Rightbox>{listinfo.Remarks !=''? listinfo.Remarks:<span style={{color:'#999999'}}>暂无</span>}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>是否启用:</Leftbox>
           <Rightbox>{listinfo.ismodify? <span style={{color:'#009900'}}>已启用</span>:<span style={{color:'#999999'}}>未启用</span>}</Rightbox>
           </FormItems>
           <Line></Line>
        </Body>
    </Container>
  )
  }
}
const Container = styled.div `
  width:100%;
  overflow: hidden;
  height: calc(100vh - 50px);
`;
const Header = styled.div `
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: rgb(242,242,242);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.349019607843137);
  position: relative;
`;
const Rightback=styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
`
const Body =styled.div`
  width: 100%;
  margin-top: 10px;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  height: calc(100vh - 100px);
  position: relative;

`
const FormItems=styled.div`
  height: 33px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
const Leftbox =styled.div`
   width: 32%;
   height:100%;
   text-align: right;
   color: #333333;
   font-size: 14px;
   margin-right: 30px;
`
const Rightbox =styled.div`
   width: 40%;
   height:100%;
   text-align: left;
   color: #333333;
   font-size: 14px;
`
const Line = styled.div`
 width: 90%;
 margin: 0 auto;
 height: 1px;
 background-color: #666;
 margin-top: 70px;
`
