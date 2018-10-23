import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Button, Form, Col, Row, Modal, Select, DatePicker } from 'antd';
import Input from 'components/dr/input/basicInput';
import { today } from 'commonFunc/defaultData';
import health from '../images/health.png'
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import RegisterForm from '../registerForm';
import moment from 'moment';
import 'moment/locale/zh-cn';
import selectSty from 'components/antd/style/select';
import buttonSty from 'components/antd/style/button';
import datePickerSty from 'components/antd/style/datePicker';

const Option = Select.Option;
const FormItem = Form.Item;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
    this.patientArchives = this.patientArchives.bind(this)
    this.handSonsson = this.props.handSonsson.bind(this);
  };

  patientArchives(){
    let patientid = this.props.patientid;
    let basicOperation = this.props.basicOperation;
    let pram = 1;
    this.props.onToggle(basicOperation,pram,patientid);
  }

  render() {
    let patientid = this.props.patientid;
    let basicOperation = this.props.basicOperation;
    return (
      <Container>
        <Header>
            <Left>
                <ImageHealth src={health}/>
                <Title><BeforePantient onClick={this.patientArchives}>患者档案</BeforePantient>><AfterPantient>患者建档</AfterPantient></Title>
            </Left>
        </Header>
        <Content>
            <RegisterForm patientid = {patientid} basicOperation = {basicOperation} handSonsson={this.handSonsson}/>
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
const ImageHealth = styled.img`
  width: 2rem;
`;
const BeforePantient = styled.span`
    font-size: 18px;
    font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
`;
const AfterPantient = styled.span`
    font-size: 16px;
    font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
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
