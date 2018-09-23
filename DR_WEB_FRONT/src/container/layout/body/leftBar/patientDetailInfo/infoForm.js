import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Button, Form, Col, Row, Modal, Select, DatePicker } from 'antd';
import Input from 'components/dr/input/basicInput';
import { today } from 'commonFunc/defaultData';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import selectSty from 'components/antd/style/select';
import buttonSty from 'components/antd/style/button';

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
      mitype: [], // 患者类型
      cardtype: [], // 证件类型
      pationrel: [], //与患者关系
      province: [], // 省数据
      city: [], // 城市数据
      area: [], //县数据
    };
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.birthday = values.birthday.format('YYYY-MM-DD')
        values.addrHome = values.provinceid.label + values.cityid.label + values.areaid.label;
        values.provinceid = values.provinceid.key;
        values.cityid = values.cityid.key;
        values.areaid = values.areaid.key;
        // console.log(values.birthday);
        let paramData = {
          baPatient: values,
          orgid: window.sessionStorage.getItem('orgid'),
          deptid: window.sessionStorage.getItem('deptid'),
          post: window.sessionStorage.getItem('post'),
          userid: window.sessionStorage.getItem('userid'),
          username: window.sessionStorage.getItem('username'),
          careCardno: values.careCardno
        };
        let self = this;
        let params = {
          url: 'BuRegisterController/postData',
          data: JSON.stringify(paramData),
          type: 'post',
        };
        function callBack(res){
          if(res.result){
            Modal.success({
              title: '用户登记成功',
            });
            self.props.onOk(res.data.patientid, res.data.registerid, res.data.patientname);
          }else{
            console.log('异常响应信息', res);
          }
        };
        ajaxGetResource(params, callBack);
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
    this.getDictData('mitype'); // 获取患者类型列表
    this.getDictData('cardtype'); // 获取证件类型列表
    this.getDictData('pationrel'); // 获取患者关系类型列表
    let province = [{
      ctstamp: "2018-07-24 11:24:38",
    	dictid: 21,
    	pinyin: "fuqi",
    	seqno: 1,
    	useflag: "1",
    	utstamp: "2018-07-24 11:27:12",
    	value: "01",
    	valueid: 55,
    	vdesc: "夫妻",
    	vname: "河北",
    	vtype: 1,
    },{
      ctstamp: "2018-07-24 11:24:38",
    	dictid: 21,
    	pinyin: "fuqi",
    	seqno: 1,
    	useflag: "1",
    	utstamp: "2018-07-24 11:27:12",
    	value: "02",
    	valueid: 55,
    	vdesc: "夫妻",
    	vname: "北京",
    	vtype: 1,
    }];
    let city = [{
      ctstamp: "2018-07-24 11:24:38",
    	dictid: 21,
    	pinyin: "fuqi",
    	seqno: 1,
    	useflag: "1",
    	utstamp: "2018-07-24 11:27:12",
    	value: "01",
    	valueid: 55,
    	vdesc: "夫妻",
    	vname: "石家庄",
    	vtype: 1,
    },{
      ctstamp: "2018-07-24 11:24:38",
    	dictid: 21,
    	pinyin: "fuqi",
    	seqno: 1,
    	useflag: "1",
    	utstamp: "2018-07-24 11:27:12",
    	value: "02",
    	valueid: 55,
    	vdesc: "夫妻",
    	vname: "邢台",
    	vtype: 1,
    }];
    let area = [{
      ctstamp: "2018-07-24 11:24:38",
    	dictid: 21,
    	pinyin: "fuqi",
    	seqno: 1,
    	useflag: "1",
    	utstamp: "2018-07-24 11:27:12",
    	value: "01",
    	valueid: 55,
    	vdesc: "夫妻",
    	vname: "长安区",
    	vtype: 1,
    },{
      ctstamp: "2018-07-24 11:24:38",
    	dictid: 21,
    	pinyin: "fuqi",
    	seqno: 1,
    	useflag: "1",
    	utstamp: "2018-07-24 11:27:12",
    	value: "02",
    	valueid: 55,
    	vdesc: "桥西区",
    	vname: "北京",
    	vtype: 1,
    }];
    this.setState({ province, city, area });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    let { country, nation, sex, marry, occupation, mitype, cardtype, pationrel, province, city, area } = this.state;
    console.log('country',pationrel);
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
      <Form onSubmit={this.handleSubmit} className='not-draggable'>
        <Container>
          <Row className='height'>
            <Col span={7}>
              <FormItem
                {...formItemLayout}
                colon={false}
                label="就诊卡号："
                >
                {getFieldDecorator('careCardno', {
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
                label="患者编号："
                >
                  {getFieldDecorator('patientno', {
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
                label="患者姓名："
                >
                  {getFieldDecorator('patientname', {
                    initialValue: ''
                  })(
                    <SpecInput />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row className='height'>
            <Col span={7} >
              <FormItem
                {...formItemLayout}
                colon={false}
                label="国籍："
                >
                  {getFieldDecorator('countryCode', {
                    initialValue: country.length > 0 ? country[0].value : ''
                  })(
                    <SpecSelect>
                    {
                      country.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </FormItem>
            </Col>
            <Col span={7} offset={1}>
              <FormItem
                {...formItemLayout}
                colon={false}
                label="民族："
                >
                  {getFieldDecorator('nationCode', {
                    initialValue: nation.length > 0 ? nation[0].value : ''
                  })(
                    <SpecSelect>
                    {
                      nation.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
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
                    initialValue: sex.length > 0 ? sex[0].value : ''
                  })(
                    <SpecSelect>
                    {
                      sex.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row className='height'>
            <Col span={7} >
              <FormItem
                {...formItemLayout}
                colon={false}
                label="出生日期："
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
              </FormItem>
            </Col>
            <Col span={7} offset={1}>
              <FormItem
                {...formItemLayout}
                colon={false}
                label="年龄："
                >
                  {getFieldDecorator('age', {
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
                label="婚姻状态："
                >
                  {getFieldDecorator('maritalStatus', {
                    initialValue: marry.length > 0 ? marry[0].value : ''
                  })(
                    <SpecSelect>
                    {
                      marry.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row className='height'>
            <Col span={7} >
              <FormItem
                {...formItemLayout}
                colon={false}
                label="职业："
                >
                  {getFieldDecorator('postcode', {
                    initialValue: occupation.length > 0 ? occupation[0].value : ''
                  })(
                    <SpecSelect>
                    {
                      occupation.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </FormItem>
            </Col>
            <Col span={7} offset={1}>
              <FormItem
                {...formItemLayout}
                colon={false}
                label="患者类型："
                >
                  {getFieldDecorator('patienttype', {
                    initialValue: mitype.length > 0 ? mitype[0].value : ''
                  })(
                    <SpecSelect>
                    {
                      mitype.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </FormItem>
            </Col>
            <Col span={7} offset={1}>
              <FormItem
                {...formItemLayout}
                colon={false}
                label="座机："
                >
                  {getFieldDecorator('phoneHome', {
                    initialValue: ''
                  })(
                    <SpecInput />
                  )}
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
                    <SpecSelect>
                    {
                      cardtype.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
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
            <Col span={7} offset={1}>
              <FormItem
                {...formItemLayout}
                colon={false}
                label="移动电话："
                >
                  {getFieldDecorator('mobile', {
                    initialValue: ''
                  })(
                    <SpecInput />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row className='height'>
            <Col span={7} >
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 14}}
                colon={false}
                label="住址："
                >
                  {getFieldDecorator('provinceid', {
                    initialValue: province.length > 0 ? {key: province[0].value, label: province[0].vname} : ''
                  })(
                    <SpecSelect labelInValue>
                    {
                      province.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                labelCol={{span: 0}}
                wrapperCol={{span: 22}}
                colon={false}
                >
                  {getFieldDecorator('cityid', {
                    initialValue: city.length > 0 ? {key: city[0].value, label: city[0].vname} : ''
                  })(
                    <SpecSelect labelInValue>
                    {
                      city.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </FormItem>
            </Col>
            <Col span={5} >
              <FormItem
                labelCol={{span: 1}}
                wrapperCol={{span: 22}}
                colon={false}
                label=' '
                >
                  {getFieldDecorator('areaid', {
                    initialValue: area.length > 0 ? {key: area[0].value, label: area[0].vname} : ''
                  })(
                    <SpecSelect labelInValue>
                    {
                      area.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
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
              </FormItem>
            </Col>
          </Row>
          <Row className='height'>
            <Col span={7} >
              <FormItem
                {...formItemLayout}
                colon={false}
                label="联系人："
                >
                  {getFieldDecorator('ctName', {
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
                label="与患者关系："
                >
                  {getFieldDecorator('ctRole', {
                    initialValue: pationrel.length > 0 ? pationrel[0].value : ''
                  })(
                    <SpecSelect>
                    {
                      pationrel.map((item, index)=>
                        <Option key={index} value={item.value}>{item.vname}</Option>
                      )
                    }
                    </SpecSelect>
                  )}
              </FormItem>
            </Col>
            <Col span={7} offset={1}>
              <FormItem
                {...formItemLayout}
                colon={false}
                label="联系电话："
                >
                  {getFieldDecorator('ctPhone', {
                    initialValue: ''
                  })(
                    <SpecInput />
                  )}
              </FormItem>
            </Col>
          </Row>
        </Container>
        <Footer>
          <SureButton type="primary" htmlType="submit" onClick={this.handleOK}>保存</SureButton>
          <CancelButton type="primary" onClick={()=>{this.props.onClose()}}>取消</CancelButton>
        </Footer>
      </Form>
    )
  }
}
const Container = styled.div`
  width: 839px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 50px;
  padding-bottom: 30px;
`;
const RowLine = styled(Row)`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const SpecInput = styled(Input)`
  line-height: 25px;
`;
const SpecSelect = styled(Select)`
  ${selectSty.thinArrow}
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95px;
  border-top: 1px solid #E6E6E6;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
/*
@作者：姜中希
@日期：2018-07-23
@描述：患者信息弹框form表单组件
*/
const InfoForm = Form.create()(Index);
export default InfoForm;
