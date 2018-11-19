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
        show:false,
        num:true,
        vername:'',
        deptcode:'',
        realname:'',        //用户名
        deptcodeDic:'',      //科室
        postDic:'',         //职级
        orgcode:'',         //机构编号
        orgName:'',        //机构名称
        orgidDic:'',         //机构类型
      };
  }
  componentWillMount(){
    // const cusVerson = window.getClientVersion();//本地客户端版本第一次获取
    // this.setState({cusVerson})
    this.getVerson('1');//1,7,8
    this.getPatientData(window.sessionStorage.getItem('userid'));//, window.sessionStorage.getItem('token')
    this.getDictList(['post']);
    this.getDept();
  }
  //获取服务器版本
  getVerson=(id)=>{
    const this_=this;
    let params = {
      url: 'SyVersionController/getData',
      server_url:config_login_url,
      data: {
        verid: id,
      },
    };
    function callBack(res){
      if(res.result){
        var vername=res.data.vername
        // console.log('版本信息',res.data)
        this_.setState({
          vername:vername
        })
      }
    }
    Ajax(params, callBack);
  }
  /**
   * [getPatientData 获取用户信息]
   * @param  {[type]} id    [用户id]
   * @param  {[type]} token [可控]
   * @return {[type]}       [undefined]
   */
  getPatientData=(id)=>{
    let self = this;
    let params = {
      url: 'BaOrguserController/getData',
      server_url:config_login_url,
      data: {
        orgUserid:id,
      },
    };
    function callBack(res){
      if(res.result && res.data){
        self.setState({ baPatient: res.data,realname:res.data.realname,deptcodeDic:res.data.deptcodeDic, postDic:res.data.postDic, orgcode:res.data.orgcode, orgName:res.data.orgName, orgidDic:res.data.orgidDic});
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
      data: {
        orgid: window.sessionStorage.getItem('orgid')
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        // console.log('科室数据：',res);
        // deptData.forEach((val,i)=>{
          // that.getDocData(parseInt(val.deptid),val.deptname);
        // })

        that.setState({ deptData:res.data},()=>{

        })

      }
    };
    Ajax(params, success);
  }

  Modify=(value,event)=>{
    const this_=this;
     event.stopPropagation();
    if (value=="个人设置" || value=="User") {
      if(JSON.stringify(this.state.status) == '["1"]' && this.state.num){
        this.setState({num:false})
        this_.PersonalInformationSettings.isModify()
      }else{
        this.Modify1(value,window.event);
        setTimeout(function(){ this_.PersonalInformationSettings.isModify() }, 10);
      }
    }else if (value=="修改密码") {
      if(JSON.stringify(this.state.status) == '["2"]' && this.state.num){
        this.setState({num:false})
        this_.ChangePassword.isModify()
      }else{
        this.Modify1(value,window.event);
        setTimeout(function(){ this_.ChangePassword.isModify() }, 10);
      }
      // this.Modify1(value,window.event);
      // setTimeout(function(){ this_.ChangePassword.isModify() }, 10);
    }else if (value=="系统选项") {
      if(JSON.stringify(this.state.status) == '["3"]' && this.state.num){
        this.setState({num:false})
        this_.SystemOptions.isModify()
      }else{
        this.Modify1(value,window.event);
        setTimeout(function(){ this_.SystemOptions.isModify() }, 10);
      }
      // this.Modify1(value,window.event);
      // setTimeout(function(){ this_.SystemOptions.isModify() }, 10);
    }else if (value=="系统版本") {
      this.Modify1(value,window.event);
      // setTimeout(function(){ this_.SystemVersion.isModify() }, 10);
    }
  }

  Modify1=(val,e)=>{
    this.setState({num:true})
    // console.log('thisthis',this);
    const Icon1 = $("#icon1"),
    Icon2 = $("#icon2"),
    Icon3 = $("#icon3"),
    Icon4 = $("#icon4");
    if(val == '个人设置' || val=="User"){
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
  handleStatus=(status)=>{
    this.setState({status:status});
    const Icon1 = $("#icon1"),
    Icon2 = $("#icon2"),
    Icon3 = $("#icon3"),
    Icon4 = $("#icon4");
    Icon1.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"});
    Icon2.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"});
    Icon3.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"});
    Icon4.css({'transform':"rotate(-90deg)",'transform-origin':"48% 54% 0"});
  }
  handleClick=(img)=>{
    // console.log("ssdasda");
    this.setState({Img:img})
  }
  upSta=(e)=>{
    this.setState({status:[]})
    // console.log('$(e.target)',$(e.target).parent().parent().parent().siblings().find('i'));
    $(e.target).parent().parent().parent().siblings().find('i').css({'transform':'rotate(-90deg)'})
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
              <h2 style={this.state.show?{fontSize:"13px"}:{fontSize:"16px"}}>个人设置</h2>
          </div>
          <div style={{marginTop:"20px",marginLeft: "3%"}}>
            <div style={{width:"70%",marginLeft:"10px",float:"left"}}>
              <Collapse accordion={false} activeKey={this.state.status}>
                <Panel className='styleTop' style={{position:'relative'}} showArrow={false} header={
                  <div style={{overflow:"hidden",height:"44px",position:"absolute",top:0,width:"100%",lineHeight:"44px"}}>
                    <p style={{width:"50%",float:"left"}}>
                      <span style={{fontWeight:'bold'}}>个人信息设置</span>
                      <span style={{color:"#999",fontSize:"12px",marginLeft:"20px"}}>修改和完善个人登录信息</span>
                    </p>
                    <p style={{width:"50%",float:"right",textAlign:"right"}}>
                      <span style={{marginRight:"6%"}}><img onClick={(e)=>{this.Modify("个人设置",e)}} src={require("./images/10.png")}></img></span>
                      <Icon id='icon1' onClick={(e)=>{this.Modify1('个人设置',e)}} type="double-left" theme="outlined" style={{marginRight:"6%",transform:'rotate(-90deg)',color:'#0B6ECB',fontSize:'16px',height:'22px',fontWeight:'bolder' }}></Icon>
                    </p>
                  </div>} key="1">
                  <PersonalInformationSettings handleStatus={this.handleStatus} getPatientData={this.getPatientData} prop={[this.state.baPatient,this.state.dictListObj,this.state.deptData,{'status':this.state.status}]} handleClick={this.handleClick.bind(this)}  wrappedComponentRef={(inst)=>this.PersonalInformationSettings=inst}/>
                  <div onClick={this.upSta} style={{position:'absolute',bottom:'28px',right:'56px',fontSize:'15px',color:'#0B6ECB',cursor:'pointer'}}><span>收起</span> <Icon style={{transform:'rotate(90deg)'}} type='double-left'/></div>
                </Panel>
                <Panel className='styleTop' style={{position:'relative'}} showArrow={false} header={
                    <div style={{overflow:"hidden",height:"40px",position:"absolute",top:0,width:"100%",lineHeight:"40px"}}>
                      <p style={{width:"50%",float:"left"}}>
                        <span style={{fontWeight:'bold'}}>修改密码</span>
                        <span style={{color:"#999",fontSize:"12px",marginLeft:" 43px"}}>定期修改登录密码，减小密码泄露风险</span>
                      </p>
                      <p style={{width:"50%",float:"right",textAlign:"right"}}>
                        <span style={{marginRight:"6%"}}><img onClick={(e)=>{this.Modify("修改密码",e)}} src={require("./images/10.png")}></img></span>
                        <Icon id='icon2' onClick={(e)=>{this.Modify1('修改密码',e)}} type="double-left" theme="outlined" style={{marginRight:"6%",transform:'rotate(-90deg)',color:'#0B6ECB',fontSize:'16px',height:'22px',fontWeight:'bolder' }}></Icon>
                      </p>
                    </div>
                } key="2">
                  <ChangePassword handleStatus={this.handleStatus} prop={this.state.baPatient.realname} wrappedComponentRef={(inst)=>this.ChangePassword=inst}></ChangePassword>
                  <div onClick={this.upSta} style={{position:'absolute',bottom:'28px',right:'56px',fontSize:'15px',color:'#0B6ECB',cursor:'pointer'}}><span>收起</span> <Icon style={{transform:'rotate(90deg)'}} type='double-left'/></div>
                </Panel>
                <Panel className='styleTop' style={{position:'relative'}} showArrow={false} header={
                  <div style={{overflow:"hidden",height:"40px",position:"absolute",top:0,width:"100%",lineHeight:"40px"}}>
                    <p style={{width:"50%",float:"left"}}>
                      <span style={{fontWeight:'bold'}}>系统选项</span>
                      <span style={{color:"#999",fontSize:"12px",marginLeft:" 43px"}}>定义系统运行的的各种参数信息</span>
                    </p>
                    <p style={{width:"50%",float:"right",textAlign:"right"}}>
                      <span style={{marginRight:"6%"}}><img onClick={(e)=>{this.Modify("系统选项",e)}} src={require("./images/10.png")}></img></span>
                      <Icon id='icon3' onClick={(e)=>{this.Modify1('系统选项',e)}} type="double-left" theme="outlined" style={{marginRight:"6%",transform:'rotate(-90deg)',color:'#0B6ECB',fontSize:'16px',height:'22px',fontWeight:'bolder' }}></Icon>
                    </p>
                  </div>
                  } key="3">
                  <SystemOptions handleStatus={this.handleStatus} wrappedComponentRef={(inst)=>this.SystemOptions=inst}></SystemOptions>
                  <div onClick={this.upSta} style={{position:'absolute',top:'405px',right:'56px',fontSize:'15px',color:'#0B6ECB',cursor:'pointer'}}><span>收起</span> <Icon style={{transform:'rotate(90deg)'}} type='double-left'/></div>
                </Panel>
                <Panel className='styleTop' showArrow={false} header={
                  <div style={{overflow:"hidden",height:"40px",position:"absolute",top:0,width:"100%",lineHeight:"40px"}}>
                    <p style={{width:"50%",float:"left"}}>
                      <span style={{fontWeight:'bold'}}>系统版本</span>
                      <span style={{color:"#999",fontSize:"12px",marginLeft:" 43px"}}>查看版本号，手动更新版本</span>
                    </p>
                    <p style={{width:"50%",float:"right",textAlign:"right"}}>
                      <span style={{marginRight:"6%"}}><img onClick={(e)=>{this.Modify("系统版本",e)}} src={require("./images/10.png")}></img></span>
                      <Icon id='icon4' onClick={(e)=>{this.Modify1('系统版本',e)}} type="double-left" theme="outlined" style={{marginRight:"6%",transform:'rotate(-90deg)',color:'#0B6ECB',fontSize:'16px',height:'22px',fontWeight:'bolder' }}></Icon>
                    </p>
                  </div>
                  } key="4">
                  <SystemVersion handleStatus={this.handleStatus} vername={this.state.vername} cusVerson={this.state.cusVerson} wrappedComponentRef={(inst)=>this.SystemVersion=inst}></SystemVersion>
                </Panel>
              </Collapse>
            </div>
            <div style={{width:"28%",float:"right",borderLeft:"1px solid #E7E7E7",paddingLeft:"2%"}}>
              <div style={{padding:"0 0 20px 0",borderBottom:"1px solid #E7E7E7",marginRight:"20%"}}>
                <img style={{width:"100px",height:"100px"}} src={this.state.Img?this.state.Img:this.state.baPatient.photo}></img>
              </div>
              <div className="details" style={{padding:"20px 0 20px 0",borderBottom:"1px solid #E7E7E7",marginRight:"20%"}}>
                <p>当前用户： <span>{this.state.realname}</span><span style={{marginLeft:"20px"}}><img onClick={(e)=>{this.Modify("User",e)}} src={require("./images/10.png")}></img></span></p>
              <p>所在科室： <span>{this.state.deptcodeDic}</span></p>
                <p>职务职级： <span>{this.state.postDic}</span></p>
              </div>
              <div className="details" style={{padding:"20px 0 20px 0"}}>
                <p>机构编号： <span>{this.state.orgcode} </span><span style={{marginLeft:"20px"}}><img onClick={this.Modify} src={require("./images/10.png")}></img></span></p>
                <p>机构名称： <span>{this.state.orgName}</span></p>
                <p>机构类型： <span>{this.state.orgidDic}</span></p>
              </div>
            </div>
          </div>
      </div>

    )
  }
}
export default PersonalSettings
