import React, {Component} from 'react';
import { Button, Input, Radio, Progress, Row, Col } from 'antd'
import StartWork from "./startWork.js"
import CureOne from "./cureOne.js"
import CureTwo from "./cureTwo.js"
import line from "../images/line.png";
import ewm from "../images/ewm.png";
import redHeart from "../images/redHeart.png";
import Radium from 'radium';
import ScrollArea from 'components/scrollArea';
import getResource from 'commonFunc/ajaxGetResource';

const bodyHeight = document.body.clientHeight;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 1,
      userId: '',
      imgUrl: ''
    };
  };

  handClick () {
    let pram = 2;
    this.props.onToggle(pram);
  }

  render() {
    let huoquValue = this.props.visible;
    let sexDesc = this.props.sexDesc;
    let name = this.props.name;
    let patientAge = this.props.patientAge;
    let phone = this.props.phone;
    let imgUrl = this.props.imgUrl;
    let c = null;
    if(huoquValue == 0){
      c = <CureOne/>
    } else if(huoquValue == 3){
      c = <CureTwo/>
    }
    return (
      <div>
      <ScrollArea height={100}>
        <Row >
          <Col span={24} >
              <div>
                {c}
              </div>
          </Col>
        </Row>
        <Row >
          <Col span={24} >
              <div style={styles.secondRow}>
                <span style={styles.patientText}>测评患者:</span>
                <span style={styles.patientMessage}>{name}&nbsp;&nbsp;/&nbsp;&nbsp;{sexDesc}&nbsp;&nbsp;/&nbsp;&nbsp;{patientAge}&nbsp;&nbsp;/&nbsp;&nbsp;{phone}</span>
              </div>
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <div style={styles.borderStyle}>
              <div style={styles.ewm}>
                <p><span style={styles.methodsOne}>方法1：</span>&nbsp;&nbsp;&nbsp;
                  <span>请让该患者用手机微信扫描该二维码登录
                  </span>
                </p>
                <p style={styles.tiZhi}>“体质辨析测试平台”完成测试</p>
                <img src={imgUrl} style={styles.ewmPhoto}/>
              </div>
              <div style={styles.ewm}><img src={line} style={styles.sLine} /></div>
              <div style={styles.ewmOne}>
                <div style={styles.message}>
                  <p style={styles.phoneLink}>
                    <span style={styles.methodsTwo}>方法2：</span>&nbsp;&nbsp;&nbsp;
                    <span>您可以通过问答形式协助患者完成“体质辨析测评”</span>
                  </p>
                  <p style={styles.wxts}>
                    <img src={redHeart}/>温馨提示
                  </p>
                  <p style={styles.anpai}>
                    由于测评题目比较多，按照正常语速完成测评需要至少<span style={styles.fiveMinu}>5</span>分钟时间，请您<br/>合理安排体质辨析测评时间；
                  </p>
                  <br/>
                  <Button type="primary" size="large" style={styles.sendMessage} onClick={this.handClick.bind(this)}>开始问答测评</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        </ScrollArea>
      </div>
    );
  }
}

const styles = {
  secondRow: {
    display: 'flex',
    marginLeft: '5rem',
    marginTop: '6rem',
    marginBottom: '-3rem'
  },
  patientText:{
    fontFamily: 'MicrosoftYaHei, Microsoft YaHei',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#666666',
  },
  patientMessage: {
    fontFamily: 'MicrosoftYaHei,Microsoft YaHei',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#0A6ECB',
    marginLeft: '1rem'
  },
  borderStyle: {
    width: '100%',
    height: '455px',
    background: 'inherit',
    backgroundColor: 'rgba(242, 242, 242, 0)',
    boxSizing: 'border-box',
    border: '1px solid rgba(228, 228, 228, 1)',
    borderRadius: '0px',
    marginTop: '5rem',
  },
  ewm: {
    float: 'left',
    marginTop: '5.8%',
    color: 'black'
  },
  methodsOne: {
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
	  fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '16px',
    marginLeft: '56px'
  },
  tiZhi: {
    marginLeft: '33%',
	  marginTop: '0em'
  },
  ewmPhoto: {
    width: '256px',
    height: '256px',
    marginTop: '5%',
    marginLeft: '122px'
  },
  ewmOne: {
    float: 'left',
    marginLeft: '6%',
    width: '45%'
  },
  sLine: {
    width: '2px',
    height: '330px',
    marginLeft: '70px',
    marginTop: '5.4%'
  },
  message: {
    marginTop: '50px'
  },
  phoneLink: {
    marginTop: '12.9%',
	  color: 'black'
  },
  wxts: {
    marginTop: '5.6%',
    marginLeft: '12.4%'
  },
  anpai: {
    marginLeft: '12.4%',
    marginTop: '3%'
  },
  methodsTwo: {
    fontFamily: 'MicrosoftYaHei, 微软雅黑',
	  fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '16px',
    color: 'black'
  },
  sendMessage: {
    width: '100px',
    height: '30px',
    backgroundColor: 'rgb(51,204,0,1)',
    borderColor: 'rgb(51,204,0,1)',
    color: 'white',
    fontSize: '12px',
    borderRadius: '20px',
    marginLeft: '13%'
  },
  fiveMinu: {
    color: 'red'
  }
}

const TreatmentList = Radium(Index);
export default TreatmentList;

/*
@作者：王崇琨
@日期：2018-07-08
@描述：治未病-选择一种方式答题
*/
