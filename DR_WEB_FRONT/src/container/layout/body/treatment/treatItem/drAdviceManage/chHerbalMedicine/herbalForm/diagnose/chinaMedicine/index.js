import React, {Component} from 'react';
import styled from 'styled-components';
import AddIllBySymptom from './addIllBySymptom';
import AddIllByManifestations from './addIllByManifestations';

export default class ChinaMedicine extends Component {
  constructor(props){
    super(props);
    this.state = {
      symptomId:
    };
    this.enterEvent = this.enterEvent.bind(this);
    this.getMessage = this.getMessage.bind(this);
  };
  /** [getMessage 病症选择后需要通知病侯组件查所选病症下的病侯] */
  getMessage(symptomId){
    this.setState({symptomId});
  };
  enterEvent(value, type){
    if(value.trim() != ''){
      if(type == 'symptom'){
        document.getElementById('manifestations').focus(); // 焦点切换到病候
      }else if(type == 'manifestations'){
        document.getElementById('symptom').focus(); // 焦点切换到病候
        this.addChinaMedicineData();
        this.addIllBySymptom.clearInputValue();
        this.addIllByManifestation.clearInputValue();
      }else if(type == 'diagnose'){
        this.addWestMedicineData();
        this.addIllByDiagnose.clearInputValue();
      }
    }else{
      if(type == 'symptom'){
        if(this.state.diagnoseFinalInfo.length){
          let self = this;
          confirm({
            title: '确定保存诊断数据（并同步到患者病历）?',
            cancelText: '取消',
            okText: '保存',
            onOk() {
              self.save();
            },
            onCancel() {

            },
          });
        }else{
          this.tipModal.showModal({ stressContent: '未添加诊断不能提交' });
        }
      }else if(type == 'manifestations'){
        document.getElementById('symptom').focus(); // 焦点切换到疾病
        this.addChinaMedicineData();
        this.addIllBySymptom.clearInputValue();
        this.addIllByManifestation.clearInputValue();
      }else if(type == 'diagnose'){
        if(this.state.diagnoseFinalInfo.length){
          let self = this;
          confirm({
            title: '确定即将保存诊断数据?',
            cancelText: '取消',
            okText: '保存',
            onOk() {
              self.save();
            },
            onCancel() {

            },
          });
        }else{
          this.tipModal.showModal({ stressContent: '未添加诊断不能提交' });
        }
        // this.addWestMedicineData();
      }
    }
  };
  render() {
    return (
      <Container >
        <AddIllBySymptom enterEvent={this.enterEvent} autofocus='autofocus' id='symptom'  ref={ref => this.addIllBySymptom = ref} placeholder='请输入病症中文关键字或拼音简写搜索' notify={this.getMessage}/>
        <AddIllByManifestations enterEvent={this.enterEvent} id='manifestations' ref={ref => this.addIllByManifestation = ref} placeholder='请输入病侯中文关键字或拼音简写搜索' symptomId={symptomId}/>
        <span>
          <Button type="primary" shape="circle" onClick={() => { this.enterEvent('', 'manifestations') }} icon="plus"></Button>
        </span>
      </Container>
    );
  }
}
const Container = styled.div`
  margin-top: 2px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  color: white;
  margin-bottom: 5px;
  padding: 0px 15px;
`;
/*
@作者：姜中希
@日期：2018-07-09
@描述：嘱托组件，包含文本编辑框
*/
