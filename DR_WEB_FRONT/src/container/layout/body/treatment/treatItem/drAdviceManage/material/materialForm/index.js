import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Form, Select, Radio, Input, Row, Col, Modal, Tag } from 'antd';
import Diagnose from '../../chHerbalMedicine/herbalForm/diagnose';
import QuickAddMaterialItem from './quickAddMaterialItem';
import InputBaseLine from 'components/dr/input/basicInput';
import 'components/antd/style/pagination.less';
import inputSty from 'components/antd/style/input';
import selectSty from 'components/antd/style/select';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';
import { getDiagnoseText, converItemToNeeded } from 'commonFunc/transform';
import deepClone from 'commonFunc/deepClone';
import tableSty from 'components/antd/style/table';
import tagsSty from 'components/antd/style/tags';
import PagenationSty from 'components/antd/style/pagination';

const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
      buDiagnosisInfo: {}, // 诊断信息主表原始数据，修改时需要使用
      buOrdmedical: {}, // 医嘱套对象原始属于
      // buRecipe: {}, // 原始处方信息
      data: {}, //原始医嘱信息
      deptData: [], // 执行科室数据
      feeAll: 0, // 合计费用
      // 初始化数据
      buDiagnosisList: [], // 诊断明细信息
      aim: '', // 材料目的
      miType: '1', // 0 医保外， 1医保内 默认选择医保内
      MaterialData: [], // 材料项目数据
    }
  }
  componentWillMount(){
    this.getDiagnoseData();
    this.getDept();
    if(this.props.actionType == 'modify' || this.props.actionType == 'view'){ // 修改、查看需要初始化数据
      this.getMaterialData(this.props.orderid);
    }else{ // 添加可以初始化数据
      if(JSON.stringify(this.props.attachOrder) != '{}'){
        let { buOrderDtlList = [], buOrdmedical } = this.props.attachOrder;
        let { buOrdmedicalSuitList = [], ...Recipe } = buOrdmedical;
        this.setState({
          MaterialData: buOrderDtlList.concat(buOrdmedicalSuitList),
          aim: Recipe.aim,
          miType: Recipe.miType,
        });
      }
    }
  };
  /** [getDept 执行科室数据] */
  getDept() {
    let params = {
      url: 'BaDepartmentController/getList',
      server_url: config_login_url,
      data: {
        keyword: 1
      }
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
  getMaterialData(orderid){
    let params = {
      url: 'BuOrderController/getData',
      data: {
        orderid: orderid
      }
    };
    if(this.props.syndrome){ // 辨证论治添加处方
      params.server_url = config_InteLigenTreat_url+'TCMAE/';
    }
    let that = this;
    function callBack(res) {
      if(res.result){
        let { buRecipe, buOrderDtlList, buOrdmedical, ...data } = res.data;
        that.setState({
          MaterialData: buOrderDtlList.concat(buOrdmedical.buOrdmedicalSuitList),
          data: data, // 原始医嘱信息
          buOrdmedical: buOrdmedical, // 原始医嘱套对象信息
          aim: buOrdmedical.aim, // 材料目的
          miType: buOrdmedical.miType, // 医保类型
        });
      }
    };
    ajaxGetResource(params, callBack);
  };

  /** [handleSubmit 获取表单数据] */
  handleSubmit = (e) => {
    e.preventDefault();
    let formData = new Object();
    let MaterialData = this.state.MaterialData;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        formData = values;
        console.log('Received values of form: ', values);
      }
    });
    return {formData, MaterialData}
  }
  /**
   * [onModifyInputValue 表格输入框值改变后改变数据源的函数]
   * @param  {[type]} newValue   [新值]
   * @param  {[type]} itemid [药品ID]
   * @param  {[type]} item       [改变的药品项]
   * @param  {[type]} orderSuitid   [医嘱套ID， 此项不为空表示修改医嘱套明细项]
   * @return {[type]}            [void]
   */
  onModifyInputValue(newValue, itemid, item, orderSuitid){
    console.log('newValue, itemid, item, orderSuitid', newValue, itemid, item, orderSuitid);
    let MaterialData = this.state.MaterialData;
    MaterialData.forEach((Dataitem, index)=>{
      if(orderSuitid){ // 修改医嘱套明细项
        if(Dataitem.orderSuitid == orderSuitid){
          Dataitem.buOrderDtlList.forEach((itemChild, index) => {
            itemChild[item] = itemChild.itemid == itemid ? newValue : itemChild[item];
          });
        }
      }else{ // 修改非医嘱套项
        Dataitem[item] = Dataitem.itemid == itemid ? newValue : Dataitem[item];
      }
    });
    this.setState({ MaterialData });
  };
  /**
   * [onModifySelectValue 表格中下拉框选项改变后触发的函数]
   * @param  {[type]} itemid [当前药品ID]
   * @param  {[type]} idItem     [当前药品项ID]
   * @param  {[type]} nameItem   [当前药品项名称]
   * @param  {[type]} newID      [新药品项ID]
   * @param  {[type]} newName    [新药品项名称]
   * @param  {[type]} orderSuitid    [医嘱套ID， 此项不为空表示修改医嘱套明细项]
   * @return {[type]}            [void]
   */
  onModifySelectValue(itemid, idItem, nameItem, newID, newName, orderSuitid){
    let MaterialData = this.state.MaterialData;
    MaterialData.forEach((Dataitem, index)=>{
      if(orderSuitid){ // 修改医嘱套明细项
        if(Dataitem.orderSuitid == orderSuitid){
          Dataitem.buOrderDtlList.forEach((itemChild, index) => {
            itemChild[idItem] = itemChild.itemid == itemid ? newID : itemChild[idItem];
            itemChild[nameItem] = itemChild.itemid == itemid ? newName : itemChild[nameItem];
          });
        }
      }else{ // 修改非医嘱套项
        Dataitem[idItem] = Dataitem.itemid == itemid ? newID : Dataitem[idItem];
        Dataitem[nameItem] = Dataitem.itemid == itemid ? newName : Dataitem[nameItem];
      }
    });

    medicineData.forEach((Dataitem, index)=>{

    });
    this.setState({ MaterialData });
  };
  /**
   * [MaterialData 删除当前材料项目]
   * @param  {[type]} record [当前材料项目对象]
   * @param  {[type]} itemid [医嘱套明细ID， 若为undefined则为非医嘱套项目，否则删除医嘱套明细的某一项]
   * @return {[type]}        [void]
   */
  delMaterialData(record) {
    let that = this;
    let MaterialData = this.state.MaterialData;
    if(record.orderSuitid){
      confirm({
        title: '该项属于医嘱套，继续执行将删除整个医嘱套',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          MaterialData = MaterialData.remove({orderSuitid: record.orderSuitid});
          that.setState({MaterialData})
        }
      });
    }else{
        MaterialData = MaterialData.remove({itemid: record.itemid});
        that.setState({MaterialData})
    }
  }
  /**
   * [addMaterialData 添加材料项目列表]
   * @param  {[type]} medicineItem [新增项]
   * @return {[type]}              [void]
   */
  addMaterialData (MaterialItem) {
    let MaterialData = this.state.MaterialData;
    for(let i=0; i < MaterialData.length; i++){
      if(MaterialData[i].buOrderDtlList){ // 医嘱套
        if(MaterialData[i].orderSuitid == MaterialItem.orderSuitid){
          this.tipModal.showModal({ stressContent: '该材料项已存在' });
          return false;
        }
      }else{ // 非医嘱套
        if(MaterialData[i].itemid == MaterialItem.medicalid){
          this.tipModal.showModal();
          return false;
        }
      }
    }
    let item = converItemToNeeded(MaterialItem, MaterialData);
    MaterialData.push(item);
    this.setState({ MaterialData });
  }
  /** [getTableColumns 设置表格列] */
  getTableColumns(){
    let deptData = this.state.deptData;
    let columns = [{
      title: "序号",
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => <span>{index + 1}</span>
    }, {
      title: "材料明细",
      dataIndex: 'itemname',
      key: 'itemname',
      render: (text, record, index) => record.orderSuitid ? <span><Stress>{record.orderSuitname}</Stress>/{record.itemname}</span> : <span>{record.itemname}</span>
    }, {
      title: "执行科室",
      dataIndex: 'deptname',
      key: 'deptname',
      render: (text, record)=>(
        <SpecSelect
          defaultValue={{key: record.deptid, label: record.deptname}}
          labelInValue={true}
          onSelect={(e)=>{this.onModifySelectValue(record.itemid, 'depaid', 'deptname', e.key, e.label, record.orderSuitid ? record.orderSuitid : '')}}>
          {
            deptData.map((item) => <Option key={item.deptid} value={item.deptid}>{item.deptname}</Option>)
          }
        </SpecSelect>
      )
    }, {
      title: "数量/单位",
      dataIndex: 'count',
      key: 'count',
      render: (text, record, index)=>
      <span>
        <InputCount onBlur={(e)=>{ record.count != e.target.value ? this.onModifyInputValue(e.target.value, record.itemid, 'count', record.orderSuitid ? record.orderSuitid : '') : ''}} defaultValue={record.count} />{record.baseUnitDic}
      </span>
    }, {
      title: "单价",
      dataIndex: 'unitprice',
      key: 'unitprice',
      render: (text, record, index)=> <InputPrice onBlur={(e)=>{ record.unitprice != e.target.value ? this.onModifyInputValue(e.target.value, record.itemid, 'unitprice', record.orderSuitid) : ''}} defaultValue={parseFloat(record.unitprice).toFixed(2)} />
    }, {
      title: "金额",
      dataIndex: 'payMent',
      key: 'payMent',
      render: (text, record, index)=><span>{parseFloat(record.count * record.unitprice).toFixed(2)}</span>
    }, {
      title: "备注",
      dataIndex: 'remarks',
      key: 'remarks',
      render: (text, record, index) => <InputRemark onBlur={(e)=>{ record.remarks != e.target.value ? this.onModifyInputValue(e.target.value, record.itemid, 'remarks', record.orderSuitid ? record.orderSuitid : '') : ''}} defaultValue={record.remarks} />
    }, {
      title: "状态≡",
      dataIndex: 'statusValue',
      key: 'statusValue',
      render: (value, record, index)=><Status status={record.statusValue}>{record.statusValue ? '• 已缴费' : '• 待缴费'}</Status>
    }, {
      title: "操作",
      dataIndex: 'operate',
      key: 'operate',
      render: (value, record, index)=> <a onClick={() => { this.delMaterialData(record) }}>删除</a>
    }];
    return columns;
  };
  /**
   * [getTableDataSource 将原始数据匹配成表格数据，即医嘱套拆分]
   * @param  {[type]} originData [原始数据]
   * @return {[type]}            [void]
   */
  getTableDataSource(originData){
    let dataSource = [];
    let feeAll = 0;
    originData.forEach((item) => {
      if(item.buOrderDtlList){ // 医嘱套
        item.buOrderDtlList.forEach((itemChild) => {
          itemChild.key = dataSource.length
          itemChild.orderSuitid = item.orderSuitid;
          itemChild.orderSuitname = item.orderSuitname;
          feeAll += itemChild.count * itemChild.unitprice;
          dataSource.push(itemChild);
        });

      }else{ // 非医嘱套
        item.key = dataSource.length
        feeAll += item.count * item.unitprice;
        dataSource.push(item);
      }
    });
    if(dataSource.length % 8 != 0){
      for(let i = dataSource.length % 8; i < 8 ; i++){
        let item = deepClone(dataSource[dataSource.length-1]);
        item.key = dataSource.length;
        item.itemid = '空'; // 空行标识
        dataSource.push(item)
      }
    }
    return { dataSource, feeAll };
  };
  render () {
    let { visiblePop, MaterialData, buDiagnosisList, miType, aim } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {dataSource, feeAll} = this.getTableDataSource(deepClone(MaterialData));
    const columns = this.getTableColumns();
    const Pagination = {
      simple: true,
      className: 'custom',
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
    return (
      <SpecForm className='not-draggable' onClick={()=>{this.quickAddMaterialItem.hideResult()}}>
        <Row>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="诊断：">
            {getFieldDecorator('diagnose', {
              initialValue: {originData: buDiagnosisList, extractionData: getDiagnoseText(buDiagnosisList)}
            })(
              <Diagnose disable={true}/>
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
            {getFieldDecorator('aim', {
              initialValue: aim
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
                {getFieldDecorator('miType',{
                  initialValue: miType
                })(
                  <SpecRadioGroup>
                    <Radio value='0'>医保外</Radio>
                    <Radio value='1'>医保内</Radio>
                  </SpecRadioGroup>
                )}
              </SpecFormItem>
          </Col>
          <Col span={16}>
            <FormItem
              {...formItemLayout}
              >
                {getFieldDecorator('addQuickly')(
                  <QuickAddMaterialItem placeholder='请输入材料项目首字母快速添加' icon='#0A6ECB' ref={ref => this.quickAddMaterialItem = ref} getQuickData = {this.addMaterialData.bind(this)}/>
                )}
              </FormItem>
          </Col>
        </Row>
        <SpecRow>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="已选项目：">
              {getFieldDecorator('choosedItem', {
                initialValue: ''
              })(
                <div>
                {
                  MaterialData.map((item, index) => <SpecTag  onClose={(e) => {e.preventDefault();this.delMaterialData(item)}} closable key={index} id={item.buOrderDtlList ? item.orderSuitid : item.itemid}>{item.buOrderDtlList ? item.orderSuitname : item.itemname}</SpecTag>)
                }
                </div>
              )}
            </FormItem>
          </Col>
        </SpecRow>
        <Footer>
          <SpecTable
            dataSource={dataSource}
            locale={{emptyText: '暂无材料项目数据' }}
            columns={columns}
            pagination={Pagination}
            rowClassName={(record, index)=>record.itemid != '空' ? 'dotted' : 'dotted clear'} >
          </SpecTable>
          <Tip>💡提示：医保外项目以红色显示</Tip>
          <Total>合计：{parseFloat(feeAll).toFixed(2)}元</Total>
        </Footer>
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </SpecForm>
    )
  }
}
const SpecForm = styled(Form)`
  &&& > div > div > .ant-form-item {
    margin-bottom: -8px !important;
  }
`;
const HiddenRow = styled(Row)`
  .ant-row {
    display: none;
  }
`;
const SpecRow = styled(Row)`
  max-height: 78px;
  overflow: hidden;
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
const Footer = styled.div`
  position: relative;
`;
const Stress = styled.span`
  color: #339900;
  font-size: 12px;
`;
const Tip = Stress.extend`
  position: absolute;
  top: 290px;
  left: 20px;
  line-height: 35px;
`;
const Total = styled.div`
  position: absolute;
  top: 290px;
  left: 550px;
  width: 100px;
  line-height: 35px;
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
  ${tableSty.dottedRowTable};
  ${PagenationSty.easyPagination};
  .ant-table {
    border-bottom: 1px solid #0A6ECB;
    height: 290px;
  }
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
@日期：2018-08-23
@描述：新增材料申请单表单部分
*/
