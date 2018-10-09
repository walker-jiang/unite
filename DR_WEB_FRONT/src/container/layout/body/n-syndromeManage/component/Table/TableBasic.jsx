/* ------------------------------------------------------------
    author : fuguolin
    create:2018-04-12
    descreption:基本table
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Table, Icon, Divider, Badge, Pagination, Row, Col, Button } from 'antd';
import { browserHistory } from 'react-router';
import './style/table.less';

class TableBasic extends React.Component {
  state={
    selectedRowKeys:[],
    data:[
      { key: '1',1: '1',2: '内科',3:"一级导航",4:"启用",
        children:[
          { key: '1-1',1: '',2: '内科',3:"二级导航",4:"启用" },
          { key: '1-2',1: '',2: '内科',3:"二级导航",4:"启用" },
        ]
      },
      { key: '2',1: '2',2: '内科',3:"一级导航",4:"启用"},
      { key: '3',1: '3',2: '内科',3:"一级导航",4:"启用"},
      { key: '4',1: '4',2: '内科',3:"一级导航",4:"启用"},
      { key: '5',1: '5',2: '内科',3:"一级导航",4:"启用"},
      { key: '6',1: '8',2: '内科',3:"一级导航",4:"启用"},
      { key: '7',1: '7',2: '内科',3:"一级导航",4:"启用"},
      { key: '8',1: '8',2: '内科',3:"一级导航",4:"启用"},
      { key: '9',1: '9',2: '内科',3:"一级导航",4:"启用"},
      { key: '10',1: '10',2: '内科',3:"一级导航",4:"启用"},
    ],
  }
  /**
   * 页码改变的回调，参数是改变后的页码及每页条数
   */
  onChange = (page,pageSize) => {
    console.log("page----------",page);
    console.log("pageSize----------",pageSize);
  }
  onShowSizeChange = (current, size) => {
    console.log("current----------",current);
    console.log("size----------",size);
  }
  onchageCheckBox = (isSelect) =>{
    if(isSelect){
      var array = [];
      this.state.data.forEach((item)=>{
        array.push(item.key);
      })
      this.setState({ selectedRowKeys: array });
    }else{
      this.setState({ selectedRowKeys: [] });
    }
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { selectedRowKeys, data } = this.state;
    const columns = [
      { title: '序号',dataIndex: '1',key: '1',width:'15%'},
      { title: '科目名称',dataIndex: '2',key: '2',width:'15%'},
      { title: '科目级别',dataIndex: '3',key: '3',width:'15%'},
      { title: '状态',dataIndex: '4',key: '4',width:'15%',render: () => (<span><Badge status="success" />启用</span>) },
      { title: '操作',dataIndex: '5',key: '5',width:'30%',
        render: () => (
          <span className="table-operation">
            <a>加入推荐</a><Divider type="vertical" />
            <a>查看详情</a><Divider type="vertical" />
            <a>修改</a><Divider type="vertical" />
            <a>删除</a>
          </span>
        )
      }
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
    };
    return (
      <div className="homeTabs">
        <Row>
          <Col span={20}><Button className="button" onClick={()=>{ this.showAddModal(true) }}>新增</Button></Col>
          <Col span={3} offset={1}><p className="HomeIndex_p" onClick={()=>{ this.showList(true) }}>系统推荐列表</p></Col>
          <div className="title_div"><p>共找到<span>10</span>个名老中医工作室</p></div>
          <Table columns={columns} pagination={false} dataSource={data} rowSelection={rowSelection}/>
          <Pagination
            size="small"
            total={10}
            showSizeChanger
            showQuickJumper
            onChange = {this.onChange}
            onShowSizeChange={this.onShowSizeChange}
            style={{float:'right',marginRight:20,marginTop:20,marginBottom:20}}
          />
          <span className="table-operation-two">
            <a onClick={()=>this.onchageCheckBox(true)}>全选</a><Divider type="vertical" />
            <a onClick={()=>this.onchageCheckBox(false)}>全不选</a><Divider type="vertical" />
            <a>撤销</a><Divider type="vertical" />
            <a>批量删除</a>
          </span>
        </Row>
      </div>
    );
  };
}
module.exports = TableBasic
