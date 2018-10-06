import React, { Component } from 'react';
import styled from 'styled-components';
import { Form } from 'antd';
import Diagnose from '../chHerbalMedicine/herbalForm/diagnose';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';
import { getDiagnoseText } from 'commonFunc/transform';

const FormItem = Form.Item;

class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
      buDiagnosisInfo: {}, // 诊断主信息对象
      // 初始化数据
      buDiagnosisList: [], // 诊断明细信息
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /** [getDiagnoseData 组件初始化获取加载诊断数据] */
  getDiagnoseData(){
    let self = this;
    let params = {
      url: 'BuDiagnosisInfoController/getData',
      data: {
        registerid: window.registerID
      },
    };
    function callBack(res){
      if(res.result && res.data){ // 获取当前诊断明细数据
        let { buDiagnosisList, ...buDiagnosisInfo } = res.data;
        self.setState({
          buDiagnosisList: buDiagnosisList,
          buDiagnosisInfo: buDiagnosisInfo
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  componentWillMount(){
    this.getDiagnoseData();
  };
  /** [handleSubmit 提交表单数据] */
  handleSubmit(formValue){
    let buDiagnosisInfo = this.state.buDiagnosisInfo;
    buDiagnosisInfo.buDiagnosisList = formValue.originData;
    let params = {
      url: 'BuDiagnosisInfoController/postData',
      type: 'POST',
      data: JSON.stringify(buDiagnosisInfo)
    }
    let that = this;
    function success(res) {
      that.getDiagnoseData();
      that.props.diagnoseUpdate(formValue.extractionData)
    };
    ajaxGetResource(params, success);
  }
  render () {
    let { buDiagnosisList } = this.state;
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    let { diagnose = '' } = getFieldsValue();

    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 21 },
        sm: { span: 21 },
      },
      className: 'height',
      colon: false
    };
    return (
      <SpecForm className='not-draggable'>
          <FormItem
            {...formItemLayout}
            label="诊断：">
          {getFieldDecorator('diagnose', {
            initialValue: {originData: buDiagnosisList, extractionData: getDiagnoseText(buDiagnosisList)}
          })(
            <Diagnose onChange={this.handleSubmit}/>
          )}
          </FormItem>
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </SpecForm>
    )
  }
}
const SpecForm = styled(Form)`
  flex-grow: 1;
  .ant-row {
    margin-top: -10px;
    margin-left: -10px;
  }
`;
const ChPatentMedicineForm = Form.create()(Index);
export default ChPatentMedicineForm;
/*
@作者：姜中希
@日期：2018-08-28
@描述：独立的诊断表单组件
*/
