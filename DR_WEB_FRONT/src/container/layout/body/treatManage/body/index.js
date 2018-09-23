import React, {Component} from 'react';
import { Button, Breadcrumb, Icon, Row, Col, Tabs} from 'antd'

export default class Body extends Component {
  constructor(props){
    super(props);
    this.state = {
      curTab: '1', // 当前展示的是第几个标签页
    };
    this.changeTab = this.changeTab.bind(this);
  };
  renderTreatment () {
    return (
      <Button type="ghost" id="tabStyle" style={styles.container1}>
      ✍️诊疗
      </Button>
    )
  }
  renderElectronic () {
    return (
      <Button type="ghost" id="tabStyle" style={styles.electronicMedicalRecords}>📃电子病历
      </Button>
    )
  }
  renderAgency () {
    return (
      <Button type="ghost" id="tabStyle" style={styles.agencyBusiness}>📝代开业务
      </Button>
      )
   }
   renderAppointment () {
    return (
      <Button type="ghost" id="tabStyle" style={styles.makeAppointment}>📈预约挂号
      </Button>
      )
   }
   renderApplicationForm () {
    return (
      <Button type="ghost" id="tabStyle" style={styles.admissionApplicationForm}>📋入院申请单
      </Button>
      )
   }
   renderCure () {
    return (
      <Button type="ghost" id="tabStyle" style={styles.cure} >🔍治未病
      </Button>
      )
   }

   changeTab(e){ // tabs切换事件
     this.setState({
       curTab: e
     });
   };
  render() {
    let {curTab} = this.state;
    return (
      <div style={styles.container}>
        test
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
  },
  rowCol:{
    width: '100%',
    fontWeight: 400,
    fontSize: 12,
    fontFamily: "'MicrosoftYaHei', 'Microsoft YaHei'",
  },
  lineHeight: {
    lineHeight: '60px',
    verticalAlign: 'middle',
    left: '10px'
  },
  lineHeight1: {
    marginTop: '15px',
    left: '-2%'
  },
  pFont: {
    fontSize: '12px',
    fontFamily: 'MicrosoftYaHei,微软雅黑',
    fontWeight: '400',
    color: '#666666'
  },
  spanFont: {
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#0A6ECB'
  },
  rectangular: {
    width: '432px',
    height: '38px',
    backgroundColor:'rgb(249, 249, 249)',
    border: '1px solid rgba(228, 228, 228, 1)',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    zIndex: '1',
    marginBottom: '-20px',
    zIndex: '1',
    marginTop: '-4px'
  },
  rectangular1: {
    zIndex: '10',
    marginTop: '-29px',
    marginLeft:'20px',
    color: '#0a6ecb',
    fontSize: '12px'
  },
  icon: {
    color: '#0a6ecb'
  },
  iconColor: {
    color: 'white'
  },
  study: {
    top: '-24px',
    width: '24%',
    color: 'white',
    backgroundColor: '#0066cc',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    fontSize: '12px',
    fontWeight: '400',
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
    fontStyle: 'normal',
    textAlign: 'center',
    lineHeight: 'normal',
    marginLeft: '82%'
  },
  firstLine: {
    margin: '-12px 0px 10px',
    height: '1px',
    backgroundColor: '#e4e4e4',
  },
  electronicMedicalRecords: {
    borderRadius: '20px',
    fontSize: '12px',
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
    marginLeft: '-17%'
  },
  agencyBusiness: {
    borderRadius: '20px',
    fontSize: '12px',
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
    marginLeft: '-35%'
  },
  makeAppointment: {
    borderRadius: '20px',
    fontSize: '12px',
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
    marginLeft: '-52%'
  },
  admissionApplicationForm: {
    borderRadius: '20px',
    fontSize: '12px',
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
    marginLeft: '-70%'
  },
  cure: {
    borderRadius: '20px',
    fontSize: '12px',
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
    marginLeft: '-87%'
  },
  container1: {
    borderRadius: '20px',
    fontSize: '12px',
    fontFamily: 'MicrosoftYaHei, 微软雅黑'
  },
  line:{
    height: '1px',
    backgroundColor: '#CCCCCC',
    position: 'relative',
    bottom: '-19px'
  },
  tabsCss: {
    marginTop: '0.1%'
  }
};
/*
@作者：姜中希
@日期：2018-07-06
@描述：包含诊疗管理标签页的容器
*/
