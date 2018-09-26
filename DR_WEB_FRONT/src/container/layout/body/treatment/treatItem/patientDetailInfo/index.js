import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Button } from 'antd';
import buttonSty from 'components/antd/style/button';
import Icon from 'components/dr/icon';

import BasicInfoForm from '../../../n-patientRegister/registerForm/basicInfoForm';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      editable: false
    };
  };
  submit = (e) =>{
    let baPatient = {};
    let buPatientCase = {};
    let dept = {};
    // if(this.basicInfoForm){
    //   this.basicInfoForm.validateFieldsAndScroll((err, values) => {
    //     console.log(values, values);
    //     console.log('err', err);
    //     if (!err) {
    //       baPatient = {
    //         "addrHome": values.provinceid.label + values.cityid.label + values.areaid.label,
    //         "birthday": values.birthday.format('YYYY-MM-DD'),
    //         "creator": window.sessionStorage.getItem('userid'),
    //         "provinceid": values.provinceid.key,
    //         "cityid": values.cityid.key,
    //         "areaid": values.areaid.key,
    //       };
    //       console.log('baPatient', baPatient);
    //       baPatient = Object.assign(values, baPatient);
    //     }
    //   });
    // }
    this.setState({ editable: false });
  }
  render() {
    let { editable } = this.state;
    let match = {
      params: {
        id: 'v123'
      }
    };
    return (
      <Container>
        <FormStyle>
          <BasicInfoForm disabled={!editable}></BasicInfoForm>
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
