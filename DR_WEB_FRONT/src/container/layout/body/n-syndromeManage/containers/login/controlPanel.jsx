import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { is, fromJS } from 'immutable';
import { IndexRoute, browserHistory } from 'react-router';
import styles from './style/login.less';
import QueueAnim from 'rc-queue-anim';//动态组件
import LineChart from '../../component/echarts/lineChart'
import BarChart from '../../component/echarts/BarChart'
import { Icon, Row, Col, Card, Button, Collapse, Divider, Message } from 'antd';
import LoginService from '../../services/loginService';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      AllAppNo:0,//企业批准文号总申请数
      noNotPass:0,//企业批准文号未通过审批总数
      appNoAudit:0,//企业批准文号审批总数
      feedbackAll:0,//数据反馈总数
      feedBackOneMonth:0//一个月内的反馈数据数
    };
  }
  componentDidMount(){
    let a=localStorage.getItem("orgcode")
    let b = localStorage.getItem("orgtype")
    let c ={
      orgCode:a,
      orgType:b
    }
    let dataGraph=LoginService.dataGraph(c)
    console.log("888888888888888",dataGraph.data);
    if(dataGraph.result){
      this.setState({
        data:dataGraph.data,
        AllAppNo:dataGraph.data.AllAppNo,//企业批准文号总申请数
        noNotPass:dataGraph.data.noNotPass,//企业批准文号未通过审批总数
        appNoAudit:dataGraph.data.appNoAudit,//企业批准文号审批总数
        feedbackAll:dataGraph.data.feedbackAll,//数据反馈总数
        feedBackOneMonth:dataGraph.data.feedBackOneMonth//一个月内的反馈数据数
      })
    }
    Message.destroy();
  }

  render() {
    const data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];
    const BarData =[
      {"root_count":200,"creator":"创建者"},
      {"root_count":150,"creator":"创建者"},
      {"root_count":180,"creator":"创建者"},
      {"root_count":190,"creator":"创建者"},
      {"root_count":80,"creator":"创建者"},
      {"root_count":200,"creator":"创建者"},
      {"root_count":150,"creator":"创建者"},
      {"root_count":180,"creator":"创建者"},
      {"root_count":190,"creator":"创建者"},
      {"root_count":80,"creator":"创建者"},
    ]
    return (
      <QueueAnim delay={0} className="queue-simple" type={['right', 'left']} >
          <div>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><Card style={{marginRight:10}}><LineChart/></Card></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><Card style={{marginLeft:10}}><BarChart /></Card></Col>
            </Row>
          </div>
          <Card title={<div style={{color:'red',fontSize:16}}><b><Icon type="file-text"  style={{marginRight:10}}/></b>提醒信息</div>} style={{marginTop:20}}>
            <Row>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div style={{lineHeight:0.2}}>
                  下载信息
                  <Divider style={{width:350}}/>
                  <Row>
                    <Col span = {18} style={{color:'#00D881'}}><Icon type="exclamation-circle" style={{marginRight:10}}/>当天下载总数</Col>
                    <Col span = {4}>2条</Col>
                  </Row>
                  <Divider style={{width:350}}/>
                  <Row>
                    <Col span = {18}>当天医院反馈数据的待下载数</Col>
                    <Col span = {4}>2条</Col>
                  </Row>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div style={{lineHeight:0.2}}>
                  数据反馈
                  <Divider style={{width:350}}/>
                  <Row>
                    <Col span = {18}>数据反馈总数</Col>
                    <Col span = {4}>{this.state.feedbackAll}</Col>
                  </Row>
                  <Divider style={{width:350}}/>
                  <Row>
                    <Col span = {18}>一个月内的反馈数据数</Col>
                    <Col span = {4}>{this.state.feedBackOneMonth}</Col>
                  </Row>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div style={{lineHeight:0.2}}>
                  批准文号
                  <Divider style={{width:350}}/>
                  <Row>
                    {/**<Col span = {18} style={{color:'#0099FF'}}><Icon type="exclamation-circle" style={{marginRight:10}}/>当天下载总数</Col>**/}
                    <Col span = {18}>企业批准文号审批总数</Col>
                    <Col span = {4}>{this.state.AllAppNo}条</Col>
                  </Row>
                  <Divider style={{width:350}}/>
                  <Row>
                    <Col span = {18}>企业批准文号总申请数</Col>
                    <Col span = {4}>{this.state.appNoAudit}条</Col>
                  </Row>
                  <Divider style={{width:350}}/>
                  <Row>
                    <Col span = {18}>企业批准文号未通过审批总数</Col>
                    <Col span = {4}>{this.state.noNotPass}条</Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>
      </QueueAnim>
    );
  }
}
export default Main;
