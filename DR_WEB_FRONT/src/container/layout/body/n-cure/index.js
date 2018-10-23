import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Form, Row, Col, Radio, Select, DatePicker  } from 'antd';
import { today } from 'commonFunc/defaultData';
import SelectPatient from './selectPatient';
import Input from 'components/dr/input/basicInput';
import selectSty from 'components/antd/style/select';
import calendar from '-!file-loader!components/dr/icon/icons/calendar.svg';
import cureIcon from './images/cureIcon.png';
import buttonSty from 'components/antd/style/button';
import moment from 'moment';
import CureButton from './diseasePreventTreat';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: '',
      cardno: '',
      cardtype: '',
      login: '',
      patientInfo: {
        birthday: '1992-08-21'
      }, //患者数据
    };
    this.stepFunc = this.stepFunc.bind(this);
  };

  componentWillMount () {
    let login = window.sessionStorage.getItem('userid');
    if(login != undefined) {
      this.setState({
        visible: 1
      })
    } else {
      this.setState({
        visible: 0
      })
    }
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    const { getFieldsValue, validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.birthday =values['birthday'].format('YYYY-MM-DD HH:mm:ss');
        if(values.certificatesType == "身份证"){
          values.certificatesType = 1;
        } else if(values.certificatesType == "护照") {
          values.certificatesType = 2;
        } else if(values.certificatesType == "军官证") {
          values.certificatesType = 3;
        }else if(values.certificatesType == "港澳台居民通行证") {
          values.certificatesType = 4;
        }

        if(values.sex == '男') {
          values.sex = 1;
        } else if (values.sex == '女') {
          values.sex = 2;
        }
        window.certificatesNumber = values.certificatesNumber
        window.certificatesType = values.certificatesType;
        window.qSex = values.sex;
        console.log('certificatesType',window.certificatesType);
        console.log('window.qSex',window.qSex);
        let params = {
          type: 'POST',
          url: 'healthcabin/user/add/simple',
          server_url: config_CureService_url,
          data:JSON.stringify(values)
        };
        let that = this;
        function success(res){
          console.log('父组件',res)
          that.setState({
            visible: 2
          })
        };
    
        function error(res){
          console.log('失败',res)
        };
    
        ajaxGetResource(params, success, error);
      }
    });
    // e.preventDefault();
    // this.setState({
    //   visible: 1
    // }, ()=>{
      
    // })

  }

  changeDate(moment, dateString){
    let patientInfo = this.state.patientInfo;
    patientInfo['birthday'] = moment.format('YYYY-MM-DD');
    this.setState({ patientInfo });
  };

  stepFunc(step,cardno,cardtype){
    console.log('step&&&&&&&&&',step);
    console.log('cardtype&&&&&&&&&',cardtype);
    this.setState({ 
      visible: step,
      cardno: cardno,
      cardtype: cardtype
    })
  };
  
  render() {
    const { getFieldDecorator } = this.props.form;
    let { visible, patientInfo, cardno, cardtype } = this.state;
    let date = new Date();
    const age = date.getFullYear() - parseInt(patientInfo.birthday.substr(0,4));
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };
    let c = null;
     if (visible == 0) {
      c = <SpecForm onSubmit={this.handleSubmit.bind(this)} className='not-draggable'>
            <FormBorder>
              <RowTopH>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="患者姓名："
                    >
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入患者姓名!' }],
                      initialValue: ''
                    })(
                      <Input placeholder='请输入患者姓名' />
                    )}
                  </FormItem>
                </Col>
                <Col span={11}>
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="性别："
                    >
                    {getFieldDecorator('sex', {
                      rules: [{ required: true, message: '请输入患者性别!' }],
                      initialValue: '男'
                    })(
                      <SpecRadioGroup>
                        <Radio value='男' key='男'>男</Radio>
                        <Radio value='女' key='女'>女</Radio>
                      </SpecRadioGroup>
                    )}
                  </FormItem>
                </Col>
              </Row>
              </RowTopH>
              <Row>
                <Col span={12}>
                  <SpecFormItem
                    {...formItemLayout}
                    colon={false}
                    label="生日/年龄："
                    >
                    {getFieldDecorator('birthday', {
                      rules: [{ type: 'object', required: true, message: '请输入选择生日!' }],
                      initialValue: moment(patientInfo.birthday, 'YYYY-MM-DD')
                    })(
                      <SpecDatePicker onChange={this.changeDate.bind(this)} allowClear={false}/>
                    )}
                    <SpecInput placeholder='年龄' value={age} onChange={() => {}}/>
                  </SpecFormItem>
                </Col>
                <Col span={11}>
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="移动电话："
                    >
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: '请输入患者移动电话!' }],
                      initialValue: ''
                    })(
                      <Input placeholder='请输入患者移动电话' />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="证件类型："
                    >
                    {getFieldDecorator('certificatesType', {
                      rules: [{ required: true, message: '请输入证件类型!' }],
                      initialValue: '身份证'
                    })(
                      <SpecSelect>
                        <Option key='1' value='1'>身份证</Option>
                        <Option key='2' value='2'>护照</Option>
                        <Option key='3' value='3'>军官证</Option>
                        <Option key='4' value='4'>港澳台居民通行证</Option>
                      </SpecSelect>
                    )}
                  </FormItem>
                </Col>
                <Col span={11}>
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="证件号码："
                    >
                    {getFieldDecorator('certificatesNumber', {
                      rules: [{ required: true, message: '请输入证件号码!' }],
                      initialValue: ''
                    })(<Input placeholder='请输入患者证件号码' />)}
                  </FormItem>
                </Col>
              </Row>
              <Footer>
                <SureButton type="primary"  htmlType="submit">开始中医体质辨析测评</SureButton>
              </Footer>
            </FormBorder>        
          </SpecForm>
     } else if (visible == 1) {
          c = <SelectPatient onStep={this.stepFunc} />
     } else if (visible == 2) {
      c = <CureButton onStep={this.stepFunc} cardno = {cardno} cardtype = {cardtype} />
     }
    return (
      <Container>
        <Title>
            <ImgBingLi src={cureIcon}/>
            <Cure>治未病</Cure>
            <Line></Line>
        </Title>
        {c}
      </Container>
    );
  }
}


