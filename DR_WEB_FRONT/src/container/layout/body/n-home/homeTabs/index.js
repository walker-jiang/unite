import React, {Component} from 'react';
import styled from 'styled-components';
import { Layout,Table,Card,Tabs} from 'antd';
import Icon from 'components/dr/icon';
import IconSty from 'components/dr/icon/iconStyle';
const TabPane = Tabs.TabPane;
import "./homeTabs.less";
class HomeTabs extends React.Component {

constructor(props) {
  super(props);
    this.state = {

    };
}
render(){
   let length2 =this.props.data2.length,
       length1 =this.props.data.length,
       length3 =this.props.data3.length;
  return(
    <div className="homeTabs">
      <Tabs defaultActiveKey="待接诊" onChange={this.callback} type="card"  style={{color:'#1f3f69'}} >
        <TabPane tab="待接诊" key="待接诊" style={{color:'#1f3f69'}}>
          <Table  columns={this.props.columns} pagination={{pageSize:5}}  dataSource={this.props.data} locale={{emptyText: length1==0?  <NoData type='empty' /> :'' }}/>
        {length1>0?<Dataleng >• 共有{length1}位待就诊患者记录</Dataleng>:null}
        </TabPane>
        <TabPane tab="接诊中" key="接诊中">
          <Table  columns={this.props.columns2} pagination={{pageSize:5}} dataSource={this.props.data2} locale={{emptyText: length2==0?  <NoData type='empty' /> : ''}}/>
        {length2>0?<Dataleng>• 共有{length2}位就诊中患者记录</Dataleng>:null}
        </TabPane>
        <TabPane tab="已完成" key="已完成">
          <Table columns={this.props.columns3} pagination={{pageSize:5}} dataSource={this.props.data3} locale={{emptyText: length3==0? <NoData type='empty' /> : ''}}/>
          {length3>0?<Dataleng>• 共有{length3}位已就诊患者记录</Dataleng>:null}
        </TabPane>
      </Tabs>
   </div>
  )
}
}
export default HomeTabs
const Dataleng =styled.div`
  margin-top:-47px;
  background:#F9F9F9;
  height:50px;
  line-height:50px;
  padding-left:10px;
`
const NoData = styled(Icon)`
  width: 35px;
  height: 35px;
`;
