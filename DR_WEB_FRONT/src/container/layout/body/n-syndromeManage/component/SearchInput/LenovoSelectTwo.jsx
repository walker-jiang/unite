/* ------------------------------------------------------------
    author : fuguolin
    create:2018-01-21
    descreption:联想框
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Select, Form } from 'antd';
const FormItem = Form.Item;
import { browserHistory } from 'react-router';
import './style/SearchInput.less'
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import FirstReportService from '../../services/FirstReportService';
const Option = Select.Option;

let timeout;
let currentValue;


class LenovoSelect extends React.Component {
  constructor(props) {
  	super(props);
  }
  state = {
    data: this.props.data,
    value: this.props.value,
  }
  fetch = (value, callback) => {
      console.log("this.props.tableType",this.props.tableType);
      var tableType = this.props.tableType
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      currentValue = value;
      var self = this
      function fake() {
          const str = querystring.encode({
          code: 'utf-8',
          q: value,
          });
          var d = FirstReportService.FirstReportSelectRealTime({tableType:tableType,value:value});
          console.log("ddddddddddddddd",d);
          if (currentValue === value) {
            const data = [];
            d.forEach((r) => {
              data.push({
                value:r.id,
                text: r.name,
              });
            });
            console.log("datadatadatadata",data);
            callback(data);
          }
      }
      timeout = setTimeout(fake, 300);
  }
  handleChange = (value) => {
    console.log("value#####",value);
    this.setState({ value });
    if(value.replace(/\s+/g,"") != ""){
      this.fetch(value, data => this.setState({ data }));
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const options = this.state.data.map(d => <Option key={d.text}>{d.text}</Option>);
    var message=""
    return (
      <FormItem>
        {this.props.itemName}
        {
          getFieldDecorator(this.props.itemKey,{
            rules: [
              {required: this.props.required,message: "请填写药品通用名称" },
              { max:this.props.maxLength,message:"不良反应名称最多"+this.props.maxLength+"个字"}
            ],
          })(
            <Select
              mode="combobox"
              value={this.state.value}
              placeholder={this.props.placeholder}
              style={this.props.style}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onChange={this.handleChange}
            >
              {options}
            </Select>
          )
        }
      </FormItem>
    );
  }
}

module.exports = LenovoSelect
