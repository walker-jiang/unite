import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Select, Button, Row, Col, Pagination, Radio } from 'antd';
import TempAddSubtract from './tempAddSubtract';
import QuickAddHerb from './quickAddHerb';
import Input from 'components/dr/input/basicInput';
import TipModal from 'components/dr/modal/tip';
import down from './down.png';
import up from './up.png';
import pen from './pen.png';
import selectSty from 'components/antd/style/select';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import paginationSty from 'components/antd/style/pagination';
import TableShow from './showWay/tableShow';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyData: [],  // 频次下拉数据
      deptData: [], // 执行科室数据
      operateData: [], // 操作方法下拉数据
      showResult: false,  // 初始不显示草药列表
      current: 1, // 当前页
      freq: {}, // 频次
      herbalData: [], // 草药数据
      substractData: [], // 临症加减项目
      substractID: '', // 已选临症加减ID
      acupointsData: [], // 选取穴位
      acupointDetail: {}, // 明细对象
    };
    this.delHerbal = this.delHerbal.bind(this);
    this.getAcupoints = this.getAcupoints.bind(this);
  }
  componentWillMount(){
    let { buImtreatprelistStAcupoints, ...acupointDetail } = this.props.buOrderDtlList;
    this.setState({
      acupointDetail, herbalData: buImtreatprelistStAcupoints
    });
    this.getFrequency();
    this.getDept();
    this.getOperateWay();
    // this.getSubstract();
  };
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
  /** [getOperateWay 获取操作方法数据] */
  getOperateWay(){
    let params = {
      url: 'baDatadict/getList',
      server_url: 'http://10.192.1.115:8765/TCMAE/',
      data: {
        keyword: ''
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let operateData = res.data;
        that.setState({ operateData })
      }
    };
    ajaxGetResource(params, success);
  };
  /**
   * [addHerbalData 添加草药列表]
   * @param  {[type]} quickAddData [新增项]
   * @return {[type]}              [void]
   */
  addHerbalData (herbalItem) {
    let herbalData = this.state.herbalData;
    herbalData.push(herbalItem);
    this.setState({ herbalData });
  }
  /**
   * [delHerbal 删除某个草药]
   * @param  {[type]} herbalItem [草药数据对象]
   * @return {[type]}            [void]
   */
  delHerbal(herbalItem){
    let herbalData = this.state.herbalData;
    herbalData.pop(herbalItem);
    this.setState({ herbalData });
  };
  // 保存
  handleSubmit(e){
    e.preventDefault();
    let formData = new Object();
    let herbalData = this.state.herbalData;
    let acupointDetail = this.state.acupointDetail;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        formData = Object.assign(acupointDetail, values, { buImtreatprelistStAcupoints: herbalData });
      }
    });
    return { formData }
  }
  handleChange = (value) => {
    this.setState({ substractID: value }, () => {
      this.getAcupoints(value);
    });
  }
  handleSearch = (value) => {
    this.getSubstract(value);
  }
  /** [getSubstract 获取临症加减数据] */
  getSubstract(keyword){
    let params = {
      url: 'tcmTreatdiseaseSt/getIdNameList',
      server_url: 'http://10.192.1.115:8765/TCMAE/',
      data: {
        TreatdiseaseStName: keyword
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let substractData = res.data;

        that.setState({ substractData })
      }
    };
    ajaxGetResource(params, success);
  };
  /** [getAcupoints 获取穴位数据] */
  getAcupoints(value){
    console.log('this.state.substractID', this.state.substractID);
    let params = {
      url: 'tcmTreatacupoint/getIdNameList',
      server_url: 'http://10.192.1.115:8765/TCMAE/',
      data: {
        treatId: this.state.substractID,
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let acupointsData = res.data;
        that.setState({ acupointsData })
      }
    };
    ajaxGetResource(params, success);
  };
  render () {
    let { freq, herbalData, frequencyData, current, deptData, operateData, substractData, acupointsData, acupointDetail } = this.state;
    let buOrderDtlList = this.props.buOrderDtlList;
    console.log('herbalDatasss', herbalData);
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
        xs: { span: 9 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 15 },
        sm: { span: 15 },
      },
      colon: false
    };
    const pagination = {
      simple: true,
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
            <Title>治疗项/治疗明细：
              <TitleItem>针法/毫针法/</TitleItem>
              <TitleDetail>毫针治疗</TitleDetail>
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              {...separateFormItemLayout}
              label="执行科室：">
              {getFieldDecorator('execDept', {
                initialValue: deptData.length ? ( { key: deptData[0].deptid, label: deptData[0].deptname } ) : { key: '', label: '' }
              })(
                <SpecSelect labelInValue>
                  {
                    deptData.map((item, index)=>{
                      return (
                        <Option key={index} value={item.deptid}>{item.deptname}</Option>
                      )
                    })
                  }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...separateFormItemLayout}
              label="频次：">
              {getFieldDecorator('frequency', {
                initialValue: (frequencyData.length ? {key: frequencyData[0].freqcode, label: frequencyData[0].freqname} : {key: '', label: ''})
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
          <Col span={8}>
            <FormItem
              {...separateFormItemLayout}
              label="天数：">
              {getFieldDecorator('takedays', {
                initialValue: 1,
              })(
                <SpecSelect>
                  <Option value={1}>1天</Option>
                  <Option value={2}>2天</Option>
                  <Option value={3}>3天</Option>
                  <Option value={4}>4天</Option>
                </SpecSelect>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={1}>
            <WritePen src={pen} />
          </Col>
          <Col span={23}>
            <FormItem
              {...formItemLayout}
              label="操作方法：">
              {getFieldDecorator('usage', {
                initialValue: operateData.length ? {key: operateData[0].valueid, label: operateData[0].vname} : { key:'', label: ''}
              })(
                <SpecSelect labelInValue>
                  {
                    operateData.map((item, index)=>{
                      return (
                        <Option key={index} value={item.valueid}>{item.vname}</Option>
                      )
                    })
                  }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...separateFormItemLayout}
              label="临症加减：">
              {getFieldDecorator('substract')(
                <SpecSelect
                  showSearch
                  placeholder='选择或者输入病情首字母'
                  defaultActiveFirstOption={false}
                  filterOption={false}
                  onChange={this.handleChange}
                  onSearch={this.handleSearch}
                  notFoundContent={null}
                >
                {
                  substractData.map(d => <Option key={d.id}>{d.treatdiseaseName}</Option>)
                }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...separateFormItemLayout}
              label=" ">
              {getFieldDecorator('illSymbal', {
                initialValue: acupointsData.length ? acupointsData[0].id : ''
              })(
                <SpecSelect placeholder='选择穴位' onDropdownVisibleChange={() => {alert()}}>
                {
                  acupointsData.map((item, index) => <Option key={index} value={item.id}>{item.acupointName}</Option>)
                }
                </SpecSelect>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <SpecFormItem
              {...specFormItemLayout}
              label={<span><Add>➕</Add>添加穴位/部位</span>}
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
            <QuickAddHerb placeholder='请输入穴位首字母快速添加' icon='true' ref={ref => this.quickAddHerb = ref} getQuickData = {this.addHerbalData.bind(this)}/>
          </Col>
        </Row>
        <Footer>
          <TableShow
            current={current}
            buOrderDtlList={[]}
            herbalData={ herbalData }
            delHerbal={this.delHerbal}
            dosageChange={this.dosageChange}
            usageChange={this.usageChange}
            ref={ref => this.addTableData = ref} />
          <Bottom>
            <Tip>💡提示：医保外项目以红色显示</Tip>
            <Doctor>医师：
              <Name>姜中希</Name>
            </Doctor>
            <SimplePagination {...pagination}></SimplePagination>
          </Bottom>
        </Footer>
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </SpecForm>
    )
  }
}
const Title = styled.span`
  font-size: 12px;
  color: #666666;
`;
const WritePen = styled.img`
  margin-top: 13px;
`;
const TitleItem = styled.span`
  font-size: 12px;
  color: #008000;
`;
const TitleDetail = styled.span`
  font-size: 12px;
  color: #333333;
`;
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
  margin: 15px 0px 35px 0px;
`;
const SpecFormItem = styled(FormItem)`
  .ant-form-item-children {
    display: flex;
    border-bottom: 1px solid rgba(215,215,215,1);
    height: 35px;
  }
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
const QuickAdd = styled.span`
  margin-left: 13px;
  color: #666666;
`;
const Add = styled.span`
  color: #0A6ECB;
`;
const Footer = styled.div`
  position: relative;
  margin-top: 40px;
`;
const Bottom = styled.div`
  position: absolute;
  top: 300px;
  width: 100%;
`;
const Tip = styled.span`
  font-size: 12px;
  line-height: 35px;
  margin-left: 20px;
`;
const Doctor = styled.div`
  float: right;
  width: 100px;
  line-height: 35px;
`;
const Name = styled.span`
  text-decoration: underline;
`;
const SimplePagination = styled(Pagination)`
  ${paginationSty.easyPagination};
  &&& {
    margin-top: 6px;
    float: right;
  }
  &&& > .ant-pagination-next a , &&& > .ant-pagination-prev a, &&& > .ant-pagination-simple-pager{
    color: rgb(178, 20, 20) !important;
  }
  &&& > .ant-pagination-prev::before {
    color: rgb(178, 20, 20) !important;
  }
`;
const HerbalForm = Form.create()(Index);
export default HerbalForm;

/*
@作者：马晓敏
@日期：2018-06-29
@描述：新增中草药处方部分
*/
