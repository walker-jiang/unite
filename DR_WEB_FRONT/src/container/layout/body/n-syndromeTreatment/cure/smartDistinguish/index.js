import React, {Component} from 'react';
import styled from 'styled-components';
import { Table, Tabs, Checkbox, Button } from 'antd';
import Pagination_dia from 'components/antd/components/pagination';
const Pagination_his = deepClone(Pagination_dia);
import deepClone from 'commonFunc/deepClone';
import tableSty from 'components/antd/style/table';
import buttonSty from 'components/antd/style/button';
import paginationSty from 'components/antd/style/pagination';
import TipModal from 'components/dr/modal/tip';
import { getDiagnoseText, getDiagnoseDataSource } from 'commonFunc/transform';
// import AuxiliaryDiagnosis from "roots/rightAssistBar/medicalRecordWriting/auxiliaryDiagnosis.js";
const TabPane = Tabs.TabPane;

export default class SmartDistinguish extends Component {
  constructor(props){
    super(props);
    this.state = {
      diaCurPage: 1,
      hisCurPage: 1,
      diagnoseFinalInfo: [], // 最终数据
      diagnoseHisOriginData: [], //诊断历史原始数据
      initData: {}, // 初始化数据
      diagnoseHisData: [], // 诊断数据
    };
    this.changeInitDataTwo = this.changeInitDataTwo.bind(this);
  };
  componentWillMount(){
    let diagnoseHisOriginData =[
    {
      "buDiagnosisDismainfList": [{
        "ctstamp": "2018-10-16 14:32:45",
        "diagnosisid": "201839671565542111",
        "diseaseid": 18,
        "id": "201839671565542112",
        "manifcode": "ZBXM101",
        "manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
        "manifid": 29,
        "manifname": "暑湿伤表证",
        "registerid": "201839655147863211",
        "useflag": "1",
        "utstamp": "2018-10-16 14:32:45"
      }],
      "cmDiagnosisType": null,
      "codetype": "",
      "ctstamp": "2018-10-16 14:32:45",
      "diacode": "",
      "diadesc": "",
      "diagnosisCode": "BNW010",
      "diagnosisName": "感冒",
      "diagnosisNo": null,
      "diagnosisType": null,
      "diagnosisWay": 1,
      "diagnosisid": "201839671565542111",
      "diaid": null,
      "dianame": "",
      "discode": "BNW010",
      "disdesc": "感冒",
      "diseaseid": 18,
      "disname": "感冒",
      "doubtDiaType": "",
      "mainDiaType": "",
      "registerid": "201839655147863211",
      "seqno": 4,
      "useflag": "1",
      "utstamp": "2018-10-16 14:32:45",
      "diagnosisWayDic": "中医"
    }, {
      "buDiagnosisDismainfList": [{
        "ctstamp": "2018-10-16 14:32:45",
        "diagnosisid": "201839671565542111",
        "diseaseid": 18,
        "id": "201839671565542112",
        "manifcode": "ZBXM10",
        "manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
        "manifid": 29,
        "manifname": "暑湿伤表证",
        "registerid": "201839655147863211",
        "useflag": "1",
        "utstamp": "2018-10-16 14:32:45"
      }],
      "cmDiagnosisType": null,
      "codetype": "",
      "ctstamp": "2018-10-16 14:32:45",
      "diacode": "",
      "diadesc": "",
      "diagnosisCode": "BNW0102",
      "diagnosisName": "感冒",
      "diagnosisNo": null,
      "diagnosisType": null,
      "diagnosisWay": 1,
      "diagnosisid": "201839671565542111",
      "diaid": null,
      "dianame": "",
      "discode": "BNW010",
      "disdesc": "感冒",
      "diseaseid": 18,
      "disname": "感冒",
      "doubtDiaType": "",
      "mainDiaType": "",
      "registerid": "201839655147863211",
      "seqno": 4,
      "useflag": "1",
      "utstamp": "2018-10-16 14:32:45",
      "diagnosisWayDic": "中医"
    }, {
      "buDiagnosisDismainfList": [{
        "ctstamp": "2018-10-16 14:32:45",
        "diagnosisid": "201839671565542111",
        "diseaseid": 18,
        "id": "201839671565542112",
        "manifcode": "ZBXM10",
        "manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
        "manifid": 29,
        "manifname": "暑湿伤表证",
        "registerid": "201839655147863211",
        "useflag": "1",
        "utstamp": "2018-10-16 14:32:45"
      }],
      "cmDiagnosisType": null,
      "codetype": "",
      "ctstamp": "2018-10-16 14:32:45",
      "diacode": "",
      "diadesc": "",
      "diagnosisCode": "BNW0103",
      "diagnosisName": "感冒",
      "diagnosisNo": null,
      "diagnosisType": null,
      "diagnosisWay": 1,
      "diagnosisid": "201839671565542111",
      "diaid": null,
      "dianame": "",
      "discode": "BNW010",
      "disdesc": "感冒",
      "diseaseid": 18,
      "disname": "感冒",
      "doubtDiaType": "",
      "mainDiaType": "",
      "registerid": "201839655147863211",
      "seqno": 4,
      "useflag": "1",
      "utstamp": "2018-10-16 14:32:45",
      "diagnosisWayDic": "中医"
    }, {
      "buDiagnosisDismainfList": [{
        "ctstamp": "2018-10-16 14:32:45",
        "diagnosisid": "201839671565542111",
        "diseaseid": 18,
        "id": "201839671565542112",
        "manifcode": "ZBXM104",
        "manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
        "manifid": 29,
        "manifname": "暑湿伤表证",
        "registerid": "201839655147863211",
        "useflag": "1",
        "utstamp": "2018-10-16 14:32:45"
      }],
      "cmDiagnosisType": null,
      "codetype": "",
      "ctstamp": "2018-10-16 14:32:45",
      "diacode": "",
      "diadesc": "",
      "diagnosisCode": "BNW010",
      "diagnosisName": "感冒",
      "diagnosisNo": null,
      "diagnosisType": null,
      "diagnosisWay": 1,
      "diagnosisid": "201839671565542111",
      "diaid": null,
      "dianame": "",
      "discode": "BNW010",
      "disdesc": "感冒",
      "diseaseid": 18,
      "disname": "感冒",
      "doubtDiaType": "",
      "mainDiaType": "",
      "registerid": "201839655147863211",
      "seqno": 4,
      "useflag": "1",
      "utstamp": "2018-10-16 14:32:45",
      "diagnosisWayDic": "中医"
    }, {
      "buDiagnosisDismainfList": [{
        "ctstamp": "2018-10-16 14:32:45",
        "diagnosisid": "201839671565542111",
        "diseaseid": 18,
        "id": "201839671565542112",
        "manifcode": "ZBXM105",
        "manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
        "manifid": 29,
        "manifname": "暑湿伤表证",
        "registerid": "201839655147863211",
        "useflag": "1",
        "utstamp": "2018-10-16 14:32:45"
      }],
      "cmDiagnosisType": null,
      "codetype": "",
      "ctstamp": "2018-10-16 14:32:45",
      "diacode": "",
      "diadesc": "",
      "diagnosisCode": "BNW010",
      "diagnosisName": "感冒",
      "diagnosisNo": null,
      "diagnosisType": null,
      "diagnosisWay": 1,
      "diagnosisid": "201839671565542111",
      "diaid": null,
      "dianame": "",
      "discode": "BNW010",
      "disdesc": "感冒",
      "diseaseid": 18,
      "disname": "感冒",
      "doubtDiaType": "",
      "mainDiaType": "",
      "registerid": "201839655147863211",
      "seqno": 4,
      "useflag": "1",
      "utstamp": "2018-10-16 14:32:45",
      "diagnosisWayDic": "中医"
    }, {
      "buDiagnosisDismainfList": [{
        "ctstamp": "2018-10-16 14:32:45",
        "diagnosisid": "201839671565542111",
        "diseaseid": 18,
        "id": "201839671565542112",
        "manifcode": "ZBXM107",
        "manifdesc": "身热，微恶风，汗少，肢体酸重或疼痛，头昏重胀痛，咳嗽痰黏，鼻流浊涕，心烦口渴，或口中黏腻，渴不多饮，",
        "manifid": 29,
        "manifname": "暑湿伤表证",
        "registerid": "201839655147863211",
        "useflag": "1",
        "utstamp": "2018-10-16 14:32:45"
      }],
      "cmDiagnosisType": null,
      "codetype": "",
      "ctstamp": "2018-10-16 14:32:45",
      "diacode": "",
      "diadesc": "",
      "diagnosisCode": "BNW010",
      "diagnosisName": "感冒",
      "diagnosisNo": null,
      "diagnosisType": null,
      "diagnosisWay": 1,
      "diagnosisid": "201839671565542111",
      "diaid": null,
      "dianame": "",
      "discode": "BNW010",
      "disdesc": "感冒",
      "diseaseid": 18,
      "disname": "感冒",
      "doubtDiaType": "",
      "mainDiaType": "",
      "registerid": "201839655147863211",
      "seqno": 4,
      "useflag": "1",
      "utstamp": "2018-10-16 14:32:45",
      "diagnosisWayDic": "中医"
    }];
    let diagnoseFinalInfo = diagnoseHisOriginData;
    this.setState({
      diagnoseHisOriginData, diagnoseFinalInfo
    });
  };
  /**
   * [delDiagnose 通过诊断表格删除诊断信息]
   * @param  {[type]} record [当前诊断记录]
   * @return {[type]}        [void]
   */
  delDiagnose(record){
    let diagnoseFinalInfo = this.state.diagnoseFinalInfo;
    if(record.manifCode){ // 删除症候
      diagnoseFinalInfo.forEach((item) => {
        if(item.diagnosisCode == record.manifCode){
          item.buDiagnosisDismainfList = item.buDiagnosisDismainfList.remove({'manifcode': record.diagnosisCode});
          if(item.buDiagnosisDismainfList.length == 0){ // 删除最后一个症候，该疾病也被删除
            diagnoseFinalInfo = diagnoseFinalInfo.remove({diagnosisCode: record.manifCode});
          }
        }
      });
    }else{
      // console.log('疾病', record.manifCode);
      // console.log('疾病diagnoseFinalInfo', diagnoseFinalInfo);
      diagnoseFinalInfo = diagnoseFinalInfo.remove({diagnosisCode: record.diagnosisCode});
    }
    this.setState({ diagnoseFinalInfo });
  };
  /**
   * [getTableCol 获取诊断和历史诊断的表格项]
   * @param  {[type]} type [历史还是添加的诊断]
   * @return {[type]}      [诊断列]
   */
  getTableCol(type){
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
      title: '诊断内容（疾病/证候）',
      dataIndex: 'diagnosisName',
      align: 'center',
      key: 'diagnosisName',
    }, {
      title: '诊断时间',
      dataIndex: 'utstamp',
      align: 'center',
      key: 'utstamp',
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
    if(!type){
      columns.splice(3,1);
    }else{
      columns.splice(5,1);
    }
    return columns;
  };
    /** changeInitDataTwo
     * [changeTabs 左右联动]
     * @param  {[type]} initData
     */
    changeInitDataTwo = (buDiagnosisInfo) =>{
      var initData = this.state.initData;
      initData['buDiagnosisInfo'] = buDiagnosisInfo;
    }
    // 历史诊断双击选择
    SelectedLine(record){
      let {diagnoseHisOriginData, diagnoseFinalInfo} = this.state;
      if(record.manifCode){ // 有症候
        diagnoseHisOriginData.forEach((item) => {
          if(item.diagnosisCode == record.manifCode){ // 疾病匹配
            item.buDiagnosisDismainfList.forEach((itemChild) => {
              if(itemChild.manifcode == record.diagnosisCode){ // 症候匹配
                let result = diagnoseFinalInfo.some((finalItem) => {
                  if(finalItem.diagnosisCode ==  record.manifCode){ // 当前诊断中已存在该疾病，则加入到该疾病的症候数组中
                    let exist = finalItem.buDiagnosisDismainfList.some((finalItemChild) => finalItemChild.manifcode == itemChild.manifcode);
                    if(exist){
                      this.tipModal.showModal({ stressContent: '该疾病病候已存在' });
                    }else{
                      finalItem.buDiagnosisDismainfList.push(itemChild);
                    }
                    return true;
                  }
                });
                if(!result){ // 当前诊断中不存在该疾病
                  item.buDiagnosisDismainfList = [];
                  item.buDiagnosisDismainfList.push(itemChild);
                  diagnoseFinalInfo.push(item);
                }
              }
            });
          }else{
            console.log('匹配失败，历史诊断表格数据问题');
          }
        });
      }else{
        diagnoseHisOriginData.forEach((item) => {
          if(item.diagnosisCode == record.diagnosisCode){ // 疾病匹配
            let result = diagnoseFinalInfo.some((itemFinal) => itemFinal.diagnosisCode == item.diagnosisCode);
            if(result){
              this.tipModal.showModal({ stressContent: '该疾病已存在' });
            }else{
              diagnoseFinalInfo.push(item);
            }
          }
        });
      }
      this.setState({ diagnoseFinalInfo });
    };
  render() {
    let columns = this.getTableCol();
    let hisCols = this.getTableCol('his');
    let { diaCurPage, hisCurPage, diagnoseHisOriginData, diagnoseFinalInfo  } = this.state;
    let diagnoseHisData =getDiagnoseDataSource(diagnoseHisOriginData, 'his'); // 历史诊断表格数据
    let diagnoseData = getDiagnoseDataSource(diagnoseFinalInfo, 'now'); // 当前诊断表格数据
    Pagination_dia.total = diagnoseData.length;
    Pagination_dia.current = diaCurPage;
    Pagination_dia.pageSize = 5;
    Pagination_dia.onChange = (page, pageSize)=>{
      this.setState({ diaCurPage: page});
    }
    Pagination_his.total = diagnoseHisData.length;
    Pagination_his.current = hisCurPage;
    Pagination_his.pageSize = 5;
    Pagination_his.onChange = (page, pageSize)=>{
      this.setState({ hisCurPage: page});
    }
    return (
      <Container>
        <Left>
          <DiaTitle>患者诊断</DiaTitle>
          <Middle>
            <SureButton type="primary">添加诊断</SureButton>
            <SpecTable
              dataSource={diagnoseData}
              columns={columns}
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
              columns={hisCols}
              pagination={Pagination_his}/>
          </History>
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
          <ActionButton>
            <Checkbox>同步到患者诊断</Checkbox>
            <SureButton type="primary" onClick={() => {this.props.onStep(3)}}>智能论治</SureButton>
            <BorderButton type="primary" onClick={() => {this.props.onStep(1)}}>返回上一步</BorderButton>
          </ActionButton>
        </Left>
        <Right>
          <SpecTabs key='1' defaultActiveKey='1' animated={false}>
            <TabPane tab="智能辩证" key="1">
              {
                // <AuxiliaryDiagnosis changeInitDataTwo={this.changeInitDataTwo} listenFormData={{}}/>
              }
            </TabPane>
          </SpecTabs>
        </Right>
      </Container>
    );
  }
}
const Container = styled.div`
  display: flex;

`;
const Left = styled.div`
  flex-grow: 1;
  padding: 0px 17px;
  border-right: 1px solid #CCCCCC;
`;
const Right = styled.div`
  width: 422px;
  border-top: 1px solid #CCCCCC;
`;
const DiaTitle = styled.div`
  font-size: 14px;
  font-weight: 409;
  color: #333333;
  border-bottom: 1px solid #0A6ECB;
  text-align: center;
  padding: 5px 0px;
  width: 80px;
`;
const Middle = styled.div`
  border-top: 1px solid #CCCCCC;
  height: 171px;
`;
const SpecTable = styled(Table)`

  ${tableSty.selectedTable};
  ${paginationSty.easyPagination};
  .ant-table-placeholder {
    display: none;
  }
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
  margin-top: 40px;
  border-top: 1px solid #CCCCCC;
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
const SpecTabs = styled(Tabs)`
  .ant-tabs-nav-container {
    font-size: 13px;
    background: #F2F2F2;
  }
  .ant-tabs-bar {
    border-bottom: 2px solid #7f54d4;
  }
  .ant-tabs-nav-container-scrolling {
    padding: 0px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin: 0px;
    padding: 12px 25px;
  }
  .ant-tabs-ink-bar {
    width: 104px !important;
    height: 1px;
    background-color: #0A6ECB;
  }
  &&& .ant-tabs-content {
    border-top: 1px solid #C9C9C9;
    background-color: #F2F2F2;
    padding: 0px;
    margin-top: -17px;
  }
`;
const ActionButton = styled.div`
  border-top: 1px solid #CCCCCC;
  margin-top: 40px;
`;
const BorderButton = styled(Button)`
  ${buttonSty.white}
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
/*
@作者：姜中希
@日期：2018-10=16
@描述：智能辩证组件
*/