import React, {Component} from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon,Carousel, Row, Col, Button, Modal, Table, Form, Checkbox   } from 'antd';
import "./SystemManagement.less"
import "../../sider/fontStyle.less"
const FormItem = Form.Item;
const { Header, Content, Footer, Sider } = Layout;

const MenuItem = Menu.Item;
class SystemManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      MenuData:[]
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.props.history.push('/layout');
          window.menus=[
            {key:"首页",show: !!values.home, id: 'home'},
            {key:"患者登记",show: !!values.registration, id: 'registration'},
            {key:"今日诊疗",show: !!values.tideyDiagnosis, id: 'tideyDiagnosis'},
            {key:"病历中心",show:values.medicalCenter, id: 'medicalCenter'},
            {key:"辨证论治",show:values.differentiation, id: 'differentiation'},
            {key:"治未病",show:values.cureNotIll, id: 'cureNotIll'},
            {key:"中医知识库",show:values.medicine, id: 'medicine'},
            {key:"健康档案",show:values.healthRecords, id: 'healthRecords'},
            {key:"模板管理",show:values.templateManagement, id: 'templateManagement'},
            {key:"服务点评",show:values.serviceReview, id: 'serviceReview'},
            {key:"信息上报",show:values.informationReported, id: 'informationReported'},
            {key:"资源管理",show:values.resourceManagement, id: 'resourceManagement'},
            {key:"质控管理",show:values.personalSettings, id: 'personalSettings'},
            {key:"综合分析",show:values.comprehensiveAnalysis, id: 'comprehensiveAnalysis'},
            {key:"个人设置",show:values.personalSettings, id: 'personalSettings'},
            {key:"系统管理",show:values.systemManagement, id: 'systemManagement'},
            //{key:"用户管理",show:values.userManagement},
            //{key:"日志管理",show:values.logManagement},
            {key:"患者转诊",show:values.patientReferral, id: 'patientReferral'},
            {key:"治疗记录",show:values.medicalRecords, id: 'medicalRecords'},
            {key:"远程教育",show:values.remoteEducation, id: 'remoteEducation'},
            {key:"远程会诊",show:values.remoteConsultation, id: 'remoteConsultation'},
          ]
          // this.props.tranValue(tableData)
          this.setState({
            visible: false,
          });
        }
      });
    }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const dataSource = [
      {
        key: 'home',
        menuName: '首页',
        applicationState: "可用",
        isShow: 'true'
      },
      {
        key: 'registration',
        menuName: '患者登记',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'tideyDiagnosis',
        menuName: '今日诊疗',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'medicalCenter',
        menuName: '病历中心',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'differentiation',
        menuName: '辨证论治',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'cureNotIll',
        menuName: '治未病',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'medicine',
        menuName: '中医知识库',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'healthRecords',
        menuName: '健康档案',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'templateManagement',
        menuName: '模板管理',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'serviceReview',
        menuName: '服务点评',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'informationReported',
        menuName: '信息上报',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'resourceManagement',
        menuName: '资源管理',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'qualityManagement',
        menuName: '质控管理',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'comprehensiveAnalysis',
        menuName: '综合分析',
        applicationState: "登录后可用",
        isShow: 'true'
      },{
        key: 'personalSettings',
        menuName: '个人设置',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
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
      },
      {
        key: 'medicalRecords',
        menuName: '治疗记录',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'remoteEducation',
        menuName: '远程教育',
        applicationState: "登录后可用",
        isShow: 'true'
      },
      {
        key: 'remoteConsultation',
        menuName: '远程会诊',
        applicationState: "登录后可用",
        isShow: 'true'
      },

    ];
    const columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width:"10%",
      render:(text, record, index)=>{
        return(
          <span>{index+1}</span>
        )
      },
    }, {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
      width:"30%"
    }, {
      title: '应用状态',
      dataIndex: 'applicationState',
      key: 'applicationState',
      width:"20%"
    },
    {
      title: '在菜单显示',
      dataIndex: 'isShow',
      key: 'isShow',
      width:"20%",
      render:(text, record, index)=>{
        const exist = window.menus.some(item => item.id == record.key);
        console.log('exist', exist);
        return(
          <FormItem>
            {getFieldDecorator(record.key, {
              initialValue: exist
            })(
               <Checkbox defaultChecked={exist}></Checkbox>
           )}
         </FormItem>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width:"20%",
      render:(text, record, index)=>{
        return(
          <div style={{color:"#3366ff"}}><span>上移    </span><span>下移</span></div>
        )
      }
    }];
    return (
      <div style={{width:"80%",margin:"2% auto"}} className="SystemManagement">
        <Row style={{marginBottom:"10px"}}>
          <Col span={12} ><span style={{fontSize:"20px",display:"inlineBlock",height:"35px",lineHeight:"35px",borderBottom:"2px solid #3190B0"}}><i className="anticon iconfont" style={{marginRight:"10px",fontSize:"20px"}}>&#xe999;</i>应用中心</span></Col>
          <Col span={12}><span style={{float:"right",fontSize:"20px",display:"inlineBlock",height:"30px",lineHeight:"30px",color:" #3190B0", cursor: "pointer"}} onClick={this.showModal}>应用设置</span></Col>
        </Row>
        <div style={{border:"1px solid #E4E4E4"}} className="select">
          <Carousel>
            <Page>
              <RowLine>
                <Link to='/Layout'><i className="anticon iconfont">&#xe64c;</i>
                  <p>首页</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe64b;</i>
                  <p>患者登记</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe64b;</i>
                  <p>今日诊疗</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe64d;</i>
                  <p>病历中心</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe64f;</i>
                  <p>辨证论治</p>
                </Link>
              </RowLine>
              <RowLine>
                <Link to='/Layout'><i className="anticon iconfont">&#xe650;</i>
                  <p>治未病</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe654;</i>
                  <p>远程教育</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe653;</i>
                  <p>远程会诊</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe651;</i>
                  <p>中医知识库</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe652;</i>
                  <p>健康档案</p>
                </Link>
              </RowLine>
              <RowLine>
                <Link to='/Layout'><i className="anticon iconfont">&#xe660;</i>
                  <p>模板管理</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe65a;</i>
                  <p>服务点评</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe669;</i>
                  <p>信息上报</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe684;</i>
                  <p>资源管理</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe65f;</i>
                  <p>质控管理</p>
                </Link>
              </RowLine>
            </Page>
            <Page>
              <RowLine>
                <Link to='/Layout'><i className="anticon iconfont">&#xe66c;</i>
                  <p>综合分析</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe666;</i>
                  <p>个人设置</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe664;</i>
                  <p>系统管理</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe658;</i>
                  <p>患者转诊</p>
                </Link>
                <Link to='/Layout'><i className="anticon iconfont">&#xe650;</i>
                  <p>治疗记录</p>
                </Link>
              </RowLine>
            </Page>
          </Carousel>
        </div>
          <Modal
            className={"SystemManagement"}
            width={"50%"}
            maskStyle={{background:"rgba(0,0,0,.3)"}}
            title="应用设置"
            maskClosable={false}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={false}
          >
           <Form layout="inline" onSubmit={this.handleSubmit}>
            <Row style={{color:"#0A6ECB",marginBottom:"10px"}}><span>恢复默认设置</span><span style={{margin:"0 10px",color:"#ccc"}}>|</span><span>在菜单中隐藏【登录后可用】的应用</span></Row>
            <SpecTable
              dataSource={dataSource}
              pagination={false}
              columns={columns} />
              <Row style={{marginTop:"10px"}}><center><Button  htmlType="submit" style={{width:"100px",height:"30px",borderRadius:"15px",background:"#0A6ECB",color:"#fff"}} >保存</Button><Button style={{width:"100px",border:"none",height:"30px",borderRadius:"15px",marginLeft:"10px",background:"#F2F2F2",color:"#0A6ECB"}} onClick={this.handleCancel}>取消</Button></center></Row>
            </Form>
          </Modal>
      </div>
    )
  }
}
const Page = styled.div`
  padding: 5% 0%;
`;
const RowLine = styled.div`
  display: flex !important;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin: 40px;
`;
const SpecTable = styled(Table)`
  .ant-table-body {
    height: calc(60vh - 56px) !important;
    overflow-y: scroll;
  }
`;
export default Form.create()(SystemManagement)
