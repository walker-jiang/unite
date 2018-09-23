import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Modal } from 'antd';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Form from 'antd/lib/form';
import 'antd/lib/form/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';
import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Input from 'components/dr/input/basicInput';
import Select from 'antd/lib/select';
import { DatePicker } from 'antd';
import { today } from 'commonFunc/defaultData';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import PatientsNameForm from './patientsNameForm';
import RadioSex from './radioSex';
import RadioCF from './radioCF';
import CureButton from '../layout/body/center/content/treatManage/diseasePreventTreat';

const Option = Select.Option;
const FormItem = Form.Item;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      sex: [] , // 性别列表
      cardtype: [], // 证件类型
      visible: 0,
    };
  };
  handleSubmit = (e) => {
    console.log('e',e)
    e.preventDefault();
  }

  // handleSubmit(formValue){
  //   let buDiagnosisInfo = this.state.buDiagnosisInfo;
  //   buDiagnosisInfo.buDiagnosisList = formValue.originData;
  //   let params = {
  //     url: 'BuDiagnosisInfoController/postData',
  //     type: 'POST',
  //     data: JSON.stringify(buDiagnosisInfo)
  //   }
  //   let that = this;
  //   function success(res) {
  //     that.getDiagnoseData();
  //   };
  //   ajaxGetResource(params, success);
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    let { sex, cardtype, pationrel, visible } = this.state;
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
      c = <Form onSubmit={this.handleSubmit} className='not-draggable'>
            <Container>
              <Row className='height'>
                <Col span={7}>
                  {/* <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="患者姓名："
                    >
                    {getFieldDecorator('syndrome', {
                      initialValue: ''
                    })(
                      <PatientsNameForm />
                    )}
                  </FormItem> */}
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="患者姓名："
                    >
                      {getFieldDecorator('name', {
                        initialValue: ''
                      })(
                        <SpecInput />
                      )}
                  </FormItem>
                </Col>
                <Col span={7} offset={1}>
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="性别："
                    >
                      {getFieldDecorator('sex', {
                        initialValue: ''
                      })(
                        <RadioSex />
                      )}
                  </FormItem>
                </Col>
              </Row>
              <Row className='height'>
                <Col span={7} >
                <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="移动电话："
                    >
                      {getFieldDecorator('phone', {
                        initialValue: ''
                      })(
                        <SpecInput />
                      )}
                  </FormItem>
                </Col>
                <Col span={7} offset={1}>
                  <FormItem
                      {...formItemLayout}
                      colon={false}
                      label="生日/年龄："
                      >
                        {getFieldDecorator('birthday', {
                          initialValue: moment(today, 'YYYY-MM-DD')
                        })(
                          <DatePicker
                            className='DatePickerBB'
                            dropdownClassName='dateDropDownBB'
                            format='YYYY-MM-DD'
                            placeholder='请选择日期'
                          />
                        )}
                        {/* {getFieldDecorator('age', {
                          initialValue: ''
                        })(
                          <SpecInput />
                        )} */}
                  </FormItem>
                </Col>
              </Row>
              <Row className='height'>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="证件类型："
                    >
                      {getFieldDecorator('cardtype', {
                        initialValue: cardtype.length > 0 ? cardtype[0].value : ''
                      })(
                        <Select className='thin_arrow'>
                        {
                          cardtype.map((item, index)=>
                            <Option key={index} value={item.value}>{item.vname}</Option>
                          )
                        }
                        </Select>
                      )}
                  </FormItem>
                </Col>
                <Col span={7} offset={1}>
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label="证件号码："
                    >
                      {getFieldDecorator('cardno', {
                        initialValue: ''
                      })(
                        <SpecInput />
                      )}
                  </FormItem>
                </Col>
              </Row>
            </Container>
            <Footer>
              <Button type="primary" htmlType="submit" className='semicircle' onClick={this.handleOK}>保存</Button>
              <Button type="primary" className='cancel gray' onClick={()=>{this.props.onClose()}}>取消</Button>
            </Footer>
          </Form>
     } else {
       c = <CureButton />
     }
    return (
      <All>
        <Title>
            <Cure>治未病</Cure>
            <Line></Line>
        </Title>
        {c}
      </All>
    )
  }
}
const All = styled.div`

`;
const Title = styled.div`
  border: 1px solid;
  border-color: rgba(204, 204, 204, 1);
  background-color: rgb(242, 242, 242);
  width: 100%;
  height: 50px;
  position: relative;
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
const Container = styled.div`
  margin-top: 129px;
  width: 839px;
  margin-left: 34rem;
  margin-right: 34rem;
`;
const SpecInput = styled(Input)`
  line-height: 25px;
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95px;
  border-top: 1px solid #E6E6E6;
`;
/*
@作者：王崇琨
@日期：2018-09-05
@描述：治未病外侧
*/
const InfoForm = Form.create()(Index);
export default InfoForm;
