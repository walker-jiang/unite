import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { is, fromJS } from 'immutable';
import { Layout, Menu, Icon,Badge,Avatar } from 'antd';
import { browserHistory } from 'react-router';
import Config from '../../config/index';
const SubMenu = Menu.SubMenu;
const { Header } = Layout;

/**
 * 公共头部
 *
 * @export
 * @class Lheader
 * @extends {Component}
 */
export class Lheader extends Component {
	constructor(props, context) {
		super(props, context); //后才能用this获取实例化对象
	}
	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
	toggle = () => {
		this.props.toggle(!this.props.collapsed);
  	}
  	logout= (e) => {
  		// 模拟退出
  		if(e.key == 'logout') {
	 		Config.removeLocalItem(Config.localKey.userToken);
	  		this.context.router.push({
				pathname: '/login'
			});
  		}
  	}
	render() {
		return (
			<Header className="layout-header">
	            <Icon className="trigger" type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
							<Badge className="Badge" dot>
					      <a onClick={()=>browserHistory.push('/RootAudit')} ><Icon type="notification"/></a>
					    </Badge>
	            <Menu mode="horizontal" onClick={this.logout} className="layout-header-menu">
				        <SubMenu title={<span style={{fontSize:16}}> <Avatar className="lheader-Avatar">U</Avatar>测试用户</span>}>
				        	<Menu.Item key="logout">注销</Menu.Item>
				        </SubMenu>
			    		</Menu>
	        </Header>
		)
	}
}

Lheader.contextTypes = {
    router: React.PropTypes.object.isRequired
};
