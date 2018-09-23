import React, {Component} from 'react';
import styled from 'styled-components';
import { Input, Table, Pagination, LocaleProvider } from 'antd';
// import QuickReception from './quickReception';
import ArrowPicker from 'components/dr/datePicker/arrowPicker';
import inputSty from 'components/antd/style/input';
import Icon from 'components/dr/icon';
import zh_CN  from 'antd/lib/locale-provider/zh_CN';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      showWay: 'grid',
      activeTab: '1'
    };
  };
  /**
   * [getTableColumns 获取表格列]
   * @param  {[type]} activeTab [接诊状态]
   * @return {[type]}           [undefined]
   */
  getTableColumns(activeTab){
    const columns = [{
      title: '患者编号',
      dataIndex: 'patientno',
      key: 'patientno',
    }, {
      title: '患者姓名',
      dataIndex: 'patientname',
      key: 'patientname',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '年龄',
      dataIndex: 'birthday',
      key: 'birthday',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '身份证号',
      dataIndex: 'cardno',
      key: 'cardno',
    }, {
      title: '患者类型',
      dataIndex: 'patienttype',
      key: 'patienttype',
    }, {
      title: '就诊类型',
      dataIndex: 'casetype',
      key: 'casetype',
    }, {
      title: '就诊医师',
      dataIndex: 'doctorname',
      key: 'doctorname',
    }, {
      title: '登记时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
    }, {
      title: '就诊状态',
      dataIndex: 'rcStatus',
      key: 'rcStatus',
      render: (text, record) =>
        record.rcStatus == 0 ?
        <State_to_do>•待接诊</State_to_do>
        : (record.rcStatus == 1 ?
          <State_doing>•接诊中</State_doing>
          : <State_done>•已接诊</State_done>
        )
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
    }];
    return columns;
  };
  /**
   * [getDataSource 表格数据]
   * @param  {[type]} source [数据源]
   * @return {[type]}        [undefined]
   */
  getDataSource(source){
    let dataSource = [{
      patientno: '1102342456',
      patientname: '刘德华',
      sex: '男',
      birthday: '38',
      mobile: '152****4321',
      cardno: '110105**********78',
      patienttype: '普通医保',
      casetype: '初诊',
      doctorname: '王琰龙',
      registerTime: '2018-08-20 08:12:02',
      rcStatus: 0
    }, {
      patientno: '11023424561',
      patientname: '刘德华',
      sex: '男',
      birthday: '38',
      mobile: '152****4321',
      cardno: '110105**********78',
      patienttype: '普通医保',
      casetype: '初诊',
      doctorname: '王琰龙',
      registerTime: '2018-08-20 08:12:02',
      rcStatus: 1
    }, {
      patientno: '11023424562',
      patientname: '刘德华',
      sex: '男',
      birthday: '38',
      mobile: '152****4321',
      cardno: '110105**********78',
      patienttype: '普通医保',
      casetype: '初诊',
      doctorname: '王琰龙',
      registerTime: '2018-08-20 08:12:02',
      rcStatus: 2
    }];
    return dataSource;
  };
  render() {
    let { showWay, activeTab } = this.state;
    const columns = this.getTableColumns(activeTab);
    const dataSource = this.getDataSource();
    return (
      <Container>
        <Header>
          <Left>
            <Title><ArrowIcon type='right_arrow'/>患者登记/挂号信息列表</Title>
          </Left>
          <Right>
{
  // <QuickReception></QuickReception>

}            <ArrowPicker></ArrowPicker>
            <SpecInput placeholder='请输入患者姓名/患者编号/身份证号/拼音'></SpecInput>
            <SearchIcon type='search-thin' fill='#FFFFFF'></SearchIcon>
          </Right>
        </Header>
        <Content>
          <SpecTable dataSource={dataSource} columns={columns} pagination={false}/>
        </Content>
        <LocaleProvider locale={zh_CN}>
          <PageContainer>
            <span>• 共有5位已就诊患者记录</span>
            <SpecPagination size="small" total={50} showSizeChanger showQuickJumper />
          </PageContainer>
        </LocaleProvider>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
  width: 100%;
`;
const Header = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(242, 242, 242, 1);
  padding: 0px 10px;
`;
const Left = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const Title = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const ArrowIcon = styled(Icon)`
  height: 32px;
  width: 18px;
  margin-top: 5px;
`;
const Right = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const SpecInput = styled(Input)`
  ${inputSty.direct}
  &&& {
    width: 297px;
    height: 28px;
    color: #000000;
  }
`;
const SearchIcon = styled(Icon)`
  background-color: #258FF1;
  width: 26px;
  height: 27px;
  padding: 5px;
  margin-top: 3px;
  margin-left: -2px;
`;
const Content = styled.div`
  width: 100%;
  position: relative;
`;
const SpecTable = styled(Table)`
  margin: 16px;
  th {
    background: #E4E4E4 !important;
  }
  tr {
    height: 40px;
  }
`;
const State_to_do =styled.span`
  color: rgb(16, 141, 233);
`;
const State_doing =styled.span`
  color: rgb(255, 153, 0);
`;
const State_done =styled.span`
  color: rgb(0, 153, 0);
`;
const PageContainer = styled.div`
  width: 100%;
  float: left;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
`;
const SpecPagination = styled(Pagination)`
  .ant-pagination-item-active {
    background-color: #1890ff;
  }
  .ant-pagination-item-active > a{
    color: #FFFFFF;
  }
`;
/*
@作者：姜中希
@日期：2018-09-19
@描述：患者登记
*/
