import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon,Carousel,Row,Col,Button,Modal,Table,Form,Checkbox,Card,Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import "./homeTabs.less"
const { Header, Content, Footer, Sider } = Layout;
class HomeTabs extends React.Component {

constructor(props) {
  super(props);
    this.state = {

    };
}
render(){
  return(
    <div className="homeTabs">
      <Tabs defaultActiveKey="待接诊" onChange={this.callback} type="card" >
        <TabPane tab="待接诊" key="待接诊">
          <Table columns={this.props.columns} pagination={{pageSize:5}}  dataSource={this.props.data}  />
        </TabPane>
        <TabPane tab="接诊中" key="接诊中">
          <Table columns={this.props.columns2} pagination={{pageSize:5}} dataSource={this.props.data2}  />
        </TabPane>
        <TabPane tab="已完成" key="已完成">
          <Table columns={this.props.columns3} pagination={{pageSize:5}} dataSource={this.props.data3}  />
        </TabPane>
      </Tabs>
      <div style={{marginTop:"-47px",background:"#F9F9F9",border:"1px solid #D7D7D7",height:"50px",lineHeight:"50px",paddingLeft:"10px"}}>• 共有{this.props.date}位已就诊患者记录</div>
    </div>
  )
}
}
export default HomeTabs
