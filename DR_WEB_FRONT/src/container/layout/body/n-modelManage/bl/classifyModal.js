import React, { Component } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import YSelectSearch from '../YSelectSearch.js';
import { enums } from 'utils';

const { CHECK, EDIT,  CREATE,  DELETE} = enums;
const FormItem = Form.Item;
const formItemLayout = {
    wrapperCol: { span: 24 },
};

class Classify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cState: '', //check, edit, create
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onOk } = this.props.modalProps;
        const { initialData } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(onOk) { onOk(values); }
            } else {
                console.log("出错了");
                return;
            }
        });
    }

    renderForm = () => {
        const { getFieldDecorator } = this.props.form;
        const { getDataFun, getDataParam, initialData, selectItemObj, mType } = this.props;
        let parentidInitialValue = {};
        if('parentid' in selectItemObj) {
            parentidInitialValue = {value: initialData? initialData['parentid']: "", item: [selectItemObj]}
        } else {
            parentidInitialValue = {value: "", item: []};
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem >
                    {getFieldDecorator('parentid', {
                        initialValue: parentidInitialValue,
                        rules: [{
                            required: true,
                            message: '请输入分类',
                        }],
                    })( <YSelectSearch
                            allowClear={true}
                            placeholder="模板分类"
                            style={{ 'width': '100%' }}
                            remoteService={getDataFun}
                            paramData={getDataParam}
                            fieldKey='temmanageid'
                            fieldName='temname' /> )}
                </FormItem>
                <FormItem >
                    {getFieldDecorator('temname', {
                        initialValue: initialData? initialData['temname']: "",
                        rules: [{
                            required: true,
                            message: '请输入分类名称',
                        }],
                    })( <Input placeholder="分类名称" /> )}
                </FormItem>
            </Form>
        );
    }

    render() {
        const { modalProps, mType } = this.props;
        const { onCancel, loading } = modalProps;
        const footer = (mType == CHECK)? 
            [<Button key="取消" onClick={onCancel}>返回</Button>]:
            [<Button key="取消" onClick={onCancel}>返回</Button>,
                <Button key="提交" type="primary" loading={loading} onClick={this.handleSubmit}>保存</Button>]
        return (
            <Modal {...modalProps} maskClosable={false} footer={footer} >
                {this.renderForm()}
            </Modal>
        )
    }
}

const ClassifyModal = Form.create()(Classify);
export default ClassifyModal