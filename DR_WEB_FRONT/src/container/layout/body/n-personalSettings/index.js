import React, {Component} from 'react';
import { From,Collapse,Icon } from 'antd';
import PersonalInformationSettings from"./PersonalInformationSettings";
import Ajax from 'commonFunc/ajaxGetResource';
import ChangePassword from "./ChangePassword";
import SystemVersion from "./SystemVersion";
import SystemOptions from "./SystemOptions";
import "./style.less";
import $ from "jquery";
const Panel = Collapse.Panel;
class PersonalSettings extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        UserModify:false,
        status:[],
        baPatient:{},
        dictListObj:[],
        deptData:[],
        imgFile:'',
        show:false
      };
  }
  componentWillMount(){
    console.log('patientid',window.sessionStorage,window.sessionStorage.getItem('userid'));
      this.getPatientData(window.sessionStorage.getItem('userid'));
      this.getDictList(['post']);
      this.getDept();

  }
  // BaOrguserController/getData?orgUerid=1

  getPatientData(id){
    let self = this;
    let params = {
      url: 'BaOrguserController/getData',
      server_url:'http://219.234.5.58:8086/',
      data: {
        orgUerid: id,
      },
    };
    function callBack(res){
      console.log('resres22222',res);
      if(res.result){
        self.setState({ baPatient: res.data });
      }else{
        console.log('异常响应信息', res);
      }
    };
    Ajax(params, callBack);
  };
  /**
   * [getDictList 获取字典列表]
   * @param  {[type]} DictTypeList [字典项数组]
   * @return {[type]}              [undefined]
   */
  getDictList(DictTypeList){
    let self = this;
    let params = {
      url: 'BaDatadictController/getListData',
      data: {
        dictNoList: DictTypeList
      },
    };
    function callBack(res){
      console.log('获取字典列表11111',res);
      if(res.result){
        // let dictListObj = {};
        let dictListObj = [];
        res.data.forEach(item => {
          // dictListObj[item.dictno.toLowerCase()] = item.baDatadictDetailList;
          dictListObj=item.baDatadictDetailList;
        });
        self.setState({dictListObj:dictListObj});
      }else{
        console.log('异常响应信息', res);
      }
    };
    Ajax(params, callBack);
  };
  //http://219.234.5.58:8087/swagger-ui.html#/

  /** [getDept 科室数据] */
  getDept=()=> {
    let params = {
      url: 'BaDepartmentController/getList',
      server_url: 'http://219.234.5.58:8086/',
      data: {
        orgid: window.sessionStorage.getItem('orgid')
      }
    };
    let that = this;
    function success(res) {
      console.log('科室数据:',res);
      if(res.result){
        let deptData = res.data;
        // deptData.forEach((val,i)=>{
          // that.getDocData(parseInt(val.deptid),val.deptname);
        // })
        that.setState({ deptData:deptData })
      }
    };
    Ajax(params, success);
  }

  Modify=(value,event)=>{
    // console.log("sad",value,event);
     event.stopPropagation();
     const Icon1 = $("#icon1"),
     Icon2 = $("#icon2"),
     Icon3 = $("#icon3"),
     Icon4 = $("#icon4");
    if(value=="User"){
      console.log("ssss");
      Icon1.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
      Icon2.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
      Icon3.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
      Icon4.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
      this.setState({status:["1"]});
      this.PersonalInformationSettings.isModify()
    }
    if (value=="个人设置") {
        this.PersonalInformationSettings.isModify()
    }else
    if (value=="修改密码") {
      this.ChangePassword.isModify()
    }else
    if (value=="系统选项") {
      console.log('isModifyisModify1111',this.SystemOptions);
      this.SystemOptions.isModify()
    }else
    if (value=="系统版本") {
      console.log('isModifyisModify',this.SystemVersion);
      this.SystemVersion.isModify()
    }else if(value=="User"){
        this.setState({UserModify:true})
    }
  }

  Modify1=(val,e)=>{
    // console.log('thisthis',this);
    const Icon1 = $("#icon1"),
    Icon2 = $("#icon2"),
    Icon3 = $("#icon3"),
    Icon4 = $("#icon4");
    if(val == '个人设置'){
      if(JSON.stringify(this.state.status) == '[]'){
        Icon1.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
        this.setState({status:["1"]})
      }else{
        if(JSON.stringify(this.state.status) == '["2"]'){
          Icon2.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon1.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["1"]})
        }else if ( JSON.stringify(this.state.status) == '["3"]') {
          Icon3.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon1.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["1"]})
        }else if ( JSON.stringify(this.state.status) == '["4"]') {
          Icon4.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon1.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["1"]})
        }else{
          Icon1.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          this.setState({status:[]})
        }
      }

    }else if(val == '修改密码'){
      if(JSON.stringify(this.state.status) == '[]'){
        Icon2.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
        this.setState({status:["2"]})
      }else{
        if(JSON.stringify(this.state.status) == '["1"]'){
          Icon1.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon2.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["2"]})
        }else if ( JSON.stringify(this.state.status) == '["3"]') {
          Icon3.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon2.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["2"]})
        }else if ( JSON.stringify(this.state.status) == '["4"]') {
          Icon4.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon2.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["2"]})
        }else{
          Icon2.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          this.setState({status:[]})
        }
      }
    }else if (val == '系统选项') {
      if(JSON.stringify(this.state.status) == '[]'){
        Icon3.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
        this.setState({status:["3"]})
      }else{
        if(JSON.stringify(this.state.status) == '["1"]'){
          Icon1.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon3.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["3"]})
        }else if ( JSON.stringify(this.state.status) == '["2"]') {
          Icon2.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon3.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["3"]})
        }else if ( JSON.stringify(this.state.status) == '["4"]') {
          Icon4.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon3.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["3"]})
        }else{
          Icon3.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          this.setState({status:[]})
        }

      }
    }else if (val == '系统版本') {
      if(JSON.stringify(this.state.status) == '[]'){
        Icon4.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
        this.setState({status:["4"]})
      }else{
        if(JSON.stringify(this.state.status) == '["1"]'){
          Icon1.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon4.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["4"]})
        }else if ( JSON.stringify(this.state.status) == '["2"]') {
          Icon2.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon4.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["4"]})
        }else if ( JSON.stringify(this.state.status) == '["3"]') {
          Icon3.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          Icon4.css({'transform':"rotate(-270deg)",'transform-origin':"33% 37% 0"})
          this.setState({status:["4"]})
        }else{
          Icon4.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"})
          this.setState({status:[]})
        }
      }
    }
  }
  handleClick=(img)=>{
    console.log("ssdasda");
    this.setState({Img:img})
  }
  render() {
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    return (
      <div className="PersonalSettings">
          <div className="title" style={{borderBottom:"1px solid #E4E4E4"}}>
              <h2 style={this.state.show?{fontSize:"13px"}:{fontSize:"13px"}}>个人设置</h2>
          </div>
          <div style={{marginTop:"20px",marginLeft: "3%"}}>
            <div style={{width:"70%",marginLeft:"10px",float:"left"}}>
              <Collapse accordion={false} activeKey={this.state.status}>
                <Panel   showArrow={false} header={
                    <div style={{overflow:"hidden",height:"40px",position:"absolute",top:0,width:"100%",lineHeight:"40px"}}>
                      <p style={{width:"50%",float:"left"}}>
                        <span>个人信息设置</span>
                        <sapn style={{color:"#999",fontSize:"12px",marginLeft:"20px"}}>修改和完善个人登录信息</sapn>
                      </p>
                      <p style={{width:"50%",float:"right",textAlign:"right"}}>
                        <span style={{marginRight:"6%"}}><img onClick={(e)=>{this.Modify("个人设置",e)}} src={require("./images/10.png")}></img></span>
                        <Icon id='icon1' onClick={(e)=>{this.Modify1('个人设置',e)}} type="double-left" theme="outlined" style={{marginRight:"6%",transform:'rotate(-90deg)',color:'#0B6ECB',fontSize:'16px',height:'22px',fontWeight:'bolder' }}></Icon>
                      </p>
                    </div>} key="1">
                  <PersonalInformationSettings prop={[this.state.baPatient,this.state.dictListObj,this.state.deptData,{'status':this.state.status}]} handleClick={this.handleClick.bind(this)}  wrappedComponentRef={(inst)=>this.PersonalInformationSettings=inst}/>
                </Panel>
                <Panel showArrow={false} header={
                    <div style={{overflow:"hidden",height:"40px",position:"absolute",top:0,width:"100%",lineHeight:"40px"}}>
                      <p style={{width:"50%",float:"left"}}>
                        <span>修改密码</span>
                        <sapn style={{color:"#999",fontSize:"12px",marginLeft:"20px"}}>定期修改登录密码，减小密码泄露风险</sapn>
                      </p>
                      <p style={{width:"50%",float:"right",textAlign:"right"}}>
                        <span style={{marginRight:"6%"}}><img onClick={(e)=>{this.Modify("修改密码",e)}} src={require("./images/10.png")}></img></span>
                        <Icon id='icon2' onClick={(e)=>{this.Modify1('修改密码',e)}} type="double-left" theme="outlined" style={{marginRight:"6%",transform:'rotate(-90deg)',color:'#0B6ECB',fontSize:'16px',height:'22px',fontWeight:'bolder' }}></Icon>
                      </p>
                    </div>
                } key="2">
                  <ChangePassword wrappedComponentRef={(inst)=>this.ChangePassword=inst}></ChangePassword>
                </Panel>
                <Panel showArrow={false} header={
                  <div style={{overflow:"hidden",height:"40px",position:"absolute",top:0,width:"100%",lineHeight:"40px"}}>
                    <p style={{width:"50%",float:"left"}}>
                      <span>系统选项</span>
                      <sapn style={{color:"#999",fontSize:"12px",marginLeft:"20px"}}>定义系统运行的的各种参数信息</sapn>
                    </p>
                    <p style={{width:"50%",float:"right",textAlign:"right"}}>
                      <span style={{marginRight:"6%"}}><img onClick={(e)=>{this.Modify("系统选项",e)}} src={require("./images/10.png")}></img></span>
                      <Icon id='icon3' onClick={(e)=>{this.Modify1('系统选项',e)}} type="double-left" theme="outlined" style={{marginRight:"6%",transform:'rotate(-90deg)',color:'#0B6ECB',fontSize:'16px',height:'22px',fontWeight:'bolder' }}></Icon>
                    </p>
                  </div>
                  } key="3">
                  <SystemOptions wrappedComponentRef={(inst)=>this.SystemOptions=inst}></SystemOptions>
                </Panel>
                <Panel showArrow={false} header={
                  <div style={{overflow:"hidden",height:"40px",position:"absolute",top:0,width:"100%",lineHeight:"40px"}}>
                    <p style={{width:"50%",float:"left"}}>
                      <span>系统版本</span>
                      <sapn style={{color:"#999",fontSize:"12px",marginLeft:"20px"}}>查看版本号，手动更新版本</sapn>
                    </p>
                    <p style={{width:"50%",float:"right",textAlign:"right"}}>
                      <span style={{marginRight:"6%"}}><img onClick={(e)=>{this.Modify("系统版本",e)}} src={require("./images/10.png")}></img></span>
                      <Icon id='icon4' onClick={(e)=>{this.Modify1('系统版本',e)}} type="double-left" theme="outlined" style={{marginRight:"6%",transform:'rotate(-90deg)',color:'#0B6ECB',fontSize:'16px',height:'22px',fontWeight:'bolder' }}></Icon>
                    </p>
                  </div>
                  } key="4">
                  <SystemVersion wrappedComponentRef={(inst)=>this.SystemVersion=inst}></SystemVersion>
                </Panel>
              </Collapse>
            </div>
            <div style={{width:"28%",float:"right",borderLeft:"1px solid #E7E7E7",paddingLeft:"2%"}}>
              <div style={{padding:"0 0 20px 0",borderBottom:"1px solid #E7E7E7",marginRight:"20%"}}>
                <img style={{width:"100px",height:"100px"}} src={this.state.Img?this.state.Img:this.state.baPatient.photo}></img>
              </div>
              <div className="details" style={{padding:"20px 0 20px 0",borderBottom:"1px solid #E7E7E7",marginRight:"20%"}}>
                <p>当前用户： <span>{this.state.baPatient.realname}</span><span style={{marginLeft:"20px"}}><img onClick={(e)=>{this.Modify("User",e)}} src={require("./images/10.png")}></img></span></p>
                <p>所在科室： <span>{this.state.baPatient.deptidDic}</span></p>
                <p>职务职级： <span>{this.state.baPatient.postDic}</span></p>
              </div>
              <div className="details" style={{padding:"20px 0 20px 0"}}>
                <p>机构编号： <span>{this.state.baPatient.orgcode} </span><span style={{marginLeft:"20px"}}><img onClick={this.Modify} src={require("./images/10.png")}></img></span></p>
                <p>机构名称： <span>{this.state.baPatient.orgName}</span></p>
                <p>机构类型： <span>{this.state.baPatient.orgidDic}</span></p>
              </div>
            </div>
          </div>
      </div>

    )
  }
}
export default PersonalSettings
