import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import BasicModal from 'components/dr/modal/basicModal';
import ExamineForm from './examineForm';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import { convertAddFormData, convertModifyFormData } from 'commonFunc/transform';
import TipModal from 'components/dr/modal/tip';

export default class examineForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visiblePop: false,  // 控制弹框显示隐藏
    }
    this.saveForm = this.saveForm.bind(this);
  }
  // 弹框显示
  handlePopOpen () {
    this.setState({ visiblePop: true });
  };
  // 弹框关闭
  handlePopClose () {
    this.setState({ visiblePop: false });
  };
  saveForm(e){
    let  { formData, examineData } =  this.form.handleSubmit(e);
    if(formData.diagnose.originData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '诊断数据不能空'
      });
      return;
    }
    if( examineData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '检验数据不能空'
      });
      return;
    }
    if(this.props.actionType == 'add'){
      this.addExamineItem(formData, examineData);
    }else{
      this.modifyExamineItem(formData, examineData)
    }
  };
  addExamineItem(values, examineData){
    let paramsData = convertAddFormData(values, examineData, 1);
    let params = {
      url: 'BuOrderController/postData',
      type: 'post',
      data: JSON.stringify(paramsData)
    }
    let that = this;
    function success(res) {
      that.handlePopClose();
      that.props.reloadList();
    };
    ajaxGetResource(params, success);
  };
  modifyExamineItem(values, examineData){
    let data = convertModifyFormData(values, examineData, this.form.state.data, this.form.state.buDiagnosisInfo, this.form.state.buOrdmedical);
    let params = {
      url: 'BuOrderController/putData',
      type: 'put',
      data: JSON.stringify(data)
    }
    let that = this;
    function success(res) {
      console.log('保存成功')
      that.handlePopClose();
      that.props.reloadList();
    };
    ajaxGetResource(params, success);
  };
  render () {
    let { visiblePop } = this.state;
    let { actionType } = this.props;
    let title = actionType == 'add' ? '新增' : (actionType == 'modify' ? '修改' : '查看');
    return (
        <BasicModal visible={visiblePop} title={title + '检验单'} onClose={() => this.handlePopClose()}>
          <Wrap>
            <ExamineForm {...this.props} wrappedComponentRef={ref => {this.form = ref}}></ExamineForm>
            {
              actionType == 'view' ? null :
              <Footer>
                <SureButton type="primary" onClick={this.saveForm} disabled={!window.modifyPermission}>保存</SureButton>
                <CancelButton type="primary" onClick={this.handlePopClose.bind(this)}>取消</CancelButton>
              </Footer>
            }
          </Wrap>
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        </BasicModal>
    )
  }
}

const Wrap = styled.div`
  width: 857px;
  height: 548px;
  overflow: hidden;
  padding: 10px
`;
const Footer = styled.div`
  width: 837px;
  position: absolute;
  height: 56px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
/*
@作者：姜中希
@日期：2018-08-21
@描述：检验新增、修改、查看部分
*/
