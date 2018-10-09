import React, {Component} from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Carousel, Row, Col, Button, Modal, Table, Form, Checkbox } from 'antd';
const FormItem = Form.Item;
const { Header, Content, Footer, Sider } = Layout;
import ajaxGetResource from 'commonFunc/ajaxGetResource';
// import "../../sider/fontStyle.less";
// import './SystemManagement.less';
import Icon1 from 'components/dr/icon';
import StyButton from 'components/antd/style/button';

const MenuItem = Menu.Item;
class SystemManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      MenuData: [],
      totalModules: [], // 所有菜单
    };
  }
  componentWillMount(){
    this.getTotalMoules();
  };
  /** [getTotalMoules 获取所有菜单] */
  getTotalMoules(){
    let self = this;
    let params = {
      url: 'ModuleController/getUserModule',
      server_url: config_login_url,
      data: {
        userid: window.sessionStorage.getItem('userid')
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
  showModal = () => {
    this.setState({visible: true});
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({visible: false});
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({visible: false});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push('/layout');
        window.menus = [
          {
            key: "首页",
            show: !!values.home,
            id: 'home'
          }, {
            key: "患者登记",
            show: !!values.registration,
            id: 'registration'
          }, {
            key: "今日诊疗",
            show: !!values.tideyDiagnosis,
            id: 'tideyDiagnosis'
          }, {
            key: "病历中心",
            show: values.medicalCenter,
            id: 'medicalCenter'
          }, {
            key: "辨证论治",
            show: values.differentiation,
            id: 'differentiation'
          }, {
            key: "治未病",
            show: values.cureNotIll,
            id: 'cureNotIll'
          }, {
            key: "中医知识库",
            show: values.medicine,
            id: 'medicine'
          }, {
            key: "健康档案",
            show: values.healthRecords,
            id: 'healthRecords'
          }, {
            key: "模板管理",
            show: values.templateManagement,
            id: 'templateManagement'
          }, {
            key: "服务点评",
            show: values.serviceReview,
            id: 'serviceReview'
          }, {
            key: "信息上报",
            show: values.informationReported,
            id: 'informationReported'
          }, {
            key: "资源管理",
            show: values.resourceManagement,
            id: 'resourceManagement'
          }, {
            key: "质控管理",
            show: values.personalSettings,
            id: 'personalSettings'
          }, {
            key: "综合分析",
            show: values.comprehensiveAnalysis,
            id: 'comprehensiveAnalysis'
          }, {
            key: "个人设置",
            show: values.personalSettings,
            id: 'personalSettings'
          }, {
            key: "系统管理",
            show: values.systemManagement,
            id: 'systemManagement'
          },
          //{key:"用户管理",show:values.userManagement},
          //{key:"日志管理",show:values.logManagement},
          {
            key: "患者转诊",
            show: values.patientReferral,
            id: 'patientReferral'
          }, {
            key: "治疗记录",
            show: values.medicalRecords,
            id: 'medicalRecords'
          }, {
            key: "患者档案",
            show: values.patientRecords,
            id: 'patientRecords'
          }, {
            key: "远程教育",
            show: values.remoteEducation,
            id: 'remoteEducation'
          }, {
            key: "远程会诊",
            show: values.remoteConsultation,
            id: 'remoteConsultation'
          }
        ]
        // this.props.tranValue(tableData)
        this.setState({visible: false});
      }
    });
  }
  /**
   * [getCarouselCom 获取分好组的所有菜单模块]
   * @param  {[type]} totalModules [所有菜单数据]
   * @return {[type]}              [component数据]
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
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    let { totalModules } = this.state;
    let CarouselCom = this.getCarouselCom(totalModules);
    const dataSource = [
      {
        key: 'home',
        menuName: '首页',
        applicationState: "可用",
        isShow: 'true'
      }, {
        key: 'registration',
        menuName: '患者登记',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'tideyDiagnosis',
        menuName: '今日诊疗',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'medicalCenter',
        menuName: '病历中心',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'differentiation',
        menuName: '辨证论治',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'cureNotIll',
        menuName: '治未病',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'medicine',
        menuName: '中医知识库',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'healthRecords',
        menuName: '健康档案',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'templateManagement',
        menuName: '模板管理',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'serviceReview',
        menuName: '服务点评',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'informationReported',
        menuName: '信息上报',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'resourceManagement',
        menuName: '资源管理',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'qualityManagement',
        menuName: '质控管理',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'comprehensiveAnalysis',
        menuName: '综合分析',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'personalSettings',
        menuName: '个人设置',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'systemManagement',
        menuName: '系统管理',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      //{
      //  key: 'userManagement',
      //  menuName: '用户管理',
      //  applicationState: 32,
      //  isShow: 'true'
      //},
      //{
      //  key: 'logManagement',
      //  menuName: '日志管理',
      //  applicationState: 32,
      //  isShow: 'true'
      //},
      {
        key: 'patientReferral',
        menuName: '患者转诊',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'medicalRecords',
        menuName: '治疗记录',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'remoteEducation',
        menuName: '远程教育',
        applicationState: "登录后可用",
        isShow: 'true'
      }, {
        key: 'remoteConsultation',
        menuName: '远程会诊',
        applicationState: "登录后可用",
        isShow: 'true'
      }
    ];
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: "10%",
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>
      }, {
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName',
        width: "30%"
      }, {
        title: '应用状态',
        dataIndex: 'applicationState',
        key: 'applicationState',
        width: "20%"
      }, {
        title: '在菜单显示',
        dataIndex: 'isShow',
        key: 'isShow',
        width: "20%",
        render: (text, record, index) => {
          const exist = window.menus.some(item => item.id == record.key);
          return (<FormItem>
            {getFieldDecorator(record.key, {initialValue: exist})(<Checkbox defaultChecked={exist}></Checkbox>)}
          </FormItem>)
        }
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: "20%",
        render: (text, record, index) => {
          return (<div style={{
              color: "#3366ff"
            }}>
            <span >上移
            </span>
            <span>下移</span>
          </div>)
        }
      }
    ];
    return (
      <Container className="SystemManagement">
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
      <Body>
        <SpecCarousel>
        { CarouselCom.map(item => item) }
        </SpecCarousel>
      </Body>
      <SpecModal width={"50%"} maskStyle={{ background: "rgba(0,0,0,.3)" }} title="应用设置" maskClosable={false} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={false}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <SpecRow>
            <span>恢复默认设置</span>
            <TipText>在菜单中隐藏【登录后可用】的应用</TipText>
          </SpecRow>
          <SpecTable dataSource={dataSource} pagination={false} columns={columns}/>
          <Row style={{
              marginTop: "10px"
            }}>
            <center>
              <SureButton htmlType="submit">保存</SureButton>
              <CancelButton onClick={this.handleCancel}>取消</CancelButton>
            </center>
          </Row>
        </Form>
      </SpecModal>
    </Container>)
  }
}
const Container = styled.div`
  width: 80%;
  margin: 2% auto;
`;
const Body = styled.div`
  border: 1px solid #E4E4E4;
  margin-top: 20px;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
`;
const Title = styled.span`
  font-size: 20px;
  display: inline-block;
  height: 35px;
  line-height: 35px;
  border-bottom: 2px solid #3190B0;
`;
const AppSet = styled.span`
  float: right;
  font-size: 13px;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding-top: 10px;
  color:  #3190B0;
  cursor: pointer
`;
const StyIcon = styled(Icon1)`
  width: 28px;
  height: 28px;
`;
const MoreIcon = styled(Icon1)`
  width: 24px;
  height: 24px;
`;
const Page = styled.div `
  padding: 4% 0%;
`;
const RowLine = styled.div `
  display: flex !important;
  flex-direction: row;
  justify-content: space-around;
  width: ${props => props.width * 20 + '%'};
`;
const SecondRowLine = RowLine.extend`
  justify-content: start;
  margin-left: 70px;
`;
const SpecTable = styled(Table)`
  .ant-table-body {
    height: calc(60vh - 56px) !important;
    overflow-y: scroll;
  }
`;
const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
`;
const StyleIcon = styled(Icon1)`
  width: 50px;
  height: 50px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
const Label = styled.div`
  font-style:normal;
  color:#000;
  font-weight: 600;
  margin-bottom: 20px;
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
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  &&& .slick-dots li.slick-active button{
    width: 20px;
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
const TipText = styled.span`
  margin-left: 10px;
  padding-left: 10px;
  border-left: 1px solid #ccc;
`;
const SpecRow = styled(Row)`
  color: #0A6ECB;
  margin-bottom: 10px
`;
const SureButton = styled(Button)`
  ${StyButton.semicircle}
`;
const CancelButton = styled(Button)`
  ${StyButton.gray}
`;
export default Form.create()(SystemManagement)
