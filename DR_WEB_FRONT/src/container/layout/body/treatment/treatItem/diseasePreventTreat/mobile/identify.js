import React, {Component} from 'react';
import { Button, Row, Col } from 'antd';
import welcome from "../images/welcome.png";
import getResource from 'commonFunc/ajaxGetResource';

export default class Identify extends Component {
  constructor(props){
    super(props);
    this.state = {
        userId : '',
        name: '',
        sex: '',
        age: '',
        certificatesNumber: ''
    };
  };

  componentDidMount(){//获取患者信息，进行确认
    let params = {
      type: 'GET',
      url: 'healthcabin/user/qrcode',
      server_url: config_CureService_url,
      contentType: '',
      xhrFields:{withCredentials:true},
      crossDoman:true,
      data:{
        certificatesType: '1',
        certificatesNumber: '653024198209249589'
      }
    };
    let that = this;
    function success(res){
      that.setState({
        userId: res.data.user.userid,
        name: res.data.user.name,
        sex: res.data.user.sex,
        age: res.data.user.age,
        certificatesNumber: res.data.user.certificatesNumber,
      },function(){
          console.log('userId',this.state.userId)
          let userId = this.state.userId;
          let name = this.state.name;
          let sex = this.state.sex;
          let age = this.state.age;
          let certificatesNumber = this.state.certificatesNumber;
          this.props.patientInformation(userId,name,sex,age,certificatesNumber)
      })
    };

    function error(res){
      console.log('失败',res)
    };
    getResource(params, success, error);
  }


  handClickFalse(){
    let pram = 2;
    this.props.onToggle(pram);
   }

  handClickTrue(){
    let pram = 3;
    this.props.onToggle(pram);
  }

  render() {
    let { userId, name, sex, age, certificatesNumber } = this.state;
    return (
      <div>
        <div>
            <Row type="flex" justify="start">
                <Col xs={24} sm={24}>
                    <div style={styles.yanzheng}>
                        <h2 style={styles.shenfen}>身份验证</h2>
                    </div>
                </Col>
            </Row>
        </div>
        <div>
            <Row type="flex" justify="start">
                <Col xs={24} sm={24}>
                    <img src={welcome} style={styles.systemPhoto}/>
                    <h2 style={styles.welcome}>欢迎您登录<span style={styles.system}>中医辨析测评系统</span>，请确认您身份：</h2>
                </Col>
            </Row>
        </div>
        <Row type="flex" justify="start">
            <Col xs={23} sm={23}>
                <div style={styles.line}></div>
            </Col>
        </Row>
        <div style={styles.rowDiv}>
            <Row type="flex" justify="start" style={styles.rowStyle}>
                <Col xs={6} sm={6} style={styles.colLeftStyle}>
                    <div style={styles.confirmBefore}>姓名：</div>
                </Col>
                <Col xs={18} sm={18} style={styles.colRightStyle}>
                    <div style={styles.confirm}>{name}</div>
                </Col>
            </Row>
            <Row type="flex" justify="start" style={styles.rowStyle}>
                <Col xs={6} sm={6} style={styles.colLeftStyle}>
                    <div style={styles.confirmBefore}>性别：</div>
                </Col>
                <Col xs={18} sm={18} style={styles.colRightStyle}>
                    <div style={styles.confirm}>{sex}</div>
                </Col>
            </Row>
            <Row type="flex" justify="start" style={styles.rowStyle}>
                <Col xs={6} sm={6} style={styles.colLeftStyle}>
                    <div style={styles.confirmBefore}>年龄：</div>
                </Col>
                <Col xs={18} sm={18} style={styles.colRightStyle}>
                    <div style={styles.confirm}>{age}</div>
                </Col>
            </Row>
            <Row type="flex" justify="start" style={styles.rowStyle}>
                <Col xs={6} sm={6} style={styles.colLeftStyle}>
                    <div style={styles.confirmBefore}>身份证号：</div>
                </Col>
                <Col xs={18} sm={18} style={styles.colRightStyle}>
                    <div style={styles.confirm}>{certificatesNumber}</div>
                </Col>
            </Row>
        </div>
        <Row type="flex" justify="start">
            <Col xs={23} sm={23}>
                <div style={styles.line}></div>
            </Col>
        </Row>
        <div style={styles.buttonDiv}>
            <Row type="flex" justify="start">
                <Col xs={22} sm={22} offset={1}>
                <Button style={styles.identityRight} type="primary" size="large" onClick={this.handClickTrue.bind(this)}>
                    身份正确
                </Button>
                </Col>
            </Row>
            <Row type="flex" justify="start">
                <Col xs={22} sm={22} offset={1}>
                <Button  style={styles.identityFalse} type="default" size="large" onClick={this.handClickFalse.bind(this)}>
                不是本人
                </Button>
                </Col>
            </Row>
        </div>
      </div>
    );
  }
}

const styles = {
    yanzheng: {
        width: '100%',
        height: '8rem',
        backgroundColor: 'rgb(26, 118, 209)',
        marginTop: '-2rem',
        position: 'relative'
    },
    shenfen: {
        color: 'white',
        fontSize: '22px',
        marginLeft: '14rem',
        paddingTop: '10%',
        position: 'absolute'
    },
    line: {
        border: '1px solid #E8E8E8',
        width: '100%',
        marginLeft: '0.5rem',
        marginTop: '6%'
    },
    colLeftStyle: {
        textAlign: 'right',
    },
    colRightStyle: {
        textAlign: 'left',
    },
    systemPhoto: {
        marginLeft: '1rem',
        marginTop: '8%',
        height: '2rem'
    },
    welcome: {
        fontSize: '16px',
        marginLeft: '4rem',
        marginTop: '-5.9%'
    },
    system: {
        color: '#3fc0c7'
    },
    confirm: {
        color: '#0a6ecb',
        fontSize: '17px'
    },
    confirmBefore: {
        fontSize: '17px'
    },
    rowDiv: {
        marginTop:'4%'
    },
    rowStyle: {
        lineHeight: '3rem'
    },
    buttonDiv: {
        marginTop: '8%'
    },
    identityRight: {
        width: '100%',
        borderRadius: '52px',
        height: '4rem',
        fontSize: '17px',
        backgroundColor: '#1a76d1'
    },
    identityFalse: {
        width: '100%',
        borderRadius: '52px',
        height: '4rem',
        fontSize: '17px',
        border: '1px solid #1a76d1',
        marginTop: '6%'
    },
};
