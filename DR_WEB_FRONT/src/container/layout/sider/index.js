import React, {Component} from 'react';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import "./fontStyle.less"
import "./iconfont.css";
import Icon1 from 'components/dr/icon';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
var onresize= window;

class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        collapsed: false,
        style:{},
        MenuItem:[
          //{key:"首页",show:true},
          //{key:"病人登记",show:true},
          //{key:"今日就诊",show:true},
          //{key:"电子病历",show:true},
        //  {key:"辨证论治",show:true},
          //{key:"治未病",show:true},
          //{key:"知识库",show:true},
          //{key:"健康档案",show:true},
          //{key:"远程教育",show:true},
          //{key:"远程会诊",show:true},
          //{key:"转诊",show:true},
          //
          {key:"首页",show:true},
          {key:"患者登记",show:true},
          {key:"今日诊疗",show:true},
          {key:"病历中心",show:true},
          {key:"辨证论治",show:true},
          {key:"治未病",show:true},
          {key:"远程教育",show:true},
          {key:"远程会诊",show:true},
          {key:"中医知识库",show:true},
          {key:"患者档案",show:true},
          {key:"模板管理",show:true},
          {key:"服务点评",show:true},
          {key:"信息上报",show:true},
          {key:"资源管理",show:true},
          {key:"质控管理",show:true},
          {key:"综合分析",show:true},
          {key:"个人设置",show:true},
          {key:"系统管理",show:true},
          {key:"用户管理",show:true},
          {key:"日志管理",show:true},
          {key:"患者转诊",show:true},
          {key:"治疗记录",show:true},
        ],
        height:"",//外层高度
        length:0,//移动的距离,
        up:false,
        down:true
      };
  }
  changeMenuItem=(value)=>{
    this.setState({MenuItem:value})
  }
  componentDidMount(){
  // console.log("wwwwwww",window);
  //   onresize.addEventListener("resize",this.handleHeight)   //添加窗口变化监听
  //   var clientHeight=document.documentElement.clientHeight
  //   var height=""
  //   var dom=document.getElementById("kk")
  //   if (clientHeight<dom.offsetHeight) {
  //     height=`${clientHeight-56*2}px`
  //     this.setState({height})
  //   }
}
  componentWillMount(){
    onresize.removeEventListener("resize",this.handleHeight) //清楚窗口变化监听
  }
  //侧边抽屉打开与关闭
  onCollapse = (collapsed) => {
    console.log(collapsed);
    var style
    if (!this.state.collapsed) {
      style={fontSize:"20px"}
    }else {
      style={fontSize:"16px"}
    }
    this.setState({ collapsed:!this.state.collapsed,style });
  }
  //检测浏览器窗口大小变化
  handleHeight=()=>{
  const screenHeight=document.documentElement.clientHeight;
  var dom=document.getElementById("kk")
  let  height="auto"
  if (screenHeight<dom.offsetHeight) {

     height =`${screenHeight-56*2}px`;
  }
  this.setState({
    height,
  })
}
  onSelect=(sss)=>{
  }
  down=()=>{
    console.log("高度高度",this.state.height);
    var dom1=document.getElementById("kk")  //内容
    var domHeight1=dom1.offsetHeight
    var dom=document.getElementById("height") //一个
    var domHeight=dom.offsetHeight+8
    console.log("skjhoiahsd",domHeight1);
    var num =domHeight1-parseInt(this.state.height)-3
    console.log("54645",num);
    console.log("66666",this.state.length);
    if (this.state.length > -num) {
      var length = this.state.length-domHeight
      this.setState({length,down:true,up:true})
      console.log("hahahaha",dom);
    }else{
      this.setState({down:false,up:true})
    }
  }
  up=()=>{
    if (this.state.length<0) {
      var dom=document.getElementById("height")
      var domHeight=dom.offsetHeight+8
      var length = this.state.length+domHeight
      this.setState({length,up:true,down:true})
      console.log("hahahaha",dom);
    }else {
      this.setState({up:false})
    }
  }
  render() {
    let { collapsed } = this.state;
    const MenuOption=[]
    window.menus.forEach(item=>{
      var div
      if (item.show&&item.key=="首页") {
        div=<Menu.Item key="首页"><Link to='/Layout'><StyleICon type='home' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="患者登记") {
        div=<Menu.Item key="患者登记"><Link to='/Layout/patientRegister'><StyleICon type='patient_register' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="今日诊疗") {
        div=<Menu.Item key="今日诊疗"><Link to='/Layout/todayPatient'><StyleICon type='today_patient' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="病历中心") {
        div=<Menu.Item key="病历中心"><Link to='/Layout/electronicMedicalRecords'><StyleICon type='case_center' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="辨证论治") {
        div=<Menu.Item key="辨证论治"><Link to='/Layout/syndromeTreatment'><StyleICon type='syndrome_treatment' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="治未病") {
        div=<Menu.Item key="治未病"><Link to='/Layout/cure'><StyleICon type='cure_not_ill' value={collapsed}/><span>{item.key}</span></Link>d</Menu.Item>
      }
      if (item.show&&item.key=="中医知识库") {
        div=<Menu.Item key="中医知识库"><Link to='/Layout/chKnowledge'><StyleICon type='ch_knowledge' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="患者档案") {
        div=<Menu.Item key="患者档案"><Link to='/Layout/patientRecords'><StyleICon type='patient_archives' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="模板管理") {
        div=<Menu.Item key="模板管理"><Link to='/Layout/modelManage'><StyleICon type='model_manage' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="综合分析") {
        div=<Menu.Item key="综合分析"><Link to='/Layout/comprehensiveAnalysis'><StyleICon type='comprehensive_analysis' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="个人设置") {
        div=<Menu.Item key="个人设置"><Link to='/Layout/personalSetting'><StyleICon type='personal_setting' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="系统管理") {
        div=<Menu.Item key="系统管理"><Link to='/Layout/systemManage'><StyleICon type='system_manage' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="远程教育") {
        div=<Menu.Item key="远程教育"><Link to='/Layout/remoteEducation'><StyleICon type='remote_education' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="患者转诊") {
        div=<Menu.Item key="患者转诊"><Link to='/Layout'><StyleICon type='patient_referral' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="治疗记录") {
        div=<Menu.Item key="治疗记录"><Link to='/Layout'><StyleICon type='acography' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="远程会诊") {
        div=<Menu.Item key="远程会诊"><Link to='/Layout'><StyleICon type='patient_reg' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="服务点评") {
        div=<Menu.Item key="服务点评"><Link to='/Layout'><StyleICon type='service_review' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="信息上报") {
        div=<Menu.Item key="信息上报"><Link to='/Layout'><StyleICon type='information_reported' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="资源管理") {
        div=<Menu.Item key="资源管理"><Link to='/Layout'><StyleICon type='resource_administration' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      if (item.show&&item.key=="质控管理") {
        div=<Menu.Item key="质控管理"><Link to='/Layout'><StyleICon type='quality_management' value={collapsed}/><span>{item.key}</span></Link></Menu.Item>
      }
      MenuOption.push(div)
    })
    return (
        <SpecSider
          ref="Sider"
          style={{background:"rgba(31, 63, 105, 1)"}}
          collapsible
          collapsed={this.state.collapsed}
          trigger={null}
          width="120px"
        >
        <div className="switch" style={{  height: "32px",margin: "16px",textAline:"center"}} onClick={this.onCollapse} >
           {this.state.collapsed?<i className="anticon iconfont">&#xe78b;</i>:<i className="anticon iconfont">&#xe788;</i>}
         </div>
            <div style={{width:"120px",position:"relative",overflow:"hidden",paddingRight:"-20px",height:this.state.height}}>
              <SpecMenu
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                onSelect={this.onSelect}
               >
                {MenuOption}
                <Menu.Item id="height">
                  <Link to='/Layout/more'>
                    <StyleICon type='more' value={collapsed}/>
                    <span>更多</span>
                  </Link>
                </Menu.Item>
              </SpecMenu>
          </div>
        </SpecSider>
    );
  }
}
const SpecSider = styled(Sider)`
  .switch{
    color :#91BEE2
  }
  .switch:hover{
    color:#fff
  }
  .ant-menu-item {
    color: #91BEE2  !important;
    padding-left: 16px !important;
    width: 50px;
  }
  .ant-menu-item-selected {
    color:#fff !important;
    background:rgba(10, 110, 203, 1) !important;
  }
  .ant-menu-item-active {
    color: #C0D6E2 !important;
  }
  .ant-menu-inline-collapsed{
    width: 50px;
  }
`;
const StyleICon = styled(Icon1)`
  width: ${ props => props.value ? '20px' : '16px'};
  height: ${ props => props.value ? '20px' : '16px'};
  margin-right: 14px;
  margin-left: ${ props => props.value ? '-20px' : '0px'};
`;
const SpecMenu = styled(Menu)`
  &&&.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
    background-color: rgba(31, 63, 105, 1);
  }
`;
export default SiderDemo
