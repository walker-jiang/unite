import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Form, Col, Row } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import QuickAddName from './quickAddName';

const FormItem = Form.Item;

export default class PatientName extends Component {
  constructor(props){
    super(props);
    this.addPatientData = this.addPatientData.bind(this);
  };
  /** [hidePopTable 隐藏弹框] */
  hidePopTable(){
    this.quickAddName.hideResult()
  };
  /**
   * [addPatientData 将获取的患者数据筛选后重新赋值给表单项]
   * @param {[type]} patientInfo [患者基本数据]
   */
  addPatientData(patientInfo){
    if(patientInfo){
      let province = {
        key: patientInfo.provinceid,
        label: patientInfo.provinceidDic
      };
      let city = {
        key: patientInfo.cityid,
        label: patientInfo.cityidDic
      };
      let district = {
        key: patientInfo.districtid,
        label: patientInfo.districtidDic
      };
      patientInfo.province = {
        value: province,
        istouched: true
      };
      patientInfo.city = city;
      patientInfo.city = {
        value: city,
        istouched: true
      };
      patientInfo.district = district;
      patientInfo.district = {
        value: district,
        istouched: true
      };

      delete patientInfo.addrHome;
      delete patientInfo.allergichistory;
      delete patientInfo.createDate;
      delete patientInfo.creator;
      delete patientInfo.ctsorgid;
      delete patientInfo.ctsorgidDic;
      delete patientInfo.ctstamp;
      delete patientInfo.disabilityCertificateNo;
      delete patientInfo.disabilityCertificateNo;
      delete patientInfo.healthCardNo;
      delete patientInfo.householdRegisterNo;
      delete patientInfo.jclevel;
      delete patientInfo.key;
      delete patientInfo.miName;
      delete patientInfo.miNo;
      delete patientInfo.miType;
      delete patientInfo.officerNo;
      delete patientInfo.outpatientno;
      delete patientInfo.passportNo;
      delete patientInfo.pasthistory;
      delete patientInfo.phoneWorkunit;
      delete patientInfo.pinyin;
      delete patientInfo.postcode;
      delete patientInfo.status;
      delete patientInfo.upstamp;
      delete patientInfo.useflag;
      delete patientInfo.workunit;
      delete patientInfo.provinceid;
      delete patientInfo.provinceidDic;
      delete patientInfo.cityid;
      delete patientInfo.cityidDic;
      delete patientInfo.districtid;
      delete patientInfo.districtidDic;
      delete patientInfo.bloodGroupDic;
      delete patientInfo.cardtypeDic;
      delete patientInfo.patienttypeDic;
      delete patientInfo.positionDic;
      delete patientInfo.sexDic;
      delete patientInfo.ctAddr;
      // delete patientInfo.birthday;
      // delete patientInfo.sex;

      // let composePatientInfo = {
      //   patientid:
      //   patientname:
      //   miCardno
      //   patientno:
      //   mobile:
      //   countryCode:
      //   nationCode
      //   cardtype:
      //   cardno:
      //   sex
      //   birthday
      //   patienttype:
      //   maritalStatus:
      //   position:
      //   bloodGroup:
      //   province
      //   city
      //   district
      //   streetdesc:
      //   phoneHome:
      //   ctName:
      //   ctPhone:
      //   ctRole:
      // };
      patientInfo.birthday = moment(patientInfo.birthday, 'YYYY-MM-DD');

      this.props.commontProps.setFieldsValue({...patientInfo});

    }
  };
  render() {
    let { formItemLayout, getFieldDecorator,  disabled } = this.props.commontProps;
    const initialValue = this.props.initialValue;
    return (
      <SpecFormItem
        {...formItemLayout}
        colon={false}
        label="患者姓名："
        >
          {getFieldDecorator('patientname', {
            rules: [{ required: true, message: '请填写患者姓名!' }],
            initialValue: initialValue
          })(
            <QuickAddName ref={ref => {this.quickAddName = ref} } disabled={disabled} placeholder='请选择患者信息' getQuickData = {this.addPatientData}/>
          )}
      </SpecFormItem>
    )
  }
}
const SpecFormItem = styled(FormItem)`
  &&& {
    margin-bottom: 8px;
  }
`;
/*
@作者：姜中希
@日期：2018-10-31
@描述：患者信息患者姓名联动组件
*/
