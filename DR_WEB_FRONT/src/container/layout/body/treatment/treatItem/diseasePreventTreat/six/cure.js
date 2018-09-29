import React, {Component} from 'react';
import { Button, Input, Radio, Progress, Row, Col } from 'antd'
import StartWork from "./startWork.js"
import CureOne from "./cureOne.js"
import CureTwo from "./cureTwo.js"
import "../css/cure.css";
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

  componentWillMount(){//患者是否存在 0或者1
    //let cardtype = window.cardtype;
    //let cardno = window.cardno;
    let params = {
      type: 'GET',
      url: 'healthcabin/user/qrcode',
      contentType: '',
      server_url: config_CureService_url,
      xhrFields:{withCredentials:true},
      crossDoman:true,
      data:{
        certificatesType: '1',
        certificatesNumber: '653024198209249589'
      }
    };
    let that = this;
    function success(res){
      console.log('子组件',res)
      that.setState({
        userId: res.data.user.userid,
        imgUrl: res.data.qrcode
      })
    };

    function error(res){
      console.log('失败',res)
    };

    getResource(params, success, error);
  }

  render() {
    let huoquValue = this.props.visible;
    let imgUrl = this.state.imgUrl;
    let c = null;
    if(huoquValue == 1){
      c = <CureOne/>
    } else if(huoquValue == 4){
      c = <CureTwo/>
    }
    return (
      <div className="textOwerFlow">
      <ScrollArea height={100}>
        <Row >
          <Col span={24} >
              <div>
                {c}
              </div>
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <div className="borderStyle">
              <div className="ewm">
                <p><span className="methodsOne">方法1：</span>&nbsp;&nbsp;&nbsp;
                  <span className="text">请让该患者用手机微信扫描该二维码登录
                  </span>
                </p>
                <p className="tiZhi">“体质辨析测试平台”完成测试</p>
                <img src={imgUrl} className="ewmPhoto"/>
              </div>
              <div className="ewm"><img src={line} className="sLine"/></div>
              <div className="ewmOne">
                <div className="message">
                  <p className="phoneLink">
                    <span className="methodsTwo">方法2：</span>&nbsp;&nbsp;&nbsp;
                    <span>您可以通过问答形式协助患者完成“体质辨析测评”</span>
                  </p>
                  <p className="wxts">
                    <img src={redHeart}/>温馨提示
                  </p>
                  <p className="anpai">
                    由于测评题目比较多，按照正常语速完成测评需要至少<span>5</span>分钟时间，请您<br/>合理安排体质辨析测评时间；
                  </p>
                  <br/>
                  <Button type="primary" size="large" className="sendMessage" onClick={this.handClick.bind(this)}>开始问答测评</Button>
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

const TreatmentList = Radium(Index);
export default TreatmentList;

/*
@作者：王崇琨
@日期：2018-07-08
@描述：治未病-选择一种方式答题
*/
