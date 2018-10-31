import React, { Component } from 'react';
import { Modal, Button, Input, Select } from 'antd';

const Option = Select.Option;

class ClassifyModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: undefined, //上级分类
      data: [],
      classifyParentData: {}, //选中的实体类
      classifyName: '', //分类名称，受控组件
    }
  }

  handleSearch = (value) => {
    const _value = String(value);
    const _len = _value.length;
    if (_len < 3) {
      return;
    }
    const { getDataFun, getDataParam } = this.props;
    const _param = Object.assign({}, getDataParam, { keyword: value });
    if (getDataFun) {
      getDataFun(_param).then((data) => {
        if (data['result']) {
          this.setState({ data: data.data });
        } else {
          console.log("getDataFun请求错误")
        }
      });
    }
  }

  //select中的值改变时
  handleChange = (value) => {
    this.setState({ value });
  }

  //select中值被选中时
  handleSelect = (value, option) => {
    this.setState({value: value, classifyParentData: option.props['refdata']});
  }

  //将分类名称变成受控组件
  handleUsernameChange = (e) => {
    this.setState({ classifyName: e.target.value })
  }

  //处理保存任务
  handleOnClick = () => {
    const { onOk } = this.props.modalProps;
    const { value, classifyParentData, classifyName } = this.state;
    if(onOk) {
      onOk(value, classifyParentData, classifyName);
    }
  }

  render() {
    const { value, data, classifyName } = this.state;
    const { modalProps } = this.props;
    const { onCancel, loading, onOk } = modalProps;
    return (
      <Modal {...modalProps} maskClosable={false} footer={[
        <Button key="取消" onClick={onCancel}>返回</Button>,
        <Button key="提交" type="primary" loading={loading} onClick={this.handleOnClick}>保存</Button>]} >
        <Select
          showSearch
          value={this.state.value}
          placeholder={'输入医嘱模板名称'}
          style={{ width: '100%' }}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          notFoundContent={null}>
          {this.state.data.map((item) => {
            return <Option key={item.temmanageid} refdata={item}>{item.temname}</Option>
          })}
        </Select>
        <Input placeholder="分类名称" value={classifyName} onChange={this.handleUsernameChange}/>
      </Modal>
    )
  }
}

export default ClassifyModal