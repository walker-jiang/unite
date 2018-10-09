import React, { Component } from 'react';
import { Table, Row, Col, DatePicker, Input, Pagination, LocaleProvider } from 'antd';
import styled from 'styled-components';
import inputSty from 'components/antd/style/input';
import 'antd/lib/button/style';
import moment from 'moment';
import Icon from 'components/dr/iconRight';
import { today } from 'commonFunc/defaultData';
import zh_CN  from 'antd/lib/locale-provider/zh_CN';
import bingLi from '../images/bingLi.png'
import getResource from 'commonFunc/ajaxGetResource';

const Search = Input.Search;
const nowdate = new Date();
nowdate.setMonth(nowdate.getMonth()-1); 
const y = nowdate.getFullYear(); 
const m = nowdate.getMonth()+1; 
const d = nowdate.getDate(); 
const formatwdate = y+'-'+m+'-'+d; 
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endOpen: false,
      startValue: formatwdate, 
      endValue: today,
      patienList: [], // 患者数据
      rcStatus: 0, // 当前标签页
      keyword: '', // 查询关键字
      totalRecords: 0, // 总记录数
      curPage: 1, // 当前页
      pageSize: pageSize * 4, // 每页记录数
    };
    this.onStartChange = this.onStartChange.bind(this);
    this.handleStartOpenChange = this.handleStartOpenChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.handleEndOpenChange = this.handleEndOpenChange.bind(this);
    this.getPatientData = this.getPatientData.bind(this);
  }

componentWillMount () {
  this.changeTime()
}

//点击搜索框搜索
getPatientData(){
  this.changeTime ()
}

//第一次初始时间和改变时间
changeTime () {
  let { keyword, totalRecords, curPage, pageSize } = this.state;
  let beginTime = this.state.startValue;
  let endTime = this.state.endValue;
  let params = {
    url: 'BuPatientCaseController/getListByMap',
    data: {
      beginTime: beginTime,
      endTime: endTime,
      Keyword: keyword,
      page: curPage, // 当前页
      pageSize: pageSize, // 每页记录数
    }
  };
  let that = this;
  function callBack(res){
      if(res.result){
        let patienList = res.data.records.map((item, index)=>{
          item.key = index; // 加唯一key值
          return item
        });
        let totalRecords = res.data.total;
        that.setState({patienList: patienList, totalRecords});
    }else{
      that.setState({patienList: []});
        console.log('异常响应信息', res);
    }
  };
  getResource(params, callBack);
};

//操作
operationCell (text, index, record) {
  let patientid = record.patientid;//患者ID
  let patientname = record.patientname;//患者姓名
  let sex = record.sex;//患者性别
  let birthday = y - record.birthday.substr(0,4);//患者年龄
  let patienttypeDic = record.patienttypeDic;//患者类型
  let examDate = record.examDate.substr(0,10);//就诊日期
  let casetype = record.casetype;//初复诊
  let pram = 2;
  this.props.onToggle(pram,patientid,patientname,sex,birthday,patienttypeDic,examDate,casetype);
}

onHeaderRow(column, index) {

}

disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  //改变时间：开始时间，结束时间
  onChange = (field, value) => {
    let dateValue = value.format('YYYY-MM-DD');
    console.log('dateValue',dateValue)
    this.setState({
      [field]: dateValue,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
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
      title: '就诊日期',
      dataIndex: 'examDate',
      key: 'examDate',
    }, {
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
      render: (text, record) => record.sex == "01"?'男':'女'
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      render: (text, record) => year - parseInt(record.birthday?record.birthday.substr(0,4):year)
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
      title: '诊断',
      dataIndex: 'diagnosisDesc',
      key: 'diagnosisDesc',
    }, {
      title: "操作",
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <div key={index}>
          <OperationCell onClick={() => { this.operationCell(text, index, record) }}>电子病历详情</OperationCell> 
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
    const { patienList, rcStatus, startValue, endValue, endOpen, totalRecords, pageSize ,curPage } = this.state;
    const columns = this.getTableColumns(rcStatus);
    console.log('startValue',startValue)
    console.log('endValue',endValue)
    return (
      <Container>
        <Title>
          <ImgBingLi src={bingLi}/>
          <Ele>病例中心</Ele>
          <DateDiv>
              <MedicalCenter>
                  就诊中心：
              </MedicalCenter>
              <DatePicker
                  disabledDate={this.disabledStartDate}
                  defaultValue={moment(formatwdate, 'YYYY-MM-DD')}
                  format="YYYY-MM-DD"
                  placeholder="开始日期"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
              />
              至
              <DatePicker
                  disabledDate={this.disabledEndDate}
                  defaultValue={moment(today, 'YYYY-MM-DD')}
                  format="YYYY-MM-DD"
                  placeholder="结束日期"
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
              />
          </DateDiv>
          <SreachKeywords>
            <KeywordsSreach>
                查询关键词：
            </KeywordsSreach>
            <SpecInput placeholder='请输入姓名/手机号/患者编号快速查询' onChange={(e) => {this.setState({ keyword: e.target.value },function(){console.log('this.at',this.state.keyword)})}}></SpecInput>
            <SearchIcon type='search-thin' fill='#FFFFFF' onClick={this.getPatientData}></SearchIcon>
          </SreachKeywords>
        </Title>
        <TableDiv>
          <SpecTable dataSource={patienList} columns={columns} pagination={false}/>
        </TableDiv>
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
    )
  }
}

const Container = styled.div`
  width: 100%
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
const Title = styled.div`
  border: 1px solid;
  border-color: rgba(204, 204, 204, 1);
  background-color: rgb(242, 242, 242);
  width: 100%;
  height: 50px;
  position: relative;
`;
const ImgBingLi = styled.img`
  width: 2rem;
  position: absolute;
  margin-top: 0.8rem;
  margin-left: 2.7rem;
`;
const Ele = styled.span`
  color: rgb(51, 51, 51);
  font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  position: absolute;
  margin-top: 0.5rem;
  margin-left: 5rem;
`;
const DateDiv = styled.div`
  width: 38rem;
  margin-left: 30rem;
  margin-top: 0.7rem;
  position: absolute;
`;
const MedicalCenter = styled.span`

`;
const SreachKeywords = styled.div`
  width: 27rem;
  margin-left: 72.4rem;
  margin-top: 0.7rem;
  position: absolute;
`;
const KeywordsSreach = styled.span`
  margin-left: -7rem;
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
const Operation = styled.div`

`;
const OperationSpan = styled.span`
  color: #0a6ecb;
`;
const TableDiv = styled.div`
  margin-top: 2rem;
  width: 100%;
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
  color: #0a6ecb;
  cursor: pointer;
`;
/*
@作者：王崇琨
@日期：2018-09-12
@描述：电子病历
*/
