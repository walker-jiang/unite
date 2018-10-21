import React, {Component} from 'react';
import styled from 'styled-components';
import ElectronicList from '../electronicList/index.js';
import Cure from '../../n-cure/diseasePreventTreat';
import Ssc from '../registerForm';
// import Ssc from '../patientDetailInfo';
import people from '../images/people.png'
import Addtip from '../images/addtip.png';
import { Link } from 'react-router-dom';
import { Input, Table, Pagination, LocaleProvider } from 'antd';
import TableIcon from 'components/dr/icon/icons/table';
import ListIcon from 'components/dr/icon/icons/list';
import ArrowPicker from 'components/dr/datePicker/arrowPicker';
import inputSty from 'components/antd/style/input';
import Icon from 'components/dr/icon';
import { today } from 'commonFunc/defaultData';
import zh_CN  from 'antd/lib/locale-provider/zh_CN';
import getResource from 'commonFunc/ajaxGetResource';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      showWay: 'grid', // 数据展示方式
      patienList: [], // 患者数据
      rcStatus: 0, // 当前标签页
      keyword: '', // 查询关键字
      totalRecords: 0, // 总记录数
      curPage: 1, // 当前页
      pageSize: pageSize * 4, // 每页记录数
      data: []
    };
  };

  componentWillMount () {
    var patientid = this.props.patientid;
    let params = {
      url: 'BuPatientCaseController/getPatient',
      data: {
        patientid: patientid
      }
    };
    let that = this;
    function callBack(res){
        if(res.result){
            console.log('成功')
            that.setState({
                data: res.data
            })
      }else{
        that.setState({data: []});
      }
    };
    getResource(params, callBack);
  }

  /**
   * [toggleTabs 三个tab页切换函数]
   * @param  {[type]} curTab [当前页]
   * @return {[type]}        [undefined]
   */
  toggleTabs(curTab){
    this.setState({
      rcStatus: curTab
    });
  };
  /**
   * [onShowSizeChange 监听每页显示记录的改变事件函数]
   * @param  {[type]} current [当前页]
   * @param  {[type]} size    [每页记录数]
   * @return {[type]}         [undefined]
   */
  onShowSizeChange = (current, size) => {
    this.setState({ pageSize: size }, () => {
      this.getPatientData();
    });
  };
  /**
   * [onPageChange 选择某一页事件]
   * @param  {[type]} page     [选中页]
   * @param  {[type]} pageSize [当前页容量]
   * @return {[type]}          [undefined]
   */
  onPageChange = (page, pageSize) => {
    this.setState({ curPage: page }, () => {
      this.getPatientData();
    });
  }
  render() {
    let { rcStatus, data} = this.state;
    let patientid = this.props.patientid;
    let ctsorgidDic = this.props.ctsorgidDic;
    let upstamp = this.props.upstamp;
    let patientname = this.props.patientname;
    let sexDic = this.props.sexDic;
    let birthday = this.props.birthday;
    let patienttypeDic = this.props.patienttypeDic;
    let basicOperation = this.props.basicOperation;
    let curTabComponet = null;
    console.log('data',data);
    if(rcStatus == 0) {
        curTabComponet = <Ssc patientid = {patientid} basicOperation = {basicOperation}/>
    } else if(rcStatus == 1) {
      if(data == [] || data == "" || data == null){
        curTabComponet =<NullData> 
                          <TipImg src={Addtip} />
                          <TipTitle>该患者还没有电子病历</TipTitle>
                        </NullData>
      } else {
        curTabComponet = <ElectronicList 
                          patientid = {patientid} 
                          ctsorgidDic = {ctsorgidDic}
                          upstamp = {upstamp}
                          patientname = {patientname}
                          sexDic = {sexDic}
                          birthday = {birthday}
                          patienttypeDic = {patienttypeDic}
                          />
      }
    } else if(rcStatus == 2) {
        curTabComponet = <Cure/>
    }
    return (
      <Container>
        <Header>
          <Left>
            <Toggle>
              <ImgPeople src={people}/>
              <LeftSpan>{patientname}/{sexDic}/{birthday}/{patienttypeDic}</LeftSpan>
            </Toggle>
            <Center>
            </Center>
            <SpecTabs>
              <TabPane activeTab={rcStatus} _key={0} onClick={(e) => this.toggleTabs(0)}>患者信息</TabPane>
              <TabPane activeTab={rcStatus} _key={1} onClick={(e) => this.toggleTabs(1)}>电子病历</TabPane>
              <TabPane activeTab={rcStatus} _key={2} onClick={(e) => this.toggleTabs(2)}>体质测评</TabPane>
            </SpecTabs>
          </Left>
        </Header>
        <Content>
            {curTabComponet}
        </Content>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const Header = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(242, 242, 242, 1);
  padding: 0px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 1px 1px 5px;
`;
const Left = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const LeftSpan = styled.span`
  margin-left: 1rem;
`;
const Center = styled.div`
  width: 1px;
  height: 3rem;
  background-color: #333333;
  margin-left: 9.6rem;
`;
const ImgPeople = styled.img`
  width: 2rem;
  height: 2rem;
`;
const Toggle = styled.div`
  margin: 20px 0px;
`;
const SpecTabs = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  width: fit-content;
`;
const TabPane = styled.div`
  word-wrap: normal;
  white-space: nowrap;
  padding: 5px 5px;
  margin: 0px 10px;
  cursor: pointer;
  border-bottom: ${props => props.activeTab == props._key ? '2px solid #5959e0': 'none'} ;
`;
const Content = styled.div`
  width: 100%;
  position: relative;
`;
const TipImg = styled.img`
  width: 109px;
  height: 130px;
  margin-left: 44%;
`;
const TipTitle = styled.div`
  font-size: 16px;
  color: #666666;
  text-align: center;
  line-height: 24px;
`;
const NullData = styled.div`
  width: 100%;
  margin-top: 17rem;
  margin-bottom: 17rem;
`;
/*
@作者：王崇琨
@日期：2018-09-27
@描述：患者档案-点击表格查看档案详细信息
*/
