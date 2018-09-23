import React, {Component} from 'react';
import styled from 'styled-components';
import { Button, Table, Radio, Checkbox, } from 'antd';
import AddIllBySymptom from './addIllBySymptom';
import AddIllByManifestations from './addIllByManifestations';
import AddIllByDiagnose from './addIllByDiagnose';
import InputEnterPop from 'components/dr/input/enterPopInput';
import Pagination_dia from 'components/antd/components/pagination';
import deepClone from 'commonFunc/deepClone';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';
import buttonSty from 'components/antd/style/button';
import { getDiagnoseText, getDiagnoseDataSource } from 'commonFunc/transform';
import tableSty from 'components/antd/style/table';
import paginationSty from 'components/antd/style/pagination';

const Pagination_his = deepClone(Pagination_dia);
const RadioGroup = Radio.Group;
export default class Diagnose extends Component {
  constructor(props){
    super(props);
    this.state = {
      curTab: 0, // 当前标签页
      diagnoseHisData: [], //诊断历史表格数据
      diagnoseHisOriginData: [], //诊断历史原始数据
      diagnoseFinalInfo: [], // 诊断最终合成数据（传给后台服务的对象）
      diagnoseData: [], //诊断数据
      symptomId: '', // 病症ID
      repeatDiagnose: 1, // 初步诊断还是确认诊断， 默认是初步诊断
      mainDiagnose: false, //主诊断
      doubleDiagnose: false, //疑似诊断
      diaCurPage: 1, // 诊断数据表格当前页
      hisCurPage: 1, // 历史数据表格当前页
    }
    this.initialData = this.initialData.bind(this);
    this.hideFloatLayer = this.hideFloatLayer.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.addChinaMedicineData = this.addChinaMedicineData.bind(this);
    this.addWestMedicineData = this.addWestMedicineData.bind(this);
    this.onMainDiagnoseChange = this.onMainDiagnoseChange.bind(this);
    this.onDoubleDiagnoseChange = this.onDoubleDiagnoseChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    let diagnoseFinalInfo = nextProps.value.originData;// 先获取该用户的诊断明细数组
    this.setState({ diagnoseFinalInfo });
  };
  /** [initialData 组件加载获取历史诊断数据] */
  initialData(){
    let self = this;
    let params = {
      url: 'BuDiagnosisInfoController/getList',
      data: {
        cardno: window.cardno
      },
    };
    function callBack(res){
      if(res.result){
        let diagnoseHisOriginData = res.data.records[0].buDiagnosisList;
        diagnoseHisOriginData.forEach((item) => {
          item.doctorname = res.data.records[0].doctorname;
        });
        self.setState({
          diagnoseHisOriginData: diagnoseHisOriginData
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getTableCol 获取诊断和历史诊断的表格项] */
  getTableCol(){
    const columns = [{
      title: '序号',
      dataIndex: 'order',
      align: 'center',
      key: 'order',
    }, {
      title: '诊断码',
      dataIndex: 'diagnosisCode',
      align: 'center',
      key: 'diagnosisCode',
    }, {
      title: '诊断内容',
      dataIndex: 'diagnosisName',
      key: 'diagnosisName',
    }, {
      title: '诊断分类',
      dataIndex: 'diagnosisWay',
      align: 'center',
      key: 'diagnosisWay',
      render:(text, record, index)=> (text=='0')?'西医':'中医'
    }, {
      title: '诊断类别',
      align: 'center',
      dataIndex: 'diagnosisType',
      key: 'diagnosisType',
      render:(text, record, index)=> text == '1' ? '初步诊断' : (text == 2 ? '最终诊断' : '-')
    }, {
      title: '主诊断',
      dataIndex: 'mainDiaTypeDic',
      align: 'center',
      key: 'mainDiaTypeDic',
    }, {
      title: '疑似诊断',
      dataIndex: 'doubtDiaTypeDic',
      align: 'center',
      key: 'doubtDiaTypeDic',
    }, {
      title: '诊断医生',
      align: 'center',
      dataIndex: 'doctorname',
      key: 'doctorname',
    }, {
      title: '操作',
      align: 'operate',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record, index)=><a onClick={(e)=>this.delDiagnose(record)}>删除</a>
    }];
    return columns;
  };
  /**
   * [delDiagnose 通过诊断表格删除诊断信息]
   * @param  {[type]} record [当前诊断记录]
   * @return {[type]}        [void]
   */
  delDiagnose(record){
    let diagnoseFinalInfo = this.state.diagnoseFinalInfo;
    if(record.manifCode){ // 删除症候
      diagnoseFinalInfo.forEach((item) => {
        if(item.diagnosisCode == record.manifCode){
          item.buDiagnosisDismainfList = item.buDiagnosisDismainfList.remove({'manifcode': record.diagnosisCode});
          if(item.buDiagnosisDismainfList.length == 0){ // 删除最后一个症候，该疾病也被删除
            diagnoseFinalInfo = diagnoseFinalInfo.remove({diagnosisCode: record.manifCode});
          }
        }
      });
    }else{
      // console.log('疾病', record.manifCode);
      // console.log('疾病diagnoseFinalInfo', diagnoseFinalInfo);
      diagnoseFinalInfo = diagnoseFinalInfo.remove({diagnosisCode: record.diagnosisCode});
    }
    this.setState({ diagnoseFinalInfo });
  };
  /** [toggleTabs 中西医tab切换函数] */
  toggleTabs(key) {
    this.setState({
      curTab: key,
    });
  }
  /** [hideFloatLayer 点击诊断的某些部分触发子组件浮层隐藏事件] */
  hideFloatLayer(){
    if(this.addIllBySymptom){
      this.addIllBySymptom.hideResult();
      this.setState({symptomId: ''}); // 重置病症ID
    }
    if(this.addIllByManifestation){
      this.addIllByManifestation.hideResult();
    }
    if(this.addIllByDiagnose){
      this.addIllByDiagnose.hideResult();
    }
  };
  /** [getMessage 病症选择后需要通知病侯组件查所选病症下的病侯] */
  getMessage(symptomId){
    this.setState({symptomId});
  };
  /** [addChinaMedicineData 添加中医病症病侯信息到诊断表中] */
  addChinaMedicineData(e){
    let diagnoseFinalInfo = this.state.diagnoseFinalInfo;
    let symptom = this.addIllBySymptom.getSelectedData(); // 获取疾病信息
    let manifestation = this.addIllByManifestation.getSelectedData(); // 获取症候信息

    if('diseaseid' in symptom){
      let exist = diagnoseFinalInfo.some((item) => {
        if(item.diagnosisCode == symptom.discode){ // 存在该疾病
          // console.log('存在该疾病');
          manifestation.forEach((itemManifest) => {
            let exist = item.buDiagnosisDismainfList.some((itemChild) => itemChild.manifcode == itemManifest.manifcode);
            // console.log('症候是否存在', exist);
            if(exist){
              this.tipModal.showModal({ stressContent: '该症候已存在' });
              console.log('症候',itemManifest.manifname,'已存在');
            }else{
              item.buDiagnosisDismainfList.push(itemManifest);
            }
          });
          return true;
        }
      });
      if(!exist){ // 最终诊断对象中不存在该疾病
        // console.log('不存在该疾病');
        let item = deepClone(symptom);
        symptom.buDiagnosisDismainfList = manifestation;
        symptom.diagnosisName = symptom.disname;
        symptom.diagnosisCode = symptom.discode;
        symptom.diaid = '';
        symptom.diagnosisWay = 1;
        diagnoseFinalInfo.push(symptom);
      }
    }else{ // 疾病不能为空
      this.tipModal.showModal({ stressContent: '疾病不能为空' });
      return ;
    }
    // this.addIllBySymptom.hideResult(); // 隐藏病症弹框
    this.addIllByManifestation.hideResult(); // 隐藏病侯弹框
    this.setState({ diagnoseFinalInfo });
  };
  // 历史诊断双击选择
  SelectedLine(record){
    let {diagnoseHisOriginData, diagnoseFinalInfo} = this.state;
    if(record.manifCode){ // 有症候
      console.log('// 有症候',diagnoseHisOriginData );
      diagnoseHisOriginData.forEach((item) => {
        if(item.diagnosisCode == record.manifCode){ // 疾病匹配
          console.log('// 疾病匹配');
          item.buDiagnosisDismainfList.forEach((itemChild) => {
            if(itemChild.manifcode == record.diagnosisCode){ // 症候匹配
              console.log('症候匹配');
              let result = diagnoseFinalInfo.some((finalItem) => {
                if(finalItem.diagnosisCode ==  record.manifCode){ // 当前诊断中已存在该疾病，则加入到该疾病的症候数组中
                  let exist = finalItem.buDiagnosisDismainfList.some((finalItemChild) => finalItemChild.manifcode == itemChild.manifcode);
                  if(exist){
                    this.tipModal.showModal({ stressContent: '该疾病病候已存在' });
                  }else{
                    finalItem.buDiagnosisDismainfList.push(itemChild);
                  }
                  return true;
                }
              });
              if(!result){ // 当前诊断中不存在该疾病
                item.buDiagnosisDismainfList = [];
                item.buDiagnosisDismainfList.push(itemChild);
                diagnoseFinalInfo.push(item);
              }
            }
          });
        }else{
          console.log('匹配失败，历史诊断表格数据问题');
        }
      });
    }else{
      diagnoseHisOriginData.forEach((item) => {
        if(item.diagnosisCode == record.diagnosisCode){ // 疾病匹配
          let result = diagnoseFinalInfo.some((itemFinal) => itemFinal.diagnosisCode == item.diagnosisCode);
          if(result){
            this.tipModal.showModal({ stressContent: '该疾病已存在' });
          }else{
            diagnoseFinalInfo.push(item);
          }
        }
      });
    }
    this.setState({ diagnoseFinalInfo });
  };
  /** [onMainDiagnoseChange 是否确认复选框状态改变] */
  onMainDiagnoseChange(e){
    this.setState({
      mainDiagnose: e.target.checked
    });
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  /** [onDoubleDiagnoseChange 怀疑诊断复选框状态改变] */
  onDoubleDiagnoseChange(e){
    this.setState({
      doubleDiagnose: e.target.checked
    });
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  /** [onMainDiagnoseChange 主诊断单选按钮状态改变] */
  changediagnoseType(e){
    this.setState({
      repeatDiagnose: e.target.value
    });
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  /** [addWestMedicineData 添加西医诊断] */
  addWestMedicineData(e){
    let { repeatDiagnose, mainDiagnose, doubleDiagnose } = this.state;
    let addIllByDiagnose = this.addIllByDiagnose.getSelectedData();
    //诊断信息
    let diagnoseFinalInfo = this.state.diagnoseFinalInfo;
    console.log('diagnoseFinalInfo', diagnoseFinalInfo);
    let result = diagnoseFinalInfo.some((item) => item.diagnosisCode == addIllByDiagnose.diacode);
    if(result){
      this.tipModal.showModal({ stressContent: '该疾病已存在' });
    }else{
      addIllByDiagnose.buDiagnosisDismainfList = [];
      addIllByDiagnose.diagnosisName = addIllByDiagnose.dianame;
      addIllByDiagnose.diagnosisCode = addIllByDiagnose.diacode;
      addIllByDiagnose.diagnosisWay = 0;
      addIllByDiagnose.diagnosisType = repeatDiagnose;
      addIllByDiagnose.mainDiaType = mainDiagnose ? '01' : '02';
      addIllByDiagnose.doubtDiaType = doubleDiagnose  ? '01' : '02';

      diagnoseFinalInfo.push(addIllByDiagnose);
      this.setState({ diagnoseFinalInfo });
    }
  };
  /** [save 从诊断数据对象提取要展示的文本然后将对象和文本都赋值给输入框] */
  save(diagnoseFinalInfo){
    let text = getDiagnoseText(diagnoseFinalInfo);
    console.log('diagnoseFinalInfo', diagnoseFinalInfo);
    let formValue = {
      originData: diagnoseFinalInfo,
      extractionData: text
    };
    this.props.onChange(formValue); // 给输入框赋值，包含两部分，一部分是需要传往后台的对象，一部分是在输入框上显示的文本
    this.inputEnterPop.handleClose(); // 关闭弹窗
  };
  onChange(page, pageSize){
    console.log(page);
  };
  render() {
    let formItemProps = this.props;
    let { curTab, symptomId, diagnoseHisOriginData, diagnoseFinalInfo, repeatDiagnose, mainDiagnose, doubleDiagnose, diaCurPage, hisCurPage} = this.state;
    let diagnoseHisData =getDiagnoseDataSource(diagnoseHisOriginData, 'his'); // 历史诊断表格数据
    let diagnoseData = getDiagnoseDataSource(diagnoseFinalInfo, 'now'); // 当前诊断表格数据
    let columns = this.getTableCol();
    Pagination_dia.total = diagnoseData.length;
    Pagination_dia.current = diaCurPage;
    Pagination_dia.onChange = (page, pageSize)=>{
      this.setState({ diaCurPage: page});
    }
    Pagination_his.total = diagnoseHisData.length;
    Pagination_his.current = hisCurPage;
    Pagination_his.onChange = (page, pageSize)=>{
      this.setState({ hisCurPage: page});
    }
    return (
      <InputEnterPop displayed = {this.initialData} formItemProps={formItemProps} ref={ref=>this.inputEnterPop = ref} title='诊断' icon='#C14342' importability={false}>
        <Container onClick={this.hideFloatLayer}>
          <Tab>
            <TabItem current={curTab} index={0} onClick={()=>{this.toggleTabs(0)}}>✍️中医诊断</TabItem>
            <TabItem current={curTab} index={1} onClick={()=>{this.toggleTabs(1)}}>📿西医诊断</TabItem>
          </Tab>
          <Content>
          {
            (curTab == 0)?
            <ChinaMedicine >
              <AddIllBySymptom  icon='#0A6ECB' ref={ref => this.addIllBySymptom = ref} placeholder='请输入病症中文关键字活拼音简写搜索' notify={this.getMessage}/>
              <AddIllByManifestations addChinaMedicineData={this.addChinaMedicineData} icon='#0A6ECB' ref={ref => this.addIllByManifestation = ref} placeholder='请输入病侯中文关键字货拼音简写搜索' symptomId={symptomId}/>
              <span>
                <Button type="primary" shape="circle" onClick={this.addChinaMedicineData} icon="plus"></Button>
              </span>
            </ChinaMedicine>
            :
            <WestMedicine>
              <SpecRadioGroup value={repeatDiagnose} onChange={(e)=>{this.changediagnoseType(e)}}>
                <Radio value={1}>初步诊断</Radio>
                <Radio value={2}>确认诊断</Radio>
              </SpecRadioGroup>
              <Check_box >
                <Checkbox checked={mainDiagnose} className='small' onChange={this.onMainDiagnoseChange}>主诊断</Checkbox>
                <Checkbox checked={doubleDiagnose} className='small' onChange={this.onDoubleDiagnoseChange}>疑似诊断</Checkbox>
              </Check_box>
              <AddIllByDiagnose ref={ref => this.addIllByDiagnose = ref} placeholder='请输入诊断拼音简码快速添加' addWestMedicineData={this.addWestMedicineData}/>
              <span>
                <Button type="primary" shape="circle" icon="plus" onClick={this.addWestMedicineData}></Button>
              </span>
            </WestMedicine>
          }
          </Content>
          <Middle>
            <SpecTable
              dataSource={diagnoseData}
              columns={columns}
              locale={{emptyText: '暂无诊疗数据' }}
              pagination={Pagination_dia}/>
          </Middle>
          <History>
            <Header>
              <Title>
                📅历史诊断
              </Title>
              <Tip>
                💡双击下方历史诊断可加入到当前诊断信息中
              </Tip>
            </Header>
            <SpecTable
              onRow={(record) => {
                return {
                  onDoubleClick: (e) => {
                    this.SelectedLine(record);
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  },       // 点击行
                };
              }}
              rowClassName={(record, index)=>{
                return ((record.status) ? 'Selected' : 'unSelected');
              }}
              dataSource={diagnoseHisData}
              columns={columns.slice(0,8)}
              locale={{emptyText: '暂无诊疗数据' }}
              pagination={Pagination_his}/>
              <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
          </History>
          <Footer>
            <SureButton type="primary" onClick={(e)=>{this.save(diagnoseFinalInfo)}}>确定</SureButton>
            <CancelButton type="primary" onClick={()=>{this.inputEnterPop.handleClose()}}>取消</CancelButton>
          </Footer>
        </Container>
      </InputEnterPop>
    );
  }
}
const Container = styled.div`
  font-family: "MicrosoftYaHei Microsoft YaHei";
  background: rgba(242, 242, 242, 1);
  font-size: 13px;
  width: 770px;
`;
const Tab = styled.div`
  font-weight: 400;
  font-style: normal;
  font-family: 'MicrosoftYaHei', '微软雅黑';
  font-size: 12px;
  color: #333333;
  height: 40px;
  padding-top: 10px
`;
const TabItem = styled.span`
  padding: 10px;
  border-bottom: ${props => (props.index == props.current) ? '2px solid #0B6FCB' : '0px solid #0B6FCB'};
  margin: 10px;
  cursor: pointer
`;
const Middle = styled.div`
  height: 171px;
`;
const Content = styled.div`
  margin-top: 2px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  color: white;
  margin-bottom: 5px;
`;
const ChinaMedicine = Content.extend`
  padding: 0px 15px;
`;
const WestMedicine = Content.extend`
  padding: 0px 15px;
  height:
`;
const SpecRadioGroup = styled(RadioGroup)`
  &&& {
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 5px;
    height: 29px;
    padding: 6px;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Check_box = styled.div`
  width: 350px;
  margin-left: 20px;
  display: flex;
`;
const History = styled.div`
  margin-top: 10px;
  border-top: 1px solid #0A6ECB;
  height: 181px;
`;
const Header = styled.div`
  height: 25px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-family: 'MicrosoftYaHei', '微软雅黑';
  color: #333333;
  margin-left: 15px;
`;
const Tip = styled.div`
  color: #009900;
  margin-left: 30px;
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  padding-bottom: 20px;
`;
const SpecTable = styled(Table)`
  ${tableSty.selectedTable};
  ${paginationSty.easyPagination};
  .ant-table-row {
    height: 24px;
    background-color: white;
  }
  th {
    padding-left: 5px !important;
    border-top: 1px solid white;
    border-right: 1px solid white;
    height: 24px;
    background-color: rgba(242,242,242,1) !important;
  }
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.white}
`;

/*
@作者：姜中希
@日期：2018-07-06
@描述：主诉组件，包含主诉输入框和弹框，弹框提供子元素即可
*/
