import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import $ from 'jquery';
import { Icon, Row, Col, Button, } from 'antd';
import './style/exception.less';
import one from './style/404.png';
import two from './style/500.png';

class ExceptionPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      textList:[
        {code:500,textOne:"500",textTwo:"抱歉，服务器出错了,请重试"},
        {code:404,textOne:"404",textTwo:"抱歉，你访问的页面不存在，请检查网络连接!"},
        {code:403,textOne:"403",textTwo:"抱歉，你的访问被拒绝"},
      ]
    };
  }
  render() {
    var textOne;var textTwo;
    var { textList } = this.state;
    console.log("this.props.params",this.props.params);
    textList.forEach((item,index)=>{
      if(this.props.params == item.code){
        textOne = item.textOne;
        textTwo = item.textTwo;
      }
    })
    return (
      <div className="exceptionPage"  style={{height:'70hv'}}>
        <Row>
          <Col span={24}><center><img src={one} style={{width:420}}/></center></Col>
        </Row>
        <center className="center">
          <p className="p_title">{textOne}</p>
          <p className="p_content">{textTwo}</p>
        </center>
      </div>
    );
  }
}
export default ExceptionPage;
