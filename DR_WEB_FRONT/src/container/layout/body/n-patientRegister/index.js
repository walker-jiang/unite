import React, {Component} from 'react';
import styled from 'styled-components';
import { Input, Table, Pagination, LocaleProvider, Button } from 'antd';
import { Link } from 'react-router-dom';
import ArrowPicker from 'components/dr/datePicker/arrowPicker';
import inputSty from 'components/antd/style/input';
import Icon from 'components/dr/icon';
import { today } from 'commonFunc/defaultData';
import zh_CN  from 'antd/lib/locale-provider/zh_CN';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      showWay: 'grid',
      patienList: [], // 患者数据
      rcStatus: 0, // 当前标签页
      keyword: '', // 查询关键字
      totalRecords: 0, // 总记录数
      curPage: 1, // 当前页
      pageSize: pageSize * 4, // 每页记录数
    };
    this.getPatientData = this.getPatientData.bind(this);
  };
  componentWillMount(){
    this.getPatientData();
  };
  /** [getPatientData 获取患者数据] */
  getPatientData(){
    console.log('this.arrowPicker', this.arrowPicker);
    let date = this.arrowPicker ? this.arrowPicker.state.dateValue : today;
    let self = this;
    let { rcStatus, keyword, totalRecords, curPage, pageSize } = this.state;
    let params = {
      url: 'BuRegisterController/getListByMap',
      data: {
        orgid: window.sessionStorage.getItem('orgid'), // 机构ID
        deptid: window.sessionStorage.getItem('deptid'), // 科室ID
        // rcStatus: rcStatus, // 接诊状态
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
        self.setState({patienList: patienList, totalRecords});
      }else{
        self.setState({patienList: []});
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getTableColumns 获取表格列] */
  getTableColumns(){
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
      title: '就诊类型',
      dataIndex: 'casetypeDic',
      key: 'casetypeDic',
    }, {
      title: '就诊医师',
      dataIndex: 'recDoctorname',
      key: 'recDoctorname',
    }, {
      title: '登记时间',
      dataIndex: 'examDate',
      key: 'examDate',
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
      render: (text, record) =>
        <span>
          <StyledLink
            onClick={() => this.doing(record.registerid)}
            to={'/Layout/treatment/' + record.patientid}>
            修改
          </StyledLink>
          |
          <StyledLink
            onClick={() => this.doing(record.registerid)}
            to={'/Layout/treatment/' + record.patientid}>
            查看
          </StyledLink>
        </span>
    }];
    return columns;
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
  render() {
    let { patienList, totalRecords, curPage, pageSize } = this.state;
    const columns = this.getTableColumns();
    return (
      <Container>
        <Header>
          <Left>
            <Title><ArrowIcon type='right_arrow'/>患者登记/挂号信息列表</Title>
          </Left>
          <Right>
            <RegisterButton>
              <Link to='/Layout/registerForm'>
                患者登记
              </Link>
            </RegisterButton>
            <ArrowPicker ref={ref => {this.arrowPicker = ref}}></ArrowPicker>
            <SpecInput placeholder='请输入患者姓名/患者编号/身份证号/拼音' onChange={(e) => {this.setState({ keyword: e.target.value })}}></SpecInput>
            <SearchIcon type='search-thin' fill='#FFFFFF' onClick={this.getPatientData}></SearchIcon>
          </Right>
        </Header>
        <Content>
          <SpecTable dataSource={patienList} columns={columns} pagination={false}/>
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
  box-shadow: rgba(0, 0, 0, 0.35) 1px 1px 5px;
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
const RegisterButton = styled(Button)`
  ${buttonSty.semicircle}
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
const StyledLink = styled(Link)`
  margin: 10px;
`;
/*
@作者：姜中希
@日期：2018-09-19
@描述：患者登记
*/
