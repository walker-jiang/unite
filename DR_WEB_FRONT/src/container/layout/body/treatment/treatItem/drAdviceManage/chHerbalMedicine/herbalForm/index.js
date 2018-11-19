import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Select, Button, Row, Col, Pagination, Radio } from 'antd';
import Table from 'components/dr/icon/icons/table';
import List from 'components/dr/icon/icons/list';
import TableShow from './showWay/tableShow';
import ListShow from './showWay/listShow';
import SelectHerb from './selectHerb';
import QuickAddHerb from './quickAddHerb';
import Diagnose from './diagnose';
import AddHerbalForm from './addHerbalForm';
import Entrust from './entrust';
import Input from 'components/dr/input/basicInput';
import TipModal from 'components/dr/modal/tip';
import down from './down.png';
import up from './up.png';
import selectSty from 'components/antd/style/select';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import { getDiagnoseText, converItemToNeededCN } from 'commonFunc/transform';
import paginationSty from 'components/antd/style/pagination';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class HerbalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyData: [],  // 频次下拉数据
      showWay: 'table',   // 默认显示方式为格格
      showResult: false,  // 初始不显示草药列表
      buDiagnosisInfo: {}, // 诊断信息主表原始数据，修改时需要使用
      buRecipe: {}, // 原始处方信息
      data: {}, //原始医嘱信息
      current: 1, // 当前页
      // 初始化数据
      buDiagnosisList: [], // 当前患者的诊断数据
      recipename: '', // 处方名称
      remark: '', // 嘱托
      treatway: '', // 治疗方法
      countnum: 3, // 付数
      freq: null, // 频次
      herbalData: [], // 草药数据
      illCaseId: '', // 病情ID
      cureCaseId: '', // 治发ID
      illCaseData: [], //病情数据
      cureCaseData: [], // 治发数据
      subHerbalData: [], // 临症加减草药数据
      tipVisible: false, // 禁忌、慎用提示是否可见
      careful_tip: '', // 禁忌提示信息文本
      mitype: [], // 以保内医保外字典数据
      selectedMitype: '', // 选择的医保类型
    };
    this.delHerbal = this.delHerbal.bind(this);
    this.dosageChange = this.dosageChange.bind(this);
    this.usageChange = this.usageChange.bind(this);
    this.carefulTip = this.carefulTip.bind(this);
  }
  /** [componentWillReceiveProps 当从知识库添加处方时会需要改函数] */
  componentWillReceiveProps(nextProps){
    if(JSON.stringify(nextProps.attachOrder) != '{}'){
      let { buOrderDtlList, buRecipe } = nextProps.attachOrder;
      this.setState({
        herbalData: buOrderDtlList,
      });
      if(JSON.stringify(buRecipe) != '{}' && buRecipe){
        this.setState({
          recipename: buRecipe.recipename,
          remark: buRecipe.remark,
          treatway: buRecipe.treatway,
          countnum: buRecipe.countnum,
          freq: { key: buRecipe.freqid, label: buRecipe.freqname}
        });
      }
    }
  };
  componentWillMount(){
    this.getDiagnoseData();
    this.getFrequency();
    this.getMitype(['mitype']);
    if(this.props.initData){ // 修改、查看需要初始化数据
      this.getCHMedicineAdvice(this.props.orderid);
    }else{ // 添加可以初始化数据
      if(JSON.stringify(this.props.attachOrder) != '{}'){
        let { buOrderDtlList, buRecipe } = this.props.attachOrder;
        this.setState({
          herbalData: buOrderDtlList,
        });
        if(JSON.stringify(buRecipe) != '{}' && buRecipe){
          this.setState({
            recipename: buRecipe.recipename,
            remark: buRecipe.remark,
            treatway: buRecipe.treatway,
            countnum: buRecipe.countnum,
            freq: { key: buRecipe.freqid, label: buRecipe.freqname}
          });
        }
      }
    }
  };
  /** [getMittype 获取字典数据] */
  getMitype(DictTypeList){
    let self = this;
    let params = {
      url: 'BaDatadictController/getListData',
      data: {
        dictNoList: DictTypeList
      },
    };
    function callBack(res){
      if(res.result){
        let dictListObj = {};
        res.data.forEach(item => {
          dictListObj[item.dictno.toLowerCase()] = item.baDatadictDetailList;
        });
        const selectedMitype = dictListObj.mitype.length ? dictListObj.mitype[0].value : '';
        self.setState({...dictListObj, selectedMitype});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getDiagnoseData 组件初始化获取加载诊断数据] */
  getDiagnoseData(){
    let self = this;
    let params = {
      url: 'BuDiagnosisInfoController/getData',
      data: {
        registerid: window.registerID
      },
    };
    if(this.props.syndrome){ // 辨证论治添加处方
      params.server_url = config_InteLigenTreat_url+'TCMAE/';
    }
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
  // 组件初始化获取频次数据下拉列表
  getFrequency () {
    let params = {
      url: 'BaFreqController/getList',
      data: {
        freqtype: 1
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let frequencyData = res.data;
        that.setState({ frequencyData })
      }
    };
    ajaxGetResource(params, success);
  }
  getCHMedicineAdvice(orderid){
    let params = {
      url: 'BuOrderController/getData',
      data: {
        orderid: orderid
      }
    };
    let that = this;
    function callBack(res) {
      if(res.result){
        let { buRecipe, buOrderDtlList, ...data } = res.data;
        buOrderDtlList.forEach((item)=>{
          // item.medicinename = item.itemname;
          item.defQty = item.dosage;
        });
        console.log('buRecipe', buRecipe);
        that.setState({
          recipename: buRecipe.recipename, // 处方名称
          remark:  buRecipe.remark, // 嘱托
          treatway:  buRecipe.treatway, // 治疗方法
          countnum: buRecipe.countnum, // 付数
          freq: {key: buRecipe.freqid, label: buRecipe.freqname}, // 频次
          herbalData: buOrderDtlList, // 草药数据
          buRecipe: buRecipe, // 原始处方信息
          data: data, // 原始医嘱信息
        });
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [toggleShowWay 切换草药展示形式] */
  toggleShowWay (index) {
    this.setState({
      showWay: index,
    })
  }
  /**
   * [addHerbalData 添加草药列表]
   * @param  {[type]} quickAddData [新增项]
   * @return {[type]}              [void]
   */
  addHerbalData (herbalItem) {
    let { herbalData , showWay } = this.state;
    let formateItem = converItemToNeededCN(herbalItem, herbalData, 0);
    herbalItem.exist = 1
    for(let i=0; i < herbalData.length; i++){
      if(herbalData[i].itemcode == formateItem.itemcode){
        this.tipModal.showModal({
          stressContent: '草药已存在'
        });
        return false;
      }
    }
    if(showWay == 'table'){
      this.addTableData.scrollTop = this.addTableData.scrollHeight; // 自动滚动到滚动区域的最底部
    }
    herbalData.push(formateItem);
    this.setState({ herbalData });
  }
  /**
   * [delHerbal 删除某个草药]
   * @param  {[type]} herbalItem [草药数据对象]
   * @return {[type]}            [void]
   */
  delHerbal(herbalItem){
    let herbalData = this.state.herbalData;
    herbalData = herbalData.remove({itemid: herbalItem.itemid});
    this.setState({ herbalData });
  };
  /**
   * [dosageChange 修改草药剂量]
   * @param  {[type]} itemcode [草药名称]
   * @param  {[type]} newDosage    [新剂量]
   * @return {[type]}              [void]
   */
  dosageChange(itemcode, newDosage) {
    let herbalData = this.state.herbalData;
    herbalData.forEach((item)=>{
      if(item.itemcode == itemcode){
        item.count = newDosage;
      }
    })
    // console.log('herbalData数据' ,herbalData);
    this.setState({herbalData});
  }
  /**
   * [usageChange 某药的用法进行修改]
   * @param  {[type]} combinedModifyFormData [该药ID]
   * @param  {[type]} newUsage [该药用法对象（包含名称、ID）]
   * @return {[type]}            [void]
   */
  usageChange(itemcode, newUsage) {
    let herbalData = this.state.herbalData;
    herbalData.forEach((item)=>{
      if(item.itemcode == itemcode){
        item.usageid = newUsage.key;
        item.usagename = newUsage.label;
      }
    })
    this.setState({ herbalData });
  }
  herbalChange = (herbalID) => {
    let subHerbalData = this.state.subHerbalData;
    let self = this;
    subHerbalData.forEach(item => {
      if(item.medicineid == herbalID){
        self.addHerbalData(JSON.parse(JSON.stringify(item)));
      };
    });
  }
  /** [getHerbalData 获取临症加减草药数据] */
  getHerbalData(){
    let cureCaseId = this.state.cureCaseId;
    let self = this;
    let params = {
      url: 'api/treatdrug/getIdNameList',
      server_url: config_InteLigenTreat_url+'TCMAE/',
      data: {
        treatmId: cureCaseId,
        userid: window.sessionStorage.getItem('userid'),
        orgCode: window.sessionStorage.getItem('orgid')
      },
    };
    function callBack(res){
      if(res.result){ // 获取当前诊断明细数据
        let subHerbalData = [];
        res.data.forEach((item) => {
          let herbalItem = JSON.parse(item.baHerbalMedicineString)[0];
          herbalItem.count = item.count;
          subHerbalData.push(herbalItem);
        });
        self.setState({ subHerbalData });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  cureCaseChange = (value) => {
    this.setState({ cureCaseId: value }, () => {
      this.getHerbalData('');
    });
  }
  /**
   * [getCureCaseData 获取治发数据]
   * @param  {[type]} keyword [治发关键词]
   * @return {[type]}         [undefined]
   */
  getCureCaseData = (keyword) => {
    let illCaseId = this.state.illCaseId;
    let self = this;
    let params = {
      url: 'api/treatmethod/getIdNameList',
      server_url: config_InteLigenTreat_url+'TCMAE/',
      data: {
        treatId: illCaseId,
        keyword: keyword
      },
    };
    function callBack(res){
      if(res.result){ // 获取当前诊断明细数据
        self.setState({ cureCaseData: res.data });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
  * [handleChange 选择病情后]
  * @param  {[type]} value [病情ID]
  * @return {[type]}       [undefined]
  */
  IllCaseChange = (value) => {
    this.setState({ illCaseId: value }, () => {
      this.getCureCaseData('');
    });
  }
  /**
   * [getIllCaseData 获取病情数据]
   * @param  {[type]} keyword [病情关键词]
   * @return {[type]}         [undefined]
   */
  getIllCaseData = (keyword) => {
    let self = this;
    let params = {
      url: 'api/treatdisease/getIdNameList',
      server_url: config_InteLigenTreat_url+'TCMAE/',
      data: {
        keyword: keyword
      },
    };
    function callBack(res){
      if(res.result){ // 获取当前诊断明细数据
        self.setState({ illCaseData: res.data });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  // 保存
  handleSubmit(e){
    e.preventDefault();
    let formData = new Object();
    let herbalData = this.state.herbalData;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        formData = values;
      }
    });
    return { formData, herbalData }
  }
  /**
   * [refreshHerbalData 禁忌监测后会更新当前草药数据]
   * @param  {[type]} herbalData [description]
   * @return {[type]}            [description]
   */
  refreshHerbalData(herbalData){
    this.setState({ herbalData });
  };
  carefulTip(display, value){
    if(display){
      this.setState({ tipVisible: false })
    }else{
      this.setState({ tipVisible: true, careful_tip:  value})
    }
  };
  /** [changeMitype 选择医保类型] */
  changeMitype = (e) => {
    this.setState({
      selectedMitype: e.target.value,
    });
  }
  render () {
    let { recipename, usagename, remark, treatway, countnum, freq, herbalData, buDiagnosisList, frequencyData, showWay, current, illCaseData, cureCaseData, subHerbalData, tipVisible, careful_tip, mitype, selectedMitype } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 22 },
      },
      colon: false
    };
    const separateFormItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
      },
      colon: false
    };
    const specFormItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
      },
      colon: false
    };
    const pagination = {
      simple: true,
      showWay: showWay,
      pageSize: 8,
      defaultCurrent: current,
      current: current,
      total: herbalData.length == 0 ? 1 : herbalData.length,
      onChange: (page) =>{
        this.setState({ current: page });
      },
      itemRender: (current, type, originalElement)=>{
          if (type === 'prev') {
            return <a>上页</a>;
          } if (type === 'next') {
            return <a>下页</a>;
          }if(type == 'page'){
            return <a className='test'>{current}</a>
          }
          return originalElement;
        }
    };
    return (
      <SpecForm className='not-draggable' onClick={()=>{this.quickAddHerb.hideResult()}}>
        <Row>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="诊断：">
              {getFieldDecorator('diagnose', {
                initialValue: {originData: buDiagnosisList, extractionData: getDiagnoseText(buDiagnosisList)}
              })(
                <Diagnose icon='#C14342'/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              {...separateFormItemLayout}
              label="处方名称：">
              {getFieldDecorator('recipename', {
                initialValue: recipename
              })(
                <Input />
              )}
              </FormItem>
          </Col>
          <Col span={16}>
            <FormItem
              labelCol={{span: 3}}
              wrapperCol={{span: 21}}
              colon={false}
              label="嘱托：">
              {getFieldDecorator('remark', {
                initialValue: {originData: {}, extractionData: remark}
              })(
                <Entrust />
              )}
              </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              {...separateFormItemLayout}
              label="治疗方法：">
              {getFieldDecorator('treatMethods', {
                initialValue: treatway
              })(
                <Input/>
              )}
              </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...separateFormItemLayout}
              label="付数（付）：">
              {getFieldDecorator('doseNum', {
                initialValue: countnum,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...separateFormItemLayout}
              label="频次：">
              {getFieldDecorator('frequency', {
                initialValue: (frequencyData.length > 0 ? (freq ? freq : {key: frequencyData[0].freqcode, label: frequencyData[0].freqname}) : {key: '', label: ''})
              })(
                <SpecSelect labelInValue>
                {
                  frequencyData.map((item, index)=>{
                    return (
                      <Option key={index} value={item.freqcode}>{item.freqname}</Option>
                    )
                  })
                }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              {...separateFormItemLayout}
              label="临症加减：">
              {getFieldDecorator('substract')(
                <SpecSelect
                  showSearch
                  placeholder='选择或者输入病情首字母'
                  defaultActiveFirstOption={false}
                  filterOption={false}
                  onChange={this.IllCaseChange}
                  onSearch={this.getIllCaseData}
                  notFoundContent={null}
                >
                {
                  illCaseData.map(item => <Option key={item.id}>{item.treatdiseaseName}</Option>)
                }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label=" "
              {...separateFormItemLayout}>
              {getFieldDecorator('cureCase')(
                <SpecSelect
                  showSearch
                  placeholder='选择或输入治法'
                  defaultActiveFirstOption={false}
                  filterOption={false}
                  onChange={this.cureCaseChange}
                  onSearch={this.getCureCaseData}
                  notFoundContent={null}
                >
                {
                  cureCaseData.map(item => <Option key={item.id}>{item.therapyName}</Option>)
                }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...separateFormItemLayout}
              label=" ">
              {getFieldDecorator('subHerbal')(
                <SpecSelect placeholder='选择草药' onChange={this.herbalChange} >
                {
                  subHerbalData.map((item, index) => <Option key={item.medicineid} value={item.medicineid}>{item.medicinename}</Option>)
                }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <SpecCol span={2}>
            <TableIcon showWay={showWay} onClick={this.toggleShowWay.bind(this, 'table')}/>
            <ListIcon showWay={showWay} onClick={this.toggleShowWay.bind(this, 'list')}/>
          </SpecCol>
          <SpecCol span={2}>
            <span>🌿添加中药</span>
          </SpecCol>
          <Col span={5}>
            <SpecFormItem>
              <SpecRadioGroup value={selectedMitype} onChange={this.changeMitype}>
              {
                mitype.map(item => <Radio key={item.value} value={item.value}>{item.vname}</Radio>)
              }
              </SpecRadioGroup>
            </SpecFormItem>
          </Col>
          <Col span={15}>
            <QuickAddHerb placeholder='请输入中药首字母快速添加' selectedMitype={selectedMitype} icon='true' ref={ref => this.quickAddHerb = ref} getQuickData = {this.addHerbalData.bind(this)}/>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <SpecialTip visible={tipVisible}>特殊提示：{careful_tip}</SpecialTip>
          </Col>
        </Row>
        <Footer>
          {
            showWay == 'list' ?
            <ListShow
              current={current}
              pageSize={pagination.pageSize}
              herbalData={ herbalData }
              delHerbal={this.delHerbal}
              selectedMitype={selectedMitype}
              ref={ref => this.addListData = ref} />
            :
            <TableShow
              current={current}
              herbalData={ herbalData }
              delHerbal={this.delHerbal}
              dosageChange={this.dosageChange}
              usageChange={this.usageChange}
              mouse_event={this.carefulTip}
              addHerbal={ () => { this.addHerbalForm.handleAddClick() }}
              ref={ref => this.addTableData = ref} />
          }
          <Bottom>
            <Tip>💡提示：医保外项目以红色显示</Tip>
            <Doctor>医师：
              <Name>姜中希</Name>
            </Doctor>
            <SimplePagination {...pagination}></SimplePagination>
          </Bottom>
        </Footer>
        <AddHerbalForm wrappedComponentRef={ref=>{this.addHerbalForm = ref}}></AddHerbalForm>
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </SpecForm>
    )
  }
}
const SpecForm = styled(Form)`
  &&& {
    width: 100%;
    height: 540px;
    font-size: 12px;
  }
  &&& label{
    color: rgb(178, 20, 20);
  }
  &&& > div > div > .ant-form-item {
    margin-bottom: -8px !important;
  }
  color: rgb(178, 20, 20);
`;
const SpecSelect = styled(Select)`
  ${selectSty.blueSemicircle};
  &&& .ant-select-arrow {
    background: url(${down}) no-repeat top right;
  }
  &&&.ant-select.ant-select-open > .ant-select-selection > .ant-select-arrow {
    background: url(${up}) no-repeat top right;
  }
`;
const SpecCol = styled(Col)`
  margin: 10px 0px 5px 0px;
`;
const TableIcon = styled(Table)`
  background: ${props => props.showWay == 'table' ? 'rgb(178, 20, 20)' : '#999999'};
`;
const ListIcon = styled(List)`
  > div{
    background-color: ${props => props.showWay == 'list' ? 'rgb(178, 20, 20)' : '#999999'};
  }
  border-color: ${props => props.showWay == 'list' ? 'rgba(10, 110, 203, 1)' : '#999999'};
  margin-left: 10px;
`;
const AddHerbal = styled.div`
  float: left;
  height: 20px;
  color: rgb(178, 20, 20);
  padding: 0px 13px;
  border-left: 1px solid #999999;
  border-right: 1px solid #999999;
  cursor: pointer;
`;
const QuickAdd = styled.span`
  margin-left: 13px;
  color: #666666;
`;
const Footer = styled.div`
  position: relative;
`;
const SpecialTip = styled.span`
  color: ${props => props.visible ? 'red' : 'white'};
  padding: 5px;
`;
const Bottom = styled.div`
  position: absolute;
  top: 300px;
  width: 100%;
`;
const Tip = styled.span`
  font-size: 12px;
  line-height: 55px;
`;
const Doctor = styled.div`
  float: right;
  line-height: 55px;
`;
const Name = styled.span`
  text-decoration: underline;
`;
const SimplePagination = styled(Pagination)`
  &&&.ant-pagination {
    margin-right: 70px !important;
    color: #0A6ECB !important;
    font-size: 12px !important;
  }
  &&&.ant-pagination > .ant-pagination-prev {
    margin-right: -160px;
    border-radius: 0px;
    padding-left: 10px;
    color: #0A6ECB !important;
  }
  &&&.ant-pagination > .ant-pagination-prev::before{
    content: '|';
    color: #0A6ECB;
    padding-right: 12px;
    margin-bottom: 5px;
  }
  &&&.ant-pagination > .ant-pagination-prev a{
    color: #0A6ECB !important;
  }
  &&&.ant-pagination > .ant-pagination-next a{
    color: #0A6ECB !important;
  }
  &&&.ant-pagination > .ant-pagination-simple-pager {
    width: 80px;
    margin-right: -2px !important;
  }
  &&&.ant-pagination > .ant-pagination-simple-pager > input{
    border: none !important;
    background-color: transparent !important;
    padding: 0px !important;
    margin-right: 0px !important;
    width: fit-content !important;
    text-align: right !important;
  }
  &&&.ant-pagination > .ant-pagination-simple-pager > .ant-pagination-slash{
    margin: 0px !important;
  }
  &&&.ant-pagination.ant-table-pagination{
    margin: 5px 0px ;
  }
  &&& {
    margin-top: 6px;
    float: right;
    display: ${props => props.showWay == 'list' ? 'block' : 'none'};
  }
  &&& > .ant-pagination-next a , &&& > .ant-pagination-prev a, &&& > .ant-pagination-simple-pager{
    color: rgb(178, 20, 20) !important;
  }
  &&& > .ant-pagination-prev::before {
    color: rgb(178, 20, 20) !important;
  }
`;
const SpecRadioGroup = styled(RadioGroup)`
  &&& {
    float: left;
    font-size: 12px;
    width: 220px;
    height: 25px;
    display: flex;
    align-items: center;
    margin-right: 21px;
    margin-top: 8px;
    border-right: 1px solid #e9e9e9;
  }
`;
const SpecFormItem = styled(FormItem)`
  .ant-form-item-children {
    display: flex;
    border-bottom: 1px solid rgba(215,215,215,1);
    height: 35px;
  }
`;

const HerbalFormWrapper = Form.create()(HerbalForm);
export default HerbalFormWrapper;

/*
@作者：马晓敏
@日期：2018-06-29
@描述：新增中草药处方部分
*/
