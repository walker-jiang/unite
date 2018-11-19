import React, { Component } from 'react';
import lodash from 'lodash';
import { Row, Col, Button, Tree, Table, Divider, message } from 'antd';
import styled from 'styled-components';
import buttonSty from 'components/antd/style/button';
import getResource from 'commonFunc/ajaxGetResource';
import hTree from '../hTree';
import ClassifyModal from './classifyModal.js'; //分类模态框
import { enums } from 'utils';
import {
    getList,    //获取模板分类
    getDataByTemmanageId,   //根据主键查询下一级列表
    postData,   //保存模板分类
    putData,    //更新模板分类
    delData,    //删除模板分类
    delBLTmpData,   //删除模板本身
    serverUrl,  //服务的主地址
} from '../service.js';

const { CHECK, EDIT, CREATE, DELETE } = enums;
const TreeNode = Tree.TreeNode;
const HTree = hTree(Tree);
const DEFAULT_USERID = sessionStorage.getItem('userid');
const DEFAULT_USERNAME = sessionStorage.getItem('username');
const DEFAULT_ORGID = sessionStorage.getItem('orgid');
const DEFAULT_DEPTID = sessionStorage.getItem('deptid');
const DEFAULT_PARAM = { personid: DEFAULT_USERID, orgid: DEFAULT_ORGID, provid: 1 }
const TEMPLATE_TYPE = 1;    //模板类型 医嘱 1 病历 0
const IS_CLASSIFY = 0;     //模板管理中的类型 模板分类 0 模板本身 1
const IS_TEMPLATE = 1;

