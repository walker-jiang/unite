import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Radio, Table, Modal } from 'antd';
import Websocket from 'react-websocket';
import { today } from 'commonFunc/defaultData';
import DatePicker from 'components/dr/datePicker/semicirclePicker';
import Pagination from 'components/antd/components/pagination';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import SearchPatient from './searchPatient';
import PatientDetailInfo from './patientDetailInfo';
import NoneInfoModal from './noneInfoModal';
import left from './left_arrow.png';
import right from './right_direction.png';
import right_over from './right_direction_mouseOver.png';
import line from './line.png';
import buttonSty from 'components/antd/style/button';
import paginationSty from 'components/antd/style/pagination';

const RadioGroup = Radio.Group;
class LeftBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false, // 是否显示浮窗
      patienList: [], // 患者列表数据
      conut: 90,
      rcStatus: 0, // 急诊单选状态
      patientDetailInfoRef: null, // 患者详细信息ref
    };
    this.visibleFloat = this.visibleFloat.bind(this);
    this.getPatienList = this.getPatienList.bind(this);
    this.reception = this.reception.bind(this);
  };
  componentWillMount(){
    this.getPatienList();
  };
  visibleFloat(){
    this.setState({visible: !this.state.visible});
  };
  getPatienList(date = today){ // 当前日期， 默认是当天
    let self = this;
    let { rcStatus } = this.state;
    let params = {
      url: 'BuPatientReceiveController/getList',
      data: {
        orgid: window.sessionStorage.getItem('orgid'), // 机构ID
        deptid: window.sessionStorage.getItem('deptid'), // 科室ID
        rcStatus: rcStatus,
        keyword: self.searchPatient ? self.searchPatient.state.inputValue : '', // 患者姓名，姓名拼音简拼手机号
        beginTime: date + ' ' + '00:00:01', // date
        endTime: date + ' ' + '23:59:59'
      },

    };
    function callBack(res){
      if(res.result && res.data){
        let patienList = res.data.records.map((item, index)=>{
          item.key = index+1; // 加唯一key值
          return item
        });
        console.log('请求患者列表');
        self.setState({patienList});
      }else{
        self.setState({patienList: []});
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  getTableCol(){
    const columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      className: 'patienListTableCol',
      align: 'center'
    }, {
      title: '姓名',
      dataIndex: 'patientname',
      className: 'patienListTableCol',
      key: 'patientname',
    }, {
      title: '就诊日期',
      dataIndex: 'utstamp',
      className: 'patienListTableCol',
      key: 'utstamp',
    }, {
      title: '性别',
      dataIndex: 'sex',
      className: 'patienListTableCol',
      key: 'sex',
      align: 'center'
    }, {
      title: '年龄',
      dataIndex: 'age',
      className: 'patienListTableCol',
      key: 'age',
      align: 'center'
    }, {
      title: '操作',
      dataIndex: 'operation',
      className: 'patienListTableCol',
      key: 'operation',
      align: 'center',
      render: (text, record, index)=>
        <a onClick={(e)=>this.reception(record.patientid, record.registerid, record.patientname)}>
          {record.rcStatus?'接诊中':'接诊'}
        </a>
    }];
    return columns;
  };
  componentDidMount(){
    var websocket = null;
    if ('WebSocket' in window) {
      websocket = new WebSocket("ws://192.168.1.146:8087/websocket/00");
    }
    else {
      alert('当前浏览器 Not support websocket')
    }
    //连接发生错误的回调方法
    websocket.onerror = function () {
      console.log("WebSocket连接发生错误");
    };
    //连接成功建立的回调方法
    websocket.onopen = function () {
      console.log("WebSocket连接成功");
    }
    //接收到消息的回调方法
    websocket.onmessage = function (event) {
      console.log(event.data);
    }
    //连接关闭的回调方法
    websocket.onclose = function () {
        console.log("WebSocket连接关闭");
    }
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
      this.closeWebSocket();
    }
    //将消息显示在网页上
    function setMessageInnerHTML(sendMessage) {
      console.log(sendMessage);
    }
  };
  //关闭WebSocket连接
  closeWebSocket() {
    websocket.close();
  }
  //发送消息
  send() {
    message='message'+"|"+'ToSendUserno'//将要发送的信息和内容拼起来，以便于服务端知道消息要发给谁
    websocket.send(message);
  }
  //获取当前时间
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
    return currentdate;
  }
  /** [handleRadioChange 单选按钮切换触发的函数， 切换后重新查询患者数据] */
  handleRadioChange(e){
    this.setState({ rcStatus: e.target.value },function(){
      this.getPatienList();
    });
  };
  /** [调用输入框浮层显示函数showResult] */
  showResult(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.searchPatient.showResult('');
  };
  /** [reception 点击表格中的接诊操作触发的函数] */
  reception(id=1, registerid, patientname){
    window.patientID = id;
    window.registerID = registerid;
    window.patientName = patientname;
    let path = {
      pathname: '/layout/treatManage',
    }
    // 跳转到诊疗界面
    this.props.history.push(path);
    // 隐藏左侧弹框
    this.setState({visible: false});
  };
  /** [reception 点击输入框右侧接诊按钮触发的函数] */
  receptionJudge(){
    let values = this.searchPatient.state.patientInfo;
    // 判断有无该患者基本信息
    if(JSON.stringify(values) != '{}'){
      // 执行登记 挂号操作
      let paramData = {
        baPatient: values,
        orgid: window.sessionStorage.getItem('orgid'),
        deptid: window.sessionStorage.getItem('deptid'),
        post: window.sessionStorage.getItem('post'),
        userid: window.sessionStorage.getItem('userid'),
        username: window.sessionStorage.getItem('username'),
      };
      let self = this;
      let params = {
        url: 'BuRegisterController/postBuRegister',
        data: JSON.stringify(paramData),
        type: 'post',
      };
      function callBack(res){
        if(res.result){
          self.reception(res.data.patientid, res.data.registerid, res.data.patientname);
        }else{
          console.log('异常响应信息', res);
        }
      };
      ajaxGetResource(params, callBack);
    }else{
      this.noneInfoModal.showModal();
    }
  };
  render() {
    let { visible, patienList, rcStatus } = this.state;
    let columns = this.getTableCol();
    // 分页参数
    Pagination.total = 5;
    Pagination.current = 1;
    Pagination.onChange = (page, pageSize)=>{
      // this.setState({ diaCurPage: page});
    }
    return (
      <Container onClick={()=>{this.searchPatient.hideResult()}}>
        <LeftArrow onClick={this.visibleFloat}>
          <Img />
        </LeftArrow>
        <LeftFloat visible={visible}>
          <Top>
            <span>患者列表</span>
            <Close onClick={this.visibleFloat} onMouseOver={(e)=>{e.target.src = right_over}} onMouseOut={(e)=>{e.target.src = right}}></Close>
          </Top>
          <Middle>
            <SearchPatient placeholder='输入姓名/简拼/手机号查询' ref={ref =>{ this.searchPatient = ref }} onRegister={()=>{this.PatientDetailInfo.handleOpen()}} onChange={this.getPatienList}/>
            <ActionButton type="primary" onClick={()=>{this.receptionJudge()}}>接诊</ActionButton>
            <Line src={line}/>
            <ActionButton type="primary" onClick={()=>{this.PatientDetailInfo.handleOpen()}}>登记</ActionButton>
          </Middle>
          <Bottom>
            <RadioGroup defaultValue={rcStatus} onChange={(e)=>{this.handleRadioChange(e)}}>
              <SpecRadio value={0}>待接诊患者</SpecRadio>
              <SpecRadio value={1}>已接诊患者</SpecRadio>
            </RadioGroup>
            <DatePicker onSubmit={(date)=>{this.getPatienList(date)}} disabled={rcStatus == 0}></DatePicker>
          </Bottom>
          <SpecTable
            dataSource={patienList}
            rowClassName='patienListTableRow'
            columns={columns}
            pagination={Pagination}
            locale={{emptyText: <span>暂无患者数据，可通过<a onClick={(e)=>{this.showResult(e)}}>患者基本信息</a>直接挂号接诊</span> }}
          />
        </LeftFloat>
        <NoneInfoModal ref={ref=>{this.noneInfoModal = ref}}></NoneInfoModal>
        <PatientDetailInfo wrappedComponentRef={ref=>{this.PatientDetailInfo = ref}} onOk={this.reception}></PatientDetailInfo>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 13px;
  heigt: 100%;
  display: flex;
  align-items: center
`;
const LeftArrow = styled.div`
  height: 100px;
  background: linear-gradient(rgba(228, 228, 228, 1), white, rgba(228, 228, 228, 1));
  display: flex;
  align-items: center;
  cursor: pointer
`;
const Img = styled.img.attrs({
  src: left,
})``;
const LeftFloat = styled.div`
  display: ${props=>props.visible?'block':'none'};
  position: absolute;
  width: 345px;
  left: 13px;
  z-index: 2;
  top: 13px;
  bottom: 38px;
  background-color: rgba(245, 245, 245, 1);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.349019607843137);
`;
const Top = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400px;
  font-style: normal;
  font-family: 'MicrosoftYaHei', '微软雅黑';
  padding: 0px 7px;
  border-top: 0px solid transparent;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient( to right, #9A9A9A , white) 100 30;
`;
const Middle = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const SpecTable = styled(Table)`
  ${paginationSty.easyPagination};
  &&& .ant-pagination {
    margin-left: 300px;
  }
  table{
    width: 100%;
  }
  .patienList .patienListTableCol{
    padding: 7px;
  }
  .ant-table-thead > tr > .patienListTableCol {
    background-color: rgba(255, 255, 255, 0.8);
    border-bottom: none;
  }
  .ant-table-tbody > .patienListTableRow > td{
    border-bottom: none;
    color: #333333;
  }

`;
const Bottom = Middle.extend``;
const SpecRadio = styled(Radio)`
  &&& > span:nth-child(2) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;
const Close = styled.img.attrs({
    src: right,
})`
  cursor: pointer;
  float: right;
`;
const ActionButton = styled(Button)`
  ${buttonSty.white}
  &&& {
    height: 25px;
    padding: 2px 15px !important;
    font-size: 12px;
  }
`;
const Line = styled.img`
  margin: 0px 10px;
`;
/*
@作者：姜中希
@日期：2018-07-05
@描述：左竖条展开浮窗栏目
*/
export default withRouter(LeftBar);
