import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Modal, Button, Card, Input } from 'antd';
import CheckboxIndex from '../Checkbox/CheckboxIndex';
import TreeIndex from '../Tree/TreeIndex';


import './style/Modal.less';
class LocalizedModal extends React.Component {
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
        >
          <CheckboxIndex/><br/>
          <Input placeholder="Basic usage" />
          <Card style={{marginTop:10}}><TreeIndex/></Card>
        </Modal>
      </div>
    );
  }
}
export default LocalizedModal;
