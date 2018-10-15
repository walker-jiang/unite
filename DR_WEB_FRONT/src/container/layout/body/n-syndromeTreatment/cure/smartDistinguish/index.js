import React, {Component} from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import Pagination_dia from 'components/antd/components/pagination';
const Pagination_his = deepClone(Pagination_dia);
import deepClone from 'commonFunc/deepClone';
import tableSty from 'components/antd/style/table';
import paginationSty from 'components/antd/style/pagination';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      diaCurPage: 1,
      hisCurPage: 1,
      diagnoseData: [],
      diagnoseHisData: [],
    };
  };
  /** [getTableCol 获取诊断和历史诊断的表格项] */
  getTableCol(){
    const columns = [{
      title: '序号',
      dataIndex: 'order',
      align: 'center',
      key: 'order',
    }, {
      title: '诊断码',
      dataIndex: 'diagnosisCode',
      align: 'center',
      key: 'diagnosisCode',
    }, {
      title: '诊断内容',
      dataIndex: 'diagnosisName',
      key: 'diagnosisName',
    }, {
      title: '诊断分类',
      dataIndex: 'diagnosisWay',
      align: 'center',
      key: 'diagnosisWay',
      render:(text, record, index)=> (text=='0')?'西医':'中医'
    }, {
      title: '诊断类别',
      align: 'center',
      dataIndex: 'diagnosisType',
      key: 'diagnosisType',
      render:(text, record, index)=> text == '1' ? '初步诊断' : (text == 2 ? '最终诊断' : '-')
    }, {
      title: '主诊断',
      dataIndex: 'mainDiaTypeDic',
      align: 'center',
      key: 'mainDiaTypeDic',
    }, {
      title: '疑似诊断',
      dataIndex: 'doubtDiaTypeDic',
      align: 'center',
      key: 'doubtDiaTypeDic',
    }, {
      title: '诊断医生',
      align: 'center',
      dataIndex: 'doctorname',
      key: 'doctorname',
    }, {
      title: '操作',
      align: 'operate',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record, index)=><a onClick={(e)=>this.delDiagnose(record)}>删除</a>
    }];
    return columns;
  };
  render() {
    let columns = this.getTableCol();
    let { diaCurPage, hisCurPage, diagnoseData, diagnoseHisData } = this.state;
    Pagination_dia.total = diagnoseData.length;
    Pagination_dia.current = diaCurPage;
    Pagination_dia.onChange = (page, pageSize)=>{
      this.setState({ diaCurPage: page});
    }
    Pagination_his.total = diagnoseHisData.length;
    Pagination_his.current = hisCurPage;
    Pagination_his.onChange = (page, pageSize)=>{
      this.setState({ hisCurPage: page});
    }
    return (
      <Container>
        <Left>
          <Middle>
            <SpecTable
              dataSource={diagnoseData}
              columns={columns}
              locale={{emptyText: '暂无诊疗数据' }}
              pagination={Pagination_dia}/>
          </Middle>
          <History>
            <Header>
              <Title>
                📅历史诊断
              </Title>
              <Tip>
                💡双击下方历史诊断可加入到当前诊断信息中
              </Tip>
            </Header>
            <SpecTable
              onRow={(record) => {
                return {
                  onDoubleClick: (e) => {
                    this.SelectedLine(record);
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  },       // 点击行
                };
              }}
              rowClassName={(record, index)=>{
                return ((record.status) ? 'Selected' : 'unSelected');
              }}
              dataSource={diagnoseHisData}
              columns={columns.slice(0,8)}
              locale={{emptyText: '暂无诊疗数据' }}
              pagination={Pagination_his}/>
          </History>
        </Left>
        <Right></Right>
      </Container>
    );
  }
}
const Container = styled.div`
  display: flex;

`;
const Left = styled.div`
  flex-grow: 1;
`;
const Right = styled.div`
  width: 422px;
`;
const Middle = styled.div`
  height: 171px;
`;
const SpecTable = styled(Table)`
  ${tableSty.selectedTable};
  ${paginationSty.easyPagination};
  .ant-table-row {
    height: 24px;
    background-color: white;
  }
  th {
    padding-left: 5px !important;
    border-top: 1px solid white;
    border-right: 1px solid white;
    height: 24px;
    background-color: rgba(242,242,242,1) !important;
  }
`;
const History = styled.div`
  margin-top: 10px;
  border-top: 1px solid #0A6ECB;
  height: 181px;
`;
const Header = styled.div`
  height: 25px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-family: 'MicrosoftYaHei', '微软雅黑';
  color: #333333;
  margin-left: 15px;
`;
const Tip = styled.div`
  color: #009900;
  margin-left: 30px;
`;
/*
@作者：姜中希
@日期：2018-10=16
@描述：智能辩证组件
*/
