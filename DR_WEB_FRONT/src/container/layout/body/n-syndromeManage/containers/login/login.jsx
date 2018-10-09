import React, { Component } from 'react'; // 引入了React
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
import { initialState, goLogin } from '../../redux/action/login/loginAction';
import styles from './style/login.less';
import logo from './style/logo.png';
import ImgLeft from './style/img_left.png';
import { Spin, Form, Input, Button, message, Icon, Checkbox, Tabs, Alert, Row ,Col  } from 'antd';
import { browserHistory, Link, hashHistory } from 'react-router';
import LoginService from '../../services/loginService';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
/* 以类的方式创建一个组件 */
class Login extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		passwordDirty: false,
    		loading:false,
        visible:false,//error提示
        imageValue:"",//图片验证码值
        imageId:"",//32UUID
        imageBase64:"",
    	};
    }
    /**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */
    componentDidMount() {
        const {actions} = this.props;
        // 初始化数据
        actions.initialState();
        this.getImage();
    }
    getImage = () => {
      //获取图片验证码
      var uuid = global.$publicMethod.GetUUID()
      console.log("uuid",uuid);
      var image = LoginService.imagecode({imageId:uuid});
      this.setState({imageBase64:image,imageId:uuid})
    }
  	handleSubmit = (e) => { // 登录
      console.log("登录");
    	e.preventDefault();
      const {actions, form} = this.props;
	    form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
                let username = values.username, // 用户名
                    password = values.password, // 密码
                    loginParams = { // 登录参数
                        username:username,
                        password:password,
                        imageValue:values.imageValue,
                        imageId:this.state.imageId,
                    };
            this.setState({ loading:true });
		        setTimeout(()=>{
                $history.push("/Home")
            },500)
		    }
	    });
	}
  callback(key) {
    console.log(key);
  }
	render() {
    const { loginInfo, form } = this.props;
    var { loading } = this.state;
    const getFieldDecorator = form.getFieldDecorator;
    var style={}
    if( screen.width >= 1440 ){
      console.log("1440*900 1080分别率");
      style.divColOne = { marginTop:'20%',marginLeft:'20%' }
      style.divColTwo = { marginTop:'20%',marginRight:'20%',ZIndex:999,position:'absolute',height:430,width:400}
    }else {
      style.divColOne = { marginTop:'10%',marginLeft:'20%',width:400,height:300 }
      style.divColTwo = { marginTop:'5%',marginRight:'20%',ZIndex:999,position:'absolute',height:430,width:400}
    }
		return (
      <div className="login-container">
        <div>
          <div className="header">
            <img alt="logo" className="logo" src={logo} />
            <span className="title">药品上市许可持有人药品不良反应直接报告系统</span>
          </div>
          <div className="desc"></div>
        </div>
        <Row>
          <Col span={12}>
            <img alt="logo" style={style.divColOne} src={ImgLeft} />
          </Col>
          <Col span={12}>
            <Spin tip="登录中..." spinning={false}>
              <Form style={style.divColTwo} onSubmit={this.handleSubmit} className="login-form">
                <div style={{color:'#008BFF',fontSize:22}}><center>用户登录 / User login</center></div>
                <FormItem>
                    {getFieldDecorator('username',{initialValue:"sinodevadmin"},{
                      rules: [{ required: true, message: '请填写登录名称!', whitespace: true }],
                    })(
                        <Input style={{marginTop:30}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)',fontSize:16 }} />} placeholder="登录名称" maxLength="20" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password',{initialValue:"adr12345"},{
                      rules: [{ required: true, message: '请填写密码!', whitespace: true }],
                    })(
                        <Input style={{marginTop:20}} type="password" prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)',fontSize:16 }} />} placeholder="密码" maxLength="20" />
                    )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('imageValue',{
                    rules: [{ required: true,max:4, message: '请正确填写四位验证码!', whitespace: true }],
                  })(
                    <Input style={{marginTop:20}} maxLength="4" prefix={<Icon type="exception" style={{ color: 'rgba(0,0,0,.25)',fontSize:16 }} />} placeholder="验证码"  addonAfter={<img  onClick={()=>{ this.getImage() }} src={"data:image/png;base64,"+this.state.imageBase64}/>} />
                  )}
                </FormItem>
                <div>
                  <a onClick={()=>{ hashHistory.push("/Registered") }}>新用户注册</a>
                  <a style={{ marginLeft:120 }} onClick={()=>{ this.getImage() }}>看不清楚？换一张图</a>
                </div>
                <FormItem>
                    <Button size="large" className="clsString" type="primary" htmlType="submit" loading={loading}>
                     {loginInfo.length > 0 ? '登录中...' : '登录'}
                    </Button>
                </FormItem>
                <div className="login-account">
                  {
                    this.state.visible ? (
                      <Alert
                        message={localStorage.getItem("errorMessage")}
                        type="error"
                        style={{width:328,marginBottom:25}}
                        showIcon
                        closable
                        afterClose={()=>{ this.setState({ visible: false }); }}
                      />
                    ) : null
                  }
                </div>
              </Form>
             </Spin>
          </Col>
        </Row>
        <div className="globalFooter">
          <div className="copyright">国家药品不良反应监测中心 | 京ICP备16043083号</div>
        </div>
  		</div>
		);
	}
}

const LoginForm = Form.create()(Login);

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    let { Common, Login } = state;
    return {
        loading: Common.loading,
        loginInfo: Login.loginInfo
    }
}

const Main = connect(mapStateToProps)(LoginForm); // 连接redux

export default Main;
