/* @作者：马奔
@日期：2018-10-24
@描述：用户查看 模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import Icon from 'components/dr/icon';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
     orgUerid:this.props.id,  //拿到用户的id
     userinfo:'', //用户的信息
    };
  }
  componentWillMount(){
    this.getuserinfo();
  }
  /**[getuserinfo 拿到用户数据数据]*/
  getuserinfo(){
    let self = this;
    let params = {
      url: 'BaOrguserController/getData',
      server_url:config_login_url,
      data: {
       orgUerid:self.state.orgUerid,
      }
    };
    function callBack(res){
      if(res.result){
        self.setState({ userinfo: res.data });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  render() {
    let { userinfo }=this.state;
    return(
      <Container>
        <Header>
            <span style={{color:'#000',margin:'0px 5px'}}>▶</span>
            <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(2,2)}>用户设置</span>
            <StyleIconC type='next'/>
            <span>用户信息</span>
            <Rightback>
              <StyleIcon type='go_back'/>
              <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(2,2)}>返回</span>
            </Rightback>
        </Header>
        <Body>
           <FormItems>
             <Leftbox>用户名:</Leftbox>
           <Rightbox>{userinfo.orgName !=''? userinfo.orgName:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>真实姓名:</Leftbox>
             <Rightbox>{userinfo.realname !=''? userinfo.realname:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>所在科室:</Leftbox>
             <Rightbox>{userinfo.deptidDic !=''? userinfo.deptidDic:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>职称:</Leftbox>
             <Rightbox>{userinfo.postDic !=''? userinfo.postDic:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>角色:</Leftbox>
             <Rightbox>{userinfo.roles !=''? userinfo.roles:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>手机号:</Leftbox>
           <Rightbox>{userinfo.mobile !=''? userinfo.mobile:<span style={{color:'#999999'}}>暂无手机号</span>}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>联系邮箱:</Leftbox>
           <Rightbox>{userinfo.email !=''? userinfo.email:<span style={{color:'#999999'}}>暂无邮箱</span>}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>备注:</Leftbox>
           <Rightbox>{userinfo.Remarks !=''? userinfo.Remarks:<span style={{color:'#999999'}}>暂无</span>}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>是否启用:</Leftbox>
           <Rightbox>{userinfo.ismodify? <span style={{color:'#009900'}}>已启用</span>:<span style={{color:'#999999'}}>未启用</span>}</Rightbox>
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
  padding-left:15px;
`;
const Rightback=styled.div`
  width: 80px;
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
const StyleIcon = styled(Icon)`
  width: 30px;
  height: 30px;
  margin-top:8px;
  font-size:30px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
const StyleIconC = styled(Icon)`
  margin:0px 5px;
  height:16px;
  width:16px;
  margin-top:6px;
`;
