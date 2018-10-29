/* @作者：马奔
@日期：2018-10-24
@描述：角色查看 模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
       id:this.props.id,
       roleinfo:'',
    };
  }
  componentWillMount(){
     this.getroleinfo()
  }
  /**
   * [getrolelist 拿到角色详情数据]
   * @return {[type]}         [undefined]
   */
  getroleinfo(){
    let self = this;
    let params = {
      url: 'SyOrgroleController/getData',
      server_url:config_login_url,
      data: {
        modid:self.state.id
      },
      type:'get',
    };
    function callBack(res){
      if(res.result){
        console.log( "信息",res.data )
        self.setState({ roleinfo: res.data });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  render() {
    let {roleinfo}=this.state
    return(
      <Container>
        <Header>
            <span style={{color:'#000',margin:'0px 5px'}}>▶</span>
          <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(1,2)}>用户设置</span>
            <span style={{color:'#000',margin:'0px 5px'}}> ＞ </span>
            <span>角色信息</span>
            <Rightback>
              <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(1,2)}>返回</span>
            </Rightback>
        </Header>
        <Body>
           <FormItems>
             <Leftbox>角色编码:</Leftbox>
           <Rightbox>{roleinfo.orgRoleno !=''? roleinfo.orgRoleno:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>角色名称:</Leftbox>
           <Rightbox>{roleinfo.orgRolename !=''? roleinfo.orgRolename:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>角色描述:</Leftbox>
             <Rightbox>{roleinfo.orgRoledesc !=''? roleinfo.orgRoledesc:''}</Rightbox>
           </FormItems>
           <FormItems>
             <Leftbox>是否启用:</Leftbox>
           <Rightbox>{roleinfo.isopen=='01'? <span style={{color:'#009900'}}>已启用</span>:<span style={{color:'#999999'}}>未启用</span>}</Rightbox>
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
 background-color: #ccc;
 margin-top: 70px;
`
