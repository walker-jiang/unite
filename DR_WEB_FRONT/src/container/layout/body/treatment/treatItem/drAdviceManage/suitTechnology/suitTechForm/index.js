import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Form, Select, Radio, Input, Row, Col, Modal, Tag } from 'antd';
import Diagnose from '../../chHerbalMedicine/herbalForm/diagnose';
import QuickAddExamineItem from './quickAddExamineItem';
import InputBaseLine from 'components/dr/input/basicInput';
import 'components/antd/style/pagination.less';
import inputSty from 'components/antd/style/input';
import selectSty from 'components/antd/style/select';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import TipModal from 'components/dr/modal/tip';
import { getDiagnoseText } from 'commonFunc/transform';
import deepClone from 'commonFunc/deepClone';
import tableSty from 'components/antd/style/table';
import tagsSty from 'components/antd/style/tags';
import Icon from 'components/dr/icon';
import AcupointEdit from '../acupointEdit';

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
      frequencyData: [],  // 频次下拉数据
      feeAll: 0, // 合计费用
      // 初始化数据
      buDiagnosisList: [], // 诊断明细信息
      aim: '', // 检验目的
      miType: '1', // 0 医保外， 1医保内 默认选择医保内
      examineData: [], // 检验项目数据
      visible: false, // 穴位编辑是否可用
    }
  }
  componentWillMount(){
    let buOrderDtlList = this.props.buOrderDtlList;
    this.setState({
      ...buOrderDtlList
    });
    this.getDiagnoseData();
    this.getDept();
    this.getFrequency();
    if(this.props.actionType == 'modify' || this.props.actionType == 'view'){ // 修改、查看需要初始化数据
      this.getExamineData(this.props.orderid);
    }
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
  /** [getDept 执行科室数据] */
  getDept() {
    let params = {
      url: 'BaDepartmentController/getList',
      server_url: config_login_url,
      data: {
        keyword: 1,
        orgid: 10000
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
  getExamineData(orderid){
    let params = {
      url: 'BuOrderController/getData',
      data: {
        orderid: orderid
      }
    };
    let that = this;
    function callBack(res) {
      if(res.result){
        let { buRecipe, buOrderDtlList, buOrdmedical, ...data } = res.data;
        buOrderDtlList.forEach((item)=>{
          item.medicalcode = item.itemcode;
          item.medicalid = item.itemid;
          item.medicalname = item.itemname;
          item.medinsrem = item.remarks;
        });
        buOrdmedical.buOrdmedicalSuitList.forEach((item) => {
          item.buOrderDtlList.forEach((itemChild) => {
            itemChild.medicalcode = itemChild.itemcode;
            itemChild.medicalname = itemChild.itemname;
            itemChild.medicalid = itemChild.itemid;
            itemChild.medinsrem = itemChild.remarks;
          })
          item.baMedicalDtlList = item.buOrderDtlList;
        });

        that.setState({
          examineData: buOrderDtlList.concat(buOrdmedical.buOrdmedicalSuitList),
          // buRecipe: buRecipe, // 原始处方信息
          data: data, // 原始医嘱信息
          buOrdmedical: buOrdmedical, // 原始医嘱套对象信息
          aim: buOrdmedical.aim, // 检验目的
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
    let examineData = this.state.examineData;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        formData = values;
        console.log('Received values of form: ', values);
      }
    });
    return {formData, examineData}
  }
  /**
   * [onModifyInputValue 表格输入框值改变后改变数据源的函数]
   * @param  {[type]} newValue   [新值]
   * @param  {[type]} medicalid [药品ID]
   * @param  {[type]} item       [改变的药品项]
   * @param  {[type]} orderSuitid   [医嘱套ID， 此项不为空表示修改医嘱套明细项]
   * @return {[type]}            [void]
   */
  onModifyInputValue(newValue, medicalid, item, orderSuitid){
    let examineData = this.state.examineData;
    examineData.forEach((Dataitem, index)=>{
      if(orderSuitid){ // 修改医嘱套明细项
        if(Dataitem.orderSuitid == orderSuitid){
          Dataitem.baMedicalDtlList.forEach((itemChild, index) => {
            itemChild[item] = itemChild.medicalid == medicalid ? newValue : itemChild[item];
          });
        }
      }else{ // 修改非医嘱套项
        Dataitem[item] = Dataitem.medicalid == medicalid ? newValue : Dataitem[item];
      }
    });
    this.setState({ examineData });
  };
  /**
   * [onModifySelectValue 表格中下拉框选项改变后触发的函数]
   * @param  {[type]} medicalid [当前药品ID]
   * @param  {[type]} idItem     [当前药品项ID]
   * @param  {[type]} nameItem   [当前药品项名称]
   * @param  {[type]} newID      [新药品项ID]
   * @param  {[type]} newName    [新药品项名称]
   * @param  {[type]} orderSuitid    [医嘱套ID， 此项不为空表示修改医嘱套明细项]
   * @return {[type]}            [void]
   */
  onModifySelectValue(medicalid, idItem, nameItem, newID, newName, orderSuitid){
    let examineData = this.state.examineData;
    examineData.forEach((Dataitem, index)=>{
      if(orderSuitid){ // 修改医嘱套明细项
        if(Dataitem.orderSuitid == orderSuitid){
          Dataitem.baMedicalDtlList.forEach((itemChild, index) => {
            itemChild[idItem] = itemChild.medicalid == medicalid ? newID : itemChild[idItem];
            itemChild[nameItem] = itemChild.medicalid == medicalid ? newName : itemChild[nameItem];
          });
        }
      }else{ // 修改非医嘱套项
        Dataitem[idItem] = Dataitem.medicalid == medicalid ? newID : Dataitem[idItem];
        Dataitem[nameItem] = Dataitem.medicalid == medicalid ? newName : Dataitem[nameItem];
      }
    });

    medicineData.forEach((Dataitem, index)=>{

    });
    this.setState({ examineData });
  };
  /**
   * [delExamineData 删除当前检查项目]
   * @param  {[type]} record [当前检查项目对象]
   * @param  {[type]} medicalid [医嘱套明细ID， 若为undefined则为非医嘱套项目，否则删除医嘱套明细的某一项]
   * @return {[type]}        [void]
   */
  delExamineData(record) {
    let that = this;
    let examineData = this.state.examineData;
    if(record.orderSuitid){
      confirm({
        title: '该项属于医嘱套，继续执行将删除整个医嘱套',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          examineData = examineData.remove({orderSuitid: record.orderSuitid});
          that.setState({examineData})
        }
      });
    }else{
        examineData = examineData.remove({medicalid: record.medicalid});
        that.setState({examineData})
    }
  }
  /**
   * [addExamineData 添加检验项目列表]
   * @param  {[type]} medicineItem [新增项]
   * @return {[type]}              [void]
   */
  addExamineData (examineItem) {
    let examineData = this.state.examineData;
    for(let i=0; i < examineData.length; i++){
      if(examineData[i].baMedicalDtlList){ // 医嘱套
        if(examineData[i].orderSuitid == examineItem.orderSuitid){
          this.tipModal.showModal({stressContent: '该检验项已存在'});
          return false;
        }
      }else{ // 非医嘱套
        if(examineData[i].medicalid == examineItem.medicalid){
          this.tipModal.showModal({stressContent: '该检验项已存在'});
          return false;
        }
      }
    }
    examineData.push(examineItem);
    this.setState({ examineData });
  }
  /** [getTableColumns 设置表格列] */
  getTableColumns(){
    let deptData = this.state.deptData;
    let frequencyData = this.state.frequencyData;
    let columns = [{
      title: "序号",
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => {
        if(index%2 == 0){
          return {
            children: <span><Title>治疗项/治疗明细</Title>：<Item>针法/毫针法</Item>/毫针治疗</span>,
            props: {
              colSpan: 2,
            },
          };
        }else{
          return <span>{text}</span>;
        }
      }
    }, {
      title: "取穴/部位",
      dataIndex: 'buwei',
      key: 'buwei',
      render: (text, record, index) => {
        if(index%2 == 0){
          return {
            children:'',
            props: {
              colSpan: 0,
            },
          };
        }else{
          return <EditDiv><Label>{text}</Label><Edit type='edit' /></EditDiv>;
        }
      }
    }, {
      title: "操作方法",
      dataIndex: 'fangfa',
      key: 'fangfa',
      render: (text, record, index) => {
        if(index%2 == 0){
          return '';
        }else{
          return <EditDiv><Label>{text}</Label><Edit type='edit' /></EditDiv>;
        }
      }
    }, {
      title: "执行科室",
      dataIndex: 'keshi',
      key: 'keshi',
      render: (text, record, index)=>{
        if(index%2 == 0){
          return '';
        }else{
          return (
            <SpecSelect
              defaultValue={{key: deptData.deptid, label: deptData.deptname}}
              labelInValue={true}
              onSelect={(e)=>{this.onModifySelectValue(record.medicalid, 'deptid', 'deptname', e.key, e.label, record.orderSuitid ? record.orderSuitid : '')}}>
              {
                deptData.map((item) => <Option key={item.deptid} value={item.deptid}>{item.deptname}</Option>)
              }
            </SpecSelect>
          )
        }
      }
    }, {
      title: "频次",
      dataIndex: 'pinci',
      key: 'pinci',
      render: (text, record, index)=>{
        if(index%2 == 0){
          return '';
        }else{
          return (
            <SpecSelect
              defaultValue={{key: frequencyData.deptid, label: frequencyData.deptname}}
              labelInValue={true}
              onSelect={(e)=>{this.onModifySelectValue(record.medicalid, 'deptid', 'deptname', e.key, e.label, record.orderSuitid ? record.orderSuitid : '')}}>
              {
                frequencyData.map((item) => <Option key={item.freqcode} value={item.freqcode}>{item.freqname}</Option>)
              }
            </SpecSelect>
          )
        }
      }
    }, {
      title: "天数",
      dataIndex: 'tianshu',
      key: 'tianshu',
    }, {
      title: "数量/单位",
      dataIndex: 'shuliang',
      key: 'shuliang',
      render: (text, record, index) => {
        if(index%2 == 0){
          return {
            children: <span>状态：<Status>待付款</Status></span>,
            props: {
              colSpan: 2,
            },
          };
        }else{
          return
            <div>
              <InputCount
                onBlur={(e)=>{ record.count != e.target.value ? this.onModifyInputValue(e.target.value, record.medicalid, 'count', record.orderSuitid ? record.orderSuitid : '') : ''}}
                defaultValue={1} />盒
           </div>
        }
      }
    }, {
      title: "操作",
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record, index) => {
        if(index%2 == 0){
          return {
            children: '',
            props: {
              colSpan: 0,
            },
          };
        }else{
          return <a onClick={() => { this.delExamineData(record) }}>删除</a>;
        }
      }
    }];
    return columns;
  };
  /**
   * [getTableDataSource 将原始数据匹配成表格数据，即医嘱套拆分]
   * @param  {[type]} originData [原始数据]
   * @return {[type]}            [void]
   */
  getTableDataSource(originData){
    // let dataSource = [];
    let feeAll = 0;
    // originData.forEach((item) => {
    //   if(item.baMedicalDtlList){ // 医嘱套
    //     item.baMedicalDtlList.forEach((itemChild) => {
    //       itemChild.key = dataSource.length
    //       itemChild.orderSuitid = item.orderSuitid;
    //       itemChild.orderSuitname = item.orderSuitname;
    //       feeAll += itemChild.count * itemChild.unitprice;
    //       dataSource.push(itemChild);
    //     });
    //
    //   }else{ // 非医嘱套
    //     item.key = dataSource.length
    //     feeAll += item.count * item.unitprice;
    //     dataSource.push(item);
    //   }
    // });
    // if(dataSource.length % 8 != 0){
    //   for(let i = dataSource.length % 8; i < 8 ; i++){
    //     let item = deepClone(dataSource[dataSource.length-1]);
    //     item.key = dataSource.length;
    //     item.medicalid = ''; // 空行标识
    //     dataSource.push(item)
    //   }
    // }
    //
    let dataSource = [{
      key: 1,
      order: '',
      buwei: '',
      fangfa: '',
      keshi: '单价：40.00',
      pinci: '',
      tianshu: '',
      shuliang: ''
    }, {
      key: 2,
      order: 1,
      buwei: '迎香、风池、风池、合谷',
      fangfa: '毫针浅刺用泻法',
      keshi: '针灸',
      pinci: '一天一次',
      tianshu: '3天',
      shuliang: '3项'
    }];
    return { dataSource, feeAll };
  };
  render () {
    let { visiblePop, examineData, buDiagnosisList, miType, aim, visible } = this.state;
    const { getFieldDecorator } = this.props.form;

    const {dataSource, feeAll} = this.getTableDataSource(deepClone(examineData));
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
      <div>
        <SpecForm className='not-draggable' onClick={()=>{this.quickAddExamineItem.hideResult()}}>
          <Row>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="诊断：">
                {getFieldDecorator('diagnose', {
                  rules: [{ required: true, message: '诊断信息为必填项!' }],
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
                        <QuickAddExamineItem placeholder='请输入治疗项目首字母快速添加' icon='#0A6ECB' ref={ref => this.quickAddExamineItem = ref} getQuickData = {this.addExamineData.bind(this)}/>
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
                            examineData.map((item, index) => <SpecTag onClose={(e) => {e.preventDefault();this.delExamineData(item)}} closable key={index} id={item.baMedicalDtlList ? item.orderSuitid : item.medicalid}>{item.baMedicalDtlList ? item.orderSuitname : item.medicalname}</SpecTag>)
                          }
                        </div>
                      )}
                    </FormItem>
                  </Col>
                </SpecRow>
                <Footer>
                  <SpecTable
                    dataSource={dataSource}
                    locale={{emptyText: '暂无检验项目数据' }}
                    columns={columns}
                    pagination={Pagination}>
                  </SpecTable>
                  <Tip>💡提示：医保外项目以红色显示</Tip>
                  <Total>合计：{parseFloat(feeAll).toFixed(2)}元</Total>
                </Footer>
                <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        </SpecForm>
        <AcupointEdit></AcupointEdit>
      </div>
    )
  }
}
const SpecForm = styled(Form)`
  display: none;
  &&& > div > div > .ant-form-item {
    margin-bottom: -8px !important;
  }
`;
const SpecRow = styled(Row)`
  max-height: 78px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
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
  ${selectSty.blackTriangle};
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
const SpecTag = styled(Tag)`
  ${tagsSty.yelloGreen}
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
  .ant-table {
    border-bottom: 1px solid #0A6ECB;
    height: 290px;
  }
  &&& .ant-table-thead > tr > th {
    border-radius: 0px;
    border-top: 1px solid red;
    border-bottom: 1px solid red;
  }
  &&& .ant-table-tbody > tr:nth-child(2n) > td {
    border-bottom: 1px dashed #CCCCCC
  }
  &&& .ant-table-tbody > tr:nth-child(2n + 1) > td {
    border-top: 8px solid white;
    border-bottom: 1px solid #CCCCCC
  }
  &&& .ant-table-tbody > tr > td {
    background-color: #F8F4E7;
  }
`;
const Title = styled.span`
  color: #0A6ECB;
`;
const Item = styled.span`
  color: #F8D17A;
`;
const EditDiv = styled.div`
  width: 200px;
  position: relative;
  padding: 16px 5px;
  padding-bottom: 30px;
  border-bottom: 1px solid #CCCCCC;
`;
const Label = styled.div`
  float: left;
  margin-bottom: 16px;
`;
const Edit = styled(Icon)`
  position: absolute;
  right: 0px;
  width: 25px;
  height: 18px;
`;
const ChPatentMedicineForm = Form.create()(Index);

export default ChPatentMedicineForm;
/*
@作者：姜中希
@日期：2018-08-21
@描述：新增检验申请单表单部分
*/
