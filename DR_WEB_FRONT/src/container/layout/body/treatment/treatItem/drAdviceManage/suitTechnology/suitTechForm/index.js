import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Form, Select, Radio, Input, Row, Col, Modal, Tag } from 'antd';
import Diagnose from '../../chHerbalMedicine/herbalForm/diagnose';
import QuickAddSuitTechItem from './quickAddSuitTechItem';
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
import paginationSty from 'components/antd/style/pagination';
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
      buOrdmedical: {}, // 医嘱套对象原始属于保存保单部分数据修改时需要
      data: {}, //原始医嘱信息，修改时需要使用
      deptData: [], // 执行科室数据
      frequencyData: [],  // 频次下拉数据
      feeAll: 0, // 合计费用
      // 初始化数据
      buDiagnosisList: [], // 诊断明细信息
      aim: '', // 适宜技术目的
      miType: '1', // 0 医保外， 1医保内 默认选择医保内
      suitTechData: [], // 适宜技术项目数据
      visible: true, // 穴位编辑弹框是否可见
      curTechDetail: {}, // 当前需要编辑适宜技术明细的穴位
    }
  }
  componentWillMount(){
    this.getDiagnoseData();
    this.getDept();
    this.getFrequency();
    if(this.props.actionType == 'modify' || this.props.actionType == 'view'){ // 修改、查看需要初始化数据
      this.getSuitTechData(this.props.orderid);
    }else{ // 添加可以初始化数据
      if(JSON.stringify(this.props.attachOrder) != '{}'){
        let { buOrderDtlList = [], buOrdmedical } = this.props.attachOrder;
        let { buOrdmedicalSuitList = [], ...Recipe } = buOrdmedical;
        this.setState({
          suitTechData: buOrderDtlList.concat(buOrdmedicalSuitList),
          aim: Recipe.aim,
          miType: Recipe.miType,
        });
      }
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
  getSuitTechData(orderid){
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
        let suitTechData = buOrderDtlList.concat(buOrdmedical.buOrdmedicalSuitList);
        suitTechData.forEach((item) => {
          if(item.buOrderDtlList){ // 医嘱套
            item.buOrderDtlList.forEach((itemChild) => {
              let buImtreatprelistStAcupoints = [];
              let buImtreatprelistStAcupointNames = [];
              if(itemChild.spbody){
                buImtreatprelistStAcupointNames = itemChild.spbody.split("、")
              }
              buImtreatprelistStAcupointNames.forEach((itemChildChild, index) => {
                let obj = {
                  acudesc: itemChildChild,
                  acuid: index,
                  acuname: itemChildChild
                };
                buImtreatprelistStAcupoints.push(obj);
              });
              itemChild.buImtreatprelistStAcupoints = buImtreatprelistStAcupoints;
            });
            // that.getAcupoints(item.buOrderDtlList);
          }else{ // 非医嘱套
            if(item.spbody){
              // buImtreatprelistStAcupointNames = itemChild.spbody.split("、")
            }
            // that.getAcupoints([item]);
          }
        });
        that.setState({
          suitTechData: suitTechData,
          // buRecipe: buRecipe, // 原始处方信息
          data: data, // 原始医嘱信息
          buOrdmedical: buOrdmedical, // 原始医嘱套对象信息
          aim: buOrdmedical.aim, // 适宜技术目的
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
    let suitTechData = this.state.suitTechData;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        formData = values;
        console.log('Received values of form: ', values);
      }
    });
    return {formData, suitTechData}
  }
  /**
   * [onModifyInputValue 表格输入框值改变后改变数据源的函数]
   * @param  {[type]} newValue   [新值]
   * @param  {[type]} record    [药品明细项目]
   * @param  {[type]} key       [改变的药品项]
   * @return {[type]}            [undefined]
   */
  onModifyInputValue(newValue, record, key){
    let suitTechData = this.state.suitTechData;
    if(record.orderSuitid){ // 医嘱套
      suitTechData.map((Dataitem, index)=>{
        if(Dataitem.orderSuitid == record.orderSuitid){
          if(Dataitem.buOrderDtlList){
            Dataitem.buOrderDtlList.map((DataItemChild) => {
              if(DataItemChild.itemid == record.itemid){
                DataItemChild[key] = newValue;
              }
            });
          }
        }
      });
    }else{
      suitTechData.map((Dataitem, index)=>{
        if(Dataitem.itemid == record.itemid){
          Dataitem[key] = newValue;
        }
      });
    }
    this.setState({ suitTechData });
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
    let suitTechData = this.state.suitTechData;
    suitTechData.forEach((Dataitem, index)=>{
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
    this.setState({ suitTechData });
  };
  /**
   * [delSuitTechData 删除当前检查项目]
   * @param  {[type]} record [当前检查项目对象]
   * @param  {[type]} itemid [医嘱套明细ID， 若为undefined则为非医嘱套项目，否则删除医嘱套明细的某一项]
   * @return {[type]}        [void]
   */
  delSuitTechData(record) {
    let that = this;
    let suitTechData = this.state.suitTechData;
    if(record.orderSuitid){
      confirm({
        title: '该项属于医嘱套，继续执行将删除整个医嘱套',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          suitTechData = suitTechData.remove({orderSuitid: record.orderSuitid});
          that.setState({suitTechData})
        }
      });
    }else{
        suitTechData = suitTechData.remove({itemid: record.itemid});
        that.setState({suitTechData})
    }
  }
  /**
   * [addSuitTechData 添加适宜技术项目列表]
   * @param  {[type]} medicineItem [新增项]
   * @return {[type]}              [void]
   */
  addSuitTechData (examineItem) {
    let suitTechData = this.state.suitTechData;
    for(let i=0; i < suitTechData.length; i++){
      if(suitTechData[i].buOrderDtlList){ // 医嘱套
        if(suitTechData[i].orderSuitid == examineItem.orderSuitid){
          this.tipModal.showModal({stressContent: '该项目项已存在'});
          return false;
        }
      }else{ // 非医嘱套
        if(suitTechData[i].itemid  == examineItem.medicalid){
          this.tipModal.showModal({stressContent: '该项目项已存在'});
          return false;
        }
      }
    }
    let item = converItemToNeeded(examineItem, suitTechData);
    if(examineItem.buOrderDtlList){ // 医嘱套， 这里将医嘱明细项目直接操作， 由于是引用类型的变量可直接引起变化
      this.getAcupoints(examineItem.buOrderDtlList);
    }else{ // 非医嘱套， 这里将医嘱明细项目直接操作， 由于是引用类型的变量可直接引起变化
      this.getAcupoints([examineItem]);
    }
    suitTechData.push(examineItem);
    this.setState({ suitTechData });
  }
  /**
   * [getAcupoints 从辨证论治服务获取适宜技术对应的穴位]
   * @param  {[type]} item [适宜技术项目]
   * @return {[type]}      [undefined]
   */
  getAcupoints(list){
    let buDiagnosisList = this.state.buDiagnosisList;
    if(!buDiagnosisList.length){
      this.tipModal.showModal({stressContent: '诊断信息为空不能匹配到相应穴位！'});
      return;
    }
    // 将诊断和适宜技术明细项发送请求出对应的穴位
    let techFormItem = {
      techItem: list,
      buDiagnosisList: buDiagnosisList,
    };
    let params = {
      url: 'baAcupoint/getAcu',
      type: 'post',
      async: false,
      server_url: config_InteLigenTreat_url+'TCMAE/',
      data: JSON.stringify(techFormItem)
    };
    let that = this;
    function success(res) {
      if(res.result){
        let result = res.data;
        /** @type {[type]} [通过便利适宜技术数据将医嘱明细下的学位对应到相应的医嘱明细中] */
        list.forEach((otherItem) => { // 遍历医嘱明细
          result.forEach((serviceItem, index) => { // 遍历返回的学位
            if(serviceItem.itemcode == otherItem.itemcode){ // 通过医嘱明细itemcode进行匹配
              if(serviceItem.buImtreatprelistStAcupoints){ // 保证穴位不为空
                let acupointNameArray = []; // 将穴位名称提取、组合
                serviceItem.buImtreatprelistStAcupoints.forEach((itemChildChild) => {
                  Object.assign(itemChildChild, itemChildChild.baAcupoint); // 为了和穴位编辑处查询的穴位对象对应将内层嵌套的baAcupoint放在外层
                  acupointNameArray.push(itemChildChild.acupointName);
                });
                Object.assign(otherItem, serviceItem, { spbody: acupointNameArray.join('、'), usagename: serviceItem.operation ? serviceItem.operation : '无'}); // 将穴位名称、穴位对应加入对应的医嘱明细中
              }else{
                serviceItem.buImtreatprelistStAcupoints = [];
                Object.assign(otherItem, serviceItem, { spbody: '无', usagename: serviceItem.operation ? serviceItem.operation : '无'});
              }
            }
          });
        });
      }
    };
    ajaxGetResource(params, success);
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
          return(
            <EditContainer><InputPop value={record.spbody}></InputPop><Edit type='edit' onClick={() => {this.handleAcupoint(record)}}/></EditContainer>
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
          return <EditContainer><InputPop value={record.usagename ? record.usagename : '无'}></InputPop><Edit type='edit' onClick={() => {this.handleAcupoint(record)}}/></EditContainer>
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
              value={deptData.length ? ( record.deptid ? { key:record.deptid, label: record.deptname } : { key: deptData[0].deptid, label: deptData[0].deptname }) : {key: '', label: ''}}
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
              value={ frequencyData.length ? ( record.freqid ? {key:record.freqid, label: record.freqname} : {key: frequencyData[0].freqcode, label: frequencyData[0].freqname}) : {key:'', label: ''}}
              labelInValue={true}
              onSelect={(e)=>{this.onModifySelectValue(record.itemid, 'freqid', 'freqname', e.key, e.label, record.orderSuitid ? record.orderSuitid : '')}}>
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
            children: <span>金额：{parseFloat(record.unitprice * record.count).toFixed(2)}</span>,
            props: {
              colSpan: 2,
            },
          };
        }else{
          return{
            children:(
              <span>
                <InputCount onBlur={(e)=>{ record.count != e.target.value ? this.onModifyInputValue(e.target.value, record, 'takedays') : ''}} value={record.takedays ? record.takedays : 1 } />
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
                <InputCount onBlur={(e)=>{ record.count != e.target.value ? this.onModifyInputValue(e.target.value, record, 'count') : ''}} defaultValue={record.count ? record.count : 1 } />盒
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
          return <a onClick={() => { this.delSuitTechData(record) }}>删除</a>;
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
          feeAll +=  itemChild.count * itemChild.unitprice;
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
        feeAll +=  item.count * item.unitprice;
        dataSource.push(item);
        let secondLine = deepClone(item);
        secondLine.key = dataSource.length;
        dataSource.push(secondLine);
      }
    });
    return { dataSource, feeAll };
  };
  /**
   * [handleAcupoint 打开穴位编辑弹框]
   * @param  {[type]} record [当前明细项]
   * @return {[type]}        [undefined]
   */
  handleAcupoint(record){
    this.setState({
      curTechDetail: record
    }, ()=>{
      this.acupointEdit.handlePopOpen();
    });
  };
  /**
   * [modifyAcupoint 点击穴位修改适宜技术明细]
   * @param  {[type]} tectItemDetail [适宜技术明细]
   * @return {[type]}                [description]
   */
  modifyAcupoint(tectItemDetail){
    let suitTechData = this.state.suitTechData;
    if(tectItemDetail.orderSuitid){
      suitTechData.forEach(item => { // 遍历原始数据
        if(item.orderSuitid == tectItemDetail.orderSuitid){ // 医嘱套ID匹配
          item.buOrderDtlList.forEach(itemChild => { // 遍历医嘱明细项目
            if(itemChild.itemcode == tectItemDetail.itemcode){ // 项目ID匹配
              itemChild.deptid = tectItemDetail.execDept.key;
              itemChild.deptname = tectItemDetail.execDept.label;
              itemChild.freqid = tectItemDetail.frequency.key;
              itemChild.freqname = tectItemDetail.frequency.label;
              itemChild.takedays = tectItemDetail.takedays;
              itemChild.usagename = tectItemDetail.usagename;
              itemChild.buImtreatprelistStAcupoints = tectItemDetail.buImtreatprelistStAcupoints; // 穴位赋值
              if(itemChild.buImtreatprelistStAcupoints && itemChild.buImtreatprelistStAcupoints.length){ // 提取穴位名称
                let acupointNameArray = [];
                itemChild.buImtreatprelistStAcupoints.forEach((itemChildChild) => {
                  acupointNameArray.push(itemChildChild.acuname);
                });
                itemChild.spbody = acupointNameArray.join('、');
              }else{
                itemChild.spbody = '无';
              }
            }
          })
        }
      });
    }else{
      suitTechData.forEach(item => { // 遍历原始数据
        if(item.itemcode == tectItemDetail.itemcode){ // 非医嘱套ID匹配
          item.deptid = tectItemDetail.execDept.key;
          item.deptname = tectItemDetail.execDept.label;
          item.freqid = tectItemDetail.frequency.key;
          item.freqname = tectItemDetail.frequency.label;
          item.takedays = tectItemDetail.takedays;
          item.usagename = tectItemDetail.usagename;
          item.buImtreatprelistStAcupoints = tectItemDetail.buImtreatprelistStAcupoints; // 穴位赋值
          if(item.buImtreatprelistStAcupoints){ // 提取穴位名称
            let acupointNameArray = [];
            item.buImtreatprelistStAcupoints.forEach((itemChildChild) => {
              acupointNameArray.push(itemChildChild.acuname);
            });
            item.spbody = acupointNameArray.join('、');
          }else{
            item.spbody = '无';
          }
        }
      });
    }
    this.setState({suitTechData});
  };
  render () {
    let { visiblePop, suitTechData, buDiagnosisList, miType, aim, visible, curTechDetail } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {dataSource, feeAll} = this.getTableDataSource(deepClone(suitTechData));
    const columns = this.getTableColumns();
    const Pagination = {
      simple: true,
      pageSize: 6,
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
      modifyAcupoint: (formData)=>{ this.modifyAcupoint(formData.formData) },
      buOrderDtlList: curTechDetail,
    };
    return (
      <div>
        <SpecForm className='not-draggable' onClick={()=>{this.quickAddSuitTechItem.hideResult()}}>
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
                      <QuickAddSuitTechItem placeholder='请输入治疗项目首字母快速添加' icon='#0A6ECB' ref={ref => this.quickAddSuitTechItem = ref} getQuickData = {this.addSuitTechData.bind(this)}/>
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
                        suitTechData.map((item, index) => <SpecTag onClose={(e) => {e.preventDefault();this.delSuitTechData(item)}} closable key={index} id={item.buOrderDtlList ? item.orderSuitid : item.itemid}>{item.buOrderDtlList ? item.orderSuitname : item.itemname}</SpecTag>)
                      }
                    </div>
                  )}
                </FormItem>
              </Col>
            </SpecRow>
            <Footer>
              <SpecTable
                dataSource={dataSource}
                locale={{emptyText: '暂无适宜技术项目数据' }}
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
  ${paginationSty.easyPagination};
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
@日期：2018-10-22
@描述：新增适宜适宜技术表单部分
*/
