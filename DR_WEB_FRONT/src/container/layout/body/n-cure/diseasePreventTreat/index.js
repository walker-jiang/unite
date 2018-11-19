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
      patientAge: '',
      phone: ''
    };
  };
  handleClick(pram){
     this.setState({
       visible: pram
     });
  };

  componentWillMount(){//患者是否存在 0或者1
    // let cardtype = window.certificatesType?window.certificatesType:this.props.cardtype;
    // let cardno = window.certificatesNumber?window.certificatesNumber:this.props.cardno;
    let cardtype = this.props.cardtype;
    let cardno = this.props.cardno;
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
      var date = new Date;
      var year = date.getFullYear(); 
      that.setState({
        visible: res.data.first,
        userId: res.data.user.userid || that.props.patientid,
        imgUrl: res.data.qrcode,
        sex: res.data.user.sex || that.props.sex,
        sexDesc: res.data.user.sexDesc || that.props.sexDic,
        name: res.data.user.name || that.props.patientname,
        patientAge: that.props.birthday || (year - res.data.user.birthday.substr(0,4)) ,
        phone: res.data.user.phone || that.props.mobile
      })
    };

    function error(res){
      console.log('失败',res)
    };

    getResource(params, success, error);
  }

  render() {
    console.log('usid',this.state.userId)
    console.log('sex&&&&&&&&&&',this.state.sex)
    console.log('#################',this.state.patientAge)
    let {visible,userId,imgUrl,sex,sexDesc,name,patientAge,phone}  = this.state
    // var date = new Date;
    // var year = date.getFullYear(); 
    // let patientAge = year - age.substr(0,4)
    // console.log('patientAge', patientAge);
    let t  = null;
    if(visible == 0){
      t = <Cure onToggle={this.handleClick.bind(this)} visible={visible} imgUrl={imgUrl} sexDesc = {sexDesc} name={name} patientAge={patientAge} phone={phone} />
    } else if(visible == 2) {
      t = <StartWork onToggle={this.handleClick.bind(this)} userId = {userId} sex = {sex} sexDesc = {sexDesc} name={name} patientAge={patientAge} phone={phone} />
    } else if(visible == 1) {
      t = <TestResults onToggle={this.handleClick.bind(this)} userId = {userId} sexDesc = {sexDesc} name={name} patientAge={patientAge} phone={phone}/>
    } else if(visible == 3) {
      t = <Cure onToggle={this.handleClick.bind(this)} visible={visible} imgUrl={imgUrl} sexDesc = {sexDesc} name={name} patientAge={patientAge}  phone={phone} />
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
