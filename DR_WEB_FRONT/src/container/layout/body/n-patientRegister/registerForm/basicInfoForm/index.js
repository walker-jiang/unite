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
      blood: [], // 血型
      province: [], // 省数据
      city: [], // 城市数据
      district: [], //县数据
      patientInfo: {
        patientname: '',
        patientno: '',
        mobile: '',
        countryCode: '',
        nationCode: '',
        cardtype: '',
        cardno: '',
        sex: '',
        birthday: '1992-08-21',
        patienttype: '',
        maritalStatus: '',
        occupation: '', // 职业
        ABO: '', // 血型
        phoneHome: '', // 座机
        province: {key: '', label:''}, // 所属省份
        city: {key: '', label:''}, // 所属城市
        district: {key: '', label:''}, // 区县,
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
  componentWillMount(){
    this.getProvinceData('init'); // 获取省份数据
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
    let patientInfo = nextProps.baPatient;
    if(patientInfo != this.props.baPatient ){ // 修改时默认地址
      patientInfo.province = {
        key: patientInfo.provinceid,
        label: patientInfo.provinceidDic
      };
      patientInfo.city = {
        key: patientInfo.cityid,
        label: patientInfo.cityidDic
      };
      patientInfo.district = {
        key: patientInfo.districtid,
        label: patientInfo.districtidDic
      };
      console.log('属性测试', patientInfo);
      this.setState({
        patientInfo: patientInfo
      })
    }
  };
  getProvinceData(triggerWay){
    let self = this;
    let params = {
      url: 'BaProvinceController/getList',
      data: {},
    };
    function callBack(res){
      if(res.result && res.data.length){
        let province = res.data;
        let defaultProvince = {
          key: province[0].provid,
          label: province[0].provname
        };
        if(triggerWay == 'init'){
          self.setState({ province },() => {
            self.getCityData(defaultProvince.key, triggerWay);
          });
        }
        else{
          // 更新默认值
          let patientInfo = self.state.patientInfo;
          patientInfo.province = defaultProvince;
          self.setState({ province, patientInfo },() => {
            self.getCityData(defaultProvince.key, triggerWay);
          });
        }
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  getCityData(provinceId, triggerWay){
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
        let defaultCity = {
          key: city[0].cityid,
          label: city[0].cityname
        };
        if(triggerWay == 'init'){
          self.setState({ city }, () => {
            self.getDistrictData(defaultCity.key, triggerWay);
          });
        }else {
          // 更新默认值
          let patientInfo = self.state.patientInfo;
          patientInfo.city = defaultCity;
          self.setState({ city, patientInfo }, () => {
            self.getDistrictData(defaultCity.key, triggerWay);
          });
        }

      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  getDistrictData(cityId, triggerWay){
    let self = this;
    let params = {
      url: 'BaDistrictController/getList',
      data: {
        cityid: cityId
      },
    };
    function callBack(res){
      if(res.result){
        let district = res.data;
        let defaultDistrict = {
          key: district[0].distid,
          label: district[0].distname
        };
        if(triggerWay == 'init'){
          self.setState({ district });
        }else{
          console.log('动没动', triggerWay);
          // 更新默认值
          let patientInfo = self.state.patientInfo;
          patientInfo.district = defaultDistrict;
          self.setState({ district, patientInfo });
        }
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  addPatientData(patientInfo){
    this.props.form.setFieldsValue({'patientname': patientInfo.patientname});
    this.setState({ patientInfo }, () => {
      this.getProvinceData();
    });
  };
  changeDate(moment, dateString){
    let patientInfo = this.state.patientInfo;
    patientInfo['birthday'] = moment.format('YYYY-MM-DD');
    this.setState({ patientInfo });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    let disabled = this.props.disabled;
    let { country, nation, sex, marry, occupation, pationtype, cardtype, pationrel, blood, province, city, district, patientInfo } = this.state;
    console.log('blood', blood);
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
                    rules: [{ required: true, message: '请填写患者姓名!' }],
                    initialValue: patientInfo.patientname
                  })(
                    <QuickAddName ref={ref => {this.quickAddName = ref}} disabled={disabled} placeholder='请选择患者信息' getQuickData = {this.addPatientData.bind(this)}/>
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
                    rules: [{ required: true, message: '请填写患者编号!' }],
                    initialValue: patientInfo.patientno
                  })(
                    <SpecInput disabled={disabled}/>
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
                    rules: [{ required: true, message: '请填写电话号码!' }],
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
                    initialValue: patientInfo.countryCode ? patientInfo.countryCode : ( country.length ? country[0].value : '')
                  })(
                    <SpecSelect disabled={disabled}>
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
                    initialValue: patientInfo.nationCode ? patientInfo.nationCode : ( nation.length ? nation[0].value : '')
                  })(
                    <SpecSelect disabled={disabled}>
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
                    initialValue: patientInfo.cardtype ? patientInfo.cardtype : ( cardtype.length ? cardtype[0].value : '')
                  })(
                    <SpecSelect disabled={disabled}>
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
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="证件号码："
                >
                  {getFieldDecorator('cardno', {
                    rules: [{ required: true, message: '请填写患者证件号码!' }],
                    initialValue: patientInfo.cardno
                  })(
                    <SpecInput disabled={disabled}/>
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
                      <SpecSelect disabled={disabled}>
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
            <Col span={7} offset={1}>
              <SpecSpecFormItem
                {...formItemLayout}
                colon={false}
                label="生日/年龄："
                >
                {getFieldDecorator('birthday', {
                  rules: [{ type: 'object', required: true, message: '请输入选择生日!' }],
                  initialValue: moment(patientInfo.birthday, 'YYYY-MM-DD')
                })(
                  <SpecDatePicker onChange={this.changeDate} disabled={disabled} allowClear={false}/>
                )}
                <SpecSpecInput placeholder='年龄' disabled={disabled} value={age} onChange={() => {}}/>
              </SpecSpecFormItem>
            </Col>
            <Col span={7}>
              <SpecFormItem
                {...formItemLayout}
                colon={false}
                label="患者类型："
                >
                  {getFieldDecorator('patienttype', {
                    initialValue: patientInfo.patienttype ? patientInfo.patienttype : ( pationtype.length ? pationtype[0].value : '')
                  })(
                    <SpecSelect disabled={disabled}>
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
                    initialValue: patientInfo.maritalStatus ? patientInfo.maritalStatus : ( marry.length ? marry[0].value : '')
                  })(
                    <SpecSelect disabled={disabled}>
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
                  {getFieldDecorator('occupation', {
                    initialValue: patientInfo.occupation ? patientInfo.occupation : ( occupation.length ? occupation[0].value : '')
                  })(
                    <SpecSelect disabled={disabled}>
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
                    initialValue: patientInfo.ABO ? patientInfo.occupation : ( blood.length ? blood[0].value : '')
                  })(
                    <SpecSelect disabled={disabled}>
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
          <Row>
            <Col span={7} >
              <SpecFormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 14}}
                colon={false}
                label="住址："
                >
                  {getFieldDecorator('province', {
                    initialValue: province.length > 0 ? ( patientInfo.province.key ? patientInfo.province : {key: province[0].provid, label: province[0].provname}) : {key: '', label: ''}
                  })(
                    <SpecSelect labelInValue onChange={(e) => {this.getCityData(e.key, 'select')}} disabled={disabled}>
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
                  {getFieldDecorator('city', {
                    initialValue: city.length > 0 ? ( patientInfo.city.key ? patientInfo.city : {key: city[0].cityid, label: city[0].cityname}) : {key: '', label: ''}
                  })(
                    <SpecSelect labelInValue onChange={(e) => {this.getDistrictData(e.key, 'select')}} disabled={disabled}>
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
                  {getFieldDecorator('district', {
                    initialValue: district.length > 0 ? ( patientInfo.district.key ? patientInfo.district : {key: district[0].distid, label: district[0].distname}) : {key: '', label: ''}
                  })(
                    <SpecSelect labelInValue disabled={disabled}>
                    {
                      district.map((item, index)=>
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
                    <SpecInput disabled={disabled}/>
                  )}
              </SpecFormItem>
            </Col>
          </Row>
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
                    initialValue: patientInfo.ctRole ? patientInfo.ctRole : ( pationrel.length ? pationrel[0].value : '' )
                  })(
                    <SpecSelect disabled={disabled}>
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
