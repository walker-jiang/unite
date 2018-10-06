import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Form, Icon, Select, Radio, Input, Row, Col, } from 'antd';
import Diagnose from '../../chHerbalMedicine/herbalForm/diagnose';
import QuickAddMedicine from './quickAddMedicine';
import InputBaseLine from 'components/dr/input/basicInput';
import 'components/antd/style/pagination.less';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';
import deepClone from 'commonFunc/deepClone';
import inputSty from 'components/antd/style/input';
import selectSty from 'components/antd/style/select';
import { getDiagnoseText } from 'commonFunc/transform';
import tableSty from 'components/antd/style/table';
import paginationSty from 'components/antd/style/pagination';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
      buDiagnosisInfo: {}, // 诊断主信息对象
      usageData: [], // 用法下拉框
      buDiagnosisInfo: {}, // 诊断信息主表原始数据，修改时需要使用
      buRecipe: {}, // 原始处方信息
      data: {}, //原始医嘱信息
      // 初始化数据
      buDiagnosisList: [], // 诊断明细信息
      recipename: '', // 处方名称
      miType: 1, // 0 医保外， 1医保内 默认选择医保内
      medicineData: [], // 药品数据
    }
  }
  /** [getSpecialUsage 获取特殊用法下拉数据] */
  getSpecialUsage() {
    let params = {
      url: 'BaUsageController/getList',
      data: {}
    };
    let that = this;
    function success(res) {
      if(res.result){
        let usageData = res.data;
        that.setState({ usageData })
      }
    };
    ajaxGetResource(params, success);
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
    let buOrderDtlList = this.props.buOrderDtlList;
    this.setState({
      ...buOrderDtlList
    });
    this.getDiagnoseData();
    this.getSpecialUsage();
    if(this.props.actionType == 'modify' || this.props.actionType == 'view'){ // 修改、查看需要初始化数据
      this.getCHMedicineAdvice(this.props.orderid);
    }
  };
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
          item.medicinename = item.itemname;
          item.defQty = item.dosage;
        });
        that.setState({
          recipename: buRecipe.recipename, // 处方名称
          medicineData: buOrderDtlList, // 草药数据
          buRecipe: buRecipe, // 原始处方信息
          data: data, // 原始医嘱信息
        });
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [onDelete 删除当前药品]
   * @param  {[type]} record [当前药品对象]
   * @return {[type]}        [void]
   */
  onDelete (record) {
    let medicineData = this.state.medicineData;
    medicineData.pop(record);
    this.setState({medicineData})
  }
  /** [handleSubmit 获取表单数据] */
  handleSubmit = (e) => {
    e.preventDefault();
    let formData = new Object();
    let medicineData = this.state.medicineData;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        formData = values;
        console.log('Received values of form: ', values);
      }
    });
    return {formData, medicineData}
  }
  /**
   * [onModifyInputValue 表格输入框值改变后改变数据源的函数]
   * @param  {[type]} newValue   [新值]
   * @param  {[type]} medicineid [药品ID]
   * @param  {[type]} item       [改变的药品项]
   * @return {[type]}            [void]
   */
  onModifyInputValue(newValue, medicineid, item){
    let medicineData = this.state.medicineData;
    medicineData.forEach((Dataitem, index)=>{
      Dataitem[item] = Dataitem.medicineid == medicineid ? newValue : Dataitem[item];
    });
    this.setState({ medicineData });
  };
  /**
   * [onModifySelectValue 表格中下拉框选项改变后触发的函数]
   * @param  {[type]} medicineid [当前药品ID]
   * @param  {[type]} idItem     [当前药品项ID]
   * @param  {[type]} nameItem   [当前药品项名称]
   * @param  {[type]} newID      [新药品项ID]
   * @param  {[type]} newName    [新药品项名称]
   * @return {[type]}            [void]
   */
  onModifySelectValue(medicineid, idItem, nameItem, newID, newName){
    let medicineData = this.state.medicineData;
    medicineData.forEach((Dataitem, index)=>{
      Dataitem[idItem] = Dataitem.medicineid == medicineid ? newID : Dataitem[idItem];
      Dataitem[nameItem] = Dataitem.medicineid == medicineid ? newName : Dataitem[nameItem];
    });
    this.setState({ medicineData });
  };
  /**
   * [addMedicineData 添加药品列表]
   * @param  {[type]} medicineItem [新增项]
   * @return {[type]}              [void]
   */
  addMedicineData (medicineItem) {
    let feeAll = 0;
    medicineItem.usageid = medicineItem.baUsage ? medicineItem.baUsage.usageid : 9; // 从用法对象转换成字符串用法ID
    medicineItem.usagename = medicineItem.baUsage ? medicineItem.baUsage.usagename : '无'; // 从用法对象转换成字符串用法名称
    let medicineData = this.state.medicineData;
    for(let i=0; i < medicineData.length; i++){
      if(medicineData[i].medicinename == medicineItem.medicinename){
        this.tipModal.showModal({
          stressContent: '该中成药/西药已存在'
        });
        return false;
      }
    }
    medicineData.push(medicineItem);
    this.setState({ medicineData });
  }
  /** [getTableColumns 设置表格列] */
  getTableColumns(){
    let usageData = this.state.usageData;
    let columns = [{
      title: "序号",
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => <span>{index + 1}</span>
    }, {
      title: "药名",
      dataIndex: 'medicinename',
      key: 'medicinename',
      render: (text, record, index) => <span>{text}</span>
    }, {
      title: "数量/单位",
      dataIndex: 'unitprice',
      key: 'unitprice',
      render: (text, record, index)=>
      <span>
        <InputCount onBlur={(e)=>{ record.defQty != e.target.value ? this.onModifyInputValue(e.target.value, record.medicineid, 'count') : ''}} defaultValue={record.defQty} />{record.baseUnitDic}
      </span>
    }, {
      title: "单位剂量",
      dataIndex: 'mediUnit',
      key: 'mediUnit',
        render: (text, record, index) => <span>{text}mg</span>
    }, {
      title: "单次剂量",
      dataIndex: 'defQty',
      key: 'defQty',
      render: (text, record, index) => <span>{text}mg</span>
    }, {
      title: "频次",
      dataIndex: 'freqname',
      key: 'freqname',
      render: (text, record, index) => <span>{text}/天</span>
    }, {
      title: "天数",
      dataIndex: 'defTakedays',
      key: 'defTakedays',
      render: (text, record, index)=><InputDays onBlur={(e)=>{ record.defTakedays != e.target.value ? this.onModifyInputValue(e.target.value, record.medicineid, 'defTakedays') : ''}} defaultValue={record.defTakedays}/>
    }, {
      title: "用法",
      dataIndex: 'usagename',
      key: 'usagename',
      render: (text, record)=>(
        <SpecSelect
          defaultValue={{key: record.usageid, label: record.usagename}}
          labelInValue={true}
          onSelect={(e)=>{this.onModifySelectValue(record.medicineid, 'usageid', 'usagename', e.key, e.label)}}>
          {
            usageData.map((item) => <Option key={item.usageid} value={item.usageid}>{item.usagename}</Option>)
          }
        </SpecSelect>
      )
    }, {
      title: "状态≡",
      dataIndex: 'statusValue',
      key: 'statusValue',
      render: (value, record, index)=><Status status={record.statusValue}>{record.statusValue ? '• 已缴费' : '• 待缴费'}</Status>
    }, {
      title: "操作",
      dataIndex: 'operate',
      key: 'operate',
      render: (value, index, record)=> <a onClick={() => { this.onDelete(record) }}>删除</a>
    }];
    return columns;
  };
  /**
   * [getTableDataSource 原始数据对象转为表格形式]
   * @param  {[type]} originData [原始中成药、西药数据]
   * @return {[type]}            [void]
   */
  getTableDataSource(medicineData){
    let feeAll = 0;
    let dataSource = [];
    medicineData.forEach((item) => {
      item.key = dataSource.length;
      dataSource.push(item);
      feeAll += item.count ? item.count / item.mediUnit * item.unitprice : item.unitprice;
    });
    if(dataSource.length % 8 != 0){
      for(let i = dataSource.length % 8; i < 8 ; i++){
        let item = deepClone(dataSource[dataSource.length-1]);
        item.key = dataSource.length;
        item.medicineid = ''; // 空行标识
        dataSource.push(item)
      }
    }
    return {dataSource, feeAll};
  };
  render () {
    let { visiblePop, medicineData, buDiagnosisList, miType, recipename } = this.state;
    const { getFieldDecorator } = this.props.form;
    let baMedicines = this.props.buOrderDtlList;
    const columns = this.getTableColumns();
    const { dataSource, feeAll } = this.getTableDataSource(deepClone(medicineData));
    const formItemLayout = {
      labelCol: {
        xs: { span: 3 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 21 },
        sm: { span: 21 },
      },
      colon: false
    };
    const specFormItemLayout = {
      labelCol: {
        xs: { span: 9 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 15 },
        sm: { span: 15 },
      },
      colon: false
    };
    const Pagination = {
      simple: true,
      pageSize: 8,
      total: dataSource.length,
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
    if(false || baMedicines == [] || baMedicines == '' || baMedicines == undefined){
      return (
        <SpecForm className='not-draggable' onClick={()=>{this.quickAddMedicine.hideResult()}}>
          <Row>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="诊断：">
              {getFieldDecorator('diagnose', {
                initialValue: {originData: buDiagnosisList, extractionData: getDiagnoseText(buDiagnosisList)}
              })(
                <Diagnose />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="处方名称："
              >
              {getFieldDecorator('recipename', {
                initialValue: recipename
              })(
                <InputBaseLine />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <SpecFormItem
                {...specFormItemLayout}
                label={<span><Add>➕</Add>快速添加：</span>}  >
                  {getFieldDecorator('addQuickly',{
                    initialValue: miType
                  })(
                    <SpecRadioGroup>
                      <Radio value={0}>医保内</Radio>
                      <Radio value={1}>医保外</Radio>
                    </SpecRadioGroup>
                  )}
              </SpecFormItem>
            </Col>
            <Col span={16}>
              <FormItem
                {...formItemLayout}
                >
                  {getFieldDecorator('addQuickly')(
                    <QuickAddMedicine placeholder='请输入中成药或西药首字母快速添加' icon='#0A6ECB' ref={ref => this.quickAddMedicine = ref} getQuickData = {this.addMedicineData.bind(this)}/>
                  )}
                </FormItem>
            </Col>
          </Row>
          <Footer>
            <SpecTable
              dataSource={dataSource}
              locale={{emptyText: '暂无中成药/西药数据' }}
              columns={columns}
              pagination={Pagination}
              rowClassName={(record, index)=>record.medicineid ? 'dotted' : 'dotted clear'} >
            </SpecTable>
            <Tip>💡提示：医保外项目以红色显示</Tip>
            <Total>合计：{parseFloat(feeAll).toFixed(2)}元</Total>
          </Footer>
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        </SpecForm>
      )
    } else {
      // let mergeArray = baMedicines.concat(medicineData);
      return (
        <SpecForm className='not-draggable' onClick={()=>{this.quickAddMedicine.hideResult()}}>
          <Row>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="诊断：">
              {getFieldDecorator('diagnose', {
                initialValue: {originData: buDiagnosisList, extractionData: getDiagnoseText(buDiagnosisList)}
              })(
                <Diagnose />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="处方名称："
              >
              {getFieldDecorator('recipename', {
                initialValue: recipename
              })(
                <InputBaseLine />
              )}
              </FormItem>
            </Col>
          </Row>
          <Footer>
            <SpecTable
              dataSource={dataSource}
              locale={{emptyText: '暂无中成药/西药数据' }}
              columns={columns}
              pagination={Pagination}
              rowClassName={(record, index)=>record.medicineid ? 'dotted' : 'dotted clear'} >
            </SpecTable>
            <Tip>💡提示：医保外项目以红色显示</Tip>
            <Total>合计：{parseFloat(feeAll).toFixed(2)}元</Total>
          </Footer>
          <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        </SpecForm>
      )
    }
  }
}
const SpecForm = styled(Form)`
  &&& > div > div > .ant-form-item {
    margin-bottom: -8px;
  }
`;
const SpecFormItem = styled(FormItem)`
  .ant-form-item-children {
    display: flex;
    border-bottom: 1px solid rgba(215,215,215,1);
    height: 35px;
  }
`;
const SpecSelect = styled(Select)`
  ${selectSty.blackTriangle}
`;
const InputCount = styled(Input)`
  &&& {
    ${inputSty.short};
    width: 25px;
  }
`;
const InputDays = styled(Input)`
  &&& {
    ${inputSty.short};
    width: 60px;
    text-align: left;
  }
`;
const Add = styled.span`
  color: #0A6ECB;
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
const Status = styled.span`
  color: ${props => props.status ? '#009900' : '#0A6ECB'}
`;
const Footer = styled.div`
  position: relative;
`;
const SpecTable = styled(Table)`
  ${tableSty.dottedRowTable};
  ${paginationSty.easyPagination}
  .ant-table {
    border-bottom: 1px solid #0A6ECB;
    height: 290px;
    margin-top: 20px;
  }
  .ant-table-thead th {
    color: rgb(102, 102, 102);
  }
`;
const Tip = styled.span`
  color: #339900;
  font-size: 12px;
  position: absolute;
  top: 310px;
  left: 20px;
  line-height: 35px;
`;
const Total = styled.div`
  position: absolute;
  top: 310px;
  left: 550px;
  width: 100px;
  line-height: 35px;
`;
const ChPatentMedicineForm = Form.create()(Index);

export default ChPatentMedicineForm;
/*
@作者：姜中希
@日期：2018-08-19
@描述：新增中成药/西药处方表单部分
*/
