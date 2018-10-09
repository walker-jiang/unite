import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Row, Col, Modal, Button, Card, Input, Form, Select } from 'antd';
import CheckboxIndex from '../Checkbox/CheckboxIndex';
import TreeIndex from '../Tree/TreeIndex';
import TableBasic from '../Table/TableBasic';
import ColItem from '../Form/ColItem';
import './style/Modal.less';
const Option = Select.Option;
const FormItem = Form.Item;

class ModalAndTable extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 14 } };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>弹框</Button>
        <Modal
          title="medADR编码库"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          width = {650}
        >
          <Form form={this.props.form} onSubmit={this.handleSubmit}>
                <div key="a">
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                      <FormItem {...formItemLayout} label={"下拉框"} >
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>Disabled</Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                      <FormItem {...formItemLayout} label={"输入框"} >
                        <Input placeholder="请输入" required/>
                      </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                      <Button type="primary" style={{marginTop:4}} htmlType="submit">提交</Button>
                    </Col>
                  </Row>
                </div>
          </Form>
          <br/>
          <TableBasic/>

        </Modal>
      </div>
    );
  }
}
const ModalAndTableIndex = Form.create()(ModalAndTable);
export default ModalAndTableIndex;
