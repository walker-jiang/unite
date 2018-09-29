import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Button } from 'antd';
import buttonSty from 'components/antd/style/button';
import Icon from 'components/dr/icon';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import SaveTip from 'components/dr/modal/saveTip';

import BasicInfoForm from '../../../n-patientRegister/registerForm/basicInfoForm';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      editable: false,
      baPatient: {}, // 基本信息数据
    };
  };
  componentWillMount(){
    this.getPatientData(this.props.patientid ? this.props.patientid : window.patientid);
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
        self.setState({ baPatient: res.data });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  submit = (e) =>{
    let baPatient = this.state.baPatient;
    this.saveTip.showModal(1);
    if(this.basicInfoForm){
      this.basicInfoForm.validateFieldsAndScroll((err, values) => {
        console.log('values', values);
        if (!err) {
          Object.assign(baPatient, values);
          baPatient.addrHome = values.province.label + values.city.label + values.district.label;
          baPatient.birthday = values.birthday.format('YYYY-MM-DD');
          baPatient.creator = window.sessionStorage.getItem('userid');
          baPatient.provinceid = values.province.key;
          baPatient.cityid = values.city.key;
          baPatient.districtid = values.district.key;
          baPatient.ctsorgid = window.sessionStorage.getItem('orgid');
        }
      });
    }
    let self = this;
    let params = {
      url: 'BaPatientController/putData',
      data: JSON.stringify(baPatient),
      type: 'put',
    };
    function callBack(res){
      if(res.result){
        self.saveTip.showModal(2);
        self.setState({ editable: false });
      }else{
        self.saveTip.showModal(3);
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  render() {
    let { editable, baPatient } = this.state;
    console.log('baPatient', baPatient);
    let match = {
      params: {
        id: 'v123'
      }
    };
    return (
      <Container>
        <FormStyle>
          <BasicInfoForm disabled={!editable} baPatient={baPatient} ref={ ref => { this.basicInfoForm = ref }}></BasicInfoForm>
        </FormStyle>
        {
          editable ?
          <ActionButton>
            <SureButton type="primary" onClick={this.submit}>保存</SureButton>
            <CancelButton type="primary">取消</CancelButton>
          </ActionButton> :
          <ActiveEdit onClick={() => { this.setState({ editable: true })}}>
            <Icon type='edit_pencil' width='18px' height='18px'/>
            修改患者信息
          </ActiveEdit>
        }
        <SaveTip ref={ ref => {this.saveTip = ref}}></SaveTip>
      </Container>
    )
  }
}
const Container = styled.div`
  margin: 40px;
`;
const FormStyle = styled.div`
  border: 1px solid #0A6ECB;
`;
const ActionButton = styled.div`
  width: 1097px;
`;
const ActiveEdit = styled.div`
  margin: 10px;
  font-size: 13px;
  color: rgb(10, 110, 203);;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
