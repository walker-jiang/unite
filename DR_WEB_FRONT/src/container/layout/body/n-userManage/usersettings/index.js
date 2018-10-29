/* @作者：马奔
@日期：2018-10-23
@描述：用户设置模块
*/

import React, {Component} from 'react';
import styled from 'styled-components';
import {Button, Input, Table, Divider, Tag,Pagination } from 'antd';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const Search = Input.Search;
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       length:0, //所有的用户数量
       userList:'',  // 用户列表
    };
  }
  componentWillMount(){
    this.getuserlist();
  };
 /**
  * [getuserlist 拿到用户列表数据]
  * @param  {[type]} keyword [搜索的关键词]
  * @return {[type]}         [undefined]
  */
 getuserlist(keyword){
   let self = this;
   let params = {
     url: 'BaOrguserController/getList',
     server_url:config_login_url,
     data: {
       keyword:keyword,
       page:1,
       pagesize:10,
     }
   };
   function callBack(res){
     if(res.result){
       console.log(res.data)
       self.setState({ userList: res.data.records,length:res.data.records.length});
     }else{
       console.log('异常响应信息', res);
     }
   };
   ajaxGetResource(params, callBack);
 }
 /** [onChange 输入框清零时刷新页面] */
 onChange=(e)=>{
   if(e.target.value==''){
     this.getuserlist()
   }
 }
  render() {
    const columns = [
      {
        title: '用户编号',
        dataIndex: 'orgUserno',
        key: 'orgUserno',
        align:'center',
      }, {
        title: '用户名',
        dataIndex: 'orgName',
        key: 'orgName',
        align:'center',
      }, {
        title: '姓名',
        dataIndex: 'realname',
        key: 'realname',
        align:'center',
      }, {
        title: '手机号',
        key: 'mobile',
        dataIndex: 'mobile',
        align:'center',
      }, {
        title: '所属科室',
        key: 'deptidDic',
        dataIndex: 'deptidDic',
        align:'center',
      }, {
        title: '职称',
        key: 'postDic',
        dataIndex: 'postDic',
        align:'center',
      }, {
        title: '角色',
        key: 'kkk',
        dataIndex: '空',
      }, {
        title: '创建人',
        key: 'creatername',
        dataIndex: 'creatername',
      }, {
        title: '创建时间',
        key: 'ctstamp',
        dataIndex: 'ctstamp',
        align:'center',
      }, {
        title: '是否启用',
        key: 'enable',
        dataIndex: 'enable',
        align:'center',
        render: (text, record) => (<span>
          {
            record.enable
              ? <span style={{
                    color: '#009900'
                  }}>· 已启用</span>
              : <span style={{
                    color: '#ccc'
                  }}>· 未启用</span>
          }
        </span>)
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (<span>
          <Action onClick={(e) => this.props.setuptype(3,2,2)}>查看</Action>
          <Divider type="vertical"/>
          <Action onClick={(e) => this.props.setuptype(3,2,3,record.id)}>权限预览</Action>
          <Divider type="vertical"/>
          <Action onClick={(e) => this.props.setuptype(3,2,1,record.id)}>修改</Action>
          <Divider type="vertical"/>
          <Action>{
              record.enable
                ? '停用'
                : '启用'
            }</Action>
          <Divider type="vertical"/>
          <Action>删除</Action>
        </span>)
      }
    ];
    let {length,userList} =this.state;
    return (<Container>
      <Header>
        <BorderButton onClick={(e) => this.props.setuptype(3,2,1)}>+新建用户</BorderButton>
        <LeftSeach>
          <span style={{
              marginRight: 10,
              width: '105px'
            }}>查询关键词：</span>
          <Search placeholder="请输入姓名/手机号/身份证号来查询" onSearch={value => this.getuserlist(value)} onChange={this.onChange} enterButton/>
        </LeftSeach>
      </Header>
      <SpecTable columns={columns} dataSource={userList} />
      <Length>• 共有<span style={{color:'#0a94df'}}>{length}</span>位已添用户记录</Length>
    </Container>)
  }
}
const Container = styled.div `
  width:100%;
  overflow: hidden;
  height: calc(100vh - 100px);
`;
const Header = styled.div `
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BorderButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const LeftSeach = styled.div `
  height: 100%;
  width: 500px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
// const Box =styled.div`
//     width: 100%;
//     margin-top: 10px;
//     overflow: scroll;
//     ::-webkit-scrollbar{
//       display: none;
//     }
//     height: calc(100vh - 200px);
//     position: relative;
// `
const SpecTable = styled(Table)`
  .ant-table-tbody{
   border-bottom: 1px solid #ccc !important;
  }
  .ant-table-tbody>tr>td{
    height: 44px !important;
    font-size: 12px !important;
    line-height: 44px !important;
    border-bottom: 1px dashed #ccc !important;
  }
  .ant-table-thead>tr>th{
    height: 40px !important;
    background-color: #e4e4e4 !important;
  }
`;
const Action = styled.span `
   padding:0px 3px;
   color:#108de9 !important;
   cursor:pointer;
`
const Length=styled.div`
  margin-top:-50px;
  color:rgb(102, 102, 102);
  font-size: 12px;
  padding-left:10px;
`
