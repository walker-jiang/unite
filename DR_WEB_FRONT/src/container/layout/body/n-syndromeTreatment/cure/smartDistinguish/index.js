import React, {Component} from 'react';
import styled from 'styled-components';
import { Table, Tabs, Checkbox, Button } from 'antd';
import Pagination_dia from 'components/antd/components/pagination';
const Pagination_his = deepClone(Pagination_dia);
import deepClone from 'commonFunc/deepClone';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import tableSty from 'components/antd/style/table';
import buttonSty from 'components/antd/style/button';
import paginationSty from 'components/antd/style/pagination';
import TipModal from 'components/dr/modal/tip';
import { getDiagnoseText, getDiagnoseDataSource } from 'commonFunc/transform';
import AddIllBySymptom from '../../../treatment/treatItem/drAdviceManage/chHerbalMedicine/herbalForm/diagnose/addIllBySymptom';
import AddIllByManifestations from '../../../treatment/treatItem/drAdviceManage/chHerbalMedicine/herbalForm/diagnose/addIllByManifestations';
import AuxiliaryDiagnosis from "roots/rightAssistBar/medicalRecordWriting/auxiliaryDiagnosis.js";
const TabPane = Tabs.TabPane;

export default class SmartDistinguish extends Component {
  constructor(props){
    super(props);
    this.state = {
      diaCurPage: 1,
      hisCurPage: 1,
      diagnoseFinalInfo: [], // 最终数据
      diagnoseFinalInfoOrigin: {}, // 原始数据
      diagnoseHisOriginData: [], //诊断历史原始数据
      initData: {}, // 初始化数据
      diagnoseHisData: [], // 诊断数据
      symptomId: '', // 病症ID
      initCaseData: {}, // 初始化病历信息
    };
    this.changeInitDataTwo = this.changeInitDataTwo.bind(this);
    this.addChinaMedicineData = this.addChinaMedicineData.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.hideFloatLayer = this.hideFloatLayer.bind(this);
    this.submitCaseData = this.submitCaseData.bind(this);
  };
  componentWillMount(){
    this.initialData();
    this.getSyndromeData(this.props.registerid);
  };
  getSyndromeData(registerid){
    let self = this;
    let params = {
      url: 'BuPatientCaseController/getData',
      server_url: config_InteLigenTreat_url + 'TCMAE/',
      data: {
        registerid: registerid
      },
    };
    function callBack(res){
      if(res.result){
        if(res.data){
          let { buDiagnosisInfo, ...initCaseData} = res.data
          let { buDiagnosisList, ...diagnoseFinalInfoOrigin} = buDiagnosisInfo;
            self.setState({
              initCaseData,
              diagnoseFinalInfo: buDiagnosisList,
              diagnoseFinalInfoOrigin
            });
        }
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [hideFloatLayer 点击诊断的某些部分触发子组件浮层隐藏事件] */
  hideFloatLayer(){
    if(this.addIllBySymptom){
      this.addIllBySymptom.hideResult();
      this.setState({symptomId: ''}); // 重置病症ID
    }
    if(this.addIllByManifestation){
      this.addIllByManifestation.hideResult();
    }
  };
  /** [getMessage 病症选择后需要通知病侯组件查所选病症下的病侯] */
  getMessage(symptomId){
    this.setState({symptomId});
  };
  /** [addChinaMedicineData 添加中医病症病侯信息到诊断表中] */
  addChinaMedicineData(e){
    let diagnoseFinalInfo = this.state.diagnoseFinalInfo;
    let symptom = this.addIllBySymptom.getSelectedData(); // 获取疾病信息
    let manifestation = this.addIllByManifestation.getSelectedData(); // 获取症候信息

    if('diseaseid' in symptom){
      let exist = diagnoseFinalInfo.some((item) => {
        if(item.diagnosisCode == symptom.discode){ // 存在该疾病
          // console.log('存在该疾病');
          manifestation.forEach((itemManifest) => {
            let exist = item.buDiagnosisDismainfList.some((itemChild) => itemChild.manifcode == itemManifest.manifcode);
            // console.log('症候是否存在', exist);
            if(exist){
              this.tipModal.showModal({ stressContent: '该症候已存在' });
              console.log('症候',itemManifest.manifname,'已存在');
            }else{
              item.buDiagnosisDismainfList.push(itemManifest);
            }
          });
          return true;
        }
      });
      if(!exist){ // 最终诊断对象中不存在该疾病
        // console.log('不存在该疾病');
        let item = deepClone(symptom);
        symptom.buDiagnosisDismainfList = manifestation;
        symptom.diagnosisName = symptom.disname;
        symptom.diagnosisCode = symptom.discode;
        symptom.diaid = '';
        symptom.diagnosisWay = 1;
        diagnoseFinalInfo.push(symptom);
      }
    }else{ // 疾病不能为空
      this.tipModal.showModal({ stressContent: '疾病不能为空' });
      return ;
    }
    // this.addIllBySymptom.hideResult(); // 隐藏病症弹框
    this.addIllByManifestation.hideResult(); // 隐藏病侯弹框
    this.setState({ diagnoseFinalInfo });
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
    // initData['buDiagnosisInfo'] = buDiagnosisInfo;
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
  /** [submitCaseData 提交病历] */
  submitCaseData(e){
    let diagnoseFinalInfo = this.state.diagnoseFinalInfo;
    let initCaseData = this.state.initCaseData;
    let diagnoseFinalInfoOrigin = this.state.diagnoseFinalInfoOrigin;
    let values = this.props.caseBasicInfo;
    let buDiagnosisInfo = {};
    buDiagnosisInfo.buDiagnosisList = diagnoseFinalInfo;
    buDiagnosisInfo.cardno = this.props.baPatient.cardno;
    buDiagnosisInfo.deptid = window.sessionStorage.getItem('deptid');
    buDiagnosisInfo.diagnosisDesc = "诊断描述";
    buDiagnosisInfo.doctorid = window.sessionStorage.getItem('userid');
    buDiagnosisInfo.orgid = window.sessionStorage.getItem('orgid');
    buDiagnosisInfo.patientid = this.props.baPatient.patientID;
    buDiagnosisInfo.patientname = this.props.baPatient.patientName;
    buDiagnosisInfo.patientno = "test";
    buDiagnosisInfo.registerid = this.props.registerid,
    buDiagnosisInfo.registerno = "12312";
    Object.assign(diagnoseFinalInfoOrigin, buDiagnosisInfo);
    let finalObj = {
      casetype: values.casetype,
      pridepict: this.getString(values.pridepict),
      hpi: this.getString(values.hpi),
      allergichistory: this.getString(values.allergichistory),
      inspection: this.getString(values.inspection),
      palpation: this.getString(values.palpation),
      temperature: values.temperature,
      breath: values.breath,
      diastolicPressure: values.diastolicPressure,
      systolicPressure: values.systolicPressure,
      pulse: values.pulse,
      heightnum: values.heightnum,
      weightnum: values.weightnum,
      isperiod: values.isperiod,
      ispregnancy: values.ispregnancy,
      gestationalWeeks: values.gestationalWeeks,
      psycheck: values.psycheck,
      buDiagnosisInfo: diagnoseFinalInfoOrigin,
      deptid: window.sessionStorage.getItem('deptid'),
      doctorid: window.sessionStorage.getItem('userid'),
      doctorname: window.sessionStorage.getItem('username'),
      orgid: window.sessionStorage.getItem('orgid'),
      registerid: this.props.registerid,
    };
    Object.assign(initCaseData, finalObj);
    let self = this;
    let params = {
      url: 'TCMAE/BuPatientCaseController/' + (initCaseData.billid ? 'putData' : 'postData'),
      server_url: config_InteLigenTreat_url,
      data: JSON.stringify(initCaseData),
      type: initCaseData.billid ? 'put' : 'post',
    };
    function callBack(res){
      if(res.flag){
        self.props.onStep(3);
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [initialData 组件加载获取历史诊断数据] */
  initialData(){
    let self = this;
    let params = {
      url: 'TCMAE/BuDiagnosisInfoController/getList',
      server_url: config_InteLigenTreat_url,
      data: {
        cardno: this.props.cardno
      },
    };
    function callBack(res){
      if(res.result && res.data.length > 0){
        let diagnoseHisOriginData = res.data.records[0].buDiagnosisList;
        // diagnoseHisOriginData.forEach((item) => {
        //   item.doctorname = res.data.records[0].doctorname;
        // });
        self.setState({
          diagnoseHisOriginData: diagnoseHisOriginData
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [getString 获取form表单项中对象中的文本]
   * @param  {String} [obj=''] [表单对象]
   * @return {[type]}          [最终文本]
   */
  getString(obj = ''){
    return obj.extractionData || obj.extractionData == '' ? obj.extractionData : obj;
  };
  render() {
    let columns = this.getTableCol();
    let hisCols = this.getTableCol('his');
    let { diaCurPage, hisCurPage, diagnoseHisOriginData, diagnoseFinalInfo, symptomId  } = this.state;
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
      <Container onClick={this.hideFloatLayer}>
        <Left>
          <DiaTitle>患者诊断</DiaTitle>
          <Middle>
            <AddContainer>
              <Name>疾病：</Name>
              <AddIllBySymptom  icon='#0A6ECB' ref={ref => this.addIllBySymptom = ref} placeholder='请输入病症中文关键字活拼音简写搜索' notify={this.getMessage}/>
              <Name>证候：</Name>
              <AddIllByManifestations addChinaMedicineData={this.addChinaMedicineData} icon='#0A6ECB' ref={ref => this.addIllByManifestation = ref} placeholder='请输入病侯中文关键字货拼音简写搜索' symptomId={symptomId}/>
              <AddAction type="primary" onClick={this.addChinaMedicineData}>添加诊断</AddAction>
            </AddContainer>
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
          <ActionButton readonly={this.props.readonly}>
            <Checkbox >同步到患者诊断</Checkbox>
            <SureButton type="primary" onClick={this.submitCaseData}>智能论治</SureButton>
            <BorderButton type="primary" onClick={() => {this.props.onStep(1)}}>返回上一步</BorderButton>
          </ActionButton>
        </Left>
        <Right>
          <SpecTabs key='1' defaultActiveKey='1' animated={false}>
            <TabPane tab="智能辩证" key="1">
              {
                <AuxiliaryDiagnosis changeInitDataTwo={this.changeInitDataTwo} listenFormData={{}}/>
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
const AddContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  width: 60px;
  white-space: nowrap;
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
  margin-top: 60px;
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
const AddAction = styled(Button)`
  ${buttonSty.semicircle}
  &&& {
    padding: 2px 20px;
  }
`;
const ActionButton = styled.div`
  border-top: 1px solid #CCCCCC;
  margin-top: 30px;
  display: ${props => props.readonly ? 'none' : 'block'}
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
