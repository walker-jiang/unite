import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Button, Form, Col, Row, Modal, Select, DatePicker, Radio } from 'antd';
import Input from 'components/dr/input/basicInput';
import { today } from 'commonFunc/defaultData';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import QuickAddName from '../../../n-todayPatient/quickReception/quickAddName';
import selectSty from 'components/antd/style/select';
import buttonSty from 'components/antd/style/button';
import radioSty from 'components/antd/style/radio';
import datePickerSty from 'components/antd/style/datePicker';
import deepClone from 'commonFunc/deepClone';

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
      province: [], // 省数据
      city: [], // 城市数据
      district: [], //县数据
      deptData: [], //科室数据
      docData: [], // 就诊医生数据
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
        birthday: '1992-08-21',
        patienttype: '',
        maritalStatus: '',
        occupation: '', // 职业
        ABO: '', // 血型
        phoneHome: '', // 座机
        streetdesc: '', //详细
        ctName: '', // 联系人
        ctRole: '', //与患者关系
        ctPhone: '', //联系电话
      }
    };
    this.addPatientData = this.addPatientData.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeProvinceSelector = this.changeProvinceSelector.bind(this);
    this.changeCitySelector = this.changeCitySelector.bind(this);
    this.changeDtepSelector = this.changeDtepSelector.bind(this);
  };
  /** [handleSubmit 返回患者信息数据] */
  handleSubmit = (e) => {
    e.preventDefault();
    let data = deepClone(this.state.patientInfo);
    // let patientInfo = this.state.patientInfo;
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('values', values);
      if (!err) {
        Object.assign(data, values);
      }
    });
    return data;
  }
  componentWillMount(){
    this.getDictList(['country', 'nation', 'sex', 'marry', 'occupation', 'cardtype', 'pationtype', 'pationrel', 'blood']);
  };
  componentDidMount(){
    let province = [];
    let city = [];
    let district = [];
    province = this.getProvinceData(); // 获取省份数据
    if(province.length){ // 保证有数据
      city = this.getCityData(province[0].provid);
    }
    if(city.length){ // 保证有数据
      district = this.getDistrictData(city[0].cityid);
    }
    let deptData = this.getDept();
    let docData = [];
    if(deptData.length){
      docData = this.getDocData(deptData[0].deptid);
    }
    this.setState({ province, city, district, deptData, docData });
  };
  /** [getDept 科室数据] */
  getDept() {
    let params = {
      url: 'BaDepartmentController/getList',
      async: false,
      server_url: config_login_url,
      data: {
        orgid: window.sessionStorage.getItem('orgid')
      }
    };
    let that = this;
    let deptData = [];
    function success(res) {
      if(res.result){
        deptData = res.data;
      }
    };
    ajaxGetResource(params, success);
    return deptData;
  }
  /**
   * [getDocData 获取医生数据]
   * @param  {[type]} deptid [科室 ID]
   */
  getDocData(deptid){
    let self = this;
    let params = {
      url: 'BaOrguserController/getList',
      async: false,
      data: {
        orgid: window.sessionStorage.getItem('orgid'),
        deptid: deptid ,
        keyword: ''
      },
    };
    let docData = [];
    function callBack(res){
      if(res.result){
        docData = res.data;
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
    return docData;
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
    if(JSON.stringify(patientInfo) != '{}'){ // 修改**挂号信息**接口
      if(patientInfo.patientid != this.props.baPatient.patientid){
        this.refreshAreaData(patientInfo);
        if(patientInfo.dept){
          this.getDocData(patientInfo.dept.key);
        }
      }
    }
  };
  /**
   * [refreshAreaData 通过患者信息数据刷新省市县数据]
   * @param  {[type]} patientInfo [患者信息]
   * @return {[type]}             [undefined]
   */
  refreshAreaData(patientInfo){
    let provinceObj = {
      key: patientInfo.provinceid,
      label: patientInfo.provinceidDic
    };
    let cityObj = {
      key: patientInfo.cityid,
      label: patientInfo.cityidDic
    };
    let districtObj = {
      key: patientInfo.districtid,
      label: patientInfo.districtidDic
    };
    let province = [];
    let city = [];
    let district = [];
    province = this.getProvinceData(); // 获取省份数据
    if(province.length){ // 保证有数据
      city = this.getCityData(patientInfo.provinceid);
    }
    if(city.length){ // 保证有数据
      district = this.getDistrictData(patientInfo.cityid);
    }
    patientInfo.province = provinceObj;
    patientInfo.city = cityObj;
    patientInfo.district = districtObj;
    this.setState({ province, city, district, patientInfo });
  };
  /** [getProvinceData 获取省级区划数据] */
  getProvinceData(){
    let self = this;
    let province = [];
    let params = {
      url: 'BaProvinceController/getList',
      async: false,
      data: {},
    };
    function callBack(res){
      if(res.result && res.data.length){
        province = res.data;
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
    return province;
  };
  /**
   * [getCityData 获取市级区划数据]
   * @param  {[type]} provinceId [所属省份ID]
   * @return {[type]}            [undefined]
   */
  getCityData(provinceId){
    let self = this;
    let city = [];
    let params = {
      url: 'BaCityController/getList',
      async: false,
      data: {
        provid: provinceId
      },
    };
    function callBack(res){
      if(res.result && res.data.length){
        city = res.data;
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
    return city;
  };
  /**
   * [getDistrictData 获取县级区划数据]
   * @param  {[type]} cityId [所属城市ID]
   * @return {[type]}        [undefined]
   */
  getDistrictData(cityId){
    let self = this;
    let district = [];
    let params = {
      url: 'BaDistrictController/getList',
      async: false,
      data: {
        cityid: cityId
      },
    };
    function callBack(res){
      if(res.result){
        district = res.data;
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
    return district;
  };
  addPatientData(patientInfo){
    this.props.form.setFieldsValue({'patientname': patientInfo.patientname});
    this.refreshAreaData(patientInfo);
  };
  /**
   * [changeDate 日期选择器日期改变的监听函数]
   * @param  {[type]} moment     [带格式的日期对象]
   * @param  {[type]} dateString [日期字符串]
   * @return {[type]}            [undefined]
   */
  changeDate(moment, dateString){
    let patientInfo = this.state.patientInfo;
    patientInfo['birthday'] = moment.format('YYYY-MM-DD');
    this.setState({ patientInfo });
  };
  /**
   * [changeProvinceSelector 改变省级行政区划的监听函数]
   * @param  {[type]} e [当前省级对象]
   * @return {[type]}   [undefined]
   */
  changeProvinceSelector(e){
    let city = [];
    let district = [];
    let cityObj = {key: '', label: ''};
    let districtObj = {key: '', label: ''};
    city = this.getCityData(e.key);
    if(city.length){ // 保证有数据
      cityObj = {
        key: city[0].cityid,
        label: city[0].cityname
      };
      district = this.getDistrictData(city[0].cityid)
    }
    if(district.length){ // 保证有数据
      districtObj = {
        key: district[0].distid,
        label: district[0].distname
      };
    }
    this.setState({ city, district }, () => {
        this.props.form.setFieldsValue({ city: cityObj }); // 给市级表单选择框赋值
        this.props.form.setFieldsValue({ district: districtObj }); // 给县级表单选择框赋值
    });
  };
  /**
   * [changeCitySelector 改变市级行政区划的监听函数]
   * @param  {[type]} e [当前市级对象]
   * @return {[type]}   [undefined]
   */
  changeCitySelector(e){
    let district = [];
    let districtObj = {key: '', label: ''};
    district = this.getDistrictData(e.key);
    if(district.length){ // 保证有数据
      districtObj = {
        key: district[0].distid,
        label: district[0].distname
      };
    }
    this.setState({ district }, () => {
        this.props.form.setFieldsValue({ district: districtObj }); // 给县级表单选择框赋值
    });
  };
  /**
   * [changeDtepSelector 改变科室下拉框的回调]
   * @param  {[type]} e [事件源]
   * @return {[type]}   [undefined]
   */
  changeDtepSelector(e){
    let docData = docData = this.getDocData(e.key);
    this.setState({ docData }, () => {
      this.props.form.setFieldsValue({ doctor: { key: '', label: ''} }); // 给县级表单选择框赋值
    });
  };
  /**
   * [validateCardno 身份证校验]
   * @param  {[type]}   rule     [校验规则]
   * @param  {[type]}   value    [当前值]
   * @param  {Function} callback [回调]
   * @return {[type]}            [undefined]
   */
  validateCardno = (rule, value, callback) => {
    const { getFieldValue, setFieldsInitialValue } = this.props.form
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    let validateResult = true;
    if(value.trim() == ''){ // 非空校验
      validateResult = false;
      callback('请输入证件号码！');
    }
    if(reg.test(value) === false) // 格式校验
    {
      validateResult = false;
      callback('请输入有效证件号！');
    }
    if(validateResult){
      let birthday = extractDataFromIdentityCard.getBirthdayFromIdCard(value);
      let sex = extractDataFromIdentityCard.getSexFromIdCard(value);
      let patientInfo = this.state.patientInfo;
      patientInfo.birthday = birthday;
      patientInfo.sex = sex;
      this.setState({ patientInfo });
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let disabled = this.props.disabled;
    let { country, nation, sex, marry, occupation, pationtype, cardtype, pationrel, blood, province, city, district, patientInfo, deptData, docData } = this.state;
    let age = extractDataFromIdentityCard.getAgeFromBirthday(patientInfo.birthday);
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
     const formItemLayoutBehind = {
       labelCol: {
         xs: { span: 10 },
         sm: { span: 10 },
       },
       wrapperCol: {
         xs: { span: 14 },
         sm: { span: 14 },
       },
     }
    return (
      <SpecForm onSubmit={this.handleSubmit} className='not-draggable' onClick={() => {this.quickAddName.hideResult()}}>
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
                    <QuickAddName ref={ref => {this.quickAddName = ref}} disabled={disabled} placeholder='请选择患者信息' getQuickData = {this.addPatientData}/>
                  )}
              </SpecFormItem>
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
                    rules: [{ required: true, message: '请输入正确格式的移动电话!', pattern: /^1(3|4|5|7|8)\d{9}$/ }],
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
                    rules: [{ validator: this.validateCardno }],
                    initialValue: patientInfo.cardno })
                    (
                      <SpecInput placeholder='请输入患者证件号码' />
                    )
                  }
                </SpecFormItem>
              </Col>
              <Col span={7} offset={1}>
                <FormItem
                  {...formItemLayout}
                  colon={false}
                  label="性别："
                  >
                  {getFieldDecorator('sex', {
                    rules: [{ required: true, message: '请输入患者性别!' }],
                    initialValue: patientInfo.sex
                  })(
                    <SpecRadioGroup disabled>
                    {
                      sex.map(item => <Radio value={item.value} key={item.value}>{item.vname}</Radio>)
                    }
                    </SpecRadioGroup>
                  )}
                </FormItem>
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
                  initialValue: moment(patientInfo.birthday, 'YYYY-MM-DD')
                })(
                  <SpecDatePicker disabled onChange={this.changeDate} disabled={disabled} allowClear={false}/>
                )}
                <SpecSpecInput placeholder='年龄' disabled value={age} onChange={() => {}}/>
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
                  {getFieldDecorator('position', {
                    initialValue: patientInfo.position ? patientInfo.position : ( occupation.length ? occupation[0].value : '')
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
                  {getFieldDecorator('bloodGroup', {
                    initialValue: patientInfo.bloodGroup ? patientInfo.bloodGroup : ( blood.length ? blood[0].value : '')
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
                    initialValue: province.length ? ( patientInfo.province ? patientInfo.province : { key: province[0].provid, label: province[0].provname }) : {key: '', label: ''}
                  })(
                    <SpecSelect labelInValue onChange={this.changeProvinceSelector} disabled={disabled}>
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
                    initialValue: city.length ? ( patientInfo.city ? patientInfo.city : { key: city[0].cityid, label: city[0].cityname }) : {key: '', label: ''}
                  })(
                    <SpecSelect labelInValue onChange={this.changeCitySelector} disabled={disabled}>
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
                    initialValue: district.length ? ( patientInfo.district ? patientInfo.district : { key: district[0].distid, label: district[0].distname }) : {key: '', label: ''}
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
                    initialValue: patientInfo.streetdesc
                  })(
                    <SpecInput disabled={disabled} holderplace='请输入详细地址（到门牌号）'/>
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
          <Row>
            <Col span={7} offset={1}>
              <FormItem
                {...formItemLayout}
                colon={false}
                label="就诊科室："
                >
                {getFieldDecorator('dept', {
                  rules: [{ required: true, message: '请选择就诊科室!' }],
                  initialValue: deptData.length ? ( patientInfo.dept ? patientInfo.dept : { key: deptData[0].deptid, label: deptData[0].deptname }) : {key: '', label: ''}
                })(
                  <SpecSelect disabled={disabled} onChange={this.changeDtepSelector} labelInValue>
                  {
                    deptData.map(item => <Option key={item.deptid} value={item.deptid}>{item.deptname}</Option>)
                  }
                  </SpecSelect>
                )}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem
                {...formItemLayout}
                colon={false}
                label="接诊医生："
                >
                {getFieldDecorator('doctor', {
                  initialValue: docData.length ? (patientInfo.doctor ? patientInfo.doctor : { key: docData[0].orgUerid, label: docData[0].realname } ) : {key: '', label: ''}
                })(
                  <SpecSelect disabled={disabled} labelInValue>
                  {
                    docData.map(item => <Option key={item.orgUerid} value={item.orgUerid}>{item.realname}</Option>)
                  }
                  </SpecSelect>
                )}
              </FormItem>
            </Col>
          </Row>
        </Container>
      </SpecForm>
    )
  }
}
const SpecForm = styled(Form)`
  width: 1097px;
  border: 1px solid rgba(10, 110, 203, 1);
`;
const Container = styled.div`
  width: 100%;
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
const SpecRadioGroup = styled(RadioGroup)`
  ${radioSty.borderRadioGroup}
`;
const SpecDatePicker = styled(DatePicker)`
  ${datePickerSty.bottomBorder}
`;
/*
@作者：姜中希
@日期：2018-07-23
@描述：患者信息表单组件
*/
const InfoForm = Form.create()(PatientBasicInfo);
export default InfoForm;
