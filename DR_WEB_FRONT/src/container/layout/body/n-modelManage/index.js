import React, {Component} from 'react';
import styled from 'styled-components';
import { Button,Row, Col,Tree,Table,Divider, Modal,Input} from 'antd';
import Icon1 from 'components/dr/icon';
const TreeNode = Tree.TreeNode;
export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      rcStatus:0,  //切换样式
      List:[],//Trees
    };
  };
  componentDidMount(){
    this.setState({
      List:[
        {
          title:"病例模板",
          key:'1',
          sonList:[
            {
             title:"平台共享模板111",
             key:'2',
             sonList:[
                {
                  title:"风热感冒",
                    key:'321',
                },
                {
                  title:"高血压",
                    key:'43213',
                }
              ]
            },
            {
              title:"庆阳中医馆共享模板",
              key:'4',
              sonList:[
                  {
                    title:"风热感冒",
                      key:'32313',
                  },{
                    title:"高血压",
                      key:'42131',
                  }
                ]
              },
            {
              title:"我的模板",
              key:'5',
              sonList:[
                    {
                      title:"感冒",
                      key:'321312',
                    }
                  ]
                }
          ]
        }
      ]
    })
  }
  /** [toggleTabs 点击样式切换] */
  toggleTabs(curTab){
    this.setState({
      rcStatus: curTab
    });
  };
  /** [showModal 展示对话框] */
  showModal = () => {
   this.setState({
     visible: true,
   });
 }
/** [handleOk 关闭对话框] */
 handleOk = (e) => {
   console.log(e);
   this.setState({
     visible: false,
   });
 }
/** [handleCancel 关闭对话框] */
 handleCancel = (e) => {
   console.log(e);
   this.setState({
     visible: false,
   });
 }
  //????
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  /**
   * [recursion 渲染树状图]
   * @param  {[type]} List [树状图的数据]
   * @return {[type]}      [description]
   */
  recursion = (List) => {
    return(
      List.map((item,index)=>{
        return(
          <TreeNode title={item.title} key={item.key} >
              {  item.sonList ?this.recursion(item.sonList):null}
          </TreeNode>
        )
      })
    )
  }
  render() {
    let { rcStatus, List } = this.state;
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
        width:'45%',
      }, {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        width:'18%',
        align:'center',
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width:'20%',
        align:'center',
      },{
        title: 'Action',
        key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">查看</a>
          <Divider type="vertical" />
          <a href="javascript:;">修改</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      ),
    }];
    const data = [{
        key: '1',
        name: '平台共享模板',
        age: 32,
        time: '2018-10-15',
      }, {
        key: '2',
        name: '庆阳中医馆共享模板',
        age: 42,
        time: '2018-10-15',
      }, {
        key: '3',
        name: '我的模板',
        age: 32,
        time: '2018-10-15',
      }];
    return (
      <Container>
        <Header>
          <TabPane activeTab={rcStatus} _key={0} onClick={(e) => this.toggleTabs(0)}>病例模板</TabPane>
          <TabPane activeTab={rcStatus} _key={1} onClick={(e) => this.toggleTabs(1)}>医嘱模板</TabPane>
        </Header>
        <Body>
          <ButBox>
             <ButtClass onClick={this.showModal}>+新建分类</ButtClass>
             <ButtModel>+新建模板</ButtModel>
          </ButBox>
          <Top>
            <Column span={7} className="first">模板管理</Column>
            <Column span={1}>名称</Column>
            <Column span={7}></Column>
            <Column span={3}>创建时间</Column>
            <Column span={3}>创建者</Column>
            <Column span={3}>操作</Column>
          </Top>
          <Subject>
               <Colu span={8} className="left">
                 <Tree onSelect={this.onSelect} >
                    {this.recursion(List)}
                 </Tree>
               </Colu>
               <Colu span={16}>
                  <Table columns={columns} dataSource={data}  showHeader={false}/>
               </Colu>
          </Subject>
          <SpeModal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={false}>
             <div>
               <span></span>
             <Input />
             </div>
          </SpeModal>
        </Body>
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
  display: flex;
  align-items: center;
  height: 67px;
  width: 100%;
  background-color: rgb(242,242,242);
  border-bottom: 1px solid #B9B9B9;
`;
const TabPane = styled.span`
  display: inline-block;
  height: 30px;
  word-wrap: normal;
  white-space: nowrap;
  font-weight: 400;
  line-height:27px;
  color: #000;
  font-size: 22px;
  margin: 0 20px;
  cursor: pointer;
  border-bottom: ${props => props.activeTab == props._key ? '2px solid #0066cc': 'none'} ;
`;
const Body = styled.div`
   width: 100%;
   height:607px;
   padding: 0 20px;
 `;
const ButBox = styled.div`
  width: 100%;
  height:50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
`
const ButtClass =styled.div`
  height:28px;
  width:100px;
  border-radius:70px;
  background-color:rgba(102, 204, 51, 1);
  font-weight: 400;
  font-size: 13px;
  text-align: center;
  line-height:28px;
  color:#fff;
  margin-right: 20px;
  cursor:pointer;
`
const ButtModel =styled.div`
  height:28px;
  width:100px;
  border-radius:70px;
  background-color:rgba(16, 141, 233, 1);
  font-weight: 400;
  font-size: 13px;
  color:#fff;
  text-align: center;
  line-height:28px;
  cursor:pointer;
`
const Top =styled(Row)`
  background-color: rgba(235, 235, 235, 1);
  width: 100%;
  margin-top: 10px;
`
const Column =styled(Col)`
  text-align: center;
  height: 28px;
  line-height: 28px;
  font-size:12px;
  color: rgb(101, 101, 101);
  &&&.first{
    text-align: left;
    padding-left: 20px;
  }
`
const Subject =styled(Row)`
  width: 100%;
  border-bottom: 1px solid #ccc;
`
const Colu =styled(Col)`
  height: 466px;
  &&&.left{
    border-right: 1px solid #ccc;
  }
`
const Key=styled.span `
  cursor:pointer;
  margin-right: 5px;
`
const SpecTable = styled(Table)`
  .ant-table-body {
    height: 308px !important;
    overflow-y: scroll;
    font-size: 14px !important;
  }
  .ant-table-row>tr>td{
    height: 35px !important;
  }
  .ant-table-thead>tr>th{
    height: 35px !important;
  }
`
const StyleICon = styled(Icon1)`
 height:20px;
 width: 20px;
`
const SpeModal =styled(Modal)`
  width: 500px !important;
  height: 240px !important;
   .ant-modal-content{
     border-top-left-radius: 14px  ;
     border-top-right-radius:14px ;
     .ant-modal-header{
       background-color: #0a6ecb !important;
       font-size: 14px;
       height: 36px;
       border-top-left-radius: 14px;
       border-top-right-radius:14px;
       border-bottom:none !important;
       .ant-modal-title{
         line-height:3px;
         color: #fff !important;
       }
     }
     .ant-modal-close{
       .ant-modal-close-x{
          width: 24px !important;
          height: 24px !important;
          line-height: 24px !important;
          font-size: 16px;
          border-radius: 50%;
          background-color: #6ab5e4;
          margin-top: 6px;
          margin-right: 10px;
          color: #fff;
          text-align: center;
       }
       }
   }
   .
`
/*
@作者：马奔
@日期：2018-10-16
@描述：模板管理
*/
