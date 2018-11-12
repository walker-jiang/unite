import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Form, Col, Row, Select } from 'antd';
import selectSty from 'components/antd/style/select';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const FormItem = Form.Item;
const Option = Select.Option;

export default class DeptDoctor extends Component {
  constructor(props){
    super(props);
    this.state = {
      deptData: [],
      docData: []
    };
  };
  componentWillMount(){
    let deptData = this.getDept();
    this.setState({ deptData });
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
        deptcode: deptid ,
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
  changeDtepSelector = (e) => {
    if(e){
      let docData = this.getDocData(e.key);
      this.props.commontProps.setFieldsValue({ doctor: { key: '', label: ''} }); //
      this.setState({ docData });
    }else {
      this.setState({ docData: [] });
    }
  };
  render() {
    let { formItemLayout, getFieldDecorator, disabled } = this.props.commontProps;
    const initialValue = this.props.initialValue;
    const { deptData, docData } = this.state;
    return (
      <Row>
        <Col span={7} offset={1}>
          <FormItem
            {...formItemLayout}
            colon={false}
            label="就诊科室："
            >
            {getFieldDecorator('dept', {
              rules: [{ required: true, message: '请选择就诊科室!' }],
              initialValue: initialValue.dept
            })(
              <SpecSelect disabled={disabled} allowClear onChange={this.changeDtepSelector} labelInValue onFocus={() => { this.props.onFocus() }}>
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
              initialValue: initialValue.doctor
            })(
              <SpecSelect disabled={disabled} labelInValue allowClear onFocus={() => { this.props.onFocus() }}>
              {
                docData.map(item => <Option key={item.orgUserid} value={item.orgUserid}>{item.realname}</Option>)
              }
              </SpecSelect>
            )}
          </FormItem>
        </Col>
      </Row>
    )
  }
}
const SpecSelect = styled(Select)`
  ${selectSty.thinArrow};
  &&& {
    font-size: 12px;
  }
`;
/*
@作者：姜中希
@日期：2018-11-1
@描述：患者信息科室医生联动组件
*/
