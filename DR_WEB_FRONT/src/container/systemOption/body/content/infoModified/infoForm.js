import React, {Component} from 'react'; // react核心
import styled from 'styled-components';
import { Input, Row, Col, Form, Button } from 'antd';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const FormItem = Form.Item;
class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      dept: [], // 科室数据
      duty: [], //职务登记数据
    };
  };
  /** [handleSubmit form表单提交触发的] */
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
            self.props.onOK(res.data.patientid, res.data.registerid, res.data.patientname);
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
    let dept = [{
      code: '1',
      value: '消化科'
    }];
    let duty = [{
      code: '1',
      value: '演员'
    }];
    this.setState({ dept, duty });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    let { dept, duty } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
     };
    return (
      <Form onSubmit={this.handleSubmit} className='not-draggable'>
        <Row>
          <Col span={20}>
            <SpecFormItem
              {...formItemLayout}
              colon={false}
              label="用户号："
              >
              {getFieldDecorator('careCardno', {
                initialValue: ''
              })(
                <SpecInput/>
              )}
            </SpecFormItem>
            <SpecFormItem
              {...formItemLayout}
              colon={false}
              label=" 真实姓名 ：*"
              >
              {getFieldDecorator('careCardno', {
                initialValue: ''
              })(
                <SpecInput/>
              )}
            </SpecFormItem>
          </Col>
        </Row>
        <Footer>
          <SureButton type="primary" htmlType="submit" onClick={this.handleOK}>保存</SureButton>
          <CancelButton type="primary" onClick={()=>{this.props.onClose()}}>取消</CancelButton>
        </Footer>
      </Form>
    )
  }
}
const Container = styled.div`
  width: 520px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
  font-size: 14px;
`;
const RowLine = styled(Row)`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95px;
  border-top: 1px solid #E6E6E6;
`;
const SpecFormItem = styled(FormItem)`
  & > .ant-form-item-label > label{
    font-size: 14px;
    color: #333333;
  }
`;
const SpecInput = styled(Input)`
  border-radius: 0px;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
/*
@作者：姜中希
@日期：2018-07-29
@描述：个人信息编辑表单
*/
const InfoForm = Form.create()(Index);
export default InfoForm;
