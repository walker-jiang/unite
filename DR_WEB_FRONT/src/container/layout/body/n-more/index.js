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
      leftList:[],
      rightList:[]
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
           self.setState({ frameData: res.data });
         }else{
           console.log('异常响应信息', res);
         }
       };
       ajaxGetResource(paramss, callBack1);
   };
  /**
   * [restoreData 回复默认设置]
   * @param  {[type]} type [1代表左侧,2是右侧]
   * @return {[type]}      [返回对应页面的默认数据]
   */
  restoreData=(type)=>{
    let{totalModules,frameData}=this.state
    this.getTotalMoules();
    this.getframeData();
    return this.processingData(totalModules,type==1?frameData.leftMenuList:frameData.rightMenuList)
  }
  /** [showModal 展示弹框] */
  showModal = () => {
    this.setState({visible: true});
  }
  /** [getleftData 拿到左侧组件的数据] */
   getleftData = (data) => {
      this.setState({leftList:data})
   }
  /** [getrightData 拿到右侧组件的数据] */
   getrightData = (data) => {
     this.setState({rightList:data})
   }
   restore=(activeKey)=> {
     this.LeftMenuList.restoreSettings(1)
   }
 /**
  * [processingData 组件渲染数据处理函数]
  * @param  {[type]} bigArr  [平铺数据]
  * @param  {[type]} smalArr [列表数据]
  * @return {[type]}         [对应的渲染的数据]
  */
  processingData(bigArr,smalArr){
    bigArr.forEach((item1,index1)=>{
      item1.isShow=false;
      smalArr.forEach((item2,index2)=>{
         if(item2.syModule.modno==item1.modno){
           item1.isShow=true;
           return
         }
      })
    })
    return bigArr;
  }
  /** [putframeData 处理数据发送修改请求] */
  putframeData= () =>{
     let {leftList ,rightList}=this.state
     let listL=[];
     leftList.forEach((item, index) => {
       if (item.isShow) {
         listL.push(item);
       }
     })
     listL.forEach((item, index) => {
       item.seqno = index + 1;
       item.menustate = "02"; /* 展开还是收缩*/
       item.menutype = "01";  /* 左侧*/
       item.userid =Number(window.sessionStorage.getItem('userid')) ;
     })
     let listR=[];
     rightList.forEach((item, index) => {
       if (item.isShow) {
         listR.push(item);
       }
     })
     listR.forEach((item, index) => {
       item.seqno = index + 1;
       item.menustate = "02";
       item.menutype = "02"; /* 右侧*/
       item.userid = window.sessionStorage.getItem('userid')
     })
     let list=listL.concat(listR)
     let self = this;
     let paramss = {
       type:'put',
       url: 'SyQuickmenuController/putData',
       server_url: config_login_url,
       data: JSON.stringify(list)
     };
     function callBack1(res){
       if(res.result){
         list=[];
       }else{
         console.log('异常响应信息', res);
       }
     };
     ajaxGetResource(paramss, callBack1);
   }
  /** [handleSubmit 表单提交事件] */
  handleSubmit = (e) => {
     e.preventDefault();
     this.putframeData();
     this.handleCancel();
      location.reload()
   }
   /** [handleCancel 关闭弹框组件] */
  handleCancel = (e) => {
    this.setState({visible: false});
  }
  handleOk = (e) => {
    this.setState({visible: false});
  }
  onRef = (ref) => {
        this.LeftMenuList = ref
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
          this.state.visible ? <SpecModal width={"700px"} height={"36px"} maskStyle={{ background: "rgba(0,0,0,.3)" }} title="应用设置" maskClosable={false} visible={true} onOk={this.handleOk} onCancel={this.handleCancel} footer={false}>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Tabs defaultActiveKey="leftList" onChange={this.restore}>
                 <TabPane tab={<span><Icon type="apple" />左侧菜单栏</span>} key="leftList">
                   <LeftMenuList onRef={this.onRef} getleftData={this.getleftData} totalModules={totalModules} frameData={frameData} processingData={this.processingData} restoreData={this.restoreData}/>
                 </TabPane>
                 <TabPane tab={<span><Icon type="android" />右侧悬浮框</span>} key="rightList">
                    <RightMenuList getrightData={this.getrightData} totalModules={totalModules} frameData={frameData}  processingData={this.processingData} restoreData={this.restoreData}/>
                 </TabPane>
              </Tabs>
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
`;
const CancelButton = styled(Button)`
  ${StyButton.gray}
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
  width: 14px;
  height: 14px;
  margin-top: -2px;
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
