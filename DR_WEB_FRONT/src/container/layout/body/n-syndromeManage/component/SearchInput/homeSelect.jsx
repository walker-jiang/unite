/* ------------------------------------------------------------
    患者姓名/病历号/所在单位/联系电话
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Select, Form,Input  } from 'antd';
const FormItem = Form.Item;
import { browserHistory } from 'react-router';
import './style/SearchInput.less'
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import FirstReportService from '../../services/FirstReportService';
const Option = Select.Option;

let timeout;
let currentValue;


class HomeSelect extends React.Component {
  state = {

  }
  handleChange = (value) => {
    console.log("5555555555555",value);
    // let countryOptions = [];
    // if (value =="" ) {
    //   countryOptions = this.props.Options;
    // } else {
    //   this.props.Options.forEach((item,index)=>{
    //     if(item.value.indexOf(value)>=0){
    //       countryOptions.push(item);
    //     }
    //   })
    // }
    //
    // this.setState({ countryOptions });
  }
  render() {
    var { Options } = this.state;
    const { getFieldDecorator,getFieldProps } = this.props.form;
    const option = this.props.data.map(d => <Option key={d.key}>{d.value}</Option>);
    return (
      <div>
        <FormItem style={this.props.style}>
        {getFieldDecorator(this.props.itemKey,this.props.rules) (
        <Select allowClear={this.props.allowClear} onChange={this.handleChange} getPopupContainer={() => document.querySelector("#"+this.props.documentId)}>
            {option}
        </Select>
        )}
        </FormItem>
        <FormItem style={this.props.styleTow}>
        {getFieldDecorator(this.props.itemKeyTow,this.props.rulesTow) (
          <Input placeholder="请输入" />
        )}
        </FormItem>
      </div>

    );
  }
}

module.exports = HomeSelect
