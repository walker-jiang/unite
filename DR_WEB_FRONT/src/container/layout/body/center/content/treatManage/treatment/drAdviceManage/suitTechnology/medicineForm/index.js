import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Form, Select, Radio, Input, Row, Col, Tag } from 'antd';
import Diagnose from '../../chHerbalMedicine/herbalForm/diagnose';
import QuickAddCureItem from './quickAddCureItem';
import InputBaseLine from 'components/dr/input/basicInput';
import inputSty from 'components/antd/style/input';
import selectSty from 'components/antd/style/select';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';
import { getDiagnoseText } from 'commonFunc/transform';
import tagsSty from 'components/antd/style/tags';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
      buDiagnosisInfo: {}, // 诊断主信息对象
      buDiagnosisInfo: {}, // 诊断信息主表原始数据，修改时需要使用
      buRecipe: {}, // 原始处方信息
      data: {}, //原始医嘱信息
      deptData: [], // 执行科室数据
      // 初始化数据
      buDiagnosisList: [], // 诊断明细信息
      remark: '', // 备注说明
      miType: 1, // 0 医保外， 1医保内 默认选择医保内
      medicineData: [], // 药品数据
    }
  }
  componentWillMount(){
    this.getDiagnoseData();
    this.getDept();
    if(this.props.actionType == 'modify' || this.props.actionType == 'view'){ // 修改、查看需要初始化数据
      this.getCHMedicineAdvice(this.props.orderid);
    }
  };
  /** [getDept 执行科室数据] */
  getDept() {
    let params = {
      url: 'BaUsageController/getList',
      data: {}
    };
    let that = this;
    function success(res) {
      if(res.result){
        let deptData = res.data;
        that.setState({ deptData })
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
   * [onDelete 删除当前检验项]
   * @param  {[type]} record [当前检验项对象]
   * * @param  {[type]} medicalid [医嘱明细ID]
   * @return {[type]}        [void]
   */
  onDelete (record, medicalid) {
    let medicineData = this.state.medicineData;
    medicineData.forEach((item, index) => {
      if(record.baMedicalDtlList){ // 医嘱项
        if(item.orderSuitid == record.orderSuitid){
          if(medicalid){ // 删除医嘱明细
            item.baMedicalDtlList.forEach((itemChild, index) => {
              if(itemChild.medicalid == medicalid){
                itemChild.splice(index, 1);
              }
            });
          }else{ // 删除整个医嘱项
            item.splice(index, 1);
          }
        }
      }
      else{
        if(item.medicalid == record.medicalid){
          item.splice(index, 1);
        }
      }
    });
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
   * [addMedicineData 添加诊疗项目列表]
   * @param  {[type]} medicineItem [新增项]
   * @return {[type]}              [void]
   */
  addMedicineData (medicineItem) {
    let medicineData = this.state.medicineData;
    for(let i=0; i < medicineData.length; i++){
      if(medicineData[i].medicinename == medicineItem.medicinename){
        this.tipModal.showModal({ stressContent: '该中医适宜技术项已存在' });
        return false;
      }
    }
    medicineData.push(medicineItem);
    this.setState({ medicineData });
  }
  /** [getTableColumns 设置表格列] */
  getTableColumns(){
    let deptData = this.state.deptData;
    let columns = [{
      title: "序号",
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => index +1
    }, {
      title: "治疗项/治疗明细",
      dataIndex: 'aim',
      key: 'aim',
    }, {
      title: "执行科室",
      dataIndex: 'deptname',
      key: 'deptname',
      render: (text, record)=>(
        <SpecSelect
          defaultValue={{key: 7, label: '饭后半小时温开水送服'}}
          labelInValue={true}
          onSelect={(e)=>{this.onModifySelectValue(record.medicineid, 'usageid', 'usagename', e.key, e.label)}}>
          {
            deptData.map((item) => <Option key={item.usageid} value={item.usageid}>{item.usagename}</Option>)
          }
        </SpecSelect>
      )
    }, {
      title: "数量/单位",
      dataIndex: 'count',
      key: 'count',
      render: (text, record, index)=>
      <span>
        <InputCount onBlur={(e)=>{ record.count != e.target.value ? this.onModifyInputValue(e.target.value, record.medicineid, 'count') : ''}} defaultValue={record.count} />{record.baseUnit}
      </span>
    }, {
      title: "单价",
      dataIndex: 'unitprice',
      key: 'unitprice',
      render: (text, record, index)=>
      <span>
        <InputPrice onBlur={(e)=>{ record.unitprice != e.target.value ? this.onModifyInputValue(e.target.value, record.medicineid, 'unitprice') : ''}} defaultValue={parseFloat(record.unitprice).toFixed(2)} />
      </span>
    }, {
      title: "金额",
      dataIndex: 'payMent',
      key: 'payMent',
      render: (text, record, index)=><span>{parseFloat(record.count * record.unitprice).toFixed(2)}</span>
    }, {
      title: "备注",
      dataIndex: 'medinsrem',
      key: 'medinsrem',
      render: (text, record, index) => <InputRemark onBlur={(e)=>{ record.medinsrem != e.target.value ? this.onModifyInputValue(e.target.value, record.medicineid, 'medinsrem') : ''}} defaultValue={record.medinsrem} />
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
  render () {
    let { visiblePop, medicineData, buDiagnosisList, miType, remark } = this.state;
    const { getFieldDecorator } = this.props.form;
    console.log('medicineData' ,medicineData);
    const columns = this.getTableColumns();
    const formItemLayout = {
      labelCol: {
        xs: { span: 3 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 21 },
        sm: { span: 21 },
      },
      className: 'height',
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
      className: 'height',
      colon: false
    };
    return (
      <Form className='not-draggable' onClick={()=>{this.quickAddCureItem.hideResult()}}>
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
              label="备注/说明："
            >
            {getFieldDecorator('remark', {
              initialValue: remark
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
              label={<span><Add>➕</Add>快速添加：</span>}
              >
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
                  <QuickAddCureItem placeholder='请输入治疗项目首字母快速添加' icon='#0A6ECB' ref={ref => this.quickAddCureItem = ref} getQuickData = {this.addMedicineData.bind(this)}/>
                )}
              </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="已选项目："
            >
            {getFieldDecorator('choosedItem', {
              initialValue: ''
            })(
              <div>
                <SpecTag  closable >{'艾针'}</SpecTag>
              </div>
            )}
            </FormItem>
          </Col>
        </Row>
        <SpecTable
          dataSource={medicineData}
          locale={{emptyText: '暂无中医适宜技术数据' }}
          columns={columns} >
        </SpecTable>
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </Form>
    )
  }
}
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
    width: 35px;
    text-align: left;
  }
`;
const InputPrice = styled(Input)`
  &&& {
    ${inputSty.short};
    width: 55px;
  }
`;
const InputRemark = styled(Input)`
  &&& {
    ${inputSty.short};
    width: 100px;
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
const SpecTable = styled(Table)`
  margin-top: 20px;
  .ant-table-thead th {
    color: rgb(102, 102, 102);
  }
`;
const SpecTag = styled(Tag)`
  ${tagsSty.yelloGreen}
`;

const ChPatentMedicineForm = Form.create()(Index);

export default ChPatentMedicineForm;
/*
@作者：姜中希
@日期：2018-08-19
@描述：新增中成药/西药处方表单部分
*/
