import React, { Component } from 'react'
import styled from 'styled-components'
import StyButton from 'components/antd/style/button'
import Icons from 'components/dr/icon'
import { Form, Collapse, Input, Button, Select, Switch, InputNumber, Checkbox } from 'antd'
import ajaxGetResource from 'commonFunc/ajaxGetResource'
const CheckboxGroup = Checkbox.Group
import SystemUserLogin from './UserLogin'
import NoLogin from './NoLogin'
const FormItem = Form.Item
const Panel = Collapse.Panel
class SystemOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: true, // 控制所有的按钮是否启用
      page: 1,
      pagedataOne: {},
      pageDataTwo: {},
      ifshow: false
    }
  }
  componentDidMount() {
    this.getlist()
  }
  /** [handleSubmit 表单的提交事件] */
  handleSubmit = e => {
    e.preventDefault()
    let this_ = this
    let { data } = this.state
    this.props.form.validateFields((err, values) => {
      this_.postList(values)
    })
  }
  /** [isshowed 保存成功提示框] */
  isshowed = () => {
    let _this = this
    this.setState({ ifshow: true }, () => {
      function tishi() {
        _this.setState({ ifshow: false })
        _this.props.handleStatus([])
      }
      setTimeout(tishi, 1000)
    })
  }
  /** [getlist 获取用户的选项信息] */
  getlist = () => {
    let self = this
    let params = {
      url: 'SyUseroptionController/getList',
      server_url: config_login_url,
      data: {
        userid: Number(window.sessionStorage.getItem('userid'))
      }
    }

    function callBack(res) {
      if (res.result) {
        if (res.data != []) {
          self.getdatelist(res.data)
        }
      } else {
        console.log('异常响应信息', res)
      }
    }
    ajaxGetResource(params, callBack)
  }
  /** [postList 发送系统选项] */
  postList = datalist => {
    let self = this
    let data = [
      {
        optcode: 1,
        optdesc: '开机时自动启动',
        optname: 'autoStart',
        optvalue: datalist.autoStart ? '01' : '02',
        seqno: 1,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 2,
        optdesc: '关闭主控浮窗时最小化至系统托盘，不退出系统',
        optname: 'systemTray',
        optvalue: datalist.systemTray ? '01' : '02',
        seqno: 2,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 3,
        optdesc: '点击主控浮窗中菜单项时，主控浮窗操作窗体自动隐藏',
        optname: 'automaticFloats',
        optvalue: datalist.automaticFloats ? '01' : '02',
        seqno: 3,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 4,
        optdesc: '当点击主控浮窗中菜单时，健康信息平台左侧功能区自动隐藏',
        optname: 'automaticLeft',
        optvalue: datalist.automaticLeft ? '01' : '02',
        seqno: 4,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 5,
        optdesc: '焦点离开主控浮窗秒后自动隐藏主控浮窗操作窗体',
        optname: 'automaticFocu',
        optvalue: datalist.automaticFocu ? '01' : '02',
        seqno: 5,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 6,
        optdesc: '当关闭健康信息平台功能窗体后 , 自动显示主控浮窗操作窗',
        optname: 'autoDisplay',
        optvalue: datalist.autoDisplay ? '01' : '02',
        seqno: 6,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 7,
        optdesc: '当关闭健康信息平台功能窗体后 , 健康信息平台右侧功能区自动隐藏',
        optname: 'automaticRight',
        optvalue: datalist.automaticRight ? '01' : '02',
        seqno: 7,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 8,
        optdesc: '主控浮窗显示模式',
        optname: 'displayMode',
        optvalue: datalist.displayMode,
        seqno: 8,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 9,
        optdesc: '主控浮窗透明度调整',
        optname: 'transparency',
        optvalue: datalist.transparency,
        seqno: 9,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 10,
        optdesc: '首页默认样式设置',
        optname: 'homeSetting',
        optvalue: datalist.homeSetting,
        seqno: 10,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 11,
        optdesc: '中药处方字体设置',
        optname: 'MedicinePrescription',
        optvalue: datalist.MedicinePrescription,
        seqno: 11,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 12,
        optdesc: '中医适宜技术治疗单字体设置',
        optname: 'MedicineTechnology',
        optvalue: datalist.MedicineTechnology,
        seqno: 12,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 13,
        optdesc: '填写中医适宜技术治疗单时，开启辅助取穴、自动获取默认操作方法',
        optname: 'automaticAcquisition',
        optvalue: datalist.automaticAcquisition ? '01' : '02',
        seqno: 13,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 14,
        optdesc: '进入今日诊疗模块，对于当前正在诊疗的病人给出信息提示',
        optname: 'InformationHints',
        optvalue: datalist.InformationHints ? '01' : '02',
        seqno: 14,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 15,
        optdesc: '书写病历时，根据病历中关键词右侧病历模板智能实时推送',
        optname: 'realTimePush',
        optvalue: datalist.realTimePush ? '01' : '02',
        seqno: 15,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 16,
        optdesc: '书写病历时，鼠标停留在舌诊选择标签时，在右侧显示标准舌诊照片',
        optname: 'displayPhotos',
        optvalue: datalist.displayPhotos ? '01' : '02',
        seqno: 16,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      },
      {
        optcode: 17,
        optdesc: '书写病历时，鼠标停留在脉象选择标签时，在右侧区域显示标准脉象描述',
        optname: 'pulseDescription',
        optvalue: datalist.pulseDescription ? '01' : '02',
        seqno: 17,
        showflag: '1',
        useflag: '1',
        userid: Number(window.sessionStorage.getItem('userid'))
      }
    ]
    let params = {
      url: 'SyUseroptionController/postList',
      server_url: config_login_url,
      type: 'post',
      data: JSON.stringify(data)
    }

    function callBack(res) {
      if (res.result) {
        self.isshowed()
      } else {
        console.log('异常响应信息', res)
      }
    }
    ajaxGetResource(params, callBack)
  }
  /** [isModify 改变按钮状态] */
  isModify = a => {
    if (a == 1) {
      this.setState({ checked: true })
      return
    }
    this.setState({ checked: false })
  }
  /** [getdatelist 处理数据] */
  getdatelist = data => {
    var pagedataOne = {},
      pageDataTwo = {}
    data.forEach(item => {
      if (item.seqno > 9) {
        pageDataTwo[item.optname] = item.optvalue
      } else {
        pagedataOne[item.optname] = item.optvalue
      }
    })
    this.setState({ pagedataOne: pagedataOne, pageDataTwo: pageDataTwo })
  }
  /** [setpage 改变page值] */
  setpage = a => {
    let _this = this
    var page = this.state.page
    if (a != page) {
      _this.setState({ page: a })
    }
  }
  render() {
    let { page, checked, pageDataTwo, pagedataOne } = this.state
    return (
      <Container>
        <Body>
          <Forms className={page == 1 ? null : page == 2 ? 'top' : 'bot'}>
            <SystemUserLogin checked={checked} form={this.props.form} pagedataOne={pagedataOne} />
            <NoLogin checked={checked} form={this.props.form} pageDataTwo={pageDataTwo} />
          </Forms>
        </Body>
        {checked ? null : (
          <Foot>
            <SureButton onClick={this.handleSubmit}> 保存 </SureButton>
            <CancelButton onClick={() => this.isModify(1)}> 取消 </CancelButton>
            {this.state.ifshow ? (
              <Successupdata>
                <IconOne type="ok" />
                保存成功
              </Successupdata>
            ) : null}
            <Right>
              <Spans>{page == 2 ? '2/2' : '1/2'}</Spans>
              <Spans onClick={() => this.setpage(3)}> 上页 </Spans>
              <Spans onClick={() => this.setpage(2)}> 下页 </Spans>
            </Right>
          </Foot>
        )}
      </Container>
    )
  }
}
export default Form.create()(SystemOptions)
const Container = styled.div`
  width: 100%;
  height: 100%;
`
const Body = styled.div`
  height: 400px;
  width: 100%;
  overflow: hidden;
`
const Forms = styled(Form)`
  height: 750px;
  &&&.top {
    transform: translate(0px, -400px);
  }
  &&&.bot {
    transform: translate(0px, 0px);
  }
`
const Foot = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  border-top: 1px solid #ccc;
`
const Successupdata = styled.div`
  display: inline-block;
  width: 100px;
  height: 20px;
  text-align: center;
`
const IconOne = styled(Icons)`
  height: 20px;
  width: 20px;
  margin-top: -2px;
  margin-left: 16px;
`
const Right = styled.div`
  position: absolute;
  right: 0;
  text-align: right;
  margin-right: 20px;
`
const Spans = styled.span`
  color: #0a6ecb;
  margin-left: 10px;
  cursor: pointer;
`
const SureButton = styled(Button)`
  ${StyButton.semicircle} width: 100px;
  height: 28px;
`
const CancelButton = styled(Button)`
  ${StyButton.gray} width: 100px;
  height: 28px;
  border: 1px solid #0a6ecb !important;
`
