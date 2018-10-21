import React, {Component} from 'react';
import styled from 'styled-components';
import {Link, withRouter} from 'react-router-dom';
import { Row, Col, Table, Checkbox } from 'antd';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalModules: this.props.totalModules,
      RightData: this.props.rightMenuList,
      rightMenuList: '',
    };
    this.sortUp = this.sortUp.bind(this)
    this.sortDown = this.sortDown.bind(this)
  };
  componentWillMount() {
    this.props.onRefa(this)
  }
  componentDidMount(){
     this.data();
  }
    /** [data 组件处理数据函数] */
  data= () => {
    let{totalModules,RightData}=this.state;
    let newarrayR=[...totalModules];
    let arr = newarrayR.map((item,index)=>{
      let items={}
         items.isShow= false;
         if(RightData.length!=0){
           RightData.forEach((item2,index2)=>{
              if(item2.modid==item.modid){
                  items.isShow= true;
              }
           })
         }
      items={ ...item, ...items  };
      return items
    })
    this.setState({
      rightMenuList: arr
    })
  }
  /** [onChange 复选框改变事件] */
  onChange = (i) => {
    let isShow = this.state.rightMenuList[i].isShow;
    let rightList = this.state.rightMenuList;
    rightList[i].isShow = !isShow
    this.setState({
      rightMenuList: rightList
    })
  }
 /** [loginAvailable 点击显示登录可用项] */
  loginAvailable = () => {
    let dataLogin = [];
    this.state.rightMenuList.forEach((item, index) => {
      if (item.remarks == "登录后可用") {
        dataLogin.push(item)
      }
    });
    this.setState({rightMenuList: dataLogin});
  }
  /**
   * [sortUp 数据上移事件]
   * @param  {[type]} index [当前点击对象索引]
   * @return {[type]}       [undefined]
   */
  sortUp = (index) => {
     let arr = this.state.rightMenuList
     if (index != 0) {
       let temp = arr[index - 1];
       arr[index - 1] = arr[index];
       arr[index] = temp;
       this.setState({
         rightMenuList: arr
       })
     }
   }
  /**
   * [sortDown 数据下移事件]
   * @param  {[type]} index [当前点击对象索引]
   * @return {[type]}       [undefined]
   */
  sortDown = (index) => {
    let arr = this.state.rightMenuList
    if (index != arr.length) {
      let temp = arr[index + 1];
      arr[index + 1] = arr[index];
      arr[index] = temp;
      this.setState({
        rightMenuList: arr
      })
    }
  }
  /** [rightRestoreSetting 回复默认设置] */
  rightRestoreSetting = () => {
    this.data();
  }
  render() {
    let {rightMenuList} = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: "10%",
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>
      }, {
        title: '菜单名称',
        dataIndex: 'modname',
        key: 'modname',
        width: "30%"
      }, {
        title: '应用状态',
        dataIndex: 'remarks',
        key: 'remarks',
        width: "20%"
      }, {
        title: '在菜单显示',
        dataIndex: 'isShow',
        key: 'isShow',
        width: "20%",
        render: (text, record, index) => {
          return (<Checkbox onChange={() => this.onChange(index)} defaultChecked={record.isShow}></Checkbox>)
        }
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: "20%",
        render: (text, record, index) => {
          return (<div style={{
              color: "#3366ff"
            }}>
            <Key onClick={() => this.sortUp(index)}>上移
            </Key>
            <Key onClick={() => this.sortDown(index)}>下移</Key>
          </div>)
        }
      }
    ];
    return (
      <Container>
      <SpecRow>
        <Key onClick={this.rightRestoreSetting}>恢复默认设置</Key>
        <TipText onClick={this.loginAvailable}>在菜单中隐藏【登录后可用】的应用</TipText>
      </SpecRow>
      <SpecTable dataSource={rightMenuList} pagination={false} columns={columns} rowKey={record => record.modid}/>
    </Container>
    )
  };
}
const Container = styled.div `
  width: 100%;
  height:100%;
  overflow: hidden;
`;
const SpecRow = styled(Row)`
  color: #0A6ECB;
  margin-bottom: 10px
`;
const TipText = styled.span `
  margin-left: 10px;
  padding-left: 10px;
  cursor:pointer;
  border-left: 1px solid #ccc;
`;
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
`;
/*
@作者：马奔
@日期：2018-10-15
@描述：应用设置右TAb
*/
