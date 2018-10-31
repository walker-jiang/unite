/*
@作者：马奔
@日期：2018-10-23
@描述：角色设置模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import { Button,Input ,Table, Divider, Tag} from 'antd';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const Search = Input.Search;
export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      roleList:[],
      length:'',
    };
  };
  componentWillMount(){
    this.getrolelist()
  }
  /**
   * [getrolelist 拿到角色列表数据]
   * @param  {[type]} keyword [搜索的关键词]
   * @return {[type]}         [undefined]
   */
  getrolelist(keyword){
    let self = this;
    let params = {
      url: 'SyOrgroleController/getList',
      server_url:config_login_url,
      data: {
        orgid:window.sessionStorage.getItem('orgid'),
        keyword:keyword,
      }
    };
    function callBack(res){
      if(res.result){
        console.log('1111',res.data)
        self.setState({ roleList: res.data.records ,length: res.data.records.length});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  /**
   * [delrole 删除角色]
   * @return {[type]}         [undefined]
   */
  delrole(roleinfo){
    let self = this;
    let data={
        "ctstamp": roleinfo.ctstamp,
        "isopen": roleinfo.isopen,
        "orgRoleid": roleinfo.orgRoleid,
        "orgRoledesc": roleinfo.orgRoledesc,
        "orgRolename": roleinfo.orgRolename,
        "orgRoleno": roleinfo.orgRoleno,
        "orgid": roleinfo.orgid,
        "seqno": 0,
        "syModuleList": roleinfo.syModuleList,
        "syOrgroleLimitList":roleinfo.syOrgroleLimitList,
        "syWorkList": roleinfo.syWorkList,
        "uctstamp": roleinfo.uctstamp,
        "useflag": "0",
      };
    let params = {
        url: 'SyOrgroleController/putData',
        server_url:config_login_url,
        data:JSON.stringify(data),
        type:'put',
      };
      function callBack(res){
        if(res.result){
          self.getrolelist();
        }else{
          console.log('异常响应信息', res);
        }
      };
      console.log('删除角色',data)
      // ajaxGetResource(params, callBack);
  }
  /** [Stoprole 停用角色] */
  Stoprole(roleinfo,isopen){
    let self = this;
    let data={
        "ctstamp": roleinfo.ctstamp,
        "isopen": isopen||"02",
        "orgRoleid": roleinfo.orgRoleid,
        "orgRoledesc": roleinfo.orgRoledesc,
        "orgRolename": roleinfo.orgRolename,
        "orgRoleno": roleinfo.orgRoleno,
        "orgid": roleinfo.orgid,
        "seqno": roleinfo.seqno,
        "syModuleList": roleinfo.syModuleList,
        "syOrgroleLimitList":roleinfo.syOrgroleLimitList,
        "syWorkList": roleinfo.syWorkList,
        "uctstamp": roleinfo.uctstamp,
        "useflag": roleinfo.useflag,
      }
      let params = {
        url: 'SyOrgroleController/putData',
        server_url:config_login_url,
        data:JSON.stringify(data),
        type:'put',
      };
      function callBack(res){
        if(res.result){
          self.getrolelist();
        }else{
          console.log('异常响应信息', res);
        }
      };
      console.log('停用角色',data)
      ajaxGetResource(params, callBack);
  }
  /** [onChange 输入框清零时刷新页面] */
  onChange=(e)=>{
    if(e.target.value==''){
      this.getrolelist()
    }
  }
  render() {
    let{ roleList ,length} =this.state
    const columns = [{
          title: '角色编码',
          dataIndex: 'orgRoleno',
          key: 'orgRoleno',
          width:'8%',
          align:'center',
        }, {
          title: '角色名',
          dataIndex: 'orgRolename',
          key: 'orgRolename',
          width:'10%',
          align:'center',
        }, {
          title: '角色描述',
          dataIndex: 'orgRoledesc',
          key: 'orgRoledesc',
          width:'16%',
          align:'center',
        }, {
          title: '创建人',
          key: 'creater',
          dataIndex: 'creater',
          width:'8%',
          align:'center',
        },
        {
         title: '创建时间',
         key: 'uctstamp',
         dataIndex: 'uctstamp',
         width:'10%',
         align:'center',
       },
       {
        title: '是否启用',
        key: 'isopen',
        dataIndex: 'isopen',
        width:'8%',
        align:'center',
        render: (text, record) => (
          <span>
            {record.isopen=='01'?<span style={{color:'#009900'}}>· 已启用</span>:<span style={{color:'#ccc'}}>· 未启用</span>}
          </span>
        ),
      },{
          title: '操作',
          key: 'action',
          width:'40%',
          render: (text, record,index) => (
            <span>
              <Action onClick={(e) => this.props.setuptype(3,1,2,record.orgRoleid)}>复制</Action>
              <Divider type="vertical" />
              <Action onClick={(e) => this.props.setuptype(3,1,1,record.orgRoleid)}>修改</Action>
              <Divider type="vertical" />
              <Action onClick={(e) => this.props.setuptype(3,1,3,record.orgRoleid)}>查看</Action>
              <Divider type="vertical" />
              <Action  onClick={(e) => this.props.setuptype(3,1,4,record.orgRoleid)}>操作授权</Action>
              <Divider type="vertical" />
              <Action onClick={(e) => this.props.setuptype(3,1,5,record.orgRoleid)}>处方授权</Action>
              <Divider type="vertical" />
              <Action onClick={(e) => this.props.setuptype(3,1,6,record.orgRoleid)}>权限预览</Action>
              <Divider type="vertical" />
              {record.isopen=='01'?<Action onClick={(e) => this.Stoprole(record)}>停用</Action>:<Action onClick={(e) => this.Stoprole(record,"01")}>启用</Action>}
              <Divider type="vertical" />
              <Action onClick={(e) => this.delrole(record)}>删除</Action>
           </span>
          ),
    }];
    return(
      <Container>
        <Header>
         <BorderButton onClick={(e) => this.props.setuptype(3,1,1)}>+新建角色</BorderButton>
         <LeftSeach>
           <span style={{width:'116px'}}>查询关键词：</span>
          <Search  placeholder="请输入角色编码或角色名称快速查询"  onSearch={value => this.getrolelist(value)} onChange={this.onChange} enterButton/>
         </LeftSeach>
        </Header>
        <SpecTable columns={columns} dataSource={roleList} pagination={false} rowKey="orgRoleid" />
         <Length>• 共有<span style={{color:'#0a94df'}}>{length}</span>位已添用户记录</Length>
     </Container>
    )
  }
}
const Container = styled.div`
  width:100%;
  overflow: hidden;
  height: calc(100vh - 100px);
`;
const Header =styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BorderButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const LeftSeach =styled.div`
  height: 100%;
  width: 500px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
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
const Action=styled.span`
   padding:0px 3px;
   color:#108de9 !important;
   cursor:pointer;
`
const Length=styled.div`
  color:rgb(102, 102, 102);
  font-size: 12px;
  padding-left:10px;
  margin-top:10px;
`
