/* ------------------------------------------------------------
    author : fuguolin
    create:2018-01-21
    descreption:表单行提取
    ------------------------------------------------------------ */
import React,{ Component } from 'react'
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class FormDemo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="选择框"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: '请选择' },
            ],
          })(
            <Select placeholder="请选择">
              <Option value="china">选择 1</Option>
              <Option value="use">选择 2</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="多选下拉框"
        >
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: '请选择', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="请选择">
              <Option value="red">选择 1</Option>
              <Option value="green">选择 2</Option>
              <Option value="blue">选择 3</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="数字选择器"
        >
          {getFieldDecorator('input-number', { initialValue: 3 })(
            <InputNumber min={1} max={10} />
          )}
          <span className="ant-form-text"> 单位</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="开关"
        >
          {getFieldDecorator('switch', { valuePropName: 'checked' })(
            <Switch />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="滑动选择"
        >
          {getFieldDecorator('slider')(
            <Slider marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="单选框"
        >
          {getFieldDecorator('radio-group')(
            <RadioGroup>
              <Radio value="a">选择 1</Radio>
              <Radio value="b">选择 2</Radio>
              <Radio value="c">选择 3</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="单选框"
        >
          {getFieldDecorator('radio-button')(
            <RadioGroup>
              <RadioButton value="a">选择 1</RadioButton>
              <RadioButton value="b">选择 2</RadioButton>
              <RadioButton value="c">选择 2</RadioButton>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="评分"
        >
          {getFieldDecorator('rate', {
            initialValue: 3.5,
          })(
            <Rate />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="上传文件"
        >
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或者拖拽</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">提交表单</Button>
        </FormItem>
      </Form>
    );
  }
}
const WrappedDemo = Form.create()(FormDemo);
module.exports = WrappedDemo
