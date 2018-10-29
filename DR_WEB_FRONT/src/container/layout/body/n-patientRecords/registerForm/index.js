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
    };
  };
  componentWillMount(){
    this.getPatientData(this.props.patientid);
  };
  getPatientData(id){
    let self = this;
    let params = {
      url: 'BaPatientController/getData',
      data: {
        id: id,
      },
    };
    function callBack(res){
      if(res.result){
        let baPatient = res.data;
        self.setState({ baPatient: baPatient });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  submit = (e) =>{
    debugger
    const { handSonsson } = this.props
      if(handSonsson){
        handSonsson(1)
      }
    let baPatient = this.state.baPatient;
    let basicOperation = this.props.basicOperation;
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
    
      if(basicOperation == 'view' || basicOperation == 'modify'){ // 修改
        baPatient = Object.assign(baPatient); // 戴上原来查询出的基本信息
      }else if(basicOperation == 'add'){
        if(finalBaisicInfo.patientid){ // 通过查询基本信息取得需要加上该患者ID
          baPatient.patientid = finalBaisicInfo.patientid;
        }
      }
      this.saveTip.showModal(1);
      let self = this;
      let params = {
        url: 'BaPatientController/' + (basicOperation == 'modify' ? 'putData' : 'postData'),
        data: JSON.stringify(finalBaisicInfo),
        type: (basicOperation == 'modify' ? 'put' : 'post'),
      };
      function callBack(res){
        if(res.result){
          self.saveTip.showModal(2);
          self.props.history.push('/Layout/patientArchives');
        }else{
          self.saveTip.showModal(3);
          console.log('异常响应信息', res);
        }
      };
      ajaxGetResource(params, callBack);
      
    }
  }
  render() {
    let basicOperation = this.props.basicOperation;
    let { baPatient } = this.state;
    console.log('baPatient', baPatient);
    return (
      <Container>
        <Content>
          <BasicInfoForm wrappedComponentRef={ ref => { this.basicInfoForm = ref }} disabled={basicOperation == 'view'} baPatient={baPatient}></BasicInfoForm>
          <ActionButton>
            <SureButton type="primary" onClick={this.submit} disabled={basicOperation == 'view'}>保存</SureButton>
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
  // position: absolute;
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
  margin-top: 5rem;
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
