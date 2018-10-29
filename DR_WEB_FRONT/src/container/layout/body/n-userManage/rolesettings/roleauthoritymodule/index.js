/* @作者：马奔
@日期：2018-10-25
@描述：操作授权模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import { Input,Table,Checkbox} from 'antd';

const Search = Input.Search;
export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      islook:this.props.islook, //控制操作还是展示
      id:this.props.id,   //展示或者操作时候当前角色的id
    };
  };
  render() {
    const columns = [{
          title: '模块名称',
          dataIndex: 'name',
          key: 'name',
          width: '50%',
          render: (text, record, index) => {
            return (<Checkbox checked={record.isShow}>{record.name}</Checkbox>)
          }
          }, {
            title: '功能操作',
            width: '50%',
            dataIndex: 'address',
            key: 'address',
            render: (text, record, index) => {
              return (
                 <div>
                 {record.address.map((item,index)=>{
                   return (<span><Checkbox checked={item.isShow}>{item.name}</Checkbox></span>)
                   })
                 }
                 </div>
                  )
            }
        }];
    const data = [
        {
          key: 1,
          id:1,
          name: '首页',
          isisShow:false,
          address:[{
            id: '01',
            key:'01',
            name: '全部',
            isisShow:false,
                 }],
        },
        {
          key: 2,
          id:2,
          name: '患者登记',
          isisShow:false,
          address:[
               {
                    id: 25,
                    key:25,
                    name: '查看',
                    isisShow:false,
                  },
                  {
                    id: 26,
                    key:26,
                    name: '修改',
                    isisShow:false,
                  },
                  {
                    id: 27,
                    key:27,
                    name: '删除',
                    isisShow:false,
                  }
                 ],
        },
        {
          key: 3,
          id:3,
          name: '今日门诊',
          isisShow:false,
          address:[{
            id: '01',
            key:'01',
            name: '全部',
            isisShow:false,
                 }],
          children:[
                    {
                      key: 4,
                      id:4,
                      name: '患者信息',
                      isisShow:false,
                      address:[
                           {
                           id: 25,
                           key:25,
                           name: '查看',
                           isisShow:false,
                         },
                         {
                           id: 26,
                           key:26,
                           name: '修改',
                           isisShow:false,
                         },
                       ],
                    },
                    {
                      key: 5,
                      id:5,
                      name: '书写病历',
                      isisShow:false,
                      address:[
                           {
                           id: 25,
                           key:25,
                           name: '查看',
                           isisShow:false,
                         },
                         {
                           id: 26,
                           key:26,
                           name: '修改',
                           isisShow:false,
                         },
                         {
                           id: 27,
                           key:27,
                           name: '存模板',
                           isisShow:false,
                         },
                         {
                           id: 28,
                           key:28,
                           name: '打印',
                           isisShow:false,
                         },
                       ],
                    },
                    {
                      key: 6,
                      id:6,
                      name: '医嘱管理',
                      isisShow:false,
                      address:[
                           {
                           id: 25,
                           key:25,
                           name: '查看',
                           isisShow:false,
                         },
                         {
                         id: 29,
                         key:29,
                         name: '新增',
                         isisShow:false,
                         },
                         {
                           id: 26,
                           key:26,
                           name: '修改',
                           isisShow:false,
                         },
                         {
                           id: 27,
                           key:27,
                           name: '存模板',
                           isisShow:false,
                         },
                         {
                           id: 28,
                           key:28,
                           name: '打印',
                           isisShow:false,
                         },
                         {
                           id: 29,
                           key:29,
                           name: '删除',
                           isisShow:false,
                         },
                         {
                           id: 30,
                           key:30,
                           name: '提交',
                           isisShow:false,
                         },
                       ],
                    },
                    {
                      key: 7,
                      id:7,
                      name: '治未病',
                      isisShow:false,
                      address:[
                           {
                           id: 31,
                           key:31,
                           name: '测评/重测',
                           isisShow:false,
                         },
                         {
                           id: 32,
                           key:32,
                           name: '查看历史',
                           isisShow:false,
                         },
                         {
                           id: 28,
                           key:28,
                           name: '打印',
                           isisShow:false,
                         },
                         {
                           id: 33,
                           key:33,
                           name: '导出文件',
                           isisShow:false,
                         },
                       ],
                    },
                    ]
        },
      ]
      let {islook,id}=this.state;
    return(
    <Container>
      {islook==''?
        <Header>
          <span style={{color:'#000',margin:'0px 5px'}}>▶</span>
          <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(1)}>角色设置</span>
          <span style={{color:'#000',margin:'0px 5px'}}> ＞ </span>
          <span>操作授权</span>
          <span style={{color:'#000',margin:'0px 10px'}}>(当前角色:<span style={{color:'#ff0000',margin:'0px 5px'}}>机构管理员</span>)</span>
          <Right>
           <span style={{width:'107px'}}>查询关键词：</span>
           <Search  placeholder="请输入角色编码或角色名称快速查询"  onSearch={value => console.log(value)}  enterButton/>
          </Right>
        </Header>
        :null}
     <Body>
       <Tables columns={columns}  dataSource={data} pagination={false} rowKey={'dadasda'}/>
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
`;
const Right=styled.div`
  width: 460px;
  height: 50px;
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
const Tables=styled(Table)`
  width: 96%;
  height: 100%;
  margin: 0px auto;
  border-bottom: 1px solid #666;
  .ant-table-thead > tr:first-child > th:first-child{
    padding-left: 20px !important;
  }
  .ant-table-thead > tr > th{
    height: 30px !important;

  }
  .ant-table-thead > tr > th >span{
    font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #656565;
  }
  .ant-table-tbody > tr > td{
    height: 41px !important;
    border-bottom: 1px dashed #ccc !important;
  }
`
