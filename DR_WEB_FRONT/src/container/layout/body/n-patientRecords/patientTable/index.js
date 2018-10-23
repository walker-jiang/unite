import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Input, Table, Pagination, LocaleProvider } from 'antd';
import health from '../images/health.png'
import ArrowPicker from 'components/dr/datePicker/arrowPicker';
import inputSty from 'components/antd/style/input';
import buttonSty from 'components/antd/style/button';
import Icon from 'components/dr/icon';
import { today } from 'commonFunc/defaultData';
import zh_CN  from 'antd/lib/locale-provider/zh_CN';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const nowdate = new Date();
nowdate.setMonth(nowdate.getMonth()-1); 
const y = nowdate.getFullYear(); 
const m = nowdate.getMonth()+1; 
const d = nowdate.getDate(); 
const formatwdate = y+'-'+m+'-'+d; 
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
      basicOperation: ''
    };
    this.getPatientData = this.getPatientData.bind(this);
    this.quickReceive = this.quickReceive.bind(this);
    
    
  };
  quickReceive(){
    
    this.setState({
      basicOperation: 'add'
    },function(){
      let basicOperation = this.state.basicOperation;
      let pram = 2;
      this.props.onToggle(basicOperation,pram);
    })
  }
  componentDidMount(){
    this.getPatientData();
  };
  /** [getPatientData 获取患者] */
  getPatientData(){
    let date = this.arrowPicker ? this.arrowPicker.state.dateValue : today;
    let self = this;
    let { keyword, totalRecords, curPage, pageSize } = this.state;
    let params = {
      url: 'BaPatientController/getListByMap',
      data: {
        keyword: keyword, // 患者姓名，姓名拼音简拼手机号
        orderBy: '',
        beginTime: date + ' ' + '00:00:01', // date
        endTime: date + ' ' + '23:59:59',
        page: curPage, // 当前页
        pageSize: pageSize, // 每页记录数
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
  onSee(text, index, record){
    this.setState({
      basicOperation: 'view'
    }, function(){
      console.log('onSee',record)
      let basicOperation = this.state.basicOperation;
      let patientid = record.patientid;//患者ID
      let ctsorgidDic = record.ctsorgidDic;//机构
      let upstamp = record.upstamp;//就诊日期
      let patientname = record.patientname;//患者姓名
      let sex = record.sex;//患者性别
      let sexDic = record.sexDic;//患者性别
      let birthday = y - record.birthday.substr(0,4);//患者年龄
      let patienttypeDic = record.patienttypeDic;//患者类型
      let cardtype = record.cardtype;
      let cardno = record.cardno;
      let mobile = record.mobile;
      let pram = 3;
      this.props.onToggle(basicOperation,pram,patientid,ctsorgidDic,upstamp,patientname,sex,sexDic,birthday,patienttypeDic,cardtype,cardno,mobile);
    })
  }
  onEdit(text, index, record){
    this.setState({
      basicOperation: 'modify'
    }, function(){
      console.log('onEdit',record)
      let basicOperation = this.state.basicOperation;
      let patientid = record.patientid;//患者ID
      let ctsorgidDic = record.ctsorgidDic;//机构
      let upstamp = record.upstamp;//就诊日期
      let patientname = record.patientname;//患者姓名
      let sex = record.sex;//患者性别
      let sexDic = record.sexDic;//患者性别
      let birthday = y - record.birthday.substr(0,4);//患者年龄
      let patienttypeDic = record.patienttypeDic;//患者类型
      let cardtype = record.cardtype;
      let cardno = record.cardno;
      let mobile = record.mobile;
      let pram = 3;
      this.props.onToggle(basicOperation,pram,patientid,ctsorgidDic,upstamp,patientname,sex,sexDic,birthday,patienttypeDic,cardtype,cardno,mobile);
    })
  }
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
      title: '档案创建时间',
      dataIndex: 'upstamp',
      key: 'upstamp',
    }, {
      title: '医疗机构名称',
      dataIndex: 'ctsorgidDic',
      key: 'ctsorgidDic',
    }, {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    }, {
      title: "操作",
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <div key={index}>
          <OperationCell onClick={() => { this.onSee(text, index, record) }}>查看档案详细</OperationCell> &nbsp;| &nbsp;
          <OperationCell onClick={() => { this.onEdit(text, index, record) }}>修改档案信息</OperationCell> 
        </div>
      )
    }
  ];
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
    let { patienList, rcStatus,totalRecords, curPage, pageSize } = this.state;
    const columns = this.getTableColumns(rcStatus);
    return (
      <Container>
        <Header>
          <Left>
            <ImageHealth src={health}/>
            <Title>患者档案</Title>
          </Left>
          <Right>
            <RegisterButton onClick={this.quickReceive}>患者建档</RegisterButton>
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
  overflow: hidden;
`;
const RegisterButton = styled(Button)`
  ${buttonSty.semicircle}
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
const Title = styled.div`
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
`;
const ImageHealth = styled.img`
  width: 2rem;
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
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  height: calc(100% - 110px);
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
const OperationCell = styled.i`
  color: #108DE9;
  cursor: pointer;
`;
/*
@作者：王崇琨
@日期：2018-09-26
@描述：患者档案
*/
