import React, {Component} from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
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
import deepClone from 'commonFunc/deepClone';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      baPatient: {}, // 基本信息数据
      buPatientCase: null, // 病例数据
      registerInfo: {}, // 其余挂号信息
    };
  };
  componentWillMount(){
    let operateType = this.props.match.params.type;
    if(operateType.indexOf('v') == 0 || operateType.indexOf('m') == 0){
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
        if(registerInfo.regDoctorid){
          baPatient.doctor = {
            key: registerInfo.regDoctorid,
            label: registerInfo.regDoctorname,
          };
        }
        if(registerInfo.deptid){
          baPatient.dept = {
            key: registerInfo.deptid,
            label: registerInfo.deptname,
          };
        }
        self.setState({ baPatient, buPatientCase, registerInfo });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [submit 提交挂号信息] */
  submit = (e) =>{
    let { registerInfo = {}, baPatient = {}, buPatientCase = {} } = this.state;
    let operateType = this.props.match.params.type;
    let finalBaisicInfo = deepClone(baPatient); // 添加修改这个初始化都没毛病
    if(this.basicInfoForm){
      let values = this.basicInfoForm.handleSubmit(e);
      Object.assign(finalBaisicInfo, values); // 赋新值
      finalBaisicInfo.addrHome = values.province.label + values.city.label + values.district.label;
      finalBaisicInfo.birthday = values.birthday.format('YYYY-MM-DD');
      finalBaisicInfo.creator = window.sessionStorage.getItem('userid');
      finalBaisicInfo.provinceid = values.province.key;
      finalBaisicInfo.cityid = values.city.key;
      finalBaisicInfo.districtid = values.district.key
      finalBaisicInfo.ctsorgid = window.sessionStorage.getItem('orgid');
      let paramData = {
        "baPatient": finalBaisicInfo,
        "buPatientCase": null,
        "orgid": window.sessionStorage.getItem('orgid'),
        "patienttype": values.patienttype,
        "recDoctorid": values.doctor.key,
        "recDoctorname": values.doctor.label,
        "regDoctorid": window.sessionStorage.getItem('userid'),
        "regDoctorname": window.sessionStorage.getItem('username'),
        "regUserid": window.sessionStorage.getItem('userid'),
        "regUsername": window.sessionStorage.getItem('username'),
        "regTypeid": 3, // 义诊
        "deptid": values.dept.key,
        "deptname": values.dept.label,
      };
      if(operateType.indexOf('v') == 0 || operateType.indexOf('m') == 0){ // 修改
        paramData = Object.assign(registerInfo, paramData); // 戴上原来查询出的基本信息
      }else if(operateType.indexOf('a') == 0){
        if(finalBaisicInfo.patientid){ // 通过查询基本信息取得需要加上该患者ID
          paramData.patientid = finalBaisicInfo.patientid;
        }
      }
      this.saveTip.showModal(1);
      let self = this;
      let params = {
        url: 'BuRegisterController/' + (operateType.indexOf('m') == 0 ? 'putRegister' : 'patRegister'),
        server_url: 'http://10.192.4.28:8088/',
        data: JSON.stringify(paramData),
        type: (operateType.indexOf('m') == 0 ? 'put' : 'post'),
      };
      function callBack(res){
        if(res.result){
          self.saveTip.showModal(2);
          self.props.history.push('/Layout/patientRegister');
        }else{
          self.saveTip.showModal(3, res.desc);
          console.log('异常响应信息', res);
        }
      };
      ajaxGetResource(params, callBack);
    }
  }
  render() {
    let operateType = this.props.match.params.type;
    let { baPatient, buPatientCase, registerInfo } = this.state;
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
          <BasicInfoForm wrappedComponentRef={ ref => { this.basicInfoForm = ref }} disabled={operateType.indexOf('v') == 0} baPatient={baPatient}></BasicInfoForm>
          <ActionButton>
            <SureButton type="primary" onClick={this.submit} disabled={operateType.indexOf('v') == 0}>保存</SureButton>
            <CancelButton type="primary" onClick={() => {this.props.history.push('/Layout/patientRegister')}}>取消</CancelButton>
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
export default withRouter(Index);
