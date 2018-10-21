import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Button, Form, Col, Row, Modal, Select, DatePicker } from 'antd';
import Input from 'components/dr/input/basicInput';
import { today } from 'commonFunc/defaultData';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import RegisterForm from '../registerForm';
import moment from 'moment';
import 'moment/locale/zh-cn';
import QuickAddName from './quickAddName';
import selectSty from 'components/antd/style/select';
import buttonSty from 'components/antd/style/button';
import datePickerSty from 'components/antd/style/datePicker';

const Option = Select.Option;
const FormItem = Form.Item;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: [], // 国籍列表
      nation: [], // 民族列表
      sex: [] , // 性别列表
      marry: [], // 婚姻状态
      occupation: [], // 职业类型
      pationtype: [], // 患者类型
      cardtype: [], // 证件类型
      pationrel: [], //与患者关系
      province: [], // 省数据
      city: [], // 城市数据
      area: [], //县数据
      patientInfo: {
        patientname: '',
        patientno: '',
        mobile: '',
        country: '',
        nation: '',
        cardtype: '',
        cardno: '',
        sex: '',
        birthday: '1992-08-21',
        patienttype: '',
        maritalStatus: '',
        occupation: '', // 职业
        ABO: '', // 血型
        phoneHome: '', // 座机
        province: '', // 所属省份
        city: '', // 所属城市
        area: '', // 区县,
        streetdesc: '', //详细
        ctName: '', // 联系人
        ctRole: '', //与患者关系
        ctPhone: '', //联系电话
      }
    };
  };
  render() {
    let patientid = this.props.patientid;
    let basicOperation = this.props.basicOperation;
    return (
      <Container>
        <Header>
            <Left>
                <Title>患者档案>患者建档</Title>
            </Left>
        </Header>
        <Content>
            <RegisterForm patientid = {patientid} basicOperation = {basicOperation} />
        </Content>  
      </Container>
    )
  }
}
const Container = styled.div`
  width: 100%;
  margin: 20px 0px;
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
const Title = styled.div`
  
`;
const Content = styled.div`
  width: 100%;
  position: relative;
`;
const FormBorder = styled.div`
  border: 1px solid #0a6ecb;
  margin-top: 5rem;
  width: 80%;
  margin-left: 10rem;
  margin-right: 10rem;
`;
const SpecInput = styled(Input)`
  line-height: 25px;
`;
const SpecSelect = styled(Select)`
  ${selectSty.thinArrow}
`;
const SpecFormItem = styled(FormItem)`
  &&& {
    margin-bottom: 8px;
  }
`;
const SpecSpecFormItem = styled(FormItem)`
  .ant-form-item-children{
    display: flex;
    align-items: flex-start;
  }
`;
const SpecSpecInput = styled(Input)`
  width: 50px;
  margin-left: 20px;
  margin-top: -4px;
`;
const SpecDatePicker = styled(DatePicker)`
  ${datePickerSty.bottomBorder}
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
  margin-left: 9rem;
`;
/*
@作者：姜中希
@日期：2018-07-23
@描述：患者信息弹框form表单组件
*/
const InfoForm = Form.create()(Index);
export default InfoForm;
