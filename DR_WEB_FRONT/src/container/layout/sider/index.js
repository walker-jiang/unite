import React, {Component} from 'react';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import "./fontStyle.less"
import "./iconfont.css";
import Icon1 from 'components/dr/icon';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.Item;
var onresize= window;

class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        collapsed: false,
        style:{},
        leftModules: [], // 左侧菜单项
        height:"",//外层高度
        length:0,//移动的距离,
        up:false,
        down:true
      };
  }
  componentWillMount(){
    onresize.removeEventListener("resize",this.handleHeight) //清楚窗口变化监听
    this.getLeftMoules();
  }
  /** [getLeftMoules 获取左侧菜单] */
  getLeftMoules(){
    let self = this;
    if( window.sessionStorage.getItem('userid')==undefined){
        self.setState({ leftModules: defaultSysModuleList });
    }else{
      let params = {
        url: 'SyQuickmenuController/getQuickMenu',
        server_url: config_login_url,
        data: {
          userid: window.sessionStorage.getItem('userid')
        },
      };
      function callBack(res){
        if(res.result){
          if(res.data==null){
            self.setState({ leftModules: [] });
          }else{
            self.setState({ leftModules: res.data.leftMenuList });
          }
        }else{
          console.log('异常响应信息', res);
        }
      };
      ajaxGetResource(params, callBack);
    }
  };
  //侧边抽屉打开与关闭
  onCollapse = (collapsed) => {
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
  down=()=>{
    var dom1=document.getElementById("kk")  //内容
    var domHeight1=dom1.offsetHeight
    var dom=document.getElementById("height") //一个
    var domHeight=dom.offsetHeight+8
    var num =domHeight1-parseInt(this.state.height)-3
    if (this.state.length > -num) {
      var length = this.state.length-domHeight
      this.setState({length,down:true,up:true})
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
    }else {
      this.setState({up:false})
    }
  }
  render() {
    let { collapsed ,leftModules} = this.state;
    const MenuOption=[]
    if(leftModules.length !=0){
      leftModules.forEach(item=>{
        if(item.syModule.callurl.indexOf('http') == 0){
          var div = <MenuItems trigger={null} key={item.syModule.moddesc}>
                      <a href={item.syModule.callurl} target='_blank'>
                        <StyleICon type={item.syModule.moddesc} value={collapsed}/>
                        <span>{item.syModule.modname}</span>
                      </a>
                    </MenuItems>
          MenuOption.push(div)
        }else{
          var div = <MenuItems trigger={null} key={item.syModule.moddesc}>
            <Link to={item.syModule.callurl}>
              <StyleICon type={item.syModule.moddesc} value={collapsed}/>
              <span>{item.syModule.modname}</span>
            </Link>
          </MenuItems>
          MenuOption.push(div)
        }
      })
    }
    return (
        <SpecSider
          ref="Sider"
          style={{background:"rgba(31, 63, 105, 1)"}}
          collapsible
          collapsed={this.state.collapsed}
          trigger={null}
          width="140px"
        >
        <div className="switch" style={{  height: "32px",margin: "16px",textAline:"center"}} onClick={this.onCollapse} >
           {this.state.collapsed?<i className="anticon iconfont">&#xe78b;</i>:<i className="anticon iconfont">&#xe788;</i>}
         </div>
            <div style={{width:"140px",position:"relative",overflow:"hidden",paddingRight:"-20px",height:this.state.height}}>
              <SpecMenu
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                onSelect={this.onSelect}
               >
                {MenuOption}
                {( window.sessionStorage.getItem('userid')!=undefined)?
                <MenuItems id="height" trigger={null}>
                  <Link to='/Layout/more' trigger={null}>
                    <StyleICon type='more' value={collapsed}/>
                    <span>更多</span>
                  </Link>
                </MenuItems>:null}
              </SpecMenu>
          </div>
        </SpecSider>
    );
  }
}
const SpecSider = styled(Sider)`
 box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
 z-index: 99;

  &&& {
    max-height: 100vh;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
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
  .ant-tooltip-content{
         line-height: 1.6  !important;
      .ant-tooltip-inner{
         padding: 6px 21px !important;
   }
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
const MenuItems =styled(SubMenu)`

`

export default SiderDemo

/*
@作者：马奔
@日期：2018-10-15
@描述：左侧菜单栏
*/
