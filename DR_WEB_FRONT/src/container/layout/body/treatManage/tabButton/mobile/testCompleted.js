import React, {Component} from 'react';
import { Button, Row, Col, Icon } from 'antd';
import endOf from '../../images/endOf.png';
import tp from "../../images/tipPhoto.png";

export default class TestCompleted extends Component {
  constructor(props){
    super(props);
  };

  handClickViewResultsReport(){
    let pram = 5;
    this.props.onToggle(pram);
  }
  render() { 
    return (
      <div>
        <div>
            <Row type="flex" justify="start">
                <Col xs={24} sm={24}> 
                    <div style={styles.theEndOf}>
                        <h2 style={styles.completeEvaluation}>完成测评</h2>  
                    </div>    
                </Col>
            </Row>
        </div>
        <div style={styles.endDiv}>
          <Row type="flex" justify="start">
            <Col xs={14} sm={14}> 
              <img src={endOf} style={styles.endOf}/>   
            </Col>
            <Col xs={10} sm={10}> 

            </Col>
          </Row>
          <div style={styles.pDiv}>
            <Row type="flex" justify="start">
              <Col xs={24} sm={24}> 
                <p style={styles.pOne}>您的中医体质辨析</p>   
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col xs={24} sm={24}> 
                <p style={styles.pTwo}>测评已完成</p>  
              </Col>
            </Row>
          </div>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24}> 
              <div style={styles.finishDiv}>
                <Icon type="check" style={styles.iconSize}/>
                <p style={styles.pThree}>已生成中医体质辨析测评结果报告</p> 
              </div> 
            </Col>
          </Row>
        </div>
        <div>
            <Row type="flex" justify="start">
                <Col xs={22} sm={22} offset={1}>
                <Button style={styles.viewResultsReport} type="primary" size="large" onClick={this.handClickViewResultsReport.bind(this)}>
                  <img src={tp} style={styles.tipPhoto}/>查看测评结果报告
                </Button>
                </Col>
            </Row>
        </div>
      </div> 
    );
  }
}

const styles = {
  theEndOf: {
    width: '100%',
    height: '8rem',
    backgroundColor: 'rgb(26, 118, 209)',
    marginTop: '-2rem',
    position: 'relative'
  },
  completeEvaluation: {
    color: 'white',
    fontSize: '22px',
    paddingTop: '3.5rem',
    position: 'absolute',
    marginLeft: '14rem'
  },
  endDiv: {
    marginTop: '14%'
  },
  endOf: {
    width: '8rem',
    marginLeft: '14rem'
  },
  pDiv: {
    marginTop: '5%'
  },
  pOne: {
    fontSize: '21px',
    color: '#333333',
    marginLeft: '6.3em'
  },
  pTwo: {
    fontSize: '21px',
    color: '#333333',
    marginLeft: '13.7rem'
  },
  finishDiv: {
    marginTop: '3%'
  },
  iconSize: {
    fontSize: '28px',
    color: '#33cc00',
    marginLeft: '4rem'
  },
  pThree: {
    fontSize: '16px',
    color: '#1a76d1',
    marginLeft: '7rem',
    marginTop: '-2.2rem'
  },
  viewResultsReport: {
    width: '100%',
    borderRadius: '52px',
    height: '4rem',
    fontSize: '17px',
    backgroundColor: '#1a76d1',
    marginTop: '9%'
  }
}