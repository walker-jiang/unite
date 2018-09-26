import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import ReactModal from 'react-modal';
import Icon from 'components/dr/icon';
import buttonSty from 'components/antd/style/button';
import BasicInfoForm from './basicInfoForm';
import PreTreatForm from './preTreatForm';
import SaveTip from 'components/dr/modal/saveTip';
import Tip from 'components/dr/modal/tip';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
const TabPane = Tabs.TabPane;

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      baPatient: {}, // 基本信息数据
      buPatientCase: {}, // 病例数据
      registerInfo: {}, // 其余挂号信息
    };
  };
  componentWillMount(){
    let operateType = this.props.match.params.type;
    if(operateType.indexOf('v') || operateType.indexOf('m')){
      this.getPatientData(operateType.substr(1, operateType.length - 1));
    }
  };
  getPatientData(id){
    let self = this;
    let params = {
      url: 'BuRegisterController/getData',
      data: {
        registerid: id,
      },
    };
    function callBack(res){
      if(res.result){
        let { baPatient, buPatientCase, ...registerInfo } = res.data;
        self.setState({ baPatient, buPatientCase, registerInfo });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  submit = (e) =>{
    let dept = {};
    let { registerInfo = {}, baPatient = {}, buPatientCase = {} } = this.state;
    let operateType = this.props.match.params.type;
    if(this.basicInfoForm){
      this.basicInfoForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          Object.assign(baPatient, values);
          baPatient.addrHome = values.provinceid.label + values.cityid.label + values.areaid.label;
          baPatient.birthday = values.birthday.format('YYYY-MM-DD');
          baPatient.creator = window.sessionStorage.getItem('userid');
          baPatient.provinceid = values.provinceid.key;
          baPatient.cityid = values.cityid.key;
          baPatient.areaid = values.areaid.key
        }
      });
    }
    if(this.preTreatForm){
      this.preTreatForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('buPatientCase, values', buPatientCase, values);
          Object.assign(buPatientCase, values);
          buPatientCase.hpi = this.getString(values.hpi);
          buPatientCase.allergichistory = this.getString(values.allergichistory);
          buPatientCase.deptid = values.dept.key;
          buPatientCase.doctorid = values.doctor.key;
          buPatientCase.doctorname = values.doctor.label;
          buPatientCase.orgid = window.sessionStorage.getItem('orgid');
          dept = {
            "deptid": values.dept.key,
            "deptname": values.dept.label,
          };
          delete buPatientCase['dept'];
          delete buPatientCase['doctor'];

        }
      });
    }else {
      this.tip.showModal({stressContent: '诊前信息就诊类型、医生、科室为必填项'});
      return;
    }
     let paramData = {
      "baPatient": baPatient,
      "buPatientCase": buPatientCase,
      "orgid": window.sessionStorage.getItem('orgid'),
    	"patienttype": baPatient.patienttype,
      "recDoctorid": window.sessionStorage.getItem('userid'),
    	"recDoctorname": window.sessionStorage.getItem('username'),
      "regUserid": window.sessionStorage.getItem('userid'),
	    "regUsername": window.sessionStorage.getItem('username'),
      regTypeid: 3, // 义诊
      "deptid": dept.deptid,
      "deptname": dept.deptname,
    };
    Object.assign(registerInfo, paramData);
    this.saveTip.showModal(1);
    let self = this;
    let params = {
      url: 'BuRegisterController/' + (operateType.indexOf('m') == 0 ? 'putRegister' : 'patRegister'),
      data: JSON.stringify(registerInfo),
      type: (operateType.indexOf('m') == 0 ? 'put' : 'post'),
    };
    function callBack(res){
      if(res.result){
        self.saveTip.showModal(2);
        // Modal.success({
        //   title: '用户登记成功',
        // });
        // self.props.onOk(res.data.patientid, res.data.registerid, res.data.patientname);
      }else{
        self.saveTip.showModal(3);
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  /**
   * [getString 获取form表单项中对象中的文本]
   * @param  {String} [obj=''] [表单对象]
   * @return {[type]}          [最终文本]
   */
  getString(obj = ''){
    return obj.extractionData || obj.extractionData == '' ? obj.extractionData : obj;
  };
  render() {
    let operateType = this.props.match.params.type;
    let { baPatient, buPatientCase } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Title><ArrowIcon type='right_arrow' fill='#0A6ECB'/>
              <Link to='/Layout/patientRegister'>患者登记/挂号信息列表</Link>
              <Icon type='right'></Icon>
              患者登记
            </Title>
          </Left>
        </Header>
        <Content>
          <SpecTabs defaultActiveKey="1" animated={false}>
            <TabPane tab="基本信息" key="1">
              <BasicInfoForm ref={ ref => { this.basicInfoForm = ref }} disabled={operateType.indexOf('v') == 0} baPatient={baPatient}></BasicInfoForm>
            </TabPane>
            <TabPane tab="诊前信息" key="2">
              <PreTreatForm ref={ ref => { this.preTreatForm = ref }} disabled={operateType.indexOf('v') == 0} buPatientCase={buPatientCase}></PreTreatForm>
            </TabPane>
          </SpecTabs>
          <ActionButton>
            <SureButton type="primary" onClick={this.submit} disabled={operateType.indexOf('v') == 0}>保存</SureButton>
            <CancelButton type="primary">取消</CancelButton>
          </ActionButton>
        </Content>
        <SaveTip ref={ ref => {this.saveTip = ref}}></SaveTip>
        <Tip ref={ ref => { this.tip = ref }}></Tip>
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
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
const ArrowIcon = styled(Icon)`
  height: 32px;
  width: 18px;
  margin-top: 5px;
`;
const Content = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const SpecTabs = styled(Tabs)
`
  width: 1097px;
  &&& .ant-tabs-ink-bar {
    display: none !important;
  }
  .ant-tabs {
    height: 436px;
  }
  .ant-tabs-bar {
    margin: 0px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    border: 1px solid rgba(10, 110, 203, 1);
    padding: 4px 41px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: rgba(10, 110, 203, 1);
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    background-color: rgba(10, 110, 203, 1);
    color: #FFFFFF;
  }
  .ant-tabs-content {
    border: 1px solid rgba(10, 110, 203, 1);
  }
`;
const ActionButton = styled.div`
  width: 1097px;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
/*
@作者：姜中希
@日期：2018-09-21
@描述：患者登记form
*/
