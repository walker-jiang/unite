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


class QuickSelect extends React.Component {
  state = {
    Options:this.props.Options
  }
  HandleChange = (value) => {
    let countryOptions = [];
    if (value =="" ) {
      countryOptions = this.props.Options;
    } else {
      this.props.Options.forEach((item,index)=>{
        if(item.value.indexOf(value)>=0){
          countryOptions.push(item);
        }
      })
    }

    this.setState({ countryOptions });
  }
  render() {
    var { Options } = this.state;
    const { getFieldDecorator } = this.props.form;
    const option = Options.map(d => <Option key={d.value}>{d.value}</Option>);
    return (
      <FormItem>
      {getFieldDecorator(this.props.itemKey,this.props.rules) (
        <Select
          showSearch
          style={this.props.style}
          mode="combobox"
          optionFilterProp="children"
          showArrow={true}
          onChange={this.HandleChange}
          getPopupContainer={() => document.querySelector("#"+this.props.itemKey)}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          placeholder="请选择"
        >
          {option}
        </Select>
      )}
      </FormItem>
    );
  }
}

module.exports = QuickSelect
