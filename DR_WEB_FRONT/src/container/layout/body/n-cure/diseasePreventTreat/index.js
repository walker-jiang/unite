import React, {Component} from 'react';
import Cure from "../cureSort/cure.js"
import StartWork from "../cureSort/startWork.js"
import TestResults from "../cureSort/testResults.js"
import getResource from 'commonFunc/ajaxGetResource';

export default class DiseasePreventTreat extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: '',
      userId: '',
      imgUrl: '',
      sex: '',
      sexDesc: '',
      name: '',
      age: ''
    };
  };
  handleClick(pram){
     this.setState({
       visible: pram
     });
  };

  componentWillMount(){//患者是否存在 0或者1
    let cardtype = window.certificatesType?window.certificatesType:this.props.cardtype;
    let cardno = window.certificatesNumber?window.certificatesNumber:this.props.cardno;
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
        userId: res.data.user.userid,
        imgUrl: res.data.qrcode,
        sex: res.data.user.sex,
        sexDesc: res.data.user.sexDesc,
        name: res.data.user.name,
        age: res.data.user.birthday
      })
    };

    function error(res){
      console.log('失败',res)
    };

    getResource(params, success, error);
  }

  render() {
    let {visible,userId,imgUrl,sex,sexDesc,name,age}  = this.state
    let t  = null;
    if(visible == 0){
      t = <Cure onToggle={this.handleClick.bind(this)} imgUrl={imgUrl} />
    } else if(visible == 2) {
      t = <StartWork onToggle={this.handleClick.bind(this)} sex = {sex} userId = {userId} />
    } else if(visible == 1) {
      t = <TestResults onToggle={this.handleClick.bind(this)} userId = {userId} sexDesc = {sexDesc} name={name} age={age} />
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
