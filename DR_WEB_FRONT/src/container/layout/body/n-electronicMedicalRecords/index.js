import React, { Component } from 'react';
import { Table, Row, Col, DatePicker, Input } from 'antd';
import styled from 'styled-components';
import 'antd/lib/button/style';
import getResource from 'commonFunc/ajaxGetResource';

const Search = Input.Search;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: 1,
          id: 1,
          clinicDate: '2018-08-20 08:12:02',
          patientsNumber: '1102342456',
          patientName: '刘德华',
          sex: '男',
          age: '38',
          mobilePhone: '152****4321',
          idNumber: '110105**********78',
          patientsType: '普通医保',
          clinicType: '初诊',
          clinicPhysicians: '王琰龙',
          diagnosis: '风寒感冒；原发性高血压'
        },
        {
          key: 2,
          id: 2,
          clinicDate: '2018-08-20 08:12:02',
          patientsNumber: '1102342456',
          patientName: '刘德华',
          sex: '男',
          age: '38',
          mobilePhone: '152****4321',
          idNumber: '110105**********78',
          patientsType: '普通医保',
          clinicType: '初诊',
          clinicPhysicians: '王琰龙',
          diagnosis: '风寒感冒；原发性高血压'
        },
        {
          key: 3,
          id: 3,
          clinicDate: '2018-08-20 08:12:02',
          patientsNumber: '1102342456',
          patientName: '刘德华',
          sex: '男',
          age: '38',
          mobilePhone: '152****4321',
          idNumber: '110105**********78',
          patientsType: '普通医保',
          clinicType: '初诊',
          clinicPhysicians: '王琰龙',
          diagnosis: '风寒感冒；原发性高血压'
        },
        {
          key: 4,
          id: 4,
          clinicDate: '2018-08-20 08:12:02',
          patientsNumber: '1102342456',
          patientName: '刘德华',
          sex: '男',
          age: '38',
          mobilePhone: '152****4321',
          idNumber: '110105**********78',
          patientsType: '普通医保',
          clinicType: '初诊',
          clinicPhysicians: '王琰龙',
          diagnosis: '风寒感冒；原发性高血压'
        },
        {
          key: 5,
          id: 5,
          clinicDate: '2018-08-20 08:12:02',
          patientsNumber: '1102342456',
          patientName: '刘德华',
          sex: '男',
          age: '38',
          mobilePhone: '152****4321',
          idNumber: '110105**********78',
          patientsType: '普通医保',
          clinicType: '初诊',
          clinicPhysicians: '王琰龙',
          diagnosis: '风寒感冒；原发性高血压'
        }
      ],
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  }

operationCell (value, record, index) {
  return (
    <Operation key={index}>
      <OperationSpan onClick={() => { this.handleElectronic(value, record, index) }}>电子病历详情</OperationSpan>
    </Operation>
  )
}

handleElectronic (value, record, index) {
    let pram = 2;
    this.props.onToggle(pram);
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

  onChange = (field, value) => {
    this.setState({
      [field]: value,
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
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  value={startValue}
                  placeholder="开始日期"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
              />
              至
              <DatePicker
                  disabledDate={this.disabledEndDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  value={endValue}
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
              <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              enterButton
              />
          </SreachKeywords>
        </Title>
        <TableDiv>
          <Table
          dataSource={dataSource}
          onHeaderRow={(column) => { this.onHeaderRow() }}
          >
          <Table.Column key="clinicDate" title="就诊日期" dataIndex="clinicDate" />
          <Table.Column key="patientsNumber" title="患者编号" dataIndex="patientsNumber" />
          <Table.Column key="patientName" title="患者姓名" dataIndex="patientName" />
          <Table.Column key="sex" title="性别" dataIndex="sex" />
          <Table.Column key="age" title="年龄" dataIndex="age" />
          <Table.Column key="mobilePhone" title="手机号" dataIndex="mobilePhone" />
          <Table.Column key="idNumber" title="身份证号" dataIndex="idNumber" />
          <Table.Column key="patientsType" title="患者类型" dataIndex="patientsType" />
          <Table.Column key="clinicType" title="就诊类型" dataIndex="clinicType" />
          <Table.Column key="clinicPhysicians" title="就诊医师" dataIndex="clinicPhysicians" />
          <Table.Column key="diagnosis" title="诊断" dataIndex="diagnosis" />
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
