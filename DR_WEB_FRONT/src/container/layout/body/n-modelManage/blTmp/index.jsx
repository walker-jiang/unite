import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import styled from 'styled-components';
import { Form, Icon, Button, Row, Col, Tabs } from 'antd';
import Loading from 'components/dr/loading';
import SelectSearchForm from './selectSearchForm.js';
import TmpName from '../TmpName';
import MainSpeech from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/mainSpeech';
import IllHistory_present from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_allergy from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_pasthis from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_personhis from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_moHis from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import IllHistory_familyhis from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/illHistory';
import ObserveCure from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/observeCure';
import FeelCure from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/feelCure';
import SmellCure from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/smellCure';
import Syndrome from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/syndrome';
import OtherInspect from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/otherInspect';
import HabitusInspect from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/habitusInspect';
import Diagnose from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/diagnose';
import CurePrinciple from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/curePrinciple';
import DocAdvice from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/formItem/docAdvice';
import CaseIndicator from 'roots/layout/body/treatment/treatItem/writeMedicalRecords/leftModal/caseIndicator';
import ScrollArea from 'components/scrollArea';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';
import { getDiagnoseText } from 'commonFunc/transform';
import Template from "roots/rightAssistBar/medicalRecordWriting/medicalRecordTemplate.js";
import MedicalHistory from "roots/rightAssistBar/medicalRecordWriting/medicalHistory.js";
import BiofeedbckTherpy from "roots/rightAssistBar/medicalRecordWriting/BiofeedbckTherpy.js";
import AuxiliaryDiagnosis from "roots/rightAssistBar/medicalRecordWriting/auxiliaryDiagnosis.js";
import DoctorAdviceTemplate from "roots/rightAssistBar/doctorAdvice/doctorAdviceTemplate.js";
import IntelligentTreat from "roots/rightAssistBar/doctorAdvice/intelligentTreat.js";

import {
  getBLData,  //获取病历数据
  createBLTmpData,  //创建模板
  putBLTmpData,
  serverUrl,  //服务地址 配合getAjaxResource使用
} from '../service.js'; 

const DEFAULT_USERID = sessionStorage.getItem('userid');
const DEFAULT_USERNAME = sessionStorage.getItem('username');
const DEFAULT_ORGID = sessionStorage.getItem('orgid');
const DEFAULT_DEPTID = sessionStorage.getItem('deptid');

