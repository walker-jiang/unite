import React, {Component} from 'react';
import { Button, Row, Col } from 'antd';
import tp from "../images/tipPhoto.png";
import redHeart from "../images/redHeart.png";
import welcome from "../images/welcome.png";

export default class SelectionTestHistory extends Component {
  constructor(props){
    super(props);
  };

  handClickQuestion(){
    let pram = 4;
    this.props.onToggle(pram);
   }

   handClickHistory(){
    let pram = 5;
    this.props.onToggle(pram);
  }

  render() {
    let name = this.props.name;
    return (
      <div>
        <div>
          <Row type="flex" justify="start">
              <Col xs={24} sm={24}>
                <div style={styles.titleTip}>
                  <img src={tp} style={styles.tipPhoto}/>
                  <h2 style={styles.syso}>中医体质辨析测评系统</h2>
                </div>
              </Col>
          </Row>
        </div>
        <div>
            <Row type="flex" justify="start">
                <Col xs={24} sm={24} style={styles.header}>
                  <img src={welcome} style={styles.systemPhoto}/>
                  <span style={styles.welcome}>
                    <span style={styles.name}>
                      {name}
                    </span>
                    您好，请按照提示认证完成
                    <span style={styles.system}>
                      中医体质辨析测评
                    </span>
                  </span>
                </Col>
            </Row>
        </div>
        <Row type="flex" justify="start">
            <Col xs={23} sm={23}>
                <div style={styles.line}></div>
            </Col>
        </Row>
        <div style={styles.warmDiv}>
          <Row type="flex" justify="start">
              <Col xs={24} sm={24}>
                  <div>
                    <img src={redHeart} style={styles.redHeart}/>
                    <h2 style={styles.warmPrompt}>温馨提示</h2>
                  </div>
              </Col>
          </Row>
        </div>
        <div style={styles.paragraphDiv}>
          <Row type="flex" justify="start">
              <Col xs={23} sm={23}>
                  <div style={styles.paragraph}>
                    <p>1.本次测试是通过中医辨证分析手段对您的体质进行初步的辨析测评，测评结果可作为医生诊疗的参考数据之一，但并不是诊断最终结果；</p>
                    <p>2.为了保证测试结果的准确性和有效性，请您在测试过程中请您按照您的实际情况认真作答。</p>
                    <p>3.如果在测试过程中有疑问请与医疗机构相关人员联系；</p>
                  </div>
              </Col>
              <Col xs={1} sm={1}>

              </Col>
          </Row>
        </div>
        <div style={styles.buttonDiv}>
            <Row type="flex" justify="start">
                <Col xs={22} sm={22} offset={1}>
                <Button style={styles.measurement} type="primary" size="large" onClick={this.handClickQuestion.bind(this)}>
                立即开始测评
                </Button>
                </Col>
            </Row>
            <Row type="flex" justify="start">
                <Col xs={22} sm={22} offset={1}>
                <Button  style={styles.measurementHistory} type="default" size="large" onClick={this.handClickHistory.bind(this)}>
                查看测评历史
                </Button>
                </Col>
            </Row>
        </div>
      </div>
    );
  }
}

const styles = {
  titleTip: {
    width: '100%',
    height: '8rem',
    backgroundColor: 'rgb(26, 118, 209)',
    marginTop: '-2rem',
    position: 'relative'
  },
  tipPhoto: {
    marginLeft: '2%',
    marginTop: '11%',
    width: '7%'
  },
  header: {
    position: 'relative'
  },
  systemPhoto: {
    marginLeft: '1rem',
    marginTop: '5%',
    height: '2rem',
  },
  syso: {
    marginLeft: '10%',
    marginTop: '-8%',
    fontSize: '22px',
    color: 'white',
    position: 'absolute'
  },
  welcome: {
    fontSize: '15px',
    marginLeft: '1rem',
    marginTop: '1.7rem',
    position: 'absolute'
  },
  name: {
    color: '#1A76D1',
    fontSize: '15px'
  },
  system: {
    color: '#15B3BC',
    fontSize: '15px'
  },
  line: {
    border: '1px solid #E8E8E8',
    width: '100%',
    marginLeft: '0.5rem',
    marginTop: '3%'
  },
  warmDiv:　{
    marginTop: '8%'
  },
  redHeart: {
    marginLeft: '1rem'
  },
  warmPrompt: {
    marginLeft: '3.2rem',
    fontSize: '17px',
    marginTop: '-5.8%'
  },
  paragraphDiv: {
    marginTop: '5%'
  },
  paragraph: {
    marginLeft: '2%',
    fontSize: '15px',
    color: '#666666'
  },
  buttonDiv: {
    marginTop: '8%'
  },
  measurement: {
    width: '100%',
    borderRadius: '52px',
    height: '4rem',
    fontSize: '17px',
    backgroundColor: '#1a76d1'
  },
  measurementHistory: {
    width: '100%',
    borderRadius: '52px',
    height: '4rem',
    fontSize: '17px',
    border: '1px solid #1a76d1',
    marginTop: '6%'
  }
}
