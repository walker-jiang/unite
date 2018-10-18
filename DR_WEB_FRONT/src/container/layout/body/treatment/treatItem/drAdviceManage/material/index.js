import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import BasicModal from 'components/dr/modal/basicModal';
import MaterialForm from './materialForm';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';
import buttonSty from 'components/antd/style/button';
import { convertAddFormData, convertModifyFormData } from 'commonFunc/transform';

export default class Index extends Component {
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
    let  { formData, MaterialData } =  this.form.handleSubmit(e);
    if(formData.diagnose.originData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '诊断数据不能空'
      });
      return;
    }
    if( MaterialData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '材料数据不能空'
      });
      return;
    }
    if(this.props.actionType == 'add'){
      this.addMaterialItem(formData, MaterialData);
      // console.log('formData, MaterialData', formData, MaterialData);
    }else{
      this.modifyMaterialItem(formData, MaterialData)
    }
  };
  addMaterialItem(values, MaterialData){
    let paramsData = convertAddFormData(values, MaterialData);
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
  modifyMaterialItem(values, MaterialData){
    let data = convertModifyFormData(values, MaterialData, this.form.state.data, this.form.state.buDiagnosisInfo, this.form.state.buOrdmedical);
    let params = {
      url: 'BuOrderController/putData',
      type: 'put',
      data: JSON.stringify(data)
    }
    let that = this;
    function success(res) {
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
      <BasicModal visible={visiblePop} title={title + '材料单'} onClose={() => this.handlePopClose()}>
        <Wrap>
          <MaterialForm {...this.props} wrappedComponentRef={ref => {this.form = ref}}></MaterialForm>
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
@日期：2018-08-23
@描述：材料新增、修改、查看部分
*/