const ImgBingLi = styled.img`
  width: 2rem;
  position: absolute;
  margin-top: 0.8rem;
  margin-left: 2.7rem;
`;

const RowTopH = styled.div`
  margin-top: 5.5rem;
`;
const Container = styled.div`
  width: 100%;
  background-color: white;
`;
const Title = styled.div`
  border: 1px solid;
  border-color: rgba(204, 204, 204, 1);
  background-color: rgb(242, 242, 242);
  width: 100%;
  height: 50px;
  position: relative;
`;
const FormBorder = styled.div`
  margin-top: 105px;
  width: 839px;
  height: 31rem;
  margin-left: 17rem;
  margin-right: 34rem;
  border: 1px solid #cccccc;
`;
const Cure = styled.span`
  color: rgb(51, 51, 51);
  font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  position: absolute;
  margin-top: 0.5rem;
  margin-left: 5rem;
`;
const Line = styled.div`
  background-color: rgba(242, 242, 242, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(49, 144, 176, 1);
  width: 96px;
  height: 2px;
  margin-top: 3rem;
  margin-left: 2rem;
`;
const SpecForm= styled(Form)`
  width: 600px;
  &&& > div > div > .ant-form-item {
    margin-bottom: 10px;
  }
`;
const SpecRadioGroup = styled(RadioGroup)`
  &&& {
    border-bottom: 1px solid #D7D7D7;
    width: 100%;
    line-height: 28px;
  }
  .ant-radio-wrapper {
    margin-left: 10px;
    margin-right: 20px;
  }
  .ant-radio-inner:after {
    background-color: #7d868e;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #7d868e;
  }
`;
const SpecDatePicker = styled(DatePicker)`
  .ant-input {
    border-radius: 0px;
    border: none;
    border-bottom: 1px solid #d9d9d9;
  }
  .ant-calendar-picker-icon {
    -webkit-mask: url(${calendar}) no-repeat 50% 50%;
    -webkit-mask-size: 14px 14px;
    background-color: #E9984E;
    width: 20px;
    height: 20px;
    margin-top: -10px;
  }
  .ant-calendar-picker-icon:after {
    content: '';
  }
`;
const SpecFormItem = styled(FormItem)`
  .ant-form-item-children{
    display: flex;
    align-items: flex-start;
  }
`;
const SpecInput = styled(Input)`
  width: 50px;
  margin-left: 20px;
  margin-top: -4px;
`;
const SpecSelect = styled(Select)`
  ${selectSty.thinArrow}
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
const Footer = styled.div`
  // width: 600px;
  // height: 56px;
  // display: flex;
  // justify-content: center;
  // align-items: center
    float: left;
    margin-left: 4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
/*
@作者：姜中希
@日期：2018-09-12
@描述：今日诊疗
*/
const QuickReception = Form.create()(Index);
export default withRouter(QuickReception);
