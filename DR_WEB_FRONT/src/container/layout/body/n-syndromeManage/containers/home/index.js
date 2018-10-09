import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { is, fromJS } from 'immutable';
import { IndexRoute, browserHistory } from 'react-router';
import './style/homeIndex.less';
import ColItem from '../../component/Form/ColItem';
import BasicTable from '../../component/Table/TableBasic.jsx';
import AddMenu from './addMenu.jsx';
import SearchForm from './searchForm.jsx';
import QueueAnim from 'rc-queue-anim';//动态组件
import $ from 'jquery';
import { Icon, Row, Col, Button, Input, Select, Form, Table, Divider, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class HomeIndex extends Component {
  state = {
    visible: false,
    addVisible: false,
    data: [
      { key: '1',1: '1',2: 32 },
      { key: '2',1: '2',2: 42 },
      { key: '3',1: '3',2: 32 },
      { key: '4',1: '4',2: 32 },
      { key: '5',1: '5',2: 32 },
      { key: '6',1: '6',2: 32 }
    ],
  }
  /**
   * 提交表单
   * @method handleSearch
   * @param  {[type]}     e [表单数据项]
   */
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }
  /**
   * 展示系统推荐列表list
   * @method showList
   * @param  {[type]} boolean
   */
  showList = (visible) =>{
    this.setState({ visible });
  }
  /**
   * 新增按钮
   * @method showAddModal
   * @param  {[type]}     visible [description]
   */
  showAddModal = (addVisible) =>{
    this.setState({ addVisible });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    var { addVisible, visible, data } = this.state;
    const columns = [
      { title: '序号',dataIndex: '1',key: '1',width:'25%'},
      { title: '推荐名称',dataIndex: '2',key: '2',width:'25%'},
      { title: '排序',dataIndex: '3',key: '3',width:'50%',
        render: () => (
          <span className="table-operation" style={{float:'right',marginRight:20}}>
            <a>编辑</a><Divider type="vertical" />
            <a>上移</a><Divider type="vertical" />
            <a>下移</a><Divider type="vertical" />
            <a>置顶</a><Divider type="vertical" />
            <a>置底</a>
          </span>
        )
      }
    ];
    return (
      <div className="HomeIndex">
        <div className="HomeIndex_div">
          <p>导航管理</p><hr/><hr className="hr1"/>
          <SearchForm form={this.props.form}/>
          <BasicTable/>
          <Modal
            title="系统推荐列表"
            mask={false}
            footer={null}
            centered={true}
            visible={visible}
            onOk={()=>{ this.showList(true) }}
            onCancel={()=>{ this.showList(false) }}
            className="HomeIndex_Modal"
          >
            <Table columns={columns} dataSource={data} size="small" pagination={false} style={{paddingBottom:50}}/>
          </Modal>
          <Modal
            title="新增导航"
            mask={false}
            width={800}
            footer={null}
            centered={true}
            visible={addVisible}
            onOk={()=>{ this.showAddModal(true) }}
            onCancel={()=>{ this.showAddModal(false) }}
            className="HomeIndex_Modal"
          >
            <AddMenu/>
          </Modal>
        </div>
      </div>
    );
  }
}

const HomeIndexIndex = Form.create()(HomeIndex);
export default HomeIndexIndex;
