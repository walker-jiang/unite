import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Button, Form, Col, Row, Modal, Select, DatePicker } from 'antd';
import Input from 'components/dr/input/basicInput';
import { today } from 'commonFunc/defaultData';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import QuickAddName from '../../../n-todayPatient/quickReception/quickAddName';
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
    this.addPatientData = this.addPatientData.bind(this);
    this.changeDate = this.changeDate.bind(this);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        return values;
      }
    });
  }
  getDictData(dictNo){
    let self = this;
    let params = {
      url: 'BaDatadictController/getData',
      data: {
        dictNo: dictNo
      },
    };
    function callBack(res){
      if(res.result){
        let arr = res.data.baDatadictDetailList;
        self.setState({[dictNo]: arr});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  componentWillMount(){
    this.getDictData('country'); // 获取国籍列表
    this.getDictData('nation'); // 获取民族列表
    this.getDictData('sex'); // 获取性别列表
    this.getDictData('marry'); // 获取婚姻列表
    this.getDictData('occupation'); // 获取职业列表
    this.getDictData('pationtype');
    this.getDictData('cardtype'); // 获取证件类型列表
    this.getDictData('pationrel'); // 获取患者关系类型列表
    this.getProvinceData(); // 获取省份数据
  };
  getProvinceData(){
    let self = this;
    let params = {
      url: 'BaProvinceController/getList',
      data: {},
    };
    function callBack(res){
      if(res.result && res.data.length){
        let province = res.data;
        self.setState({province},() => {
          self.getCityData(province[0].provid);
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  getCityData(provinceId){
    let self = this;
    let params = {
      url: 'BaCityController/getList',
      data: {
        provid: provinceId
      },
    };
    function callBack(res){
      if(res.result && res.data.length){
        let city = res.data;
        self.setState({city}, () => {
          self.getAreaData(city[0].cityid);
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  getAreaData(cityId){
    let self = this;
    let params = {
      url: 'BaDistrictController/getList',
      data: {
        cityid: cityId
      },
    };
    function callBack(res){
      if(res.result){
        let area = res.data;
        self.setState({area});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  addPatientData(patientInfo){
    this.props.form.setFieldsValue({'patientname': patientInfo.patientname});
    this.setState({ patientInfo });
  };
  changeDate(moment, dateString){
    let patientInfo = this.state.patientInfo;
    patientInfo['birthday'] = moment.format('YYYY-MM-DD');
    this.setState({ patientInfo });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    let { country, nation, sex, marry, occupation, pationtype, cardtype, pationrel, province, city, area, patientInfo } = this.state;
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
    return (
      <Form onSubmit={this.handleSubmit} className='not-draggable' onClick={() => {this.quickAddName.hideResult()}}>
        <Container>
          <Row>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="患者姓名："
                >
                  {getFieldDecorator('patientname', {
                    initialValue: ''
                  })(
                    <QuickAddName ref={ref => {this.quickAddName = ref} } placeholder='请选择患者信息' getQuickData = {this.addPatientData.bind(this)}/>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={7}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="就诊卡号："
                >
                {getFieldDecorator('careCardno', {
                  initialValue: ''
                })(
                  <SpecInput />
                )}
              </SpecFormItem>
            </Col>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="患者编号："
                >
                  {getFieldDecorator('patientno', {
                    initialValue: patientInfo.patientno
                  })(
                    <SpecInput />
                  )}
              </SpecFormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="移动电话："
                >
                  {getFieldDecorator('mobile', {
                    initialValue: patientInfo.mobile
                  })(
                    <SpecInput />
                  )}
              </SpecFormItem>
            </Col>
            <Col span={7} >
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="国籍："
                >
                  {getFieldDecorator('countryCode', {
                    initialValue: patientInfo.country ? patientInfo.country : ( country.length ? country[0].value : '')
                  })(
                    <SpecSelect>
                    {
                      country.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="民族："
                >
                  {getFieldDecorator('nationCode', {
                    initialValue: patientInfo.nation ? patientInfo.nation : ( nation.length ? nation[0].value : '')
                  })(
                    <SpecSelect>
                    {
                      nation.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7} >
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="证件类型："
                >
                  {getFieldDecorator('cardtype', {
                    initialValue: patientInfo.cardtype ? patientInfo.cardtype : ( cardtype.length ? cardtype[0].value : '')
                  })(
                    <SpecSelect>
                      {
                        cardtype.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                  </SpecSelect>
                )}
              </SpecFormItem>
            </Col>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="证件号码："
                >
                  {getFieldDecorator('cardno', {
                    initialValue: patientInfo.cardno
                  })(
                    <SpecInput />
                  )}
                </SpecFormItem>
              </Col>
              <Col span={7} offset={1}>
                <SpecFormItem
                  {...formItemLayout}
                  colon={false}
                  label="性别："
                  >
                    {getFieldDecorator('sex', {
                      initialValue: patientInfo.sex ? patientInfo.sex : ( sex.length ? sex[0].value : '')
                    })(
                      <SpecSelect>
                        {
                          sex.map((item, index)=>
                          <Option key={index} value={item.value}>{item.vname}</Option>
                        )
                      }
                    </SpecSelect>
                  )}
                </SpecFormItem>
              </Col>
          </Row>
          <Row>
            <Col span={7} >
              <SpecSpecFormItem
                {...formItemLayout}
                colon={false}
                label="生日/年龄："
                >
                {getFieldDecorator('birthday', {
                  rules: [{ type: 'object', required: true, message: '请输入选择生日!' }],
                  initialValue: moment(patientInfo.birthday, 'YYYY-MM-DD')
                })(
                  <SpecDatePicker onChange={this.changeDate} allowClear={false}/>
                )}
                <SpecSpecInput placeholder='年龄' value={age} onChange={() => {}}/>
              </SpecSpecFormItem>
            </Col>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="患者类型："
                >
                  {getFieldDecorator('patienttype', {
                    initialValue: patientInfo.patienttype ? patientInfo.patienttype : ( pationtype.length ? pationtype[0].value : '')
                  })(
                    <SpecSelect>
                    {
                      pationtype.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="婚姻状态："
                >
                  {getFieldDecorator('maritalStatus', {
                    initialValue: patientInfo.maritalStatus ? patientInfo.maritalStatus : ( marry.length ? marry[0].value : '')
                  })(
                    <SpecSelect>
                    {
                      marry.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7} >
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="职业："
                >
                  {getFieldDecorator('occupation', {
                    initialValue: patientInfo.occupation ? patientInfo.occupation : ( occupation.length ? occupation[0].value : '')
                  })(
                    <SpecSelect>
                    {
                      occupation.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={7} >
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="ABO血型："
                >
                  {getFieldDecorator('ABO', {
                    initialValue: patientInfo.occupation ? patientInfo.occupation : ( occupation.length ? occupation[0].value : '')
                  })(
                    <SpecSelect>
                    {
                      occupation.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="座机："
                >
                  {getFieldDecorator('phoneHome', {
                    initialValue: patientInfo.phoneHome
                  })(
                    <SpecInput />
                  )}
              </SpecFormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7} >
              <SpecFormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 14}}
                colon={false}
                label="住址："
                >
                  {getFieldDecorator('provinceid', {
                    initialValue: province.length > 0 ? {key: province[0].provid, label: province[0].provname} : {key: '', label: ''}
                  })(
                    <SpecSelect labelInValue onChange={(e) => {this.getCityData(e.key)}}>
                    {
                      province.map((item, index)=>
                        <Option key={index} value={item.provid}>{item.provname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={5}>
              <SpecFormItem
                labelCol={{span: 0}}
                wrapperCol={{span: 22}}
                colon={false}
                >
                  {getFieldDecorator('cityid', {
                    initialValue: city.length > 0 ? {key: city[0].cityid, label: city[0].cityname} : {key: '', label: ''}
                  })(
                    <SpecSelect labelInValue onChange={(e) => {this.getAreaData(e.key)}}>
                    {
                      city.map((item, index)=>
                        <Option key={index} value={item.cityid}>{item.cityname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={5} >
              <SpecFormItem
                labelCol={{span: 1}}
                wrapperCol={{span: 22}}
                colon={false}
                label=' '
                >
                  {getFieldDecorator('areaid', {
                    initialValue: area.length > 0 ? {key: area[0].distid, label: area[0].distname} : {key: '', label: ''}
                  })(
                    <SpecSelect labelInValue>
                    {
                      area.map((item, index)=>
                        <Option key={index} value={item.distid}>{item.distname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={6}>
              <SpecFormItem
                labelCol={{span: 1}}
                wrapperCol={{span: 23}}
                colon={false}
                label=" "
                >
                  {getFieldDecorator('streetdesc', {
                    initialValue: 'a'
                  })(
                    <SpecInput />
                  )}
              </SpecFormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7} >
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="联系人："
                >
                  {getFieldDecorator('ctName', {
                    initialValue: patientInfo.ctName
                  })(
                    <SpecInput />
                  )}
              </SpecFormItem>
            </Col>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="与患者关系："
                >
                  {getFieldDecorator('ctRole', {
                    initialValue: patientInfo.ctRole ? patientInfo.ctRole : ( pationrel.length ? pationrel[0].value : '' )
                  })(
                    <SpecSelect>
                    {
                      pationrel.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="联系电话："
                >
                  {getFieldDecorator('ctPhone', {
                    initialValue: patientInfo.ctPhone
                  })(
                    <SpecInput />
                  )}
              </SpecFormItem>
            </Col>
          </Row>
        </Container>
      </Form>
    )
  }
}
const Container = styled.div`
  width: 100%;
  margin: 20px 0px;
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
/*
@作者：姜中希
@日期：2018-07-23
@描述：患者信息弹框form表单组件
*/
const InfoForm = Form.create()(Index);
export default InfoForm;
