import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import BasicModal from 'components/dr/modal/basicModal';
import SuitTechForm from './suitTechForm';
import buttonSty from 'components/antd/style/button';
import TipModal from 'components/dr/modal/tip';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import { combinedAddFormData, combinedModifyFormData } from 'commonFunc/transform';

export default class SuitTechnology extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePop: false,  // 控制弹框显示隐藏
      initData: '', //是否初始化数据、修改查看需要，其余不需要
      //baHerbalMedicines: [],//辨证论治-中草药
    };
    this.submit = this.submit.bind(this);
  }
  // 弹框显示
  handlePopOpen () {
    // // 数据初始化
    let that = this;
    if(that.props.actionType == 'add'){
      that.setState({
        visiblePop: true,
        initData: false
      });
    }else{
      that.setState({
        visiblePop: true,
        initData: true
      });
    }
  };
  // 弹框关闭
  handlePopClose () {
    this.setState({ visiblePop: false });
  };
  // 点击确定按钮触发提交操作
  submit(e){
    let { formData, suitTechData } = this.form.handleSubmit(e); /// 获取表单数据、草药数据集
    if(formData.diagnose.originData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '诊断数据不能空'
      });
      return;
    }
    if( suitTechData.length <= 0 ){
      this.tipModal.showModal({
        stressContent: '适宜技术数据不能空'
      });
      return;
    }
    if(this.props.actionType == 'add'){
      this.addSuitTechData(formData, suitTechData);
    }else{ // 修改保存
      this.modifySuitTechData(formData, suitTechData);
    }
  };
  addSuitTechData(values, suitTechData){
    let paramsData = combinedAddFormData(values, suitTechData, 5);
      let params = {
        url: 'BuOrderController/postData',
        type: 'post',
        data: JSON.stringify(paramsData)
      }
      if(this.props.syndrome){ // 辨证论治添加处方
        params.server_url = config_InteLigenTreat_url+'TCMAE/';
      }
      let that = this;
      function success(res) {
        that.handlePopClose();
        that.props.reloadList();
      };
      ajaxGetResource(params, success);
  };
  modifySuitTechData(values, suitTechData){
    let data = combinedModifyFormData(values, suitTechData, this.form.state.data, this.form.state.buDiagnosisInfo, this.form.state.buOrdmedical);
    let params = {
      url: 'BuOrderController/putData',
      type: 'put',
      data: JSON.stringify(data)
    }
    if(this.props.syndrome){ // 辨证论治添加处方
      params.server_url = config_InteLigenTreat_url+'TCMAE/';
    }
    let that = this;
    function success(res) {
      that.handlePopClose();
      that.props.reloadList();
    };
    ajaxGetResource(params, success);
  };
  render () {
    let { visiblePop , initData } = this.state;
    let { actionType } = this.props;
    let title = actionType == 'add' ? '新增' : (actionType == 'modify' ? '修改' : '查看');
    return (
      <SpecBasicModal visible={visiblePop} title={title + '适宜技术治疗单'} onClose={() => this.handlePopClose()}>
        <Wrap>
          <SuitTechForm
            wrappedComponentRef={ref => {this.form = ref}}
            initData={initData}
            {...this.props}>
          </SuitTechForm>
          {
            this.props.actionType == 'view' ? null :
            <Footer>
              <SureButton type="primary" onClick={this.submit} disabled={!window.modifyPermission}>保存</SureButton>
              <Gray type="primary" onClick={()=>{this.handlePopClose()}}>取消</Gray>
            </Footer>
          }
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        </Wrap>
      </SpecBasicModal>
    )
  }
}
const Wrap = styled.div`
  width: 857px;
  height: 548px;
  overflow: hidden;
  padding: 10px
`;
const SpecBasicModal = styled(BasicModal)`
  color: #000000;
  background: rgba(253, 252, 247, 1);
  font-family: 'YaHei Consolas Hybrid';
  & > div{
    padding: 0px 20px;
  }
  .header {
    height: 55px;
  }
`;
const Footer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0px;
  margin-top: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SureButton = styled(Button)`
  background-color: rgb(178, 20, 20) !important;
  ${buttonSty.semicircle}
`;
const Gray = styled(Button)`
  color: rgb(178, 20, 20) !important;
  ${buttonSty.gray}
`;
/*
@作者：姜中希
@日期：2018-10-22
@描述：新增中适宜技术部分
*/
