import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Button, Form, Col, Row, Modal, Select } from 'antd';
import Input from 'components/dr/input/basicInput';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import selectSty from 'components/antd/style/select';
import buttonSty from 'components/antd/style/button';
import deepClone from 'commonFunc/deepClone';
import PatientName from './interconnectedItems/patientName';
import Cardno from './interconnectedItems/cardnoSexBirthday/cardno';
import Sex from './interconnectedItems/cardnoSexBirthday/sex';
import Birthday from './interconnectedItems/cardnoSexBirthday/birthday';
import AreaSelector from './interconnectedItems/areaSelector';
import DeptDoctor from './interconnectedItems/deptDoctor';

const Option = Select.Option;
const FormItem = Form.Item;

class PatientBasicInfo extends Component {
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
      blood: [], // 血型
      patientInfo: {
        patientname: '',
        patientno: '',
        mobile: '',
        countryCode: '',
        nationCode: '',
        cardtype: '',
        miCardno: '',
        cardno: '',
        sex: '',
        birthday: '',
        patienttype: '',
        maritalStatus: '',
        occupation: '', // 职业
        ABO: '', // 血型
        phoneHome: '', // 座机
        province: '', // 省份默认值
        city: '', // 城市默认值
        district: '', //县默认值
        streetdesc: '', //详细
        ctName: '', // 联系人
        ctRole: '', //与患者关系
        ctPhone: '', //联系电话
      }
    };
  };
  /** [handleSubmit 返回患者信息数据] */
  handleSubmit = (e) => {
    e.preventDefault();
    let data = deepClone(this.state.patientInfo);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.assign(data, values);
      }
    });
    return data;
  }
  componentWillMount(){
    this.getDictList(['country', 'nation', 'sex', 'marry', 'occupation', 'cardtype', 'pationtype', 'pationrel', 'blood']);
  };
  /**
   * [getDictList 获取字典列表]
   * @param  {[type]} DictTypeList [字典项数组]
   * @return {[type]}              [undefined]
   */
  getDictList(DictTypeList){
    let self = this;
    let params = {
      url: 'BaDatadictController/getListData',
      data: {
        dictNoList: DictTypeList
      },
    };
    function callBack(res){
      if(res.result){
        let dictListObj = {};
        res.data.forEach(item => {
          dictListObj[item.dictno.toLowerCase()] = item.baDatadictDetailList;
        });
        self.setState({...dictListObj});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  componentWillReceiveProps(nextProps){
    if(JSON.stringify(nextProps.baPatient) != JSON.stringify(this.props.baPatient)){
      this.setState({ patientInfo: nextProps.baPatient });
    }
  };
  render() {
    const { getFieldDecorator, setFieldsValue, getFieldValue } = this.props.form;
    let disabled = this.props.disabled;
    let { country, nation, sex, marry, occupation, pationtype, cardtype, pationrel, blood, patientInfo } = this.state;

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
     let commontProps = { formItemLayout, getFieldDecorator, setFieldsValue, getFieldValue, disabled };
    return (
      <SpecForm onSubmit={this.handleSubmit} className='not-draggable' onClick={() => { this.patientName.hidePopTable() }}>
        <Container>
          <HideFormItem
            label="患者ID（隐藏）"
            >
            {getFieldDecorator('patientid', {
              initialValue: patientInfo.patientid
            })(
              <SpecInput disabled={disabled}/>
            )}
          </HideFormItem>
          <Row>
            <Col span={7} offset={1}>
              <PatientName commontProps={commontProps} ref={ ref => { this.patientName = ref }} initialValue={patientInfo.patientname}/>
            </Col>
            <Col span={7}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="就诊卡号："
                >
                {getFieldDecorator('miCardno', {
                  initialValue: patientInfo.miCardno
                })(
                  <SpecInput disabled={disabled}/>
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
                    <SpecInput disabled placeholder='患者编号由系统自动生成'/>
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
                    rules: [{ required: true, message: '请输入正确的移动电话!', pattern: /^1(3|4|5|7|8)\d{9}$/ }],
                    initialValue: patientInfo.mobile
                  })(
                    <SpecInput disabled={disabled}/>
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
                    initialValue: patientInfo.countryCode
                  })(
                    <SpecSelect disabled={disabled} allowClear onFocus={() => {this.patientName.hidePopTable()}}>
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
                    initialValue: patientInfo.nationCode
                  })(
                    <SpecSelect disabled={disabled} allowClear onFocus={() => {this.patientName.hidePopTable()}}>
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
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="证件类型："
                >
                  {getFieldDecorator('cardtype', {
                    rules: [{ required: true, message: '请填写患者证件类型!' }],
                    initialValue: patientInfo.cardtype
                  })(
                    <SpecSelect disabled={disabled} allowClear onFocus={() => {this.patientName.hidePopTable()}}>
                      {
                        cardtype.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                  </SpecSelect>
                )}
              </SpecFormItem>
            </Col>
            <Col span={7}>
              <Cardno commontProps={commontProps} initialValue={patientInfo.cardno}/>
              </Col>
              <Col span={7} offset={1}>
                <Sex commontProps={commontProps} sex={sex} initialValue={patientInfo.sex}/>
              </Col>
          </Row>
          <Row>
            <Col span={7} offset={1}>
              <Birthday commontProps={commontProps} initialValue={patientInfo.birthday}/>
            </Col>
            <Col span={7}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="患者类型："
                >
                  {getFieldDecorator('patienttype', {
                    initialValue: patientInfo.patienttype
                  })(
                    <SpecSelect disabled={disabled} allowClear onFocus={() => {this.patientName.hidePopTable()}}>
                    {
                      pationtype.map((item, index)=>
                        <Option key={index} value={item.value} >{item.vname}</Option>
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
                    initialValue: patientInfo.maritalStatus
                  })(
                    <SpecSelect disabled={disabled} allowClear onFocus={() => {this.patientName.hidePopTable()}}>
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
            <Col span={7} offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="职业："
                >
                  {getFieldDecorator('position', {
                    initialValue: patientInfo.position
                  })(
                    <SpecSelect disabled={disabled} allowClear onFocus={() => {this.patientName.hidePopTable()}}>
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
                  {getFieldDecorator('bloodGroup', {
                    initialValue: patientInfo.bloodGroup
                  })(
                    <SpecSelect disabled={disabled} allowClear onFocus={() => {this.patientName.hidePopTable()}}>
                    {
                      blood.map((item, index)=>
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
                    <SpecInput disabled={disabled}/>
                  )}
              </SpecFormItem>
            </Col>
          </Row>
          <AreaSelector commontProps={commontProps} onFocus={() => {this.patientName.hidePopTable()}} initialValue={{ province: patientInfo.province, city: patientInfo.city, district: patientInfo.district, streetdesc: patientInfo.streetdesc}}/>
          <Row>
            <Col span={7}  offset={1}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="联系人："
                >
                  {getFieldDecorator('ctName', {
                    initialValue: patientInfo.ctName
                  })(
                    <SpecInput disabled={disabled}/>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={7}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="与患者关系："
                >
                  {getFieldDecorator('ctRole', {
                    initialValue: patientInfo.ctRole
                  })(
                    <SpecSelect disabled={disabled} allowClear onFocus={() => {this.patientName.hidePopTable()}}>
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
                    <SpecInput disabled={disabled}/>
                  )}
              </SpecFormItem>
            </Col>
          </Row>
          {
            this.props.formType == 'basicInfo' ? null :
            <DeptDoctor commontProps={commontProps} onFocus={() => {this.patientName.hidePopTable()}} initialValue={{ dept: patientInfo.dept, doctor: patientInfo.doctor}}/>
          }
        </Container>
      </SpecForm>
    )
  }
}
const SpecForm = styled(Form)`
  width: 897px;
  max-height: 450px;
  overflow: auto;
  border: 1px solid rgba(10, 110, 203, 1);
`;
const HideFormItem = styled(FormItem)`
  &&& {
    display: none;
  }
`;
const Container = styled.div`
  width: 100%;
`;
const SpecInput = styled(Input)`
  line-height: 25px;
`;
const SpecSelect = styled(Select)`
  ${selectSty.thinArrow};
  &&& {
    font-size: 12px;
  }
`;
const SpecFormItem = styled(FormItem)`
  &&& {
    margin-bottom: 8px;
  }
`;

/*
@作者：姜中希
@日期：2018-07-23
@描述：患者信息表单组件
*/
const InfoForm = Form.create()(PatientBasicInfo);
export default InfoForm;
