
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Icon, Row, Col, Card, Collapse, Radio, Form, Checkbox, Button, Anchor, Modal ,Message, Input, Tabs, Divider, Select   } from 'antd';
const FormItem = Form.Item;
import { browserHistory } from 'react-router';
import './style/SearchInput.less';
import logo from '../../containers/home/style/logo.png';
import logoFont from '../../containers/home/style/logoFont.png';
import line from '../../containers/home/style/line.png';
import ColItem from '../Form/ColItem.js';
const Search = Input.Search;

class AdvancedSearch extends React.Component {

  render() {
    const { getFieldDecorator,getFieldProps } = this.props.form;
    return (
      <div>
          <Row className="searchPage-search-small">
            <Col span={3} style={{marginLeft:20}}>
              <img src={logo} style={{height:35,width:35}}/><img src={logoFont} style={{height:25,width:75,marginTop:-5,marginLeft:5}}/>
              <div><img src={line} style={{marginLeft:38,marginTop:-35}}/></div>
            </Col>
            <Col span={16}>
              <Search
                placeholder="请输入中医知识关键字快速查询"
                style={{width:'85%',height:35}}
                enterButton="搜索"
                onSearch={
                  value => {
                    console.log(value);
                    var params = JSON.stringify({searchType:1,searchValue:value,type:1});
                    console.log("params========",params);
                    $history.push("/SearchPage/"+params);
                  }
                }
              />
            </Col>
          </Row>
      </div>
    );
  }
}
const FormIndex = Form.create()(AdvancedSearch);
module.exports = FormIndex
