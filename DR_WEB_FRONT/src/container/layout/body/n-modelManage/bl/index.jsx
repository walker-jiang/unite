import React, { Component } from 'react';
import { Card, Row, Col, Button, Tree, Table, Divider } from 'antd';
import hTree from '../hTree';

// import TmpModal from './tmpModal'   //模板模态框
import ClassifyModal from './classifyModal.js' //分类模态框
import {
    getList,    //获取模板
} from '../service.js'

const TreeNode = Tree.TreeNode;
const HTree = hTree(Tree);

class BLClassify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableType: -1, //-1 没有意义 0 分类 1 模板 table中的每一条记录是什么类型：分类 模板
            classifyModelVisiable: false,   //分类模态框可见
            classifyOkLoading: false,      //
            tmpModelVisiabl: false, //模板模态框可见
            _treeData: [],  //树结构数据
            _tableData: [], //表格数据
            _currentTreeItem: {}, //树结构的一条数据
        };
        this._tableColumn = [
            { title: '名称', dataIndex: 'temname' },
            { title: '创建时间', dataIndex: 'ctstamp' },
            { title: '创建者', dataIndex: 'createuserName' },
            {
                title: '操作', key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;" onClick={() => this.handleTableCheck(record)}>查看</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">修改</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">删除</a>
                    </span>
                ),
            }
        ]
    }

    componentWillMount = () => {
        this._handleGetList();
    }

    /****************** 分类方法 S***********************/
    //打开模态框
    handleClassifyhowModal = () => {
        this.setState({ classifyModelVisiable: true });
    }

    //保存分类
    /**
     * classifyParentId 父节点id,
     * classifyParentData 父节点对应的整个记录,
     * classifyName 新建分类的名称
     */
    handleClassifyOk = (classifyParentId, classifyParentData, classifyName) => {
        this.setState({ classifyOkLoading: true });

        console.log(classifyParentId, classifyParentData, classifyName)

        //模拟请求延时
        setTimeout(() => {
            this.setState({ classifyOkLoading: false, classifyModelVisiable: false });
        }, 3000);
    }
    //取消保存分类
    handleClassifyCancel = (e) => {
        this.setState({ classifyModelVisiable: false });
    }
    /****************** 分类方法 E***********************/

    /****************** 模板方法 S***********************/

    /****************** 模板方法 E***********************/

    /****************** 树结构 模板管理 S***********************/
    //获取模板管理的全部数据
    _handleGetList = () => {
        if (getList) {
            getList({temtype:0, personid:6, orgid:10000, provid:1}).then((data) => {
                this.setState({_treeData: data.data});
            });
        }
    }

    handleTreeSelect = (selectedKeys, e, item) => {
        this.setState({ _tableData: item['buTempletManageList'], _currentTreeItemitem: item });
    }
    /****************** 树结构 模板管理 E***********************/

    /****************** table的删改查 S***********************/
    handleTableCheck = (record) => {
        const type = record.isleaf;
        const { newTmp } = this.props;
        //模板 1 分类 0
        (type == 0) ? this.handleClassifyhowModal : newTmp('bl', {"temmanageid": record['temmanageid']});
    }

    /****************** table的删改查 E***********************/

    render() {
        const { newTmp } = this.props;
        const { classifyModelVisiable, classifyOkLoading, tmpModelVisiabl, _treeData, _tableData } = this.state;
        return (
            <Card>
                <Card>
                    <p>
                        <Button type="primary" style={{ marginRight: 20 }} onClick={this.handleClassifyhowModal}>新建分类</Button>
                        <Button type="primary" onClick={() => newTmp('bl')}>新建模板</Button>
                    </p>
                    <Row>
                        <Col span={8}>
                            <div style={{ height: 25, backgroundColor: '#f0f2f5' }}>模板管理</div>
                            <HTree onSelect={this.handleTreeSelect} treeData={_treeData} keyField={'temmanageid'} titleField={'temname'} childField={'buTempletManageList'}></HTree>
                        </Col>
                        <Col span={16}><Table columns={this._tableColumn} dataSource={_tableData} rowKey="temmanageid" /></Col>
                    </Row>
                </Card>
                <Card>
                    <p>共15个诊疗单模板，其中平台共享模板10个，庆阳中医馆共享模板3个，我的模板2个</p>
                </Card>
                <ClassifyModal modalProps={{
                    title: "新建分类",
                    visible: classifyModelVisiable,
                    onOk: this.handleClassifyOk,
                    onCancel: this.handleClassifyCancel,
                    loading: classifyOkLoading,
                }} getDataFun={getList} getDataParam={{ temtype: 0, personid: 6, orgid: 10000, provid:1 }} />
                {/* <ClassifyModal title="新建模板" visible={classifyModelVisiable} onOk={this.classifyHandleOk} onCancel={this.classifyHandleCancel}/> */}
            </Card>
        );
    }
}

export default BLClassify