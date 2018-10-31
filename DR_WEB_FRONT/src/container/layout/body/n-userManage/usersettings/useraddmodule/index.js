/* @作者：马奔
@日期：2018-10-24
@描述：用户 添加/修改 模块 */
import React, {Component} from 'react';
import styled from 'styled-components';
import {Form, Input, Select, Button, Switch} from 'antd';
import StyButton from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import Icon from 'components/dr/icon';

const Option = Select.Option;
const FormItem = Form.Item;
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deptlist: [], //科室列表
      roleList: [], //角色列表
      titleList: [], //职称列表
      userinfo:'', //用户的数据
      roles:[], //角色的集合
    };
  }
  componentWillMount() {
    this.getdeptlist();
    this.getrolelist();
    this.gettitlelist();
    if(this.props.id){
      this.getuserinfo(this.props.id);
    }

  }
  /**[getdeptlist 拿到科室列表数据]*/
  getdeptlist() {
    let self = this;
    let params = {
      url: 'BaDepartmentController/getList',
      server_url: config_login_url,
      data: {
        orgid: window.sessionStorage.getItem('orgid')
      }
    };
    function callBack(res) {
      if (res.result) {
        self.setState({deptlist: res.data});
      } else {
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  /** [getrolelist 拿到角色列表] */
  getrolelist() {
    let self = this;
    let params = {
      url: 'SyOrgroleController/getList',
      server_url: config_login_url,
      data: {
        orgid: window.sessionStorage.getItem('orgid')
      }
    };
    function callBack(res) {
      if (res.result) {
        console.log('角色的数据',res.data)
        self.setState({roleList: res.data.records});
      } else {
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  /** [getrolelist 拿到职称列表] */
  gettitlelist() {
    let self = this;
    let params = {
      url: 'BaDatadictController/getListData',
      server_url: config_service_url,
      data: {
        dictNoList: 'post'
      }
    };
    function callBack(res) {
      if (res.result) {
        // console.log("职称的数据", res.data[0].baDatadictDetailList)
        self.setState({titleList: res.data[0].baDatadictDetailList});
      } else {
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  /** [getuserinfo 获取用户信息用户] */
  getuserinfo(id) {
    let self = this;
    let params = {
      url: 'BaOrguserController/getData',
      server_url: config_login_url,
      data: {
        orgUerid:id
      }
    };
    function callBack(res) {
      if (res.result) {
        console.log("用户的信息",res.data);
        let roleArr=[];
        res.data.syOrgroleList.forEach((item)=>{
          roleArr.push(item.orgRolename)
        })
        self.setState({userinfo: res.data,roles:roleArr});
      } else {
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  /** [postuserinfo 添加用户] */
  postuserinfo(forminfo) {
    let formOrgroleList=[];
    let { roleList} =this.state;
    forminfo.roles.forEach((item)=>{
      formOrgroleList.push( roleList[item]);
    })
    let data = {
      "createip": "1",
      "ctstamp": "2018-10-31T01:26:21.330Z",
      "dayLogintimes": 0,
      "deptid": forminfo.deptidDic,
      "email": forminfo.email,
      "initcomplete": "1",
      "loginip": "1",
      "logintime": "2018-10-31T01:26:21.330Z",
      "mobile":forminfo.mobile,
      "newPassword": "1",
      "orgName": forminfo.orgName,
      "orgUerid": 0,
      "orgUserno": 0,
      "orgcode": "1",
      "orgid": 0,
      "password": forminfo.password,
      "phone": "1",
      "photo": "1",
      "photourl": "1",
      "post": forminfo.post,
      "quickMenu": {
        "leftMenuList": [
          {
            "ctstamp": "2018-10-31T01:26:21.330Z",
            "menuid": 0,
            "menustate": "1",
            "menutype": "1",
            "modid": 0,
            "seqno": 0,
            "syModule": {
              "callurl": "1",
              "ctstamp": "2018-10-31T01:26:21.330Z",
              "lastflag": 0,
              "level": 0,
              "moddesc": "1",
              "modid": 0,
              "modname": "1",
              "modno": "1",
              "modtype": "1",
              "remarks": "1",
              "seqno": 0,
              "superid": 0,
              "syModuleList": [
                {}
              ],
              "syWorkList": [
                {
                  "callurl": "1",
                  "ctstamp": "2018-10-31T01:26:21.330Z",
                  "modid": 0,
                  "seqno": 0,
                  "uctstamp": "2018-10-31T01:26:21.330Z",
                  "useflag": "1",
                  "workdesc": "1",
                  "workid": 0,
                  "workname": "1",
                  "workno": "1",
                  "workobject": "1",
                  "worktype": "1"
                }
              ],
              "uctstamp": "2018-10-31T01:26:21.330Z",
              "useflag": "1",
              "user": {
                "userId": "1"
              }
            },
            "uctstamp": "2018-10-31T01:26:21.330Z",
            "useflag": "1",
            "userid": 0
          }
        ],
        "rightMenuList": [
          {
            "ctstamp": "2018-10-31T01:26:21.330Z",
            "menuid": 0,
            "menustate": "1",
            "menutype": "1",
            "modid": 0,
            "seqno": 0,
            "syModule": {
              "callurl": "1",
              "ctstamp": "2018-10-31T01:26:21.330Z",
              "lastflag": 0,
              "level": 0,
              "moddesc": "1",
              "modid": 0,
              "modname": "1",
              "modno": "1",
              "modtype": "1",
              "remarks": "1",
              "seqno": 0,
              "superid": 0,
              "syModuleList": [
                {}
              ],
              "syWorkList": [
                {
                  "callurl": "1",
                  "ctstamp": "2018-10-31T01:26:21.330Z",
                  "modid": 0,
                  "seqno": 0,
                  "uctstamp": "2018-10-31T01:26:21.330Z",
                  "useflag": "1",
                  "workdesc": "1",
                  "workid": 0,
                  "workname": "1",
                  "workno": "1",
                  "workobject": "1",
                  "worktype": "1"
                }
              ],
              "uctstamp": "2018-10-31T01:26:21.330Z",
              "useflag": "1",
              "user": {
                "userId": "1"
              }
            },
            "uctstamp": "2018-10-31T01:26:21.330Z",
            "useflag": "1",
            "userid": 0
          }
        ]
      },
      "realname": forminfo.realname,
      "syModuleList": [
        {
          "callurl": "1",
          "ctstamp": "2018-10-31T01:26:21.330Z",
          "lastflag": 0,
          "level": 0,
          "moddesc": "1",
          "modid": 0,
          "modname": "1",
          "modno": "1",
          "modtype": "1",
          "remarks": "1",
          "seqno": 0,
          "superid": 0,
          "syModuleList": [
            {}
          ],
          "syWorkList": [
            {
              "callurl": "1",
              "ctstamp": "2018-10-31T01:26:21.330Z",
              "modid": 0,
              "seqno": 0,
              "uctstamp": "2018-10-31T01:26:21.330Z",
              "useflag": "1",
              "workdesc": "1",
              "workid": 0,
              "workname": "1",
              "workno": "1",
              "workobject": "1",
              "worktype": "1"
            }
          ],
          "uctstamp": "2018-10-31T01:26:21.330Z",
          "useflag": "1",
          "user": {
            "userId": "1"
          }
        }
      ],
      "syOrgroleList": formOrgroleList,
      "syOrguserOrgroleList": [
        {
          "ctstamp": "2018-10-31T01:26:21.331Z",
          "id": 0,
          "orgRoleid": 1,
          "orgUserid": 0,
          "uctstamp": "2018-10-31T01:26:21.331Z",
          "useflag": "1"
        }
      ],
      "syWorkList": [
        {
          "callurl": "1",
          "ctstamp": "2018-10-31T01:26:21.331Z",
          "modid": 0,
          "seqno": 0,
          "uctstamp": "2018-10-31T01:26:21.331Z",
          "useflag": "1",
          "workdesc": "1",
          "workid": 0,
          "workname": "1",
          "workno": "1",
          "workobject": "1",
          "worktype": "1"
        }
      ],
      "totalLogintimes": 0,
      "useflag": "1",
      "utstamp": "2018-10-31T01:26:21.331Z"
    }
    console.log("发送的数据", data)
    let params = {
      url: 'BaOrguserController/postData',
      server_url: config_login_url,
      data: JSON.stringify(data),
      type: 'post'
    };
    function callBack(res) {
      if (res.result) {
        // console.log("OK")
      } else {
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  /** [putuserinfo 修改用户] */
  putuserinfo(forminfo) {
    let formOrgroleList=[];
    let { roleList} =this.state;
    forminfo.roles.forEach((item)=>{
      formOrgroleList.push( roleList[item]);
    })
    let data = {
      "createip": "1",
      "ctstamp": "2018-10-31T01:26:21.330Z",
      "dayLogintimes": 0,
      "deptid": forminfo.deptidDic,
      "email": forminfo.email,
      "initcomplete": "1",
      "loginip": "1",
      "logintime": "2018-10-31T01:26:21.330Z",
      "mobile":forminfo.mobile,
      "newPassword": "1",
      "orgName": forminfo.orgName,
      "orgUerid": 0,
      "orgUserno": 0,
      "orgcode": "1",
      "orgid": 0,
      "password": forminfo.password,
      "phone": "1",
      "photo": "1",
      "photourl": "1",
      "post": forminfo.post,
      "quickMenu": {
        "leftMenuList": [
          {
            "ctstamp": "2018-10-31T01:26:21.330Z",
            "menuid": 0,
            "menustate": "1",
            "menutype": "1",
            "modid": 0,
            "seqno": 0,
            "syModule": {
              "callurl": "1",
              "ctstamp": "2018-10-31T01:26:21.330Z",
              "lastflag": 0,
              "level": 0,
              "moddesc": "1",
              "modid": 0,
              "modname": "1",
              "modno": "1",
              "modtype": "1",
              "remarks": "1",
              "seqno": 0,
              "superid": 0,
              "syModuleList": [
                {}
              ],
              "syWorkList": [
                {
                  "callurl": "1",
                  "ctstamp": "2018-10-31T01:26:21.330Z",
                  "modid": 0,
                  "seqno": 0,
                  "uctstamp": "2018-10-31T01:26:21.330Z",
                  "useflag": "1",
                  "workdesc": "1",
                  "workid": 0,
                  "workname": "1",
                  "workno": "1",
                  "workobject": "1",
                  "worktype": "1"
                }
              ],
              "uctstamp": "2018-10-31T01:26:21.330Z",
              "useflag": "1",
              "user": {
                "userId": "1"
              }
            },
            "uctstamp": "2018-10-31T01:26:21.330Z",
            "useflag": "1",
            "userid": 0
          }
        ],
        "rightMenuList": [
          {
            "ctstamp": "2018-10-31T01:26:21.330Z",
            "menuid": 0,
            "menustate": "1",
            "menutype": "1",
            "modid": 0,
            "seqno": 0,
            "syModule": {
              "callurl": "1",
              "ctstamp": "2018-10-31T01:26:21.330Z",
              "lastflag": 0,
              "level": 0,
              "moddesc": "1",
              "modid": 0,
              "modname": "1",
              "modno": "1",
              "modtype": "1",
              "remarks": "1",
              "seqno": 0,
              "superid": 0,
              "syModuleList": [
                {}
              ],
              "syWorkList": [
                {
                  "callurl": "1",
                  "ctstamp": "2018-10-31T01:26:21.330Z",
                  "modid": 0,
                  "seqno": 0,
                  "uctstamp": "2018-10-31T01:26:21.330Z",
                  "useflag": "1",
                  "workdesc": "1",
                  "workid": 0,
                  "workname": "1",
                  "workno": "1",
                  "workobject": "1",
                  "worktype": "1"
                }
              ],
              "uctstamp": "2018-10-31T01:26:21.330Z",
              "useflag": "1",
              "user": {
                "userId": "1"
              }
            },
            "uctstamp": "2018-10-31T01:26:21.330Z",
            "useflag": "1",
            "userid": 0
          }
        ]
      },
      "realname": forminfo.realname,
      "syModuleList": [
        {
          "callurl": "1",
          "ctstamp": "2018-10-31T01:26:21.330Z",
          "lastflag": 0,
          "level": 0,
          "moddesc": "1",
          "modid": 0,
          "modname": "1",
          "modno": "1",
          "modtype": "1",
          "remarks": "1",
          "seqno": 0,
          "superid": 0,
          "syModuleList": [
            {}
          ],
          "syWorkList": [
            {
              "callurl": "1",
              "ctstamp": "2018-10-31T01:26:21.330Z",
              "modid": 0,
              "seqno": 0,
              "uctstamp": "2018-10-31T01:26:21.330Z",
              "useflag": "1",
              "workdesc": "1",
              "workid": 0,
              "workname": "1",
              "workno": "1",
              "workobject": "1",
              "worktype": "1"
            }
          ],
          "uctstamp": "2018-10-31T01:26:21.330Z",
          "useflag": "1",
          "user": {
            "userId": "1"
          }
        }
      ],
      "syOrgroleList": formOrgroleList,
      "syOrguserOrgroleList": [
        {
          "ctstamp": "2018-10-31T01:26:21.331Z",
          "id": 0,
          "orgRoleid": 1,
          "orgUserid": 0,
          "uctstamp": "2018-10-31T01:26:21.331Z",
          "useflag": "1"
        }
      ],
      "syWorkList": [
        {
          "callurl": "1",
          "ctstamp": "2018-10-31T01:26:21.331Z",
          "modid": 0,
          "seqno": 0,
          "uctstamp": "2018-10-31T01:26:21.331Z",
          "useflag": "1",
          "workdesc": "1",
          "workid": 0,
          "workname": "1",
          "workno": "1",
          "workobject": "1",
          "worktype": "1"
        }
      ],
      "totalLogintimes": 0,
      "useflag": "1",
      "utstamp": "2018-10-31T01:26:21.331Z"
    }
    console.log("发送的数据", data)
    let params = {
      url: 'BaOrguserController/putData',
      server_url: config_login_url,
      data: JSON.stringify(data),
      type: 'put'
    };
    function callBack(res) {
      if (res.result) {
      } else {
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  }
  /** [handleSubmit 表单提交事件] */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err,values ) => {
      if (!err) {
        console.log("提交的数据",values)
        if(this.props.id){
          this.putuserinfo(values);
        }else{
          this.postuserinfo(values);
        }

      }
    });
    this.props.setuptype(2)
  }
  /** [handleSelectChange 默认初始密码事件] */
  initialpassword = () => {
    this.props.form.setFieldsValue({password: "666666"});
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    let {id, deptlist, roleList, titleList,userinfo,roles} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 8
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 16
        }
      }
    };
    return (<Container>
      <Header>
        <span style={{
            color: '#000',
            margin: '0px 5px'
          }}>▶</span>
        <span style={{
            color: '#5d6ecb',
            cursor: 'pointer'
          }} onClick={(e) => this.props.setuptype(2, 2)}>用户设置</span>
        <StyleIconC type='next'/>
        <span>{
            this.props.id
              ? '修改用户'
              : '添加用户'
          }</span>
      </Header>
      <Body>
        <Form onSubmit={this.handleSubmit}>
          <FormItems {...formItemLayout} label="用户名">
            {
              getFieldDecorator('orgName', {
                initialValue:userinfo.orgName||'',
                rules: [
                  {
                    required: true,
                    message: '请输入用户名!'
                  }
                ]
              })(<Inputs/>)
            }
          </FormItems>
          <FormItems {...formItemLayout} label="真实姓名">
            {
              getFieldDecorator('realname', {
                initialValue:userinfo.realname||'',
                rules: [
                  {
                    required: true,
                    message: '请输入真实姓名!'
                  }
                ]
              })(<Inputs/>)
            }
          </FormItems>
          <FormItem {...formItemLayout} label="所在科室" hasFeedback="hasFeedback">
            {
              getFieldDecorator('deptidDic', {
                initialValue:userinfo.deptidDic||'',
                rules: [
                  {
                    required: true,
                    message: '请选择所在科室'
                  }
                ]
              })(<Selects placeholder="请选择所在科室">
                {
                  deptlist.map((item, index) => {
                    return (<Option value={item.deptid}>{item.deptname}</Option>)
                  })
                }
              </Selects>)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="职称" hasFeedback="hasFeedback">
            {
              getFieldDecorator('post', {
                initialValue:userinfo.postDic||'',
                rules: [
                  {
                    required: true,
                    message: '请选择职称'
                  }
                ]
              })(<Selects placeholder="请选择职称">
                {
                  titleList.map((item, index) => {
                    return (<Option value={item.value}>{item.vname}</Option>)
                  })
                }
              </Selects>)
            }
          </FormItem>
          <FormItems {...formItemLayout} label="角色">
            {
              getFieldDecorator('roles', {
                initialValue:roles,
                rules: [
                  {
                    required: true,
                    message: '请选择角色!'
                  }
                ]
              })(<Selects mode="multiple" placeholder="请选择角色">
                {
                  roleList.map((item, index) => {
                    return (<Option value={index}>{item.orgRolename}</Option>)
                  })
                }
              </Selects>)
            }
          </FormItems>
          <FormItems {...formItemLayout} label="手机号">
            {
              getFieldDecorator('mobile', {
                initialValue:userinfo.mobile||'',
                rules: [
                  {
                    required: true,
                    message: '请输入手机号!'
                  }
                ]
              })(<Inputs placeholder="请输入联系人手机号"/>)
            }
          </FormItems>
          <FormItems {...formItemLayout} label="E-mail">
            {
              getFieldDecorator('email', {
                initialValue:userinfo.email||'',
                rules: [
                  {
                    type: 'email',
                    message: '请填写正确的电子邮件!'
                  }, {
                    required: true,
                    message: '请输入电子邮件!'
                  }
                ]
              })(<Inputs placeholder="请输入联系人邮箱"/>)
            }
          </FormItems>
          <FormItems {...formItemLayout} label="初始密码">
            {getFieldDecorator('password',{
              initialValue:userinfo.password||'',
            })(<Inputs placeholder="666666"/>)}
            <Initialspan onClick={this.initialpassword}>使用默认密码</Initialspan>
          </FormItems>
          <FormItems {...formItemLayout} label="首次登录需要修改密码">
            {getFieldDecorator('ismodify')(<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked="defaultChecked"/>)}
          </FormItems>
          <FormItems {...formItemLayout} label="备注">
            {
              getFieldDecorator('Remarks',{
                initialValue:userinfo.Remarks||'',
              })(<textarea style={{
                  width: '54%'
                }}/>)
            }
          </FormItems>
          <FormItems {...formItemLayout} label="是否启用">
            {getFieldDecorator('ismodify')(<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked="defaultChecked"/>)}
          </FormItems>
          <Line></Line>
          <center >
            <SureButton htmlType="submit">保存</SureButton>
            <CancelButton onClick={this.handleCancel}>取消</CancelButton>
          </center>
        </Form>
      </Body>
    </Container>)
  }
}
const Container = styled.div `
  width:100%;
  overflow: hidden;
  height: calc(100vh - 50px);
`;
const Header = styled.div `
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: rgb(242,242,242);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.349019607843137);
  padding-left:15px;
`;
const Body = styled.div `
  width: 100%;
  margin-top: 10px;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  height: calc(100vh - 100px);
  position: relative;
`
const FormItems = styled(FormItem)`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 0px 20%;
   .ant-form-item-label > label{
      color:rgb(51, 51, 51) !important;
      font-size: 14px !important;
   }
 `
const Inputs = styled(Input)`
  border:0 !important;
  border-bottom:1px solid #ccc !important;
  width: 54% !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 0px !important;
`
const Selects = styled(Select)`
  border-bottom:1px solid #ccc !important;
  width: 54% !important;
  .ant-select-selection{
    border:0 !important;
    outline: none !important;
    box-shadow: none !important;
  }
  .ant-select-arrow{
    color: #666666 !important;
  }
`
const Initialspan = styled.span `
  position:relative;
  right:87px;
  top:3px;
  color:rgb(16, 142, 233);
  font-size: 14px;
`
const Line = styled.div `
  width: 90%;
  margin: 0 auto;
  height: 1px;
  background-color: #666;
  margin-bottom: 20px;
`
const StyleIconC = styled(Icon)`
  margin:0px 5px;
  height:16px;
  width:16px;
  margin-top:6px;
`;

const SureButton = styled(Button)`
  ${StyButton.semicircle}
`;
const CancelButton = styled(Button)`
  ${StyButton.gray}
`;
const WrappedRegistrationForm = Form.create()(Index);

export default WrappedRegistrationForm;
