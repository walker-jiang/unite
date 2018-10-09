import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Icon, Row, Col, Card, Collapse, Radio, Form, Checkbox, Button, Anchor, Modal ,Dropdown, Input, Tabs, Divider, Select   } from 'antd';
const FormItem = Form.Item;
import { browserHistory } from 'react-router';
import '../../containers/searchPage/style/searchPage.less';
import logo from '../../containers/home/style/logo.png';
import logoFont from '../../containers/home/style/logoFont.png';
import line from '../../containers/home/style/line.png';
import ColItem from '../Form/ColItem.js';
import HomeSearch from '../../containers/home/HomeSearch.jsx'
import '../../containers/home/style/home.less';
const Search = Input.Search;

class AdvancedSearch extends React.Component {
  state = {
    DropdownVisible:false,// 高级搜索下拉框
  }
  QueryTable = () =>{
    if(this.props.type == "9"){
      this.props.QueryPageData_judge(this.state.searchValue);
    }else{
      if(typeof(this.props.queryCount) == "function"){
        this.props.queryCount(this.state.searchValue);
      }
      this.props.changeSearchValue(1,10,this.props.type,this.state.searchValue);
    }

  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }
  handleClose = () => {
    this.setState({ visible: false });
  }
  onVisibleChange = (DropdownVisible) =>{
    this.setState({DropdownVisible})
  }
  /** 键盘绑定enter事件**/
  handlerKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.QueryTable()
    }
  }
  render() {
    var { advancedState, DropdownVisible, searchValue } = this.state;
    var { cutId } = this.props;
    const { getFieldDecorator,getFieldProps } = this.props.form;
    return (
      <div>
          <Row className="searchPage-search">
            <Col span={3} style={{marginLeft:30,marginTop:5}}>
              <img src={logo} style={{height:35,width:35}}/><img src={logoFont} style={{height:25,width:75,marginTop:-5,marginLeft:5}}/>
              <div><img src={line} style={{marginLeft:38,marginTop:-35,width:80}}/></div>
            </Col>
            <Col span={16} style={{marginLeft:-30,marginTop:5,float:'left'}}>
              <div className ="home-container" style={{marginTop:0,width:'120%'}}>
                  <Input
                    placeholder="请输入中医知识关键字快速查询"
                    defaultValue={searchValue}
                    onKeyUp={this.handlerKeyUp}
                    addonAfter={
                                  <div>
                                    <Button className="button3" onClick={()=>this.QueryTable()}>搜索</Button>
                                    <Dropdown
                                      visible={DropdownVisible}
                                      onVisibleChange={this.onVisibleChange}
                                      overlay={cutId!="8"?<HomeSearch style={2} onVisibleChange={this.onVisibleChange} cutId ={cutId}/>:<div/>}
                                      trigger={['click']}
                                    >
                                      <a style={{marginLeft:10}}>高级搜索</a>
                                    </Dropdown>
                                  </div>
                                }
                    size="large"
                    style={{width:'58%',height:35}}
                    onChange={e => {
                      console.log("searchValue!!!===========",e.target.value);
                      this.setState({ searchValue:e.target.value })
                    }}
                  />
              </div>
            </Col>
          </Row>

      </div>
    );
  }
}
const FormIndex = Form.create()(AdvancedSearch);
module.exports = FormIndex
