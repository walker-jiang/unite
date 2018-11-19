import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Form, Col, Row, Select } from 'antd';
import Input from 'components/dr/input/basicInput';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import selectSty from 'components/antd/style/select';

const FormItem = Form.Item;
const Option = Select.Option;

export default class Province extends Component {
  constructor(props){
    super(props);
    this.state = {
      province: [], // 省数据
      city: [], // 城市数据
      district: [], //县数据
    };
  };
  componentWillMount(){
    // 初始化只加载省份数据
    let province = this.getProvinceData();
    this.setState({ province });
  };
  componentWillReceiveProps(nextProps){
    if(typeof(nextProps.initialValue.province) == 'object' && JSON.stringify(nextProps.initialValue.province) != JSON.stringify(this.props.initialValue.province)){
      let city = this.getCityData(nextProps.initialValue.province.key);
      this.setState({ city });
    }
  };
  shouldComponentUpdate(props,state){
    if(props.commontProps.getFieldValue('province') && props.commontProps.getFieldValue('province').istouched){ // 通过setFieldsValue触发并且加上改字段
      props.commontProps.setFieldsValue({
        province: props.commontProps.getFieldValue('province').value
      })
    }
    if(props.commontProps.getFieldValue('city') && props.commontProps.getFieldValue('city').istouched){
      props.commontProps.setFieldsValue({
        city: props.commontProps.getFieldValue('city').value
      })
      let city = this.getCityData(props.commontProps.getFieldValue('province').key);
      this.setState({ city });
    }
    if(props.commontProps.getFieldValue('district') && props.commontProps.getFieldValue('district').istouched){
      props.commontProps.setFieldsValue({
        district: props.commontProps.getFieldValue('district').value
      })
      let district = this.getDistrictData(props.commontProps.getFieldValue('city').key);
      this.setState({ district });
    }
    return true;
  };
  /** [getProvinceData 获取省级区划数据] */
  getProvinceData(){
    let self = this;
    let province = [];
    let params = {
      url: 'BaAreaController/getLevelArea',
      async: false,
      data: {
        level:1
      },
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
      url: 'BaAreaController/getLevelArea',
      async: false,
      data: {
        areacode: provinceId,
        level: 2
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
      url: 'BaAreaController/getLevelArea',
      async: false,
      data: {
        areacode: cityId,
        level: 3
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
  /**
   * [changeProvinceSelector 改变省级行政区划的监听函数]
   * @param  {[type]} e [当前省级对象]
   * @return {[type]}   [undefined]
   */
  changeProvinceSelector = (e) => {
    if(e){
      let city = this.getCityData(e.key);
      this.props.commontProps.setFieldsValue({
        city: {key: '', value: ''},
        district: {key: '', value: ''}
      })
      this.setState({ city, district: [] });
    }else{
      this.setState({ city: [], district: [] });
    }
  };
  /**
   * [changeCitySelector 改变市级行政区划的监听函数]
   * @param  {[type]} e [当前市级对象]
   * @return {[type]}   [undefined]
   */
  changeCitySelector = (e) => {
    if(e){
      let district = this.getDistrictData(e.key);
      this.props.commontProps.setFieldsValue({
        district: {key: '', value: ''}
      })
      this.setState({ district });
    }else{
      this.setState({ district: [] });
    }
  };
  render() {
    let { formItemLayout, getFieldDecorator, disabled } = this.props.commontProps;
    const initialValue = this.props.initialValue;
    let { province, city, district } = this.state;
    return (
      <Row>
        <Col span={8} >
          <SpecFormItem
            labelCol={{span: 8}}
            wrapperCol={{span: 15}}
            colon={false}
            label="住址："
            >
              {getFieldDecorator('province', {
                initialValue: initialValue.province,
              })(
                <SpecSelect labelInValue allowClear onChange={this.changeProvinceSelector} disabled={disabled} onFocus={() => { this.props.onFocus() }}>
                {
                  province.map((item, index)=>
                    <Option key={index} value={item.areacode}>{item.areaname}</Option>
                  )
                }
                </SpecSelect>
              )}
          </SpecFormItem>
        </Col>
        <Col span={4}>
          <SpecFormItem
            labelCol={{span: 2}}
            wrapperCol={{span: 22}}
            label=' '
            colon={false}
            >
              {getFieldDecorator('city', {
                initialValue: initialValue.city
              })(
                <SpecSelect labelInValue allowClear onChange={this.changeCitySelector} disabled={disabled} onFocus={() => { this.props.onFocus() }}>
                {
                  city.map((item, index)=>
                    <Option key={index} value={item.areacode}>{item.areaname}</Option>
                  )
                }
                </SpecSelect>
              )}
          </SpecFormItem>
        </Col>
        <Col span={4} >
          <SpecFormItem
            labelCol={{span: 2}}
            wrapperCol={{span: 22}}
            colon={false}
            label=' '
            >
              {getFieldDecorator('district', {
                initialValue: initialValue.district
              })(
                <SpecSelect labelInValue allowClear disabled={disabled} onFocus={() => { this.props.onFocus() }}>
                {
                  district.map((item, index)=>
                    <Option key={index} value={item.areacode}>{item.areaname}</Option>
                  )
                }
                </SpecSelect>
              )}
          </SpecFormItem>
        </Col>
        <Col span={8}>
          <SpecFormItem
            labelCol={{span: 2}}
            wrapperCol={{span: 22}}
            colon={false}
            label=" "
            >
              {getFieldDecorator('streetdesc', {
                initialValue: initialValue.streetdesc
              })(
                <SpecInput disabled={disabled} holderplace='请输入详细地址（到门牌号）'/>
              )}
          </SpecFormItem>
        </Col>
      </Row>

    )
  }
}
const SpecFormItem = styled(FormItem)`
  &&& {
    margin-bottom: 8px;
  }
`;
const SpecSelect = styled(Select)`
  ${selectSty.thinArrow};
  &&& {
    font-size: 12px;
  }
`;
const SpecInput = styled(Input)`
  line-height: 25px;
`;
/*
@作者：姜中希
@日期：2018-10-31
@描述：患者信息省市县联动-省份
*/
