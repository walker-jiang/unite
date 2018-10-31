import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function hSelectSearch(Select) {
    const Option = Select.Option;
    let timeout;
    let currentValue;
    return class SelectSearch extends Component {

        state = {
            data: [],
            value: undefined,
        }

        handleSearch = (value) => {
            fetch(value, data => this.setState({ data }));
        }

        handleChange = (value) => {
            this.setState({ value });
        }

        render() {
            const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
            return (
                <Select
                    showSearch
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    style={this.props.style}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                    notFoundContent={null}
                >
                    {options}
                </Select>
            );
        }
    }
}

/*
@作者：杨腊梅
@日期：2018-10-22
@描述：下拉查询选框
*/