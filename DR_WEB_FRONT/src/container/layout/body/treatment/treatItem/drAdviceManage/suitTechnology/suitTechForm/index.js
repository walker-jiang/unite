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
import { getDiagnoseText, converItemToNeeded } from 'commonFunc/transform';
import deepClone from 'commonFunc/deepClone';
import tableSty from 'components/antd/style/table';
import tagsSty from 'components/antd/style/tags';
import Icon from 'components/dr/icon';
import AcupointEdit from './acupointEdit';

const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class SuitTechForm extends Component {
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
      visible: true, // 穴位编辑弹框是否可见
      curTechDetail: {}, // 当前需要编辑适宜技术明细的穴位
    }
  }
  componentWillMount(){
    if(JSON.stringify(this.props.buOrderDtlList) != '{}'){
      let { buRecipe, buOrderDtlList, buOrdmedical, ...data } = this.props.buOrderDtlList;
      this.setState({
        examineData: buOrderDtlList.concat(buOrdmedical.buOrdmedicalSuitList),
        data: data, // 原始医嘱信息
        buOrdmedical: buOrdmedical, // 原始医嘱套对象信息
        aim: buOrdmedical.aim, // 检验目的
        miType: buOrdmedical.miType, // 医保类型
      });
    }
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
   * @param  {[type]} itemid [药品ID]
   * @param  {[type]} item       [改变的药品项]
   * @param  {[type]} orderSuitid   [医嘱套ID， 此项不为空表示修改医嘱套明细项]
   * @return {[type]}            [void]
   */
  onModifyInputValue(newValue, item){
    let examineData = this.state.examineData;
    if(item.orderSuitid && item.orderSuitid != 0){ // 医嘱套
      examineData.forEach((Dataitem, index)=>{
        if(Dataitem.orderSuitid == item.orderSuitid){
          Dataitem.count = newValue;
        }
      });
    }else{
      examineData.forEach((Dataitem, index)=>{
        if(Dataitem.itemid == item.itemid){
          Dataitem.count = newValue;
        }
      });
    }
    this.setState({ examineData });
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
    let examineData = this.state.examineData;
    examineData.forEach((Dataitem, index)=>{
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
    this.setState({ examineData });
  };
  /**
   * [delExamineData 删除当前检查项目]
   * @param  {[type]} record [当前检查项目对象]
   * @param  {[type]} itemid [医嘱套明细ID， 若为undefined则为非医嘱套项目，否则删除医嘱套明细的某一项]
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
        examineData = examineData.remove({itemid: record.itemid});
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
      if(examineData[i].buOrderDtlList){ // 医嘱套
        if(examineData[i].orderSuitid == examineItem.orderSuitid){
          this.tipModal.showModal({stressContent: '该项目项已存在'});
          return false;
        }
      }else{ // 非医嘱套
        if(examineData[i].itemid  == examineItem.medicalid){
          this.tipModal.showModal({stressContent: '该项目项已存在'});
          return false;
        }
      }
    }
    let item = converItemToNeeded(examineItem, examineData);
    let detailData = [];
    if(examineItem.buOrderDtlList){ // 医嘱套
      examineItem.buOrderDtlList.forEach((item) => {
        detailData.push(item);
      });
      this.getAcupoints(examineItem.buOrderDtlList);
    }else{ // 非医嘱套
      this.getAcupoints([examineItem]);
    }
    // let result = this.getAcupoints(detailData);
    // console.log('examineItem123', result);
    // if(result.length > 1){
    //   examineItem.buOrderDtlList = result;
    // }else{
    //   examineItem = result;
    // }
    // console.log('examineItem123', examineItem);
    examineData.push(examineItem);
    this.setState({ examineData });
  }
  /**
   * [getAcupoints 从辨证论治服务获取适宜技术对应的穴位]
   * @param  {[type]} item [适宜技术项目]
   * @return {[type]}      [undefined]
   */
  getAcupoints(list){
    let resultArray = [];
    let buDiagnosisList = this.state.buDiagnosisList;
    if(!buDiagnosisList.length){
      alert('诊断信息不能空');
      return;
    }
    let techFormItem = {
      techItem: list,
      buDiagnosisList: buDiagnosisList,
    };
    let params = {
      url: 'baAcupoint/getAcu',
      type: 'post',
      async: false,
      server_url: 'http://10.192.1.115:8765/TCMAE/',
      data: JSON.stringify(techFormItem)
    };
    let that = this;
    function success(res) {
      if(res.result){
        let result = res.data;
        list.forEach((otherItem) => {
          let sameItem = result.forEach((serviceItem, index) => {
            if(serviceItem.itemcode == otherItem.itemcode){
                let acupointNameArray = [];
                serviceItem.buImtreatprelistStAcupoints.forEach((itemChildChild) => {
                  Object.assign(itemChildChild, itemChildChild.baAcupoint);
                  acupointNameArray.push(itemChildChild.acupointName);
                });
              resultArray.push(Object.assign(otherItem, serviceItem, { AcupointNames: acupointNameArray.join('、')}));
              // console.log('otherItem12', otherItem);
            }
          });
        });
      }
    };
    ajaxGetResource(params, success);
    // console.log('list', list);
    return resultArray;
  };
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
            children: <span><Title>治疗项/治疗明细</Title>：<Item>{record.orderSuitname}</Item>/{record.itemname}</span>,
            props: {
              colSpan: 2,
            },
          };
        }else{
          return {
            children: <span>{parseInt(index/2 + 1)}</span>,
          };
        }
      }
    }, {
      title: "取穴/部位",
      dataIndex: 'spbody',
      key: 'spbody',
      width: '12%',
      render: (text, record, index) => {
        if(index%2 == 0){
          return {
            children:'',
            props: {
              colSpan: 0,
            },
          };
        }else{
          let AcupointNames = [];
          if(record.buImtreatprelistStAcupoints){
            record.buImtreatprelistStAcupoints.forEach((item) => {
              AcupointNames.push(item.acuname);
            });
          }
          return(
            <EditContainer><InputPop value={AcupointNames.join('、')}></InputPop><Edit type='edit' onClick={() => {this.handleAcupoint(record)}}/></EditContainer>
          )
        }
      }
    }, {
      title: "操作方法",
      dataIndex: 'uasge',
      key: 'uasge',
      width: '12%',
      render: (text, record, index) => {
        if(index%2 == 0){
          return '';
        }else{
          return <EditContainer><InputPop value={record.operation}></InputPop><Edit type='edit' onClick={() => {this.handleAcupoint(record)}}/></EditContainer>
        }
      }
    }, {
      title: "执行科室",
      dataIndex: 'dept',
      key: 'dept',
      width: '10%',
      render: (text, record, index)=>{
        if(index%2 == 0){
          return '';
        }else{
          return (
            <SpecSelect
              defaultValue={{key: record.deptid, label: record.deptname}}
              labelInValue={true}
              onSelect={(e)=>{this.onModifySelectValue(record.itemid, 'deptid', 'deptname', e.key, e.label, record.orderSuitid ? record.orderSuitid : '')}}>
              {
                deptData.map((item) => <Option key={item.deptid} value={item.deptid}>{item.deptname}</Option>)
              }
            </SpecSelect>
          )
        }
      }
    }, {
      title: "频次",
      dataIndex: 'frequency',
      key: 'frequency',
      render: (text, record, index)=>{
        if(index%2 == 0){
          return <span>单价：{record.unitprice}</span>;
        }else{
          return (
            <SpecSelect
              defaultValue={ frequencyData.length ? {key: frequencyData[0].deptid, label: frequencyData[0].deptname} : {key:'', label: ''}}
              labelInValue={true}
              onSelect={(e)=>{this.onModifySelectValue(record.itemid, 'deptid', 'deptname', e.key, e.label, record.orderSuitid ? record.orderSuitid : '')}}>
              {
                frequencyData.map((item) => <Option key={item.freqcode} value={item.freqcode}>{item.freqname}</Option>)
              }
            </SpecSelect>
          )
        }
      }
    }, {
      title: "天数",
      dataIndex: 'days',
      key: 'days',
      render: (text, record, index) => {
        if(index%2 == 0){
          return {
            children: <span>金额：{record.unitprice * record.count}</span>,
            props: {
              colSpan: 2,
            },
          };
        }else{
          return{
            children:(
              <span>
                <InputCount onBlur={(e)=>{ record.count != e.target.value ? this.onModifyInputValue(e.target.value, record.itemid, 'count', record.orderSuitid ? record.orderSuitid : '') : ''}} defaultValue={1} />
              </span>
            )
          }
        }
      }
    }, {
      title: "数量/单位",
      dataIndex: 'count',
      key: 'count',
      render: (text, record, index) => {
        if(index%2 == 0){
          return {
            children: <span>状态：<Status>待付款</Status></span>,
            props: {
              colSpan: 2,
            },
          };
        }else{
          return {
            children:(
              <span>
                <InputCount onBlur={(e)=>{ record.count != e.target.value ? this.onModifyInputValue(e.target.value, record) : ''}} defaultValue={1} />盒
              </span>
            )
          }
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
    let dataSource = [];
    let feeAll = 0;
    originData.forEach((item, index) => {
      if(item.buOrderDtlList){ // 医嘱套
        item.key = dataSource.length;
        item.contentDetail = '';
        item.unitprice = 0;
        item.buOrderDtlList.forEach((itemChild) => {
          // item.contentDetail += '/' + itemChild.itemname; // 取穴、部位名称拼接
          // item.unitprice += itemChild.count * itemChild.unitprice; // 医嘱套单价拼接
          itemChild.orderSuitid = item.orderSuitid;
          itemChild.orderSuitname = item.orderSuitname;
          itemChild.key = dataSource.length;
          dataSource.push(itemChild);

          let secondLine = deepClone(itemChild);
          secondLine.key = dataSource.length;
          dataSource.push(secondLine);
        });
      }
      else{ // 非医嘱套
        item.key = dataSource.length
        dataSource.push(item);
        let secondLine = deepClone(item);
        secondLine.key = dataSource.length;
        dataSource.push(secondLine);
      }
    });
    // if(dataSource.length % 8 != 0){
    //   for(let i = dataSource.length % 8; i < 8 ; i++){
    //     let item = deepClone(dataSource[dataSource.length-1]);
    //     item.key = dataSource.length;
    //     item.itemid = ''; // 空行标识
    //     dataSource.push(item)
    //   }
    // }

    // let dataSource = [{
    //   key: 1,
    //   order: '',
    //   buwei: '',
    //   fangfa: '',
    //   keshi: '单价：40.00',
    //   pinci: '',
    //   tianshu: '',
    //   shuliang: ''
    // }, {
    //   key: 2,
    //   order: 1,
    //   buwei: '迎香、风池、风池、合谷',
    //   fangfa: '毫针浅刺用泻法',
    //   keshi: '针灸',
    //   pinci: '一天一次',
    //   tianshu: '3天',
    //   shuliang: '3项'
    // }];
    return { dataSource, feeAll };
  };
  handleAcupoint(record){
    this.setState({
      curTechDetail: record
    }, ()=>{
      this.acupointEdit.handlePopOpen();
    });
  };
  modifyHerbal(tectItemDetail){
    console.log('tectItemDetail', tectItemDetail);
    let examineData = this.state.examineData;
    if(tectItemDetail.orderSuitid){
      let curData = examineData.filter(item => item.orderSuitid == tectItemDetail.orderSuitid);
      let curItem = curData[0].buOrderDtlList.filter(item => item.itemcode == tectItemDetail.itemcode)
      curItem[0].buImtreatprelistStAcupoints = tectItemDetail.buImtreatprelistStAcupoints;
      console.log('examineData', examineData);
    }
    this.setState({examineData});
  };
  render () {
    let { visiblePop, examineData, buDiagnosisList, miType, aim, visible, curTechDetail } = this.state;
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
    let openProps = {
      actionType: 'add',
      orderid: '',
      modifyHerbal: (formData)=>{ this.modifyHerbal(formData.formData) },
      buOrderDtlList: curTechDetail,
    };
    console.log('curTechDetail', curTechDetail);
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
                            examineData.map((item, index) => <SpecTag onClose={(e) => {e.preventDefault();this.delExamineData(item)}} closable key={index} id={item.buOrderDtlList ? item.orderSuitid : item.itemid}>{item.buOrderDtlList ? item.orderSuitname : item.itemid}</SpecTag>)
                          }
                        </div>
                      )}
                    </FormItem>
                  </Col>
                </SpecRow>
                <Footer>
                  <SpecTable
                    dataSource={dataSource}
                    locale={{emptyText: '暂无项目数据' }}
                    columns={columns}
                    pagination={Pagination}>
                  </SpecTable>
                  <Tip>💡提示：医保外项目以红色显示</Tip>
                  <Total>合计：{parseFloat(feeAll).toFixed(2)}元</Total>
                </Footer>
                <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
        </SpecForm>
        <AcupointEdit ref={ ref => { this.acupointEdit = ref }} {...openProps} ></AcupointEdit>
      </div>
    )
  }
}
const SpecForm = styled(Form)`
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const Title = styled.span`
  color: #0A6ECB;
`;
const Item = styled.span`
  color: #F8D17A;
`;
const EditContainer = styled.div`
  position: relative;
`;
const InputPop = styled(Input)`
  &&&.ant-input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #CCCCCC;
    border-radius: 0px;
    width: 200px;
  }
  &:focus {
    border: none;
  }
`;
const Edit = styled(Icon)`
  position: absolute;
  right: 0px;
  top: 10px;
  width: 25px;
  height: 18px;
`;

const ChPatentMedicineForm = Form.create()(SuitTechForm);

export default ChPatentMedicineForm;
/*
@作者：姜中希
@日期：2018-08-21
@描述：新增检验申请单表单部分
*/
