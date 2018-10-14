import React, {Component} from 'react';
import { Form,Collapse,Input,Button,Select,Upload, Icon, message,Modal  } from 'antd';
import "./style.less";
import Ajax from 'commonFunc/ajaxGetResource';
// import Ajax from '../../../rightAssistBar/service/xhr/index';
import styled from 'styled-components';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
//上传图片
function getBase64(img, callback) {
  console.log('img, callback',img.name);
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class PersonalInformationSettings extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        checked:true,
        loading: false,
        deptData:[],
        dictListObj:[],
        Img:''
      };
  }

  componentDidMount(){
    this.getDictList(['post']);
    this.getDept();
    //个人信息后台数据回显
    console.log('propprop',this.props.prop);
    let data=this.props.prop//父组件请求得到数据
    this.props.form.setFieldsValue({
      "userName":data.orgUserno,
      "realName":data.realname,
      "post":data.post == 1?'普通医生':(data.post == 2?'专家医生':''),
      "deptid":data.deptid == 2?'检验科':(data.deptid == 3?'检查科':(data.deptid == 4?'检查科':'')),
      "selphoneNum":data.mobile,
      "phoneNum":data.phone,
      "Email":data.email
    })
  }

  //完成头像缩放函数
  //ImgD:要放图片的img元素，onload时传参可用this
  //h:img元素的高度，像素
  //w:img元素的宽度，像素
  // autosize2=(ImgD,h,w)=>{
  //   var image=new Image();
  //   image.src=ImgD.src;
  //   if (image.width<w && image.height<h){
  //     ImgD.width=image.width;
  //     ImgD.height=image.height;
  //   }else{
  //     if (w / h <= image.width / image.height){
  //       ImgD.width=w;
  //       ImgD.height=w * (image.height / image.width);
  //     }else{
  //       ImgD.width=h * (image.width / image.height);
  //       ImgD.height=h;
  //     }
  //   }
  // }
  //上传图片
  handleChange = (info) => {
    console.log('infoinfo',info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  changeImg=(e)=>{
    console.log('this.state.Img',this.state.Img);
    this.props.handleClick(this.state.Img)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('err, valueserr, values',err, values);
      if (!err) {
        console.log('Received values of form: ', values);
        let userId = window.sessionStorage.getItem('userid');
        let params = {
          url: 'BaOrguserController/getData',
          type: 'post',
          data: userId
        }
        let that = this;
        function success(res) {
          console.log('更新照片resres',res);
          // that.handleClick();
        };
        Ajax(params, success);
      }
    });
  }
  // handleClick (pram) {
  //   this.setState({
  //     status: pram
  //   });
  // }
  isModify=()=>{
    this.setState({checked:false})
  }

  /**
   * [getDictList 获取字典列表]
   * @param  {[type]} DictTypeList [字典项数组]
   * @return {[type]}              [undefined]
   */
  getDictList(DictTypeList){
    let self = this;
    let params = {
      url: 'BaDatadictController/getListData',
      data: {
        dictNoList: DictTypeList
      },
    };
    function callBack(res){
      console.log('resresres2323232',res);
      if(res.result){
        // let dictListObj = {};
        let dictListObj = [];
        res.data.forEach(item => {
          // dictListObj[item.dictno.toLowerCase()] = item.baDatadictDetailList;
          dictListObj=item.baDatadictDetailList;
        });
        self.setState({dictListObj:dictListObj});
      }else{
        console.log('异常响应信息', res);
      }
    };
    Ajax(params, callBack);
  };
  //http://219.234.5.58:8087/swagger-ui.html#/

  /** [getDept 科室数据] */
  getDept=()=> {
    let params = {
      url: 'BaDepartmentController/getList',
      server_url: 'http://219.234.5.58:8086/',
      data: {
        orgid: window.sessionStorage.getItem('orgid')
      }
    };
    let that = this;
    function success(res) {
      // console.log('科室数据:',res);
      if(res.result){
        let deptData = res.data;
        that.setState({ deptData:deptData }, () => {
          that.getDocData(deptData[0].deptid,deptData[0].deptname);
        })
      }
    };
    Ajax(params, success);
  }
  getDocData=(deptid,deptname)=>{
    console.log('deptDatadeptData',this.state.deptData,this.state.dictListObj);
    //个人信息设置数据回显
    // let data=this.props.prop//父组件请求得到数据
    // this.props.form.setFieldsValue({
    //   "userName":data.orgUserno,
    //   "realName":data.realname,
    //   "post":data.post == 1?'普通医生':'二级甲等',
    //   "deptid":data.deptid == deptid?deptname:'精神科',
    //   "selphoneNum":data.mobile,
    //   "phoneNum":data.phone,
    //   "Email":data.email
    // })
  }
  //修改个人信息调用事件
  handleSubmit=(e)=>{
    e.preventDefault()
    e.stopPropagation()
    console.log("e111111",window.sessionStorage.getItem('userid'));
    this.props.form.validateFields((err, values)=>{
      console.log('valuesvalues',values,err);//8086/BaOrguserController/putData
      var date = {
        "orgUserno":values.userName,//用户号
        "realname": values.realName,//真姓名
        "deptid":values.deptid == '检查科'?3:0,//所属科室
        "post": values.post == '普通医生'?1:0,  //职务等级
        "mobile": values.selphoneNum,//手机号
        "phone": values.phoneNum,//座机号
        "email": values.Email,//邮箱
        "orgUerid":window.sessionStorage.getItem('userid')
      }
      console.log('datedate111',date);
      let params = {
        url: 'BaOrguserController/putData',
        type: 'put',
        data: JSON.stringify(date),
        server_url:'http://219.234.5.58:8086/'
      }
      let that = this;
      function success(res) {
        console.log('resres11111',res);
        if(res.result){
          window.modal = Modal.success({
            title: '修改个人信息成功！',
            onOk: ()=>{
              window.modal = null
            }
          });
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

    // var date = {
    //   newPassword:'',
    //   orgUerid:window.sessionStorage.getItem('userid'),
    //   password:''
    // }
    // var res = Ajax.postAddUrl(config_service_url,date);


  }


  render() {
          const leval = [{

          }]
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
         const props = {
           action: config_service_url + 'BaUploadController/upload',
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
             this_.setState({Img:file.name})

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
                          rules: [{ required: false, message: 'Please input your username!' }],
                        })(
                          <Input disabled={this.state.checked}  placeholder="请输入" />
                        )}
                      </FormItem>

                      <FormItem
                      {...formItemLayout}
                        label="职务等级："
                      >
                         {getFieldDecorator('post', {
                           rules: [{ required: false, message: 'Please input your username!' }],
                         })(
                           <Select disabled={this.state.checked}   placeholder="请选择">
                             {this.state.dictListObj.map((val,i)=><Option key={i} value={val.vname}>{val.vname}</Option>)}
                          </Select>
                         )}
                       </FormItem>
                       <FormItem
                       {...formItemLayout}
                         label="所属科室："
                       >
                          {getFieldDecorator('deptid', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                          })(
                            <Select disabled={this.state.checked} defaultValue="" placeholder="请选择您所属科室">
                               {this.state.deptData.map((val,i)=><Option key={i} value={val.deptname}>{val.deptname}</Option>)}
                           </Select>
                          )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                          label="手机号："
                        >
                           {getFieldDecorator('selphoneNum', {
                             rules: [{ required: false, message: 'Please input your username!' },{pattern:/^1[3,5,6,8]{1}\d{9}$/, message: '请输入正确的手机号码!' }],
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
                      {getFieldDecorator('file', {
                        rules: [{
                          required: false,
                        }],
                      })(
                        <AvatarUploader {...props}>
                        {imageUrl ? <img style={{ width: '100%',height:'100%' }} src={imageUrl} alt="avatar" /> : uploadButton}
                        </AvatarUploader>
                      )}
                      <AvatarRequest>
                        <RequestTitle htmlType="submit" onClick={this.changeImg}>更换头像</RequestTitle>
                        <p>头像照片支持png 或 jpg 格式均可，每个头像照片大小限2M</p>
                      </AvatarRequest>
                    </FormItem>
                  </div>
              </div>
            <div className="button" style={{width:"100%",borderTop:"1px solid #ccc",padding:"20px 0 0 10%",display:`${this.state.checked?"none":"block"}`}}>
              <Button htmlType="submit">保存</Button>
              <Button>取消</Button>
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
const RequestTitle = styled.div`
  color: #333333;
  line-height: 25px;
  text-align:center;
  background-color:#F2F2F2;
  cursor:pointer;
`;
