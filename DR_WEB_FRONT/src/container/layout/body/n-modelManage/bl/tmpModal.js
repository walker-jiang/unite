import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';

const Search = Input.Search;

class TmpModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { modalProps } = this.props;
    const { onCancel, loading, onOk } = modalProps;
    return (
      <Modal {...modalProps} maskClosable={false} footer={[
        <Button key="取消" onClick={onCancel}>Return</Button>,
        <Button key="提交" type="primary" loading={loading} onClick={onOk}>Submit</Button>]} >
        医嘱模板
      </Modal>
    )
  }
}

export default TmpModal