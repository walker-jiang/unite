import React, { Component } from 'react';

export default function hTag(Tag) {
    return class HTag extends Component {
        
        constructor(props) {
            super(props)
        }

        //代理关闭后的方法，是的Tag组件可以与数据关联
        onClose = (e) => {
            const { data, onClose } = this.props;
            onClose(e, data);
        }

        render() {
            return (<Tag {...this.props} onClose={this.onClose} className={"ant-tag-blue"}></Tag>)
        }
    }
}