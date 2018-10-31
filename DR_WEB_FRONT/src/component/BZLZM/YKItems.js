import React, { Component } from 'react';
import { Input, Radio, Collapse, List, Checkbox, Table, Card } from 'antd';

const RadioGroup = Radio.Group;
const Search = Input.Search;
const Panel = Collapse.Panel;

class YKItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            radioValue: this.props.radioValue,
            checkedIndex: '-1'
        }
    }

    onRadioGroupChange = (e) => {
        this.setState({ radioValue: e.target.value, });
    }

    onSearchButtonClick = (value) => {
        const { freshLists } = this.props;
        //数据格式
        const data = {type: this.state.radioValue, keyword: value};
        //执行刷新列表
        freshLists(data);
    }

    rowKey = (record) => {
        const { keyName } = this.props;
        return record[keyName];
    }

    render() {
        const { title, searchText, isMatch, check, tableData } = this.props;
        const rowSelection =  {
            type: 'radio',
            onChange: check
        }

        return (
            <div>
                <Card>
                    <div>{title}</div>
                    <RadioGroup onChange={this.onRadioGroupChange} value={this.state.radioValue}>
                        <Radio value={0}>全部</Radio>
                        <Radio value={1}>已匹配</Radio>
                        <Radio value={2}>未匹配</Radio>
                    </RadioGroup>
                    <Search
                        placeholder={ searchText }
                        onSearch={ this.onSearchButtonClick }
                        enterButton="查询"
                        style={{ width: '50%' }}/>
                </Card>
                <Card>
                    {!isMatch && <Table rowSelection={rowSelection} rowKey={this.rowKey} {...tableData} />}
                    {isMatch && <Table rowKey={this.rowKey}  {...tableData} />}
                </Card>
            </div>
        )
    }
}

export default YKItems