import React, {Component} from 'react';
import Cure from "./six/cure.js"
import StartWork from "./six/startWork.js"
import TestResults from "./six/testResults.js"
import getResource from 'commonFunc/ajaxGetResource';

export default class DiseasePreventTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: '',
      userId: ''
    };
  };
  handleClick(pram){
     this.setState({
       visible: pram
     });
  };

  componentWillMount(){//患者是否存在 0或者1
    let cardtype = window.cardtype;
    let cardno = window.cardno;
    let params = {
      type: 'GET',
      url: 'healthcabin/user/qrcode',
      contentType: '',
      server_url: config_CureService_url,
      xhrFields:{withCredentials:true},
      crossDoman:true,
      data:{
        certificatesType: cardtype,
        certificatesNumber: cardno
      }
    };
    let that = this;
    function success(res){
      console.log('父组件',res)
      that.setState({
        visible: res.data.first,
        userId: res.data.user.userid
      })
    };

    function error(res){
      console.log('失败',res)
    };

    getResource(params, success, error);
  }

  render() {
    console.log('usid',this.state.userId)
    let {visible,userId}  = this.state
    console.log('visible', visible);
    let t  = null;
    if(visible == 0){
      t = <Cure onToggle={this.handleClick.bind(this)}/>
    } else if(visible == 2) {
      t = <StartWork onToggle={this.handleClick.bind(this)} />
    } else if(visible == 1) {
      t = <TestResults onToggle={this.handleClick.bind(this)} userId = {userId}/>
    }
    return (
      <div>
       {
        t
       }
      </div>
    );
  }
}
/*
@作者：姜中希
@日期：2018-06-30
@描述：治未病容器
*/
