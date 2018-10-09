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
      totalRecords: 0, // 总记录数
      curPage: 1, // 当前页
      pageSize: pageSize * 4, // 每页记录数
      numbers: {}, // 各个状态的患者数量
    };
    this.getPatientData = this.getPatientData.bind(this);
    this.doing = this.doing.bind(this);
    this.redo = this.redo.bind(this);
    this.done = this.done.bind(this);
    this.view = this.view.bind(this);
    this.keepDoing = this.keepDoing.bind(this);
  };
  componentDidMount(){
    this.getPatientData();
  };
  /** [getPatientData 获取患者] */
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
        let totalRecords = res.data.total;
        self.getPatientNumber();
        self.setState({patienList: patienList, totalRecords});
      }else{
        self.setState({patienList: []});
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getPatientNumber 获取每个状态的总共患者数量] */
  getPatientNumber(){
    let date = this.arrowPicker ? this.arrowPicker.state.dateValue : today;
    let self = this;
    let { rcStatus, keyword, totalRecords, curPage, pageSize } = this.state;
    let params = {
      url: 'BuRegisterController/getSum',
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
        self.setState({
          numbers: res.data
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [modifyRcState 修改接诊状态的函数]
   * @param  {[type]} rcStatus [将要修改为的接诊状态u]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}          [undefined]
   */
  modifyRcState(rcStatus, registerid){
    let self = this;
    let params = {
      url: 'BuRegisterController/receive',
      async: false,
      data: {
        rcStatus: rcStatus, // 接诊状态
        registerid: registerid, // 就诊id
        doctorid: window.sessionStorage.getItem('userid'), // 接诊医生
        doctorname: window.sessionStorage.getItem('username'), // 接诊医生
      },
    };
    function callBack(res){
      console.log('接诊状态修改为0-待接诊 1-接诊中2-已接诊）', rcStatus);
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [doing 接诊函数]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}            [undefined]
   */
  doing(registerid, patientid){
    console.log('接诊');
    window.registerID = registerid;
    window.modifyPermission = 1; // 治疗书写权限0只读 1 可写
    window.patientID = patientid;
    this.modifyRcState(1, registerid);
  };
  /**
   * [redo 重新接诊函数]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}            [undefined]
   */
  redo(registerid, patientid){
    console.log('重新接诊');
    window.modifyPermission = 1; // 治疗书写权限0只读 1 可写
    window.registerID = registerid;
    window.patientID = patientid;
    this.modifyRcState(1, registerid);
  };
  /**
   * [done 完成接诊函数]
   * @param  {[type]}   registerid [接诊ID]
   * @return {Function}            [undefined]
   */
  done(registerid){
    console.log('完成接诊');
    this.modifyRcState(2, registerid);
    this.getPatientData();
  };
  /**
   * [view 查看接诊信息]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}            [undefined]
   */
  view(registerid, patientid){
    console.log('查看你信息');
    window.registerID = registerid;
    window.patientID = patientid;
    window.modifyPermission = 0; // 治疗书写权限0只读 1 可写
  };
  /**
   * [keepDoing 续诊函数]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}            [undefined]
   */
  keepDoing(registerid, patientid){
    console.log('续诊', patientid);
    window.registerID = registerid;
    window.patientID = patientid;
    window.modifyPermission = 1; // 治疗书写权限0只读 1 可写
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
      dataIndex: 'sexDic',
      key: 'sexDic',
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
      dataIndex: 'patienttypeDic',
      key: 'patienttypeDic',
    }, {
      title: '就诊医师',
      dataIndex: 'recDoctorname',
      key: 'recDoctorname',
    }, {
      title: '就诊类型',
      dataIndex: 'casetypeDic',
      key: 'casetypeDic',
    }, {
      title: rcStatus == 0 ? '登记时间' : '就诊时间',
      dataIndex: 'examDate',
      key: 'examDate',
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) =>
        rcStatus == 0 ?
        <StyledLink
          onClick={() => this.doing(record.registerid, patientid)}
          to='/Layout/treatment'>
          接诊
        </StyledLink>
        :
        (
          rcStatus == 1 ?
            <span>
              <StyledLink
                onClick={() => this.keepDoing(record.registerid, record.patientid)}
                to='/Layout/treatment/'>
                继续接诊
              </StyledLink>|
              <StyledLink
                onClick={() => this.done(record.registerid)}
                to='/Layout/todayPatient'>
                完成接诊
              </StyledLink>
            </span>
          : <span>
              <StyledLink
                onClick={() => this.redo(record.registerid, record.patientid)}
                to='/Layout/treatment/'>
                重新接诊
              </StyledLink>|
              <StyledLink
                onClick={() => this.view(record.registerid, record.patientid)}
                to='/Layout/treatment/'>
                信息查看
              </StyledLink>
            </span>
        )
    }];
    if(rcStatus == 2){
      const item = {
        title: '诊断',
        dataIndex: 'diagnosisDesc',
        key: 'diagnosisDesc',
      };
      columns[8] = item;
    }
    return columns;
  };
  /**
   * [toggleTabs 三个tab页切换函数]
   * @param  {[type]} curTab [当前页]
   * @return {[type]}        [undefined]
   */
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
  /**
   * [onPageChange 选择某一页事件]
   * @param  {[type]} page     [选中页]
   * @param  {[type]} pageSize [当前页容量]
   * @return {[type]}          [undefined]
   */
  onPageChange = (page, pageSize) => {
    this.setState({ curPage: page }, () => {
      this.getPatientData();
    });
  }
  getGridList(patienList){
    const cols = 5; // 每行多少列
    const totalLength = patienList.length;
    let girds = [];
    let rowLines = [];
    patienList.map(item => {
      let girdItem = <GridItem gridType={item.rcStatus} key={item.patientid} dataSource={item} doing={this.doing} redo={this.redo} done={this.done} view={this.view} keepDoing={this.keepDoing}></GridItem>
      girds.push(girdItem);
    })
    let rowLength = parseInt(totalLength / cols);
    rowLength = totalLength % cols ? ( rowLength + 1 ) : rowLength; // 条件含义是如果敲好是cols的整数倍直接返回商， 否则的将商 加1 补最后一行（最后一行肯定不满）
    for(let i = 0; i < rowLength; i++){
      let RowLinesItem = (
        <RowLine key={i} width={(girds.slice(i * cols, ( i + 1 ) * cols)).length}>
          {
            girds.slice(i * cols, ( i + 1 ) * cols).map( item => item)
          }
        </RowLine>
      );
      rowLines.push(RowLinesItem);
    }
    return rowLines;
  };
  render() {
    let { showWay, patienList, numbers, rcStatus,totalRecords, curPage, pageSize } = this.state;
    const columns = this.getTableColumns(rcStatus);
    let girds = this.getGridList(patienList);
    console.log('numbers', numbers);
    return (
      <Container>
        <Header>
          <Left>
            <Toggle>
              <SpecTableIcon showWay={showWay} onClick={() => {this.setState({ showWay: 'grid'})}}/>
              <SpecListIcon showWay={showWay} onClick={() => {this.setState({ showWay: 'table'})}}/>
            </Toggle>
            <SpecTabs>
              <TabPane activeTab={rcStatus} _key={0} onClick={(e) => this.toggleTabs(0)}>待接诊（{numbers.noVisit}）</TabPane>
              <TabPane activeTab={rcStatus} _key={1} onClick={(e) => this.toggleTabs(1)}>接诊中（{numbers.visiting}）</TabPane>
              <TabPane activeTab={rcStatus} _key={2} onClick={(e) => this.toggleTabs(2)}>已完成（{numbers.visited}）</TabPane>
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
              {girds}
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
  overflow: hidden;
`;
const Header = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(242, 242, 242, 1);
  padding: 0px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 1px 1px 5px;
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
`;
const RowLine = styled.div`
  display: flex;
  justify-content: space-around;
  width: ${ props => props.width * 20 + '%'};
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
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;
const SpecPagination = styled(Pagination)`
  margin-bottom: 10px;
  .ant-pagination-item-active {
    background-color: #1890ff;
  }
  .ant-pagination-item-active > a{
    color: #FFFFFF;
  }
`;
const StyledLink = styled(Link)`
`;
/*
@作者：姜中希
@日期：2018-09-12
@描述：今日诊疗
*/
