import React, {Component} from 'react';
import { Menu, Icon, Switch, Row, Col, Radio } from 'antd';
import $ from 'jquery';
import "../../css/electronic.less";
import styled from 'styled-components';
import printImages from "../../../images/print.png";
import xian from "../../../images/xian.png";
import exportFile from "../../../images/exportFile.png";
import ScrollArea from 'components/scrollArea';
import date from "../../../images/date.png";
import xinxi from "../../../images/xinxi.png";
import getResource from 'commonFunc/ajaxGetResource';

const RadioGroup = Radio.Group;
const bodyHeight = document.body.clientHeight;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Electronic extends Component {
  constructor(props){
    super(props);
    this.state={
      listSeven: [],
      listEight: [],
      current: '1',
      year: '2018',
      openKeys: ['2018'],
      patientname: '',
      pridepict: '',
      hpi: '',
      allergichistory: '',
      pasthistory: '',
      moHistory: '',
      familyhistory: '',
      inspection: '',
      palpation: '',
      smelling: '',
      syndrome: '',
      diadesc: '',
      suggession: '',
      name:'',
      age:'',
      sex:'',
      type:'',
      registerid: '',
      temperature: '',
      breath: '',
      pulse: '',
      systolicPressure: '',
      diastolicPressure: '',
      casetype: '',
      casetypeDic: '',
    };
  };

  getMenuData(){
    let patientid = '201832424728142113';//传给后台的患者id
    let params = {
          type: 'GET',
          async : true,
          url: 'BuRegisterController/getList',
          data: {
            patientid: window.patientID
          }
        };
        let that = this;
        function success(res){
          console.log('成功',res);
          //console.log('registerid',res.data[2018][0].registerid);
          that.setState({
            //listSeven: res.data[2017],
            listEight: res.data[2018],
            name:res.data[2018][0].patientname,
            age:res.data[2018][0].age,
            sex:res.data[2018][0].sex,
            type:res.data[2018][0].patienttype,
            registerid:res.data[2018][0].registerid
            }, function () {
              this.getListData();
            })

        };

        function error(res){
            console.log('电子病历左侧时间菜单获取失败');
        };
        getResource(params, success, error);
  }

  getListData(){
    let key = this.state.registerid;//获取点击的Key值：registerid
    //console.log('key ', key);
    let year = this.state.year;
    let params = {
          type: 'GET',
          async : true,
          url: 'BuPatientCaseController/getData',
          data: {
            year: year,
            registerid: key
          }
        };
        let that = this;
        function success(res){
          //console.log('右侧成功',res);
          that.setState({
            pridepict: res.data.pridepict,//患者主诉
            hpi: res.data.hpi,//现病史
            allergichistory: res.data.allergichistory,//过敏史
            pasthistory: res.data.pasthistory,//既往史
            moHistory: res.data.moHistory,//月经婚育史
            familyhistory: res.data.familyhistory,//家族史
            inspection: res.data.inspection,//望诊
            palpation: res.data.palpation,//切诊
            smelling: res.data.smelling,//闻诊
            syndrome: res.data.syndrome,//辨证要点
            diadesc: res.data.buDiagnosisInfo.buDiagnosisList[0].diadesc,//西医诊断
            suggession: res.data.suggession,//医生建议
            temperature: res.data.temperature,//体温
            breath: res.data.breath,//呼吸
            pulse: res.data.pulse,//脉搏
            systolicPressure: res.data.systolicPressure,//收缩压
            diastolicPressure: res.data.diastolicPressure,//舒张压
            casetype: res.data.casetype,//初复诊
            casetypeDic: res.data.casetypeDic,//初复诊
            heightnum: res.data.heightnum,//身高
            weightnum: res.data.weightnum,//体重
          });
          // that.forceUpdate();
        };

        function error(res){
            console.log('右侧列表获取失败');
        };
        getResource(params, success, error);
  }

  componentWillMount(){
    // 加载默认左侧时间菜单显示右侧list
    //console.log('componentDidMount');
    this.getMenuData();
  }
  componentWillReceiveProps(){
    this.getMenuData();
  };
  handleClick = (e) => {
    // 根据左侧菜单选择的日期显示右侧列表
    //console.log('click ', e.key);
    let key = e.key;
    this.setState({
      registerid: key
    }, function(){
      this.getListData();
    })

  }

  titleClick = (e) => {
    // 根据左侧菜单点击的title获取年份year
    //console.log('titleClick ', e.key);
    this.setState({
      year: e.key
    })
  }

  rootSubmenuKeys = ['2018', '2017'];
  onOpenChange = (openKeys) => {//点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁和方便获取年份
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    let ss = null;
    if(this.state.casetype = 1 && 2){//判断初复诊：1为初诊，2为复诊；
      var ct = this.state.casetype;
      ss = <RadioGroup name="radiogroup" disabled defaultValue={ct}>
            <Radio value={1}>初诊</Radio>
            <Radio value={2}>复诊</Radio>
           </RadioGroup>
    }
    let {name, age, sex, type, temperature, breath, pulse, systolicPressure, diastolicPressure} = this.state;
    let pridepictS = this.state.pridepict ? this.state.pridepict : '暂略；';
    let hpiS = this.state.hpi ? this.state.hpi : '暂略；';
    let allergichistoryS = this.state.allergichistory ? this.state.allergichistory : '暂略；';
    let pasthistoryS = this.state.diadesc ? this.state.diadesc : '暂略；';
    let moHistoryS = this.state.moHistory ? this.state.moHistory : '暂略；';
    let familyhistoryS = this.state.familyhistory ? this.state.familyhistory : '暂略；';
    let inspectionS = this.state.inspection ? this.state.inspection : '暂略；';
    let palpationS = this.state.palpation ? this.state.palpation : '暂略；';
    let smellingS = this.state.smelling ? this.state.smelling : '暂略；';
    let syndromeS = this.state.syndrome ? this.state.syndrome : '暂略；';
    let diadescS = this.state.diadesc ? this.state.diadesc : '暂略；';
    let suggessionS = this.state.suggession ? this.state.suggession : '暂略；';
    let heightnum = this.state.heightnum ? this.state.heightnum : '暂略；';
    let weightnum = this.state.weightnum ? this.state.weightnum : '暂略；';
    return (
      <div style={styles.rightStyle} id="printElectronic">
        <div>
          <div >
            <ScrollArea height={240}>
              <div>
                <h2 style={styles.titleStyle}>庆阳中医馆-门诊病历</h2>
              </div>
              <div>
                <div style={styles.borderDashed}>
                  <p style={styles.pStyle}><img src={xinxi} style={styles.xinxi}/>患者信息</p>
                </div>
                <div style={styles.borderDashed}>
                  <p style={styles.hzMessage}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;患者姓名：{name}&nbsp;&nbsp;&nbsp;&nbsp; 年龄：{age}&nbsp;&nbsp;&nbsp;&nbsp; 性别：{sex}&nbsp;&nbsp;&nbsp;&nbsp; 患者类型：{type}&nbsp;&nbsp;&nbsp;&nbsp; 就诊日期：2018年03月25</p>
                </div>
              </div>
              <div>
                <div style={styles.borderDashed}>
                  <p style={styles.pStyle}><img src={xinxi} style={styles.xinxi}/>诊疗信息</p>
                </div>  
                <div style={styles.rowStyle}>
                  <Row style={styles.borderDashed}>
                    <Col style={styles.colLeftStyle} span={2}>初复诊：</Col>
                    <Col span={22}>
                      {ss}
                    </Col>
                  </Row> 
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>患者主诉：</Col>
                    <Col style={styles.colRightStyle} span={22}>{pridepictS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>现病史：</Col>
                    <Col style={styles.colRightStyle} span={22}>{hpiS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>过敏史：</Col>
                    <Col style={styles.colRightStyle} span={22}>{allergichistoryS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>既往史：</Col>
                    <Col style={styles.colRightStyle} span={22}>{pasthistoryS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>月经婚育史：</Col>
                    <Col style={styles.colRightStyle} span={22}>{moHistoryS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>家族史：</Col>
                    <Col style={styles.colRightStyle} span={22}>{familyhistoryS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>望诊：</Col>
                    <Col style={styles.colRightStyle} span={22}>{inspectionS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>切诊：</Col>
                    <Col style={styles.colRightStyle} span={22}>{palpationS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>闻诊：</Col>
                    <Col style={styles.colRightStyle} span={22}>{smellingS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>辨证要点：</Col>
                    <Col style={styles.colRightStyle} span={22}>{syndromeS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>辅助检查：</Col>
                    <Col style={styles.colRightStyle} span={22}>体温（T）<span style={styles.contentLine}>{temperature}</span>℃&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;呼吸（R）<span style={styles.contentLine}>{breath}</span>次/分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;脉搏（P）<span style={styles.contentLine}>{pulse}</span>次/分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;收缩压/舒张压<span style={styles.contentLine}>{systolicPressure}</span>&nbsp;&nbsp;/&nbsp;&nbsp;<span style={styles.contentLine}>{diastolicPressure}</span>&nbsp;&nbsp;mnHg&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;身高&nbsp;&nbsp;<span style={styles.contentLine}>{heightnum}</span>&nbsp;&nbsp;体重&nbsp;&nbsp;<span style={styles.contentLine}>{weightnum}</span></Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>中医诊断：</Col>
                    <Col style={styles.colRightStyle} span={22}>风寒感冒；高血压；轻度脑震荡</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>西医诊断：</Col>
                    <Col style={styles.colRightStyle} span={22}>{diadescS}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={2}>医生建议：</Col>
                    <Col style={styles.colRightStyle} span={22}>{suggessionS}</Col>
                  </Row>
                </div>
                <div>
                  <p style={styles.another}><img src={xinxi} style={styles.xinxi}/>检查信息</p>
                  <div>
                    <Row>
                      <Col style={styles.colLeftStyle} span={2}>血常规：</Col>
                      <Col style={styles.colRightStyle} span={22}>检查目标：查看血象是否异常      |      异常信息：白细胞异常偏高     |     查看检查结果</Col>
                    </Row>
                    <Row>
                      <Col style={styles.colLeftStyle} span={2}>尿检：</Col>
                      <Col style={styles.colRightStyle} span={22}>检查目标：查看尿液酸碱度         |      异常信息：未见异常              |     查看检查结果</Col>
                    </Row>
                    <Row>
                      <Col style={styles.colLeftStyle} span={2}>脑部CT：</Col>
                      <Col style={styles.colRightStyle} span={22}>检查目标：检查颅内是否异常      |      异常信息：未见异常              |     查看检查结果</Col>
                    </Row>
                  </div>
                </div>
                <div>
                  <p style={styles.another}><img src={xinxi} style={styles.xinxi}/>处方信息</p>
                  <div>
                    <Row>
                      <Col style={styles.colLeftStyle} span={2}>中医处方：</Col>
                      <Col style={styles.colRightStyleOther} span={22}></Col>
                    </Row>
                    <Row>
                      <Col style={styles.colLeftStyle} span={2}>西医处方：</Col>
                      <Col style={styles.colRightStyleOther} span={22}></Col>
                    </Row>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

      </div>
    );
  }
}

/*
@作者：王崇琨
@日期：2018-07-08
@描述：电子病历
*/

const styles = {
  titleStyle: {
    textAlign: 'center'
  },
  borderDashed: {
    width:'100%',
    borderBottom: '1px dashed #d7d7d7',
  },
  pStyle: {
    fontFamily: '微软雅黑',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '14px',
    color: 'black',
    textAlign: 'left',
    lineHeight: 'normal',
    marginTop: '2%',
    marginBottom: '2rem'
  },
  another: {
    fontFamily: '微软雅黑',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '14px',
    color: 'black',
    textAlign: 'left',
    lineHeight: 'normal',
    marginTop: '2%',
  },
  rowStyle: {
    width: '100%'
  },
  hzMessage: {
    fontFamily: 'MicrosoftYaHei,微软雅黑',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#666666',
    lineHeight: '5'
  },
  contentLine: {
    borderBottom: '1px solid #444444'
  },
  colLeftStyle: {
    textAlign: 'right',
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#666666',
    lineHeight: 'normal',
    marginTop: '2%',
    marginLeft: '-1.8%'
  },
  colRightStyle: {
    fontSize: '12px',
    color: '#333333',
    fontStyle: 'normal',
    textAlign: 'left',
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
    fontWeight: '400',
    lineHeight: 'normal',
    borderBottom: '1px solid #d7d7d7',
    marginTop: '2%',
    marginLeft: '1.5%'
  },
  colRightStyleOther: {
    fontSize: '12px',
    color: '#333333',
    fontStyle: 'normal',
    textAlign: 'left',
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
    fontWeight: '400',
    lineHeight: 'normal',
    marginTop: '2%'
  },
}

/*
@作者：王崇琨
@日期：2018-06-29
@描述：电子病历
*/