window.modifyPermission = 1;  //可以修改
class BLTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: 0, //是否点击保存按钮, 0未保存 1 保存中 2 保存成功
      tabIndex: 1, // 当前tab
      tmpName: "",  //模板名称
      initData: {
        "temname": "",  //模板名称
        "allergichistory": '',//过敏史
        "billid": '',
        "breath": '',//呼吸
        "buDiagnosisInfoTemplet": {},//诊断
        "buTempletManage": {},  //模板详情
        "chfingerprint": '',
        "deptcode": '',
        "diastolicPressure": '',//舒张压
        "doctorid": '',
        "doctorname": '',
        "familyhistory": '',//家族史
        "heightnum": '',//身高
        "hpi": '',//现病史
        "inspection": '',//望诊
        "facephoto": '', // 舌头图片
        "sidephoto": '', // 舌头图片
        "moHistory": '',//月经婚育史
        "orgid": '',
        "palpation": '',//切诊
        "pasthistory": '',//既往史
        "personhistory": '',//个人史
        "pridepict": '',//主诉
        "psycheck": '',//其他检查
        "pulse": '',//脉搏
        "registerid": '',
        "smelling": '',//闻诊
        "suggession": '',//医生建议
        "syndrome": '',//辩证要点
        "systolicPressure": '',//收缩压
        "temperature": '',//体温
        "treatprinciple": '',//治疗原则
        "treatway": '',//治疗方法
        "weightnum": '',//体重
      }, // 修改前的初始化数据
    };
  };
  /** [getCaseData 初始化病历数据] */
  getCaseData = () => {
    const { paramData, tmpName } = this.props;
    //paramData如果为空则表示是新建
    if (getBLData && "temmanageid" in paramData) {
      getBLData(paramData ? paramData : {}).then((data) => {
        const _data = { ...data.data, temname: tmpName };
        this.setState({ initData: _data });
      });
    }
  };
  componentWillMount() {
    this.getCaseData();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if ((typeof (values.diagnose) == 'object' && !values.diagnose.extractionData) || (typeof (values.diagnose) == 'string' && !values.diagnose)) {
          this.tipModal.showModal({
            content: '诊断不能为空',
          });
          return;
        }

        let { initData } = this.state;
        let buDiagnosisInfo = initData.buDiagnosisInfoTemplet ? initData.buDiagnosisInfoTemplet : {};

        //模板管理信息表
        let buTempletManage = 'buTempletManage' in initData ? initData['buTempletManage'] : {};
        if ('temmanageid' in values && values['temmanageid']['item'] && values['temmanageid']['item'].length > 0) {
          const parentObj = values['temmanageid']['item'][0];
          this._generateBbuTempletManage(buTempletManage, parentObj, values['temname']);
        }

        //诊断主表和明细
        this._buDiagnosisInfo(values, buDiagnosisInfo);

        //诊疗模板
        let finalObj = this._BuPatientCaseTemplet(values, buDiagnosisInfo);

        //模板管理信息
        finalObj['buTempletManage'] = { buTempletManageList: [], ...buTempletManage };

        Object.assign(initData, finalObj);
        let self = this;
        this.setState({
          saved: 1
        });
        let params = {
          url: initData.billid ? putBLTmpData() : createBLTmpData(),
          server_url: serverUrl,
          data: JSON.stringify(initData),
          type: initData.billid ? 'put' : 'post',
        };
        function callBack(res) {
          if (res.result) {
            setTimeout(function () {
              self.setState({
                saved: 2,
              }, () => {
                setTimeout(function () {
                  self.setState({
                    saved: 0,
                  });
                }, 1000);
              });
            }, 2000);
          } else {
            console.log('异常响应信息', res);
          }
        };
        ajaxGetResource(params, callBack);
      }
    });
  }

  //新建是需要拼接的数据格式
  _generateBbuTempletManage = (buTempletManage, parentObj, temname) => {
    // buTempletManage["temmanageid"] = 0;  //模板管理主键，新建是不需要
    // buTempletManage["temcode"] = "1";  //模板编码 冗余字段，暂时不需要
    buTempletManage["temname"] = temname;
    // buTempletManage["pinyin"] = "1"; //拼音码暂时不生成
    // buTempletManage["temdes"] = "1"; //模板描述 暂时不需要
    buTempletManage["weight"] = 1;  //权重默认给1
    buTempletManage["temtype"] = "0"; //模板类型 0 病历模板 1 医嘱订单模板
    buTempletManage["temlevel"] = parentObj['temlevel'];  //模板级别 来自父节点
    buTempletManage["parentid"] = parentObj['temmanageid']; //数节点
    buTempletManage["parentids"] = parentObj["parentids"] + buTempletManage["parentid"] + '/';
    buTempletManage["creatuserid"] = DEFAULT_USERID;
    buTempletManage["personid"] = DEFAULT_USERID;
    buTempletManage["provid"] = parentObj['provid'];
    buTempletManage["cityid"] = parentObj["cityid"];
    buTempletManage["distid"] = parentObj["distid"];
    buTempletManage["orgid"] = DEFAULT_ORGID;
    buTempletManage["isleaf"] = '1';  //是模板
    buTempletManage["deptcode"] = DEFAULT_DEPTID;
    // buTempletManage["remarks"] = "1";  //怎么生成
    buTempletManage["isperson"] = parentObj['isperson'];
    buTempletManage["createuser_name"] = DEFAULT_USERNAME;
  }

  //诊断列表以及诊断明细
  _buDiagnosisInfo = (values, buDiagnosisInfo) => {
    debugger
    const _originData = values.diagnose.originData ? values.diagnose.originData : [];
    let _buDiagnosisTempletList = [];
    _originData.map((data) => {
      let { baSyndromeList, buDiagnosisSyndromeTempletList, buDiagnosisSyndromeList, ...otherData } = data;
      _buDiagnosisTempletList.push({ buDiagnosisSyndromeTempletList: buDiagnosisSyndromeList, ...otherData });
    })
    buDiagnosisInfo.buDiagnosisTempletList = _buDiagnosisTempletList;
    buDiagnosisInfo.diagnosisDesc = values.diagnose.extractionData;  // 诊断描述
    buDiagnosisInfo.registerid = "";   //挂号流水号
    buDiagnosisInfo.registerno = "";  //his挂号流水号
    buDiagnosisInfo.orgid = DEFAULT_ORGID;
    buDiagnosisInfo.doctorid = DEFAULT_USERID;
    buDiagnosisInfo.doctorname = DEFAULT_USERNAME;
    buDiagnosisInfo.deptcode = DEFAULT_DEPTID;
  }

  //诊疗模板数据格式
  _BuPatientCaseTemplet = (values, buDiagnosisInfo) => {
    return {
      orgid: DEFAULT_ORGID,
      deptcode: DEFAULT_DEPTID,
      pridepict: this.getString(values.pridepict),
      hpi: this.getString(values.hpi),
      pasthistory: this.getString(values.pasthistory),
      allergichistory: this.getString(values.allergichistory),
      personhistory: this.getString(values.personhistory),
      moHistory: this.getString(values.moHistory),
      familyhistory: this.getString(values.familyhistory),
      temperature: values.temperature,
      pulse: values.pulse,
      breath: values.breath,
      systolicPressure: values.systolicPressure,
      diastolicPressure: values.diastolicPressure,
      inspection: this.getString(values.inspection),
      smelling: values.smelling,
      palpation: this.getString(values.palpation),
      syndrome: this.getString(values.syndrome),
      psycheck: values.psycheck,
      suggession: values.suggession,
      treatprinciple: this.getString(values.treatprinciple),
      casetype: values.casetype1, //初复诊 0 初诊
      heightnum: values.heightnum,
      weightnum: values.weightnum,
      treatway: values['treatway'],
      facephoto: values.inspectionPicture[0],
      sidephoto: values.inspectionPicture[1],
      isperiod: values.isperiod,
      ispregnancy: values.ispregnancy,
      gestationalWeeks: values.gestationalWeeks,
      buDiagnosisInfoTemplet: buDiagnosisInfo,
    }
  }

  //形成传给诊断组件的数据 纯函数
  _generateDiagnosisRenderData = (initData) => {
    let _buDiagnosisInfoTemplet = {}, _buDiagnosisTempletList = [], toDiagnosis = [], _buDiagnosisSyndromeTempletList = [];
    if ('buDiagnosisInfoTemplet' in initData) {
      _buDiagnosisInfoTemplet = initData['buDiagnosisInfoTemplet'];
      if ('buDiagnosisTempletList' in _buDiagnosisInfoTemplet) {
        _buDiagnosisTempletList = _buDiagnosisInfoTemplet['buDiagnosisTempletList']
        if (lodash.isArray(_buDiagnosisTempletList)) {
          _buDiagnosisTempletList.map((data) => {
            const { buDiagnosisSyndromeTempletList, ...otherData } = data;
            toDiagnosis.push({buDiagnosisSyndromeList: lodash.cloneDeep(buDiagnosisSyndromeTempletList), ...otherData});
          });
          return toDiagnosis;
        }
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  /**
   * [getString 获取form表单项中对象中的文本]
   * @param  {String} [obj=''] [表单对象]
   * @return {[type]}          [最终文本]
   */
  getString(obj = '') {
    return obj.extractionData || obj.extractionData == '' ? obj.extractionData : obj;
  };

  render() {
    const { openTmp, optType, tmpClassify } = this.props;
    let { saved, caseItems, tabIndex, initData } = this.state;
    const { getFieldDecorator, setFieldsValue, getFieldsValue } = this.props.form;
    let { pridepict = '', hpi = '', inspection = '', palpation = '', smelling = '' } = getFieldsValue();
    const _DiagnosisRenderData = this._generateDiagnosisRenderData(initData);
    const formItemLayout = {
      labelCol: {
        xs: { span: 3 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 21 },
        sm: { span: 21 },
      },
    };
    // 患者本人舌头图片
    let tongueUrls = [];
    if (initData.facephoto != '' && initData.facephoto) {
      tongueUrls.push(initData.facephoto);
    }
    if (initData.sidephoto != '' && initData.sidephoto) {
      tongueUrls.push(initData.sidephoto);
    }
    return (
      <Container>
        <Header><Title><ArrowIcon type='right_arrow' />病历模板/新增病历模板</Title></Header>
        <Content>
          <SpecForm onSubmit={this.handleSubmit} >
            <ScrollArea height={140}>
              <SelectSearchForm getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} selectItemObj={tmpClassify} />
              <TmpName getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData['temname']} />
              <MainSpeech getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.pridepict }} />
              <IllHistory_present title='现病史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.hpi }} />
              <IllHistory_allergy title='过敏史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.allergichistory }} />
              <IllHistory_pasthis title='既往史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.pasthistory }} />
              <IllHistory_personhis title='个人史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.personhistory }} />
              <IllHistory_moHis title='月经婚育史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.moHistory }} />
              <IllHistory_familyhis title='家族史' getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: [], extractionData: initData.familyhistory }} />
              <ObserveCure setFieldsValue={setFieldsValue} getFieldsValue={getFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ urlArr: tongueUrls, text: initData.inspection }}></ObserveCure>
              <FeelCure setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.palpation}></FeelCure>
              <SmellCure setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.smelling}></SmellCure>
              <Syndrome setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: {}, extractionData: initData.syndrome }}></Syndrome>
              <HabitusInspect setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ temperature: initData.temperature, breath: initData.breath, pulse: initData.pulse, systolicPressure: initData.systolicPressure, diastolicPressure: initData.diastolicPressure, heightnum: initData.heightnum, weightnum: initData.weightnum }}></HabitusInspect>
              <OtherInspect setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.psycheck}></OtherInspect>
              <Diagnose setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} 
              initialValue={{ originData: _DiagnosisRenderData, extractionData: getDiagnoseText(_DiagnosisRenderData) }}></Diagnose>
              <CurePrinciple setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={{ originData: {}, extractionData: initData.treatprinciple }}></CurePrinciple>
              <DocAdvice setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} initialValue={initData.suggession}></DocAdvice>
              <Row>
                <Col span={14}>
                  {/* {(optType == "") && <BorderButton type="primary" htmlType="submit" onClick={this.handleReset}>保存模板</BorderButton>} */}
                  {<BorderButton type="primary" htmlType="submit" >保存模板</BorderButton>}
                  <BorderButton onClick={() => openTmp('fl')}>返回</BorderButton>
                </Col>
                <Saving span={10}>
                  {
                    saved == 0 ? null :
                      (
                        saved == 1 ?
                          <SaveTip>
                            <Loading loading={true}><span>正在保存诊疗单数据，请稍后</span></Loading>
                          </SaveTip>
                          :
                          <SaveTip>
                            <Success type="check-circle" />
                            <span>诊疗单保存成功</span>
                          </SaveTip>
                      )
                  }
                </Saving>
              </Row>
            </ScrollArea>
          </SpecForm>
        </Content>
      </Container >
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
const Title = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const ArrowIcon = styled(Icon) `
  height: 32px;
  width: 18px;
  margin-top: 5px;
`;
const Content = styled.div`
  width: 100%;
  position: relative;
`;
const SpecForm = styled(Form) `
  &&& {
    width: calc(100% - 426px);
  }
  & > div > .ant-row{
    padding-left: 20px;
    padding-right: 40px;
  }
  & > div > div > div > .ant-form-item{
    margin-bottom: 0px !important;
  }
`;
const Modal = styled.div`
  border: 1px solid rgba(204, 204, 204, 1);
  width: 426px;
`;
const SpecTabs = styled(Tabs) `
  .ant-tabs-nav-container {
    font-size: 13px;
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
  }
  &&& .ant-tabs-content {
    border-top: 1px solid #C9C9C9;
    background-color: #F2F2F2;
    padding: 0px;
  }
`;
const SaveTip = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  div {
    padding: 0px;
  }
  span {
    color: #c467da;
  }
`;
const Success = styled(Icon) `
  margin-right: 10px;
  &::before {
    color: #e6981e;
  }
`;
const BorderButton = styled(Button) `
  ${buttonSty.white}
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const Saving = styled(Col) `
  display: flex;
  align-items: center;
  justify-content: space-around
`;
const SureButton = styled(Button) `
  ${buttonSty.semicircle}
`;

const TreatmentList = Form.create()(BLTmp);

TreatmentList.propTypes = {
  openTmp: PropTypes.func.isRequired,  //调用新建模板，或者查看，更新模板方法 必须
  optType: PropTypes.string.isRequired, //操作类型 新建，查看，更新
  paramData: PropTypes.object,  //在查看和编辑时需要参数查询模板数据
  tmpName: PropTypes.string,  //在查看和编辑时需要显示模板明细
};

export default TreatmentList;