class YZClassify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableType: -1, //-1 没有意义 0 分类 1 模板 table中的每一条记录是什么类型：分类 模板
            classifyModelVisiable: false,   //分类模态框可见
            classifyOkLoading: false,      //
            tmpModelVisiabl: false, //模板模态框可见
            _tableDataItem: {}, //table组件当中的一条记录
            _treeData: [],  //树结构数据
            _currentTreeItem: {}, //树结构当前选中的节点
            mType: CREATE,  //模态框类型 
            _selectItemObj: {},   //需要远程查询的数据，涉及到下拉框的时候需要
        };
        this._tableColumn = [
            { title: '名称', dataIndex: 'temname' },
            { title: '创建时间', dataIndex: 'ctstamp' },
            { title: '创建者', dataIndex: 'createuserName' },
            {
                title: '操作', key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;" onClick={() => this.handleTableOpt(record, CHECK)}>查看</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => this.handleTableOpt(record, EDIT)}>修改</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => this.handleTableDelete(record, DELETE)}>删除</a>
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
    handleClassifyhowModal = (record, mType) => {
        const { _currentTreeItem } = this.state;
        if (lodash.isEmpty(_currentTreeItem)) {
            message.warning("请选择一个模板分类");
            return
        }
        this.setState({
            classifyModelVisiable: true, _tableDataItem: record, mType: mType ? mType : CREATE,
            _selectItemObj: Object.assign({}, _currentTreeItem)
        });
    }

    //保存分类
    /**
     * data { parentid: {value: string, item: {} }, temname: string }
     */
    handleClassifyOk = (data) => {
        const { mType, _tableDataItem } = this.state;
        const classifyParentData = data['parentid'];
        const classifyParentValue = classifyParentData['value'];
        const classifyParentItem = classifyParentData['item'][0];
        const classifyName = data['temname'];
        let paramData = {   //非根节点数据
            "temname": classifyName,
            "pinyin": "1", //拼音码暂时不生成
            "weight": 1,  //权重默认给1
            "temtype": TEMPLATE_TYPE, //模板类型 0 病历模板 1 医嘱订单模板
            "temlevel": parseInt(classifyParentItem['temlevel']) + 1,  //模板级别 来自父节点
            "parentid": classifyParentItem['temmanageid'], //树节点 //父节点
            "parentids": classifyParentItem["parentids"] + classifyParentItem["temmanageid"] + '/',
            "creatuserid": DEFAULT_USERID,
            "personid": DEFAULT_USERID,
            "provid": classifyParentItem['provid'],
            "cityid": classifyParentItem["cityid"],
            "distid": classifyParentItem["distid"],
            "orgid": DEFAULT_ORGID,
            "isleaf": IS_CLASSIFY,  //分类
            "deptcode": DEFAULT_DEPTID,
            "isperson": classifyParentItem['isperson'], //是否为'我的模板'
            "createuser_name": DEFAULT_USERNAME,
        };
        if (mType == CREATE) {
            postData(paramData).then(this._innerHandleClassifyOk);
        } else if (mType == EDIT) {
            paramData = Object.assign({}, _tableDataItem, paramData);
            putData(paramData).then(this._innerHandleClassifyOk);
        }
    }

    _innerHandleClassifyOk = (data) => {
        if (data['result'] == false) {
            message.error(data['desc'])
            return;
        } else if (data['result'] == true) {
            message.success(data['desc'])
        } else { return; }
        this.setState({ classifyOkLoading: false, classifyModelVisiable: false });
        //刷新树结构
        this._handleGetList();
    }

    //取消保存分类
    handleClassifyCancel = (e) => {
        this.setState({ classifyModelVisiable: false });
    }
    /****************** 分类方法 E***********************/

    /****************** 模板方法 S***********************/
    //新建模板本身
    handleCreateTmp = () => {
        const { openTmp } = this.props;
        const { _currentTreeItem } = this.state;
        if (lodash.isEmpty(_currentTreeItem)) {
            message.warning("请选择一个模板分类");
            return
        }
        const tmpClassify = _currentTreeItem
        if (openTmp) {
            openTmp('yz', {}, "", CREATE, tmpClassify);
        }
    }
    /****************** 模板方法 E***********************/

    /****************** 树结构 模板管理 S***********************/
    //获取模板管理的全部数据
    _handleGetList = () => {
        if (getList) {
            getList({ temtype: 1, ...DEFAULT_PARAM }).then((data) => {
                const { _currentTreeItem } = this.state;
                let _data = {}, len = 0;
                if(data.data && data.data.length>0) {
                    _data = data.data;
                    len = _data.length;
                    this.setState({ _treeData: _data });
                }
                
                if(lodash.isEmpty(_currentTreeItem)) {
                    return;
                } else {
                    for(let i=0; i<len; i++) {
                        if(_data[i].temmanageid == _currentTreeItem.temmanageid) {
                            this.handleTreeSelect([], null, _data[i]);
                            return;
                        }
                    }
                }
            });
        }
    }

    handleTreeSelect = (selectedKeys, e, item) => {
        const _itemData = item['buTempletManageList'];
        const _temmanageid = item['temmanageid'];
        this.setState({ _tableData: _itemData, _currentTreeItem: item, _defaultSelectedKeys: _temmanageid });
    }
    /****************** 树结构 模板管理 E***********************/

    /****************** table的删改查 S***********************/
    //处理table中的操作：查看，编辑，删除 分为分类 模板
    //optType "edit: 编辑" "check: 查看" "create: 新建"
    handleTableOpt = (record, mType) => {
        const type = record['isleaf'] ? record['isleaf'] : "";
        const tmpName = record['temname'] ? record['temname'] : "";
        const { _currentTreeItem } = this.state;
        const tmpClassify = { temmanageid: _currentTreeItem['temmanageid'], temname: _currentTreeItem['temname'] }
        const { openTmp } = this.props;
        if (openTmp) {
            //模板:1 分类:0
            (type == IS_CLASSIFY) ? this.handleClassifyhowModal(record, mType) : openTmp('yz', { "temmanageid": record['temmanageid'] }, tmpName, mType, _currentTreeItem);
        } else { return }
    }

    //删除 分为分类 模板两种
    handleTableDelete = (record) => {
        const type = record['isleaf'] ? record['isleaf'] : null;
        let excuteFun;
        if (lodash.isNull(type)) {
            return;
        } else if (type == '0') {
            excuteFun = delData;
        } else if (type == '1') {
            excuteFun = delBLTmpData;
        }
        const _temmanageid = record['temmanageid'];
        const _this = this;
        let params = {
            url: excuteFun,
            server_url: serverUrl,
            type: 'delete',
            data: _temmanageid,
        };
        
        getResource(params, (data) => {
            if (data['result'] == false) {
                message.error(data['desc']);
                return;
            } else if (data['result'] == true) {
                message.success(data['desc']);
                _this._handleGetList();
            } else {
                return;
            }
        });
        //使用axios时用的方法，现在的请求时jquery的ajax，后台服务不支持axios。
        /**excuteFun(tt).then((data) => {
            if (data['result'] == false) {
                message.error(data['desc']);
                this._handleGetList();
                return;
            } else if (data['result'] == true) {
                message.success(data['desc']);
            } else {
                return;
            }
        });*/
    }

    /****************** table的删改查 E***********************/
    render() {
        const { openTmp } = this.props;
        const { classifyModelVisiable, classifyOkLoading, tmpModelVisiabl,
            _treeData, _currentTreeItem, _tableData, _tableDataItem,
            _selectItemObj, _defaultSelectedKeys, mType } = this.state;
        return (
            <div>
                <Row>
                    <InnerButton type="primary" style={{ marginRight: 20 }} onClick={this.handleClassifyhowModal}>新建分类</InnerButton>
                    <InnerButton type="primary" onClick={this.handleCreateTmp}>新建模板</InnerButton>
                </Row>
                <Row>
                    <Col span={6}>
                        <LeftModel>
                            <div style={{ height: 25, backgroundColor: '#f0f2f5' }}>模板管理</div>
                            <HTree
                                defaultSelectedKeys={[_defaultSelectedKeys]}
                                onSelect={this.handleTreeSelect}
                                treeData={_treeData}
                                keyField={'temmanageid'}
                                titleField={'temname'}
                                childField={'buTempletManageList'}>
                            </HTree>
                        </LeftModel>
                    </Col>
                    <Col span={18}><Table columns={this._tableColumn} dataSource={_tableData} rowKey="temmanageid" /></Col>
                </Row>
                {classifyModelVisiable && <ClassifyModal modalProps={{
                    title: "新建分类",
                    visible: true,
                    onOk: this.handleClassifyOk,
                    onCancel: this.handleClassifyCancel,
                    loading: classifyOkLoading,
                }}
                    getDataFun={getList}
                    getDataParam={{ temtype: TEMPLATE_TYPE, ...DEFAULT_PARAM }}
                    initialData={_tableDataItem}
                    selectItemObj={_selectItemObj}
                    mType={mType} />}
            </div>
        );
    }
}

const LeftModel = styled.div`
    border-right: 1px solid rgba(242, 242, 242, 1);
    height: calc(100vh - 220px);
`;
const InnerButton = styled(Button) `
  ${buttonSty.semicircle};
  &&& {
    padding: 2px 22px;
  }
`;

export default YZClassify