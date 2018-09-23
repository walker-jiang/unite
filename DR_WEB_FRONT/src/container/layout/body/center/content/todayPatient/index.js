import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input, Table, Pagination, LocaleProvider } from 'antd';
import TableIcon from 'components/dr/icon/icons/table';
import ListIcon from 'components/dr/icon/icons/list';
import QuickReception from './quickReception';
import ArrowPicker from 'components/dr/datePicker/arrowPicker';
import inputSty from 'components/antd/style/input';
import Icon from 'components/dr/icon';
import GridItem from './gridItem';
import { today } from 'commonFunc/defaultData';
import zh_CN  from 'antd/lib/locale-provider/zh_CN';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      showWay: 'grid', // 数据展示方式
      patienList: [], // 患者数据
      rcStatus: 0, // 当前标签页
      keyword: '', // 查询关键字
      totalRecords: 40, // 总记录数
      curPage: 1, // 当前页
      pageSize: pageSize * 4, // 每页记录数
    };
    this.getPatientData = this.getPatientData.bind(this);
  };
  componentDidMount(){
    this.getPatientData();
  };
  getPatientData(){
    let date = this.arrowPicker ? this.arrowPicker.state.dateValue : today;
    let self = this;
    let { rcStatus, keyword, totalRecords, curPage, pageSize } = this.state;
    let params = {
      url: 'BuRegisterController/getListByMap',
      data: {
        orgid: window.sessionStorage.getItem('orgid'), // 机构ID
        deptid: window.sessionStorage.getItem('deptid'), // 科室ID
        rcStatus: rcStatus, // 接诊状态
        keyword: keyword, // 患者姓名，姓名拼音简拼手机号
        beginTime: date + ' ' + '00:00:01', // date
        endTime: date + ' ' + '23:59:59',
        page: curPage, // 当前页
        pageSize: pageSize, // 每页记录数
        doctorid: window.sessionStorage.getItem('userid'),
      },
    };
    function callBack(res){
      if(res.result){
        let patienList = res.data.records.map(item => Object.assign(item, { key: item.patientid }))
        self.setState({patienList: patienList});
      }else{
        self.setState({patienList: []});
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [getTableColumns 获取表格列]
   * @param  {[type]} rcStatus [接诊状态]
   * @return {[type]}           [undefined]
   */
  getTableColumns(rcStatus){
    let date = new Date();
    const year = date.getFullYear();
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
      render: (text, record) => year - parseInt(record.birthday.substr(0,4))
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
      title: '就诊医师',
      dataIndex: 'recDoctorname',
      key: 'recDoctorname',
    }, {
      title: '登记时间',
      dataIndex: 'examDate',
      key: 'examDate',
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) =>
        rcStatus == 0 ?
        <Link
          to={'/Layout/treatManage/' + record.patientid}>
          接诊
        </Link>
        :
        (
          rcStatus == 1 ?
            <span>
              <Link
                to={'/Layout/treatManage/' + record.patientid}>
                继续接诊
              </Link>|
              <Link>完成接诊</Link>
            </span>
          : <span>
              <Link
                to={'/Layout/treatManage/' + record.patientid}>
                重新接诊
              </Link>|
              <Link>信息查看</Link>
            </span>
        )

    }];
    return columns;
  };
  toggleTabs(curTab){
    this.setState({
      rcStatus: curTab
    },() => {
      this.getPatientData();
    });
  };
  /**
   * [onShowSizeChange 监听每页显示记录的改变事件函数]
   * @param  {[type]} current [当前页]
   * @param  {[type]} size    [每页记录数]
   * @return {[type]}         [undefined]
   */
  onShowSizeChange = (current, size) => {
    this.setState({ pageSize: size }, () => {
      this.getPatientData();
    });
  };
  onPageChange = (page, pageSize) => {
    this.setState({ curPage: page }, () => {
      this.getPatientData();
    });
  }
  render() {
    let { showWay, patienList, rcStatus,totalRecords, curPage, pageSize } = this.state;
    const columns = this.getTableColumns(rcStatus);
    return (
      <Container>
        <Header>
          <Left>
            <Toggle>
              <SpecTableIcon showWay={showWay} onClick={() => {this.setState({ showWay: 'grid'})}}/>
              <SpecListIcon showWay={showWay} onClick={() => {this.setState({ showWay: 'table'})}}/>
            </Toggle>
            <SpecTabs>
              <TabPane activeTab={rcStatus} _key={0} onClick={(e) => this.toggleTabs(0)}>待接诊（1）</TabPane>
              <TabPane activeTab={rcStatus} _key={1} onClick={(e) => this.toggleTabs(1)}>接诊中（2）</TabPane>
              <TabPane activeTab={rcStatus} _key={2} onClick={(e) => this.toggleTabs(2)}>已完成（4）</TabPane>
            </SpecTabs>
          </Left>
          <Right>
            <QuickReception></QuickReception>
            <ArrowPicker ref={ref => {this.arrowPicker = ref}}></ArrowPicker>
            <SpecInput placeholder='请输入患者姓名/患者编号/身份证号/拼音' onChange={(e) => {this.setState({ keyword: e.target.value })}}></SpecInput>
            <SearchIcon type='search-thin' fill='#FFFFFF' onClick={this.getPatientData}></SearchIcon>
          </Right>
        </Header>
        <Content>
          {
            showWay == 'grid' ?
            (
              <Grid>
              {
                patienList.map(item => <GridItem gridType={rcStatus} key={item.patientid} dataSource={item}></GridItem>)
              }
              </Grid>
            ) :
            (
              <SpecTable dataSource={patienList} columns={columns} pagination={false}/>
            )
          }
        </Content>
        <LocaleProvider locale={zh_CN}>
          <PageContainer>
            <span>• 共有{totalRecords}位已就诊患者记录</span>
            <SpecPagination
              size="small"
              total={totalRecords}
              current={curPage}
              defaultPageSize={pageSize}
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              showQuickJumper />
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
const Toggle = styled.div`
  margin: 20px 0px;
`;
const SpecTableIcon = styled(TableIcon)`
  background: ${props => props.showWay == 'grid' ? 'rgba(10, 110, 203, 1)' : '#999999'};
`;
const SpecListIcon = styled(ListIcon)`
  > div{
    background-color: ${props => props.showWay == 'table' ? 'rgba(10, 110, 203, 1)' : '#999999'};
  }
  border-color: ${props => props.showWay == 'table' ? 'rgba(10, 110, 203, 1)' : '#999999'};
  margin:0px 10px;
`;
const SpecTabs = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  width: fit-content;
`;
const TabPane = styled.div`
  word-wrap: normal;
  white-space: nowrap;
  padding: 5px 5px;
  margin: 0px 10px;
  cursor: pointer;
  border-bottom: ${props => props.activeTab == props._key ? '2px solid #5959e0': 'none'} ;
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
const Grid = styled.div`
  margin: 8px auto;
  width: 1342px;
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
@日期：2018-09-12
@描述：今日诊疗
*/
