import React, { Component } from 'react';
import { Table, Row, Col, DatePicker, Input, Pagination, LocaleProvider } from 'antd';
import styled from 'styled-components';
import inputSty from 'components/antd/style/input';
import 'antd/lib/button/style';
import moment from 'moment';
import Icon from 'components/dr/iconRight';
import { today } from 'commonFunc/defaultData';
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
      dataSource: [],
      endOpen: false,
      startValue: formatwdate, 
      endValue: today,
      keyword: ''
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
  let beginTime = this.state.startValue;
  let endTime = this.state.endValue;
  let keyword = this.state.keyword;
  let params = {
    url: 'BuPatientCaseController/getListByMap',
    data: {
      beginTime: beginTime,
      endTime: endTime,
      Keyword: keyword
    }
  };
  let that = this;
  function callBack(res){
      if(res.result){
      let dataSource = res.data.records.map((item, index)=>{
        item.key = index; // 加唯一key值
        return item
      });
      that.setState({dataSource});
    }else{
      that.setState({dataSource: []});
    }
  };
  getResource(params, callBack);
};

//操作
operationCell (value, record, index) {
  return (
    <Operation key={index}>
      <OperationSpan onClick={() => { this.handleElectronic(value, record, index) }}>电子病历详情</OperationSpan>
    </Operation>
  )
}

//性别
operationCellSex (value, record, index) {
  if(record.sex == '01'){
    return <span>男</span>
  } else if (record.sex == '02') {
    return <span>女</span>
  } else if (record.sex == '09') {
    return <span>未知</span>
  }
}

//点击查看电子病历详情
handleElectronic (value, record, index) {
  console.log('handleElectronic',record,index)
  let patientid = record.patientid;//患者ID
  let patientname = record.patientname;//患者姓名
  let sex = record.sex;//患者性别
  let birthday = y - record.birthday.substr(0,4);//患者年龄
  let patienttypeDic = record.patienttypeDic;//患者类型
  let examDate = record.examDate.substr(0,10);//就诊日期
  let casetype = record.casetype;//初复诊
  // window.patientid = patientid;
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


  render() {
    const { dataSource, startValue, endValue, endOpen } = this.state;
    console.log('startValue',startValue)
    console.log('endValue',endValue)
    return (
      <Container>
        <Title>
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
            <SpecInput placeholder='请输入患者姓名/患者编号/身份证号/拼音' onChange={(e) => {this.setState({ keyword: e.target.value },function(){console.log('this.at',this.state.keyword)})}}></SpecInput>
            <SearchIcon type='search-thin' fill='#FFFFFF' onClick={this.getPatientData}></SearchIcon>
          </SreachKeywords>
        </Title>
        <TableDiv>
          <Table
          dataSource={dataSource}
          onHeaderRow={(column) => { this.onHeaderRow() }}
          >
          <Table.Column key="examDate" title="就诊日期" dataIndex="examDate" />
          <Table.Column key="patientno" title="患者编号" dataIndex="patientno" />
          <Table.Column key="patientname" title="患者姓名" dataIndex="patientname" />
          <Table.Column key="sex" title="性别" dataIndex="sex" render={this.operationCellSex.bind(this)} />
          <Table.Column key="age" title="年龄" dataIndex="age" />
          <Table.Column key="mobile" title="手机号" dataIndex="mobile" />
          <Table.Column key="cardno" title="身份证号" dataIndex="cardno" />
          <Table.Column key="patienttypeDic" title="患者类型" dataIndex="patienttypeDic" />
          <Table.Column key="casetypeDic" title="就诊类型" dataIndex="casetypeDic" />
          <Table.Column key="recDoctorname" title="就诊医师" dataIndex="recDoctorname" />
          <Table.Column key="diagnosisDesc" title="诊断" dataIndex="diagnosisDesc" />
          <Table.Column title="操作" render={this.operationCell.bind(this)} />
          </Table>
        </TableDiv>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%
`;
const Title = styled.div`
  border: 1px solid;
  border-color: rgba(204, 204, 204, 1);
  background-color: rgb(242, 242, 242);
  width: 100%;
  height: 50px;
  position: relative;
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

/*
@作者：王崇琨
@日期：2018-09-12
@描述：电子病历
*/
