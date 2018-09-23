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
import ajaxGetResource from 'commonFunc/ajaxGetResource';
const TabPane = Tabs.TabPane;

export default class Index extends Component {
  submit = (e) =>{
    this.saveTip.showModal(1);
    let baPatient = {};
    let buPatientCase = {};
    if(this.basicInfoForm){
      this.basicInfoForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          baPatient = {
            "addrHome": values.provinceid.label + values.cityid.label + values.areaid.label,
            "birthday": values.birthday.format('YYYY-MM-DD'),
            "creator": window.sessionStorage.getItem('userid'),
          };
          baPatient = Object.assign(values, baPatient);
        }
      });
    }
    if(this.preTreatForm){
      this.preTreatForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          buPatientCase = {
            "allergichistory": values.allergichistory.extractionData,
            "deptid": values.dept.key,
            "doctorid": values.doctor.key,
            "doctorname": values.doctor.label,
            "orgid": window.sessionStorage.getItem('orgid'),
          };
          buPatientCase = Object.assign(values, buPatientCase);
        }
      });
    }
    let paramData = {
      "baPatient": baPatient,
      "buPatientCase": buPatientCase,
      "deptid": JSON.stringify(buPatientCase) == '{}' ? '' : buPatientCase.deptid,
      "deptname": JSON.stringify(buPatientCase) == '{}' ? '' : buPatientCase.dept.label,
      "orgid": window.sessionStorage.getItem('orgid'),
    	"patienttype": baPatient.patienttype,
      "recDoctorid": window.sessionStorage.getItem('userid'),
    	"recDoctorname": window.sessionStorage.getItem('username'),
      "regUserid": window.sessionStorage.getItem('userid'),
	    "regUsername": window.sessionStorage.getItem('username'),
    };
    let self = this;
    let params = {
      url: 'BuRegisterController/patRegister',
      data: JSON.stringify(paramData),
      type: 'post',
    };
    function callBack(res){
      if(res.result){
        this.saveTip.showModal(2);
        // Modal.success({
        //   title: '用户登记成功',
        // });
        // self.props.onOk(res.data.patientid, res.data.registerid, res.data.patientname);
      }else{
        this.saveTip.showModal(3);
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  render() {
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
              <BasicInfoForm ref={ ref => { this.basicInfoForm = ref }}></BasicInfoForm>
            </TabPane>
            <TabPane tab="诊前信息" key="2">
              <PreTreatForm ref={ ref => { this.preTreatForm = ref }}></PreTreatForm>
            </TabPane>
          </SpecTabs>
          <ActionButton>
            <SureButton type="primary" onClick={this.submit}>保存</SureButton>
            <CancelButton type="primary">取消</CancelButton>
          </ActionButton>
        </Content>
        <SaveTip ref={ ref => {this.saveTip = ref}}></SaveTip>
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
  justify-content: center;
  align-items: center;
`;
const SpecTabs = styled(Tabs)
`
  margin: auto;
  width: 1097px;
  height: 436px;
  &&& .ant-tabs-ink-bar {
    display: none !important;
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
