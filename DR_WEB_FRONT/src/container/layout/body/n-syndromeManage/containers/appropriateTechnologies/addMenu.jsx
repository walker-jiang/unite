import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { is, fromJS } from 'immutable';
import { IndexRoute, browserHistory } from 'react-router';
import './style/homeIndex.less';
import ColItem from '../../component/Form/ColItem';
import BasicTable from '../../component/Table/TableBasic';
import unfold from './style/unfold.png'
import QueueAnim from 'rc-queue-anim';//动态组件
import $ from 'jquery';
import { Icon, Row, Col, Button, Input, Select, Form, Table, Divider, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddMenu extends Component {
  /**
   * 提交表单
   * @method handleSearch
   * @param  {[type]}     e [表单数据项]
   */
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 16 } };
    return (
      <div className="HomeIndex">
          <Form onSubmit={this.handleSubmit} className="HomeIndex_Form" style={{marginTop:10}}>
            <FormItem {...formItemLayout} label={"科目名称："}  >
              {getFieldDecorator("titlech")(
                <Input placeholder="请科目名称" style={{width:'60%'}}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"科目级别："}  >
              {getFieldDecorator("titlech2")(
                <Select style={{width:'60%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"所属科目："}  >
              {getFieldDecorator("titlech3")(
                <Select style={{width:'60%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"状态："}  >
              {getFieldDecorator("titlech4")(
                <Select style={{width:'60%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"备注："}  >
              {getFieldDecorator("titlech5")(
                <TextArea rows={4} />
              )}
            </FormItem>
            <FormItem>
              <center style={{marginBottom:20}}>
                <Button type="primary" htmlType="submit">提交</Button>
                <Button className="button" style={{ marginLeft: 10,height:28 }}>返回</Button>
              </center>
            </FormItem>
          </Form>
      </div>
    );
  }
}

const AddMenuIndex = Form.create()(AddMenu);
export default AddMenuIndex;
