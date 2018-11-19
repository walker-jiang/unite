import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Radio, Table, Input } from 'antd';
import Websocket from 'react-websocket';
import { today } from 'commonFunc/defaultData';
import DatePicker from 'components/dr/datePicker/semicirclePicker';
import Pagination from 'components/antd/components/pagination';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';
import extractDataFromIdentityCard from 'commonFunc/extractDataFromIdentityCard';
import inputSty from 'components/antd/style/input';
import paginationSty from 'components/antd/style/pagination';

const RadioGroup = Radio.Group;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      patienList: [], // 患者列表数据
      rcStatus: 0, // 急诊单选状态
      keyword: '', //关键词
      totalRecords: 0, //总记录数
      curPage: 1, // 当前页
      pageSize: pageSize * 2, // 每页记录数
    };
    this.getPatienList = this.getPatienList.bind(this);
    this.doing = this.doing.bind(this);
    this.redo = this.redo.bind(this);
    this.done = this.done.bind(this);
    this.view = this.view.bind(this);
    this.keepDoing = this.keepDoing.bind(this);
  };
  componentWillMount(){
    this.getPatienList();
  };
  /**
   * [modifyRcState 修改接诊状态的函数]
   * @param  {[type]} rcStatus [将要修改为的接诊状态u]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}          [undefined]
   */
  modifyRcState(rcStatus, registerid){
    let self = this;
    let params = {
      url: 'BuRegisterController/receive',
      async: false,
      data: {
        rcStatus: rcStatus, // 接诊状态
        registerid: registerid, // 就诊id
        doctorid: window.sessionStorage.getItem('userid'), // 接诊医生
        doctorname: window.sessionStorage.getItem('username'), // 接诊医生
      },
    };
    function callBack(res){
      console.log('接诊状态修改为0-待接诊 1-接诊中2-已接诊）', rcStatus);
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [doing 接诊函数]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}            [undefined]
   */
  doing(registerid, patientid){
    console.log('接诊');
    window.registerID = registerid;
    window.modifyPermission = 1; // 治疗书写权限0只读 1 可写
    window.patientID = patientid;
    this.modifyRcState(1, registerid);
  };
  /**
   * [redo 重新接诊函数]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}            [undefined]
   */
  redo(registerid, patientid){
    console.log('重新接诊');
    window.modifyPermission = 1; // 治疗书写权限0只读 1 可写
    window.registerID = registerid;
    window.patientID = patientid;
    this.modifyRcState(1, registerid);
  };
  /**
   * [done 完成接诊函数]
   * @param  {[type]}   registerid [接诊ID]
   * @return {Function}            [undefined]
   */
  done(registerid){
    console.log('完成接诊');
    this.modifyRcState(2, registerid);
    this.getPatientData();
  };
  /**
   * [view 查看接诊信息]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}            [undefined]
   */
  view(registerid, patientid){
    console.log('查看你信息');
    window.registerID = registerid;
    window.patientID = patientid;
    window.modifyPermission = 0; // 治疗书写权限0只读 1 可写
  };
  /**
   * [keepDoing 续诊函数]
   * @param  {[type]} registerid [接诊ID]
   * @return {[type]}            [undefined]
   */
  keepDoing(registerid, patientid){
    console.log('续诊', patientid);
    window.registerID = registerid;
    window.patientID = patientid;
    window.modifyPermission = 1; // 治疗书写权限0只读 1 可写
  };
  getPatienList(){ // 当前日期， 默认是当天
    let self = this;
    let date = this.arrowPicker ? this.arrowPicker.state.dateValue : today;
    let { rcStatus, keyword, totalRecords, curPage, pageSize } = this.state;
    let params = {
      url: 'BuRegisterController/getListByMap',
      data: {
        orgid: window.sessionStorage.getItem('orgid'), // 机构ID
        deptcode: window.sessionStorage.getItem('deptid'), // 科室ID
        rcStatus: rcStatus, // 接诊状态
        keyword: keyword, // 患者姓名，姓名拼音简拼手机号
        beginTime: date + ' ' + '00:00:01', // date
        endTime: date + ' ' + '23:59:59',
        page: curPage, // 当前页
        pageSize: pageSize, // 每页记录数
        doctorid: window.sessionStorage.getItem('userid'),
      },
    };
    function callBack(res){
      if(res.result){
        let patienList = res.data.records.map(item => Object.assign(item, { key: item.patientid }))
        let totalRecords = res.data.total;
        self.setState({patienList: patienList, totalRecords});
      }else{
        self.setState({patienList: []});
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  getTableCol(){
    let date = new Date();
    const columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      render: (text, record, index) => index + 1
    }, {
      title: '姓名',
      dataIndex: 'patientname',
      key: 'patientname',
    }, {
      title: '就诊日期',
      dataIndex: 'regDate',
      key: 'regDate',
      render: (text, record) => text.substr(0,10)
    }, {
      title: '性别',
      dataIndex: 'sexDic',
      key: 'sexDic',
      align: 'center'
    }, {
      title: '年龄',
      dataIndex: 'birthday',
      key: 'birthday',
      align: 'center',
      render: (text, record) => extractDataFromIdentityCard.getAgeFromBirthday(text.substr(0,10))
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      render: (text, record, index)=>
      record.rcStatus == 0 ?
      <StyledLink
        onClick={() => this.doing(record.registerid, record.patientid)}
        to={'/Layout/treatment'}>
        接诊
      </StyledLink>
      :
      (
        record.rcStatus == 1 ?
          <span>
            <StyledLink
              replace={true}
              onClick={() => this.keepDoing(record.registerid, record.patientid)}
              to={'/Layout/treatment'}>
              续诊
            </StyledLink>|
            <StyledLink
              replace={true}
              onClick={() => this.done(record.registerid)}
              to='/Layout/todayPatient'>
              完成
            </StyledLink>
          </span>
        : <span>
            <StyledLink
              replace={true}
              onClick={() => this.redo(record.registerid, record.patientid)}
              to={'/Layout/treatment'}>
              重诊
            </StyledLink>|
            <StyledLink
              replace={true}
              onClick={() => this.view(record.registerid, record.patientid)}
              to={'/Layout/treatment'}>
              查看
            </StyledLink>
          </span>
      )
    }];
    return columns;
  };
  /** [handleRadioChange 单选按钮切换触发的函数， 切换后重新查询患者数据] */
  handleRadioChange(e){
    this.setState({ rcStatus: e.target.value },function(){
      this.getPatienList();
    });
  };
  render() {
    let { patienList, rcStatus, totalRecords, curPage,  pageSize} = this.state;
    let { visible } = this.props;
    let columns = this.getTableCol();
    // 分页参数
    Pagination.total = totalRecords;
    Pagination.current = curPage;
    Pagination.pageSize = pageSize;
    Pagination.onChange = (page, pageSize)=>{
      this.setState({ curPage: page},() => {
        this.getPatienList();
      });
    }
    return (
      <Container>
        <LeftFloat visible={visible}>
          <Top>
            <span>就诊患者列表</span>
          </Top>
          <Middle>
            <SearchInput placeholder='输入姓名/简拼/手机号查询' onChange={e =>{ this.setState({ keyword: e.target.value })}}/>
            <Line/>
            <DatePicker onSubmit={(date)=>{this.getPatienList(date)}} ref = { ref => {this.arrowPicker = ref}}></DatePicker>
          </Middle>
          <Bottom>
            <RadioGroup defaultValue={rcStatus} onChange={(e)=>{this.handleRadioChange(e)}}>
              <SpecRadio value={0}>待接诊患者</SpecRadio>
              <SpecRadio value={1}>诊疗中</SpecRadio>
              <SpecRadio value={2}>已接诊患者</SpecRadio>
            </RadioGroup>
          </Bottom>
          <SpecTable
            dataSource={patienList}
            columns={columns}
            pagination={Pagination}
            locale={{emptyText: <span>暂无患者数据</span> }}
          />
        </LeftFloat>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 13px;
  display: flex;
  align-items: center
`;
const LeftFloat = styled.div`
  display: ${props=>props.visible?'block':'none'};
  z-index: 2;
  position: absolute;
  width: 345px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(245, 245, 245, 1);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.349019607843137);
`;
const Top = styled.div`
  height: 47px;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 7px;
  border-top: 0px solid transparent;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient( to right, #9A9A9A , white) 100 30;
`;
const SearchInput = styled(Input)`
  ${inputSty.semicircle};
  font-size: 12px;
`;
const Middle = styled.div`
  padding: 15px 5px 0px 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const SpecTable = styled(Table)`
  ${paginationSty.easyPagination};
  &&& .ant-pagination {
    margin-left: 320px;
  }
  table{
    width: 100%;
  }
  .ant-table-tbody > tr > td {
    border: none;
    padding: 5px 0px !important;
  }
`;
const StyledLink = styled(Link)`
  margin: 2px;
`;
const Bottom = styled.div`
  padding: 15px 5px;
`;
const SpecRadio = styled(Radio)`
  &&& > span:nth-child(2) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;
const Line = styled.div`
  background-color: #CCCCCC;
  width: 2px;
  height: 30px;
  margin: 0px 10px;
`;
/*
@作者：姜中希
@日期：2018-07-05
@描述：左竖条展开浮窗栏目
*/
export default withRouter(Index);
