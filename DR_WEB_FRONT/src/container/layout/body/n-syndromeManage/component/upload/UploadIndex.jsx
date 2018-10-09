/* ------------------------------------------------------------
    author : fuguolin
    create:2018-04-11
    descreption:内嵌table
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Upload, Icon, message } from 'antd';
import { browserHistory } from 'react-router';
const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class UploadIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">点击或者拖拽上传附件</p>
        <p className="ant-upload-hint">支持单个上传或者多个文件上传</p>
      </Dragger>
    );
  }
}

export default UploadIndex;
