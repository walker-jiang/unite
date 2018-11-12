import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import { is, fromJS } from 'immutable';
import styled from 'styled-components';
import Loadable from 'react-loadable'; // 加载时进行模块分离
// 公共头部
// 公共菜单
import { Lmenu } from './lmenu';
// 公共底部

// 布局样式
// import './style/layout.less';
//国际化
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';


import { Switch, Route, IndexRoute, Router, Link  } from 'react-router-dom';
import { Layout, Dropdown, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
const { Content, Footer, Sider, Header } = Layout;
const SubMenu = Menu.SubMenu;

const loadingComponent = () => (<div>Loading...</div>);
// const HomeIndex = () => <h1>hello world</h1>
// const HomeIndex1  = () => <h1>就爱你过</h1>

//首页
const HomeIndex = Loadable({
  loader: () => import('../../containers/home/index.js'),
  loading: loadingComponent,
});

//临床指南
const ClinicalGuideline = Loadable({
  loader: () => import('../../containers/clinicalGuideline/index.jsx'),
  loading: loadingComponent,
});

//zhongyao
const Pipei = Loadable({
  loader: () => import('../../containers/zhongyaopipei/index'),
  loading: loadingComponent,
});

//zhongcheng
const ProprietaryChineseMedicine = Loadable({
  loader: () => import('../../containers/proprietaryChineseMedicine/index'),
  loading: loadingComponent,
});

//shiyi
const AppropriateTechnologies = Loadable({
  loader: () => import('../../containers/appropriateTechnologies/index'),
  loading: loadingComponent,
});

//现代方剂
const mprescription = Loadable({
  loader: () => import('../../containers/mprescription/index'),
  loading: loadingComponent,
});

//古代方剂
const aprescription = Loadable({
  loader: () => import('../../containers/aprescription/index'),
  loading: loadingComponent,
});

//中成药
const cpmedicine = Loadable({
  loader: () => import('../../containers/cpmedicine/index'),
  loading: loadingComponent,
});

//中药
const chineseMedicine = Loadable({
  loader: () => import('../../containers/chineseMedicine/index'),
  loading: loadingComponent,
});

//期刊文献管理
const abstract = Loadable({
  loader: () => import('../../containers/abstract/index'),
  loading: loadingComponent,
});

//名医医案管理
const tzMedicalcase = Loadable({
  loader: () => import('../../containers/tzMedicalcase/index'),
  loading: loadingComponent,
});

//穴位信息管理
const acupoint = Loadable({
  loader: () => import('../../containers/acupoint/index'),
  loading: loadingComponent,
});

//文章资源管理
const article = Loadable({
  loader: () => import('../../containers/article/index'),
  loading: loadingComponent,
});

//数据字典管理
const dataDictionaries = Loadable({
  loader: () => import('../../containers/dataDictionaries/index'),
  loading: loadingComponent,
});
/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  constructor(props) {
    super(props);
    this.handleScrollCallback = this.handleScrollCallback.bind(this);
  }

	handleScrollCallback() {
		console.log("A scroll event occurred!");
	}
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  render() {
    return (
      <Layout className="layout">
        <Sider1><Lmenu style={{ backgroundColor:"#fff"}}/></Sider1>
      <Content className="layout-content" style={{ overflow: 'auto',marginLeft:'2px'}}>
           {/* <Route path="/Layout/sub" component={HomeIndex} exact></Route> */}
           {/* <Route path="/Layout/sub/home" component={HomeIndex1} exact></Route> */}
           <Route path="/Layout/sub/Home" component={HomeIndex} exact></Route>
           <Route path="/Layout/sub/clinical" component={ClinicalGuideline} exact></Route>
           <Route path="/Layout/sub/zhong" component={Pipei} exact></Route>
           <Route path="/Layout/sub/zhongCheng" component={ProprietaryChineseMedicine} exact></Route>
           <Route path="/Layout/sub/shiYi" component={AppropriateTechnologies} exact></Route>
           <Route path="/Layout/sub/mprescription" component={mprescription} exact></Route>
           <Route path="/Layout/sub/aprescription" component={aprescription} exact></Route>
           <Route path="/Layout/sub/cpmedicine" component={cpmedicine} exact></Route>
           <Route path="/Layout/sub/chineseMedicine" component={chineseMedicine} exact></Route>
           <Route path="/Layout/sub/abstract" component={abstract} exact></Route>
           <Route path="/Layout/sub/tzMedicalcase" component={tzMedicalcase} exact></Route>
           <Route path="/Layout/sub/acupoint" component={acupoint} exact></Route>
           <Route path="/Layout/sub/article" component={article} exact></Route>
           <Route path="/Layout/sub/dataDictionaries" component={dataDictionaries} exact></Route>
        </Content>
      </Layout>
    );
  }
}
const Sider1 = styled(Sider)`
   background-color: #fff !important;
 `
export default Main;
