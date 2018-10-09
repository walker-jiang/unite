/* ------------------------------------------------------------
    author : fuguolin
    create:2018-01-15
    descreption:人员添加
    ------------------------------------------------------------ */
import React,{ Component } from 'react'
import { Row, Col,Menu, Icon,Table, Button,Input,Form,DatePicker,Radio,Select,Card,Popconfirm  } from 'antd';
import Data from '../../component/Data';
import QueueAnim from 'rc-queue-anim';
import { browserHistory,Link } from 'react-router';
import ColItem from '../../component/Form/ColItem';
import styles from './style/user.less';
const FormItem = Form.Item;
const createForm = Form.create;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class RootAdd extends React.Component {
  // 提交表单
  handleSubmit = (e) => {
    const self = this;
    let values;
    e.preventDefault();
    self.props.form.validateFieldsAndScroll((errors, fieldsValue) => {
      console.log("表单验证errors {}",errors);
      console.log("表单验证fieldsValue {}",fieldsValue);
      if(errors){
        global.$publicMethod.Hint("提示",'info',"请填写表单必填项");
        return;
      }
      let params = {...fieldsValue};
      //UserSeivice.AddUser(params);
    });
  };
	render = () => {
    const self = this;
    const { getFieldDecorator } = this.props.form;
		return (
      <div className="UserAdd-div">
          <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
              <QueueAnim delay={0} className="queue-simple" type={['right', 'left']}>
              <div key="a">
                <Card key="first" className="RootAdd-Card1" title="请填写基本信息">
                  <ColItem
                    LeftColName={"用户名"}
                    LeftItem={getFieldDecorator('usersName')
                    (<Input placeholder="请填写用户名" required/>)}
                  />
                  <ColItem
                    LeftColName={"真实姓名"}
                    LeftItem={getFieldDecorator('alias')
                    (<Input placeholder="请填写真实姓名" required/>)}
                  />
                  <ColItem
                    LeftColName={"密码"}
                    LeftItem={getFieldDecorator('usersPassword')(<Input placeholder="请填写密码" required />)}
                  />
                  <ColItem
                    LeftColName={"所属领域"}
                    LeftItem={ getFieldDecorator('usersArea')(
                    <Select placeholder="请选择所属领域" required>
                      {Data.AreaList}
                    </Select>)}
                  />
                  <ColItem
                    LeftColName={"权限等级"}
                    LeftItem={ getFieldDecorator('usersLevel')(
                    <Select placeholder="请选择权限等级" required>
                      {Data.permissionLevel}
                    </Select>)}
                  />
                  <Row>
                    <Col offset={18} xs={24} sm={24} md={16} lg={8} xl={6}>
                      <Button type="primary" className="UserAdd-button" htmlType="submit">提交</Button>
                      <Button className="UserAdd-button" onClick={() =>{ self.props.form.resetFields() }}>清除</Button>
                      <Button className="UserAdd-button" onClick={()=>{ browserHistory.push("/User") }}>返回</Button>
                    </Col>
                  </Row>
                </Card>
              </div>
              </QueueAnim>
          </Form>
			</div>
		);
		}
	}
RootAdd = createForm()(RootAdd);
export default RootAdd;
