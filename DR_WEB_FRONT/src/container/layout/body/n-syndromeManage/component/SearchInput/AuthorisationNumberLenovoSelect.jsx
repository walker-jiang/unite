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
// import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import FirstReportService from '../../services/FirstReportService';
const Option = Select.Option;

let timeout;
let currentValue;


class LenovoSelect extends React.Component {
  state = {
    data: this.props.data,
    value: this.props.value,
  }
  fetch = (value, callback) => {
      var tableType = this.props.tableType
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      currentValue = value;

      function fake() {
          const str = querystring.encode({
          code: 'utf-8',
          q: value,
          });
          var d = FirstReportService.AppNoSelectRealTime({tableType:tableType,value:value});
          if (currentValue === value) {
            const data = [];
            d.forEach((r) => {
              data.push({
                value:r,
                text: r,
              });
            });
            callback(data);
          }
      }
      timeout = setTimeout(fake, 300);
  }
  handleChange = (value) => {
    this.setState({ value });
    if(value.substr(0,4) == "国药准字"){
      this.fetch(value, data => this.setState({ data }));
    }
  }
  onSelect = (value) => {
    console.log("11111111111111",value);
    //根据国药准字带出其他数据
    var returnValue = FirstReportService.GetDrugByAuNum({auNum:value});
    console.log("returnValue",returnValue);
    this.props.valuation(returnValue);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <FormItem>
      {this.props.itemName}
      {
        getFieldDecorator(this.props.itemKey,{
          rules: [
            { max:this.props.maxLength,message: this.props.message },
          ],
        })(
          <Select
            mode="combobox"
            placeholder={this.props.placeholder}
            notFoundContent = {"未联想到数据"}
            style={this.props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onChange={this.handleChange}
            getPopupContainer={() => document.querySelector("#"+this.props.itemKey)}
            onSelect = {this.onSelect}
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
