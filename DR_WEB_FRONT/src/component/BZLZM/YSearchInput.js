import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;

class YSearchInput extends Component {

    static propTypes = {
        allowClear: PropTypes.bool, //是否允许删除
        fieldKey: PropTypes.string.isRequired,  //需要记录的key值名称
        fieldName: PropTypes.string.isRequired,    //需要显示的名称

        /**
         * 提供两个参数
         * main select中会回传fieldKey对应的值
         * detail fieldKey对应的整条记录
         */
        onChange: PropTypes.func,   //onChange方法，提供给外部的数据 
        placeholder: PropTypes.string,  //提示项
        style: PropTypes.object,
        searchLength: PropTypes.number, //开始检索的长度 默认
        remoteService: PropTypes.func,  //检索的远程请求 需要返回一个promise
        //value: PropTypes.objectOf() //之后修改来完成
    };

    static defaultProps = {
        placeholder: '请输入',
        style: { width: 200 },
        searchLength: 3,
        remoteService: () => { console.log('**********没有传入自定义请求方法************') },   //默认提示
    };

    constructor(props) {
        super(props)
        this.state = {
            data: this.props['value']['item'],
            value: this.props['value']['value'],
            selectedData: {}, //被选中的数据  
        }
    }

    handleSearch = (value) => {
        const { remoteService, paramData, searchLength } = this.props;
        const _value = String(value);
        const _len = _value.length;
        if (_len < searchLength) {
            return;
        }
        const _param = Object.assign({data: {"keyword": value}}, paramData);
        remoteService(_param, (data) => {
            if (data['result']) {
                this.setState({ data: data.data });
            } else {
                console.log("getDataFun请求错误")
            }
        });
    }

    handleChange = (value) => {
        this.setState({ value });
    }

    //select中值被选中时
    handleSelect = (value, option) => {
        const { onChange } = this.props;
        this.setState({ value: value, selectedData: option.props['customdata'] });
        if (onChange) {
            onChange({ value: value, item: option.props['customdata'] })
        }
    }

    render() {
        const { placeholder, style, fieldKey, fieldName, allowClear } = this.props;
        const { value, data } = this.state;
        return (
            <OrgSelect
                showSearch
                allowClear={allowClear ? allowClear : false}
                value={value}
                placeholder={placeholder}
                style={style}
                filterOption={false}
                onSearch={this.handleSearch}
                onSelect={this.handleSelect}
                onChange={this.handleChange}
                notFoundContent={null}
            >
                {data.map((item) => {
                    return <Option key={item[fieldKey]} customdata={item}>{item[fieldName]}</Option>
                })}
            </OrgSelect>
        );
    }
}
const OrgSelect = styled(Select)`
    .ant-select-selection--single {
        width: 264px;
        height: 34px;
        position: relative;
        cursor: pointer;
        border-radius: 0px;
    };
    .ant-select-selection__rendered {
        display: block;
        margin-left: 48px;
        margin-right: 23px;
        position: relative;
        line-height: 30px;
    }
`;
export default YSearchInput;

/**
 * 1 select中的allowClear需要onChange的支持，如果没有onChange方法，allowClear无用
 * 2 filterOption必须
 * 3 这个是改造成为与getResource方法配合使用的远程请求查询下拉框，支持get请求
 */