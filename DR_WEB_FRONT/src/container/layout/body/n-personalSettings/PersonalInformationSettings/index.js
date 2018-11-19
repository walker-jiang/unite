import React, {Component} from 'react';
import { Form,Collapse,Input,Button,Select,Upload, Icon, message,Modal  } from 'antd';
// import { Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import "./style.less";
import Icons from 'components/dr/icon';
const Option = Select.Option;
import Ajax from 'commonFunc/ajaxGetResource';
// import Ajax from '../../../rightAssistBar/service/xhr/index';
import styled from 'styled-components';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
//上传图片
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
  // console.log(reader);
}
// function successToast() {
//   Toast.success('Load success !!!', 1);
// }
class PersonalInformationSettings extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        checked:true,
        loading: false,
        data:props.prop,
        dataImg:props.prop[0].photo,
        ifshow:false,  //是否显示保存成功,
        imageUrl:'',
      };
  }

  componentDidMount(){
    let data=this.state.data[0];//父组件请求得到用户数据
    let postDic = this.state.data[1];//职务
    let deptcodeDic = this.state.data[2];//科室
    // this.getDocData(data,postDic,deptcodeDic);

    // console.log('可是数据回显：',data,postDic,deptcodeDic);
    var post,deptcode;
    deptcodeDic.forEach((val,ind)=>{
      if(val!=null){
        if(data.deptcode == val.deptcode){
          deptcode=val.deptcode
        }
      }
    })
    postDic.forEach((postv,posti)=>{
      if(postv != null){
        if(data.post == postv.value){
          post=postv.vname
        }
      }

    })
    //设置回显
    this.props.form.setFieldsValue({
      "userName":data.orgUserno,
      "realName":data.realname,
      "post":post,//职务
      "deptcode":deptcode,//科室
      "selphoneNum":data.mobile,
      "phoneNum":data.phone,
      "Email":data.email
    })
    // Toast.loading('Loading...', 30, () => {
    //   console.log('Load complete !!!');
    // });
    //
    // setTimeout(() => {
    //   Toast.hide();
    // }, 3000);
  }
  /** [isshowed 保存成功提示框] */
 isshowed =() =>{
   let _this =this;
   this.setState({ifshow:true},()=>{
     function tishi(){
       _this.setState({ifshow:false})
       _this.props.handleStatus([]);
      _this.props.getPatientData(window.sessionStorage.getItem('userid'));
     }
     setTimeout(tishi,1000)
   }
   )
 }
  //上传图片
  handleChange = (info) => {
    // console.log('infoinfo',info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      // this.handleSubmit(e);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl:imageUrl,
        loading: false,
      }));
    }
  }

  changeImg=(e)=>{


  }
  // handleClick (pram) {
  //   this.setState({
  //     status: pram
  //   });
  // }
  isModify=()=>{
    this.setState({checked:false})
  }

  //修改个人信息调用事件
  handleSubmit=(e)=>{
    e.preventDefault()
    e.stopPropagation()
    // this.setState({checked:true})
    const deptData =this.state.data[2],//科室
          dictListObj=this.state.data[1];//职务
    this.props.form.validateFields((err, values)=>{
      var deptcode='',post='';
      dictListObj.forEach((val,ind)=>{
        if(val.vdesc != null&&values.post == val.vname){
          post = val.value;
          return
        }
      })
      deptData.forEach((v,i)=>{
        // console.log(values.deptcode,v,v.deptdesc,'1122222');
        if(v.deptdesc != null&&values.deptcode == v.deptcode){
          deptcode = v.deptcode;
          return
        }
      })
      var date = {
        "orgUserno":values.userName,//用户号
        "realname": values.realName,//真姓名
        "deptcode":deptcode,//values.deptcode == v.deptdesc?v.deptcode:'3',//所属科室
        "post": post,//values.post == val.vdesc?val.value:'',  //职务等级
        "mobile": values.selphoneNum,//手机号
        "phone": values.phoneNum,//座机号
        "email": values.Email,//邮箱
        "orgUserid":window.sessionStorage.getItem('userid'),
        "photo":values.file ?values.file.file.name:'',
        "photourl": values.file ? values.file.file.response.data.url : '',
      }
      this.isshowed();
      let params = {
        url: 'BaOrguserController/putData',
        type: 'put',
        data: JSON.stringify(date),
        server_url:config_login_url
      }
      // console.log('发送的数据',date)
      let that = this;
      function success(res) {
        if(res.result){
          that.isshowed();
          that.getPatientData(window.sessionStorage.getItem('userid'));
        }else{
          window.modal = Modal.error({
            title: '请求失败，修改个人信息不成功！',
            onOk: ()=>{
              window.modal = null
            }
          });
        }
      };
      Ajax(params, success);
    })
  }
  getPatientData(id){
    let self = this;
    let params = {
      url: 'BaOrguserController/getData',
      server_url:config_login_url,
      data: {
        orgUserid: id,
      },
    };
    function callBack(res){
      // console.log('resres1234567890',res);
      if(res.result){
        self.props.handleClick(res.data.photo);
      }else{
        console.log('异常响应信息', res);
      }
    };
    Ajax(params, callBack);
  };
  //取消
  setStatus=()=>{
    this.setState({checked:true})
    this.props.handleStatus([]);
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
     labelCol: {
       xs: { span: 24 },
       sm: { span: 5 },
     },
     wrapperCol: {
       xs: { span: 24 },
       sm: { span: 19 },
     },
   };
   const this_ =this;
   // let config_service_url='http://219.234.5.58:8086/';
   const props = {
     action: config_login_url + 'BaUploadController/upload',
     data: {
       orguserid: window.sessionStorage.getItem('userid'),
       serviceType: 'userPhoto'
     },
     name:"clientFile",//与后台字段对应
     listType: "picture-card",
     showUploadList: false,
     headers: {'X-Requested-With': null},
     accept: "image/jpg,image/jpeg,image/png,image/bmp",
     onChange: this.handleChange,
     showUploadList: false,
     beforeUpload(file) {
       const isJPG = file.type === 'image/jpeg' || 'image/png';
       if (!isJPG) {
         message.error('头像照片仅支持png或jpg 格式');
       }
       const isLt2M = file.size / 1024 / 1024 < 2;
       if (!isLt2M) {
         message.error('照片大小不能超过2MB!');
       }
       return isJPG && isLt2M;
     }
   }
    //上传图片
    const uploadButton = (
      <div>
        <div className="ant-upload-text">点击上传头像</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div className="PersonalInformationSettings">
         <Form onSubmit={this.handleSubmit} className="login-form">
            <div style={{overflow:"hidden"}}>

                 <div style={{width:"55%",marginLeft:"10px",float:"left",paddingRight:"2%",borderRight:"1px dashed #ccc"}}>
                    <FormItem
                    {...formItemLayout}
                      label="用户号："
                    >
                       {getFieldDecorator('userName', {
                         rules: [{ required: false, message: 'Please input your username!' }],
                       })(
                         <Input  disabled={this.state.checked}  placeholder="请输入" />
                       )}
                     </FormItem>
                     <FormItem
                     {...formItemLayout}
                       label="真实姓名 ："
                     >
                        {getFieldDecorator('realName', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input disabled={this.state.checked}  placeholder="请输入" />
                        )}
                      </FormItem>

                      <FormItem
                      {...formItemLayout}
                        label="职务等级："
                      >
                         {getFieldDecorator('post', {
                           rules: [{ required: true, message: 'Please input your username!' }],
                         })(
                           <Select disabled={this.state.checked}   placeholder="请选择">
                             {this.state.data[1].map((val,i)=><Option key={i} value={val.vname}>{val.vname}</Option>)}
                          </Select>
                         )}
                       </FormItem>
                       <FormItem
                       {...formItemLayout}
                         label="所属科室："
                       >
                          {getFieldDecorator('deptcode', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                            // initialValue:pageDataTwo.homeSetting?Number(pageDataTwo.homeSetting):1,
                          })(
                            <Select disabled={this.state.checked} placeholder="请选择您所属科室">
                               {this.state.data[2].map((val,i)=>val!=null?(<Option key={i} value={val.deptcode}>{val.deptname}</Option>):'')}
                           </Select>
                          )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                          label="手机号："
                        >
                           {getFieldDecorator('selphoneNum', {
                             rules: [{ required: true, message: 'Please input your username!' },{pattern:/^1[3,5,6,8]{1}\d{9}$/, message: '请输入正确的手机号码!' }],
                           })(
                             <Input disabled={this.state.checked}  placeholder="请输入您的手机号" />
                           )}
                         </FormItem>
                         <FormItem
                         {...formItemLayout}
                           label="座机电话："
                         >
                            {getFieldDecorator('phoneNum', {
                              rules: [{ required: false, message: 'Please input your username!' },{pattern:/^[\d\-]{8,13}$/, message: '请输入正确的座机号码，如：0100-1234567或者68596849!' }],
                            })(
                              <Input disabled={this.state.checked}  placeholder="请输入联系人座机或手机" />
                            )}
                          </FormItem>
                          <FormItem
                          {...formItemLayout}
                            label="联系邮箱："
                          >
                             {getFieldDecorator('Email', {
                               rules: [{ required: false, message: 'Please input your username!' },{pattern:/^[A-Za-z0-9-_.]{1,10}@[a-zA-Z0-9_-]{1,10}[\.\-]{1}[a-zA-Z0-9_-]{1,10}$/, message: '请输入正确的邮箱!'}],
                             })(
                               <Input disabled={this.state.checked}  placeholder="请输入联系邮箱" />
                             )}
                           </FormItem>
                  </div>
                  <div style={{width:"40%",float:"right",height:"400px"}}>
                    <FormItem style={{width:'109px'}}
                      {...formItemLayout}
                      label="">
                      {getFieldDecorator('file')(
                        <AvatarUploader disabled={this.state.checked} {...props}>
                        {imageUrl ? <img style={{ width: '100%',height:'100%' }} src={imageUrl} alt="avatar" /> :(this.state.dataImg?<img style={{ width: '100%',height:'100%' }} src={this.state.dataImg} alt="avatar" />: uploadButton)}
                        </AvatarUploader>
                      )}
                      <AvatarRequest>
                        <RequestTitle disabled={this.state.checked} {...props}>点击头像更换</RequestTitle>
                        <p>头像照片支持png 或 jpg 格式均可，每个头像照片大小限2M</p>
                      </AvatarRequest>
                    </FormItem>
                  </div>
              </div>
            <div className="button" style={{width:"100%",borderTop:"1px solid #ccc",padding:"20px 0 0 10%",display:`${this.state.checked?"none":"block"}`}}>
              <Button htmlType="submit">保存</Button>
              <Button onClick={this.setStatus}>取消</Button>
              {this.state.ifshow
                  ?<Successupdata>
                  <IconOne type='ok'/>
                  保存成功
                </Successupdata>
                :null}
            </div>
         </Form>
      </div>
    )
  }
}
export default Form.create()(PersonalInformationSettings)
const AvatarUploader = styled(Upload)`
  &&& {
    float: left;
  }
  &&& .ant-upload {
    width: 108px;
    height: 108px;
    margin-left: 20px;
    padding: 0;
  }
`;
const AvatarRequest = styled.div`
  float: left;
  width: 129px;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
  padding-left:20px;
`;
const RequestTitle = styled(Upload)`
  &&& .ant-upload {
    width: 108px;
    height: 25px;
    padding: 0;
    border:none;
    background-color:#F2F2F2;
  }
  &&& {
    float: left;
  }
`;
const Successupdata =styled.div`
 display:inline-block;
  width:100px;
  height:20px;
`
const IconOne = styled(Icons)`
  height:20px;
  width:20px;
  margin-top: -2px;
  margin-left: 16px;
`
