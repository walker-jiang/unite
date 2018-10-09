/* ------------------------------------------------------------
    author : fuguolin
    create:2018-01-21
    descreption:内嵌table
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Table, Icon, Switch, Radio, Form, Divider,Badge,Menu,Dropdown } from 'antd';
import { browserHistory } from 'react-router';
const FormItem = Form.Item;
const menu = (
  <Menu>
    <Menu.Item>
      操作1
    </Menu.Item>
    <Menu.Item>
      操作2
    </Menu.Item>
  </Menu>
);
const columns = [{
  title: '测试字段1',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '测试字段2',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '测试字段3',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">修改</a>
      <Divider type="vertical" />
      <a href="#">删除</a>
    </span>
  ),
}];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: '测试字段',
    age: `${i}2`,
    address: `测试字段 ${i}`,
    description: `测试字段`,
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => {return <div style={{fontSize:22,marginLeft:20}}>{"标题标题标题标题标题标题标题标题标题标题"}</div>};
const showHeader = true;
const footer = () => {return <div style={{fontSize:22,marginLeft:20}}>{"尾部尾部尾部尾部尾部尾部尾部尾部尾部尾部"}</div>};
const scroll = { y: 240 };

class NestedTable extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination: true,
    size: 'default',
    expandedRowRender,
    title,
    showHeader,
    footer,
    rowSelection: {},
    scroll: undefined,
  }

  handleToggle = (prop) => {
    return (enable) => {
      this.setState({ [prop]: enable });
    };
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  handleExpandChange = (enable) => {
    this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
  }

  handleTitleChange = (enable) => {
    this.setState({ title: enable ? title : undefined });
  }

  handleHeaderChange = (enable) => {
    this.setState({ showHeader: enable ? showHeader : false });
  }

  handleFooterChange = (enable) => {
    this.setState({ footer: enable ? footer : undefined });
  }

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  }

  handleScollChange = (enable) => {
    this.setState({ scroll: enable ? scroll : undefined });
  }

  render() {
    const state = this.state;
    const expandedRowRender = () => {
      const columns = [
        { title: '自测字段1', dataIndex: 'date', key: 'date' },
        { title: '自测字段2', dataIndex: 'name', key: 'name' },
        { title: '自测字段3', key: 'state', render: () => <span><Badge status="success" />自测字段1-3</span> },
        { title: '自测字段4', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: () => (
            <span className="table-operation">
              <a href="#">删除</a>
              <Divider type="vertical" />
              <a href="#">修改</a>
              <Divider type="vertical" />
              <Dropdown overlay={menu}>
                <a href="#">
                  More <Icon type="down" />
                </a>
              </Dropdown>
            </span>
          ),
        },
      ];

      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          date: '自测字段1-1',
          name: '自测字段1-2',
          upgradeNum: '自测字段1-4',
        });
      }
      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      );
    };
    return (
      <div>
        <div className="components-table-demo-control-bar">
          <Form layout="inline" style={{paddingTop:20,marginLeft:20,fontSize:20}}>
            <FormItem label="边框">
              <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
            </FormItem>
            <FormItem label="等待">
              <Switch checked={state.loading} onChange={this.handleToggle('loading')} />
            </FormItem>
            <FormItem label="分页">
              <Switch checked={state.pagination} onChange={this.handleToggle('pagination')} />
            </FormItem>
            <FormItem label="标题">
              <Switch checked={!!state.title} onChange={this.handleTitleChange} />
            </FormItem>
            <FormItem label="列头">
              <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
            </FormItem>
            <FormItem label="尾部">
              <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
            </FormItem>
            <FormItem label="内嵌">
              <Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange} />
            </FormItem>
            <FormItem label="多选">
              <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
            </FormItem>
            <FormItem label="滚动">
              <Switch checked={!!state.scroll} onChange={this.handleScollChange} />
            </FormItem>
            <FormItem label="尺寸">
              <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                <Radio.Button value="default">默认</Radio.Button>
                <Radio.Button value="middle">中</Radio.Button>
                <Radio.Button value="small">小</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form>
        </div>
        <Table {...this.state} columns={columns} dataSource={data}  expandedRowRender={expandedRowRender}/>
      </div>
    );
  }
}
module.exports = NestedTable
