import React, {Component} from 'react';
import styled from 'styled-components';
import { Button, Table, Radio, Checkbox, Modal } from 'antd';
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
const confirm = Modal.confirm;

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
      focusCompo: 'symptom',
    }
    this.initialData = this.initialData.bind(this);
    this.hideFloatLayer = this.hideFloatLayer.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.addChinaMedicineData = this.addChinaMedicineData.bind(this);
    this.addWestMedicineData = this.addWestMedicineData.bind(this);
    this.onMainDiagnoseChange = this.onMainDiagnoseChange.bind(this);
    this.onDoubleDiagnoseChange = this.onDoubleDiagnoseChange.bind(this);
    this.enterEvent = this.enterEvent.bind(this);
    this.save = this.save.bind(this);
  }
  componentWillMount(){
    let diagnoseFinalInfo = this.props.value.originData;// 先获取该用户的诊断明细数组
    if(diagnoseFinalInfo.length){
      this.setState({ diagnoseFinalInfo });
    }
  };
  componentWillReceiveProps(nextProps){
    let diagnoseFinalInfo = nextProps.value.originData;// 先获取该用户的诊断明细数组
    if(diagnoseFinalInfo.length){
      this.setState({ diagnoseFinalInfo });
    }
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
      if(res.result && res.data){
        if(res.data.records.length){
          let diagnoseHisOriginData = [];
          res.data.records.forEach(item => {
            item.buDiagnosisList.forEach(itemChild => {
              itemChild.doctorname = item.doctorname;
              diagnoseHisOriginData.push(itemChild);
            });
          });
          self.setState({
            diagnoseHisOriginData: diagnoseHisOriginData
          });
        }
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
      render: (text, record, index) => index + 1
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
      dataIndex: 'diagnosisWayDic',
      align: 'center',
      key: 'diagnosisWayDic',
    }, {
      title: '诊断类别',
      align: 'center',
      dataIndex: 'diagnosisType',
      key: 'diagnosisType',
      render:(text, record, index)=> record.diagnosisTypeDic ?  record.diagnosisTypeDic : '-'
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
          item.buDiagnosisSyndromeList = item.buDiagnosisSyndromeList.remove({'syncode': record.diagnosisCode});
          if(item.buDiagnosisSyndromeList.length == 0){ // 删除最后一个症候，该疾病也被删除
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
    console.log('manifestation', manifestation);
    if(symptom && 'diseaseid' in symptom){ // 校验疾病非空
      let exist = diagnoseFinalInfo.some(item => item.diagnosisCode == symptom.discode);
      if(!exist){ // 最终诊断对象中不存在该疾病
        // console.log('不存在该疾病');
        let item = deepClone(symptom);
        symptom.buDiagnosisSyndromeList = manifestation;
        symptom.diagnosisName = symptom.disname;
        symptom.diagnosisCode = symptom.discode;
        symptom.diaid = '';
        symptom.buDiagnosisSyndromeList.forEach(item => {
          item.diseaseid = symptom.diseaseid;
        });
        symptom.diagnosisWay = 1;
        diagnoseFinalInfo.push(symptom);
      }else{ // 最终诊断对象中存在该疾病继续遍历病候
        if(manifestation.length){ // 选择病候则判断该疾病下的病候有没有重复
          diagnoseFinalInfo.forEach(item => {
            if(item.diagnosisCode == symptom.discode){ // 先遍历出该疾病
              let existedManifestations = []; // 重复的病候们
              manifestation.forEach(itemChild => { // 遍历档当前选择的病候们
                let existedManifestation = []; // 存储重复的病候
                if(item.buDiagnosisSyndromeList){
                  existedManifestation = item.buDiagnosisSyndromeList.filter( itemChildChild => itemChildChild.syncode == itemChild.syncode); // 遍历出当前疾病下重复的病候
                }
                if(existedManifestation.length > 0){ // 存在重复病候
                  existedManifestations = existedManifestations.concat(existedManifestation.map(itemObj => itemObj.manifname));
                }else{ // 该病候和已有病候不重复则添加该病候
                  itemChild.diseaseid = symptom.diseaseid;
                  item.buDiagnosisSyndromeList.push(itemChild);
                }
              });
              if(existedManifestations.length){
                this.tipModal.showModal({ stressContent: '症候' + existedManifestations.join('、') + '已存在' });
              }
            }
          });
        }
        else{ // 没有选择症候则提示该疾病已存在
          this.tipModal.showModal({ stressContent: '该疾病已存在' });
        }

      }
    }
    else{ // 疾病不能为空
      this.tipModal.showModal({ stressContent: '疾病不能为空' });
      return ;
    }
    this.setState({ diagnoseFinalInfo });
  };
  // 历史诊断双击选择
  SelectedLine(record){
    let {diagnoseHisOriginData, diagnoseFinalInfo} = this.state;
    if(record.manifCode){ // 该字段表示有症候但是改字段代表的值是症候对应的疾病
      diagnoseHisOriginData.forEach((item) => {
        if(item.diagnosisCode == record.manifCode){ // 疾病匹配
          item.buDiagnosisSyndromeList.forEach((itemChild) => {
            if(itemChild.syncode == record.diagnosisCode){ // 症候匹配
              console.log('症候匹配');
              let result = diagnoseFinalInfo.some((finalItem) => {
                if(finalItem.diagnosisCode ==  record.manifCode){ // 当前诊断中已存在该疾病，则加入到该疾病的症候数组中
                  let exist = finalItem.buDiagnosisSyndromeList.some((finalItemChild) => finalItemChild.syncode == itemChild.syncode);
                  if(exist){
                    this.tipModal.showModal({ stressContent: '该疾病病候已存在' });
                  }else{
                    finalItem.buDiagnosisSyndromeList.push(itemChild);
                  }
                  return true;
                }
              });
              if(!result){ // 当前诊断中不存在该疾病, 把症候放入buDiagnosisSyndromeList中
                let buDiagnosisSyndromeListFinal = [];
                let { buDiagnosisSyndromeList, ...buDiagnosisListObj } = item;
                buDiagnosisSyndromeListFinal.push(itemChild);
                buDiagnosisListObj.buDiagnosisSyndromeList = buDiagnosisSyndromeListFinal;
                diagnoseFinalInfo.push(buDiagnosisListObj);
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
    let doubleDiagnose = false;
    if(e.target.value == 2){
      doubleDiagnose = '';
    }
    this.setState({
      repeatDiagnose: e.target.value,
      doubleDiagnose
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
    let filterIllByDiagnose = [];
    addIllByDiagnose.forEach((itemChild) => {
      let existedDiagnose = diagnoseFinalInfo.filter((item) => item.diagnosisCode == itemChild.diacode);
      if(existedDiagnose.length){ // 已存在该对象
        filterIllByDiagnose = filterIllByDiagnose.concat(existedDiagnose);
      }else{ // 加入诊断数组中
        itemChild.buDiagnosisSyndromeList = [];
        console.log('itemChild', itemChild);
        itemChild.diagnosisName = itemChild.dianame;
        itemChild.diagnosisCode = itemChild.diacode;
        itemChild.diagnosisWay = 0;
        itemChild.diagnosisWayDic = '西医';
        itemChild.diagnosisType = repeatDiagnose;
        itemChild.diagnosisTypeDic = repeatDiagnose == 1 ? '初步诊断' : '确认诊断'
        itemChild.mainDiaType = mainDiagnose ? '01' : '02';
        itemChild.mainDiaTypeDic = mainDiagnose ? '是' : '否';
        itemChild.doubtDiaType = doubleDiagnose === '' ? '' : ( doubleDiagnose ? '01' : '02' );
        itemChild.doubtDiaTypeDic = doubleDiagnose === '' ? '-' : ( doubleDiagnose ? '是' : '否' );
        diagnoseFinalInfo.push(itemChild);
        // delete itemChild.dianame;
        // delete itemChild.diacode;
      }
    });
    let existedDiagnoseNames = [];
    filterIllByDiagnose.forEach((item) => {
      existedDiagnoseNames.push(item.dianame);
    });
    if(existedDiagnoseNames.length){
      this.tipModal.showModal({ stressContent: existedDiagnoseNames.join('、') + '已存在' });
    }
    this.setState({ diagnoseFinalInfo });
  };
  /** [save 从诊断数据对象提取要展示的文本然后将对象和文本都赋值给输入框] */
  save(){
    let diagnoseFinalInfo = this.state.diagnoseFinalInfo;
    let text = getDiagnoseText(diagnoseFinalInfo);
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
    let {icon, icon_right, ...formItemProps} = this.props;
    let { curTab, symptomId, diagnoseHisOriginData, diagnoseFinalInfo, repeatDiagnose, mainDiagnose, doubleDiagnose, diaCurPage, hisCurPage, focusCompo} = this.state;
    let diagnoseHisData =getDiagnoseDataSource(diagnoseHisOriginData, 'his'); // 历史诊断表格数据
    let diagnoseData = getDiagnoseDataSource(diagnoseFinalInfo, 'now'); // 当前诊断表格数据
    let columns = this.getTableCol();
    Pagination_dia.total = diagnoseData.length;
    Pagination_dia.current = diaCurPage;
    Pagination_dia.pageSize = 5;
    Pagination_dia.onChange = (page, pageSize)=>{
      this.setState({ diaCurPage: page});
    }
    Pagination_his.total = diagnoseHisData.length;
    Pagination_his.current = hisCurPage;
    Pagination_his.pageSize = 5;
    Pagination_his.onChange = (page, pageSize)=>{
      this.setState({ hisCurPage: page});
    }
    return (
      <InputEnterPop displayed = {this.initialData} formItemProps={formItemProps} ref={ref=>this.inputEnterPop = ref} title='诊断' icon={icon} icon_right={icon_right} importability={false}>
        <Container onClick={this.hideFloatLayer}>
          <Tab>
            <TabItem current={curTab} index={0} onClick={()=>{this.toggleTabs(0)}}>✍️中医诊断</TabItem>
            <TabItem current={curTab} index={1} onClick={()=>{this.toggleTabs(1)}}>📿西医诊断</TabItem>
          </Tab>
          <Content>
          {
            (curTab == 0)?
            <ChinaMedicine >
              <AddIllBySymptom enterEvent={this.enterEvent} autofocus='autofocus' id='symptom'  ref={ref => this.addIllBySymptom = ref} placeholder='请输入病症中文关键字或拼音简写搜索' notify={this.getMessage}/>
              <AddIllByManifestations enterEvent={this.enterEvent} id='manifestations' ref={ref => this.addIllByManifestation = ref} placeholder='请输入病侯中文关键字或拼音简写搜索' symptomId={symptomId}/>
              <span>
                <Button type="primary" shape="circle" onClick={() => { this.enterEvent('', 'manifestations') }} icon="plus"></Button>
              </span>
            </ChinaMedicine>
            :
            <WestMedicine>
              <SpecRadioGroup value={repeatDiagnose} onChange={(e)=>{this.changediagnoseType(e)}}>
                <Radio value={1}>初步诊断</Radio>
                <Radio value={2}>确认诊断</Radio>
              </SpecRadioGroup>
              <Check_box>
                <Checkbox checked={mainDiagnose} onChange={this.onMainDiagnoseChange}>主诊断</Checkbox>
                {
                  doubleDiagnose !== '' ? <Checkbox checked={doubleDiagnose} onChange={this.onDoubleDiagnoseChange}>疑似诊断</Checkbox> : null
                }
              </Check_box>
              <AddIllByDiagnose ref={ref => this.addIllByDiagnose = ref} enterEvent={this.enterEvent} placeholder='请输入诊断拼音简码快速添加' id='diagnoseIll'/>
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
            <SureButton type="primary" onClick={this.save} disabled={!window.modifyPermission}>确定</SureButton>
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
  width: 450px;
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
