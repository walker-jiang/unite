/* ------------------------------------------------------------
    author : fuguolin
    create:2018-01-21
    descreption:联想框
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Table, Icon, Switch, Radio, Form, Divider,Badge,AutoComplete, Button, Input, Select } from 'antd';
import { browserHistory } from 'react-router';
import './style/SearchInput.less'
const { Option, OptGroup } = Select;

function onSelect(value) {
  console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  var array = [{
    key:"1",
    name:"主索引领域",
    query:`${query}`,
  },{
    key:"2",
    name:"健康卡领域",
    query:`${query}`,
  },{
    key:"3",
    name:"分级诊疗领域",
    query:`${query}`,
  }]
  return array;
}

function renderOption(item) {
  return (
    <OptGroup key={item.key} label={<div style={{fontSize:16,fontWeight:600}}>{item.name}</div>}>
      <Option value={`${item.key}1`}>{`${item.query}1`}</Option>
      <Option value={`${item.key}2`}>{`${item.query}2`}</Option>
    </OptGroup>
  );
}

class Complete extends React.Component {
  state = {
    dataSource: [],
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: value ? searchResult(value) : [],
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '100%',width:400 }}
          dataSource={dataSource.map(renderOption)}
          onSelect={onSelect}
          onSearch={this.handleSearch}
          placeholder="请输入要搜索的内容"
          optionLabelProp="text"
        >
          <Input
            suffix={(
              <Button className="search-btn" size="large" type="primary">
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </div>
    );
  }
}
module.exports = Complete
