import React, {Component} from 'react';
import { WSAEINVALIDPROVIDER } from 'constants';
import { Button, Row, Col } from 'antd';
import idenFalse from "../../images/idenFalse.png";

export default class False extends Component {
  constructor(props){
    super(props);
  };

  render() { 
    return (
      <div>
        <div>
          <Row type="flex" justify="start">
              <Col xs={24} sm={24}> 
                <div style={styles.shenfenTitle}>
                  <h2 style={styles.sysoYan}>身份验证失败</h2>
                </div>       
              </Col>
          </Row>
        </div>
        <br/>
        <br/>
        <Row type="flex" justify="start">
          <Col xs={24} sm={24}> 
            <div>
              <img src={idenFalse} style={styles.idenFalse}/>  
            </div>       
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col xs={24} sm={24}> 
            <div style={styles.idenTop}>
              <p style={styles.idenFalseTip}>身份验证失败</p>  
            </div>       
          </Col>
        </Row>
        <div style={styles.doctorTip}>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}> 
              <div>
                <p style={styles.doctor}>请您与医生/护士终端确认之后</p>  
              </div>       
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}> 
              <div>
                <p style={styles.backOther}>返回微信或其他扫码软件</p>  
              </div>       
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}> 
              <div>
                <p style={styles.scanning}>重新扫描二维码重试</p>  
              </div>       
            </Col>
          </Row>
        </div>  
      </div> 
    );
  }
}

const styles = {
  shenfenTitle: {
    width: '100%',
    height: '8rem',
    backgroundColor: 'rgb(26, 118, 209)',
    marginTop: '-2rem',
    position: 'relative'
  },
  sysoYan: {
    marginLeft: '12rem',
    paddingTop: '3.5rem',
    fontSize: '22px',
    color: 'white',
    position: 'absolute'
  },
  idenFalse: {
    width: '10rem',
    marginLeft: '12.6rem'
  },
  idenTop: {
    marginTop: '2%'
  },
  idenFalseTip: {
    fontSize: '20px',
    color: '#333333',
    marginLeft: '12.5rem'
  },
  doctorTip: {
    marginTop: '2%'
  },
  doctor: {
    fontSize: '16px',
    marginLeft: '8.5rem'
  },
  backOther: {
    fontSize: '16px',
    marginLeft: '10.2rem'
  },
  scanning: {
    fontSize: '16px',
    marginLeft: '11.6rem',
    color: '#15B3BC'
  }
}