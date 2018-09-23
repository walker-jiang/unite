import React, { Component } from 'react';
import styled from 'styled-components';
import { Tabs, Table, Menu, Dropdown, Icon, Row, Col, Button } from 'antd';
import BasePop from 'components/popout/basePop';
import buttonSty from 'components/antd/style/button';
import PreviewPrint from './previewPrint/index.js'

export default class AdvicePrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiblePop: false,  // 控制弹框显示隐藏
            dataSource: this.props.selectedRows,
        };
    }

    getData () {
        console.log('this.props.selectedRows',this.props.selectedRows)
        let dataSource = this.props.selectedRows.map((item, index)=>{
            item.key = index; // 加唯一key值
            return item
        });
        this.setState({dataSource})
    }

    // 弹框显示
    handlePopOpen () {
        this.setState({
            visiblePop: true
        }, function(){
            this.getData();
        });
    };

    // 弹框关闭
    handlePopClose () {
        this.setState({
            visiblePop: false,
        });
    };

    //打印预览
    handlePreviewClick () {
        this.handlePopClose();
        var printData = this.state.dataSource;
        this.props.previewClick(printData);
    }

    //直接打印
    handlePrintClick () {

    }

    //序号
    setOrderNo (value, record, index) {
        return <span>{index+1}</span>
    }

    //状态
    status (value, record, index) {
        return record.orderstate == 1 ? <span style={styles.toPay}>• 待缴费</span> : <span style={styles.donePay}>• 已缴费</span>
    }

    //操作
    operationCell (value, record, index) {
        return (
            <div key={index}>
              <i style={styles.operationCellSecond} onClick={() => { this.onDelete(value, record, index) }}>删除</i>
            </div>
          )
    }

    //删除操作
    onDelete (value, record, index) {
        let orderid = record.orderid;
        console.log('orderid',orderid)
        let tableData = this.state.dataSource;
        let i;
        const array = [...tableData];
        for(i=0;i<array.length;i++){
            if(array[i].orderid == orderid){
                array.splice(i,1);
            }
        }
        console.log('tableData',tableData)//原数组
        console.log('array',array)//删除的数组
        let dataSource = array.map((item, index)=>{
            item.key = index; // 加唯一key值
            return item
        });
        this.setState({dataSource})
    }

    onHeaderRow(column, index) {
    }

    render() {
        let { visiblePop, dataSource } = this.state;
    return (
        <div>
            <BasePop visible={visiblePop} title="确认打印项目" onClose={() => this.handlePopClose()}>
            <div style={styles.wrap}>
                <Table
                    dataSource={dataSource}
                    onHeaderRow={(column) => { this.onHeaderRow() }}
                    >
                    <Table.Column key="order" title="序号" dataIndex="order" render={this.setOrderNo.bind(this)} />
                    <Table.Column key="ordertypeDic" title="医嘱类型" dataIndex="ordertypeDic" />
                    <Table.Column key="ordercontent" title="医嘱内容（药单/治疗方法/检验、检查项目）" dataIndex="ordercontent" />
                    <Table.Column key="printstateDic" title="打印" dataIndex="printstateDic" />
                    <Table.Column key="status" title="状态" dataIndex="status" render={this.status.bind(this)} />
                    <Table.Column title="操作" render={this.operationCell.bind(this)} />
                </Table>
            </div>
            <div style={styles.footer}>
                <SureButton type="primary" style={styles.bt} onClick={this.handlePreviewClick.bind(this)} >打印预览</SureButton>
                <SureButton type="primary" style={styles.bt} onClick={this.handlePrintClick.bind(this)} >直接打印</SureButton>
                <CancelButton type="primary" style={styles.bt} onClick={this.handlePopClose.bind(this)} >取消</CancelButton>
            </div>
            </BasePop>
        </div>
        );
    }
}
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.white}
`;
const styles = {
    wrap: {
        width: '857px',
        height: '548px',
        overflow: 'hidden',
        padding: '10px'
    },
    footer: {
        width: '50%',
        position: 'absolute',
        marginLeft: '19rem',
        height: '56px',
        bottom: '0',
        // borderTop: '1px solid #E6E6E6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bt: {
        margin: 2
    },
    toPay: {
        color: '#009900'
    },
    donePay: {
        color: '#0A6ECB'
    },
    operationCellSecond: {
        color: '#0a6ecb',
        cursor: 'pointer',
    },
}

/*
@王崇琨
@日期：2018-08-28
@描述：医嘱页面点击打印
*/
