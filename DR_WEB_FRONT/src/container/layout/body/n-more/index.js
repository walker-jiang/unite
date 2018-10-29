import React, {Component} from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Carousel, Row, Col, Button, Modal, Table, Form, Checkbox ,Tabs} from 'antd';
const FormItem = Form.Item;
const { Header, Content, Footer, Sider } = Layout;
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import Icon1 from 'components/dr/icon';
const TabPane = Tabs.TabPane;
import StyButton from 'components/antd/style/button';
import LeftMenuList from './leftMenuList';
import RightMenuList from './rightMenuList';

const MenuItem = Menu.Item;
class SystemManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      MenuData: [],
      totalModules: [], // 所有菜单
      frameData:[],  //列表菜单
      clssName:true,
      right:[],  //右侧选中列表
    };
  }
  componentWillMount(){
    this.getTotalMoules();
    this.getframeData();
  };
  /** [getTotalMoules 获取所有菜单] */
  getTotalMoules(){
    let self = this;
    let params = {
      url: 'ModuleController/getUserModule',
      server_url: config_login_url,
      data: {
        userid: Number(window.sessionStorage.getItem('userid'))
      },
    };
    function callBack(res){
      if(res.result){
        self.setState({ totalModules: res.data });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getframeData 获取用户浮框的数据] */
  getframeData(){
       let self = this;
       let paramss = {
         url: 'SyQuickmenuController/getQuickMenu',
         server_url: config_login_url,
         data: {
           userid: Number(window.sessionStorage.getItem('userid'))
         },
       };
       function callBack1(res){
         if(res.result){
           if(res.data){
              self.setState({ frameData: res.data });
           }else{
             let data={leftMenuList:[],rightMenuList:[] }
             self.setState({ frameData: data});
           }
         }else{
           console.log('异常响应信息', res);
         }
       };
       ajaxGetResource(paramss, callBack1);
   };
  /** [showModal 展示弹框] */
  showModal = () => {
    this.setState({visible: true});
  }
  /** [putframeData 处理数据发送修改请求] */
  putframeData= () =>{
     let self = this;
     let paramss = {
       type:'put',
       url: 'SyQuickmenuController/putData',
       server_url: config_login_url,
       data: JSON.stringify(self.ProcessingData())
     };
     function callBack1(res){
       if(res.result){
         if(window.setMenu){ // 通知客户端当前登录用户的菜单
            window.setMenu(JSON.stringify(self.state.right));
        }
       }else{
         console.log('异常响应信息', res);
       }
     };
     ajaxGetResource(paramss, callBack1);
   }
/** [ProcessingData 拿到请求需要的数据格式] */
  ProcessingData =()=>{
     let leftList=[];
     let a=1;
     this.LeftMenuList.state.leftMenuList.forEach(item=>{
       if(item.isShow){
             item.seqno = a++;
             item.menustate = "02"; /* 展开还是收缩*/
             item.menutype = "01";  /* 左侧*/
             item.userid =Number(window.sessionStorage.getItem('userid')) ;
             leftList.push(item);
             return
         }
     })
     let rightList=[];
     let b=1;
     this.rightMenuList.state.rightMenuList.forEach(item=>{
       if(item.isShow){
             item.seqno = b++;
             item.menustate = "02"; /* 展开还是收缩*/
             item.menutype = "02";  /* you侧*/
             item.userid =Number(window.sessionStorage.getItem('userid')) ;
             rightList.push(item);
             return
           }
     })
     let rightData=[];
      rightList.forEach(item=>{
        if(item.modid!=7){
          rightData.push({
            modid:item.modid,
            syModule:{
                callurl:config_local_url+item.callurl,
                modname:item.modname,
                modid:item.modid,
            },
          })
        }else{
          rightData.push({
            modid:item.modid,
            syModule:{
              callurl:item.callurl,
              modname:item.modname,
              modid:item.modid,
            }
          })
        }

      })
     this.setState({right:rightData})
     let list =leftList.concat(rightList);
     return list
   }
  /** [handleSubmit 表单提交事件] */
  handleSubmit = (e) => {
     e.preventDefault();
     this.putframeData();
     this.handleCancel();
     location.reload();
   }
 /** [handleCancel 关闭弹框组件] */
  handleCancel = (e) => {
    this.setState({visible: false});
  }
  /** [handleOk 关闭事件] */
  handleOk = (e) => {
    this.setState({visible: false});
  }
  onRef = (ref) => {
        this.LeftMenuList = ref
    }
  onRefa = (ref) => {
          this.rightMenuList = ref
      }
 /**
  * [onChange Tab切换的onchang事件]
  * @param  {[type]} activeKey [当前的tab的值 框架自带]
  * @return {[type]}           [undefined]
  */
  onChange=(activeKey)=>{
    if(activeKey==1){
      this.setState({clssName:true})
    }else{
        this.setState({clssName:false})
    }
 }
  /**
   * [getCarouselCom description]
   * @param  {[type]} totalModules [平铺列表数据]
   * @return {[type]}              [更多页面数据渲染格式]
   */
  getCarouselCom(totalModules){
    const rows = 3; // 每页多少行
    const cols = 5; // 每行多少列
    const totalLength = totalModules.length;
    let Pages = [];
    let RowLines = []; // 所有行组件
    let StyledLinks = [];
    totalModules.forEach((item, index) => {
      let StyledLinkItem = (
        <StyledLink to={item.callurl} key={index}>
          <StyleIcon type={'m_' + item.moddesc}/>
          <Label>{item.modname}</Label>
        </StyledLink>
      )
      StyledLinks.push(StyledLinkItem);
    });
    let rowLenght = parseInt(totalLength / cols);
    rowLenght = totalLength % cols ? ( rowLenght + 1 ) : rowLenght; // 条件含义是如果敲好是cols的整数倍直接返回商， 否则的将商 加1 补最后一行（最后一行肯定不满）
    for(let i = 0; i < rowLenght; i++){
      let RowLinesItem = (
        <RowLine key={i} width={(StyledLinks.slice(i * cols, ( i + 1 ) * cols)).length}>
          {
            StyledLinks.slice(i * cols, ( i + 1 ) * cols).map( item => item)
          }
        </RowLine>
      );
      RowLines.push(RowLinesItem);
    }
    let pageLength = parseInt(totalLength / ( cols * rows ));
    pageLength = totalLength % ( cols * rows ) ? ( pageLength + 1 ) : pageLength; // 条件含义是如果敲好是cols的整数倍直接返回商， 否则的将商 加1 补最后一行（最后一行肯定不满）
    for(let i = 0; i < pageLength; i++){
      let PagesItems = (
        <Page key={i}>
          {
            RowLines.slice(i * rows, ( i + 1 ) * rows).map( item => item)
          }
        </Page>
      );
      Pages.push(PagesItems);
    }
    return Pages;
  };
  render() {
    let handleCancel =this.handleCancel
    let { totalModules ,leftMenuList,frameData} = this.state;
    let CarouselCom = this.getCarouselCom(totalModules);
    return (
      <Container className="SystemManagement">
        <Head>
          <Row>
            <Col span={12}>
              <Title>
                <MoreIcon type='more_more'/>应用中心
              </Title>
            </Col>
            <Col span={12}>
              <AppSet onClick={this.showModal}>
                <StyIcon type='appSet'/>应用设置
              </AppSet>
            </Col>
          </Row>
        </Head>
        <Body>
          <SpecCarousel>
          { CarouselCom.map(item => item) }
          </SpecCarousel>
        </Body>
        {
           //
          this.state.visible ? <SpecModal width={"700px"} height={"36px"} maskStyle={{ background: "rgba(0,0,0,.3)" }} title="应用设置" maskClosable={false} visible={true} onOk={this.handleOk} onCancel={this.handleCancel} footer={false}>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Tabbox defaultActiveKey="1" onChange={ this.onChange}>
                 <Tables tab={<span>{this.state.clssName?<TabIcon type="m_leftMenu_on"/>:<TabIcon type="m_leftMenu"/>}左侧菜单栏</span>} key="1" >
                   <LeftMenuList onRef={this.onRef} totalModules={totalModules} leftMenuList={frameData.leftMenuList}/>
                 </Tables>
                 <Tables tab={<span>{this.state.clssName?<TabIcon type="m_rightMenu"/>:<TabIcon type="m_rightMenu_on"/>}右侧悬浮框</span>} key="2" forceRender={true}>
                    <RightMenuList onRefa={this.onRefa} totalModules={totalModules} rightMenuList={frameData.rightMenuList} />
                 </Tables>
              </Tabbox>
              <Row style={{
                  marginTop: "10px"
                }}>
                <center>
                  <SureButton htmlType="submit">保存</SureButton>
                <CancelButton onClick={this.handleCancel}>取消</CancelButton>
                </center>
              </Row>
            </Form>
          </SpecModal> : null
        }
    </Container>
  ) };
}
const Container = styled.div`
  width:100%;
  overflow: hidden;
  background-color: #f2f2f2;
  padding-top: 15px;
  height: calc(100vh - 50px);
`;
const Body = styled.div`
  width:1000px;
  margin: 0 auto;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  background-color: #fff;
`;
const Head = styled.div`
  width:1000px;
  margin: 0 auto;
  margin-bottom:14px;
`;
const Title = styled.span`
  font-size: 20px;
  display: inline-block;
  height: 35px;
  line-height: 34px;
  border-bottom: 1px solid #3190B0;
`;
const SureButton = styled(Button)`
  ${StyButton.semicircle}
  width: 100px;
  height: 30px;
`;
const CancelButton = styled(Button)`
  ${StyButton.gray}
  width: 100px;
  height: 30px;
`;
const AppSet = styled.span`
  float: right;
  font-size: 14px;
  display: inline-block;
  height: 30px;
  line-height: 14px;
  padding-top: 21px;
  color:  #3190B0;
  cursor: pointer
`;
const StyIcon = styled(Icon1)`
  width: 19px;
  height: 19px;
  margin-top: -4px;
`;
const MoreIcon = styled(Icon1)`
  width: 20px;
  height: 20px;
  margin-top: 6px;
`;
const Page = styled.div `
  width: 1000px;
  height: 560px;
  padding-top: 30px;
  padding: 30px 70px 0px;
  background-color: #fff;
  border: 1px solid rgba(228, 228, 228, 1);
`;
const RowLine = styled.div `
  display: flex !important;
  flex-direction: row;
  height: 100px;
  justify-content: space-between;
  margin-bottom: 90px;
`;
const SecondRowLine = RowLine.extend`
  justify-content: start;
  margin-left: 70px;
`;
const StyledLink = styled(Link)`
  display: flex;
  height:100px;
  width:100px;
  flex-direction: column;
  padding-top: 15px;
`;
const StyleIcon = styled(Icon1)`
  width: 50px;
  height: 50px;
  margin-left: 23px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
const TabIcon = styled(Icon1)`
  width: 17px;
  height: 17px;
  &&&:hover{
    fill:#0088F7 !important;
  }
`;
const Label = styled.div`
  height: 19px;
  font-size: 14px;
  line-height:14px
  font-style:normal;
  color:#000;
  margin-top: 9px;
  font-weight: 600;
  text-align: center;
`;
const Tabbox=styled(Tabs)`
  height: 400px !important;
  .ant-tabs-tab{
    margin-right: 0px !important;
  }
  .ant-tabs-ink-bar{
    margin-left: 19px !important;
  }
`
const Tables=styled(TabPane)`

`
const SpecCarousel = styled(Carousel)`

  &&&.slick-slide {
    text-align: center;
    background: #fff;
    overflow: hidden;
  }
  &&&.slick-slide h3 {
    color: #fff;
  }
  &&& .slick-dots{
    margin-bottom: 3%;
  }
  &&&  .slick-dots li button{
    display: inline-block;
    margin-left: 10px;
    background-color: #C7CFD1;
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
  &&& .slick-dots li.slick-active button{
    width: 14px;
    background-color: #217CD1;
  }
`;
const SpecModal = styled(Modal)`
  .ant-modal-body{
     padding-top: 8px !important;
  }
  .ant-checkbox-inner{
    border-color: #000;
    background: #fff;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner{
    border-color: #000
  }
  .ant-checkbox-checked .ant-checkbox-inner:after{
    border-color: #000
  }
  .ant-checkbox-checked .ant-checkbox-inner, .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: transparent;
  }
  .ant-modal-title{
    color: #fff
  }
  .ant-table-tbody>tr>td{
    height: 40px;
    padding: 0 16px;
    border-bottom: 1px dashed #D2D2D2;
    color:#000
  }
  .ant-modal-content{
       border-top-left-radius: 14px  ;
       border-top-right-radius:14px ;
       .ant-modal-header{
         background-color: #0a6ecb !important;
         font-size: 14px;
         height: 36px;
         border-top-left-radius: 14px;
         border-top-right-radius:14px;
         border-bottom:none !important;
         .ant-modal-title{
           line-height:3px;
           color: #fff !important;
         }
       }
   .ant-modal-close{
         .ant-modal-close-x{
            width: 24px !important;
            height: 24px !important;
            line-height: 24px !important;
            font-size: 16px;
            margin-top: 6px;
            margin-right: 10px;
            color: #fff;
            text-align: center;
         }
         }
     }
  .ant-table-thead>tr>th{
    background: #F2F2F2;
    border-right: 1px solid #fff
  }
  .ant-table-fixed-header .ant-table-scroll .ant-table-header{
    background: #f2f2f2;
    overflow: inherit;
    padding-right: 15px;
  }
  .ant-table-thead>tr>th:last-child{
    border:none
  }
  .ant-modal-content{
    border-radius:15px 15px 0 0;
    .ant-modal-close-x:before{
      color: #fff
    }
    .ant-modal-header {
        border-radius:15px 15px 0 0;
      background: #0A6ECB !important;

      #rcDialogTitle0{
        color: #fff ;
      }
    }
  }
`;
export default Form.create()(SystemManagement)
/*
@作者：马奔
@日期：2018-10-15
@描述：更多模块
*/
