import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { is, fromJS } from 'immutable';
import { IndexRoute, browserHistory } from 'react-router';
import '../home/style/homeIndex.less';
import ColItem from '../../component/Form/ColItem';
import unfold from '../home/style/unfold.png'
import { Icon, Row, Col, Button, Input, Select, Form, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class HomeIndex extends Component {
  state = {
  }
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
    return (
      <div className="HomeIndex">
        <div className="HomeIndex_div">
          <Form onSubmit={this.handleSubmit} className="HomeIndex_Form">
            <Row style={{marginTop:20,marginLeft:'-3.8%'}}>
              <Col span={20} style={{textAlign:'left',float:'left'}}>
                <ColItem
                  style = {"6"}
                  LeftColName={"科目名称："}
                  LeftItem = {getFieldDecorator("titlech")(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  )}
                  middleColName = {"科目级别："}
                  middleItem = {getFieldDecorator("asd")(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  )}
                  rightColName={"状态："}
                  rightItem={getFieldDecorator("142")(
                    <Select>
                      <Option value="1">启用</Option>
                      <Option value="2">停用</Option>
                    </Select>
                  )}
                />
              </Col>
              <Col xs={24} sm={24} md={10} lg={3} xl={3} offset={1}>
                <Button type="primary" htmlType="submit">查询</Button>
              </Col>
            </Row>
          </Form>
          {/*<img src={unfold}/>*/}
        </div>
      </div>
    );
  }
}

const HomeIndexIndex = Form.create()(HomeIndex);
export default HomeIndexIndex;
