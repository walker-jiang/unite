import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
import { Divider,Table,Pagination,Button,Row,Col,Modal  } from 'antd';
import { browserHistory,Link } from 'react-router';
// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';
import QueueAnim from 'rc-queue-anim';
import styles from './style/user.less';
const confirm = Modal.confirm;
/* 以类的方式创建一个组件 */
class Main extends Component {
  constructor(props) {
  	super(props);
      this.state = {
          loading: false,
          userInfo: [],
          userData:[]
      }
  }
  componentDidMount(){
    var self = this;
    self.queryClientUser(1, 10);
  }
  queryClientUser = (current, pageSize) =>{
    var params = {
      currentPage:current,
      pageSize:pageSize
    }
    var returnResult = UserSeivice.QueryUserData(params);
    var userData = returnResult.data;
    var total = returnResult.total;
    this.setState({userData,total});
  }
  PaginationOnChange=(current, pageSize)=>{
    console.log(current, pageSize);
    this.queryClientUser(current, pageSize);
  }
  showDeleteConfirm=()=> {
    confirm({
      title: '删除用户',
      content: '你确定要删除么?',
      okText: '确定删除',
      okType: 'danger',
      cancelText: '返回',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
	render() {
    var self = this;
    var { userData,total } = self.state;
    //{ title: <p className="table-p">姓名</p>,dataIndex: 'name',key: 'name'},
   	const columns = [
      { title: <p className="table-p">用户名</p>,dataIndex: 'users_name',key: 'users_name'},
      { title: <p className="table-p">真实姓名</p>,dataIndex: 'alias',key: 'alias'},
      { title: <p className="table-p">所属领域</p>,dataIndex: 'area_name',key: 'area_name'},
      { title: <p className="table-p">角色</p>,dataIndex: 'users_level',key: 'users_level'},
      { title: <p className="table-p">创建时间</p>,dataIndex: 'gmt_create',key: 'gmt_create'},
      { title: <p className="table-p">操作</p>,
		  	key: 'action',
		  	render: (text, record) => (
		    	<span>
            <a className="cole5e5e5">编辑</a>
            <Divider type="vertical" />
            <a className="cole5e5e5" onClick={()=>{ this.showDeleteConfirm() }}>删除</a>
          </span>
		  	)
		}];
    let userInfo = self.state.userInfo;  // 用户信息数据
		return (
    		<div className="user-container">
          <QueueAnim delay={0} className="queue-simple" type={['right', 'left']}>
            <div key="a">
              <Row><Col offset={21}><Button type="primary" className="addButton" onClick={()=>{ browserHistory.push('/UserAdd') }}>新增用户</Button></Col></Row>
              <Table
                  columns={columns}
                  dataSource={userData}
                  pagination={false}
                  size="middle" />
            </div>
            <div key="b">
              <Pagination
                  style={{marginTop:10,marginBottom:10}}
                  showSizeChanger onChange={this.PaginationOnChange}
                  defaultCurrent={1}
                  total={total}
                  className="Pagination"/>
              // <Pagination size="small" total={50} showSizeChanger showQuickJumper />
            </div>
      		</QueueAnim>
    		</div>
		);
	}
}

Main.contextTypes = {
};

export default Main;
