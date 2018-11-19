/* @作者：马奔
@日期：2018-10-24
@描述：角色添加/修改模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Input,Select, Button,Switch  } from 'antd';
import StyButton from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import Icon from 'components/dr/icon';

const FormItem = Form.Item;
 class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.id,
      roleinfo:'',
      isshow:false,
    };
  }
  componentWillMount(){
    if(this.props.id){
     this.getroleinfo()
    }
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
        self.setState({ roleinfo: res.data });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  /**
   * [postroleinfo 添加角色]
   * @param  {[type]} list [表单角色信息]
   * @return {[type]}      [undefined]
   */
  postroleinfo(list){
    let self = this;
    let data={
        "ctstamp": "2018-10-26T01:20:39.465Z",
        "isopen": list.isopen==true?"01":"02",
        "orgRoledesc": list.orgRoledesc,
        "orgRolename": list.orgRolename,
        "orgRoleno": list.orgRoleno,
        "orgid": window.sessionStorage.getItem('orgid'),
        "seqno": 0,
        "useflag": "1",
      }
    let params = {
      url:'SyOrgroleController/postData',
      server_url:config_login_url,
      data:JSON.stringify(data),
      type:'post',
    };
    function callBack(res){
      if(res.result){
      }else{
        console.log('异常响应信息', res);
      }
    };
    console.log('添加角色',data)
    ajaxGetResource(params, callBack);
  }
  /**
   * [putroleinfo 修改角色信息]
   * @param  {[type]} list [表单上的值]
   * @return {[type]}      [undefined]
   */
  putroleinfo(list){
    let self = this;
    let{roleinfo,id}=this.state;
    let data={
        "ctstamp": "2018-10-26T01:20:39.465Z",
        "isopen": list.isopen==true?"01":"02",
        "orgRoleid": id,
        "orgRoledesc": list.orgRoledesc,
        "orgRolename": list.orgRolename,
        "orgRoleno": list.orgRoleno,
        "orgid": window.sessionStorage.getItem('orgid'),
        "seqno": 0,
        "syModuleList": roleinfo.syModuleList,
        "syOrgroleLimitList":roleinfo.syOrgroleLimitList,
        "syWorkList": roleinfo.syWorkList,
        "uctstamp": "2018-10-26T01:20:39.466Z",
        "useflag": "1",
      }
    let params = {
      url: 'SyOrgroleController/putData',
      server_url:config_login_url,
      data:JSON.stringify(data),
      type:'put',
    };
    function callBack(res){
      if(res.result){
      }else{
        console.log('异常响应信息', res);
      }
    };
    // console.log('修改角色',data)
    // ajaxGetResource(params, callBack);
  }
  /** [handleSubmit 表单提交事件] */
  handleSubmit = (e) => {
    let self = this;
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if(self.props.id){
              self.putroleinfo(values);
          }else{
             self.postroleinfo(values);
          }

        }
      });
      this.props.setuptype(1)
    }
  render() {
    let {id,roleinfo}=this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
    return(
      <Container>
      <Header>
          <span style={{color:'#000',margin:'0px 5px'}}>▶</span>
          <span style={{color:'#0a6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(1)}>角色设置</span>
          <StyleIconC type='next'/>
          <span>{id?'修改角色':'添加角色'}</span>
      </Header>
      <Body>
        <Form onSubmit={this.handleSubmit} >
          <FormItems {...formItemLayout} label="角色编码" >
                   {getFieldDecorator('orgRoleno', {
                     initialValue: roleinfo.orgRoleno||'',
                     rules: [{
                       required: true, message: '请输入角色编码!',
                     }],
                   })(
                     <Inputs placeholder="请输入角色编码" />
                   )}
          </FormItems>
          <FormItems {...formItemLayout} label="角色名称" >
                   {getFieldDecorator('orgRolename', {
                     initialValue:roleinfo.orgRolename||'',
                     rules: [{
                       required: true, message: '请输入角色名称!',
                     }],
                   })(
                     <Inputs placeholder="请输入角色名称"/>
                   )}
          </FormItems>
          <FormItems {...formItemLayout} label="角色描述">
                {getFieldDecorator('orgRoledesc', {
                  initialValue: roleinfo.orgRoledesc||'',
                  rules: [{
                    required: true, message: '请输入角色描述!',
                  }],
                })(
                  <textarea  style={{width:'54%'}} placeholder="请输入角色描述信息"/>
                )}
          </FormItems>
          <FormItems {...formItemLayout} label="是否启用"  >
                {getFieldDecorator('isopen',{ valuePropName: 'checked',
            initialValue: roleinfo.isopen=='01'?true:false, })(
                 <Switch checkedChildren="是" unCheckedChildren="否"  />
                )}
          </FormItems>
          <Line></Line>
          <center >
            <SureButton htmlType="submit" onClick={this.handleSubmit}>保存</SureButton>
            <CancelButton onClick={this.handleCancel}>取消</CancelButton>
          </center>
        </Form>
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
  padding-left:15px;
`;
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
 const FormItems=styled(FormItem)`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 0px 20%;
   .ant-form-item-label > label{
      color:rgb(51, 51, 51) !important;
      font-size: 14px !important;
   }
 `
const Inputs =styled(Input)`
  border:0 !important;
  border-bottom:1px solid #ccc !important;
  width: 54% !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 0px !important;
`
const Line = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 1px;
  background-color: #666;
  margin-bottom: 20px;
`
const SureButton = styled(Button)`
  ${StyButton.semicircle}
`;
const CancelButton = styled(Button)`
  ${StyButton.gray}
`;
const StyleIconC = styled(Icon)`
  margin:0px 5px;
  height:16px;
  width:16px;
  margin-top:6px;
`;
const WrappedRegistrationForm = Form.create()(Index);

export default WrappedRegistrationForm ;
