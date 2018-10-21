import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import BasicModal from 'components/dr/modal/basicModal';
import AcupointForm from './acupointForm';
import buttonSty from 'components/antd/style/button';
import TipModal from 'components/dr/modal/tip';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class Index extends Component {
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
    let formData = this.form.handleSubmit(e); /// 获取表单数据、草药数据集
    this.props.modifyHerbal(formData);
    this.handlePopClose();
  };
  render () {
    let { visiblePop , initData } = this.state;
    let { actionType } = this.props;
    let title = actionType == 'add' ? '新增' : (actionType == 'modify' ? '修改' : '查看');
    return (
      <SpecBasicModal visible={visiblePop} onClose={() => this.handlePopClose()}>
        <AcupointForm
          wrappedComponentRef={ref => {this.form = ref}}
          initData={initData}
          {...this.props}>
        </AcupointForm>
        {
          this.props.actionType == 'view' ? null :
          <Footer>
            <SureButton type="primary" onClick={this.submit} disabled={!window.modifyPermission}>保存</SureButton>
            <Gray type="primary" onClick={()=>{this.handlePopClose()}}>返回</Gray>
          </Footer>
        }
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </SpecBasicModal>
    )
  }
}
const SpecBasicModal = styled(BasicModal)`
  color: rgb(178, 20, 20);
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
  width: 50%;
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
@作者：马晓敏
@日期：2018-06-29
@描述：新增中草药处方部分
*/
