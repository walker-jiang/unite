import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Tree ,Cascader, Row, Col, Input, Form, Button, Icon, Radio, Select , Layout, Checkbox, Card ,Modal  } from 'antd';
import { Router, Route, IndexRoute, browserHistory, Link , hashHistory} from 'react-router';
import LoginService from '../../services/loginService';
import logoSrc from '../login/style/logo.png'
const { Content, Footer, Sider, Header } = Layout;
const FormItem = Form.Item;
const {TextArea} = Input;
const RadioGroup = Radio.Group;


class registered  extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'inline',
      values : [],
      disabled : false,
      agent : [{id:'0',name:'否'},{id:'1',name:'是'}],
      residences : [],
      orgData:[],
      key:'',
      checkedValue : '',
      token : "",
    };
  }

  componentDidMount(){
      var queryZonCodeParam={
        zonecode:"000000"//传入空传或null都可以最好填上'000000'
      };
      var residences = LoginService.queryZonCode(queryZonCodeParam).children;
      var token = "";
      var tokenObj = LoginService.getToken(queryZonCodeParam);
      if(tokenObj.result){
         token = tokenObj.data;
      }
      var zoneCode = localStorage.getItem("zoneCode");
      var orgData = LoginService.LenovoSelectService({zonecode:zoneCode,orgtype:'7'});

      this.setState({residences,token,orgData});
   };


   handleSubmit = (e) =>{
 	   e.preventDefault();
     const {form} = this.props;
     var {token} = this.state;
     form.validateFieldsAndScroll((err, values) => {
       console.log(values);

       if (!err) {
         var adrCenter = '';
         var areaCode = '';
         var {key} = this.state;
         if(values.adrCenter != undefined){
           if(values.adrCenter.length > 0){
             adrCenter = values.adrCenter[0];
           }
         }if(values.zoneName != undefined){
           if(values.zoneName.length > 0){
              areaCode = values.zoneName[values.zoneName.length-1];
           }
         }
         console.log(values.zoneName);
         var params = {
            'fdObjectid' : token,
            'adrCenter' : values.adrCenter[0], // 药品应用  必填
            'orgName' :values.orgName,   //单位名称 ADR表示药品 必填
            'orgEn' : values.orgEn,   //英文名称
            'jianpin' : values.jianPin,    //单位简拼
            'countryName' : values.countryName,    // 国家
            'areaCode' : areaCode,    //所属地区  必填 6位行政区编码
            'orgCategory' :values.orgCateGory,    //机构类别默认为生产企业  必填
            'pid' : values.pOrgName ,     //上级单位  必填
            'liaisons' :  values.liaiSons,    //联系人  必填
            'phone' : values.phone,     //联系电话  必填
            'fax' : values.fax,     //单位传真
            'email' : values.emall,     //单位邮箱  必填
            'postAddr' :values.postAddr,   //通信地址  必填
            'postCode' :  values.postCode,    //邮政编码
            'importAgent' : values.importAgent,     //进口代理商   必填
            'legalPerson' :  values.legalPerson,    //法人代表
            'mobile' :  values.mobile,     //手机号码  必填
            'remark' : values.remark,    //组织简介
            'loginName' : values.loginName //登录姓名 为英文
         }
            var earOrg = LoginService.addEapOrg(params);
            if(earOrg.result){
              global.$publicMethod.Hint("提示",true,earOrg.desc);
              hashHistory.push("/Login");
            }else{
              var ErrorInformation;
              var index=0;
              for(let i in earOrg.data){
              	if(ErrorInformation == ""){
                  ErrorInformation = <div>{index+1}: {earOrg.data[0]}</div>
                }else{
                  ErrorInformation = <div>{ErrorInformation}<br/>{index+1}: {earOrg.data[i]}</div>
                }
                index++;
              }
              Modal.info({
                title: '保存机构失败,请检查以下字段',
                content: (<div style={{fontSize:16,color:'red',lineHeight:1}}>{ErrorInformation}</div>),
                onOk() {},
              });
            }
        }
     });
   }
  checkLoginName(rule, value, callback) {
    var regex =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if (value != undefined || "" == value){
        if (value) {
          //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
          if (regex.test(value)) {
            var res = LoginService.checkLoginName({loginName:value});
            if(res.result){
              callback();
            }else{
              callback('用户名重复');
            }
          } else {
            callback('登录用户名为8~16位字母数字混合');
          }
        } else {
            callback('登录用户名为8~16位字母数字混合');
        }
    }else{
        callback('登录用户名为8~16位字母数字混合');
    }
  }
  //校验
  //验证手机号
  checkAccount(rule, value, callback) {
    //与表单数据进行关联
      //正则用//包起来
      var regex =  /^0\d{2,3}-?\d{7,8}$/;
      var phone = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
      console.log(value);
      if (value != undefined || "" == value){
          if (value) {
            //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
            if (regex.test(value) || phone.test(value)) {
              callback();
            } else {
              callback('输入正确的电话或手机格式！');
            }
          } else {
              callback('必填!');
          }
      }else{
          callback('必填!');
      }
    }
     ////////////////////////////////////////////////////////////////////////////////////
    displayRender=(label)=>  {
    return label[label.length - 1];
    }

    //引入联想框相关
    handleChange =(value) => {
    //清除机构数据
    this.props.form.setFields({
       pOrgName: ''
     });
    //value[value.length - 1] 获取地区集合里最后一个地区编码
    var  orgData = LoginService.LenovoSelectService({zonecode:value[value.length - 1],orgtype:'7'});
    // //  var  orgData = AuditService.LenovoSelectService({zonecode:value[value.length - 1],orgtype:'7'});
     this.setState({orgData:orgData});

    }

  goBack = (e) =>{
    var params = {
      liaiSons:"",
      checkStatus:"",
      orgName:"",
      goBcurrent:"",
      state:'search'
    }
    var path = {
      pathname:'/searchAudit',
      state:params,
    }
   hashHistory.push(path);
  }

  render() {
    var self = this;
    var style= {}
    if( screen.width >= 1440 ){
      style.logoText = {color:'white',fontSize:22};
      style.header = {padding: '0px', background: '#0099ff'}
    }else{
      style.logoText = {color:'white',fontSize:18};
      style.header = {padding: '0px', background: '#0099ff',height:55}
    }
    const { getFieldDecorator} = this.props.form;
    var {values ,disabled,residences  } = this.state;
    const firstInput = {    float: "left",marginLeft: "15%",marginTop: "-33px",width: "60%"}
    const doybleInput = {    float: "left",marginLeft: "18%",marginTop: "-33px",width: "60%"}
    return (
      <div className="login-container" style={{overflow:'scroll' }}>
        <Header style={style.header}>
          <div className="layout-logo">
            <Link to="/Login">
              <img className="logo" style={{marginTop:-8}} src={logoSrc} />
              <span className="logo-text" style={style.logoText}>药品上市许可持有人药品不良反应直接报告系统</span>
              <span className="china-foo"><Icon type="user" style={{fontSize:16,marginRight:5}}/></span>
            </Link>
          </div>
        </Header>
        <center>
        <Card style={{marginTop:'1%',width:'90%'}}>
            <Form onSubmit={this.handleSubmit} style={{marginTop:20}}>
              <Row>
                  <Col span={12}>
                      <FormItem
                        label="登录用户名"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('loginName', {
                           rules: [{required: true,message: '必填', whitespace: true},{validator: this.checkLoginName}] })(
                             <Input disabled={disabled}/>
                         )}
                      </FormItem>
                  </Col>
                  <Col span={12}>
                      <FormItem
                        label="药品应用"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                      >
                      {getFieldDecorator('adrCenter', {
                         rules: [{
                           required: true,
                           message: '必填!',
                         }],})(
                           <Checkbox.Group >
                              <Checkbox key={1} value='ADR'>药品</Checkbox>
                           </Checkbox.Group>
                       )}
                      </FormItem>
                  </Col>
              </Row>
              <Row>
                  <Col span={12}>
                      <FormItem
                        label="单位名称"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                      >
                      {getFieldDecorator('orgName', {
                        rules: [{max: 50, message: '单位名称长度不能超过50!',
                                }, {required: true, message: '必填!', }],  })(
                           <Input disabled={disabled}/>
                       )}
                      </FormItem>
                  </Col>
                  <Col span={12}>
                      <FormItem
                        label="英文名称"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                      >
                        {getFieldDecorator('orgEn', {
                         rules: [{required: false,}],})(
                           <Input disabled={disabled}/>
                       )}
                      </FormItem>
                  </Col>
              </Row>
              <Row>
                  <Col span={12}>
                      <FormItem
                        label="单位简拼"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('jianPin', {
                           rules: [{required: false,}],})(
                             <Input disabled={disabled}/>
                         )}
                      </FormItem>
                  </Col>
                  <Col span={12}>
                      <FormItem
                        label="国家:"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                      >
                      {getFieldDecorator('countryName', {
                         rules: [{required: false,}],})(
                           <Input disabled={disabled}/>
                       )}
                      </FormItem>
                  </Col>
              </Row>
              <Row>
                  <Col span={12}>
                      <FormItem
                        label="所属地区"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                      >
                      {getFieldDecorator('zoneName', {
                        rules: [{ type: 'array', required: true, message: '请选择所属地区!' }],
                      })(
                        <Cascader disabled={disabled} changeOnSelect onChange={this.handleChange} expandTrigger="hover" displayRender={this.displayRender} options={residences} placeholder="请选择所属地区" />
                      )}
                      </FormItem>
                  </Col>
                  <Col span={12}>
                      <FormItem
                        label="单位类别"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                      >
                      {getFieldDecorator('orgCateGory', {
                        rules: [{required: true, message: '必填!', }],  })(
                           <RadioGroup disabled={disabled}>
                              <Radio key = {5} value={5}>生产企业  </Radio>
                          </RadioGroup>
                       )}
                      </FormItem>
                  </Col>
              </Row>
              <FormItem
                label="上级单位"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 18 }}
              >
                  {getFieldDecorator('pOrgName',{
                      rules: [{ required: true, message: '请选择所属机构!', whitespace: true }],
                    }) (
                      <Select  disabled={disabled} placeholder="请选择所属机构" >
                        {this.state.orgData.map(function (item,index){
                                  return <Option key={item.key}  value={item.key}>{item.value}</Option>
                      })}
                    </Select>)}
              </FormItem>
              <Row  style = {{marginTop: "14px"}}   >
                  <Col span={12}>
                      <FormItem
                        label="联系人"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                      >
                      {getFieldDecorator('liaiSons', {
                        rules: [{max: 50, message: '联系人长度不能超过50!',
                                }, {required: true, message: '必填!', }],  })(
                           <Input disabled={disabled}/>
                       )}
                      </FormItem>
                  </Col>
                  <Col span={12}>
                      <FormItem
                        label="联系电话:"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                      >
                      {getFieldDecorator('phone', {
                        rules: [{type:'string', required: true, message: '请输入手机号码!' },{
                         validator: this.checkAccount,
                       }],})(
                           <Input onBlur={this.checkAccount}  disabled={disabled}/>
                       )}
                      </FormItem>
                  </Col>
               </Row>
               <Row>
                   <Col span={12}>
                       <FormItem
                         label="单位传真"
                         labelCol={{ span: 6 }}
                         wrapperCol={{ span: 12 }}
                       >
                       {getFieldDecorator('fax', {
                          rules: [{required: false,}],})(
                            <Input disabled={disabled}/>
                        )}
                       </FormItem>
                   </Col>
                   <Col span={12}>
                       <FormItem
                         label="单位邮箱:"
                         labelCol={{ span: 6 }}
                         wrapperCol={{ span: 12 }}
                       >
                       {getFieldDecorator('emall', {
                         rules: [{type: 'email', message: '不是有效邮箱格式!',
                       }, {required: true, message: '请输入单位邮箱', }],  })(
                            <Input disabled={disabled}/>
                        )}
                       </FormItem>
                   </Col>
               </Row>
               <FormItem
                 label="通信地址"
                 labelCol={{ span: 3 }}
                 wrapperCol={{ span: 18 }}
               >
               {getFieldDecorator('postAddr', {
                  rules: [{required: true,message: '必填!',}],})(
                    <Input disabled={disabled}/>
                )}
               </FormItem>
                <Row>
                  <Col span={12}>
                     <FormItem
                       label="邮政编码"
                       labelCol={{ span: 6 }}
                       wrapperCol={{ span: 12 }}
                     >
                     {getFieldDecorator('postCode', {
                        rules: [{required: false,}],})(
                          <Input disabled={disabled}/>
                      )}
                     </FormItem>
                  </Col>
                  <Col span={12}>
                     <FormItem
                       label="进口代理商:"
                       labelCol={{ span: 6 }}
                       wrapperCol={{ span: 12 }}
                     >
                     {getFieldDecorator('importAgent', {
                        rules: [{required: true, message: '必填!',}],})(
                          <Select placeholder="请选择"  disabled={disabled}>
                              {this.state.agent.map(function (item,index){
                                  return <Option key={item.id}  value={item.id}>{item.name}</Option>
                              })}
                          </Select>
                      )}
                     </FormItem>
                  </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                          label="法人代表"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('legalPerson', {
                           rules: [{required: false,}],})(
                             <Input disabled={disabled}/>
                         )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                          label="手机号码:"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('mobile', {
                          rules: [{type:'string', required: true, message: '请输入手机号码!' },{
                           validator: this.checkAccount,
                         }],})(
                             <Input disabled={disabled}/>
                         )}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem
                  label="组织简介"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 18 }}
                >
                {getFieldDecorator('remark', {
                   rules: [{required: false,}],})(
                     <TextArea rows={2} disabled={disabled}/>
                 )}
                </FormItem>

                <center>
                  <Row>
                    <Col span = {12}>
                        <Button  onClick={() => this.goBack()} >返回</Button>
                    </Col>
                    <Col span = {12}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Col>
                  </Row>
                </center>

            </Form>
        </Card>
        </center>
      </div>
    );
  }
}

const FormIndex = Form.create()(registered);
export default FormIndex;
