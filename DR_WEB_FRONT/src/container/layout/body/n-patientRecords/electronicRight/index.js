import React, {Component} from 'react';
import { Menu, Icon, Switch, Row, Col, Radio } from 'antd';
import $ from 'jquery';
import "../electronic.less";
import ScrollArea from 'components/scrollArea';
import xinxi from "../images/xinxi.png";

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
      upstamp: '',
      registerid: '',
      temperature: '',
      breath: '',
      pulse: '',
      systolicPressure: '',
      diastolicPressure: '',
      casetype: '',
      casetypeDic: '',
      heightnum: '',
      weightnum: '',
      chOrderList: [],//中医处方
      weOrderList: [],//西医处方
    };
  };
  componentDidMount(){
    
  }
  componentWillReceiveProps(nextProps){
    console.log('nextProps',nextProps)
    let data = nextProps.data;
    let i = nextProps.i;
    let sexFont = null;
    this.setState({
      orgidDic: data[i].orgidDic,//机构名称
      name: nextProps.patientname,//患者姓名
      age: nextProps.birthday, //患者年龄
      sex: nextProps.sexDic,//患者性别
      type: nextProps.patienttypeDic,//患者类型
      upstamp: nextProps.upstamp,//就诊日期
      casetype: data[i].casetype,//初复诊
      pridepict: data[i].pridepict,//主诉
      hpi: data[i].hpi,//现病史
      allergichistory: data[i].allergichistory,//过敏史
      pasthistory: data[i].pasthistory,//既往史
      moHistory: data[i].moHistory,//月经婚育史
      familyhistory: data[i].familyhistory,//家庭史
      inspection: data[i].inspection,//望诊
      palpation: data[i].palpation,//切诊
      smelling: data[i].smelling,//闻诊
      syndrome: data[i].syndrome,//辨证要点
      suggession: data[i].suggession,//医生建议
      temperature: data[i].temperature,//体温
      breath: data[i].breath,//呼吸
      pulse: data[i].pulse,//脉搏
      systolicPressure: data[i].systolicPressure,//收缩压
      diastolicPressure: data[i].diastolicPressure,//舒张压
      heightnum: data[i].heightnum,//身高
      weightnum: data[i].weightnum,//体重
      chOrderList: data[i].chOrderList,//中医处方
      weOrderList: data[i].weOrderList,//西医处方
      // syndrome: data[i].syndrome,//血常规
      // syndrome: data[i].syndrome,//尿检
      // syndrome: data[i].syndrome,//脑部CT
      // syndrome: data[i].syndrome,//中医处方
      // syndrome: data[i].syndrome,//西医处方
    })  
  }

  render() {
    let ss = null;
    let {orgidDic,name, age, sex, type, upstamp, temperature, breath, pulse, systolicPressure, diastolicPressure, casetype,chOrderList,weOrderList} = this.state;
    if(casetype != ''){//判断初复诊：1为初诊，2为复诊；
      var ct = casetype;
      ss = <RadioGroup name="radiogroup" disabled defaultValue={ct}>
            <Radio value='1'>初诊</Radio>
            <Radio value='2'>复诊</Radio>
           </RadioGroup>
    }
    let pridepictS = this.state.pridepict ? this.state.pridepict : '暂略；';
    let hpiS = this.state.hpi ? this.state.hpi : '暂略；';
    let allergichistoryS = this.state.allergichistory ? this.state.allergichistory : '暂略；';
    let pasthistoryS = this.state.pasthistory ? this.state.pasthistory : '暂略；';
    let moHistoryS = this.state.moHistory ? this.state.moHistory : '暂略；';
    let familyhistoryS = this.state.familyhistory ? this.state.familyhistory : '暂略；';
    let inspectionS = this.state.inspection ? this.state.inspection : '暂略；';
    let palpationS = this.state.palpation ? this.state.palpation : '暂略；';
    let smellingS = this.state.smelling ? this.state.smelling : '暂略；';
    let syndromeS = this.state.syndrome ? this.state.syndrome : '暂略；';
    let suggessionS = this.state.suggession ? this.state.suggession : '暂略；';
    let heightnum = this.state.heightnum ? this.state.heightnum : '暂略；';
    let weightnum = this.state.weightnum ? this.state.weightnum : '暂略；';
    return (
      <div style={styles.rightStyle} id="printElectronic">
        <div>
          <div >
            <div>
              <h2 style={styles.titleStyle}>{orgidDic}-门诊病历</h2>
            </div>
            <div>
              <div style={styles.borderDashed}>
                <p style={styles.pStyle}><img src={xinxi} style={styles.xinxi}/>患者信息</p>
              </div>
              <div style={styles.borderDashed}>
                <p style={styles.hzMessage}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;患者姓名：{name}&nbsp;&nbsp;&nbsp;&nbsp; 年龄：{age}&nbsp;&nbsp;&nbsp;&nbsp; 性别：{sex}&nbsp;&nbsp;&nbsp;&nbsp; 患者类型：{type}&nbsp;&nbsp;&nbsp;&nbsp; 就诊日期：{upstamp.substr(0,10)}</p>
              </div>
            </div>
            <div>
              <div style={styles.borderDashed}>
                <p style={styles.pStyle}><img src={xinxi} style={styles.xinxi}/>诊疗信息</p>
              </div>  
              <div style={styles.rowStyle}>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>初复诊：</Col>
                  <Col style={styles.colRightStyle} span={21}>
                    {ss}
                  </Col>
                </Row> 
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>患者主诉：</Col>
                  <Col style={styles.colRightStyle} span={21}>{pridepictS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>现病史：</Col>
                  <Col style={styles.colRightStyle} span={21}>{hpiS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>过敏史：</Col>
                  <Col style={styles.colRightStyle} span={21}>{allergichistoryS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>既往史：</Col>
                  <Col style={styles.colRightStyle} span={21}>{pasthistoryS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>月经婚育史：</Col>
                  <Col style={styles.colRightStyle} span={21}>{moHistoryS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>家族史：</Col>
                  <Col style={styles.colRightStyle} span={21}>{familyhistoryS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>望诊：</Col>
                  <Col style={styles.colRightStyle} span={21}>{inspectionS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>切诊：</Col>
                  <Col style={styles.colRightStyle} span={21}>{palpationS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>闻诊：</Col>
                  <Col style={styles.colRightStyle} span={21}>{smellingS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>辨证要点：</Col>
                  <Col style={styles.colRightStyle} span={21}>{syndromeS}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>辅助检查：</Col>
                  <Col style={styles.colRightStyle} span={21}>体温（T）<span style={styles.contentLine}>{temperature}</span>℃&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;呼吸（R）<span style={styles.contentLine}>{breath}</span>次/分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;脉搏（P）<span style={styles.contentLine}>{pulse}</span>次/分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;收缩压/舒张压<span style={styles.contentLine}>{systolicPressure}</span>&nbsp;&nbsp;/&nbsp;&nbsp;<span style={styles.contentLine}>{diastolicPressure}</span>&nbsp;&nbsp;mnHg&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;身高&nbsp;&nbsp;<span style={styles.contentLine}>{heightnum}</span>&nbsp;&nbsp;体重&nbsp;&nbsp;<span style={styles.contentLine}>{weightnum}</span></Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>中医诊断：</Col>
                  <Col style={styles.colRightStyle} span={21}>{chOrderList}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>西医诊断：</Col>
                  <Col style={styles.colRightStyle} span={21}>{weOrderList}</Col>
                </Row>
                <Row>
                  <Col style={styles.colLeftStyle} span={3}>医生建议：</Col>
                  <Col style={styles.colRightStyle} span={21}>{suggessionS}</Col>
                </Row>
              </div>
              <div>
                <p style={styles.another}><img src={xinxi} style={styles.xinxi}/>检查信息</p>
                <div>
                  <Row>
                    <Col style={styles.colLeftStyle} span={3}>血常规：</Col>
                    <Col style={styles.colRightStyle} span={21}>检查目标：查看血象是否异常      |      异常信息：白细胞异常偏高     |     查看检查结果</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={3}>尿检：</Col>
                    <Col style={styles.colRightStyle} span={21}>检查目标：查看尿液酸碱度         |      异常信息：未见异常              |     查看检查结果</Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={3}>脑部CT：</Col>
                    <Col style={styles.colRightStyle} span={21}>检查目标：检查颅内是否异常      |      异常信息：未见异常              |     查看检查结果</Col>
                  </Row>
                </div>
              </div>
              <div>
                <p style={styles.another}><img src={xinxi} style={styles.xinxi}/>医嘱信息</p>
                <div>
                  <Row>
                    <Col style={styles.colLeftStyle} span={3}>中医处方：</Col>
                    <Col style={styles.colRightStyleOther} span={21}></Col>
                  </Row>
                  <Row>
                    <Col style={styles.colLeftStyle} span={3}>西医处方：</Col>
                    <Col style={styles.colRightStyleOther} span={21}></Col>
                  </Row>
                </div>
              </div>
            </div>
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
