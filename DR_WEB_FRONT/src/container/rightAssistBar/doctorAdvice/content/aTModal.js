import React, {Component} from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, Radio, Select, DatePicker, Table, Spin } from 'antd';
import PopModal from '../../pubilcModule/basePop.js';
import buttonSty from 'components/antd/style/button';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: this.props.visible,
      examineItemsData: this.props.tableSource, // 检验项目数据数组''
      queryTableIsQuery:this.props.queryTableIsQuery,
    };
  };
  componentWillReceiveProps(nextProps){
    console.log("queryTableIsQuery@@@@@@@",nextProps.queryTableIsQuery);
    console.log("tableSource@@@@@@@",nextProps.tableSource);
    this.setState({
      visible:nextProps.visible,
      examineItemsData:nextProps.tableSource,
      queryTableIsQuery:nextProps.queryTableIsQuery
    });
  }
  closeModal = () => {
    this.setState({ visible: false, queryTableIsQuery:false, examineItemsData:[] });
    this.props.closeModal();
  };
  introduce = (record) => {
    console.log("获取到当前行数据",record);
    console.log("获取辨证论治接到的数据",this.props.AllData);
    var AllData = this.props.AllData;
    if(record.baMedicalDtlList){ //是组套
      console.log("当前为组套");
      var newRecord = record;
      if(AllData.buOrderDtlList){
        record.baMedicalDtlList.forEach((item,index)=>{
          AllData.buOrderDtlList.forEach((j,k)=>{
              if(item.medicalid == j.itemid){
                item['buImtreatprelistStAcupoints'] = j.buImtreatprelistStAcupoints;
              }else{
                item['buImtreatprelistStAcupoints'] = [];
              }
          })
        });
        newRecord['buOrderDtlList'] = record.baMedicalDtlList;
      }else{
        var newRecord = record;
        newRecord['buOrderDtlList'] = record.baMedicalDtlList;
        AllData['buOrderDtlList'] = [];//需要删除 非组套
      }
      AllData['buOrderDtlList'] = [];//需要删除 非组套
      AllData['buOrdmedical'] = {
        "buOrdmedicalSuitList":newRecord,
        "aim": "",
        "count": record.count,
  			"ctstamp": record.ctstamp,
  			"feesum": record.feesum,
  			"orderSuitcode": record.orderSuitcode,
  			"orderSuitid": record.orderSuitid,
  			"orderSuitname": record.orderSuitname,
  			"ordmedicalid": "",
  			"seqno": record.seqno,
  			"specification": record.specification,
  			"suitid": "",
  			"useflag": record.useflag,
  			"utstamp": record.utstamp,
      }
    }else{
      console.log("当前为非组套");
      AllData['buOrdmedical'] = [];//需要删除 组套
      if(record){
        var newRecord = [];
        console.log("record====",record);
        console.log("record====",typeof(record) == "object");
        if(typeof(record) == "object"){
          record['itemTypeid'] = record.medicalTypeid;
          record['itemcode'] = record.medicalcode;
          record['itemdesc'] = record.medicaldesc;
          record['itemid'] = record.medicalid;
          record['itemname'] = record.medicalname;
          AllData.buOrderDtlList.forEach((item,index)=>{
            if(item.itemid == record.medicalid){
              record['buImtreatprelistStAcupoints'] = item.buImtreatprelistStAcupoints;
            }else{
              record['buImtreatprelistStAcupoints'] = [];
            }
          })
          newRecord.push(record);
        }
        AllData['buOrderDtlList'] = newRecord;
      }else{
        alert("获取非组套信息出错");
      }
    }
    //数据组装
    var params = AllData;
    this.props.changeInitData(params,5);
    this.closeModal();
  }
  /** [getColumns 获取表格数据 ] */
  getColumns = () => {
    const columns = [{
      title: '检查项目',
      dataIndex: 'spbody',
      key: 'spbody',
      //render: (text, record) => record.medicalname ? record.medicalname : record.orderSuitname
    }, {
      title: '医保等级',
      dataIndex: 'medinslevel',
      key: 'medinslevel'
    }, {
      title: '医保备注',
      dataIndex: 'medinsrem',
      key: 'medinsrem'
    }, {
      title: '执行科室',
      dataIndex: 'deptname',
      key: 'deptname'
    }, {
      title: '单价(元)',
      dataIndex: 'unitprice',
      key: 'unitprice',
      render: (text, record, index) => {
        if(record.baMedicalDtlList){
          return record.baMedicalDtlList.reduce((prev, curr)=> {
            return {count: 1, unitprice: (prev.count * prev.unitprice + curr.count * curr.unitprice)}
          } ).unitprice;
        }else{
          return record.unitprice;
        }
      }
    }, {
      title: '单位',
      dataIndex: 'baseUnitDic',
      key: 'baseUnitDic'
    }, {
      title: '是否组套',
      dataIndex: 'islock',
      key: 'islock',
      render: (text, record, index) => record.baMedicalDtlList ? '是' : '否'
    },  {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button style={{background:'#0A6ECB',borderRadius:50,height:23,margin:2}} type="primary" onClick={()=>{ this.introduce(record) }}>引入</Button>
        </span>
      ),
    }];
    return columns;
  };
  render() {
    let { visible, examineItemsData, queryTableIsQuery } = this.state;
    console.log("visible===",visible);
    let columns = this.getColumns();
    return (
      <Container>
        <PopModal visible={visible} title='选择中医适宜技术治疗项/治疗明细' onClose={this.closeModal}>
          {
            queryTableIsQuery
            ?
            <Table
              style={{margin:5}}
              rowClassName={(record, index)=>{
                return record.status ? (record.status == 1 ? 'Selected' : 'checked') : 'unSelected';
              }}
              locale={{emptyText: '暂无项目数据' }}
              columns={columns}
              dataSource={examineItemsData}
              pagination={false}
            >
            </Table>
            :
            <center style={{marginTop:50}}><div className="example"><Spin/>&nbsp;&nbsp;&nbsp;正在加载中,请稍后...</div></center>
          }

          <Footer>
            {/*<SureButton type="primary" onClick={this.closeModal}>引入</SureButton>*/}
            <CancelButton type="primary" onClick={this.closeModal}>取消</CancelButton>
          </Footer>
        </PopModal>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
`;
const RegisterButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const SpecForm= styled(Form)`
  width: 600px;
  &&& > div > div > .ant-form-item {
    margin-bottom: 10px;
  }
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
const Footer = styled.div`
  width: 600px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center
`;
export default Index;
